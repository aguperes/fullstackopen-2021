/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');

const api = supertest(app);

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
];

const userToken = async () => {
  const user = await api
    .post('/api/login')
    .send({
      username: 'agustin',
      password: 'password',
    })
    .expect(200);
  return user.body.token;
};

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const user = new User({
    username: 'agustin',
    name: 'agustin peres',
    passwordHash: await bcrypt.hash('password', 10),
  });

  const newUser = await user.save();

  const firstBlog = new Blog({
    title: initialBlogs[0].title,
    author: initialBlogs[0].author,
    url: initialBlogs[0].url,
    likes: initialBlogs[0].likes,
    user: newUser._id,
  });

  await firstBlog.save();

  const secondBlog = new Blog({
    title: initialBlogs[1].title,
    author: initialBlogs[1].author,
    url: initialBlogs[1].url,
    likes: initialBlogs[1].likes,
    user: newUser._id,
  });

  await secondBlog.save();
});

test('return correct amount of blog posts in JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(initialBlogs.length);
}, 100000);

test('unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body[0].id).toBeDefined();
});

test('a user with a valid token can successfully create a new blog post', async () => {
  const token = await userToken();

  const newBlog = {
    title: 'Default props',
    author: 'Michael Jordan',
    url: 'https://reactpatterns.com/',
    likes: 3,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set({ Authorization: `bearer ${token}` })
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  const titles = response.body.map((blog) => blog.title);

  expect(response.body).toHaveLength(initialBlogs.length + 1);
  expect(titles).toContain('Default props');
});

test('default the likes value to zero if the property is missing', async () => {
  const token = await userToken();

  const newBlog = {
    title: 'Default props',
    author: 'Michael Jordan',
    url: 'https://reactpatterns.com/',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set({ Authorization: `bearer ${token}` })
    .expect(201);
  const response = await api.get('/api/blogs');
  expect(response.body[2].likes).toBe(0);
});

test('blog without title and url is not added', async () => {
  const token = await userToken();

  const newBlog = {
    author: 'Michael Jordan',
    likes: 3,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set({ Authorization: `bearer ${token}` })
    .expect(400);

  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(initialBlogs.length);
});

test(`a user with a valid token can delete it's own blog`, async () => {
  const token = await userToken();

  const blogsAtStart = await api.get('/api/blogs');
  const blogToDelete = blogsAtStart.body[0];

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set({ Authorization: `bearer ${token}` })
    .expect(204);
  const blogsAtEnd = await api.get('/api/blogs');

  expect(blogsAtEnd.body).toHaveLength(initialBlogs.length - 1);

  const titles = blogsAtEnd.body.map((blog) => blog.title);

  expect(titles).not.toContain(blogToDelete.title);
});

test(`user with a valid token can update the information of it's own blog post`, async () => {
  const token = await userToken();

  const blogsAtStart = await api.get('/api/blogs');
  const blogToUpdate = blogsAtStart.body[0];

  const dataToUpdate = {
    likes: 10,
  };

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(dataToUpdate)
    .set({ Authorization: `bearer ${token}` })
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const blogsAfterUpdate = await api.get('/api/blogs');

  expect(blogsAfterUpdate.body[0].likes).toBe(dataToUpdate.likes);
});

test('a user with a missing token cannot create a new blog post', async () => {
  const newBlog = {
    title: 'Default props',
    author: 'Michael Jordan',
    url: 'https://reactpatterns.com/',
    likes: 3,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/);
});

afterAll(() => {
  mongoose.connection.close();
});

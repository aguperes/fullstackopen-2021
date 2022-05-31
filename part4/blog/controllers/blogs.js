/* eslint-disable no-underscore-dangle */
const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const { userExtractor } = require('../utils/middleware');

require('express-async-errors');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    name: 1,
    username: 1,
    id: 1,
  });

  response.json(blogs);
});

blogsRouter.post('/', userExtractor, async (request, response) => {
  const { body, user } = request;

  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  return response.status(201).json(savedBlog);
});

blogsRouter.put('/:id', userExtractor, async (request, response) => {
  const { body, user } = request;

  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const foundBlog = await Blog.findById(request.params.id);

  if (user.id === foundBlog.user.toString()) {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, body, {
      new: true,
      runValidators: true,
    });
    return response.status(200).json(updatedBlog);
  }

  return response
    .status(401)
    .json({ error: 'not allowed to update this blog' });
});

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const { user } = request;

  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const foundBlog = await Blog.findById(request.params.id);

  if (user.id === foundBlog.user.toString()) {
    await Blog.findByIdAndRemove(request.params.id);
    return response.status(204).end();
  }

  return response
    .status(401)
    .json({ error: 'not allowed to delete this blog' });
});

module.exports = blogsRouter;

/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line no-unused-vars
const User = require('../models/user');

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => sum + blog.likes;

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const favourite = blogs.reduce(
    (prev, cur) => (prev.likes > cur.likes ? prev : cur),
    0
  );

  delete favourite._id;
  delete favourite.url;
  delete favourite.__v;

  return favourite;
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  usersInDb,
};

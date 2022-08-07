import { useState } from 'react';

const Blog = ({ blog, user, handleDelete, handleLikes }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleClick = () => {
    const newObject = {
      user: user.id,
      title: blog.title,
      url: blog.url,
      author: blog.author,
      likes: blog.likes + 1,
    };
    handleLikes(blog.id, newObject);
  };

  return (
    <div className="blog" style={blogStyle}>
      <div style={hideWhenVisible} className="blogByDefault">
        <p>
          {blog.title} {blog.author}{' '}
          <button onClick={toggleVisibility}>view</button>
        </p>
      </div>

      <div style={showWhenVisible} className="expandedBlog">
        <p>
          {blog.title} {blog.author}{' '}
          <button onClick={toggleVisibility}>hide</button>
        </p>
        <p>{blog.url}</p>
        <p data-test-id="number-likes">
          <span>{blog.likes}</span>
          <button onClick={handleClick} className="likeBtn">
            like
          </button>
        </p>
        <p>{user.name}</p>
        {user.username === blog.user.username && (
          <button onClick={() => handleDelete(blog.id)}>remove</button>
        )}
      </div>
    </div>
  );
};

export default Blog;

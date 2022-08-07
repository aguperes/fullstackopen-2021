import { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [author, setAuthor] = useState('');

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: title,
      url: url,
      author: author,
    });

    setTitle('');
    setUrl('');
    setAuthor('');
  };

  return (
    <div>
      <h2>Add a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor="title">title</label>
          <input
            value={title}
            onChange={({ target }) => {
              setTitle(target.value);
            }}
            placeholder="title"
            id="title"
          />
        </div>
        <div>
          <label htmlFor="author">author</label>
          <input
            value={author}
            onChange={({ target }) => {
              setAuthor(target.value);
            }}
            placeholder="author"
            id="author"
          />
        </div>
        <div>
          <label htmlFor="url">url</label>
          <input
            value={url}
            onChange={({ target }) => {
              setUrl(target.value);
            }}
            placeholder="url"
            id="url"
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;

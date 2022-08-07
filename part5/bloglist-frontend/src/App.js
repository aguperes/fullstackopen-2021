import { useState, useEffect, useRef } from 'react';

import Blog from './components/Blog';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const blogFormRef = useRef();

  const notify = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 2000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      notify(`Welcome ${user.name}!`);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      notify('Wrong username or password', 'alert');
    }
  };

  const handleLogout = () => {
    notify(`Goodbye ${user.name}!`);
    window.localStorage.clear();
    setUser(null);
  };

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();

    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      notify(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
      );
    });
  };

  const addLikes = async (id, newObject) => {
    blogService.update(id, newObject).then((returnedBlog) =>
      setBlogs(
        blogs.map((blog) => {
          if (blog.id === returnedBlog.id) {
            return { ...blog, likes: returnedBlog.likes };
          }
          return blog;
        })
      )
    );

    setBlogs(blogs.sort((a, b) => b.likes - a.likes));
  };

  const deleteBlog = (id) => {
    const blogToDelete = blogs.find((blog) => blog.id === id);
    const ok = window.confirm(
      `Remove blog ${blogToDelete.title} by ${blogToDelete.author}`
    );
    if (ok) {
      blogService.remove(id).then(() => {
        setBlogs(blogs.filter((blog) => blog.id !== id));
        notify(`Deleted ${blogToDelete.title}`);
      });
    }
  };

  return (
    <div>
      <h2>Blogs</h2>
      <Notification notification={notification} />

      {user === null ? (
        <Togglable buttonLabel="login">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      ) : (
        <div>
          <p>
            {user.name} logged-in
            <button onClick={() => handleLogout()}>logout</button>
          </p>

          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              handleLikes={addLikes}
              handleDelete={deleteBlog}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;

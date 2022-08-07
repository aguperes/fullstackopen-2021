import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

test('<BlogForm /> calls event handler with the right details when creating a form', async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();

  render(<BlogForm createBlog={createBlog} />);

  const title = screen.getByPlaceholderText('title');
  const author = screen.getByPlaceholderText('author');
  const url = screen.getByPlaceholderText('url');

  await user.type(title, 'SelfTestingCode');
  await user.type(author, 'Martin Fowler');
  await user.type(url, 'https://martinfowler.com/bliki/SelfTestingCode.html');

  const createBtn = screen.getByText('create');
  await user.click(createBtn);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe('SelfTestingCode');
  expect(createBlog.mock.calls[0][0].author).toBe('Martin Fowler');
  expect(createBlog.mock.calls[0][0].url).toBe(
    'https://martinfowler.com/bliki/SelfTestingCode.html'
  );
});

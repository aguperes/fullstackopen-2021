import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('<Blog />', () => {
  const user = {
    name: 'agustin',
    username: 'agustin peres',
  };

  const blog = {
    id: '54651615361',
    title: 'travelling south america',
    url: 'https://www.madethisup.com',
    author: 'J.J.R. Tolkien',
    likes: 2,
    user: {
      name: 'agustin',
      username: 'agustin peres',
    },
  };

  const addLikes = jest.fn();

  let container;

  beforeEach(() => {
    container = render(
      <Blog blog={blog} user={user} handleLikes={addLikes} />
    ).container;
  });

  test('renders blog title and author by default', () => {
    const blogByDefault = container.querySelector('.blogByDefault');
    const expandedBlog = container.querySelector('.expandedBlog');

    expect(blogByDefault).toHaveTextContent('travelling south america');
    expect(expandedBlog).toHaveStyle('display: none');
  });

  test('clicking the view button shows the url and number of likes', async () => {
    const userInput = userEvent.setup();
    const button = screen.getByText('view');
    await userInput.click(button);

    const blogByDefault = container.querySelector('.blogByDefault');
    const expandedBlog = container.querySelector('.expandedBlog');

    expect(blogByDefault).toHaveStyle('display: none');
    expect(expandedBlog).not.toHaveStyle('display: none');
    expect(expandedBlog).toHaveTextContent('https://www.madethisup.com');
    expect(expandedBlog).toHaveTextContent(2);
  });

  test('if the like button is clicked twice, the event handler is called twice', async () => {
    const userInput = userEvent.setup();

    const viewBtn = screen.getByText('view');
    await userInput.click(viewBtn);

    const likeButton = screen.getByText('like');
    await userInput.click(likeButton);
    await userInput.click(likeButton);

    expect(addLikes.mock.calls).toHaveLength(2);
  });
});

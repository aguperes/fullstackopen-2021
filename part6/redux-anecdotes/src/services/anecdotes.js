import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const updateVote = async (id) => {
  const returnedObject = await axios.get(`${baseUrl}/${id}`);
  const changedAnecdote = {
    ...returnedObject.data,
    votes: returnedObject.data.votes + 1,
  };

  const response = await axios.put(`${baseUrl}/${id}`, changedAnecdote);
  return response.data;
};

const anecdotesService = { getAll, createNew, updateVote };

export default anecdotesService;

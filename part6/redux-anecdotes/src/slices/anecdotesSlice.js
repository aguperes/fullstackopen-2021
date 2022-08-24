import { createSlice } from '@reduxjs/toolkit';
import anecdotesService from '../services/anecdotes';

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote(state, { payload }) {
      return state.map((anecdote) =>
        anecdote.id !== payload.id ? anecdote : payload
      );
    },
    appendAnecdote(state, { payload }) {
      state.push(payload);
    },
    setAnecdotes(state, { payload }) {
      return payload;
    },
  },
});

export const { addVote, setAnecdotes, appendAnecdote } = anecdotesSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const handleVotes = (id) => {
  return async (dispatch) => {
    const anecdote = await anecdotesService.updateVote(id);
    dispatch(addVote(anecdote));
  };
};

export default anecdotesSlice.reducer;

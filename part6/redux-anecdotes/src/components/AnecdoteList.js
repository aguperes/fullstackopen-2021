import { useDispatch, useSelector } from 'react-redux';
import { handleVotes } from '../slices/anecdotesSlice';
import { handleNotification } from '../slices/notificationSlice';

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);

  const filterAnecdotes = () => {
    if (filter === '') {
      return anecdotes;
    }
    return anecdotes.filter((anecdote) => {
      return anecdote.content.toLowerCase().includes(filter.toLowerCase());
    });
  };

  const anecdotesToShow = [...filterAnecdotes()];

  const sortedAnecdotes = () => {
    return anecdotesToShow.sort((a, b) => b.votes - a.votes);
  };

  return (
    <div>
      {sortedAnecdotes().map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            dispatch(handleVotes(anecdote.id));
            dispatch(handleNotification(`you voted '${anecdote.content}'`, 5));
          }}
        />
      ))}
    </div>
  );
};

export default AnecdoteList;

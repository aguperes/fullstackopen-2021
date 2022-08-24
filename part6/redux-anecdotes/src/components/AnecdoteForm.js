import { connect } from 'react-redux';
import { createAnecdote } from '../slices/anecdotesSlice';
import { handleNotification } from '../slices/notificationSlice';

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';

    props.createAnecdote(content);
    props.handleNotification(`new anecdote '${content}'`, 5);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </>
  );
};

const mapDispatchToProps = { createAnecdote, handleNotification };

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm);

export default ConnectedAnecdoteForm;

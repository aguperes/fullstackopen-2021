import phonebookService from '../services/phonebookService';

const Person = ({ person }) => {
  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      phonebookService.deletePerson(person.id).then();
    }
  };

  return (
    <li style={{ listStyleType: 'none' }}>
      {person.name} {person.number}{' '}
      <button onClick={() => handleDelete(person)}>Delete</button>
    </li>
  );
};

export default Person;

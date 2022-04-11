import Person from './Person';

const Persons = ({ persons, filter }) => {
  const toShow = filter.length ? filter : persons;

  return (
    <>
      {toShow.map((person) => (
        <Person key={person.id} person={person} />
      ))}
    </>
  );
};

export default Persons;

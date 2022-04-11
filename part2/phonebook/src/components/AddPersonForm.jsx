import { useState } from 'react';
import phonebookService from '../services/phonebookService';

const AddPersonForm = ({
  persons,
  setSuccessMessage,
  setPersons,
  setErrorMessage,
}) => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const isIn = persons.some(
    (person) => person.name.toLowerCase() === newName.toLowerCase()
  );

  const onSubmit = (event) => {
    event.preventDefault();
    if (isIn) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const index = persons.findIndex(
          (person) => person.name.toLowerCase() === newName.toLowerCase()
        );

        const foundPerson = persons[index];

        const newPersonObject = {
          ...foundPerson,
          number: newNumber,
        };
        phonebookService
          .update(foundPerson.id, newPersonObject)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== foundPerson.id ? person : returnedPerson
              )
            );
          })
          .catch((error) => {
            setErrorMessage(
              `Information of ${foundPerson.name} has already been removed from the server`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      phonebookService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');

        setSuccessMessage(`Added ${personObject.name}`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      });
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        name:{' '}
        <input
          placeholder='Enter your name'
          onChange={(e) => setNewName(e.target.value)}
          value={newName}
        />
      </div>
      <div>
        number:{' '}
        <input
          type='tel'
          placeholder='Enter your phone number'
          onChange={(e) => setNewNumber(e.target.value)}
          value={newNumber}
        />
      </div>
      <button type='submit'>add</button>
    </form>
  );
};

export default AddPersonForm;

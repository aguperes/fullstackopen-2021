import { useState, useEffect } from 'react';
import phonebookService from './services/phonebookService';
import Persons from './components/Persons';
import Filter from './components/Filter';
import AddPersonForm from './components/AddPersonForm';
import Notification from './components/Notification';
import ErrorNotification from './components/ErrorNotification';
import './index.css';

const App = () => {
  //State
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    phonebookService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleFilterChange = (event) => {
    const filteredArr = persons.filter((person) => {
      return person.name
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    console.log(filteredArr);
    setFilter(filteredArr);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification successMessage={successMessage} />
      <ErrorNotification errorMessage={errorMessage} />
      <Filter filter={filter} onChange={handleFilterChange} />
      <h2>Add a new</h2>
      <AddPersonForm
        persons={persons}
        setSuccessMessage={setSuccessMessage}
        setPersons={setPersons}
        setErrorMessage={setErrorMessage}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  );
};

export default App;

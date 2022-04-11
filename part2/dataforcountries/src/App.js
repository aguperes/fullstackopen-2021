import { useState, useEffect } from 'react';
import axios from 'axios';
import CountryList from './components/CountryList';

const App = () => {
  const [countries, setCoutries] = useState([]);
  const [filteredArr, setFilteredArr] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      setCoutries(response.data);
    });
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const newCountriesArr = countries.filter((country) => {
      return country.name.common
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setFilteredArr(newCountriesArr);
  };

  return (
    <>
      <div>
        find countries{' '}
        <input type='search' onChange={handleSearch} value={search} />
      </div>
      <CountryList filteredArr={filteredArr} />
    </>
  );
};

export default App;

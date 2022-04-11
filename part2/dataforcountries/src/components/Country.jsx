import { useState } from 'react';
import CountryDescription from './CountryDescription';

const Country = ({ country, singleMatch }) => {
  const [show, setShow] = useState(false);

  const handleShowButton = () => {
    setShow(!show);
  };

  return (
    <>
      {singleMatch ? (
        <CountryDescription country={country} />
      ) : (
        <div>
          {country.name.common}
          <button onClick={handleShowButton}>{show ? 'Hide' : 'Show'}</button>
          {show && <CountryDescription country={country} />}
        </div>
      )}
    </>
  );
};

export default Country;

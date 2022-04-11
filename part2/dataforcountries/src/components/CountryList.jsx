import { v4 as uuidv4 } from 'uuid';
import Country from './Country';

const CountryList = ({ filteredArr }) => {
  return (
    <>
      {filteredArr.length > 10 ? (
        'Too many matches, specify another filter'
      ) : (
        <div>
          {filteredArr.map((country) => {
            return (
              <Country
                key={uuidv4()}
                country={country}
                singleMatch={filteredArr.length === 1 ? true : false}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default CountryList;

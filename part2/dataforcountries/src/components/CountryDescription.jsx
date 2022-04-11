import Languages from './Languages';
import Weather from './Weather';

const CountryDescription = ({ country }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <Languages languages={country.languages} />
      <p>
        <img src={country.flags.png} alt='flag' width='200px' />
      </p>
      <h3>Weather in {country.capital[0]}</h3>
      <Weather latlng={country.capitalInfo.latlng} />
    </>
  );
};

export default CountryDescription;

import { v4 as uuidv4 } from 'uuid';

const Languages = ({ languages }) => {
  const keys = Object.keys(languages);

  return (
    <>
      <h3>Languages</h3>
      <ul>
        {keys.map((key) => {
          return <li key={uuidv4()}>{languages[key]}</li>;
        })}
      </ul>
    </>
  );
};

export default Languages;

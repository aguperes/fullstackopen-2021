const Header = ({ name }) => <h1>{name}</h1>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Total = ({ parts }) => (
  <p>
    <b>
      total of{' '}
      {parts.reduce(
        (accumulator, currentValue) => accumulator + currentValue.exercises,
        0
      )}{' '}
      of exercises
    </b>
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </>
);

const Course = ({ course }) => (
  <>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>
);

export default Course;

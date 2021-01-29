const Persons = ({ personsToShow }) => {
  return (
    <>
      {personsToShow.map(({ name, number }) => (
        <p key={name}>
          {name} {number}
        </p>
      ))}
    </>
  );
};

export default Persons;

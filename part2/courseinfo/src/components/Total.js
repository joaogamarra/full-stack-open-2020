const Total = ({ parts }) => {
  console.log('file: Total.js ~ line 2 ~ parts', parts);

  const sum = parts.reduce((accumulator, value) => accumulator + value.exercises, 0);
  return <p>Number of exercises {sum}</p>;
};

export default Total;

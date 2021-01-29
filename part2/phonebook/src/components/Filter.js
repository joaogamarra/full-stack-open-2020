const Filter = ({ handleChange, filter }) => {
  return (
    <div>
      filter shown with: <input onChange={handleChange} value={filter} />
    </div>
  );
};

export default Filter;

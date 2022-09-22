import React, { useState } from 'react';

const LevelFilter = (props) => {
  const [value] = useState();

  const handleSelect = (event) => {
    props.filterDigimons(event.target.value);
  };

  return (
    <div className="my-3">
      <span className="me-2 fw-bolder text-uppercase">Filter By Level: </span>
      <select name="levels" value={value} onChange={handleSelect}>
        {props.levels?.sort().map((level, i) => (
          <option value={level} key={i}>
            {level}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LevelFilter;

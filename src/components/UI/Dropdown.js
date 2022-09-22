import React from 'react';

const Dropdown = (props) => {
  return (
    <ul>
      {props.levels?.sort()?.map((level, i) => (
        <li key={i}>{level}</li>
      ))}
    </ul>
  );
};

export default Dropdown;

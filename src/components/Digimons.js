import React from 'react';
import classes from './Digimon.module.css';

const Digimons = (props) => {
  return props.loading ? (
    <h1>Data is loading</h1>
  ) : (
    <ul className="list-group mt-3 mb-4 w-50 mx-auto">
      {props.digimons.map((digimon, i) => (
        <li
          key={i}
          className={`list-group-item p-0  d-flex align-items-center justify-content-between ${classes.digimonList}`}
        >
          <span className={`${classes.name} ms-5 me-5 text-muted fs-5`}>
            {digimon.name}
          </span>
          <img
            src={digimon.img}
            alt={digimon.name.toLowerCase()}
            className={`${classes.mainImg} ms-5 me-5`}
          />
        </li>
      ))}
    </ul>
  );
};

export default Digimons;

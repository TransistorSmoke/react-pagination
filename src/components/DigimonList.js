import React from 'react';
import Card from './Card';
import classes from './Digimon.module.css';
import spinner from '../assets/spinner.gif';

const DigimonList = (props) => {
  return !props.loading ? (
    <div className="border">
      <Card info={props.digimonInfo} onClick={props.closeInfoCard}></Card>
      <ul className="list-group mt-3 mb-4 w-50 mx-auto">
        {props.digimons.map((digimon, i) => (
          <li
            key={i}
            className={`list-group-item p-0  d-flex align-items-center justify-content-between ${classes.digimonList}`}
            onClick={() => props.onDigimonSelect(digimon)}
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
    </div>
  ) : (
    <img
      src={spinner}
      alt="Loading..."
      style={{ width: '200px', margin: 'auto', display: 'block' }}
    />
  );
};

export default DigimonList;

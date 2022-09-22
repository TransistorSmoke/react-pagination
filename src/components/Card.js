import React from 'react';
import classes from './Card.module.css';

const Card = (props) => {
  return (
    <div>
      {props.info ? (
        <>
          <div className={classes.backdrop} onClick={props.onClick}></div>
          <div
            className={`card p-3 position-absolute top-50 start-50 translate-middle ${classes.aboveBackdrop}`}
          >
            <img
              src={props.info.img}
              className={`card-img-top mx-auto ${classes.infoImage}`}
              alt="..."
            />
            <div className="card-body">
              <h3 className="card-title text-primary text-uppercase">
                {props.info.name}
              </h3>
              <p className="card-text">
                <span className="fw-bolder">LEVEL: </span>
                <span className="text-success">{props.info.level}</span>
              </p>
            </div>
            <button className={classes.btn} onClick={props.onClick}>
              Close
            </button>
          </div>
        </>
      ) : (
        ''
      )}
    </div>
  );
};

export default Card;

import React from 'react';

const Pagination = (props) => {
  const pages = [];

  for (
    let x = 1;
    x < Math.ceil(props.totalDigimonCount / props.digimonsPerPage);
    x++
  ) {
    pages.push(x);
  }
  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <nav aria-label="Page navigation example">
        <ul className="pagination m-0">
          {pages.map((pageNumber) => (
            <li key={pageNumber} className="page-item">
              <button
                className="page-link"
                onClick={() => props.selectPage(pageNumber)}
              >
                {' '}
                {pageNumber}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;

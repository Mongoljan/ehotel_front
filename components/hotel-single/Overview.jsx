import React from 'react';

const Overview = ({ overviewText, onShowMore }) => {
  return (
    <>
      <h3 className="text-22 fw-500 pt-40 border-top-light">Overview</h3>
      <p className="text-dark-1 text-15 mt-20">
        {overviewText}
      </p>
      {onShowMore && (
        <a
          href="#"
          className="d-block text-14 text-blue-1 fw-500 underline mt-10"
          onClick={e => {
            e.preventDefault();
            onShowMore();
          }}
        >
          Show More
        </a>
      )}
    </>
  );
};

export default Overview;
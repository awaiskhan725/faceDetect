import React from "react";

const Rank = ({ userName, userRank }) => {
  return (
    <div className="container-fluid text-center my-4">
      <div className="text-light">{`${userName}, you're current entry count is`}</div>
      <div className="text-light">{`#${userRank}`}</div>
    </div>
  );
};

export default Rank;

import React from "react";
import "./NoResultsFound.scss";

interface NoResultsFoundProps {
  title: string;
}
const NoResultsFound: React.FC<NoResultsFoundProps> = (props) => {
  return (
    <div className="no-results-container">
      <img src="/assets/images/templates/noResults.png" alt="" />
      <h2>No {props.title} Found</h2>
    </div>
  );
};

export default NoResultsFound;

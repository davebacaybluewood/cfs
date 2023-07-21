import React from "react";
import "./NoResultsFound.scss";

interface NoResultsFoundProps {
  text: string;
}
const NoResultsFound: React.FC<NoResultsFoundProps> = (props) => {
  return (
    <div className="no-results-container">
      <img src="/assets/images/templates/noResults.png" alt="" />
      <h2>{props.text}</h2>
    </div>
  );
};

export default NoResultsFound;

import React from "react";
import {
  FaHandsHelping,
  FaMoneyBillWave,
  FaPrayingHands,
} from "react-icons/fa";
import "./Anuality.scss";

const Anuality: React.FC = () => {
  return (
    <div className="article-content">
      <div className="article">
        <h1>Immediate</h1>
        <p>
          Gives access to income payments, which typically start a year after
          the premium is paid.
        </p>
        <p>
          <i>Deffered:</i>
        </p>
        <p>
          Offer income payments that start later, frequently several years
          later. Long-term savings goals are the focus of deferred annuities.
        </p>
        <ul>
          <li>
            <FaPrayingHands />
            Fixed Interest Rates Annuities
          </li>
          <li>
            <FaMoneyBillWave />
            Indexed Annuities
          </li>
          <li>
            <FaHandsHelping />
            Variable Annuities
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Anuality;

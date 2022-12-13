import React from "react";
import {
  FaMoneyBillWave,
  FaPrayingHands,
  FaHandsHelping,
} from "react-icons/fa";

type SolutionTypes = {
  title: string;
  type: "life-insurance" | "annuity";
  description: string | JSX.Element;
};
const solutionData: SolutionTypes[] = [
  {
    title: "Whole Life",
    description: (
      <React.Fragment>
        <p>
          Whole life insurance, usually referred to as conventional life
          insurance, offers continuous death benefit protection for the duration
          of the insured's life. Whole life insurance has a savings component in
          which cash value may build up in addition to paying a death benefit. A
          fixed rate of tax-deferred interest is accrued.
        </p>
        <p>
          Whole life insurance has the major benefit of offering permanent
          coverage that never expires or needs to be renewed. While whole life
          insurance guarantees lifelong protection with a fixed premium, term
          insurance does not pay out if the insured does not pass away within
          the predetermined time period. Additionally, it builds up cash worth
          that can be used to pay for things like retirement or medical
          expenditures.
        </p>
      </React.Fragment>
    ),
    type: "life-insurance",
  },
  {
    title: "Term Life",
    description: (
      <React.Fragment>
        <p>
          Often called pure life insurance, Term Life insurance pays the
          policyholder's heirs over a predetermined period of time. The
          policyholder has three options after the term has ended: they can
          choose to convert their term life insurance policy to permanent
          insurance, renew it for another term, or let it lapse.
        </p>
        <p>
          Term life insurance appeals to young families with kids. The parents
          can get comprehensive coverage for a reasonable price. The family can
          count on the dividend to make up for any lost income if it becomes
          necessary.
        </p>
      </React.Fragment>
    ),
    type: "life-insurance",
  },
  {
    title: "Long Term Care",
    description: (
      <React.Fragment>
        <p>
          For people who are 65 years of age or older, or who have a chronic or
          disabling condition that requires regular monitoring, long-term care
          (LTC) insurance is a type of coverage that offers nursing-home care,
          home-health care, personal or adult daycare. LTC insurance provides
          more options and flexibility than a lot of public assistance programs.
        </p>
      </React.Fragment>
    ),
    type: "life-insurance",
  },
  {
    title: "Premium Financing",
    description: (
      <React.Fragment>
        <p>
          Financing life insurance premiums entails borrowing money from a third
          party to pay for a policy's premiums. As with other loans, the lender
          assesses interest, and the borrower—in this case, the insured—repays
          the loan in recurring installments until the obligation is satisfied
          or the insured dies, in which case the remaining balance is typically
          repaid with insurance proceeds.
        </p>
      </React.Fragment>
    ),
    type: "life-insurance",
  },
  {
    title: "Immediate",
    description: (
      <React.Fragment>
        <p>
          Gives access to income payments, which typically start a year after
          the premium is paid.
        </p>
      </React.Fragment>
    ),
    type: "annuity",
  },
  {
    title: "Referred ",
    description: (
      <React.Fragment>
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
      </React.Fragment>
    ),
    type: "annuity",
  },
];

export default solutionData;

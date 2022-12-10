import React from "react";
import "./LifeInsurance.scss";

const LifeInsurance: React.FC = () => {
  return (
    <div className="article-content">
      <div className="article">
        <h1>Whole Life</h1>
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
      </div>
      <div className="article">
        <h1>Term Life</h1>
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
      </div>
      <div className="article">
        <h1>Long Term Care</h1>
        <p>
          For people who are 65 years of age or older, or who have a chronic or
          disabling condition that requires regular monitoring, long-term care
          (LTC) insurance is a type of coverage that offers nursing-home care,
          home-health care, personal or adult daycare. LTC insurance provides
          more options and flexibility than a lot of public assistance programs.
        </p>
      </div>
      <div className="article">
        <h1>Premium Financing</h1>
        <p>
          Financing life insurance premiums entails borrowing money from a third
          party to pay for a policy's premiums. As with other loans, the lender
          assesses interest, and the borrower—in this case, the insured—repays
          the loan in recurring installments until the obligation is satisfied
          or the insured dies, in which case the remaining balance is typically
          repaid with insurance proceeds.
        </p>
      </div>
    </div>
  );
};

export default LifeInsurance;

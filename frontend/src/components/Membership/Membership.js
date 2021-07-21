import React, { useContext } from "react";
import "./Membership.css";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../context/auth-context";

const MEMBERSHIP_TIERS = [
  {
    id: 1,
    duration: 3,
    personal: 2,
    price: 9990,
  },
  {
    id: 2,
    duration: 6,
    personal: 3,
    price: 15990,
  },
  {
    id: 3,
    duration: 12,
    personal: 4,
    price: 18990,
  },
];

export default function Membership() {
  const { dispatch } = useContext(UserContext);
  const buyMembership = (tier) => {
    console.log(tier);
    localStorage.setItem("membership", JSON.stringify(tier));
    dispatch({
      type: "BUY_MEMBERSHIP",
      payload: tier,
    });
  };

  return (
    <div className="membership-container">
      <h1 className="membership-header">Memberships For You</h1>
      <div className="membership-plans">
        {MEMBERSHIP_TIERS.map((tier) => (
          <div className="membership-plan">
            <p className="membership-plan__heading">{`Tier ${tier.id}`}</p>
            <p className="membership-plan__duration">{`${tier.duration} Months`}</p>
            <p className="membership-plan__desc">
              {`Personalized Sessions ${tier.personal} times / week`}
            </p>
            <p className="membership-plan__price">
              Price: &#8377;{`${tier.price}`}
            </p>
            <div className="membership-plan__add__container">
              <Link to="/membership/buy-membership">
                <button
                  className="membership-plan__add"
                  onClick={buyMembership.bind(null, tier)}
                >
                  BUY NOW
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <h1 className="membership-header">Membership Benefits</h1>
      <div className="membership-benefits">
        <p>Buy now, start anytime</p>
        <p>Pause membership anytime</p>
        <p>Safest gyms in Town</p>
      </div>
    </div>
  );
}

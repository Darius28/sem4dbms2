import React from "react";
import "./Membership.css";

export default function Membership() {
  return (
    <div className="membership-container">
      <h1 className="membership-header">Memberships For You</h1>
      <div className="membership-plans">
        <div className="membership-plan">
          <p className="membership-plan__heading">Tier 1</p>
          <p className="membership-plan__duration">3 Months</p>
          <p className="membership-plan__desc">
            Personalized Sessions 2 times / week
          </p>
          <p className="membership-plan__price">Price: &#8377;9990</p>
          <div className="membership-plan__add__container">
            <button className="membership-plan__add">ADD TO CART</button>
          </div>
        </div>
        <div className="membership-plan">
          <p className="membership-plan__heading">Tier 2</p>
          <p className="membership-plan__duration">6 Months</p>
          <p className="membership-plan__desc">
            Personalized Sessions 3 times / week
          </p>
          <p className="membership-plan__price">Price: &#8377;15990</p>
          <div className="membership-plan__add__container">
            <button className="membership-plan__add">ADD TO CART</button>
          </div>
        </div>
        <div className="membership-plan">
          <p className="membership-plan__heading">Tier 3</p>
          <p className="membership-plan__duration">12 Months</p>
          <p className="membership-plan__desc">
            Personalized Sessions 4 times / week
          </p>
          <p className="membership-plan__price">Price: &#8377;18990</p>
          <div className="membership-plan__add__container">
            <button className="membership-plan__add">ADD TO CART</button>
          </div>
        </div>
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

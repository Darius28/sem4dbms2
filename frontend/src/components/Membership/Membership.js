import React, { useContext, useState, useEffect } from "react";
import "./Membership.css";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../context/auth-context";
import axios from "axios";

const MEMBERSHIP_TIERS = [
  {
    id: 1,
    duration: 3,
    personal: 2,
    price: 9990,
    tier: "Tier 1",
  },
  {
    id: 2,
    duration: 6,
    personal: 3,
    price: 15990,
    tier: "Tier 2",
  },
  {
    id: 3,
    duration: 12,
    personal: 4,
    price: 18990,
    tier: "Tier 3",
  },
];

export default function Membership() {
  const { state, dispatch } = useContext(UserContext);
  const [membership, setMembership] = useState("");
  const [packagename, setPackagename] = useState("");
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [joinDate, setJoinDate] = useState("");
  useEffect(() => {
    console.log(localStorage.getItem("membershipBought"));
    if (localStorage.getItem("membershipBought")) {
      console.log("piece of shit stmt ran");
      const getData = async () => {
        const username = JSON.parse(localStorage.getItem("user")).username;
        console.log("get membership data exec");
        const { data } = await axios.post(
          "http://localhost:4000/users/get-membership-data",
          {
            username,
          }
        );
        console.log(data);
        setPackagename(data.packagename);
        setAmount(data.amount);
        setDuration(data.duration);
        setJoinDate(data.joindate);
      };
      getData();
    }
    if (JSON.parse(localStorage.getItem("user"))) {
      if (JSON.parse(localStorage.getItem("user")).membership) {
        const getData = async () => {
          const username = JSON.parse(localStorage.getItem("user")).username;
          console.log("get membership data exec");
          const { data } = await axios.post(
            "http://localhost:4000/users/get-membership-data",
            {
              username,
            }
          );
          console.log(data);
          setPackagename(data.packagename);
          setAmount(data.amount);
          setDuration(data.duration);
          setJoinDate(data.joindate);
        };
        getData();
      }
      console.log("setting membership status");
      setMembership(JSON.parse(localStorage.getItem("user")).membership);
    }
  }, []);

  useEffect(() => {
    console.log("state changed!");
    if (localStorage.getItem("user") === null) {
      setMembership("");
    }
  }, [state]);

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
      {membership === "no" || membership === "" ? (
        <>
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
                    {membership === "" ? (
                      <button
                        disabled
                        className="membership-plan__add"
                        onClick={buyMembership.bind(null, tier)}
                      >
                        BUY NOW
                      </button>
                    ) : (
                      <button
                        className="membership-plan__add"
                        onClick={buyMembership.bind(null, tier)}
                      >
                        BUY NOW
                      </button>
                    )}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div>
            <h1 className="membership-header">Membership Benefits</h1>
          </div>
          <div className="membership-benefits">
            <p>Buy now, start anytime</p>
            <p>Pause membership anytime</p>
            <p>Safest gyms in Town</p>
          </div>
        </>
      ) : (
        <>
          <h1 className="membership-header">
            Your Membership has been activated.
          </h1>
          <h3 className="membership-header__details">Membership Details: </h3>
          <div className="active-membership-container">
            <div className="active-membership__details">
              <div>Membership Tier:</div>
              <div>{packagename}</div>
            </div>
            <div className="active-membership__details">
              <div>Price:</div>
              <div>{amount}</div>
            </div>
            <div className="active-membership__details">
              <div>Duration(Months):</div>
              <div>{duration}</div>
            </div>
            <div className="active-membership__details">
              <div>Join Date:</div>
              <div>{joinDate}</div>
            </div>
          </div>
        </>
      )}
      <div className="padding-bottom"></div>
    </div>
  );
}

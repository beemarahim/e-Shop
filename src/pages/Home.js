import React from "react";
import Jumbotron from "../components/cards/Jumbotron";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";

const Home = () => {
  return (
    <>
      <div className="jumbotron text-danger h1 font-weight-bold text-center">
        <Jumbotron text={["Latest Products", "New Arrivals", "Best Sellers"]} />
      </div>

      <h2 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        New Arrivals
      </h2>
      <NewArrivals />

      <h2  style={{marginTop: "20px"}}  className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Best Sellers
      </h2>
      <BestSellers />

      <br />
      <br />
    </>
  );
};

export default Home;

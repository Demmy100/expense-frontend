import React from "react";
import img from "../../assets/fin-img.jpg";
import "./home.css";
import { Link } from "react-router-dom";
import { ShowOnLogin, ShowOnLogout } from "../../components/protect/HiddenLink";

const Home = () => {
  return (
    <div className="home-con">
      <div className="header-con">
        <span className="home-logo">TrackExpense</span>
        <div className="home-nav">
          <ShowOnLogout>
            <Link to="/register">Register</Link>
          </ShowOnLogout>
          <ShowOnLogout>
            <Link to="/login">Login</Link>
          </ShowOnLogout>
          <ShowOnLogin>
            <Link to="/dashboard">Dashboard</Link>
          </ShowOnLogin>
        </div>
      </div>
      <div className="hero-con">
        <div className="hero-text">
          <h2>Track Your Expense</h2>
          <p>
            Life is dynamic, and so is your financial journey. With <b>TrackExpense</b>, your financial data is accessible anytime,
            anywhere. Whether you're at home, in the office, or on the go, our
            cloud-based platform ensures that your financial insights are always
            at your fingertips. Tracking your expenses has never been easier.
            Simply input your transactions, and watch as <b>TrackExpense</b> effortlessly categorizes them for you. Whether it's groceries,
            bills, or that occasional treat, our smart algorithms learn from
            your spending habits, providing personalized insights that empower
            you to make meaningful adjustments to your budget. Take charge of
            your financial goals with our powerful budgeting tools. Set
            realistic budgets for each spending category and receive real-time
            alerts when you approach your limits. <b>TrackExpense</b>
            adapts to your lifestyle, offering flexibility without sacrificing
            financial discipline. Achieving your financial goals is no longer a
            distant dream – it's a tangible, achievable reality.
          </p>
        </div>
        <div className="hero-img">
          <img src={img} alt="financial Image" />
        </div>
      </div>
    </div>
  );
};

export default Home;

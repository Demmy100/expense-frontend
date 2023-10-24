import React, { useEffect } from "react";
import { dollar } from "../../utils/Icons";
import { useDispatch, useSelector } from "react-redux";
import { selectTotalIncome } from "../../redux/income/incomeSlice";
import { selectTotalExpense } from "../../redux/expense/expenseSlice";
import { fetchTransactionHistory } from "../../redux/transaction/transactionSlice";
import Chart from "../../components/chart/Chart";
import "./dashboard.css";
import { getUser } from "../../services/authService";

const Dashboard = () => {
  const user = getUser();
  const dispatch = useDispatch();

  // Fetch income and expense data when the component mounts
  useEffect(() => {
    dispatch(fetchTransactionHistory(user?._id));
  }, [dispatch, user?._id]);

  // Selectors for total income and total expense
  const totalIncome =
    useSelector((state) => selectTotalIncome(state, user?._id)) || 0;
  const totalExpense =
    useSelector((state) => selectTotalExpense(state, user?._id)) || 0;

  // Calculate total balance
  const totalBalance = totalIncome - totalExpense;

  return (
    <div className="dashboard">
      <div>
        <h1>Hightlights</h1>
        <div className="chart-con">
          <Chart />
          <div className="amount-con">
            <div className="dash-income">
              <h2>Total Income</h2>
              <p>
                {dollar} {totalIncome}
              </p>
            </div>
            <div className="dash-expense">
              <h2>Total Expense</h2>
              <p>
                {dollar} {totalExpense}
              </p>
            </div>
            <div className="dash-balance">
              <h2>Total Balance</h2>
              <p>
                {dollar} {totalBalance}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
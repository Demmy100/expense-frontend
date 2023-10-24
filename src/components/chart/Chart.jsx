import React, { useEffect } from "react";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { dateFormat } from "../../utils/dateFormat";
import "./chart.css";
import { fetchTransactionHistory } from "../../redux/transaction/transactionSlice";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Chart = () => {
    const dispatch = useDispatch();
    const incomes = useSelector((state) => state.income.incomes);
    const expenses = useSelector((state) => state.expense.expenses);
    const isLoading = useSelector((state) => state.transactions.isLoading);
  
    useEffect(() => {
      dispatch(fetchTransactionHistory());
    }, [dispatch]);
  
    if (isLoading) {
      return <p>Loading...</p>;
    }
  
    const data = {
      labels: incomes.map((inc) => dateFormat(inc.date)),
      datasets: [
        {
          label: "Income",
          data: incomes.map((income) => income.amount),
          backgroundColor: "green",
          tension: 0.2,
        },
        {
          label: "Expenses",
          data: expenses.map((expense) => expense.amount),
          backgroundColor: "red",
          tension: 0.2,
        },
      ],
    };
  
    return (
      <div className="main-chart">
        <Line data={data} />
      </div>
    );
  };
  
  export default Chart;
  

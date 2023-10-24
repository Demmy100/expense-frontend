import React, { useEffect, useState } from "react";
import ExpenseForm from "../../components/expenseForm/ExpenseForm";
import useRedirectLoggedOutUser from "../../components/customLink/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createExpense,
  deleteExpense,
  expenseIsLoading,
  getAllExpenses,
  selectTotalExpense,
} from "../../redux/expense/expenseSlice";
import { selectIsLoggedIn } from "../../redux/auth/authSlice";
import ExpenseItem from "../../components/expenseItem/ExpenseItem";

const initialState = {
  title: "",
  amount: "",
  category: "",
  description: "",
  date: "",
};

const Expenses = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [expense, setExpense] = useState(initialState);
  const isLoading = useSelector(expenseIsLoading);
  const { title, amount, category, description, date } = expense;
  const { expenses, isError, message } = useSelector((state) => state.expense);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };

  const totalExpense = useSelector(selectTotalExpense);

  const saveExpense = async (e) => {
    e.preventDefault();

    const expData = {
      title,
      amount,
      category,
      description,
      date,
    };

    try {
      await dispatch(createExpense(expData));
      navigate("/expenses");
      setExpense(initialState);
    } catch (error) {
      console.log("Error creating expense :", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isLoggedIn === true) {
          await dispatch(getAllExpenses(user));
        }
      } catch (error) {
        console.log("Error fetching expenses :", error);
      }
    };

    fetchData();
  }, [isLoggedIn, dispatch]);
  return (
    <div className="incomes">
      <h1>Total Expenses : ${totalExpense}</h1>
      <div className="income">
        <div className="form-container">
          <ExpenseForm
            expense={expense}
            handleInputChange={handleInputChange}
            saveExpense={saveExpense}
            isLoading={isLoading}
          />
        </div>
        {isLoading && <p>Loading......</p>}
        {!isLoading && expenses.length === 0 && <p>No expenses to display.</p>}
        {!isLoading && expenses.length > 0 && (
          <div className="form-r">
            {expenses.map((expense) => (
              <ExpenseItem
                key={expense._id}
                id={expense._id}
                title={expense.title}
                amount={expense.amount}
                category={expense.category}
                description={expense.description}
                type={expense.type}
                data={expense.date}
                deleteExpense={deleteExpense}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Expenses;

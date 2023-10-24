import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createIncome,
  getAllIncomes,
  selectIsLoading,
  deleteIncome,
  selectTotalIncome,
  updateTotalIncome,
} from "../../redux/income/incomeSlice";
import Form from "../../components/form/Form";
import "./incomes.css";
import { selectIsLoggedIn } from "../../redux/auth/authSlice";
import useRedirectLoggedOutUser from "../../components/customLink/useRedirectLoggedOutUser";
import IncomeItem from "../../components/incomeItem/IncomeItem";

const initialState = {
  title: "",
  amount: "",
  category: "",
  description: "",
  date: "",
};

const Incomes = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [income, setIncome] = useState(initialState);
  const isLoading = useSelector(selectIsLoading);
  const { title, amount, category, description, date } = income;
  const { incomes, isError, message } = useSelector((state) => state.income);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setIncome({ ...income, [name]: value });
  };

  const totalIncome = useSelector(selectTotalIncome)
  //console.log("Total Income in Component:", totalIncome);

  /* const saveIncome = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("amount", amount);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("date", date);
    console.log(...formData);
    await dispatch(createIncome(formData));
    navigate("/incomes");
  }; */
  const saveIncome = async (e) => {
    e.preventDefault();

    const incomeData = {
      title,
      amount,
      category,
      description,
      date,
    };

    try {
      await dispatch(createIncome(incomeData));
      navigate("/incomes");
      setIncome(initialState)
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error("Error creating income:", error);
    }
  };
  //console.log(incomes)
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isLoggedIn === true) {
          await dispatch(getAllIncomes(user));
        }
      } catch (error) {
        console.error("Error fetching incomes:", error);
      }
    };

    fetchData();
  }, [isLoggedIn, dispatch]);

  return (
    <div className="incomes">
      <h1>Total Income : ${totalIncome}</h1>
      <div className="income">
        <div className="form-container">
          <Form
            income={income}
            handleInputChange={handleInputChange}
            saveIncome={saveIncome}
            isLoading={isLoading}
          />
        </div>
        {isLoading && <p>Loading...</p>}
        {!isLoading && incomes.length === 0 && <p>No incomes to display.</p>}
        {!isLoading && incomes.length > 0 && (
          <div className="form-r">
            {incomes.map((income) => (
              
              <IncomeItem
                key={income._id}
                id={income._id}
                title={income.title}
                amount={income.amount}
                category={income.category}
                description={income.description}
                type={income.type}
                data={income.date}
                deleteIncome={deleteIncome}
              />
            ))
            
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default Incomes;

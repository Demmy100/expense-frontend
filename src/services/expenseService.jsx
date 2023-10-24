import axios from "axios";

const BACKEND_URL = "https://expense-backend-app.onrender.com/";

//add new expense
const createExpense = async (expData) => {
  const response = await axios.post(
    `${BACKEND_URL}api/track/v1/add-expense`,
    expData
  );
  return response.data;
};

//get all expenses
const getAllExpenses = async () => {
  const response = await axios.get(`${BACKEND_URL}api/track/v1/get-expenses`);
  return response.data;
};

//delete expenses
const deleteExpense = async (id) => {
  const response = await axios.delete(
    `${BACKEND_URL}api/track/v1/delete-expense/${id}`
  );
  return response.data;
};

//get expense
const getExpense = async (id) => {
  const response = await axios.get(
    `${BACKEND_URL}api/track/v1/get-expense/${id}`
  );
  return response.data;
};

const expenseService = {
  createExpense,
  getAllExpenses,
  deleteExpense,
  getExpense,
};

export default expenseService;

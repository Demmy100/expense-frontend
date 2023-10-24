import axios from "axios";

const BACKEND_URL = "https://tiny-pink-camel-wig.cyclic.app/";

//add new income
const createIncome = async (formData) => {
  const response = await axios.post(
    `${BACKEND_URL}api/track/v1/add-income`,
    formData
  );
  return response.data;
};

//get all incomes
const getAllIncomes = async (user) => {
  const response = await axios.get(`${BACKEND_URL}api/track/v1/get-incomes`, {
    params: { user }, // Pass the userId as a query parameter
  });
  return response.data;
};

//delete income
const deleteIncome = async (id) => {
  const response = await axios.delete(
    `${BACKEND_URL}api/track/v1/delete-income/${id}`
  );
  return response.data;
};

//get income
const getIncome = async (id) => {
  const response = await axios.get(
    `${BACKEND_URL}api/track/v1/get-income/${id}`
  );
  return response.data;
};

const incomeService = {
  createIncome,
  getAllIncomes,
  deleteIncome,
  getIncome,
};

export default incomeService;

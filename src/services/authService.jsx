import axios from "axios";
import { toast } from "react-toastify";

export const BACKEND_URL = "http://localhost:8000/";

export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

//Register User
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}api/track/v1/users/register-user`,
      userData,
      { withCredentials: true }
    );
    if (response.statusText === "OK") {
      toast.success("User registered successfully");
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

//Login user
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${BACKEND_URL}api/track/v1/users/login-user`, userData);
    console.log(response.data)
    if (response.statusText === "OK") {
      toast.success("Login Successful.....");
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

//Logout user
export const logoutUser = async () => {
  try {
    await axios.get(`${BACKEND_URL}api/track/v1/users/logout-user`);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};


//Login status
export const getLoginStatus = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}api/track/v1/users/login-status`);
    return response.data
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};


// Get User
export const getUser = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}api/track/v1/users/get-user`);
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    }
  };

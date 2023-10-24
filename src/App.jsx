import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Sidebar from "./components/sidebar/Sidebar";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getLoginStatus } from "./services/authService";
import { SET_LOGIN } from "./redux/auth/authSlice";
import Transaction from "./pages/transaction/Transaction";
import Incomes from "./pages/incomes/Incomes";
import Expenses from "./pages/expenses/Expenses";

axios.defaults.withCredentials = true

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus()
      dispatch(SET_LOGIN(status))
    }
    loginStatus()
  },[dispatch])
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <Sidebar>
              <Layout>
                <Dashboard />
              </Layout>
            </Sidebar>
          }
        />
        <Route path="/transaction" element={
          <Sidebar>
            <Layout>
              <Transaction/>
            </Layout>
          </Sidebar>
        }/>
        <Route path="/incomes" element={
          <Sidebar>
            <Layout>
              <Incomes/>
            </Layout>
          </Sidebar>
        }/>
        <Route path="/expenses" element={
          <Sidebar>
            <Layout>
              <Expenses/>
            </Layout>
          </Sidebar>
        }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

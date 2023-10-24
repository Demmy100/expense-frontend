import React, { useState } from "react";
import "./login.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser, validateEmail } from "../../services/authService";
import { SET_LOGIN, SET_NAME } from "../../redux/auth/authSlice";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const login = async (e) => {
    e.preventDefault()

    if(!email || !password) {
        return toast.error("All fields are required")
    }
    if(!validateEmail(email)) {
        return toast.error("Please enter a valid email")
    }
    const userData = {
        email,
        password,
    }
    setIsLoading(true)
    try {
        const data = await loginUser(userData)
        console.log(data)
        await dispatch(SET_LOGIN(true))
        await dispatch(SET_NAME(data.name))
        navigate("/")
        setIsLoading(false)
    } catch(error) {
        setIsLoading(false)
    }
  }
  return (
    <div className="form-con">
      {isLoading && <div>Loading........</div>}
      <h2>Login</h2>
      <form onSubmit={login}>
        <div className="email-con">
          <span>Email :</span>
          <div className="input-con">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="pass-con">
          <span>Password :</span>
          <div className="input-con">
            <input
              type="password"
              name="password"
              placeholder="secret key"
              value={password}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="btn-con">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;

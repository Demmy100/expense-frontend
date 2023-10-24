import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser, validateEmail } from "../../services/authService";
import { SET_LOGIN, SET_NAME } from "../../redux/auth/authSlice";

const initialState = {
  name: "",
  email: "",
  password: "",
  password2: "",
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const { name, email, password, password2 } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const register = async (e) => {
    e.preventDefault()

    if(!name || !email || !password) {
        return toast.error("All fields are required")
    }
    if(password.length < 6) {
        return toast.error("Password must be up to 6 characters")
    }
    if(!validateEmail(email)) {
        return toast.error("Please enter a valid email")
    }
    if(password !== password2) {
        return toast.error("Passwords do not match")
    }

    const userData = {
        name,
        email,
        password,
    }
    setIsLoading(true)
    try {
        const data = await registerUser(userData)
        //console.log(data)
        await dispatch(SET_LOGIN(false))
        await dispatch(SET_NAME(""))
        navigate("/login")
        setIsLoading(false)
    }catch(error){
        setIsLoading(false)
    }
  }
  return (
    <div className="form-con">
        {isLoading && <div>Loading........</div>}
      <h2>Register</h2>
      <form onSubmit={register}>
        <div className="name-con">
          <span>Name :</span>
          <div className="input-con">
            <input
              type="type"
              name="name"
              placeholder="Enter your name"
              value={name}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
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
        <div className="pass-con">
          <span>Confirm Password :</span>
          <div className="input-con">
            <input
              type="password"
              name="password2"
              placeholder="Confirm Password"
              value={password2}
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

export default Register;

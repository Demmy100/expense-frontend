import React from 'react'
import "./header.css"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SET_LOGIN, selectName } from '../../redux/auth/authSlice'
import { logoutUser } from '../../services/authService'

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const name = useSelector(selectName)

    const logout = async () => {
        await logoutUser()
        await dispatch(SET_LOGIN(false))
        navigate("/")
    }
  return (
    <div className='main-con'>
      <div className="header-item">
        <h3 className='header-title'>
            <span>Welcome,</span>
            <span>{name}</span>
        </h3>
        <button onClick={logout} className="btn">Logout</button>
      </div>
    </div>
  )
}

export default Header

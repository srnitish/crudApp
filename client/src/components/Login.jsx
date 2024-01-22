import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, loginSuccess } from "../features/userDetailSlice";
// import { loginSuccess } from '../features/userDetailSlice';

const Login = () => {

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const {loading, error } = useSelector((state)=>state.app)

  const directFocus = useRef();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(()=>{
    directFocus.current.focus();
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
   dispatch(loginUser(credentials));
   navigate("/profile");
  };

  
  return (
    <>
    <div className="container">
    <div className="row mt-4 col-md-4 col-sm-9 mx-auto register">
      <span className="mb-5">Welcome Back 👋</span>

<form onSubmit={handleSubmit}>
  <div className="mb-3">
    <input type="email" className="form-control" ref={directFocus} value={credentials.email} placeholder="johndoe@gmail.com" name="email" aria-describedby="email" onChange={handleChange} required/>
  </div>
  <div className="mb-3">
    <input type="password" className="form-control" value={credentials.password} placeholder="Password" name="password" aria-describedby="password" onChange={handleChange} required/>
  </div>
  <div className="loginRegister mt-1 mb-2 text-end"><Link to="/forgotPassword">Forgot Password?</Link></div>
  <button type="submit" className="btn btn-md btn-register d-block mx-auto">
    {loading?'Loading...': 'Login'}
  </button>
{error && (
  <div className="alert alert-danger" role="alert">
    {error}
  </div>
)}

  <div className="loginRegister mt-1">
  Don’t have an account? <Link to="/create">Register Now!</Link>
  </div>
</form>
    </div>
    </div>
   </>
  );
};

export default Login;

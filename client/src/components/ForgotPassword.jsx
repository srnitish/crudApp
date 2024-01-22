import React, { useEffect, useState, useRef } from "react";
import toast, {Toaster} from 'react-hot-toast';
import {useFormik } from 'formik';
import { Link, useNavigate, Navigate } from "react-router-dom";
import { resetPasswordValidation } from "../helper/validate";
import { resetPassword } from "../helper/helper";
import { useAuthStore } from "../store/store";
import useFetch from "../hooks/fetch.hook";


const BackupLogin = () => {

  const email = useAuthStore((state) => state.userEmail.email);
  const navigate = useNavigate();
  const [{isLoading, apidata, status, serverError }] = useFetch('createResetSession');


  
  const formik = useFormik({
    initialValues: {
      password: 'admin1234',
      confirm_pwd:'admin1234',
    },
    
    validate: resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values =>{
      console.log(values)
      console.log("This email is coming from Zustand",email);

       let resetPromise = resetPassword({email, password: values.password})
       toast.promise(resetPromise, {
        loading: 'Updating...',
        success: <b>Reset Successfully!!</b>,
        error: <b>Could not Reset!</b>
       });

       resetPromise.then(function(){ navigate('/') });

    }
  })

     if(isLoading) return <h1>isLoading</h1>;
   if(serverError) return <h1 className="text-danger">{serverError.message}</h1>
  if(status && status!== 201 || status == 440) return <Navigate to={'/'} replace={true}></Navigate>


  return (
    <>
    <div className="container">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
    <div className="row mt-4 col-md-4 col-sm-9 mx-auto register">
      <span className="mb-5">Welcome Back 👋</span>

<form onSubmit={formik.handleSubmit}>
  <div className="mb-3">
    <input {...formik.getFieldProps('password')} type="password" className="form-control" placeholder="Enter New Password" name="password" aria-describedby="password"/>
  </div>
  <div className="mb-3">
  <input {...formik.getFieldProps('confirm_pwd')} type="password" className="form-control" placeholder="Re-Enter New Password" name="confirm_pwd" aria-describedby="confirm_password"/>
  </div>
  <button type="submit" className="btn btn-md btn-register d-block mx-auto">Reset Password
    {/* {loading?'Loading...': 'Reset Password'} */}
  </button>
{/* {error && (
  <div className="alert alert-danger" role="alert">
    {error}
  </div>
)} */}

  <div className="loginRegister mt-1">
  Don’t have an account? <Link to="/create">Register Now!</Link>
  </div>
</form>
    </div>
    </div>
   </>
  );
};

export default BackupLogin;

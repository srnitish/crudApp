import React from "react";
import toast, {Toaster} from 'react-hot-toast';
import { useFormik } from 'formik';
import { Link, useNavigate } from "react-router-dom";
import { loginValidation } from "../helper/validate";
import { useAuthStore } from '../store/store';
import { verifyPassword } from '../helper/helper';

const BackupLogin = () => {

  const navigate = useNavigate();
  // const {email} = useAuthStore(state => state.auth);
  // const setEmail = useAuthStore(state => state.setEmail);
  // const { email } = useAuthStore(state => state.auth)
  // const setEmail = useAuthStore(state => state.setEmail);


  const formik = useFormik({
    initialValues: {
      email: '',
      password:'',
    },
    validate: loginValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      console.log(values);
      // setEmail(values.email);

      let loginPromise = verifyPassword({ email: values.email, password : values.password })
      toast.promise(loginPromise, {
        loading: 'Checking...',
        success : <b>Login Successfully...!</b>,
        error :   <b>Password Not Match!</b>
      });

      //  function myFun(){}

      //  nitish = () =>{}

      loginPromise.then(res=>{
      let {token} = res.data;
      console.log("This is myToken", token);
      localStorage.setItem('token', token);
      navigate('/Profile');
     })
    }
  })

  //  if(isLoading) return <h1>isLoading</h1>;
  //  if(serverError) return <h1 className="text-danger">{serverError.message}</h1>

  
  return (
    <>
    <div className="container">
        <Toaster position="top-center" reverseOrder={false}/>
    <div className="row mt-4 col-md-4 col-sm-9 mx-auto register">
      <span className="mb-5">Welcome Back 👋</span>

<form onSubmit={formik.handleSubmit}>
  <div className="mb-3">
    <input {...formik.getFieldProps('email')} type="email" className="form-control" placeholder="johndoe@gmail.com" name="email" aria-describedby="email"/>
  </div>
  <div className="mb-3">
    <input type="password" {...formik.getFieldProps('password')} className="form-control"  placeholder="Password" name="password" aria-describedby="password" />
  </div>
  <div className="loginRegister mt-1 mb-2 text-end"><Link to="/recovery">Forgot Password?</Link></div>
  <button type="submit" className="btn btn-md btn-register d-block mx-auto">Login
    {/* {isLoading?'Loading...': 'Login'} */}
  </button>


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

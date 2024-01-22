import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import toast, {Toaster} from 'react-hot-toast';
import {useFormik } from 'formik';
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../features/userDetailSlice";
import avatar_img from "../assets/avatar_img.png";
import { registerValidation } from "../helper/validate";
import convertToBase64 from '../helper/convert';
import {registerUser} from '../helper/helper';


const Create = () => {

  const [file,setFile] = useState();

  const [value, setValue] = useState({});

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // const getUserData = (e) => {
  //   setUsers({ ...users, [e.target.name]: e.target.value });
  // };

  // formik doesnot support file upload
  const onUpload = async (e) =>{
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }

  const formik = useFormik({
    initialValues: {
      firstname:'',
      lastname: 'Srivastava',
      email: '',
      password:'admin',
      age:'34',
    },
    
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async  values =>{
      values = await Object.assign(values, {profile: file || ''});
      let registerPromise = registerUser(values)
      console.log("This is the register data", values.data);
      toast.promise(registerPromise, {
        loading: "Creating....",
        success: <b>Register Successfully..!!</b>,
        error: <b>Registration Failed...Email already exist, try to Login instead!! </b>
      });

      registerPromise.then(function() { navigate ('/')})
      // console.log(values)
      // useFormik.preventDefault();
    // console.log("users...", users);
    // setValue({ ...value, [e.target.name]: e.target.value });
    // dispatch(createUser(values));
    // navigate("/read");
    }
  })

  const directFocus = useRef();

  useEffect(()=>{
    directFocus.current.focus();
  },[])

  return (
    <>
    <div className="container">
    <Toaster position="top-center" reverseOrder={false}></Toaster>
    <div className="row mt-4 col-md-5 col-sm-12 mx-auto register">
      <span className="mb-3">User Registration 👋</span>

<form onSubmit={formik.handleSubmit}>
<div className="mb-3">
  <div className="text-center">
    <label htmlFor="profile">
    <img src={file || avatar_img} className="rounded mx-auto d-block w-50" alt="Profile Img" />
    </label>
    <input onChange={onUpload} type="file" id="profile" name="profile"/>
    
  </div>
</div>
  <div className="mb-3">
    <input type="text" {...formik.getFieldProps('firstname')}  ref={directFocus} placeholder="John Doe" className="form-control" name="firstname" aria-describedby="firstname"  />
  </div>
  <div className="mb-3">
    <input type="text" {...formik.getFieldProps('lastname')}  ref={directFocus} placeholder="John Doe" className="form-control" name="lastname" aria-describedby="lastname"  />
  </div>
  <div className="mb-3">
    <input type="email" {...formik.getFieldProps('email')} className="form-control" placeholder="johndoe@gmail.com" name="email" aria-describedby="emailHelp"  />
    <div id="emailHelp" className="form-text d-flex">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <input type="password" {...formik.getFieldProps('password')} className="form-control" placeholder="Password" name="password" aria-describedby="password"  />
  </div>
  <div className="mb-3">
    <input type="text" {...formik.getFieldProps('age')} className="form-control" placeholder="Age" name="age" aria-describedby="age"  />
  </div>
  <div className="form-check form-check-inline mb-3">
    <input className="form-check-input" type="radio" name="gender" value="Male" />
    <label className="form-check-label d-flex" htmlFor="gender">Male</label>
  </div>
  <div className="form-check form-check-inline mb-3">
    <input className="form-check-input" type="radio" name="gender" value="Female" />
    <label className="form-check-label d-flex" htmlFor="gender">Female</label>
  </div>
  <button  type="submit" className="btn btn-md btn-register d-block mx-auto">Register</button>
  <div className="loginRegister mt-1">
  Already have an account? <Link to="/login">Login Now!</Link>
  </div>
</form>
    </div>
    </div>
   </>
  );
};

export default Create;

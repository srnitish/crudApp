import React, { useState } from "react";
// import { useDispatch } from "react-redux";
import toast, {Toaster} from 'react-hot-toast';
import {useFormik } from 'formik';
import { Link, useNavigate } from "react-router-dom";
// import { createUser } from "../features/userDetailSlice
// import { useAuthStore } from "../store/store";
import useFetch from '../hooks/fetch.hook';
import avatar_img from "../assets/avatar_img.png";
import { profileValidation } from "../helper/validate";
import convertToBase64 from '../helper/convert';
import { updateUser } from "../helper/helper";


const Profile = () => {

  const [file,setFile] = useState();

  const navigate = useNavigate();

  // const { email } = useAuthStore(state => state.auth);
  // const [{isLoading, apiData, serverError}] = useFetch(`user/${email}`);
  const [{isLoading, apiData, serverError}] = useFetch();

  // formik doesnot support file upload
  const onUpload = async (e) =>{
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }

  const formik = useFormik({
    initialValues: {
      firstname: apiData?.firstname || '',
      lastname: apiData?.lastname || '',
      email: apiData?.email || '',
      mobile: apiData?.mobile || '',
      address: apiData?.address || '',
    },
    enableReinitialize: true,
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      values = await Object.assign(values, {profile: file || apiData?.profile || ''});
      // console.log(values)
      let updatePromise = updateUser(values);

      toast.promise(updatePromise,{
        loading: 'Updating...',
        success: <b>Updated Successfully!!</b>,
        error: <b>Could not Update!!</b>
      })
    }
  })

   function userLogout() {
      localStorage.removeItem('token');
      navigate('/login');
    }

   if(isLoading) return <h1>isLoading</h1>;
   if(serverError) return <h1 className="text-danger">{serverError.message}</h1>


  return (
    <>
    <div className="container">
    <Toaster position="top-center" reverseOrder={false}></Toaster>
    <div className="row mt-4 col-md-6 col-sm-9 mx-auto register">
      <span className="mb-3">Welcome {apiData?.firstname} On Your Profile!! 👋</span>

<form onSubmit={formik.handleSubmit}>
<div className="mb-3">
  <div className="text-center">
    <label htmlFor="profile">
    <img src={ file || apiData?.profile || avatar_img} className="rounded mx-auto d-block w-50" alt="Profile Img" />
    </label>
    <input onChange={onUpload} type="file" id="profile" name="profile"/>
    
  </div>
</div>
    <div className="row">
      <div className="col-md-6">
      <div className="mb-3">
    <input type="text" {...formik.getFieldProps('firstname')}  placeholder="First Name" className="form-control" name="firstname" aria-describedby="firstname"  />
  </div>
      </div>
      <div className="col-md-6">
      <div className="mb-3">
    <input type="text" {...formik.getFieldProps('lastname')} placeholder="Last Name" className="form-control" name="lastname" aria-describedby="lastname"  />
  </div>
      </div>
      <div className="col-md-6">
      <div className="mb-3">
    <input type="email" {...formik.getFieldProps('email')} className="form-control" placeholder="Email" name="email" aria-describedby="emailHelp"  />
    <div className="form-text d-flex">We'll never share your email.</div>
  </div>
      </div>
      <div className="col-md-6">
      <div className="mb-3">
    <input type="text" {...formik.getFieldProps('mobile')} className="form-control" placeholder="Mobile Number" name="mobile" aria-describedby="mobile"  />
    <div className="form-text d-flex">We'll never share your Mobile.</div>
  </div>
      </div>
    </div>

  <div className="mb-3">
    <input type="textarea" {...formik.getFieldProps('address')} className="form-control" rows="10" placeholder="Address" name="address" aria-describedby="address"  />
  </div>

  {/* <div className="form-check form-check-inline mb-3">
    <input className="form-check-input" type="radio" name="gender" value="Male" />
    <label className="form-check-label d-flex" htmlFor="gender">Male</label>
  </div>
  <div className="form-check form-check-inline mb-3">
    <input className="form-check-input" type="radio" name="gender" value="Female" />
    <label className="form-check-label d-flex" htmlFor="gender">Female</label>
  </div> */}
  <button  type="submit" className="btn btn-md btn-register d-block mx-auto">Update</button>
  <div className="loginRegister mt-1">
  come back later? <button className="btn-logout" onClick={userLogout}>Log Out</button>
  </div>
</form>
    </div>
    </div>
   </>
  );
};

export default Profile;

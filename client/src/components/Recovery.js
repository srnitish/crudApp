import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useAuthStore } from  '../store/store';
import { useFormik, useFormikContext } from 'formik';
// import styles from '../styles/Username.module.css';
import { generateOTP, verifyOTP } from '../helper/helper';
import {Link, useNavigate } from 'react-router-dom';
import { getUser } from '../helper/helper';
import { recoverValidation } from '../helper/validate';

export default function Recovery() {

    
    const setUserEmail = useAuthStore((state) => state.setUserEmail);
    // const setEmail = useAuthStore(state => state.setEmail);
  const [OTP, setOTP] = useState();
  const navigate = useNavigate();


  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate: recoverValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
      setUserEmail(values);
    //   setEmail(values.email);
      console.log("setEmail", setUserEmail);
      let recoveryPromise = generateOTP({email:values.email})
      toast.promise(recoveryPromise,{
          loading: 'Generating OTP...',
          success: <b>OTP Generated..!!</b>,
          error: <b>Not able to generateOTP</b>
      })
      recoveryPromise.then((OTP) => {
        console.log(OTP)
        if(OTP) return toast.success('OTP has been send to your email!');
        return toast.error('Problem while generating OTP!');
      })

   
    }
  })
  const GenerateOTPA = async () => {   
    const { email } = formik.values; //the way to get the formik form field value to another function.
    try {
        let { status } = await verifyOTP({email:email, code : OTP })
        // console.log("Verify Email:", email);
        if(status === 201){
          toast.success('Verify Successfully!')
          return navigate('/forgotPassword')
        }  
      } catch (error) {
        return toast.error('Wrong OTP! Check email again!')
      }
  }

  // handler of resend OTP
  function resendOTP(){
    const { email } = formik.values; //the way to get the formik form field value to another function.
    let sentPromise = generateOTP(email);

    toast.promise(sentPromise ,
      {
        loading: 'Sending...',
        success: <b>OTP has been send to your email!</b>,
        error: <b>Could not Send it!</b>,
      }
    );

    sentPromise.then((OTP) => {
      console.log(OTP)
    });
    
  }

  return (
<>
<div className="container">
    <Toaster position="top-center" reverseOrder={false}/>
<div className="row mt-4 col-md-4 col-sm-9 mx-auto register">
  <span className="mb-5">Recovery 🤗</span>
  <span className='otp mb-2'>Enter Email Address to recover Password</span>
    
           
<form onSubmit={formik.handleSubmit}>
<div className="mb-2">
        <input {...formik.getFieldProps('email')} type="email" className="form-control" placeholder="johndoe@gmail.com" name="email" aria-describedby="email"/>
    </div>
<button type="submit" className="btn btn-md btn-register d-block mx-auto">Verify Email & Generate OTP</button>


</form>

<div className="mb-2 mt-4">
    <input type="text" onChange={(e) => setOTP(e.target.value) } className="form-control" placeholder="Enter 6 digit OTP sent to your email address" name="OTP" aria-describedby="OTP"/>
</div>

<div className="text-center py-0">
    <button onClick={GenerateOTPA} className='btn btn-md btn-register d-block mx-auto'>Verify OTP</button>
</div> 
<div className="text-center py-2">
    <span className=''>Can't get OTP? <button onClick={formik.handleSubmit} className='text-danger btn-logout'>Resend OTP</button></span>
</div>
<div className="loginRegister mt-1">
Don’t have an account? <Link to="/create">Register Now!</Link>
</div>

</div>
</div>
</>






  )
}

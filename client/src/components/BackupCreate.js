import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../features/userDetailSlice";

const BackupCreate = () => {
    const [users, setUsers] = useState({});

    const directFocus = useRef();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const getUserData = (e) => {
        setUsers({...users, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        directFocus.current.focus();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("users...", users);
        dispatch(createUser(users));
        navigate("/read");
    };

    return ( 
        <>
        <div className = "container">
        <div className = "row mt-4 col-md-4 col-sm-9 mx-auto register">
        <span className = "mb-5" > User Registration👋 </span>

        {
            /* <form className="w-50 mx-auto my-5" onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        onChange={getUserData}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        onChange={getUserData}
                        ref={directFocus}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Age</label>
                      <input
                        type="text"
                        name="age"
                        className="form-control"
                        onChange={getUserData}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        className="form-check-input"
                        name="gender"
                        value="Male"
                        type="radio"
                        onChange={getUserData}
                        required
                      />
                      <label className="form-check-label">Male</label>
                    </div>
                    <div className="mb-3">
                      <input
                        className="form-check-input"
                        name="gender"
                        value="Female"
                        type="radio"
                        onChange={getUserData}
                      />
                      <label className="form-check-label">Female</label>
                    </div>

                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </form> */
        }

        <form onSubmit = { handleSubmit }>
          <div className = "mb-3" > 
          { /* <label for="name" className="form-label d-flex">Name</label> */ } 
          <input type = "text" ref = { directFocus } placeholder = "John Doe" className = "form-control" name = "name"
          aria-describedby = "emailHelp" onChange = { getUserData } required />
          </div> 

          <div className = "mb-3">
            { /* <label for="email" className="form-label d-flex">Email address</label> */ } 
            <input type = "email" className = "form-control" placeholder = "johndoe@gmail.com" name = "email" aria-describedby = "emailHelp" onChange = { getUserData } required />
            <div id = "emailHelp" className = "form-text d-flex" > We 'll never share your email with anyone else.</div> 
          </div> 

          <div className="mb-3"> 
            { /* <label for="age" className="form-label d-flex">Age</label> */ } 
            <input type = "password" className = "form-control" placeholder = "Password" name = "password" aria-describedby = "password" onChange = { getUserData } required/>
          </div> 

          <div className="mb-3"> 
            { /* <label for="age" className="form-label d-flex">Age</label> */ } 
            <input type = "text" className = "form-control" placeholder = "Age" name = "age" aria-describedby = "age" onChange = { getUserData } required />
          </div> 

        <div className = "form-check form-check-inline mb-3">
          <input className = "form-check-input" type = "radio" name = "gender" value = "Male" onChange = { getUserData }/> 
          <label className = "form-check-label d-flex" htmlfor = "gender" > Male </label> 
        </div> 


        <div className = "form-check form-check-inline mb-3">
          <input className = "form-check-input" type = "radio" name = "gender" value = "Female" onChange = { getUserData }/> 
          <label className = "form-check-label d-flex" htmlFor = "gender" > Female </label> 
        </div> 

        <button type = "submit" className = "btn btn-md btn-register d-block mx-auto" > Register </button> 
        
        <div className = "loginRegister mt-1" > Already have an account ? < Link to = "/login" > Login Now! </Link> 
        </div>
        </form>
        </div>
        </div>
        </>
    );
};

export default BackupCreate;
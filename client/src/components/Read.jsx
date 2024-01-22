import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from "react-router-dom";
import { deleteUser, displayUser } from "../features/userDetailSlice";

import CustomModal from "./CustomModal";

const Read = () => {
  const dispatch = useDispatch();

  const [id, setId] = useState();

  const [radioData, setRadioData] = useState("");

  const [showPopup, setShowPopup] = useState(false);

  const { users, loading, searchData } = useSelector((state) => state.app);



  useEffect(() => {
    dispatch(displayUser());
  }, []);


  if (loading) {
    return <h2>Loading</h2>;
  }


  return (
    <>          
    <div>
      {showPopup && (
        <CustomModal
          id={id}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
        />
      )}
<div className="container">
<div className="row mt-3 col-md-12 col-sm-9 mx-auto userPage">
      <span className="mb-4 mt-3">Registered Users</span>
<div className="radioMain d-flex mx-auto w-25">

  <div className="radioAll">
  <input className="form-check-input" name="gender" checked={radioData === ""} type="radio" onChange={(e) => setRadioData("")}/>
      <label className="form-check-label">All</label>
  </div>

  <div className="radioMale mx-auto">
  <input className="form-check-input" name="gender" checked={radioData === "Male"} value="Male" type="radio" onChange={(e) => setRadioData(e.target.value)}/>
      <label className="form-check-label">Male</label>
  </div>
    
  <div className="radioFemale mx-auto">
  <input className="form-check-input" name="gender" value="Female" checked={radioData === "Female"} type="radio" onChange={(e) => setRadioData(e.target.value)} />
      <label className="form-check-label">Female</label>
  </div>
      
</div>

      <div>

              <>
              <div  className="container mt-3">
              
                <table className="table table-hover table-responsive">
                  
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Gender</th>
                      <th></th>
                    </tr>
                  </thead>

                  {users &&
                   users.filter((ele) => {
              if (searchData.length === 0) {
                return ele;
              } else {
                return ele.name
                  .toLowerCase()
                  .includes(searchData.toLowerCase());
              }
            })

            .filter((ele) => {
              if (radioData === "Male") {
                return ele.gender === radioData;
              } else if (radioData === "Female") {
                return ele.gender === radioData;
              } else return ele;
            })
            
            .map((ele) => (
              
                  <tbody key={ele.id}>
                    
                    <tr>
                      <td>{ele.name}</td>
                      <td>{ele.email}</td>
                      <td>{ele.gender}</td>
                      <td className="actions">
                      <i className="bi bi-eye px-3 pe-auto" onClick={() => [setId(ele.id), setShowPopup(true)]}></i>
                      <Link to={`/edit/${ele.id}`} className="card-link"><i className="bi bi-pencil px-1"/></Link>
                      <Link onClick={() => dispatch(deleteUser(ele.id))} className="card-link"><i className="bi bi-archive"/></Link>
                    
                  </td>
                    </tr>
                    
                  </tbody>
                  
                  ))}
                </table>
              </div>
              
              </>
            </div>
      </div>
      </div>
    </div>



    </>
  );
  
};

export default Read;

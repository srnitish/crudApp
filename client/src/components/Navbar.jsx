import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { searchUser } from "../features/userDetailSlice";


const Navbar = () => {

  const allusers = useSelector((state) => state.app.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const isLoginPage = location.pathname === '/login' || location.pathname === "/" || location.pathname ==="/forgotPassword";
  const isRegisterPage = location.pathname === '/create';
  const isProfilePage = location.pathname === '/Profile';

  const [searchData, setSearchData] = useState("");

  function userLogout() {
    localStorage.removeItem('token');
    navigate('/login');
  }

  useEffect(() => {
    dispatch(searchUser(searchData));
  }, [searchData]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary navbar-bg text-light">
        <div className="container-fluid ">
          <h4 className="navbar-brand text-light">REACT-CRUD</h4>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCrud2" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCrud2">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/create" className="nav-link text-light">
                  Register
                </Link>
              </li>

              {!isLoginPage && !isRegisterPage && !isProfilePage && (
              <li className="nav-item">
                <Link to="/read" className="nav-link text-light">
                  Users
                 {/* ({allusers.length}); */}
                ({(allusers? allusers.length: console.log("Length Issue, Resolved"))})
                 
                 </Link>
              </li>
              )
              }
            </ul>
              <form className="search">
              {!isLoginPage && !isRegisterPage &&  !isProfilePage && (
                <input className="form-control me-2 w-100" type="search" placeholder="Search" aria-label="Search" value={searchData} onChange={(e) => setSearchData(e.target.value)}/>
              )}

            {isProfilePage && (
            <span className="nav-item">
            <button onClick={userLogout} className="nav-link text-light btn-logout">
                  SignOut
                </button>
            </span>
            )} 
            </form>
            
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

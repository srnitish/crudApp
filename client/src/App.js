import { BrowserRouter, Route, Routes } from "react-router-dom";
import Create from "./components/Create";
import BackupCreate from "./components/BackupCreate";
// import Login from "./components/Login";
import BackupLogin from "./components/BackupLogin";
import Navbar from "./components/Navbar";
import ForgotPassword from "./components/ForgotPassword";
import Read from "./components/Read";
import Update from "./components/Update";
import Profile from "./components/Profile";
import Recovery from "./components/Recovery";
import "./App.css";
// import Register from "./components/Register";


/**MiddleWare to Protect Routes**/
import { AuthorizeUser } from "./middleware/auth";


function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/crud-redux">
        <Navbar />
        <Routes>
        <Route exact path="/" element={<BackupLogin />} />
          <Route exact path="/login" element={<BackupLogin />} />
          <Route exact path="/create" element={<Create />} />
          <Route exact path="/backupcreate" element={<BackupCreate />} />
          <Route exact path="/profile" element={<AuthorizeUser><Profile/></AuthorizeUser>} />
          <Route exact path="/recovery" element={<Recovery />} /> 
          <Route exact path="/forgotPassword" element={<ForgotPassword />} />
          <Route exact path="/read" element={<Read />} />
          <Route exact path="/edit/:id" element={<Update />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

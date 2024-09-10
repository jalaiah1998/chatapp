import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [isSignUp, setIsSignUp] = useState(false);


  const openSignUpPage = () => {
    setIsLogin(false);
    setIsSignUp(true);
  };

  const openLoginPage = () => {
    setIsLogin(true);
    setIsSignUp(false);
  };



  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div
                className="App d-flex justify-content-center align-items-center "
                style={{
                  backgroundColor: "#f7f7ff",
                  width: "100vw",
                  height: "100vh",
                }}
              >
                {isLogin ? (
                  <Login
                    signUp={openSignUpPage}
                   
                  />
                ) : (
                  <SignUp login={openLoginPage} />
                ) }
              </div>
            }
          />
          <Route
            path="/dashboard"
            element={<Dashboard  />}
          />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import Input from "./Input";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import Loader from "./Spinner";

const Login = ({ signUp  }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false)
  
  const nav = useNavigate();
  
  useEffect(() => {
    let token = Cookies.get('jwt_token');
    if(token){
      nav('/dashboard')
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoader(true);
    //Check empty inputs and toasting
    if (!name && !password) {
      toast.error("Email and Password should not be empty!", {
        position: "top-right",
      });
    } else {
      //try login
      const body = { username: name, password: password };
      try {
        axios
          .post("http://localhost:4444/auth/login", body)
          .then((res) => {
          
            toast.success("Login Successfull! Enjoy Chatting", {
              positon: "top-right",
              autoClose: 1000,
            });

           
            Cookies.set('jwt_token', res.data.token)
            setLoader(false)
            nav("/dashboard");
          })
          .catch((res) => {
            if (res.status === "400" || "401"){
              toast.error('Invalid Credentials');
              setLoader(false)
            }
            else{
              toast.error(
                "Sorry, Server is in Maintenance!! We will look into it ASAP."
              );
            }
          });
      } catch (error) {
        toast.error(error);
      }
    }
  };



 
  return (
    <div
      className="container justify-content-center"
      style={{ marginTop: "-5.5rem" }}
    >
      <div className="row   d-flex justify-content-center">
        <div
          className="col-lg-5 col-xl-4 col-md-7 col-sm-9  d-flex flex-column justify-content-center"
          style={{ padding: "0" }}
        >
          <div className="header-inner text-center ">
            <div
              style={{ marginBottom: "3rem" }}
              className="d-flex align-items-center justify-content-center"
            >
              <i
                className="ri-chat-voice-fill"
                style={{
                  color: "#7269ef",
                  fontSize: "1.55rem",
                  marginRight: "0.5rem",
                }}
              ></i>
              <h4 className="">Chat App</h4>
            </div>
            <div>
              <h4 className="m-1">Sign In </h4>
              <p style={{ color: "lightslategrey", marginBottom: "4rem" }}>
                Sign in to continue to Chat App.
              </p>
            </div>
          </div>

          <div
            className=" d-flex flex-column "
            style={{
              backgroundColor: "#fff",
              padding: "2.5rem 2rem",
              marginTop: "-2.5rem",
            }}
          >
            <form className="" onSubmit={handleLogin}>
             
              <Input
                {...{
                  type: "text",
                  name: "username",
                  value: name,
                  placeholder: "Enter Username...",
                  label: "Username",
                  icon: <i className="ri-user-2-line"></i>,
                }}
                onChange={(e) => setName(e)}
              />
              <Input
                {...{
                  type: "password",
                  name: "password",
                  value: password,

                  placeholder: "Enter Password...",
                  label: "Password",
                  icon: <i className="ri-lock-password-line"></i>,
                }}
                onChange={(e) => setPassword(e)}
              />
              <div className="d-flex justify-content-between">
                <label>
                  <input
                    type="checkbox"
                    style={{
                      backgroundColor: "#f7f7ff",
                      marginRight: "1rem",
                      marginLeft: "0.5rem",
                    }}
                  />
                  Remember Me
                </label>
              
              </div>
              <input
                type="submit"
                value={"Sign In"}
                className="form-control "
                style={{
                  backgroundColor: "#7269ef",
                  color: "white",
                  fontWeight: "400",
                  marginTop: "2rem",
                }}
              />
            </form>
            <div className="text-center mt-2">
             {loader && <Loader/>}
             </div>
          </div>
          <div className="d-flex flex-column justify-content-between text-center mt-5">
            <p>
              Don't have an account ?{" "}
              <button
                onClick={() => signUp()}
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#7269ef",
                  fontWeight: "400",
                  fontSize: "16px",
                }}
              >
                Signup now
              </button>
            
            </p>
            <p>
              © 2024 Chat App
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

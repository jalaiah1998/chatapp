import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import Loader from "./Spinner";

const SignUp = ({ login, user }) => {
  const [role, setRole] = useState("admin");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    if (user) nav("/dashboard");
  });

  const handleSignUp = (e) => {
    e.preventDefault();
    setLoader(true);

    //Check empty inputs and toasting
    if (!role && !password && !name) {
      toast.error("Email , Password and Name should not be empty!", {
        position: "top-right",
      });
    } else {
      //try signUp
      const body = { username: name, password: password, role: role };
      try {
        axios
          .post("http://localhost:4444/auth/register", body)
          .then((res) => {
            toast.success(res.data, {
              positon: "top-right",
              autoClose: 2000,
            });
            setLoader(false);
            login();
          })
          .catch((res) => {
            if (res.status === "404" || "401")
              toast.error("username is already exists");
            else
              toast.error(
                "Sorry, Server is in Maintenance!! We will look into it ASAP."
              );
          });
      } catch (error) {
        toast.error(error);
      }
    }
  };

  return (
    <div className="container justify-content-center">
      <div className="row   d-flex justify-content-center">
        <div
          className="col-lg-5 col-xl-4 col-md-7 col-sm-9 d-flex flex-column justify-content-center"
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
                  marginRight: "0rem",
                }}
              ></i>
              <h4 className="m-1"> Chat App</h4>
            </div>
            <div>
              <h4 className="m-1">Register </h4>
              <p style={{ color: "lightslategrey", marginBottom: "4rem" }}>
                Get your Chat App account now.
              </p>
            </div>
          </div>

          <div
            className=" d-flex flex-column "
            style={{
              backgroundColor: "#fff",
              padding: "1.5rem 1rem",
              marginTop: "-2.5rem",
              borderRadius: "7px",
            }}
          >
            <form className=" " onSubmit={handleSignUp}>
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

              <div className="w-100 d-flex flex-column mb-3 ">
                <label
                  className="mb-2"
                  style={{ fontSize: "1rem", fontWeight: "500" }}
                >
                  Role
                </label>
                <div className="d-flex">
                  <div
                    style={{
                      width: "2.75rem",
                      height: "2.75rem",
                      borderTopLeftRadius: "5px",
                      borderBottomLeftRadius: "5px",
                      backgroundColor: "#f7f7ff",
                      padding: "0.7rem 0.9rem",
                      borderLeft: "solid 1px #e0eee5",
                      borderTop: "solid 1px #e0eee5",
                      borderBottom: "solid 1px #e0eee5",
                    }}
                  >
                    <i class="ri-account-pin-circle-line"></i>
                  </div>
                  <select
                    style={{
                      border: "solid 1px #e0eee5",
                      borderRadius: "none",
                      width: "100%",
                      borderTopRightRadius: "5px",
                      borderBottomRightRadius: "5px",
                      paddingLeft: "1rem",
                      padding: "10px",
                    }}
                    name={role}
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>
              </div>

              <input
                type="submit"
                value={"Register"}
                className="form-control "
                style={{
                  backgroundColor: "#7269ef",
                  color: "white",
                  fontWeight: "400",
                  marginTop: "2rem",
                }}
              />
            </form>
            <div className="text-center mt-2">{loader && <Loader />}</div>
            <div className="d-flex justify-content-center mt-4 text-center">
              <p style={{ marginBottom: "0", color: "grey" }}>
                By registering you agree to the Chat App
                <button
                  onClick={() => {}}
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "#7269ef",
                    fontWeight: "400",
                    fontSize: "16px",
                  }}
                >
                  Terms of Use.
                </button>
              </p>
            </div>
          </div>
          <div className="d-flex flex-column justify-content-between text-center mt-5">
            <p>
              Already have an account ?{" "}
              <button
                onClick={() => login()}
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#7269ef",
                  fontWeight: "400",
                  fontSize: "16px",
                }}
              >
                Sign In now
              </button>
            </p>
            <p>© 2024 Chat App</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

import React, { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";

const Profile = ({ isSelected, theme, user }) => {

  const farray = [
    { name: "File1.zip", size: "12.5 MB" },
    { name: "File2.jpg", size: "3.5 MB" },
  ];



  return (
    <div>
      <div className="d-flex justify-content-between px-4 pt-4">
        <h4
          className="mb-0"
          style={{ fontSize: "21px", color: theme ? "#eff2f7" : "#000000" }}
        >
          {isSelected}
        </h4>
       
          <i
            className="ri-more-2-fill"
            style={{ color: theme ? "#abb4d2" : "#7a7f9a", fontSize: "18px" }}
          ></i>
     
      </div>
      <div
        className="p-4 text-center"
        style={{
          borderBottom: "1px solid " + (theme ? "#36404a" : "#f0eff5"),
        }}
      >
        <div className="mb-4">
          <img
            className="rounded-circle"
            src='https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg'
            alt="profile"
            style={{
              width: "96px",
              height: "96px",
              padding: "4px",
              marginTop: "-2px",
            }}
          />
        </div>
        <h5
          style={{ fontSize: "16px", color: theme ? "#eff2f7" : "#000000" }}
          className="mb-1"
        >
          {user.username}
        </h5>
        <p className="mb-1" style={{ color: "#7a7f9a", fontSize: "15px" }}>
          Active
        </p>
      </div>
      <div className="p-4">
        <p
          className="mb-4"
          style={{ fontSize: "16px", color: theme ? "#abb4d2" : "#7a7f9a" }}
        >
          If several languages coalesce,the grammer of the resulting language is
          more simple and regular than that of the individual.
        </p>
        <div>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header
                style={{ backgroundColor: theme ? "#a6b0cf08" : "#49505708" }}
              >
                <h5
                  style={{
                    color: theme ? "#eff2f7" : "#000000",
                    fontSize: "14px",
                    margin: "0",
                  }}
                >
                  <i
                    className="ri-user-2-line"
                    style={{
                      marginRight: "10px",
                      fontWeight: "900",
                      fontSize: "14px",
                    }}
                  ></i>
                  About
                </h5>
              </Accordion.Header>
              <Accordion.Body
                style={{ backgroundColor: theme ? "#262e35" : "#fff" }}
              >
                <div>
                  <p
                    className="mb-1"
                    style={{
                      color: theme ? "#abb4d2" : "#7a7f9a",
                      fontSize: "15px",
                    }}
                  >
                    Name
                  </p>
                  <h5
                    style={{
                      color: theme ? "#eff2f7" : "#343a40",
                      fontSize: "14px",
                    }}
                    className="mb-2"
                  >
                    {user.username}
                  </h5>
                </div>
                <div className="mt-4">
                  <p
                    className="mb-1"
                    style={{
                      color: theme ? "#abb4d2" : "#7a7f9a",
                      fontSize: "15px",
                    }}
                  >
                    Role
                  </p>
                  <h5
                    style={{
                      color: theme ? "#eff2f7" : "#343a40",
                      fontSize: "14px",
                    }}
                    className="mb-2"
                  >
                    {user.role}
                  </h5>
                </div>
                <div className="mt-4">
                  <p
                    className="mb-1"
                    style={{
                      color: theme ? "#abb4d2" : "#7a7f9a",
                      fontSize: "15px",
                    }}
                  >
                    Time
                  </p>
                  <h5
                    style={{
                      color: theme ? "#eff2f7" : "#343a40",
                      fontSize: "14px",
                    }}
                    className="mb-2"
                  >
                    11:40 AM
                  </h5>
                </div>
                <div className="mt-4">
                  <p
                    className="mb-1"
                    style={{
                      color: theme ? "#abb4d2" : "#7a7f9a",
                      fontSize: "15px",
                    }}
                  >
                    Location
                  </p>
                  <h5
                    style={{
                      color: theme ? "#eff2f7" : "#343a40",
                      fontSize: "14px",
                    }}
                    className="mb-2"
                  >
                    Hyderabad, IND
                  </h5>
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header
                style={{ backgroundColor: theme ? "#a6b0cf08" : "#49505708" }}
              >
                <h5
                  style={{
                    color: theme ? "#eff2f7" : "#000000",
                    fontSize: "14px",
                    margin: "0",
                  }}
                >
                  <i
                    className="ri-attachment-line"
                    style={{
                      marginRight: "10px",
                      fontWeight: "900",
                      fontSize: "14px",
                    }}
                  ></i>
                  Attached Files
                </h5>
              </Accordion.Header>
              <Accordion.Body
                style={{ backgroundColor: theme ? "#262e35" : "#fff" }}
              >
                <div>
                  {farray.map((farr, index) => {
                    return (
                      <div
                        key={index}
                        className="p-2 d-flex"
                        style={{
                          marginBottom: "8px",
                          border: "1px solid" + (theme ? "#36404a" : "#f0eff5"),
                        }}
                      >
                        <div
                          className="align-items-center d-flex justify-content-center rounded"
                          style={{
                            width: "48px",
                            height: "48px",
                            backgroundColor: theme
                              ? "rgb(114 105 239 / 15%)"
                              : "#e3e1fc",
                            fontSize: "20px",
                            marginRight: "16px",
                          }}
                        >
                          <i
                            className="ri-file-text-fill"
                            style={{ color: "#7269EF" }}
                          ></i>
                        </div>
                        <div style={{ width: "50%" }}>
                          <h5
                            style={{
                              fontSize: "14px",
                              marginBottom: "4px",
                              color: theme ? "#eff2f7" : "#343a40",
                              fontWeight: "500",
                            }}
                          >
                            {farr.name}
                          </h5>
                          <p
                            style={{
                              fontSize: "13px",
                              marginBottom: "0",
                              color: theme ? "#abb4d2" : "#7a7f9a",
                            }}
                          >
                            {farr.size}
                          </p>
                        </div>
                        <div className="ms-4" style={{ width: "60px" }}>
                          <ul
                            className=" list-inline d-flex align-items-center justify-content-between mb-0 mt-2 "
                            style={{ fontSize: "18px" }}
                          >
                            <li className="list-inline-item mr-2" key={index}>
                              <i
                                className="ri-download-2-line"
                                style={{ color: theme ? "#abb4d2" : "#7a7f9a" }}
                              ></i>
                            </li>

                            <li className="list-inline-item" key={index}>
                              <Dropdown>
                                <Dropdown.Toggle
                                  className="profile"
                                  style={{
                                    backgroundColor: "transparent",
                                    border: "none",
                                  }}
                                  variant="success"
                                  id="dropdown-basic"
                                >
                                  <i
                                    className="ri-more-fill"
                                    style={{
                                      color: theme ? "#abb4d2" : "#7a7f9a",
                                    }}
                                  ></i>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item href="#/action-1">
                                    Action
                                  </Dropdown.Item>
                                  <Dropdown.Item href="#/action-2">
                                    Another action
                                  </Dropdown.Item>
                                  <Dropdown.Item href="#/action-3">
                                    Something else
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </li>
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Profile;

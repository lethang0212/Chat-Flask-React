import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Style.css";

export default function RegisterForm() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const handleFirstNameInput = (e) => {
    setFname(e.target.value);
  }
  const handleLastNameInput = (e) => {
    setLname(e.target.value);
  }
  const handleUserNameInput = (e) => {
    setUsername(e.target.value);
  }
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  }
  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  }
  const handleAddressInput = (e) => {
    setAddress(e.target.value);
  }
  const handlePhoneInput = (e) => {
    setPhone(e.target.value);
  }
  const handleSubmit = () => {
    const data = {
      firstname: fname, lastname: lname, username: username, password: password,
      email: email, address: address, phone: phone
    }
    axios.post('/users', data)
    .then((response) => {
      console.log(response);
    })
  }
  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-center h-100">
          <div className="card mt-5">
            <div className="card-header">
              <h3>Sign up</h3>
              <div className="d-flex justify-content-end social_icon">
                <span>
                  <i className="fab fa-facebook-square" />
                </span>
                <span>
                  <i className="fab fa-google-plus-square" />
                </span>
                <span>
                  <i className="fab fa-twitter-square" />
                </span>
              </div>
            </div>
            <div className="card-body">
              <form>
                <div className="d-flex ">
                  <div className="input-group form-group w-45">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-marker"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First Name"
                      onChange={handleFirstNameInput}
                    />
                  </div>
                  <div className="input-group form-group w-45 mr-10">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-marker"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last Name"
                      onChange={handleLastNameInput}
                    />
                  </div>
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-user" />
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="User Name"
                    onChange={handleUserNameInput}
                  />
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-key" />
                    </span>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Pass Word"
                    onChange={handlePasswordInput}
                  />
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </div>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    onChange={handleEmailInput}
                  />
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="far fa-address-card"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Address"
                    onChange={handleAddressInput}
                  />
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-phone"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone Number"
                    onChange={handlePhoneInput}
                  />
                </div>
                <div className="row align-items-center remember">
                  <input type="checkbox" />
                  Remember Me
                </div>
                <div className="form-group">
                  <Link to="/" id="register">
                    <button type="button" className="login-btn float-right" onClick={handleSubmit}>
                      Register
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

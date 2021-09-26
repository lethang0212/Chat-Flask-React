import React from "react";
import { Link } from "react-router-dom";
import "./Style.css";

export default function RegisterForm() {
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
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-user" />
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="username"
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
                    placeholder="password"
                  />
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i class="fas fa-envelope"></i>
                    </span>
                  </div>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="email"
                  />
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i class="far fa-address-card"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="address"
                  />
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i class="fas fa-phone"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="phone number"
                  />
                </div>
                <div className="row align-items-center remember">
                  <input type="checkbox" />
                  Remember Me
                </div>
                <div className="form-group">
                  {/* <button type="submit" className="login-btn float-right"> */}
                  <Link to="/" id="register">
                    <button type="submit" className="login-btn float-right">
                      Register
                    </button>
                  </Link>
                  {/* </button> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

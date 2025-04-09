import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterStyling.css";
import RegisterImg from "../assets/registation_image.avif";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

export default function RegisterForm() {
 
  let [formValues, setFormValue] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  // let navigate=useNavigate();
  let handleChange = (e) => {
    let { name, value } = e.target;
    setFormValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  let handleSubmit = (e) => {
    let storingDataLocally = JSON.parse(localStorage.getItem("validedFormData")) || [];
    console.log(storingDataLocally)
    e.preventDefault();
    let nameError = document.getElementById("nameError");
    let emailError = document.getElementById("emailError");
    let passwordError = document.getElementById("passwordError");
    let confirmPassError = document.getElementById("confimPassError");
    let { username, email, password, confirmPassword } = formValues;
    

    let vaild = true;
    console.log(username);
    if (username == "") {
      nameError.innerText = "fill your name Here";
      vaild = false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      emailError.innerHTML = "enter vailded email";
      vaild = false;
    }
    if (password.length < 6) {
      passwordError.innerText = "password length should be more then 6 letters";
      vaild = false;
    }
    if (password != confirmPassword) {
      confirmPassError.innerText = "password does not matches";
      vaild = false;
    }
    
    if(!vaild)
      toast.error('Register failed')
    setFormValue({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    if (vaild) {
      toast.success('register successfull')
      

        storingDataLocally.push(formValues);
        localStorage.setItem(
          "validedFormData",
          JSON.stringify(storingDataLocally)
        );
    }
  };

  return (
    <main>
       <ToastContainer position="top-right" autoClose={3000} />
      <div className="register-image">
        <img src={RegisterImg} alt="" />
      </div>
      <div className="container">
        <h1>Register Form</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="UserName"
            value={formValues.username}
            onChange={handleChange}
          />{" "}
          <span id="nameError"></span>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formValues.email}
            onChange={handleChange}
          />{" "}
          <span id="emailError"></span>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formValues.password}
            onChange={handleChange}
          />{" "}
          <span id="passwordError"></span>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formValues.confirmPassword}
            onChange={handleChange}
          />
          <span id="confirmPassError"></span>
          <input type="submit" value="SingUp" />
          <div className="exist-content">
            <p>
              User already exist ? <Link to={"/login"}>click here </Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}

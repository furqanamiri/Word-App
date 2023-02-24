import React from "react";
import Modal from "react-bootstrap/Modal";
import "../scss/registerform.scss";
import Form from "react-bootstrap/Form";
import Captcha from "./captcha";
import Loginform from "./loginform";
import { useState } from "react";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";
export default function Registerform({ showRegisterModal, LoginRegisterClose, isDark }) {
  let passCheck = true;

  let regexspecial = /^[a-zA-Z]*$/
  const validateregister = (e) => {
    e.preventDefault();
    document.getElementById('errormessage').innerHTML = " "
    // console.log('work')
    const usernameid = document.getElementById('usernameid').value
    // console.log(usernameid)
    if (usernameid == "") {
      return document.getElementById('errormessage').innerHTML = 'Username can not be blank'
    }
    if (usernameid.length <= 4) {
      return document.getElementById('errormessage').innerHTML = 'Username is too short'
    }
    if (usernameid.length >= 15) {
      return document.getElementById('errormessage').innerHTML = 'Username is too long'
    }
    if (!regexspecial.test(usernameid)) {
      return document.getElementById('errormessage').innerHTML = 'No Special Characters allowed'
    }
    var passwordstring = document.getElementById('password').value
    var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (!regularExpression.test(passwordstring)) {
      return document.getElementById('errormessage').innerHTML = 'Password should contain one special character, from 6 to 16 characters and atleast one number'
    }
    var cpasswordid = document.getElementById('cpassword').value
    if (cpasswordid != passwordstring) {
      return document.getElementById('errormessage').innerHTML = 'Confirm Password and Password should match  '
    }
    registerformcheck(passwordstring);
  }
  const registerformcheck = (passwordstring) => {
    console.log(usernameid)
    const emailid = document.getElementById('emailid').value
    fetch('http://18.234.225.252:4000/api/ninjas', {
      method: 'POST',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: usernameid.value,
        email: emailid,
        password: passwordstring,

      })

    }).then(respone => {
      document.getElementById('errormessage').innerHTML = "User is successfully Registered"
      setTimeout(() => {
        LoginRegisterClose();

      }, 4000)

    })
  }
  const togglePassCheck = (e) => {
    e.preventDefault();
    var temp = document.getElementById('password');
    if (temp.type === "password") {
      temp.type = "text";
    }
    else {
      temp.type = "password"
    }
  };
  const togglePassCheck1 = (e) => {
    e.preventDefault();
    var temp = document.getElementById('cpassword');
    if (temp.type === "password") {
      temp.type = "text";
    }
    else {
      temp.type = "password"
    }
  };


  return (
    <>

      <Modal
        className='bordeRreg'
        show={showRegisterModal}
        onHide={LoginRegisterClose}
        centered
      >
        <Modal.Header className={isDark ? "LoginDarkHeader" : "LoginLightHeader"}  >
          <Modal.Title className={isDark ? "LoginDarkHeader centering" : "LoginLightHeader centering"}>Sign Up Your account </Modal.Title>
        </Modal.Header>
        <Modal.Body className={isDark ? "modalDark" : "modalLight"}>
          <Form onSubmit={validateregister}>
            <Form.Group className="mb-3 " controlId="Email" style={{ position: "relative" }}>
              <Form.Control
                className={isDark ? "modalDark" : "modalLight"}
                style={{
                  borderRadius: "10px",
                  paddingLeft: "10%",
                  borderColor: "#7496B8",

                  transition: "none",
                  width: "80%",
                  justifySelf: "center",
                  margin: "0 auto",
                  fontSize: '1.2rem'
                }}
                type="text"
                id="usernameid"
                placeholder=" Enter Username"
              />
              <img src="loginemail.svg" className="inputiconleft"></img>
            </Form.Group>
            <Form.Group className="mb-3 " controlId="Email" style={{ position: "relative" }}>
              <Form.Control
                className={isDark ? "modalDark" : "modalLight"}
                style={{
                  borderRadius: "10px",
                  paddingLeft: "10%",
                  borderColor: "#7496B8",

                  transition: "none",
                  width: "80%",
                  justifySelf: "center",
                  margin: "0 auto",
                  fontSize: '1.2rem'
                }}
                type="email" id='emailid'
                placeholder="Enter Your Email"
              />
              <img src="registeremail.svg" className="inputiconleft"></img>
            </Form.Group>

            <Form.Group className="mb-3 " controlId="formBasicPassword" style={{ position: "relative" }}>
              <Form.Control
                className={isDark ? "modalDark" : "modalLight"}
                style={{
                  borderRadius: "10px",
                  paddingLeft: "10%",
                  borderColor: "#7496B8",

                  transition: "none",
                  width: "80%",
                  justifySelf: "center",
                  margin: "0 auto",
                  fontSize: '1.2rem'
                }}
                type={passCheck ? "password" : "text"}
                placeholder="Password"
                id="password"
              />
              <img src="loginlock.svg" className="inputiconleft"></img>
              <button style={{
                position: 'absolute',
                top: '45%',
                left: '74%',
                transform: 'translateY(-50%)', padding: '0', maring: '0',
              }}
                onClick={togglePassCheck}
              ><img src="eye.svg"></img></button>
            </Form.Group>
            <Form.Group className="mb-3 " controlId="formBasicPassword" style={{ position: "relative" }}>
              <Form.Control
                className={isDark ? "modalDark" : "modalLight"}
                style={{
                  borderRadius: "10px",
                  paddingLeft: "10%",
                  borderColor: "#7496B8",

                  transition: "none",
                  width: "80%",
                  justifySelf: "center",
                  margin: "0 auto",
                  fontSize: '1.2rem'
                }}
                id="cpassword"
                type={passCheck ? "password" : 'text'}
                placeholder="Confirm Password"
              />
              <img src="loginlock.svg" className="inputiconleft"></img>
              <button style={{
                position: 'absolute',
                top: '45%',
                left: '74%',
                transform: 'translateY(-50%)', padding: '0', maring: '0',
              }}
                onClick={togglePassCheck1}
              ><img src="eye.svg"></img></button>
            </Form.Group>


            <Form.Group className="mb-3 " controlId="captcha" style={{ position: "relative" }}>
              <Form.Control
                className={isDark ? "modalDark" : "modalLight"}
                style={{
                  borderRadius: "10px",
                  paddingLeft: "",
                  borderColor: "#7496B8",

                  transition: "none",
                  width: "80%",
                  justifySelf: "center",
                  margin: "0 auto",
                  fontSize: '1.2rem'
                }}
                type="text"
                id="captcha"
                placeholder=" Enter CAPTCHA as seen above"
              />

            </Form.Group>
            <div className="mb-3">
              <button style={{
                borderRadius: "10px",
                color: 'white',
                borderColor: 'none',
                backgroundColor: "#FA8B2E",
                height: "3rem",
                transition: "none",
                width: "80%",
                justifySelf: "center",
                margin: "0 10%",
                fontSize: '20px',
                fontWeight: 'lighter',
              }} >Sign Up</button>
            </div>

            <p className='registererror' id="errormessage"></p>
          </Form>
        </Modal.Body>

      </Modal>
      {/* <Loginform showLoginModal={showLoginModal} LoginModalClose={LoginModalClose} isDark={isDark} /> */}
    </>
  );
}
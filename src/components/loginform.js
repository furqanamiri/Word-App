import React, { useContext, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../scss/loginform.scss";
import Form from "react-bootstrap/Form";
import { LoginContext } from "../js/Logincontext";
import { useState } from "react";
import Registerform from "./registerform";
import { AnonContext } from "../js/AnonContext";

export default function Loginform({ showLoginModal, LoginModalClose, isDark, toggleViewNotes, LoginModalOpen }) {
  const { toggleUserLogin, loginToken } = useContext(LoginContext)
  const useremail = useRef('')
  const { toggleAnonUser } = useContext(AnonContext)
  const [error, SetError] = useState('');
  const changeUserEmail = (event) => {
    useremail.current = (event.target.value);
  }
  const userpassword = useRef('')
  const changeUserPassword = (event) => {
    userpassword.current = (event.target.value)
  }
  const loginValidation = (e) => {
    e.preventDefault();
    fetch(process.env.REACT_APP_LOGIN, {
      method: 'POST', headers: {
        accept: 'application.json', 'Content-Type': 'application/json'
      },
      body: JSON.stringify({

        email: useremail.current,
        password: userpassword.current,

      })
    }).then((response) => response.json()).then((response) => {



      if (response.token) {
        loginToken.current = response.token
        toggleUserLogin()
        toggleAnonUser()
        toggleViewNotes()
        LoginModalClose()
      }
      else {
        SetError('Check Credentials')
      }


      // document.getElementById('loginerrormessage').innerHTML = '{loginState ? "Login Successful" : "Check Credentials"}'



    }).catch(error => SetError('Check Your Connection'))
  }
  const [passCheck, setPassCheck] = useState(true);

  const togglePassCheck = (e) => {
    e.preventDefault();
    setPassCheck(!passCheck);


  };

  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const LoginRegisterClose = () => {
    setShowRegisterModal(false);
  }
  const LoginRegisterOpen = (event) => {
    event.preventDefault();
    LoginModalClose();
    setShowRegisterModal(true);

  }


  return (
    <>


      <Modal
        className='bordeRv '
        show={showLoginModal}
        onHide={LoginModalClose}
        centered
      >
        <Modal.Header className={isDark ? "LoginDarkHeader" : "LoginLightHeader"}  >
          <Modal.Title className={isDark ? "LoginDarkHeader centering" : "LoginLightHeader centering"}>Login Your Account </Modal.Title>
        </Modal.Header>
        <Modal.Body className={isDark ? "modalDark" : "modalLightpass"}>
          <Form onSubmit={loginValidation}>
            <Form.Group className="mb-3 " style={{ position: "relative" }}>
              <Form.Control
                className={isDark ? "modalDark inputdiv" : "modalLight inputdiv"}

                type="email"
                id='userEmailId'

                onChange={changeUserEmail}
                placeholder=" Enter your email" required
              />
              <img src="./svg/loginemail.svg" className="inputiconleft"></img>
            </Form.Group>

            <Form.Group className="mb-3 " style={{ position: "relative" }}>
              <Form.Control
                className={isDark ? "modalDark inputdiv" : "modalLight inputdiv"}
                id='userpassword'
                type={passCheck ? "password" : 'text'}
                placeholder="Type Password"
                onChange={changeUserPassword}

                required
              />
              <img src="./svg/loginlock.svg" className="inputiconleft"></img>
              <button className="nonselect eye-icon-pass" tabIndex="-1"
                onClick={togglePassCheck}
              ><img className="nonselect " src="./svg/eye.svg"></img></button>
            </Form.Group>
            <div className="mb-3">
              <button className="login-butt" type="submit" >Login</button>
              <button style={isDark ? { color: "#AFAFAF" } : { color: "#666666" }} className='resetbut'
              >Reset Your Password</button>
              <p className="or-div"> or </p>
              <button className="googlebut" style={isDark ? { color: '#AFAFAF' } : { color: '#666666' }}>Continue with Google<img src="./svg/googleicon.svg" className="inputiconleftg"></img></button>
              <p style={isDark ? { color: "white" } : { color: 'black' }
              }> Don't have an account yet? <button onClick={LoginRegisterOpen} className='sign-up-butt'>Sign Up</button> </p>

            </div>

          </Form>
          <p className="loginerror" id="loginerrormessage">{error}</p>
        </Modal.Body>

      </Modal>
      <Registerform showRegisterModal={showRegisterModal} LoginRegisterClose={LoginRegisterClose} isDark={isDark} LoginModalOpen={LoginModalOpen} />
    </>
  );
}
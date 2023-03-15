import React, { useContext, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../scss/loginform.scss";
import Form from "react-bootstrap/Form";
import { LoginContext } from "./Logincontext";
import { useState } from "react";
import Registerform from "./registerform";
import { AnonContext } from "./AnonContext";
export default function Loginform({ showLoginModal, LoginModalClose, isDark, toggleViewNotes }) {
  const { loginUser, setLoginUser, toggleUserLogin ,loginToken} = useContext(LoginContext)
  const{anonContext,toggleAnonUser} = useContext(AnonContext)
  const useremail =useRef(' ')
  const [error,SetError] = useState('')
  const changeUserEmail = (event) => {
    useremail.current = (event.target.value);
   
  }
  const userpassword = useRef('')
  const changeUserPassword = (event) => {
    userpassword.current = (event.target.value)
  }
  
  const loginValidation = (e) => {
    e.preventDefault();
    fetch('http://34.232.69.171:4000/login', {
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
         toggleUserLogin(true)
          toggleAnonUser()
          LoginModalClose()
          console.log(loginUser)
        
        }
        else{
          SetError('Check Credentials')
        }
      
      
      // document.getElementById('loginerrormessage').innerHTML = '{loginState ? "Login Successful" : "Check Credentials"}'



    }).catch(error => SetError('Check Your Connection') )
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
                type="email"
                id='userEmailId'
                
                onChange={changeUserEmail}
                placeholder=" Enter your email" required
              />
              <img src="./src/svg/loginemail.svg" className="inputiconleft"></img>
            </Form.Group>

            <Form.Group className="mb-3 " style={{ position: "relative" }}>
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
                }} id='userpassword'
                type={passCheck ? "password" : 'text'}
                placeholder="Type Password"
                onChange={changeUserPassword}

                required
              />
              <img src="./src/svg/loginlock.svg" className="inputiconleft"></img>
              <button className="nonselect" tabIndex="-1" style={{
                position: 'absolute',
                top: '50%',
                left: '75%',
                transform: 'translateY(-50%)', padding: '0', maring: '0',
              }}
                onClick={togglePassCheck}
              ><img className="nonselect " src="./src/svg/eye.svg"></img></button>
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
              }} type="submit" >Login</button>
              <button style={isDark ? { color: "#AFAFAF" } : { color: "#666666" }} className='resetbut'
              >Reset Your Password</button>
              <p style={{
                fontSize: '14px', width: '100%',
                fontWeight: 'lighter', color: '#666666', marginTop: '1rem', marginBottom: '1rem', textAlign: 'center',
              }}> or </p>
              <button className="googlebut" style={isDark ? { color: '#AFAFAF' } : { color: '#666666' }}>Continue with Google<img src="./src/svg/googleicon.svg" className="inputiconleftg"></img></button>
              <p style={isDark ? { color: "white" } : { color: 'black' }
              }> Don't have an account yet? <button onClick={LoginRegisterOpen} style={{ color: "#FA8B2E", padding: '0', margin: '0', width: 'fit-content' }}>Sign Up</button> </p>

            </div>

          </Form>
          <p className="loginerror" id="loginerrormessage">{error}</p>
        </Modal.Body>

      </Modal>
      <Registerform showRegisterModal={showRegisterModal} LoginRegisterClose={LoginRegisterClose} isDark={isDark} />
    </>
  );
}
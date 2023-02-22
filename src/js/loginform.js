import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../scss/loginform.scss";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Registerform from "./registerform";
export default function Loginform({ showLoginModal, LoginModalClose, isDark }) {
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
          <Form>
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
                type="email"
                placeholder=" Enter your email"
              />
              <img src="loginemail.svg" className="inputiconleft"></img>
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
                type={passCheck ? "password" : 'text'}
                placeholder="Type Password"
              />
              <img src="loginlock.svg" className="inputiconleft"></img>
              <button style={{
                position: 'absolute',
                top: '50%',
                left: '75%',
                transform: 'translateY(-50%)', padding: '0', maring: '0',
              }}
                onClick={togglePassCheck}
              ><img src="eye.svg"></img></button>
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
              }}>Login</button>
              <button style={isDark ? { color: "#AFAFAF" } : { color: "#666666" }} className='resetbut'
              >Reset Your Password</button>
              <p style={{
                fontSize: '14px', width: '100%',
                fontWeight: 'lighter', color: '#666666', marginTop: '1rem', marginBottom: '1rem', textAlign: 'center',
              }}> or </p>
              <button className="googlebut" style={isDark ? { color: '#AFAFAF' } : { color: '#666666' }}>Continue with Google<img src="googleicon.svg" className="inputiconleftg"></img></button>
              <p style={isDark ? { color: "white" } : { color: 'black' }
              }> Don't have an account yet? <button onClick={LoginRegisterOpen} style={{ color: "#FA8B2E", padding: '0', margin: '0', width: 'fit-content' }}>Sign Up</button> </p>
            </div>

          </Form>
        </Modal.Body>

      </Modal>
      <Registerform showRegisterModal={showRegisterModal} LoginRegisterClose={LoginRegisterClose} isDark={isDark} />
    </>
  );
}
import React from "react";
import Modal from "react-bootstrap/Modal";
import "../scss/registerform.scss";
import Form from "react-bootstrap/Form";
import Captcha from "./captcha";

import { useState } from "react";
export default function Registerform({ showRegisterModal, LoginRegisterClose, isDark }) {
  const [passCheck, setPassCheck] = useState(true);

  const togglePassCheck = (e) => {
    e.preventDefault();
    setPassCheck(!passCheck);
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
                type="text"
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
                type="email"
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
                type={passCheck ? "password" : 'text'}
                placeholder="Password"
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
                onClick={togglePassCheck}
              ><img src="eye.svg"></img></button>
            </Form.Group>

            <Captcha />
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
              }}>Sign Up</button>
            </div>


          </Form>
        </Modal.Body>

      </Modal>
    </>
  );
}
import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import "./styles.scss";
import Form from "react-bootstrap/Form";
import Captcha from "../Captcha";
import { useState, useRef } from "react";
export default function Registerform({ showRegisterModal, LoginRegisterClose, isDark, LoginModalOpen }) {
  let passCheck = true;
  const [captchatext, setCaptchaText] = useState('')
  const [pass, setPass] = useState(false)
  const [pass1, setPass1] = useState(false)

  const [errorMessage, setErrorMessage] = useState("")


  const passChangeFun = () => {
    setPass(!pass)
  }
  const pass1ChangeFun = () => {
    setPass1(!pass1)
  }
  const captcha = () => {
    let retVal = "";
    let charset = "0123456789"
    let length = 4;
    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    setCaptchaText(retVal);
  }
  useEffect(() => {
    captcha()
  }, [])
  let regexspecial = /^[a-zA-Z]*$/
  const validateregister = (e) => {
    e.preventDefault();
    document.getElementById('errormessage').innerHTML = " "

    const usernameid = document.getElementById('usernameid').value

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
    const emailid = document.getElementById('emailid').value
    if (emailid.length == 0) {
      return document.getElementById('errormessage').innerHTML = 'Enter Email'
    }
    const passwordstring = document.getElementById('password').value
    const regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (!regularExpression.test(passwordstring)) {
      return document.getElementById('errormessage').innerHTML = 'Password should contain one special character, from 6 to 16 characters and atleast one number'
    }
    const cpasswordid = document.getElementById('cpassword').value
    if (cpasswordid != passwordstring) {
      return document.getElementById('errormessage').innerHTML = 'Confirm Password and Password should match  '
    }
    const captchatextstr = document.getElementById('captchadiv').value

    if (captchatextstr != captchatext) {
      return document.getElementById('errormessage').innerHTML = 'Retry Captcha'
    }

    registerformcheck(passwordstring);


  }

  const registerformcheck = (passwordstring) => {

    fetch(process.env.REACT_APP_REGISTER, {
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
        LoginModalOpen();
      }, 3000)

    }).catch((err) => {
      return document.getElementById('errormessage').innerHTML = 'Check your Internet Connection'
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
    passChangeFun()
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
    pass1ChangeFun()
  };


  return (
    <>

      <Modal
        className='bordeRreg'
        show={showRegisterModal}
        onHide={LoginRegisterClose}
        centered >
        <Modal.Header className={isDark ? "LoginDarkHeader" : "LoginLightHeader"}  >
          <Modal.Title className={isDark ? "LoginDarkHeader centering" : "LoginLightHeader centering"}>Sign Up Your account </Modal.Title>
        </Modal.Header>
        <Modal.Body className={isDark ? "modalDark" : "modalLight"}>
          <Form onSubmit={validateregister}>
            <Form.Group className="mb-3 reg-relative">
              <Form.Control
                className={isDark ? "modalDark reg-input-div" : "reg-input-div modalLight"}
                type="text"
                id="usernameid"
                placeholder="Enter Username"
                maxlength="15"

              />
              <img src="./svg/loginemail.svg" className="inputiconleft"></img>
            </Form.Group>
            <Form.Group className="mb-3 reg-relative">
              <Form.Control
                className={isDark ? "modalDark reg-input-div" : "reg-input-div modalLight"}
                type="email" id='emailid'
                placeholder="Enter Your Email"
              />
              <img src="./svg/registeremail.svg" className="inputiconleft"></img>
            </Form.Group>

            <Form.Group className="mb-3 reg-relative">
              <Form.Control
                className={isDark ? "modalDark reg-input-div" : "reg-input-div modalLight"}
                type={passCheck ? "password" : "text"}
                placeholder="Password"
                id="password"
                maxlength="16"
              />
              <img src="./svg/loginlock.svg" className="inputiconleft"></img>
              <button
                className="reg-input-icons"
                tabIndex="-1"
                onClick={togglePassCheck}
              ><img src={pass ? "./svg/eye-slash.svg" : "./svg/eye.svg"}></img></button>
            </Form.Group>
            <Form.Group className="mb-3 reg-relative">
              <Form.Control
                className={isDark ? "reg-input-div modalDark" : "reg-input-div modalLight"}
                id="cpassword"
                type={passCheck ? "password" : 'text'}
                placeholder="Confirm Password"
                maxlength="16"
              />
              <img src="./svg/loginlock.svg" className="inputiconleft"></img>
              <button className="reg-input-icons" tabIndex="-1"
                onClick={togglePassCheck1}
              ><img src={pass1 ? "./svg/eye-slash.svg" : "./svg/eye.svg"}></img></button>
            </Form.Group>
            <Form.Group className="mb-3 reg-relative">
              <Captcha setCaptchaText={setCaptchaText} captchatext={captchatext} />
              <Form.Control
                className={isDark ? "modalDark reg-input-div" : "reg-input-div modalLight"}
                type="text"
                id="captchadiv"
                placeholder=" Enter CAPTCHA as seen above"
              />
            </Form.Group>
            <div className="mb-3">
              <button className="reg-signup-butt">Sign Up</button>
            </div>
            <p className='registererror' id="errormessage">{errorMessage}</p>
          </Form>
        </Modal.Body>
      </Modal>
      {/* <Loginform showLoginModal={showLoginModal} LoginModalClose={LoginModalClose} isDark={isDark} /> */}
    </>
  );
}
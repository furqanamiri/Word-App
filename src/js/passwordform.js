import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../scss/passwordform.scss";
import Form from "react-bootstrap/Form";
import { useState } from "react";
export default function Passwordform({
  showPassword,
  handleClosePass,
  isDark,
}) {
  const [passCheck, setPassCheck] = useState(true);

  const togglePassCheck = (e) => {
    e.preventDefault();
    setPassCheck(!passCheck);
  };
  return (
    <>
      <Modal
        className="bordeRpass"
        show={showPassword}
        onHide={handleClosePass}
        centered

      >
        <Modal.Header
          className={isDark ? "modalDarkpass pb0" : "modalLight pb0"}
        >
          <Modal.Title className="items title ">Add Your Password</Modal.Title>
        </Modal.Header>
        <Modal.Body className={isDark ? "modalDarkpass" : "modalLight"}>
          <Form>
            <Form.Group className="mb-3 relative" controlId="formBasicPassword">
              <Form.Control
                className={isDark ? "reset-password-div modalDark h-md-10 h-lg-30" : "reset-password-div modalLight h-md-10 h-s-10"}

                type={passCheck ? "password" : 'text'}
                placeholder="Type Password"
              />
              <button className="reset-pass-eye-icon"
                onClick={togglePassCheck}
              ><img src="./svg/eye.svg"></img></button>
            </Form.Group>
            <div className="p-0 m-0">
              <Button
                className="rest-pass-butt"
                onClick={handleClosePass}
              >
                Set Password
              </Button>
              <Button
                className="reset-pass-cancel-butt"
                variant={isDark ? "light" : "dark"}
                onClick={handleClosePass}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer
          className={isDark ? "modalDark items" : "modalLight items "}
        ></Modal.Footer>
      </Modal>
    </>
  );
}

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
        style={{ height: '100%' }}
      >
        <Modal.Header
          className={isDark ? "modalDarkpass" : "modalLight"}
          style={{ paddingBottom: "0px" }}
        >
          <Modal.Title className="items title ">Add Your Password</Modal.Title>
        </Modal.Header>
        <Modal.Body className={isDark ? "modalDarkpass" : "modalLight"}>
          <Form>
            <Form.Group className="mb-3 " controlId="formBasicPassword" style={{ position: "relative" }}>
              <Form.Control
                className={isDark ? "modalDark h-md-10 h-lg-30" : "modalLight h-md-10 h-s-10"}
                style={{
                  borderRadius: "10px",
                  paddingLeft: "1.5rem",
                  borderColor: "#7496B8",

                  transition: "none",
                  width: "60%",
                  justifySelf: "center",
                  margin: "0 auto",
                  fontSize: '1.2rem'
                }}
                type={passCheck ? "password" : 'text'}
                placeholder="Type Password"
              />
              <button style={{
                position: 'absolute',
                top: '50%',
                left: '65%',
                transform: 'translateY(-50%)', padding: '0', margin: '0'
              }}
                onClick={togglePassCheck}
              ><img src="./svg/eye.svg"></img></button>
            </Form.Group>
            <div style={{ padding: "0px", margin: "0px  " }}>
              <Button
                style={{
                  width: "fit-content",
                  height: "40px",
                  borderRadius: "10px",
                  border: "none",
                  marginLeft: "25%",
                  backgroundColor: "#FA8B2E",
                  fontWeight: "light",

                }}
                onClick={handleClosePass}
              >
                Set Password
              </Button>
              <Button
                style={{
                  width: "fit-content",
                  height: "40px",
                  borderRadius: "10px",
                  marginLeft: "20px",
                  fontWeight: "light",

                }}
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

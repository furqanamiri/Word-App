import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./styles.scss";
import Form from "react-bootstrap/Form";
import { useState } from "react";
export default function Passwordform({
  showPassword,
  handleClosePass,
  isDark,
  SaveFileText,
  FileType,
  wordFile,
  pdf

}) {
  const [fileName, setFileName] = useState("")
  const handleFileChange = (e) => {
    setFileName(e.target.value)
  }

  const handleDownload = (e) => {
    e.preventDefault()
    if (FileType == 'text')
      SaveFileText(fileName)
    else {
      if (FileType == 'word')
        wordFile(fileName)
      else {
        pdf(fileName)
      }
    }

  }

  return (
    <>
      <Modal
        className='bordeRv '
        show={showPassword}
        onHide={() => {
          setFileName("")
          handleClosePass()
        }}
        centered
      >
        <Modal.Header className={isDark ? "LoginDarkHeader" : "LoginLightHeader"}  >
          <Modal.Title className={isDark ? "LoginDarkHeader centering" : "LoginLightHeader centering"}>Enter File Name  </Modal.Title>
        </Modal.Header>
        <Modal.Body className={isDark ? "modalDark" : "modalLightpass"}>
          <Form>
            <Form.Group className="mb-2 " style={{ position: "relative" }}>
              <Form.Control
                className={isDark ? "modalDark inputdiv" : "modalLight inputdiv"}
                id='userpassword'
                type={'text'}
                placeholder="Type Filename"
                value={fileName}
                onChange={handleFileChange}
                required
              />



            </Form.Group>
            <div className="mb-2">
              <button className="login-butt" onClick={handleDownload}>Download File</button>
              {/* <button style={isDark ? { color: "#AFAFAF" } : { color: "#666666" }} className='resetbut'
              >Reset Your Password</button> */}

              {/* <button className="googlebut" style={isDark ? { color: '#AFAFAF' } : { color: '#666666' }}>Continue with Google<img src="./svg/googleicon.svg" className="inputiconleftg"></img></button> */}


            </div>

          </Form>

        </Modal.Body>

      </Modal>
    </>
  );
}

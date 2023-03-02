import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../scss/shareModal.scss";
import Form from "react-bootstrap/Form";


export default function Sharemodal({ shareModal, toggleShareModalClose, isDark }) {



  return (
    <>


      <Modal
        className='bordeRv sharemodal'
        show={shareModal}
        onHide={toggleShareModalClose}


        centered
      >

        <Modal.Body style={{ borderRadius: '40px' }} className={isDark ? "modalDarkpass d-flex flex-column justify-content-center" : "modalLightpass flex-column d-flex justify-content-center "}>

          <div className={isDark ? "items title" : "items title"} style={{ padding: '10% 0', fontSize: '50px' }}>Share As</div><Form className="d-flex flex-column w-100 "    >
            <div style={{ backgroundColor: 'transparent', fontSize: '60px' }} className={isDark ? "tooltipdark sharelink" : "tooltiplight sharelink"}><p>https://wordpad.pw/share/837NltMa4DtgSFsMEdZG</p></div>
            <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", }} className="">
              <div className="d-flex flex-nowrap align-items-center " style={{
                padding: '1em',
                justifyContent: 'space-evenly',
                width: '100%',
              }}><input type="radio" name="export" value="pdf" /><p style={{
                fontSize: '50px', width: 'fit-content',
              }}>View Only</p></div>



              <div className="d-flex align-items-center" style={{
                padding: '1em',
                justifyContent: 'space-evenly',
                width: '100%',
              }} > <input type="radio" name="export" value="word" />
                <p style={{ fontSize: '50px', width: 'fit-content', }}>Can Edit</p>
              </div>              </div>
            <div className="d-flex justify-content-center"> <button type="radio" name="sharerad" style={{ fontWeight: 'lighter', fontSize: '50px', color: '#7496B8', width: '50%' }}><img style={{
              transform: 'scale(3)',
              marginRight: '0.5em'
            }} src="copylink.svg" ></img>Copy Link</button></div>

          </Form>
        </Modal.Body>

      </Modal>

    </>
  );
}
import React, { useState } from "react";

import Modal from "react-bootstrap/Modal";
import "./styles.scss";
import Form from "react-bootstrap/Form";


export default function Exportmodal({ exportModal, toggleExportModalClose, isDark, pdf , wordFile }) {
  const [exportSelect, setExportSelect] = useState()
  const Exportfun = (e) => {
    console.log(exportSelect)
    e.preventDefault()
    if (exportSelect == 'pdf') {
      pdf()
    }
    else{
      wordFile()
    }
  }

  return (
    <>


      <Modal
        className='bordeRv exportmodal'
        show={exportModal}
        onHide={toggleExportModalClose}
        size="lg"

        centered
      >


        <Modal.Body style={{ borderRadius: '40px' }} className={isDark ? "modalDarkpass d-flex flex-column justify-content-center" : "modalLightpass flex-column d-flex justify-content-center "}>

          <div className={isDark ? "items title" : "items title"} style={{ padding: '10% 0', fontSize: '50px' }}>Export As</div><Form className="d-flex flex-column w-100 justify-content-around"    >

            <div className='exporttool w-100 d-flex align-items-center justify-content-center' >
              <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: 'center' }}>
                <div className="d-flex " style={{ alignItems: 'center' }}><input type="radio" name="export" onClick={() => { setExportSelect('pdf') }} value="pdf" style={{ height: '21px', width: '45px' }} /><p style={{ marginLeft: '20%', fontSize: '45px', }}>PDF</p></div>



                <div className="d-flex" style={{ marginLeft: '15%', alignItems: 'center' }} > <input style={{ height: '20px', width: '49px' }} onClick={() => { setExportSelect('word') }} type="radio" name="export" value="word" />
                  <p style={{ marginLeft: '20%', fontSize: '45px', }}>Word</p>
                </div>              </div>
            </div>
            <button className="export-butt" onClick={Exportfun}>Export</button>

          </Form>
        </Modal.Body>

      </Modal>

    </>
  );
}
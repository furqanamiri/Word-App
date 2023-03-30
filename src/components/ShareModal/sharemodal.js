import React, { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import "./styles.scss";
import Form from "react-bootstrap/Form";
import { updateContext } from "../../js/updatecontext";


export default function Sharemodal({ shareModal, toggleShareModalClose, isDark, setEdit }) {
  const { noteId, copyFunction } = useContext(updateContext)
  let r = /:\/\/(.[^/]+)/;
  const urlapp = window.location.href
  const domain = urlapp.match(r)[1]


  return (
    <>


      <Modal
        className='bordeRv sharemodal'
        show={shareModal}
        onHide={toggleShareModalClose}


        centered
      >

        <Modal.Body className={isDark ? "br40 modalDarkpass d-flex flex-column justify-content-center" : " br40 modalLightpass flex-column d-flex justify-content-center "}>

          <div className={isDark ? "items title shareas-div" : "items title shareas-div"} >Share As</div><Form className="d-flex flex-column w-100 "    >
            <div className={isDark ? "share-link-modal tooltipdark sharelink" : "share-link-modal tooltiplight sharelink"}><p>{domain}?id={noteId.current}</p></div>
            <div className="share-butt-p-div">
              <div className="d-flex flex-nowrap align-items-center share-butt-div">
                <input type="radio" name="export" onClick={() => { setEdit("No") }} /><p className="share-modal-butt">View Only</p></div>



              <div className="d-flex align-items-center share-butt-div" > <input type="radio" name="export" value="word" onClick={() => setEdit("yes")} />
                <p className="share-modal-butt">Can Edit</p>
              </div>
            </div>
            <div className="d-flex justify-content-center "> <button className="share-modal-copy-butt" type="radio" onClick={copyFunction} name="sharerad" >
              <img className="share-modal-copy-img" src="./svg/copylink.svg" ></img>Copy Link</button></div>

          </Form>
        </Modal.Body>

      </Modal>

    </>
  );
}
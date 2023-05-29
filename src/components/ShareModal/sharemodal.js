import React, { useContext, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import "./styles.scss";
import Form from "react-bootstrap/Form";
import { updateContext } from "../../js/updatecontext";


export default function Sharemodal({ shareModal, toggleShareModalClose, isDark, setEdit, checked, changeLink }) {
  const { noteId, copyFunction } = useContext(updateContext)
  let r = /:\/\/(.[^/]+)/;
  const urlapp = window.location.href
  const domain = urlapp.match(r)[1]
  useEffect(() => {
    if (window.localStorage.getItem("noteid")) {
      noteId.current = window.localStorage.getItem("noteid")
    }
  }, [])


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
            {checked ? <div className={isDark ? "share-link-modal tooltipdark sharelink" : "share-link-modal tooltiplight sharelink"}><p>{domain}?id={noteId.current}</p></div> : <></>}
            <div className="share-butt-p-div">
              <div className="d-flex flex-nowrap align-items-center share-butt-div">
                <input type="radio" name="export" onClick={() => { changeLink("view") }} /><p className="share-modal-butt">View Only</p></div>



              <div className="d-flex align-items-center share-butt-div" > <input className="right" type="radio" name="export" value="word" onClick={() => changeLink("edit")} />
                <p className="share-modal-butt right1">Can Edit</p>
              </div>
            </div>
            <div className="d-flex justify-content-center "> <button className="share-modal-copy-butt" type="radio" onClick={copyFunction} name="sharerad" >
              <img className="share-modal-copy-img" src="./svg/copylink.svg" style={{ widht: "100%" }}></img><span className="left">Copy Link</span></button></div>

          </Form>
        </Modal.Body>

      </Modal>

    </>
  );
}
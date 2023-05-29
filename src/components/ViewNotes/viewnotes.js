import React from "react";
import "./styles.scss";
import moment from "moment";
import Viewingnotes from "./viewingnotes";
import Spinner from 'react-bootstrap/Spinner';
import { useViewNote } from "./useViewNote";

export default function ViewNotes({ isDark, text, toggleViewNotes, setText, viewNotes, dateUpd, dateChange }) {
  const { list, users, loading, id, toggleUpdateNote, togglerefreshchange, textnote, setUpdateNote } =
    useViewNote();

  // const notediv = document.getElementById("newnote")
  // notediv.addEventListener('click', () => {

  const clickFunctionnew = () => {
   
    window.localStorage.removeItem("noteid");
    toggleUpdateNote(false)
    setText("");
    setUpdateNote(false)
    window.localStorage.removeItem("text");
    toggleViewNotes();
  };
  //ShowFile
  function showFile() {
    clickFunctionnew();
    let preview = document.getElementById("show-text");
    let file1 = document.querySelector("#file1").files[0];
    let reader = new FileReader();

    let textFile = /text.*/;
    reader.readAsText(file1);
    // if (file.type.match(textFile))
    setText(" ");
    reader.onload = function (event) {
      setText(event.target.result);
    };
    reader.onerror = function (error) {
      error.target.result;
    };

  }
  // })
  return (
    <>
      <div className="total-notes">
        <div className="local-file-div">
          <label className="button-file d-flex ">
            <input
              className="d- center-inp"
              id="file1"
              type="file"
              onChange={showFile}
              accept=".txt"
            />
            <img src="./svg/localfile.svg"></img>
            <b className="local-file-para">Browse {" "} </b>
            <span className="notes-center"> your files</span>
          </label>
        </div>
        <div className="fluid-container mainnotes" id="mainnotes">
          <div className="row justify-content-sm-center justify-content-start" id="notesadd">
            <div className="newnote col-md-5 col-lg-2 col-sm-4 " id="newnote" onClick={clickFunctionnew}>
              <img src={isDark ? "./svg/plusicondark.svg" : "./svg/plusicon.svg"} className="plusicon" />

              <p className={"notetext cursor"}>Click to create New</p>
            </div>

            {loading ? <><Spinner animation="border" className="loader" role="status">
              <span className="visually-hidden loader">...</span>
            </Spinner></> :
              users.map((t) => (
                <Viewingnotes
                  isDark={isDark}
                  list={t.content}
                  idnote={t.id}
                  togglerefreshchange={togglerefreshchange}
                  toggleViewNotes={toggleViewNotes}
                  setText={setText}
                  date={t.date}
                  dateChange={dateChange}
                />
              ))}
          </div>
        </div>
      </div>

    </>
  );
}

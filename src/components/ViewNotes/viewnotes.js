import React from "react";
import "./styles.scss";
import moment from "moment";
import Viewingnotes from "./viewingnotes";
import { useViewNote } from "./useViewNote";

export default function ViewNotes({ isDark, text, toggleViewNotes, setText, viewNotes, dateUpd, dateChange }) {
  const { list, users, id, toggleUpdateNote, togglerefreshchange, textnote, setUpdateNote } =
    useViewNote();

  // const notediv = document.getElementById("newnote")
  // notediv.addEventListener('click', () => {

  const clickFunctionnew = () => {
    setText("");
    setUpdateNote(false)
    window.sessionStorage.removeItem("text");
    sessionStorage.removeItem("noteid")
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

            {users.map((t) => (
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

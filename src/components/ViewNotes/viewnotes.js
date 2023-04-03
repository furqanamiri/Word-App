import React from "react";
import "./styles.scss";
import moment from "moment";
import Viewingnotes from "./viewingnotes";
import Footer from "../Footer";
import { useViewNote } from "./useViewNote";

export default function ViewNotes({ isDark, text, toggleViewNotes, setText }) {
  const {list, users, id, toggleUpdateNote, togglerefreshchange, textnote, dateUpd  } =
    useViewNote();

  // const notediv = document.getElementById("newnote")
  // notediv.addEventListener('click', () => {

  const clickFunctionnew = () => {
    setText("");
    toggleUpdateNote(false);
    window.sessionStorage.removeItem("text");
    toggleViewNotes();
  };
  //ShowFile
  function showFile() {
    clickFunctionnew();
    var preview = document.getElementById("show-text");
    var file1 = document.querySelector("#file1").files[0];
    var reader = new FileReader();

    var textFile = /text.*/;
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
            />
            <img src="./svg/localfile.svg"></img>
            <b className="local-file-para">Browse</b>{" "}
            <span className="notes-center"> your files</span>
          </label>
        </div>
        <div className="fluid-container mainnotes" id="mainnotes">
          <div className="row" id="notesadd">
            <div className="note col-md-5 col-lg-2 col-sm-4" id="newnote">
              <button onClick={clickFunctionnew}>
                <p className="notetext"> {textnote.current}</p>
              </button>
              <div
                className={
                  isDark
                    ? "darknotetext darknotesfooter"
                    : " lightnotetext  darknotesfooter"
                }
              >
                <div>
                  <p className="footerpara">Last Updated</p>
                </div>
                <div>
                  <p className="footerpara">{moment(dateUpd).fromNow()}</p>
                </div>
              </div>
            </div>

            {users.map((t) => (
              <Viewingnotes
                isDark={isDark}
                list={t.content}
                idnote={t.id}
                togglerefreshchange={togglerefreshchange}
                toggleViewNotes={toggleViewNotes}
                setText={setText}
              />
            ))}
          </div>
        </div>
      </div>

      <Footer text={text} setText={text} />
    </>
  );
}

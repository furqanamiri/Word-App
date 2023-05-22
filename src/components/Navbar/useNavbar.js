import React, { useContext, useRef, useState } from "react";
import { AnonContext } from "../../js/AnonContext";
import { IsAuto } from "../../js/Isauto";
import { LoginContext } from "../../js/Logincontext";
import { updateContext } from "../../js/updatecontext";
import { jsPDF } from "jspdf";


const docx = require("docx")

var FileSaver = require('file-saver');
const useNavBar = ({ toggleTheme,
  isDark,
  text,
  toggleViewNotes,
  setText }) => {
  const { loginUser, loginToken } = useContext(LoginContext);
  const [shareModal, setShareModal] = useState(false);
  const toggleShareModalClose = () => setShareModal(false);
  const toggleShareModalOpen = () => setShareModal(true);


  //ExportModal hook state

  const [exportModal, setExportModal] = useState(false);
  const toggleExportModalOpen = () => setExportModal(true);
  const toggleExportModalClose = () => setExportModal(false);

  const { toggleAnonUser, setEdit } = useContext(AnonContext);
  const { updateNote, noteId, copyFunction, toggleUpdateNote } = useContext(updateContext);
  const { theme } = useContext(IsAuto);

  //File Opening functionality
  function showFile() {
    var preview = document.getElementById("show-text");
    var file = document.querySelector("input[type=file]").files[0];
    var reader = new FileReader();
    var textFile = /text.*/;
    reader.readAsText(file);
    // if (file.type.match(textFile))
    reader.onload = function (event) {
      setText(event.target.result);
    };
    reader.onerror = function (error) {
      error.target.result;
    };
  }
  //File Saving functionality
  //PDF 
  function pdf() {
    let doc = new jsPDF();

    // Source HTMLElement or a string containing HTML.

    doc.html(text, {
      callback: function (doc) {
        // Save the PDF
        doc.save('note.pdf');
      },
      margin: [10, 10, 10, 10],
      autoPaging: 'text',
      x: 0,
      y: 0,
      width: 190, //target width in the PDF document
      windowWidth: 675 //window width in CSS pixels
    });
  }
  //Password Modal hook state
  const [showPassword, setShowPass] = useState(false);
  const handleClosePass = () => setShowPass(false);
  const handleShowPass = () => setShowPass(true);
  const idgenerator = () => {
    let retVal = "";
    let charset = "0123456789";
    let length = 6;
    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    idsave.current = retVal;
  };

  //Word File
  function wordFile() {
    const doc = new docx.Document({
      sections: [
        {
          properties: {},
          children: [
            new docx.Paragraph({
              children: [
                new docx.TextRun("Note"),
                new docx.TextRun({
                  text: "\n " + text,
                  bold: true
                }),

              ]
            })
          ]
        }
      ]
    });

    docx.Packer.toBlob(doc).then((blob) => {
      console.log(blob);
      saveAs(blob, "note.docx");
    });
  }

  //File Saving to cloud
  const idsave = useRef("");

  //File Opening functionality
  function showFile() {
    var preview = document.getElementById("show-text");
    var file = document.querySelector("input[type=file]").files[0];
    var reader = new FileReader();
    var textFile = /text.*/;
    reader.readAsText(file);
    // if (file.type.match(textFile))
    reader.onload = function (event) {
      setText(event.target.result);
    };
    reader.onerror = function (error) {
      error.target.result;
    };
  }
  //File Saving functionality

  const toggleSaveFile = () => {
    console.log(loginUser);
    if (!loginUser) {
      const newstring = text;
      var blob = new Blob([newstring], { type: "text/plain;charset=utf-8" });
      FileSaver.saveAs(blob, "hello world.txt");
    } else {
      if (!updateNote) {
        toggleUpdateNote();
        idgenerator();
        fetch(process.env.REACT_APP_ADD, {
          method: "POST",
          headers: {
            accept: "application.json",
            "Content-Type": "application/json",
            token: loginToken.current,
          },
          body: JSON.stringify({
            id: idsave.current,
            content: text,
          }),
        }).then((response) => {
          noteId.current = idsave.current;

        });
      } else {
        fetch(process.env.REACT_APP_UPDATE, {
          method: "PUT",
          headers: {
            accept: "application.json",
            "Content-Type": "application/json",
            token: loginToken.current,
          },
          body: JSON.stringify({
            id: noteId.current,
            content: text,
          }),
        });
      }
    }
  };

  //Login Modal hook state
  const [showLoginModal, setShowLoginModal] = useState(false);
  const LoginModalClose = () => setShowLoginModal(false);
  const LoginModalOpen = () => {
    setShowLoginModal(true);

  };

  const { editToken, setEditToken } = useContext(updateContext)

  const changeLink = (type) => {
    if (type == 'edit') {
      fetch('https://api.wordpad.app/notes/' + noteId.current + '/note-link?type=edit', {
        method: "GET",
        headers: {
          accept: "application.json",
          "Content-Type": "application/json",
          token: loginToken.current,
        }
      }).then((response) =>
        response.json()
      ).then((response) => {
        editToken.current = response.token
      }
      );

    }
    else {
      fetch('https://api.wordpad.app/notes/' + noteId.current + '/note-link?type=view', {
        method: "GET",
        headers: {
          accept: "application.json",
          "Content-Type": "application/json",
          token: loginToken.current,
        }
      }).then((response) =>
        response.json()
      ).then(((response) => {
        editToken.current = response.token


      })
      );

    }
  }
  const LogOut = () => {
    fetch(process.env.REACT_APP_LOGOUT, {
      method: "GET",
      headers: {
        Accept: "*/*",
        token: loginToken.current,
      },
    }).then(() => {
      window.sessionStorage.clear("loginToken");
      window.sessionStorage.clear("loginUser");
      window.sessionStorage.clear("");
      toggleAnonUser();
      location.reload();
    });
  };


  return {
    toggleSaveFile,
    showFile,
    showPassword,
    isDark,
    toggleTheme,
    handleClosePass,
    handleShowPass,
    showLoginModal,
    LoginModalOpen,
    LoginModalClose,
    LogOut,
    toggleViewNotes,
    loginUser,
    toggleExportModalOpen,
    toggleExportModalClose,
    exportModal,
    shareModal,
    toggleShareModalOpen,
    toggleShareModalClose,
    text,
    loginUser, setEdit, theme, copyFunction, noteId, pdf,
    wordFile,

    changeLink
  };
}

export default useNavBar;

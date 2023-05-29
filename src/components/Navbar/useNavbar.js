import React, { useContext, useEffect, useRef, useState } from "react";
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
  const [checked, setChecked] = useState(false)
  const [fileType, setFileType] = useState("")

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
  function pdf(fileName) {
    let doc = new jsPDF();

    // Source HTMLElement or a string containing HTML.

    doc.html(text, {
      callback: function (doc) {
        // Save the PDF
        doc.save(fileName + '.pdf');
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
  function wordFile(fileName) {
    const doc = new docx.Document({
      sections: [
        {
          properties: {},
          children: [
            new docx.Paragraph({
              children: [
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
      saveAs(blob, fileName + ".docx");
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

  const toggleSaveFile = (fileName) => {
    console.log(loginUser);
    if (!loginUser) {
      const newstring = text;
      var blob = new Blob([newstring], { type: "text/plain;charset=utf-8" });
      FileSaver.saveAs(blob, fileName + ".txt");
    } else {
      setText("")
      // if (!updateNote) {
      //   toggleUpdateNote();
      //   idgenerator();
      //   fetch(process.env.REACT_APP_ADD, {
      //     method: "POST",
      //     headers: {
      //       accept: "application.json",
      //       "Content-Type": "application/json",
      //       token: loginToken.current,
      //     },
      //     body: JSON.stringify({
      //       id: idsave.current,
      //       content: text,
      //     }),
      //   }).then((response) => {
      //     noteId.current = idsave.current;

      //   });
      // } else {
      //   fetch(process.env.REACT_APP_UPDATE, {
      //     method: "PUT",
      //     headers: {
      //       accept: "application.json",
      //       "Content-Type": "application/json",
      //       token: loginToken.current,
      //     },
      //     body: JSON.stringify({
      //       id: noteId.current,
      //       content: text,
      //     }),
      //   });
      // }
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
        setChecked(true)
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
        setChecked(true)
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
      window.localStorage.clear("loginToken");
      window.localStorage.clear("loginUser");
      window.localStorage.clear("noteid")
      window.localStorage.clear("");
      toggleAnonUser();
      location.reload();
    });
  };

  useEffect(() => {
    if (window.localStorage.getItem("noteid"))
      noteId.current = localStorage.getItem("noteid")
  }, [noteId])

  const textDownload = (filetype1) => {
    setFileType(filetype1)
    handleShowPass()
  }
  return {
    toggleSaveFile,
    showFile,
    showPassword,
    isDark,
    fileType,
    textDownload,
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
    editToken,
    changeLink,
    checked
  };
}

export default useNavBar;

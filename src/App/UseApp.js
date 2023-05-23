import React, { useContext, useEffect, useRef, useState } from 'react'
import { LoginContext } from '../js/Logincontext'
import moment from 'moment';

const UseApp = ({ isNight, theme, id, token }) => {
  //text string state , used for file storing, saving, api calls
  const [text, setText] = useState("");
  const textUpdate = (str) => {
    setText(str)
  }
  //Date
  const [dateUpd, setDateUpd] = useState(moment())

  const dateChange = (str) => {
    setDateUpd(str)
  }
  const editToken = useRef('')
  //Login State Handling
  const [loginUser, setLoginUser] = useState(false);
  const loginToken = useRef('')
  function toggleUserLogin() {
    setLoginUser(!loginUser);
  }
  //Note Id
  const noteId = useRef('')

  //Idsave
  const idsave = useRef('')
  const idgenerator = () => {
    let retVal = "";
    let charset = "0123456789"
    let length = 6;
    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }

    idsave.current = retVal;


  }
  //AnonToken
  const anonToken = useRef('')
  //AnonContext
  const [anonContext, setAnonContext] = useState(true)
  function toggleAnonUser() {
    setAnonContext(!anonContext)
  }
  const [updateNote, setUpdateNote] = useState(false)
  const toggleUpdateNote = () => {
    setUpdateNote(true)
  }
  //editable hook
  const [editable, setEditable] = useState('yes')
  const [editableNote, setEditableNote] = useState(true)
  const setEdit = (str) => {
    setEditable(str)
  }
  //ViewNotes
  const [viewNotes, setViewNotes] = useState(false)
  const toggleViewNotes = () => {

    if (!viewNotes) {
      setViewNotes(true)
    } else {
      setViewNotes(false)
    }


  }
  useEffect(() => {

    if (localStorage.getItem("noteid")) {
      noteId.current = sessionStorage.getItem("noteid")
      idsave.current = sessionStorage.getItem("noteid")
    }
    if (window.sessionStorage.getItem('loginToken')) {
      loginToken.current = window.sessionStorage.getItem('loginToken')
      toggleAnonUser()

    }
    if (window.sessionStorage.getItem('text')) {
      setText(window.sessionStorage.getItem('text'))
    }
    if (window.sessionStorage.getItem('loginUser')) {
      setLoginUser(window.sessionStorage.getItem('loginUser'))
      toggleViewNotes()
    }
    else {
      fetch(process.env.REACT_APP_ANON_USER, {
        method: 'GET', headers: {
          accept: 'application.json', 'Content-Type': 'application/json',

        },
      }).then((response) => response.json()).then((response) => {
        if (response.token)
          anonToken.current = response.token;
        window.sessionStorage.setItem('anonToken', anonToken.current)


      }).then((response) => {
        if (id != " ") {
          fetch(process.env.REACT_APP_SHARE_NOTE + id + '/' + token, {
            method: "GET",
            headers: {
              accept: "application/json",
              token: loginUser ? loginToken.current : anonToken.current
            }
          }).then(response => response.json()).then((response) => {


            setText(response.note.content)
            toggleUpdateNote(true)
            if (response.editable == false) {
              setEditable('No')
              setEditableNote(false)
            }
            window.sessionStorage.setItem("noteid", id)
            noteId.current = id
          })


        }
      }).then((response) => {

        if (!updateNote) {
          idgenerator()
          fetch(process.env.REACT_APP_ADD, {

            method: 'POST',
            headers: {
              accept: 'application.json', 'Content-Type': 'application/json',
              token: loginUser ? loginToken.current : anonToken.current
            }, body: JSON.stringify({
              id: idsave.current,
              content: text,
              editable: editable

            })

          }).then((response) => {
            noteId.current = idsave.current
            windows.sessionStorage.setItem("noteid", noteId.current)
            toggleUpdateNote(true)
          })
        }
      }
      ).catch()
    }

    //Id in url parameter from share
  }, [])


  useEffect(() => {
    if (loginUser) {
      window.sessionStorage.setItem('loginUser', loginUser)
      window.sessionStorage.setItem('loginToken', loginToken.current)
    }
  }, [loginUser])

  useEffect(() => {
    document.body.className = " ";
    document.body.className = theme === "auto" && isNight() ? "dark" : theme === "auto" && !isNight() ? "light" : theme === "light" ? "light" : "dark";
  }, [theme]);
  //edit update
  useEffect(() => {
    fetch(process.env.REACT_APP_UPDATE, {
      method: 'PUT',
      headers: {
        accept: 'application.json', 'Content-Type': 'application/json',
        token: loginUser ? loginToken.current : anonToken.current
      }, body: JSON.stringify({
        id: noteId.current,
        content: text,
        editable: editable,
        date: dateUpd
      })

    })
  }
    , [editable])
  //update check
  useEffect(() => {
    window.sessionStorage.setItem('updatecontext', updateNote)
    window.sessionStorage.setItem('noteid', noteId.current)
  }, [updateNote])
  // Auto Update




  useEffect(() => {
    window.sessionStorage.setItem('text', text)
    if (updateNote) {

      fetch(process.env.REACT_APP_UPDATE, {
        method: 'PUT',
        headers: {
          accept: 'application.json', 'Content-Type': 'application/json',
          token: loginUser ? loginToken.current : anonToken.current
        }, body: JSON.stringify({
          id: noteId.current,
          content: text,
          editable: editable,
          date: dateUpd
        })

      }).then()
    }
    else {
      if (!window.sessionStorage.getItem('noteid'))
        idgenerator()
      setUpdateNote(true)
      fetch(process.env.REACT_APP_ADD, {

        method: 'POST',
        headers: {
          accept: 'application.json', 'Content-Type': 'application/json',
          token: loginUser ? loginToken.current : anonToken.current
        }, body: JSON.stringify({
          id: idsave.current,
          content: text,
          editable: editable

        })

      }).then(() => {
        noteId.current = idsave.current
        window.sessionStorage.setItem("noteid", idsave.current)
        dateChange(moment())
      })

    }
  }, [text])






  return {
    loginUser, loginToken, noteId, anonToken, toggleUserLogin, anonContext, toggleAnonUser, viewNotes, toggleViewNotes, toggleUpdateNote, setUpdateNote,
    setEdit, idsave, editableNote, editable, updateNote, textUpdate, text, dateUpd, dateChange, editToken
  }

}
export default UseApp
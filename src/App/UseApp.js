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
    noteId.current = retVal


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
      noteId.current = localStorage.getItem("noteid")
      idsave.current = localStorage.getItem("noteid")
    }
    if (window.localStorage.getItem('loginToken')) {
      loginToken.current = window.localStorage.getItem('loginToken')
      toggleAnonUser()

    }
    if (window.localStorage.getItem('text')) {
      setText(window.localStorage.getItem('text'))
    }
    if (window.localStorage.getItem('loginUser')) {
      setLoginUser(window.localStorage.getItem('loginUser'))
      loginToken.current = window.localStorage.getItem("loginToken")
      toggleViewNotes()
    }

    if (!window.localStorage.getItem('loginUser'))
      fetch(process.env.REACT_APP_ANON_USER, {
        method: 'GET', headers: {
          accept: 'application.json', 'Content-Type': 'application/json',

        },
      }).then((response) => response.json()).then((response) => {
        if (response.token)
          anonToken.current = response.token;
        window.localStorage.setItem('anonToken', anonToken.current)


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
            window.localStorage.setItem("noteid", id)
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
            window.localStorage.setItem("noteid", noteId.current)
            toggleUpdateNote(true)
          })
        }
      }
      ).catch()
    else {
      loginToken.current = window.localStorage.getItem('loginToken')
      if (id != " ") {
        fetch(process.env.REACT_APP_SHARE_NOTE + id + '/' + token, {
          method: "GET",
          headers: {
            accept: "application/json",
            token: loginToken.current
          }
        }).then(response => response.json()).then((response) => {


          setText(response.note.content)
          toggleUpdateNote(true)
          if (response.editable == false) {
            setEditable('Yes')
            setEditableNote(true)
          }
          window.localStorage.setItem("noteid", id)
          noteId.current = id
        })


      }


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
          window.localStorage.setItem("noteid", noteId.current)
          toggleUpdateNote(true)
        })

      }
    }

    //Id in url parameter from share
  }, [])


  useEffect(() => {
    if (loginUser) {
      window.localStorage.setItem('loginUser', loginUser)
      setText("")
      setUpdateNote(false)
      window.localStorage.setItem('loginToken', loginToken.current)
      loginToken.current = window.localStorage.getItem('loginToken')
    }
  }, [loginUser])

  useEffect(() => {
    document.body.className = " ";
    document.body.className = theme === "dark" ? "dark" : 'light';
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
    window.localStorage.setItem('updatecontext', updateNote)
    window.localStorage.setItem('noteid', noteId.current)
  }, [updateNote])
  // Auto Update




  useEffect(() => {
    window.localStorage.setItem('text', text)
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
      if (text.length == 0) { }
      else {
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
            editable: editable,
            content: text,

          })

        }).then(() => {
          noteId.current = idsave.current
          window.localStorage.setItem("noteid", idsave.current)
          dateChange(moment())
        })
      }

    }
  }, [text])






  return {
    loginUser, loginToken, noteId, anonToken, toggleUserLogin, anonContext, toggleAnonUser, viewNotes, toggleViewNotes, toggleUpdateNote, setUpdateNote,
    setEdit, idsave, editableNote, editable, updateNote, textUpdate, text, dateUpd, dateChange, editToken
  }

}
export default UseApp
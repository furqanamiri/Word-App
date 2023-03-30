import React, { useContext, useEffect, useRef, useState } from 'react'
import { LoginContext } from './Logincontext'

const UseApp = ({ isNight, theme, id }) => {
  //text string state , used for file storing, saving, api calls
  const [text, setText] = useState('');
  const textUpdate = (str) => {
    setText(str)
  }
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
  const toggleUpdateNote = (str) => {
    setUpdateNote(str)
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
    if (window.sessionStorage.getItem('loginUser')) {
      setLoginUser(window.sessionStorage.getItem('loginUser'))
    }
    if (window.sessionStorage.getItem('loginToken')) {
      loginToken.current = window.sessionStorage.getItem('loginToken')
      toggleAnonUser()

    }

    if (!loginUser)
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

          fetch(process.env.REACT_APP_SHARE_NOTE + id, {
            method: "GET",
            headers: {
              accept: "application/json",
              token: loginUser ? loginToken.current : anonToken.current
            }
          }).then(response => response.json()).then((response) => {



            setText(response.note.content)
            toggleUpdateNote(true)
            if (response.note.editable == "No") {
              setEditable('No')
              setEditableNote(false)
            }

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
            toggleUpdateNote(true)
          })
        }
      }
      ).catch()

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
        editable: editable
      })

    })
  }
    , [editable])
  //update check
  useEffect(() => {
    window.sessionStorage.setItem('updatecontext', updateNote)
  }, [updateNote])
  // Auto Update
  useEffect(() => {
    if (updateNote) {

      fetch(process.env.REACT_APP_UPDATE, {
        method: 'PUT',
        headers: {
          accept: 'application.json', 'Content-Type': 'application/json',
          token: loginUser ? loginToken.current : anonToken.current
        }, body: JSON.stringify({
          id: noteId.current,
          content: text,
          editable: editable
        })

      })
    }


  }, [text])

  return {
    loginUser, loginToken, noteId, anonToken, toggleUserLogin, anonContext, toggleAnonUser, viewNotes, toggleViewNotes, toggleUpdateNote,
    setEdit, idsave, editableNote, editable, updateNote, textUpdate, text
  }

}
export default UseApp
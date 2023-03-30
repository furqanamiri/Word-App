import React, { createContext } from 'react';
import "../scss/app.scss"
import { Navbar } from '../components/Navbar/navbar.js'
import TextArea from '../components/textarea';
import { useRef, useState, useEffect, useContext } from 'react'
import { LoginContext } from './Logincontext';
import { Viewnotes } from '../components/Viewing_Notes/viewnotes';
import { IsAuto } from './Isauto';
import { updateContext } from './updatecontext';
import FileReaderfun from './filereaderfun';
import { AnonContext } from './AnonContext';
import UseApp from './UseApp';

function App() {

  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);
  let id = " "
  id = urlParams.get('id')







  //loginUser is used to persist login state once user is logged in




  //Note state

  const time = new Date().getHours()

  const isNight = () => {
    if (time >= 18 || time < 6) {
      return true
    }
    else
      return false

  }

  //  Theme hook
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {

    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('auto');

    }
    else {
      setTheme('light');
    }

  };

  //url check
  let r = /:\/\/(.[^/]+)/;
  const urlapp = window.location.href
  const domain = urlapp.match(r)[1]
  const copyFunction = (e) => {
    e.preventDefault()
    navigator.clipboard.writeText(domain + '/?id=' + noteId.current);
    if (updateNote) {

      fetch(process.env.REACT_APP_UPDATE, {
        method: 'PUT',
        headers: {
          accept: 'application.json', 'Content-Type': 'application/json',
          token: loginUser ? loginToken.current : anonToken.current
        }, body: JSON.stringify({
          id: noteId.current,
          content: text,
          editable: editable.current,
        })

      })
    }
  }

  const { loginUser, loginToken, noteId, anonToken, toggleUserLogin, anonContext, toggleAnonUser, viewNotes, toggleViewNotes, toggleUpdateNote,
    setEdit, idsave, editableNote, editable, updateNote, textUpdate, text } = UseApp({ isNight, theme, id })

  return (
    <>
      <IsAuto.Provider value={{ theme }} >
        <AnonContext.Provider value={{ anonContext, toggleAnonUser, anonToken, editableNote, setEdit, editable }}>
          <LoginContext.Provider value={{ loginUser, toggleUserLogin, loginToken }}>
            <updateContext.Provider value={{ updateNote, toggleUpdateNote, noteId, copyFunction }}>
              <Navbar toggleTheme={toggleTheme} isDark={theme === 'dark'} text={text} toggleViewNotes={toggleViewNotes} setText={textUpdate} domain={domain} />

              {viewNotes ? <Viewnotes isDark={theme === 'dark'} toggleViewNotes={toggleViewNotes} setText={textUpdate} /> : <TextArea text={text} setText={textUpdate} />}
              {/* <Footer /> */}
            </updateContext.Provider>
          </LoginContext.Provider>
        </AnonContext.Provider>
      </IsAuto.Provider>

    </>
  )
}
export default App;
import React, { createContext } from 'react';
import "./styles.scss"
import Navbar from '../components/Navbar'
import TextArea from '../components/TextArea';
import { useRef, useState, useEffect, useContext } from 'react'
import { LoginContext } from '../js/Logincontext';
import ViewNotes from '../components/ViewNotes';
import { IsAuto } from '../js/Isauto';
import { updateContext } from '../js/updatecontext';
import { AnonContext } from '../js/AnonContext';
import Footer from '../components/Footer';
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
    setEdit, editableNote, editable, updateNote, textUpdate, text, setUpdateNote, dateUpd, dateChange } = UseApp({ isNight, theme, id })

  return (
    <>
      <IsAuto.Provider value={{ theme }} >
        <AnonContext.Provider value={{ anonContext, toggleAnonUser, anonToken, editableNote, setEdit, editable }}>
          <LoginContext.Provider value={{ loginUser, toggleUserLogin, loginToken }}>
            <updateContext.Provider value={{ updateNote, toggleUpdateNote, noteId, copyFunction, setUpdateNote }}>
              <div className="Maindiv">
                <Navbar toggleTheme={toggleTheme} isDark={theme === 'dark'} text={text} toggleViewNotes={toggleViewNotes} setText={textUpdate} domain={domain} viewNotes={viewNotes} />

                {viewNotes ? <ViewNotes isDark={theme === 'dark'} text={text} toggleViewNotes={toggleViewNotes} setText={textUpdate} viewNotes={viewNotes} dateUpd={dateUpd} dateChange={dateChange} /> : <TextArea text={text} setText={textUpdate} dateChange={dateChange} />}

                <Footer text={text} viewNotes={viewNotes} dateUpd={dateUpd} dateChange={dateChange} />
              </div>
            </updateContext.Provider>
          </LoginContext.Provider>
        </AnonContext.Provider>
      </IsAuto.Provider>

    </>
  )
}
export default App;
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
import Toast from 'react-bootstrap/Toast';
import { ToastContainer } from 'react-bootstrap';

function App() {

  const queryString = window.location.search;
  const [showToast, setShowToast] = useState(true)
  const urlParams = new URLSearchParams(queryString);
  let id = " "
  id = urlParams.get('id')
  let token = " "
  token = urlParams.get('token')
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
  const { loginUser, loginToken, noteId, anonToken, toggleUserLogin, anonContext, toggleAnonUser, viewNotes, toggleViewNotes, toggleUpdateNote,
    setEdit, editableNote, editable, updateNote, textUpdate, text, setUpdateNote, dateUpd, dateChange, editToken, setEditToken } = UseApp({ isNight, theme, id, token })
  //url check
  let r = /:\/\/(.[^/]+)/;
  const urlapp = window.location.href
  const domain = urlapp.match(r)[1]
  const copyFunction = (e) => {
    e.preventDefault()
    console.log(editToken)
    navigator.clipboard.writeText(domain + '/?id=' + noteId.current + '&token=' + editToken.current);

  }



  return (
    <>
      <IsAuto.Provider value={{ theme }} >
        <AnonContext.Provider value={{ anonContext, toggleAnonUser, anonToken, editableNote, setEdit, editable, text }}>
          <LoginContext.Provider value={{ loginUser, toggleUserLogin, loginToken }}>
            <updateContext.Provider value={{ updateNote, toggleUpdateNote, noteId, copyFunction, setUpdateNote, editToken, setEditToken }}>
              <ToastContainer
                position={"top-start"}
                className="notification">

                <Toast show={showToast}
                  className="notification">

                  <Toast.Body>Click on the Download Button to Downloading the Wordpad App for Your Computer.
                    <div className='toastbutton'>
                      <button className='appbutt'
                        onClick={() => { setShowToast(false) }}>
                        Download Desktop App
                      </button>
                      <img src='./svg/closetoast.svg' onClick={() => { setShowToast(false) }}></img>
                    </div></Toast.Body>
                </Toast>
              </ToastContainer>

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
import React, { createContext } from 'react';
import "../scss/app.scss"
import { Navbar } from './navbar'
import TextArea from './textarea';
import Footer from './footer';
import { useRef, useState, useEffect, useContext } from 'react'
import { LoginContext } from './Logincontext';
import { Viewnotes } from './viewnotes';
import { IsAuto } from './Isauto';

import FileReaderfun from './filereaderfun';

function App() {
  const idsave = useRef('')


  //text string state , used for file storing, saving, api calls
  const [text, setText] = useState('');
  //loginUser is used to persist login state once user is logged in
  const [loginUser, setLoginUser] = useState(false);
  const loginToken = useRef('')
  function toggleUserLogin() {
    setLoginUser(!loginUser);
  }
  const [viewNotes, setViewNotes] = useState(false)
  const toggleViewNotes = () => {
    console.log('hggdjusgjihg');
    if (viewNotes == false) {
      setViewNotes(true)
    } else {
      setViewNotes(false)
    }
    console.log(viewNotes)
  }
  const time = new Date().getHours()

  const isNight = () => {
    if (time >= 18 || time < 6) {
      return true
    }
    else
      return false

  }
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    console.log(theme)
    console.log(time)
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('auto');
      console.log('auto')
    }
    else {
      setTheme('light');
    }

  };
  useEffect(() => {
    document.body.className = " ";
    document.body.className = theme === "auto" && isNight() ? "dark" : theme === "auto" && !isNight() ? "light" : theme === "light" ? "light" : "dark";
  }, [theme]);
  return (

    <>
      <IsAuto.Provider value={{ theme }} >
        <LoginContext.Provider value={{ loginUser, setLoginUser, toggleUserLogin,loginToken }}>
          <Navbar toggleTheme={toggleTheme} isDark={theme === 'dark'} text={text} toggleViewNotes={toggleViewNotes} setText={setText} />

          {viewNotes ? <Viewnotes isDark={theme === 'dark'} toggleViewNotes={toggleViewNotes} setText={setText} /> : <TextArea text={text} setText={setText} />}
          <Footer />
        </LoginContext.Provider>
      </IsAuto.Provider>
    </>



  )


}
export default App;
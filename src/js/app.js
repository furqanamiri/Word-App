import React, { createContext } from 'react';
import "../scss/app.scss"
import { Navbar } from './navbar'
import TextArea from './textarea';
import Footer from './footer';
import { useRef, useState, useEffect, useContext } from 'react'
import { LoginContext } from './Logincontext';
import { Viewnotes } from './viewnotes';

import FileReaderfun from './filereaderfun';

function App() {
  const idsave = useRef('')


  //text string state , used for file storing, saving, api calls
  const [text, setText] = useState('');
  //loginUser is used to persist login state once user is logged in
  const [loginUser, setLoginUser] = useState(false);
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
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  useEffect(() => {
    document.body.className = " ";
    document.body.className = theme;
  }, [theme]);
  return (

    <>
      <LoginContext.Provider value={{ loginUser, setLoginUser, toggleUserLogin }}>
        <Navbar toggleTheme={toggleTheme} isDark={theme === 'dark'} text={text} toggleViewNotes={toggleViewNotes} setText={setText} />

        {viewNotes ? <Viewnotes isDark={theme === 'dark'} toggleViewNotes={toggleViewNotes} setText={setText} /> : <TextArea text={text} setText={setText} />}
        <Footer />
      </LoginContext.Provider>
    </>



  )


}
export default App;
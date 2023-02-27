import React from 'react';
import "../scss/app.scss"
import { Navbar } from './navbar'
import TextArea from './textarea';
import Footer from './footer';
import { useRef, useState, useEffect } from 'react'
import { Viewnotes } from './viewnotes';


function App() {
  const [text, setText] = useState('');
  const [loginUser, setLoginUser] = useState(false);
  function toggleUserLogin() {
    setLoginUser(!loginUser);
  }
  const [viewNotes, setViewNotes] = useState(true)
  function toggleViewNotes() {
    setViewNotes(!viewNotes);
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

    <><Navbar toggleTheme={toggleTheme} isDark={theme === 'dark'} text={text} setText={setText} toggleViewNotes={toggleViewNotes} />
      {viewNotes ? <Viewnotes isDark={theme === 'dark'} /> : <TextArea text={text} setText={setText} />}
      <Footer />
    </>



  )


}
export default App;
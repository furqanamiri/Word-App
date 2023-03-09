import React, { createContext } from 'react';
import "../scss/app.scss"
import { Navbar } from './navbar'
import TextArea from './textarea';
import Footer from './footer';
import { useRef, useState, useEffect, useContext } from 'react'
import { LoginContext } from './Logincontext';
import { Viewnotes } from './viewnotes';
import { IsAuto } from './Isauto';
import { updateContext } from './updatecontext';
import FileReaderfun from './filereaderfun';

function App() {
  const idsave = useRef('')
  const noteId = useRef('')
const [updateNote, setUpdateNote] = useState(false)

  //text string state , used for file storing, saving, api calls
  const [text, setText] = useState('');
  //loginUser is used to persist login state once user is logged in
  const [loginUser, setLoginUser] = useState(false);
  const loginToken = useRef('')
  function toggleUserLogin() {
    setLoginUser(!loginUser);
  }
  useEffect(()=>{
    window.sessionStorage.setItem('updatecontext',updateNote)
  },[updateNote])
  
  const [viewNotes, setViewNotes] = useState(false)
  const toggleViewNotes = () => {
    
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
useEffect(()=>{
  if(loginUser){
window.sessionStorage.setItem('loginUser',loginUser)  
window.sessionStorage.setItem('loginToken',loginToken.current)  }
},[loginUser])
  useEffect(()=> {
    if(window.sessionStorage.getItem('loginUser'))
    {
      setLoginUser(window.sessionStorage.getItem('loginUser'))
    }
    if(window.sessionStorage.getItem('loginToken')){
      loginToken.current = window.sessionStorage.getItem('loginToken')
      console.log(loginToken.current)
    }
    console.log(loginUser)
  },[])
  return (

    <>
      <IsAuto.Provider value={{ theme }} >
        <LoginContext.Provider value={{ loginUser, setLoginUser, toggleUserLogin,loginToken }}>
        <updateContext.Provider value={{updateNote , setUpdateNote, noteId}}>
          <Navbar toggleTheme={toggleTheme} isDark={theme === 'dark'} text={text} toggleViewNotes={toggleViewNotes} setText={setText} />

          {viewNotes ? <Viewnotes isDark={theme === 'dark'} toggleViewNotes={toggleViewNotes} setText={setText} /> : <TextArea text={text} setText={setText} />}
          <Footer />
          </updateContext.Provider>
        </LoginContext.Provider>
      </IsAuto.Provider>
    </>



  )


}
export default App;
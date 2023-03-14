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
import { AnonContext } from './AnonContext';
function App() {
  const [anonContext,setAnonContext] = useState(true)
  function toggleAnonUser(){
    setAnonContext(!anonContext)
  }


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
  
  const queryString = window.location.search;
console.log(queryString)
  const urlParams = new URLSearchParams(queryString);
let id = " "
  id = urlParams.get('id')
console.log(id)

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
    // fetch('http://54.146.74.146:4000/anonuser')
    fetch('http://54.146.74.146:4000/anonuser'
  ).then((response)=> response.json()).then((response)=>{
    if(response.token)
    loginToken.current = response.token;
    toggleUserLogin()
    console.log(response.token)
    
    setUpdateNote(true)
  }).then(()=>{
    if(id!=" "){
      fetch('http://54.146.74.146:4000/notes/note/'+id,{
      method: 'GET',
      headers:{
        accept: 'application/json',
        token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDEwMDA3Zjk1N2Q4MjdhM2NiMzBiYTYiLCJpYXQiOjE2Nzg3NzAzMDN9.zQCOVN75UYc21r4Mfa0jlI-ChLX9LiAHNsULRBq09Fk',
      }
      }).then(response=> response.json()).then((response)=>{
        
        if(response)
        console.log(response)
        if(response)
        setText(response.note.content)
        noteId.current = id
      })
    
    }
  })
  
  }
  ,[])
  return (

    <>
       <IsAuto.Provider value={{ theme }} >
      <AnonContext.Provider value={{anonContext, setAnonContext,toggleAnonUser,}}>
        <LoginContext.Provider value={{ loginUser, setLoginUser, toggleUserLogin,loginToken }}>
        <updateContext.Provider value={{updateNote , setUpdateNote, noteId}}>
          <Navbar toggleTheme={toggleTheme} isDark={theme === 'dark'} text={text} toggleViewNotes={toggleViewNotes} setText={setText} />

          {viewNotes ? <Viewnotes isDark={theme === 'dark'} toggleViewNotes={toggleViewNotes} setText={setText} /> : <TextArea text={text} setText={setText} />}
          <Footer />
          </updateContext.Provider>
        </LoginContext.Provider>
        </AnonContext.Provider>
      </IsAuto.Provider>
    </>



  )


}
export default App;
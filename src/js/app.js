import React, { createContext } from 'react';
import "../scss/app.scss"
import  Navbar  from '../Components/Navbar'
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
  const anonToken = useRef('')
    const idsave = useRef('')
  const noteId = useRef('')
const [updateNote, setUpdateNote] = useState(false)
//editable hook
const editable = useRef('yes')
  //text string state , used for file storing, saving, api calls
  const [text, setText] = useState('');
  //loginUser is used to persist login state once user is logged in
  const [loginUser, setLoginUser] = useState(false);
  const loginToken = useRef('')
  function toggleUserLogin(str) {
    setLoginUser(str);
  }
  const idgenerator = () => {
    let retVal = "";
    let charset = "0123456789"
    let length = 6;
    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }

    idsave.current = retVal;
   

  }
  
  const [viewNotes, setViewNotes] = useState(false)
  const toggleViewNotes = () => {
    
    if (viewNotes == false) {
      setViewNotes(true)
    } else {
      setViewNotes(false)
    }
   
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
   
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('auto');
     
    }
    else {
      setTheme('light');
    }

  };
  useEffect(()=>{
    window.sessionStorage.setItem('updatecontext',updateNote)
  },[updateNote])
  
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
     
    }
   
    fetch("https://api.wordpad.app/anonuser" ,{
      method: 'GET', headers: {
        accept: 'application.json', 'Content-Type': 'application/json',
                                                                                                                                                                                                                                           
      },
        }).then((response)=> response.json()).then((response)=>{
          if(response.token)
          loginToken.current = response.token;
          
          
         
        }).then((response)=>{
          idgenerator()
          fetch("https://api.wordpad.app/notes/add" , {
            method: 'POST',
            headers: {
              accept: 'application.json', 'Content-Type': 'application/json',
              token: loginToken.current
            }, body: JSON.stringify({
              id: idsave.current,
              content: text,
              editable : editable.current
               
            })
    
          }).then((response) => { noteId.current = idsave.current
          setUpdateNote(true)});
          }
        )

  },[])


  useEffect(() => {
    if(!loginUser){
    if (updateNote) {
       
         fetch("https://api.wordpad.app/notes/update" , {
           method: 'PUT',
           headers: {
             accept: 'application.json', 'Content-Type': 'application/json',
             token: loginToken.current
           }, body: JSON.stringify({
             id: noteId.current,
             content: text,
             editable : editable.current
 
           })
 
         })
       }
     
   }}, [text])
 
  
   const copyFunction = (e) => {
    e.preventDefault()
    navigator.clipboard.writeText(domain + '/?id=' + noteId.current);
    if (updateNote) {

      fetch("https://api.wordpad.app/notes/update", {
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

  return (

    <>
      <IsAuto.Provider value={{ theme }} >
      <AnonContext.Provider value={{anonContext, setAnonContext,toggleAnonUser,anonToken,editable}}>
        <LoginContext.Provider value={{ loginUser, setLoginUser, toggleUserLogin,loginToken }}>
        <updateContext.Provider value={{updateNote , setUpdateNote, noteId, copyFunction}}>
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
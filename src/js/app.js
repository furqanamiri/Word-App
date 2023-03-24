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
  const queryString = window.location.search;
 
    const urlParams = new URLSearchParams(queryString);
  let id = " "
    id = urlParams.get('id')
 
  const noteId = useRef('')
  
  const anonToken = useRef('')
    const idsave = useRef('')
 
const [updateNote, setUpdateNote] = useState(false)
//editable hook
const [editable,setEditable] = useState('yes')
const[editableNote, setEditableNote] = useState(true)

  //text string state , used for file storing, saving, api calls
  const [text, setText] = useState('');
  //loginUser is used to persist login state once user is logged in
  const [loginUser, setLoginUser] = useState(false);
  const loginToken = useRef('')
  function toggleUserLogin() {
    setLoginUser(!loginUser);
   
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
  //Note state
  const [viewNotes, setViewNotes] = useState(false)
  const toggleViewNotes = () => {
    
    if (!viewNotes) {
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
   if(!loginUser)
    fetch(process.env.REACT_APP_ANON_USER,{
      method: 'GET', headers: {
        accept: 'application.json', 'Content-Type': 'application/json',
                                                                                                                                                                                                                                           
      },
        }).then((response)=> response.json()).then((response)=>{
          if(response.token)
          loginToken.current = response.token;
       
          
         
        }).then((response)=>{
          if(id!=" "){
          
            fetch(process.env.REACT_APP_SHARE_NOTE+id,{
            method: "GET",
            headers:{
              accept: "application/json",
              token:loginToken.current,
            }
            }).then(response=> response.json()).then((response)=>{
             
             
              
              setText(response.note.content)
              setUpdateNote(true)
              if(response.note.editable == "No"){
                setEditable('No')
                setEditableNote(false)
              }
              
              noteId.current = id
            })
          
    
  }
        }).then((response)=>{
          
         if(!updateNote){idgenerator()
           fetch(process.env.REACT_APP_ADD, {
          
            method: 'POST',
            headers: {
              accept: 'application.json', 'Content-Type': 'application/json',
              token: loginToken.current
            }, body: JSON.stringify({
              id: idsave.current,
              content: text,
              editable : editable
               
            })
    
          }).then((response) => { noteId.current = idsave.current
          setUpdateNote(true)})
          }}
        ).catch()
        
        //Id in url parameter from share
       },[])
useEffect(() => {
  if (updateNote) {
     
       fetch(process.env.REACT_APP_UPDATE, {
         method: 'PUT',
         headers: {
           accept: 'application.json', 'Content-Type': 'application/json',
           token: loginToken.current
         }, body: JSON.stringify({
           id: noteId.current,
           content: text,
          editable: editable
         })

       })
     }
    
   
 }, [text])
 let r = /:\/\/(.[^/]+)/;


const urlapp = window.location.href
 const domain =  urlapp.match(r)[1] 
 const  copyFunction= (e)=>{
  e.preventDefault()
   navigator.clipboard.writeText(domain+'/?id='+noteId.current);
  if (updateNote) {
       
    fetch(process.env.REACT_APP_UPDATE, {
      method: 'PUT',
      headers: {
        accept: 'application.json', 'Content-Type': 'application/json',
        token: loginToken.current
      }, body: JSON.stringify({
        id: noteId.current,
        content: text,
       editable : editable.current,
        })

      })
  }
 }
 useEffect(()=>{
  fetch(process.env.REACT_APP_UPDATE, {
    method: 'PUT',
    headers: {
      accept: 'application.json', 'Content-Type': 'application/json',
      token: loginToken.current
    }, body: JSON.stringify({
      id: noteId.current,
      content: text,
      editable : editable
    })

  })
}
 ,[editable])
  
  return (

    <>
      <IsAuto.Provider value={{ theme }} >
      <AnonContext.Provider value={{anonContext, setAnonContext,toggleAnonUser,anonToken,editableNote,setEditable,editable}}>
        <LoginContext.Provider value={{ loginUser, setLoginUser, toggleUserLogin,loginToken }}>
        <updateContext.Provider value={{updateNote , setUpdateNote, noteId , copyFunction}}>
          <Navbar toggleTheme={toggleTheme} isDark={theme === 'dark'} text={text} toggleViewNotes={toggleViewNotes} setText={setText} />

          {viewNotes ? <Viewnotes isDark={theme === 'dark'} toggleViewNotes={toggleViewNotes} setText={setText} /> : <TextArea text={text} setText={setText} />}
          {/* <Footer /> */}
          </updateContext.Provider>
        </LoginContext.Provider>
        </AnonContext.Provider>
      </IsAuto.Provider>
      
    </>



  )


}
export default App;
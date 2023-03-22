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
  if(!id==" ")
  noteId.current = id
  const anonToken = useRef('')
    const idsave = useRef('')
 
const [updateNote, setUpdateNote] = useState(false)
//editable hook
const editable = useRef('yes')
const[editableNote, setEditablenote] = useState(true)
  //text string state , used for file storing, saving, api calls
  const [text, setText] = useState('');
  //loginUser is used to persist login state once user is logged in
  const [loginUser, setLoginUser] = useState(false);
  const loginToken = useRef('')
  function toggleUserLogin() {
    setLoginUser(!loginUser);
    console.log(loginUser)
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
  const toggleEditable =()=>{
if(editable.current=='No'){
  setEditablenote(false)
}
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
    fetch('http://34.232.69.171:4000/anonuser',{
      method: 'GET', headers: {
        accept: 'application.json', 'Content-Type': 'application/json',
                                                                                                                                                                                                                                           
      },
        }).then((response)=> response.json()).then((response)=>{
          if(response.token)
          loginToken.current = response.token;
       
          
         
        }).then((response)=>{
          if(id!=" "){
          
            fetch("http://34.232.69.171:4000/notes/note/"+id,{
            method: "GET",
            headers:{
              accept: "application/json",
              token:loginToken.current,
            }
            }).then(response=> response.json()).then((response)=>{
              if(response)
             
              if(response)
              setText(response.note.content)
              if(response.note.editable)
              {setEditablenote(response.note.editable)
              toggleEditable()}
              noteId.current = id
            })
          
    
  }
        }).then((response)=>{
          idgenerator()
          fetch('http://34.232.69.171:4000/notes/add', {
            method: 'POST',
            headers: {
              accept: 'application.json', 'Content-Type': 'application/json',
              token: loginToken.current
            }, body: JSON.stringify({
              id: idsave.current,
              content: text,
              editable : 'yes'
               
            })
    
          }).then((response) => { noteId.current = idsave.current
          setUpdateNote(true)})
          }
        ).catch((err)=>alert('cloud add unsuccessful'))
        
        //Id in url parameter from share
       },[])
useEffect(() => {
  if (updateNote) {
     
       fetch('http://34.232.69.171:4000/notes/update', {
         method: 'PUT',
         headers: {
           accept: 'application.json', 'Content-Type': 'application/json',
           token: loginToken.current
         }, body: JSON.stringify({
           id: noteId.current,
           content: text,

         })

       }).then((response) => { console.log('fileadded') });
     }
   
 }, [text])

 
 const copyFunction= (e)=>{
  e.preventDefault()
  navigator.clipboard.writeText("http://localhost:3000/?id="+noteId.current);
  if (updateNote) {
       
    fetch('http://34.232.69.171:4000/notes/update', {
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
  
  return (

    <>
      <IsAuto.Provider value={{ theme }} >
      <AnonContext.Provider value={{anonContext, setAnonContext,toggleAnonUser,anonToken,editableNote}}>
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
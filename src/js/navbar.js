import React from 'react';
import "../scss/navbar.scss"
import { Icon } from '@iconify/react';
import Loginform from './loginform';
import { useState, useEffect, useRef, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { saveAs } from 'file-saver';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import Passwordform from './passwordform';
import Registerform from './registerform';
import Exportmodal from './exportmodal';
import { LoginContext } from './Logincontext';
import Sharemodal from './sharemodal';
var FileSaver = require('file-saver');
import { IsAuto } from './Isauto';
import { updateContext } from './updatecontext';
import { AnonContext } from './AnonContext';



export function Navbar({ toggleTheme, isDark, text, toggleViewNotes, setText }) {
  //ShareModal  hook state
  const { anonContext, toggleAnonUser,editable } = useContext(AnonContext)
  const { updateNote, setUpdateNote, noteId, copyFunction } = useContext(updateContext)
  const { theme } = useContext(IsAuto)
  const [shareModal, setShareModal] = useState(false);
  const toggleShareModalClose = () => setShareModal(false);
  const toggleShareModalOpen = () => setShareModal(true);
  //ExportModal hook state
  const { loginUser, setLoginUser, toggleUserLogin, loginToken } = useContext(LoginContext)
  const [exportModal, setExportModal] = useState(false);
  const toggleExportModalOpen = () => setExportModal(true);
  const toggleExportModalClose = () => setExportModal(false);
  //Password Modal hook state
  const [showPassword, setShowPass] = useState(false);
  const handleClosePass = () => setShowPass(false);
  const handleShowPass = () => setShowPass(true);

  const setEdit = (string)=>{
    editable.current= string
   
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

  //File Saving to cloud
  const idsave = useRef('')
  
  //File Opening functionality 
  function showFile() {


    var preview = document.getElementById('show-text');
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader()
    
    var textFile = /text.*/;
    reader.readAsText(file)
    // if (file.type.match(textFile)) 
    reader.onload = function (event) {
      setText(event.target.result)
    }
    reader.onerror = function (error) {
      error.target.result
    }
   
  }
  //File Saving functionality

  const toggleSaveFile = () => {
    console.log(loginUser)
    if (!loginUser) {
      const newstring = text;
      var blob = new Blob([newstring], { type: "text/plain;charset=utf-8" });
      FileSaver.saveAs(blob, "hello world.txt")
    }
      else{
        if(!updateNote){
       idgenerator()
          fetch('http://34.232.69.171:4000/notes/add', {
            method: 'POST',
            headers: {
              accept: 'application.json', 'Content-Type': 'application/json',
              token: loginToken.current
            }, body: JSON.stringify({
              id: idsave.current,
              content: text,
               
            })
    
          }).then((response) => { noteId.current = idsave.current
          setUpdateNote(true)});
          }
        else{
          fetch('http://34.232.69.171:4000/notes/update', {
           method: 'PUT',
           headers: {
             accept: 'application.json', 'Content-Type': 'application/json',
             token: loginToken.current
           }, body: JSON.stringify({
             id: noteId.current,
             content: text,
 
           })
 
         })
        }
  }}

  //Login Modal hook state 
  const [showLoginModal, setShowLoginModal] = useState(false);

  const LoginModalClose = () => setShowLoginModal(false);
  const LoginModalOpen = () => {
    setShowLoginModal(true)

  };

  const LogOut = () => {
    fetch("http://34.232.69.171:4000/logout", {
      method: 'GET',
      headers: {
        Accept: '*/*',
        token: loginToken.current,
      }

    }).then(() => {
      
      window.sessionStorage.clear('loginToken')
      window.sessionStorage.clear('loginUser')
      window.sessionStorage.clear('')
      toggleAnonUser()
      toggleUserLogin(false)
      location.reload();
    })


  }





  return (<>
  {/* Basic Navbar */}
    <nav className='d-md-none d-lg-flex d-sm-none  flex-wrap-wrap' >
      <ul >
        {/* Note Icon */}
        <li>

          <button className='iconnav' onClick={toggleSaveFile} id="save" ><img src="./src/svg/noteicon.svg" className='iconnav' color="#7496b8" width="20" height="20" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-container='true' data-bs-placement="bottom" title="Saving Note"/></button>
        </li>
        {/* Open File */}
        <li><button className={loginUser ? "iconnav change" : "d-none"} onClick={toggleViewNotes}><img src='./src/svg/openfiles.svg' color="#7496b8" width="20" height="20" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-container='true' data-bs-placement="bottom" title="Open Note"></img></button>
          <label className={loginUser ? "d-none" : "iconnav change"}><input className="files iconnav" type="file" onChange={showFile} /><img src="./src/svg/openfiles.svg" className='iconnav' color="#7496b8" width="20" height="20" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-container='true' data-bs-placement="bottom" title="Open Note"/></label> </li>

        <Passwordform showPassword={showPassword} handleClosePass={handleClosePass} isDark={isDark} />

        {/* Login and Logout*/}
        <li><button className={loginUser ? "d-none" : "iconnav"} onClick={LoginModalOpen} ><img src="./src/svg/person.svg" width="20" height="20" className='iconnav'
        data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-container='true' data-bs-placement="bottom" title="Login"/></button>
          <button className={loginUser ? "iconnav" : "d-none"} onClick={LogOut} ><img src="./src/svg/logout.svg" width="20" height="20" className='iconnav' data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-container='true' data-bs-placement="bottom" title="LogOut"
          /></button>
        </li>
        <Loginform showLoginModal={showLoginModal} LoginModalClose={LoginModalClose} isDark={isDark} toggleViewNotes={toggleViewNotes} />
      </ul>

      <div className='align-self-center justify-self-center main-header'>
        <span className='W-head main-header'>W</span>ordpad
      </div>
      <ul className="justify-content-end" style={{ marginRight: '2rem' }}><li>
        <button onClick={toggleTheme} className="buttonicon">{theme === 'dark' ? <img src={"./src/svg/autotheme.svg"} className='buttonicon moon' /> : theme === 'light' ? <Icon className='moon' icon="ph:moon-bold" color="black" /> : <img src={"./src/svg/light.svg"} className='buttonicon moon' />}
        </button></li>

        <li >
          <OverlayTrigger
            trigger="click"
            key={'bottom'}
            placement={'bottom-end'}
            overlay={
              <Popover id={`popover-positioned-${'bottom'}`} style={{ borderRadius: '10px' }} className={isDark ? "tooltipdark" : "tooltiplight"}  >
                <Popover.Body className={isDark ? "tooltipdark" : "tooltiplight"} >
                  <div className='exporttool' >
                    <div style={{ width: "40%", display: "flex", justifyContent: "center", alignItems: 'center' }}>
                      <input type="radio" name="export" value="pdf" /><label style={{ paddingLeft: '10%' }}>PDF</label>
                    </div>

                    <div style={{ width: "50%", display: "flex", justifyContent: "center", alignItems: 'center' }}>
                      <input type="radio" name="export" value="word" />
                      <label style={{ paddingLeft: '7%' }}>Word</label>
                    </div>
                  </div>
                </Popover.Body>
              </Popover>
            }>
            <button className='export' style={isDark ? { color: 'black' } : { color: 'white' }}>
              <img src={isDark ? "./src/svg/darkfile.svg" : "./src/svg/file.svg"} className='buttonicon' />Export
            </button>


          </OverlayTrigger>


        </li>
        <li style={{ margin: '0' }}>
          <OverlayTrigger
            trigger={'click'}
            key={'bottom'}
            placement={'bottom-end'}
            overlay={
              <Popover id={`popover-positioned-${'bottom'}`} className={isDark ? "tooltipdark sharetool" : "tooltiplight sharetool"} style={{ borderRadius: '10px' }}>
                <Popover.Body>
                  <div className={isDark ? "tooltipdark linktool" : "tooltiplight linktool"}><img src="./src/svg/tooltiplink.svg"></img><p>http://localhost:3000/?id={noteId.current}</p></div>
                  <form className={isDark ? "tooltipdark " : "tooltiplight"} style={{ display: "flex", justifyContent: "end", alignItems: 'center' }}><input type="radio" name="sharerad" id="view only" onClick={()=>setEdit('No')}/><p style={{ width: 'fit-content', paddingLeft: '1%', paddingRight: '0.5em' }}>View Only</p>
                    <input type="radio" name="sharerad" id="editnote" onClick={()=>setEdit('yes')}/><p style={{ width: 'fit-content', paddingRight: '0.5em', paddingLeft: '1%' }}> Can Edit</p>
                    <button type="radio" name="sharerad" onClick={copyFunction} style={{ fontWeight: '300', color: '#7496B8' }}><img src="./src/svg/copylink.svg" style={{ paddingRight: '1%' }} ></img>Copy Link</button></form>
                </Popover.Body>
              </Popover>
            }
          >
            <button className='share' >
              <img className="buttonicon" src="./src/svg/share.png" />Share
            </button>
          </OverlayTrigger>

        </li>
      </ul>
    </nav>
    {/* Responsive Navbar */}
    <nav className='d-md-flex d-lg-none d-sm-flex ' style={{ height: '10%' }} >
      <ul >
        {/* Note Icon */}
        <li>

          <button className='iconnavsmall' onClick={toggleSaveFile} id="save" ><img src="./src/svg/noteicon.svg" className='iconnavsmall' color="#7496b8" width="50" height="50" /></button>
        </li>
        {/* Password */}
        <li><button className={loginUser ? "iconnavsmall change" : "d-none"} onClick={toggleViewNotes}><img src='./src/svg/openfiles.svg' className="iconnavsmall" color="#7496b8" width="20" height="20"></img></button>
          <label className={loginUser ? "d-none" : "iconnavsmall change"}><input className="files iconnavsmall" type="file" onChange={showFile} /><img src="./src/svg/openfiles.svg" className='iconnavsmall' color="#7496b8" width="20" height="20" /></label> </li>

        <Passwordform showPassword={showPassword} handleClosePass={handleClosePass} isDark={isDark} />

        {/* Login */}
        <li><button className={loginUser ? "d-none" : "iconnavsmall"} onClick={LoginModalOpen} data-bs-toggle="modal" data-bs-target="#exampleModal"><img src="./src/svg/person.svg" width="20" height="20" className='iconnavsmall'
        /></button>
          <button className={loginUser ? "iconnavsmall" : "d-none"} onClick={LogOut} ><img src="./src/svg/logout.svg" width="20" height="20" className='iconnavsmall'
          /></button>

        </li>
        <Loginform showLoginModal={showLoginModal} LoginModalClose={LoginModalClose} isDark={isDark} toggleViewNotes={toggleViewNotes} />
      </ul>

      <div className='align-self-center justify-self-center main-header' style={{ fontSize: '50px' }} >
        <span className='W-head main-header' style={{ fontSize: '60px' }} >W</span>ordpad
      </div>
      <ul className="justify-content-end" style={{ marginRight: '2rem' }}><li>
        <button onClick={toggleTheme} className=" iconnavsmall d-block">{theme === 'dark' ? <img src={"./src/svg/light.svg"} className='buttonicon iconnavsmall' /> : theme === 'light' ? <Icon className='moon iconnavsmall' icon="ph:moon-bold" color="black" /> : <img src={"./src/svg/autotheme.svg"} className=' moon iconnavsmall' />}</button></li>
        <li> <OverlayTrigger
          trigger="click"
          key={'bottom'}
          placement={'bottom-end'}
          className='smallarrow'
          overlay={
            <Popover id={`popover-positioned-${'bottom'}`} style={{ borderRadius: '10px' }} className={isDark ? "tooltipdark smalltootip" : "tooltiplight smalltootip"}  >
              <Popover.Body className={isDark ? "tooltipdark smalltooltip" : "tooltiplight smalltooltip"} >
                <ul className='d-inline'><li><button className=" smallnavbutticon" onClick={toggleExportModalOpen}
                  style={isDark ? { color: 'white' } : { color: 'black' }}>
                  <img src={isDark ? "./src/svg/file.svg" : "./src/svg/darkfile.svg"} height='40' width='40' />Export
                </button></li>
                  <Exportmodal exportModal={exportModal} toggleExportModalClose={toggleExportModalClose} isDark={isDark} />
                  <li> <button onClick={toggleShareModalOpen} className='share smallnavbutticon' >
                    <img src="./src/svg/share.png" height='40' width='40' />Share
                  </button></li>
                  <Sharemodal shareModal={shareModal} toggleShareModalClose={toggleShareModalClose} isDark={isDark} setEdit={setEdit}/>
                </ul>




              </Popover.Body>
            </Popover>
          }>
          <button className='navresicon iconnavsmall' style={isDark ? { color: 'black' } : { color: 'white' }}>
            <img src={isDark ? "./src/svg/navdropicondark.svg" : "./src/svg/navdropicon.svg"} style={{ height: '50px', width: '50px' }} className='buttonicon iconnavsmalll' />
          </button>

        </OverlayTrigger></li>

      </ul>
    </nav>



  </>)
}

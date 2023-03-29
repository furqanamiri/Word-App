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
  let r = /:\/\/(.[^/]+)/;
  const urlapp = window.location.href
 const domain =  urlapp.match(r)[1] 
  const { anonContext, toggleAnonUser,setEditable,editable } = useContext(AnonContext)
  const { updateNote, setUpdateNote, noteId , copyFunction} = useContext(updateContext)
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
  const idgenerator = () => {
    let retVal = "";
    let charset = "0123456789"
    let length = 6;
    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }

    idsave.current = retVal;
  

  }
  const setEdit = (string)=>{
    setEditable(string)
    
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
          fetch(process.env.REACT_APP_ADD, {
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
          fetch(process.env.REACT_APP_UPDATE, {
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
    fetch(process.env.REACT_APP_LOGOUT, {
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
      location.reload();
    })


  }
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
            editable : editable,
          })

        })
      }
    
  }, [text])





  return (<>
    <nav className='d-md-none d-lg-flex d-sm-none  d-xs-none flex-wrap-wrap' >
      <ul >
        {/* Note Icon */}
        <li>

          <button className='iconnav'  onClick={toggleSaveFile} id="save" ><img src="./svg/noteicon.svg"  data-bs-custom-class='navbar-tooltip' className='iconnav' color="#7496b8" width="20" height="20" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-container='true' data-bs-placement="bottom" title="Saving Note"/></button>
        </li>
        {/* File Open / List View */}
        <li><button className={loginUser ? "iconnav change" : "d-none"} onClick={toggleViewNotes}><img src='/svg/openfiles.svg' color="#7496b8" width="20" height="20" data-bs-custom-class='navbar-tooltip' data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-container='true' data-bs-placement="bottom" title="Open Note"></img></button>
          <label className={loginUser ? "d-none" : "iconnav change"}><input className="files iconnav" type="file" onChange={showFile} /><img src="./svg/openfiles.svg" className='iconnav' color="#7496b8" width="20" height="20" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-container='true' data-bs-placement="bottom" title="Open Note" /></label> </li>

        <Passwordform showPassword={showPassword} handleClosePass={handleClosePass} isDark={isDark} />

        {/* Login and Logout*/}
        <li><button className={loginUser ? "d-none" : "iconnav"} onClick={LoginModalOpen} data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-container='true' data-bs-placement="bottom" title="Login"><img src="./svg/person.svg" width="20" height="20" className='iconnav'
        /></button>
          <button className={loginUser ? "iconnav" : "d-none"} onClick={LogOut} ><img src="./svg/logout.svg" width="20" height="20" className='iconnav' data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-container='true' data-bs-placement="bottom" title="LogOut"/></button>
        </li>
        <Loginform showLoginModal={showLoginModal} LoginModalClose={LoginModalClose} isDark={isDark} toggleViewNotes={toggleViewNotes} LoginModalOpen={LoginModalOpen}/>
      </ul>

      <div className='align-self-center justify-self-center main-header'>
        <span className='W-head main-header'>W</span>ordpad
      </div>
      <ul className="justify-content-end nav-right-margin"><li>
        <button onClick={toggleTheme} className="buttonicon">{theme === 'dark' ? <img src={"./svg/autotheme.svg"} className='buttonicon moon' /> : theme === 'light' ? <Icon className='moon' icon="ph:moon-bold" color="black" /> : <img src={"./svg/light.svg"} className='buttonicon moon' />}
        </button></li>

        <li >
          <OverlayTrigger
            trigger="click"
            key={'bottom'}
            placement={'bottom-end'}
            overlay={
              <Popover id={`popover-positioned-${'bottom'}`} className={isDark ? "tooltipdark tooltip-radius" : "tooltip-radius tooltiplight"}  >
                <Popover.Body className={isDark ? "tooltipdark" : "tooltiplight"} >
                  <div className='exporttool' >
                    <div className='export-tooltip-div'>
                      <input type="radio" name="export" value="pdf" /><label className='tenpad'>PDF</label>
                    </div>

                    <div className='export-tooltip-div1'>
                      <input type="radio" name="export" value="word" />
                      <label className='sevenpad'>Word</label>
                    </div>
                  </div>
                </Popover.Body>
              </Popover>
            }>
            <button className='export'>
              <img src={isDark ? "./svg/darkfile.svg" : "./svg/file.svg"} className='buttonicon' />Export
            </button>


          </OverlayTrigger>


        </li>
        <li className='m-0'>
        {/* Share Tooltip main nav */}
          <OverlayTrigger
            trigger={'click'}
            key={'bottom'}
            placement={'bottom-end'}
            overlay={
              <Popover id={`popover-positioned-${'bottom'}`} className={isDark ? "tooltipdark sharetool tooltip-radius" : "tooltiplight sharetool tooltip-radius"}>
                <Popover.Body>
                  <div className={isDark ? "tooltipdark linktool" : "tooltiplight linktool"}><img src="./svg/tooltiplink.svg"></img><p id="urllink">{domain}?id={noteId.current}</p></div>
                  <form className={isDark ? "tooltipdark shareform" : "tooltiplight shareform"} ><input type="radio" name="sharerad" id="view only" onClick={()=>setEdit('No')}/><p className='viewbutt'>View Only</p>
                    <input type="radio" name="sharerad" id="editnote" onClick={()=>setEdit('yes')}/><p className='share-edit-butt'> Can Edit</p>
                    <button type="radio" className='share-copy-butt' onClick={copyFunction} name="sharerad"><img src="./svg/copylink.svg" className='pr1' ></img>Copy Link</button></form>
                </Popover.Body>
              </Popover>
            }
          >
            <button className='share' >
              <img className="buttonicon" src="./svg/share.png" />Share
            </button>
          </OverlayTrigger>

        </li>
      </ul>
    </nav>
    {/* Responsive Navbar */}
    <nav className='d-md-flex  d-lg-none d-sm-flex responsive-nav-height'  >
      <ul >
        {/* Note Icon */}
        <li>

          <button className='iconnavsmall' onClick={toggleSaveFile} id="save" ><img src="./svg/noteicon.svg" className='iconnavsmall' color="#7496b8" width="50" height="50" /></button>
        </li>
        {/* Password */}
        <li><button className={loginUser ? "iconnavsmall change" : "d-none"} onClick={toggleViewNotes}><img src='./svg/openfiles.svg' className="iconnavsmall" color="#7496b8" width="20" height="20"></img></button>
          <label className={loginUser ? "d-none" : "iconnavsmall change"}><input className="files iconnavsmall" type="file" onChange={showFile} /><img src="./svg/openfiles.svg" className='iconnavsmall' color="#7496b8" width="20" height="20" /></label> </li>

        <Passwordform showPassword={showPassword} handleClosePass={handleClosePass} isDark={isDark} />

        {/* Login */}
        <li><button className={loginUser ? "d-none" : "iconnavsmall"} onClick={LoginModalOpen} data-bs-toggle="modal" data-bs-target="#exampleModal"><img src="./svg/person.svg" width="20" height="20" className='iconnavsmall'
        /></button>
          <button className={loginUser ? "iconnavsmall" : "d-none"} onClick={LogOut} ><img src="./svg/logout.svg" width="20" height="20" className='iconnavsmall'
          /></button>

        </li>
        <Loginform showLoginModal={showLoginModal} LoginModalClose={LoginModalClose} isDark={isDark} toggleViewNotes={toggleViewNotes} />
      </ul>

      <div className='align-self-center justify-self-center main-header font50' >
        <span className='W-head main-header font60' >W</span>ordpad
      </div>
      <ul className="justify-content-end mr2"><li>
        <button onClick={toggleTheme} className=" iconnavsmall d-block">{theme === 'dark' ? <img src={"./svg/light.svg"} className='buttonicon iconnavsmall' /> : theme === 'light' ? <Icon className='moon iconnavsmall' icon="ph:moon-bold" color="black" /> : <img src={"./svg/autotheme.svg"} className=' moon iconnavsmall' />}</button></li>
        <li> <OverlayTrigger
          trigger="click"
          key={'bottom'}
          placement={'bottom-end'}
          className='smallarrow'
          overlay={
            <Popover id={`popover-positioned-${'bottom'}`} className={isDark ? "tooltipdark tooltip-radius smalltootip" : "tooltiplight tooltip-radius  smalltootip"}  >
              <Popover.Body className={isDark ? "tooltipdark smalltooltip" : "tooltiplight smalltooltip"} >
                <ul className='d-inline'><li><button className=" smallnavbutticon" onClick={toggleExportModalOpen}>
                  <img src={isDark ? "./svg/file.svg" : "./svg/darkfile.svg"} height='40' width='40' />Export
                </button></li>
                  <Exportmodal exportModal={exportModal} toggleExportModalClose={toggleExportModalClose} isDark={isDark} />
                  <li> <button onClick={toggleShareModalOpen} className='share smallnavbutticon' >
                    <img src="./svg/share.png" height='40' width='40' />Share
                  </button></li>
                  <Sharemodal shareModal={shareModal}  toggleShareModalClose={toggleShareModalClose} isDark={isDark} setEdit={setEdit}/>
                </ul>




              </Popover.Body>
            </Popover>
          }>
          <button className='navresicon iconnavsmall'>
            <img src={isDark ? "./svg/navdropicondark.svg" : "./svg/navdropicon.svg"}  className='buttonicon iconnavsmall' />
          </button>

        </OverlayTrigger></li>

      </ul>
    </nav>



  </>)
}

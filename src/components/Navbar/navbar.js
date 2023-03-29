import React from 'react';
import "../../scss/navbar.scss"
import { Icon } from '@iconify/react';
import Loginform from '../../js/loginform';
import { useState, useRef, useContext } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import Passwordform from '../../js/passwordform';
import { LoginContext } from '../../js/Logincontext';
var FileSaver = require('file-saver');
import { IsAuto } from '../../js/Isauto';
import { updateContext } from '../../js/updatecontext';
import { AnonContext } from '../../js/AnonContext';
import {Responsivenavbar} from './responsivenavbar';

export function Navbar({ toggleTheme, isDark, text, toggleViewNotes, setText }) {
  let r = /:\/\/(.[^/]+)/;
  const urlapp = window.location.href
  const domain = urlapp.match(r)[1]
  const { anonContext, toggleAnonUser, setEditable, editable } = useContext(AnonContext)
  const { updateNote, setUpdateNote, noteId, copyFunction } = useContext(updateContext)
  const { loginUser, setLoginUser, toggleUserLogin, loginToken } = useContext(LoginContext)
  const { theme } = useContext(IsAuto)

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
  const setEdit = (string) => { setEditable(string) }

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
    else {
      if (!updateNote) {
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

        }).then((response) => {
          noteId.current = idsave.current
          setUpdateNote(true)
        });
      }
      else {
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
    }
  }


  //Login Modal hook state 
  const [showLoginModal, setShowLoginModal] = useState(false);

  const LoginModalClose = () => setShowLoginModal(false);
  const LoginModalOpen = () => { setShowLoginModal(true) };

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

  return (<>
    <nav className='d-md-none d-lg-flex d-sm-none  d-xs-none flex-wrap-wrap' >
      <ul >
        {/* Note Icon */}
        <li>

          <button className='iconnav' onClick={toggleSaveFile} id="save" ><img src="./svg/noteicon.svg" data-bs-custom-class='navbar-tooltip' className='iconnav' color="#7496b8" width="20" height="20" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-container='true' data-bs-placement="bottom" title="Saving Note" /></button>
        </li>
        {/* File Open / List View */}
        <li><button className={loginUser ? "iconnav change" : "d-none"} onClick={toggleViewNotes}><img src='/svg/openfiles.svg' color="#7496b8" width="20" height="20" data-bs-custom-class='navbar-tooltip' data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-container='true' data-bs-placement="bottom" title="Open Note"></img></button>
          <label className={loginUser ? "d-none" : "iconnav change"}><input className="files iconnav" type="file" onChange={showFile} /><img src="./svg/openfiles.svg" className='iconnav' color="#7496b8" width="20" height="20" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-container='true' data-bs-placement="bottom" title="Open Note" /></label> </li>

        <Passwordform showPassword={showPassword} handleClosePass={handleClosePass} isDark={isDark} />

        {/* Login and Logout*/}
        <li><button className={loginUser ? "d-none" : "iconnav"} onClick={LoginModalOpen} data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-container='true' data-bs-placement="bottom" title="Login"><img src="./svg/person.svg" width="20" height="20" className='iconnav'
        /></button>
          <button className={loginUser ? "iconnav" : "d-none"} onClick={LogOut} ><img src="./svg/logout.svg" width="20" height="20" className='iconnav' data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-container='true' data-bs-placement="bottom" title="LogOut" /></button>
        </li>
        <Loginform showLoginModal={showLoginModal} LoginModalClose={LoginModalClose} isDark={isDark} toggleViewNotes={toggleViewNotes} LoginModalOpen={LoginModalOpen} />
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
                  <form className={isDark ? "tooltipdark shareform" : "tooltiplight shareform"} ><input type="radio" name="sharerad" id="view only" onClick={() => setEdit('No')} /><p className='viewbutt'>View Only</p>
                    <input type="radio" name="sharerad" id="editnote" onClick={() => setEdit('yes')} /><p className='share-edit-butt'> Can Edit</p>
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
    <Responsivenavbar toggleTheme={toggleTheme} isDark={theme === 'dark'} text={text} toggleViewNotes={toggleViewNotes} setText={setText} />

  </>)
}

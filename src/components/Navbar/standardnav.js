import React from 'react'
import { AnonContext } from '../../js/AnonContext'
import { IsAuto } from '../../js/Isauto'
import { updateContext } from '../../js/updatecontext'
import "./styles.scss"
import { Icon } from '@iconify/react';
import Loginform from '../LoginForm';
import { useState, useRef, useContext } from 'react';
import Passwordform from '../PasswordForm';
import { OverlayTrigger, Popover } from 'react-bootstrap';

export default function StandardNav({ toggleSaveFile, showFile,
  showPassword,
  isDark,
  toggleTheme,
  handleClosePass,
  handleShowPass,
  showLoginModal,
  LoginModalOpen,
  LoginModalClose,
  LogOut,
  toggleViewNotes,
  loginUser,
  setEdit,
  theme,
  copyFunction, noteId }) {


  let r = /:\/\/(.[^/]+)/;
  const urlapp = window.location.href
  const domain = urlapp.match(r)[1]
  return (
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
  )
}

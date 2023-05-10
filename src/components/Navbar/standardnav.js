import React, { useContext } from 'react'
import "./styles.scss"
import { Icon } from '@iconify/react';
import Loginform from '../LoginForm';
import Passwordform from '../PasswordForm';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { AnonContext } from '../../js/AnonContext';

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
  text,
  toggleViewNotes,
  loginUser,
  setEdit,
  theme,
  copyFunction, noteId, pdf,
  wordFile,
  viewNotes }) {


  let r = /:\/\/(.[^/]+)/;
  const urlapp = window.location.href
  const domain = urlapp.match(r)[1]
  const { editableNote } = useContext(AnonContext)
    


  return (<>
    <nav className='d-md-none d-xs-none d-lg-flex d-sm-none d-none standarnav d-xs-none flex-wrap-wrap' >
      <ul className={viewNotes ? 'd-none' : ''}>
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
      <ul className={viewNotes ? "" : "d-none"} >
        <li><button className='iconnav backlogo'><img src="./svg/backlogo.svg" onClick={toggleViewNotes}></img></button></li>
      </ul>
      <div className='align-self-center justify-self-center main-header'>
        <span className='W-head main-header'>W</span>ordpad
      </div>
      <ul className="justify-content-end nav-right-margin"><li>
        <button onClick={toggleTheme} className="buttonicon">{theme === 'dark' ? <img src={"./svg/autotheme.svg"} className='buttonicon moon' /> : theme === 'light' ?
          <Icon className='moon' icon="ph:moon-bold" color="black" /> : <img src={"./svg/light.svg"} className='buttonicon moon' />}
        </button></li>
        {viewNotes ? " " : <>
          <li >
            <OverlayTrigger
              trigger="focus"
              key={'bottom'}
              placement={'bottom-end'}
              overlay={
                <Popover id={`popover-positioned-${'bottom'}`} className={isDark ? "tooltipdark tooltip-radius" : "tooltip-radius tooltiplight"}  >
                  <Popover.Body className={isDark ? "tooltipdark" : "tooltiplight"} >
                    <div className='exporttool' >
                      <div className='export-tooltip-div'>
                        <input type="radio" name="export" value="pdf" onChange={pdf} /><label className='tenpad'>PDF</label>
                      </div>

                      <div className='export-tooltip-div1'>
                        <input type="radio" name="export" value="word" onChange={wordFile} />
                        <label className='sevenpad'>Word</label>
                      </div>
                    </div>
                  </Popover.Body>
                </Popover>
              }>{text.length > 0 ?
                <button className='export'>
                  <img src={isDark ? "./svg/darkfile.svg" : "./svg/file.svg"} className='buttonicon' />Export
                </button> : <></>}



            </OverlayTrigger>


          </li>
        </>}
        {viewNotes ? " " : editableNote ? <>
          <li className='m-0'>
            {/* Share Tooltip main nav */}
            <OverlayTrigger
              trigger={['click']}
              key={'bottom'}
              placement={'bottom-end'}
              overlay={
                <Popover id={`popover-positioned-${'bottom'}`} className={isDark ? "tooltipdark sharetool tooltip-radius" : "tooltiplight sharetool tooltip-radius"}>
                  <Popover.Body>
                    <div className={isDark ? "tooltipdark linktool" : "tooltiplight linktool"}><img src="./svg/tooltiplink.svg"></img><p id="urllink">{domain}?id={noteId.current}</p></div>
                    <form className={isDark ? "tooltipdark shareform" : "tooltiplight shareform"} ><input type="radio" name="sharerad" id="view only" onClick={() => setEdit('No')} /><p className='viewbutt'>View Only</p>
                      <input type="radio" name="sharerad" id="editnote" onClick={() => setEdit('yes')} checked /><p className='share-edit-butt'> Can Edit</p>
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
        </> : ''}
      </ul>

    </nav>
    <hr></hr>
  </>

  )
}

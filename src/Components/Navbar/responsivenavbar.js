import React, { useContext } from 'react'

import "./styles.scss"
import { Icon } from '@iconify/react';
import Loginform from '../LoginForm';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import Passwordform from '../PasswordForm';
import Exportmodal from '../ExportModal';
import Sharemodal from '../ShareModal';

import { IsAuto } from '../../js/Isauto';
import { AnonContext } from '../../js/AnonContext';

export function ResponsiveNavbar({ toggleTheme, toggleSaveFile, loginUser, showFile, LoginModalOpen, LogOut,
  toggleExportModalOpen, toggleExportModalClose, exportModal, shareModal, toggleShareModalOpen,
  toggleShareModalClose, isDark, text, toggleViewNotes, showPassword, handleClosePass, showLoginModal, LoginModalClose, pdf, wordFile, viewNotes }) {

  const { theme } = useContext(IsAuto)
  const { setEdit, editable } = useContext(AnonContext)


  return (<>    {/* Responsive Navbar */}
    <nav className='d-md-flex d-xs-flex d-lg-none d-sm-flex responsive responsive-nav-height'  >
      <ul className={viewNotes ? 'd-none' : ""}>
        {/* Note Icon */}
        <li>

          <button className='iconnavsmall' onClick={toggleSaveFile} id="save" ><img src="./svg/noteicon.svg" className='iconnavsmall' color="#7496b8" width="50" height="50" /></button>
        </li>
        {/* Password */}
        <li><button className={loginUser ? "iconnavsmall change" : "d-none"} onClick={toggleViewNotes}><img src='../svg/openfiles.svg' className="iconnavsmall" color="#7496b8" width="20" height="20"></img></button>
          <label className={loginUser ? "d-none" : "iconnavsmall change"}><input className="files iconnavsmall" type="file" onChange={showFile} /><img src="./svg/openfiles.svg" className='iconnavsmall' color="#7496b8" width="20" height="20" /></label> </li>

        <Passwordform showPassword={showPassword} handleClosePass={handleClosePass} isDark={isDark} />

        {/* Login */}
        <li><button className={loginUser ? "d-none" : "iconnavsmall"} onClick={LoginModalOpen} data-bs-toggle="modal" data-bs-target="#exampleModal"><img src="./svg/person.svg" width="20" height="20" className='iconnavsmall'
        /></button>
          <button className={loginUser ? "iconnavsmall" : "d-none"} onClick={LogOut} ><img src="/svg/logout.svg" width="20" height="20" className='iconnavsmall'
          /></button>

        </li>
        <Loginform showLoginModal={showLoginModal} LoginModalClose={LoginModalClose} isDark={isDark} toggleViewNotes={toggleViewNotes} />
      </ul>
      <ul className={viewNotes ? "" : "d-none"} >
        <li><button ><img src="./svg/backlogo.svg" className='iconnavsmall' onClick={toggleViewNotes}></img></button></li>
      </ul>

      <div className='align-self-center justify-self-center main-header font50' >
        <span className='W-head main-header font60' >W</span>ordpad
      </div>
      <ul className="justify-content-end mr2"><li>
        <button onClick={toggleTheme} className=" iconnavsmall d-block">{theme === 'dark' ? <img src={"./svg/autotheme.svg"} className=' moon iconnavsmall' /> : theme === 'light' ? <Icon className='moon iconnavsmall' icon="ph:moon-bold" color="black" /> : <img src={"./svg/light.svg"} className='buttonicon iconnavsmall' />}</button></li>
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
                  <Exportmodal exportModal={exportModal} toggleExportModalClose={toggleExportModalClose} isDark={isDark} pdf={pdf} wordFile={wordFile} />
                  {viewNotes ? " " : <><li> <button onClick={toggleShareModalOpen} className='share smallnavbutticon' ><img src="./svg/share.png" height='40' width='40' />Share</button></li><Sharemodal shareModal={shareModal} toggleShareModalClose={toggleShareModalClose} isDark={isDark} setEdit={setEdit} /> </>}
                </ul>




              </Popover.Body>
            </Popover>
          }>
          <button className='navresicon iconnavsmall'>
            <img src={isDark ? "./svg/navdropicondark.svg" : "./svg/navdropicon.svg"} className='buttonicon iconnavsmall' />
          </button>

        </OverlayTrigger></li>

      </ul>
    </nav>

  </>

  )
}


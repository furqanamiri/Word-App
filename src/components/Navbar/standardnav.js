import React, { useContext, useState } from 'react'
import "./styles.scss"
import { Icon } from '@iconify/react';
import Loginform from '../LoginForm';
import Passwordform from '../PasswordForm';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import Overlay from 'react-bootstrap/Overlay';
import { AnonContext } from '../../js/AnonContext';
import { LoginContext } from '../../js/Logincontext';
import { updateContext } from '../../js/updatecontext';
import { Link } from 'react-router-dom';

export default function StandardNav({
  toggleSaveFile,
  showFile,
  showPassword,
  isDark,
  toggleTheme,
  handleClosePass,
  handleShowPass,
  showLoginModal,
  LoginModalOpen,
  LoginModalClose,
  LogOut,
  textDownload,
  text,
  toggleViewNotes,
  loginUser,
  setEdit,
  theme,
  copyFunction, noteId, pdf,
  wordFile,
  viewNotes,
  fileType,
  changeLink,
  checked,
  editToken }) {
  const [exportTool, setExportTool] = useState(false)
  const [shareTool, setShareTool] = useState(false)
  const { loginToken } = useContext(LoginContext)
  const [auto, setAuto] = useState(false)
  let r = /:\/\/(.[^/]+)/;
  const urlapp = window.location.href
  const domain = urlapp.match(r)[1]
  const { editableNote } = useContext(AnonContext)
  const changeAuto = () => {
    setAuto(!auto)
    toggleTheme('auto')


  }

  const changeDay = () => {
    setAuto(prev => prev = false)
    toggleTheme('light')
  }
  const changeNight = () => {
    setAuto(prev => prev = false)
    toggleTheme('dark')
  }



  return (<>
    <nav className='d-md-none d-xs-none d-lg-flex d-sm-none d-none standarnav d-xs-none flex-wrap-wrap' >
      <ul className={viewNotes ? 'd-none' : ''}>
        {/* Note Icon */}
        <li>

          <button className='iconnav' onClick={() => { textDownload("text") }} id="save" ><img src="./svg/noteicon.svg" data-bs-custom-class='navbar-tooltip' className='iconnav' color="#7496b8" width="20" height="20" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-container='true' data-bs-placement="bottom" title="Saving Note" /></button>
        </li>
        {/* File Open / List View */}
        <li><button className={loginUser ? "iconnav change" : "d-none"} onClick={toggleViewNotes}><img src='/svg/openfiles.svg' color="#7496b8" width="20" height="20" data-bs-custom-class='navbar-tooltip' data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-container='true' data-bs-placement="bottom" title="Open Note"></img></button>
          <label className={loginUser ? "d-none" : "iconnav change"}><input className="files iconnav" accept=".txt" type="file" onChange={showFile} /><img src="./svg/openfiles.svg" className='iconnav' color="#7496b8" width="20" height="20" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-container='true' data-bs-placement="bottom" title="Open Note" /></label> </li>



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
        <a href="/"><span className='W-head main-header'>W</span>ordpad</a>
      </div>
      <ul className="justify-content-end nav-right-margin">
        {auto ? <li>
          {isDark ?
            <img src={"./svg/nonautonight.svg"} className='themeIcon moon' onClick={changeDay} /> : <img src={"./svg/nonautoday.svg"} className='themeIcon moon' onClick={changeNight} />}
        </li> :
          <li>
            {isDark ?
              <img src={"./svg/light.svg"} onClick={() => { toggleTheme("light") }} className='themeIcon moon' /> : <img src={"./svg/night.svg"} className='themeIcon moon' onClick={() => { toggleTheme("dark") }} />}
          </li>}
        {auto ? <><li>{isDark ? <img src={"./svg/autonight.svg"} onClick={changeAuto} className='buttonicon moon' /> : <img src={"./svg/autoday.svg"} className='buttonicon moon' onClick={changeAuto} />} </li></> : <> <li><img src={"./svg/autotheme.svg"} className='buttonicon moon' onClick={changeAuto} /></li></>}



        {viewNotes ? " " : <>
          <li >
            <OverlayTrigger
              show={exportTool}
              trigger={"focus"}
              key={'bottom'}
              rootClose={true}
              onHide={() => {
                setExportTool(false)
              }}
              onToggle={() => {
                setExportTool(false)
              }}

              placement={'bottom-end'}

              overlay={
                <Popover id={`popover-positioned-${'bottom'}`} className={isDark ? "boxs tooltipdark tooltip-radius" : "tooltip-radius tooltiplight"}  >
                  <Popover.Body className={isDark ? "tooltipdark boxs" : "tooltiplight boxs"} >
                    <div className='exporttool' >
                      <div className='export-tooltip-div'>
                        <input type="radio" name="export" value="pdf" onChange={()=> {textDownload('pdf')}} /><label className='tenpad'>PDF</label>
                      </div>

                      <div className='export-tooltip-div1'>
                        <input type="radio" name="export" value="word" onChange={()=> {textDownload('word')}} />
                        <label className='sevenpad'>Word</label>
                      </div>
                    </div>
                  </Popover.Body>
                </Popover>
              }>


              {text.length > 0 ?
                <button className='export' onClick={() => {
                  setExportTool(!exportTool)

                }}>
                  <img src={isDark ? "./svg/file.svg" : "./svg/darkfile.svg"} className='buttonicon' /> Export
                </button> : <></>}

            </OverlayTrigger>

          </li>
        </>}
        {viewNotes ? " " : editableNote ? <>
          <li className='m-0'>
            {/* Share Tooltip main nav */}
            <OverlayTrigger
              trigger={focus}
              show={shareTool}
              key={'bottom'}
              rootClose={true}
              placement={'bottom-end'}
              onHide={() => {
                setShareTool(!shareTool)
              }}
              onToggle={() => {
                setShareTool(false)
              }}
              overlay={
                <Popover id={`popover-positioned-${'bottom'}`} className={isDark ? "tooltipdark sharetool tooltip-radius" : "tooltiplight sharetool tooltip-radius"}>
                  <Popover.Body>
                    {checked ? <div className={isDark ? "tooltipdark linktool" : "tooltiplight linktool"}><img src="./svg/tooltiplink.svg"></img><p id="urllink">{domain}/notes/{noteId.current}</p></div> : <></>}
                    <form className={isDark ? "tooltipdark shareform" : "tooltiplight shareform"} ><input type="radio" name="sharerad" id="view only" onClick={() => changeLink('view')} /><p className='viewbutt'>View Only</p>
                      <input type="radio" name="sharerad" id="editnote" onClick={() => changeLink('edit')} /><p className='share-edit-butt'> Can Edit</p>
                      <button type="radio" className='share-copy-butt' onClick={copyFunction} name="sharerad"><img src="./svg/copylink.svg" className='pr1' ></img>Copy Link</button></form>
                  </Popover.Body>
                </Popover>
              }
            >
              {text.length > 0 ? <button className='share' onClick={() => { setShareTool(!shareTool) }} >
                <img className="buttonicon" src="./svg/share.png" />Share
              </button> : <></>}
            </OverlayTrigger>

          </li>
        </> : ''}
      </ul>
      <Passwordform showPassword={showPassword} handleClosePass={handleClosePass} isDark={isDark} SaveFileText={toggleSaveFile} FileType={fileType} wordFile={wordFile} pdf={pdf}/>
    </nav>
    <hr></hr>
  </>

  )
}

import moment from 'moment'
import React, { useContext, useRef, useState } from 'react'
import './styles.scss'
import { LoginContext } from '../../js/Logincontext'
import { updateContext } from '../../js/updatecontext'
export default function Viewingnotes({ isDark, list, idnote, togglerefreshchange, setNoteUpdate, toggleViewNotes, setText, date, dateChange }) {
  const { toggleUpdateNote, noteId } = useContext(updateContext)
  const textnote = useRef('false')
  const { loginToken } = useContext(LoginContext)
  // const date
  textnote.current = list
  const deletenote = () => {
    fetch(process.env.REACT_APP_DELETE, {
      method: 'DELETE', headers: {
        accept: 'application.json', 'Content-Type': 'application/json',
        token: loginToken.current,
      }, body: JSON.stringify({
        id: idnote,
      })
    }).then((response) => {
      togglerefreshchange()

    })

  }
  // document.getElementById('creatednote').addEventListener('click', () => {
  const clickFunction = () => {
    dateChange(date)
    toggleUpdateNote()
    noteId.current = idnote;
    setText(textnote.current)
    window.sessionStorage.removeItem('text')
    toggleViewNotes()
  }
  // })
  return (<>
    <div className="note col-md-5 col-lg-2 col-sm-4" id="creatednote" >
      <p className="notetext cursor" onClick={clickFunction} > {textnote.current}
      </p>
      <div className={isDark ? "darknotetext darknotesfooter" : "lightnotetext darknotesfooter"}>
        <div>
          <p className='footerpara'>Last Updated : </p>
        </div>
        <div><p className='footerpara'>{moment(date).fromNow()}</p></div>
        <button className="deletenote" onClick={deletenote}><img src='./svg/notedelete.svg'></img>
        </button>
      </div>
    </div>
  </>)
} 
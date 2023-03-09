import moment from 'moment'
import React, { useContext, useRef } from 'react'
import { useState } from 'react'
import '../scss/viewNotes.scss'
import { LoginContext } from './Logincontext'
import { updateContext } from './updatecontext'
export default function Viewingnotes({ isDark, list, idnote, togglerefreshchange, toggleViewNotes, setText }) {
  const {setUpdateNote , noteId} = useContext(updateContext)
  const textnote = useRef('false')
  const{loginToken} = useContext(LoginContext)
  console.log(idnote)
  textnote.current = list
  const deletenote = () => {
    fetch('http://18.234.225.252:4000/notes/delete', {
      method: 'DELETE', headers: {
        accept: 'application.json', 'Content-Type': 'application/json',
        token : loginToken.current,
      }, body: JSON.stringify({
        id: idnote,
      })
    }).then((response) => {
      togglerefreshchange()

    })

  }
  // document.getElementById('creatednote').addEventListener('click', () => {
  const clickFunction = () => {
   setUpdateNote(true)
    noteId.current = idnote;
    setText(textnote.current)
    window.sessionStorage.clear('text')
    toggleViewNotes()
  }
  // })
  return (<>
    <div className="note col-md-5 col-lg-2 col-sm-4" id="creatednote">
      <button onClick={clickFunction}><p className="notetext" > {textnote.current}
      </p></button>
      <div className={isDark ? "darknotetext darknotesfooter" : "lightnotetext darknotesfooter"}>
        <div>
          <p className='footerpara'>Last Updated</p>
        </div><div><p className='footerpara'>few seconds ago</p></div>
        <button className="deletenote" onClick={deletenote}><img src='./src/svg/notedelete.svg'></img></button>
      </div>
    </div>
  </>)
} 
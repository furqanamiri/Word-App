import moment from 'moment'
import React, { useContext, useRef } from 'react'
import './styles.scss'
import { LoginContext } from '../../js/Logincontext'
import { updateContext } from '../../js/updatecontext'
export default function Viewingnotes({ isDark, list, idnote, togglerefreshchange, setNoteUpdate, toggleViewNotes, setText,  }) {
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
  
    setUpdateNote(true)

   toggleUpdateNote()
    noteId.current = idnote;
    setText(textnote.current)
    window.sessionStorage.removeItem('text')
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
        <button className="deletenote" onClick={deletenote}><img src='./svg/notedelete.svg'></img></button>
      </div>
    </div>
  </>)
} 
import React, { useEffect, useRef, useState, useContext } from "react";
import '../scss/viewNotes.scss';
import moment from 'moment';
import Viewingnotes from "./viewingnotes";
import { LoginContext } from "./Logincontext";
import { updateContext } from "./updatecontext";
// import Viewingnotes from "./viewingnotes";
import Footer from './footer';

export function Viewnotes({ isDark, toggleViewNotes, setText }) {
  const { loginUser, setLoginUser, toggleUserLogin ,loginToken} = useContext(LoginContext)
  const textnote = useRef('')
  textnote.current = 'Click to create a new note'
  const [dateUpd, setDateUpd] = useState(moment())
  const {setUpdateNote} = useContext(updateContext)
  // word count
  const [refreshstate, setrefreshstate] = useState(false)
  const togglerefreshchange = () => {
    setrefreshstate(!refreshstate);
  }
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const [id, setId] = useState([])
  const spaces = textnote.current.match(/\s+/g);
  let count = 0;
  const addNotes = () => {
    fetch(process.env.REACT_APP_NOTES, {
      method: 'GET', headers: {
        accept: 'application.json', 'Content-Type': 'application/json',
        token: loginToken.current,                                                                                                                                                                                                                                    
      }
    }).then((response) => response.json()).then((response) => {
   
      const temp = response.map(user => (user.content))
      const tempId = response.map(idtemp => (idtemp.id))
      setList(temp);
      setId(tempId)
      setUsers(response)


    })
  
  }
  useEffect(() => {
    // update word count
    let wordCount = 0;
    setWordCount(wordCount = spaces ? spaces.length : 0)

    setWordCount(wordCount);

    // update char count (including whitespaces)
    setCharCount
      ((prev) => textnote.length);
  }, [textnote]);
  useEffect(() => { addNotes() }, [refreshstate])
  function countWords() {

    var spaces = textnote;
    // var spaces = self.value;
 
    // var words = spaces ? spaces.length : 0;
  }


  // const notediv = document.getElementById("newnote")
  // notediv.addEventListener('click', () => {

  const clickFunctionnew = () => {
    setText('')
    setUpdateNote(false)
    window.sessionStorage.clear('text')
    toggleViewNotes()
  }
  // })
  return (
    <>
      <div className='fluid-container mainnotes' id='mainnotes'>
        <div className="row" id='notesadd'>
          <div className="note col-md-5 col-lg-2 col-sm-4" id="newnote" style={{minHeight : '201px'}}>
            <button onClick={clickFunctionnew}><p className="notetext" > {textnote.current}
            </p></button>
            <div className={isDark ? "darknotetext darknotesfooter" : " lightnotetext  darknotesfooter"}>
              <div>
                <p className='footerpara'>Last Updated</p>
              </div><div><p className='footerpara'>{(moment(dateUpd).fromNow())}</p></div>

            </div>
          </div>

          {
            users.map(t => (
              <Viewingnotes isDark={isDark} list={t.content} idnote={t.id} togglerefreshchange={togglerefreshchange} toggleViewNotes={toggleViewNotes} setText={setText} />

            ))
          }
        </div>
      </div>

      <Footer dateUpd={dateUpd} charCount={charCount} wordCount={wordCount}/>
    </>
  )
}
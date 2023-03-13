import React, { useEffect, useRef, useState, useContext } from "react";
import '../scss/viewNotes.scss';
import moment from 'moment';
import Viewingnotes from "./viewingnotes";
import { LoginContext } from "./Logincontext";
import { updateContext } from "./updatecontext";
// import Viewingnotes from "./viewingnotes";


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
    fetch('http://54.146.74.146:4000/notes/list', {
      method: 'GET', headers: {
        accept: 'application.json', 'Content-Type': 'application/json',
        token: loginToken.current,                                                                                                                                                                                                                                    
      }
    }).then((response) => response.json()).then((response) => {
      console.log(response)
      const temp = response.map(user => (user.content))
      const tempId = response.map(idtemp => (idtemp.id))
      setList(temp);
      setId(tempId)
      setUsers(response)


    })
    console.log(list)
    console.log()
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
    console.log(spaces)
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
        <div className="row" id='notesadd' >
          <div className="note col-md-5 col-lg-2 col-sm-4" id="newnote" style={{minHeight: '201px'}}>
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

      {/* Footer */}
      <div className="footer d-lg-flex d-md-none d-sm-none  d-xs-none">
        <div className="d-flex footerdiv">
          <ul className="left-footer">
            <li id="wordcount">

              Words : 0
            </li>
            <li>
              Characters : 0
            </li>
          </ul><ul className='right-footer'>
            <li>
              About Us
            </li>
            <li>
              Contact Us
            </li>
          </ul>
        </div>
        <div className="d-flex footerdiv">

          <ul className='left-footer'>
            <li>  Last Updated : {







            }</li>
          </ul>


          <ul className='right-footer'>
            <li>
              Privacy Policy
            </li>
            <li>
              Terms
            </li>
          </ul>
        </div>

      </div>
      {/* Resposinve Footer */}
      <div className='footerres d-lg-none d-md-flex d-sm-flex  d-xs-flex'>
        <div className='footerresdivword'>
          <ul style={{ width: '100%', display: 'flex', justifyContent: 'center', fontSize: '2rem' }}><li >Words : 0 </li><li>Characters : 0</li></ul>
        </div>
        <div className='d-flex flex-wrap justify-content-center align-items-center w-100 '>
          <ul style={{ width: '100%', display: 'flex', justifyContent: 'center', fontSize: '2rem' }}>
            <li>  Last Updated : {

            }</li>
          </ul>
        </div>
        <div className='d-flex flex-wrap justify-content-center align-items-center w-100 '>
          <ul className='w-100 d-flex justify-content-around' style={{ fontSize: '2rem' }}>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
            <li>Terms</li>
          </ul>
        </div>
      </div>

    </>
  )
}
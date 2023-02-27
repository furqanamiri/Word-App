import React, { useEffect, useRef, useState } from "react";
import '../scss/viewNotes.scss';
import moment from 'moment';
// import Viewingnotes from "./viewingnotes";


export function Viewnotes(isDark) {
  const [textnote, setTextNote] = useState('')
  const [dateUpd, setDateUpd] = useState(moment())
  // word count
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const spaces = textnote.match(/\s+/g);
  const addNotes = () => {
    fetch('http://18.234.225.252:4000/notes/list', {
      method: 'POST', headers: {
        accept: 'application.json', 'Content-Type': 'application/json'
      }
    }).then((response) => response.json()).then((response) => {
      response.forEach(user => {
        console.log(user.title)
        textnote = user.title
        // return (<><Viewingnotes title={user.title} /> </>)

      })
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
  function countWords() {

    var spaces = textnote;
    // var spaces = self.value;
    console.log(spaces)
    // var words = spaces ? spaces.length : 0;
  }
  useEffect(() => { }, [])

  return (
    <>
      <div className='container mainnotes' id='mainnotes'>

        <div className="note col-md-5 col-lg-2 col-sm-4">
          <p className={isDark ? "lightnotetext notetext" : "darknotetext notetext"} > {textnote} Lorem Ipsum is simply dummy text of the printing and typesetting.
          </p>
          <div className={isDark ? "darknotesfooter" : "lightnotesfooter"}>
            <div>
              <p className='footerpara'>Last Updated</p>
            </div><div><p className='footerpara'>{(moment(dateUpd).fromNow())}</p></div>
            <img className="deletenote" src='./notedelete.svg'></img>
          </div>
        </div>
        {/* {addNotes()} */}
      </div>

      {/* Footer */}
      <div className="footer d-lg-flex d-md-none d-sm-none  d-xs-none">
        <div className="d-flex footerdiv">
          <ul className="left-footer">
            <li id="wordcount">

              Words : {wordCount}
            </li>
            <li>
              Characters : {charCount}
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



              (moment(dateUpd).fromNow())



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
          <ul style={{ width: '100%', display: 'flex', justifyContent: 'center', fontSize: '2rem' }}><li >Words : {wordCount} </li><li>Characters : {charCount}</li></ul>
        </div>
        <div className='d-flex flex-wrap justify-content-center align-items-center w-100 '>
          <ul style={{ width: '100%', display: 'flex', justifyContent: 'center', fontSize: '2rem' }}>
            <li>  Last Updated : {



              (moment(dateUpd).fromNow())



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
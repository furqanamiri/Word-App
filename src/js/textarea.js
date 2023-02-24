import React from 'react'
import "../scss/textarea.scss"
import { useState, useEffect } from 'react';
import '../scss/footerres.scss'
import moment from 'moment';

export default function TextArea({ text, setText }) {


  const [dateUpd, setDateUpd] = useState(moment())
  // word count
  const [wordCount, setWordCount] = useState(0);
  const [stateDate, setStateDate] = useState();


  // character count
  const [charCount, setCharCount] = useState(0);
  const changeHandler = (event) => {
    setText(event.target.value);
  }
  const [countSec, setCountSec] = useState(0)


  const timeAgo = (totalSeconds) => {


    const diff = totalSeconds
    const minute = 60 * 1000;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;
    const year = day * 365;
    switch (true) {
      case diff < minute:
        const seconds = Math.round(diff / 1000);
        return seconds + 'seconds ago';
      case diff < hour:
        return Math.round(diff / minute) + ' minutes ago';
      case diff < day:
        return Math.round(diff / hour) + ' hours ago';
      case diff < month:
        return Math.round(diff / day) + ' days ago';
      case diff < year:
        return Math.round(diff / month) + ' months ago';
      case diff > year:
        return Math.round(diff / year) + ' years ago';
      default:
        return "";
    }
  }


  setTimeout(() => {
    setStateDate(moment())
  }, 1000)




  // useEffect(() => {
  //   console.log(statetDate)
  // }, [stateDate])

  useEffect(() => {
    // array of words
    let newDate = new Date()


    setDateUpd(newDate)
    const spaces = text.match(/\s+/g);

    // update word count
    let wordCount = 0;
    setWordCount(wordCount = spaces ? spaces.length : 0)

    setWordCount(wordCount);

    // update char count (including whitespaces)
    setCharCount
      ((prev) => text.length);
  }, [text]);
  function countWords() {

    var spaces = document.getElementById('inputField').value
    // var spaces = self.value;
    console.log(spaces)
    // var words = spaces ? spaces.length : 0;
  }
  let date = document.lastModified;


  return (<>

    <textarea id="inputField" value={text}
      onChange={changeHandler} className="form-control h-lg-75  h-md-50" placeholder='New Note'></textarea>


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
  </>)
}
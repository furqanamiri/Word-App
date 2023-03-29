
import "../scss/textarea.scss"
import { useState, useEffect, useContext } from 'react';

import moment from 'moment';
import { AnonContext } from './AnonContext';
import Footer from "./footer";

export default function TextArea({ text, setText }) {


  const [dateUpd, setDateUpd] = useState(moment())
  // word count
  const [wordCount, setwordCount] = useState(0);


  const { editableNote } = useContext(AnonContext)
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
    setDateUpd(moment())
  }, 1000)


  useEffect(() => {
    if (window.sessionStorage.getItem('text')) { setText(window.sessionStorage.getItem('text')) }

  }, [])
  useEffect(() => {
    if (text === "" || text === " ") {
      window.sessionStorage.removeItem('text')
    }
    else {
      window.sessionStorage.setItem('text', text);
    }
    // array of words
    let newDate = new Date()


    setDateUpd(newDate)
    const spaces = text.match(/\s+/g);

    // update word count
    let wordCount = 0;
    setwordCount(wordCount = spaces ? spaces.length : 0)

    setwordCount(wordCount);

    // update char count (including whitespaces)
    setCharCount
      ((prev) => text.length);

  }, [text])

  // useEffect(() => {
  //   console.log(statetDate)
  // }, [stateDate])


  function countWords() {

    var spaces = text
    // var spaces = self.value;

    // var words = spaces ? spaces.length : 0;
  }
  let date = document.lastModified;


  return (<>
    {/* Fullcreen textarea */}
    <textarea id="inputField" value={text}
      onChange={changeHandler} className="form-control " placeholder='New Note' disabled={editableNote ? false : true}></textarea>
    {/* Responsive Text Areaa */}

    <Footer dateUpd={dateUpd} charCount={charCount} wordCount={wordCount} />


  </>)
}
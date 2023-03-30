
import "./styles.scss"
import { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import Footer from "../Footer";
import UseTextArea from "./useTextArea";
export default function TextArea({ text, setText }) {

  const changeHandler = (event) => {
    setText(event.target.value);
  }
  const { dateUpd, wordCount, editableNote, charCount } = UseTextArea(text, setText)




  // const [countSec, setCountSec] = useState(0)
  // const timeAgo = (totalSeconds) => {
  //   const diff = totalSeconds
  //   const minute = 60 * 1000;
  //   const hour = minute * 60;
  //   const day = hour * 24;
  //   const month = day * 30;
  //   const year = day * 365;
  //   switch (true) {
  //     case diff < minute:
  //       const seconds = Math.round(diff / 1000);
  //       return seconds + 'seconds ago';
  //     case diff < hour:
  //       return Math.round(diff / minute) + ' minutes ago';
  //     case diff < day:
  //       return Math.round(diff / hour) + ' hours ago';
  //     case diff < month:
  //       return Math.round(diff / day) + ' days ago';
  //     case diff < year:
  //       return Math.round(diff / month) + ' months ago';
  //     case diff > year:
  //       return Math.round(diff / year) + ' years ago';
  //     default:
  //       return "";
  //   }
  // }


  let date = document.lastModified;


  return (<>
    {/* Fullcreen textarea */}
    <textarea id="inputField" value={text}
      onChange={changeHandler} className="form-control " placeholder='New Note' disabled={editableNote ? false : true}></textarea>
    {/* Responsive Text Areaa */}

    <Footer dateUpd={dateUpd} charCount={charCount} wordCount={wordCount} />


  </>)
}
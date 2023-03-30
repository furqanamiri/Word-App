import React, { useContext, useEffect, useState } from 'react'
import { AnonContext } from '../../js/AnonContext';
import moment from 'moment';

export default function UseTextArea(text,setText) {
  const [dateUpd, setDateUpd] = useState(moment())
  // word count
  const [wordCount, setwordCount] = useState(0);
  const { editableNote } = useContext(AnonContext)
  // character count
  const [charCount, setCharCount] = useState(0);
  useEffect(() => {
    if (window.sessionStorage.getItem('text')) { setText(window.sessionStorage.getItem('text')) }

  }, [])
  setTimeout(() => {
    setDateUpd(moment())
  }, 1000)
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

  return ({ dateUpd, wordCount, editableNote, charCount })
}
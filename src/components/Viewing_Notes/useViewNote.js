import React, { useContext, useEffect, useRef, useState } from 'react'
import moment from 'moment';
import { LoginContext } from "../../js/Logincontext";
import { updateContext } from "../../js/updatecontext";
export const useViewNote = () => {
  const { loginToken } = useContext(LoginContext)
  const textnote = useRef('')
  textnote.current = 'Click to create a new note'
  const [dateUpd, setDateUpd] = useState(moment())
  const { toggleUpdateNote } = useContext(updateContext)
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

  return (
    { wordCount, charCount, list, users, id, dateUpd, toggleUpdateNote, togglerefreshchange, textnote }
  )
}

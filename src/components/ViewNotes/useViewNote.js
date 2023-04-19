import React, { useContext, useEffect, useRef, useState } from 'react'
import moment from 'moment';
import { LoginContext } from "../../js/Logincontext";
import { updateContext } from "../../js/updatecontext";
export const useViewNote = () => {
  const { loginToken } = useContext(LoginContext)
  const textnote = useRef('')
  textnote.current = 'Click to create a new note'
  const [dateUpd, setDateUpd] = useState(moment())
  const { toggleUpdateNote,setUpdateNote } = useContext(updateContext)
  // word count
  const [refreshstate, setrefreshstate] = useState(false)
  const togglerefreshchange = () => {
    setrefreshstate(!refreshstate);
  }

  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const [id, setId] = useState([])

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

  useEffect(() => { addNotes() }, [refreshstate])

  return (
    { list, users, id, toggleUpdateNote, togglerefreshchange, textnote, dateUpd,setUpdateNote }
  )
}

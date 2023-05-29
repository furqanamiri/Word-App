import "./styles.scss";
import { useContext, useEffect } from "react";
import { AnonContext } from "../../js/AnonContext";
import moment from "moment";

export default function TextArea({ text, setText, dateChange }) {
  const changeHandler = (event) => {
    setText(event.target.value);
    dateChange(moment())
  };
  const { editableNote } = useContext(AnonContext)

  useEffect(() => {
    if (window.localStorage.getItem('text')) { setText(window.localStorage.getItem('text')) }

  }, [])
  return (
    <>

      <textarea
        id="inputField"
        
        value={text}
        onChange={changeHandler}
        className="form-control "
        placeholder="New Note"
        disabled={editableNote ? false : true}
        maxlength="10000"
      ></textarea>
      <hr />
    </>
  );
}


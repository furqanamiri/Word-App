import "./styles.scss";
import Footer from "../Footer";
import { useContext, useEffect } from "react";
import { AnonContext } from "../../js/AnonContext";
export default function TextArea({ text, setText }) {
  const changeHandler = (event) => {
    setText(event.target.value);
  };
  const { editableNote } = useContext(AnonContext)

  useEffect(() => {
    if (window.sessionStorage.getItem('text')) { setText(window.sessionStorage.getItem('text')) }

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
      ></textarea>
      <Footer text={text} setText={setText} />
    </>
  );
}

import "./styles.scss";
import Footer from "../Footer";
import UseTextArea from "./useTextArea";
export default function TextArea({ text, setText }) {
  const changeHandler = (event) => {
    setText(event.target.value);
  };
  const { dateUpd, wordCount, editableNote, charCount } = UseTextArea(
    text,
    setText
  );

  let date = document.lastModified;

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
      <Footer dateUpd={dateUpd} charCount={charCount} wordCount={wordCount} />
    </>
  );
}

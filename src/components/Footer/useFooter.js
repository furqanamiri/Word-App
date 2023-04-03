import React, { useContext, useEffect, useState } from "react";
import moment from "moment";

export default function UseFooter({ text }) {
  const [dateUpd, setDateUpd] = useState(moment());
  let date = document.lastModified;
  // word count
  const [wordCount, setwordCount] = useState(0);  // character count
  const [charCount, setCharCount] = useState(0);
  const spaces = text.match(/\s+/g);
  setTimeout(() => {
    setDateUpd(moment());
  }, 1000);
  useEffect(() => {
    if (text === "" || text === " ") {
      window.sessionStorage.removeItem("text");
    } else {
      window.sessionStorage.setItem("text", text);
    }
    // array of words
    let newDate = new Date();
    setDateUpd(newDate);

    // update word count

    setwordCount(spaces ? spaces.length : 0);

    // update char count (including whitespaces)
    setCharCount((prev) => text.length);
  }, [text]);

  return { dateUpd, wordCount, charCount, date };
}

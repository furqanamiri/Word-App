import React, { useContext, useEffect, useState } from "react";
import moment from "moment";

export default function UseFooter({ text,dateUpd }) {
  let date = document.lastModified;
  // word count
  const [wordCount, setwordCount] = useState(0);  // character count
  const [charCount, setCharCount] = useState(0);
  const spaces = text.match(/\s+/g);
  useEffect(() => {

    // update word count

    setwordCount(spaces ? spaces.length : 0);

    // update char count (including whitespaces)
    setCharCount((prev) => text.length);
  }, [text]);

  return { wordCount, charCount, date };
}

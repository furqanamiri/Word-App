import React, { useContext, useEffect, useState } from "react";
import moment from "moment";

export default function UseFooter({ text, dateUpd }) {
  let date = document.lastModified;
  const [changingTime, setChangingTime] = useState(moment(dateUpd).fromNow())
  // word count

  const [wordCount, setwordCount] = useState(0);  // character count
  const [charCount, setCharCount] = useState(0);
  const spaces = /\s+/gi;
  useEffect(() => {
    if (text.length == 0) {
      setwordCount(0)
      setCharCount(0)
    }
    else if (text.length == 1) {
      setwordCount(1)
    }
    else {
      setwordCount(text.trim().replace(spaces, ' ').split(' ').length);
      // update char count (including whitespaces)
      setCharCount((prev) => text.length);
    }
  }, [text]);

  return { wordCount, charCount, date, changingTime };
}

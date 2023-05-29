import React from "react";
import moment from "moment";
import UseFooter from "./useFooter";
import { useState, useRef } from "react";
import "./styles.scss";
export default function Footer({ text, viewNotes, dateUpd, dateChange, changingTime }) {
  const [minutesPassed, setMinutesPassed] = useState(moment.duration(moment().diff(dateUpd)))
  setInterval(() => {
    setMinutesPassed(moment.duration(moment().diff(dateUpd)))

  }, 10000)
  const { wordCount, charCount } = UseFooter({ text, dateUpd });
  return (
    <>
      {/* Footer */}
      <div className="footer d-lg-flex d-md-none d-sm-none  d-xs-none">
        <div className="d-flex footerdiv">
          <ul className="left-footer">
            <li id="wordcount">{viewNotes ? "" : <><span className="footersubhead">Words</span> : {wordCount}</>}</li>
            <li>{viewNotes ? "" : <><span className="footersubhead">Characters</span>: {charCount}</>}</li>
          </ul>
          <ul className="right-footer ">
            <li className="endalign"><a href="/about.html" target="_blank" className="links">About Us</a></li>
            <li className="endalign"><a href="/contactUs.html" target="_blank" className="links">Contact Us</a></li>
          </ul>
        </div>
        <div className="d-flex footerdiv">
          <ul className="left-footer">
            <li>{viewNotes ? "" : <><span className="footersubhead">Last Updated </span> : {moment(dateUpd).fromNow()}<></></>}</li>
          </ul>

          <ul className="right-footer">
            <li className="endalign"><a href="/pandp.html" target="_blank" className="links">Privacy Policy</a></li>
            <li className="endalign"><a href="/tandc.html" target="_blank" className="links">Terms </a></li>
          </ul>
        </div>
        <div className="d-flex footerdiv">


          <ul className="last-footer">
            <li className="endalign"><a href="https://docs.google.com/forms/d/e/1FAIpQLSe85vaTYmG-mDllputMxFtxVpkA8tu3YpV4NqeFNsEnIK2Yxw/viewform?usp=sf_link" target="_blank" className="links">Help us Improve</a></li>

          </ul>
        </div>
      </div>
      {/* Resposinve Footer */}
      <div className="footerres d-lg-none  d-md-flex d-sm-flex  d-xs-flex">
        <div className="footerresdivword">
          <ul className="w-100 d-flex justify-content-center ulmargin responsive-footer-div">
            <li>{viewNotes ? "" : <><span className='footersubhead' >Words</span> :  {wordCount}</>}</li>
            <li>{viewNotes ? " " : <><span className="footersubhead">Characters</span> :  {charCount} </>}</li>
          </ul>
        </div>
        <div className="d-flex flex-wrap footeresdivword justify-content-center align-items-center w-100 ">
          <ul className="w-100 d-flex justify-content-around ulmargin responsive-footer-div">
            <li>{viewNotes ? "" : <><span className="footersubhead"> Last Updated</span>  : {moment(dateUpd).fromNow()}</>}</li>
          </ul>
        </div>
        <div className="d-flex flex-wrap justify-content-center align-items-center w-100 ">
          <ul className="w-100 d-flex justify-content-around ulmargin responsive-footer-div">
            <li><a href="/about.html" target="_blank" className="links">About Us</a></li>
            <li><a href="/contactUs.html" target="_blank" className="links">Contact Us</a></li>
            <li><a href="/pandp.html" target="_blank" className="links">Privacy Policy</a></li>
            <li><a href="/tandc.html" target="_blank" className="links">Terms</a></li>
          </ul>
        </div>
        <div className="d-flex flex-wrap justify-content-center align-items-center w-100 ">
          <ul className="w-100 d-flex justify-content-around ulmargin responsive-footer-div">
            <li><a href="https://docs.google.com/forms/d/e/1FAIpQLSe85vaTYmG-mDllputMxFtxVpkA8tu3YpV4NqeFNsEnIK2Yxw/viewform?usp=sf_link" target="_blank" className="links">Help us Improve</a></li>

          </ul>
        </div>
      </div>
    </>
  );
}

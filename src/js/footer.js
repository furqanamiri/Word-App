import React from 'react'
import moment from 'moment';
import { useState, useRef } from 'react';
import '../scss/footer.scss'
export default function Footer({ dateUpd, wordCount, charCount }) {







  return (

    <>
      {/* Footer */}
      <div className="footer d-lg-flex d-md-none d-sm-none  d-xs-none">
        <div className="d-flex footerdiv">
          <ul className="left-footer">
            <li id="wordcount">

              Words : {wordCount}
            </li>
            <li>
              Characters : {charCount}
            </li>
          </ul><ul className='right-footer '>
            <li className='endalign' >
              About Us
            </li>
            <li className='endalign'>
              Contact Us
            </li>
          </ul>
        </div>
        <div className="d-flex footerdiv">

          <ul className='left-footer'>
            <li >  Last Updated : {



              (moment(dateUpd).fromNow())



            }</li>
          </ul>


          <ul className='right-footer'>
            <li className='endalign'>
              Privacy Policy
            </li>
            <li className='endalign'>
              Terms
            </li>
          </ul>
        </div>

      </div>
      {/* Resposinve Footer */}
      <div className='footerres d-lg-none  d-md-flex d-sm-flex  d-xs-flex'>
        <div className='footerresdivword'>
          <ul className='w-100 d-flex justify-content-center ulmargin responsive-footer-div'><li >Words : {wordCount} </li><li>Characters : {charCount}</li></ul>
        </div>
        <div className='d-flex flex-wrap footeresdivword justify-content-center align-items-center w-100 '>
          <ul className='w-100 d-flex justify-content-around ulmargin responsive-footer-div'>
            <li>  Last Updated : {



              (moment(dateUpd).fromNow())



            }</li>
          </ul>
        </div>
        <div className='d-flex flex-wrap justify-content-center align-items-center w-100 '>
          <ul className='w-100 d-flex justify-content-around ulmargin responsive-footer-div' >
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
            <li>Terms</li>
          </ul>
        </div>
      </div>

    </>

  )
}
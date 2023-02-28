import moment from 'moment'
import React, { useRef } from 'react'
import { useState } from 'react'
import '../scss/viewNotes.scss'
export default function Viewingnotes({ isDark, list, id }) {
  const textnote = useRef('false')
  console.log(id)
  textnote.current = list
  return (<>
    <div className="note col-md-5 col-lg-2 col-sm-4">
      <p className="notetext" > {textnote.current}
      </p>
      <div className={isDark ? "lightnotetext darknotesfooter" : "darknotetext darknotefooter"}>
        <div>
          <p className='footerpara'>Last Updated</p>
        </div><div><p className='footerpara'>few seconds ago</p></div>
        <button className="deletenote"><img src='./notedelete.svg'></img></button>
      </div>
    </div>
  </>)
} 
import moment from 'moment'
import React from 'react'
import { useState } from 'react'
import '../scss/viewNotes.scss'
export default function Viewingnotes({isDark}) {
  const [textnote, setTextNote] = useState('false')
  return (<>
    <div className="note col-md-5 col-lg-2 col-sm-4">
      <p className={isDark ? "lightnotetext notetext" : "darknotetext notetext"} > {textnote} Lorem Ipsum is simply dummy text of the printing and typesetting.
      </p>
      <div className={isDark ? "darknotesfooter" : "lightnotesfooter"}>
        <div>
          <p className='footerpara'>Last Updated</p>
        </div><div><p className='footerpara'>few seconds ago</p></div>
        <img className="deletenote" src='./notedelete.svg'></img>
      </div>
    </div>
  </>)
} 
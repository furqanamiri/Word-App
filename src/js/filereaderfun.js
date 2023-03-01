import React from 'react';
import "../scss/filereaderfun.scss"
export default function FileReaderfun() {
  var text = ""
  function showFile() {


    var preview = document.getElementById('show-text');
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader()
    console.log(file)
    var textFile = /text.*/;
    reader.readAsText(file)
    // if (file.type.match(textFile)) 
    reader.onload = function (event) {
      console.log(event.target.result)
    }
    reader.onerror = function (error) {
      error.target.result
    }
    console.log(text)
  }

  return (<>
    <input className="files" type="file" onChange={showFile} />

    <div id="show-text">{text}</div>
  </>)
}


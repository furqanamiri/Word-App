var remote = require('remote'); // Load remote compnent that contains the dialog dependency
var dialog = remote.require('dialog'); // Load the dialogs component of the OS
var fs = require('fs'); // Load the File System to execute our common tasks (CRUD)
dialog.showOpenDialog((fileNames) => {
  // fileNames is an array that contains all the selected
  if (fileNames === undefined) {
    
    return;
  }

  fs.readFile(filepath, 'utf-8', (err, data) => {
    if (err) {
      alert("An error ocurred reading the file :" + err.message);
      return;
    }

    // Change how to handle the file content
    
  });
});
//renderer.js - renderer process example

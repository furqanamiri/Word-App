const electron = require('electron');
  const path = window.require('path');
  const fs = window.require('fs');

  const { saveFile, setSavingfile } = useState(false);
  const toggleSavingfile = () => {
    if (saveFile === false) {
      setSavingfile(true);
    } else {
      setSavingfile(false);
    }
  }; useEffect(() => {

    const dialog = electron.remote.dialog;

    var save = document.getElementById('save');

    save.addEventListener('click', (event) => {
      // Resolves to a Promise<Object>
      dialog.showSaveDialog({
        title: 'Select the File Path to save',
        defaultPath: path.join(__dirname, '../sample.txt'),
        // defaultPath: path.join(__dirname, '../assets/'),
        buttonLabel: 'Save',
        // Restricting the user to only Text Files.
        filters: [
          {
            name: 'Text Files',
            extensions: ['txt', 'docx']
          },],
        properties: []
      }).then(file => {
        // Stating whether dialog operation was cancelled or not.
        
        if (!file.canceled) {
        

          // Creating and Writing to the sample.txt file
          fs.writeFile(file.filePath.toString(),
            'This is a Sample File', function (err) {
              if (err) throw err;
           
            });
        }
      }).catch(err => {
       
      });
    });
  }, [saveFile]);
const { app, BrowserWindow, Menu } = require('electron');
// import MenuBuilder from './menu';
// const path = require(path)
// const { mainMenu } = require('./src/menumaker');
function createWindow() {
  const win = new BrowserWindow({
    minWidth: 1000,
    minHeight: 700,
    Width:1000,
    Height:700,
    backgroundColor: "white",
    webPrefeferences: {

      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,

    }

  })
  win.webContents.openDevTools()

  win.loadFile('./index.html');

}

// require('electron-reload')(__dirname, {
//   electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
// })

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
    // const menuBuilder = new MenuBuilder(mainWindow);
    // menuBuilder.buildMenu();

  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
var fs = require('fs'); // Load the File System to execute our common tasks (CRUD)

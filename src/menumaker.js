const { app, Menu } = require('electron')
const isMac = process.platform !== 'darwin'


module.exports.mainMenu = Menu.buildFromTemplate(template);
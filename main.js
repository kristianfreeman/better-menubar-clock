const Electron = require('electron')
const {app, Tray, Menu, BrowserWindow, ipcMain} = require('electron')
const _ = require('lodash')
const moment = require('moment')
const storage = require('electron-json-storage');

var appTray, contextMenu, browserWindow, retrievedDate

getDateFormat = function() {
  storage.get('dateFormat', function(error, data) {
    if (error) throw error;
    retrievedDate = data
  })
}
getDateFormat()

updateClock = function(tray) {
  tray.setTitle(moment().format(retrievedDate))
  _.delay(updateClock, 1000, tray)
}

app.on('ready', function(){
  browserWindow = new BrowserWindow({
    show: false,
    height: 300,
    width: 400
  })

  browserWindow.loadURL(`file://${__dirname}/static/preferences.html`)

  var menuTemplate = [
    { label: 'Preferences', click: () => { browserWindow.show() }},
    { label: 'Quit', click: app.quit }
  ]

  const icon = Electron.nativeImage.createEmpty()
  contextMenu = Menu.buildFromTemplate(menuTemplate);
  appTray = new Tray(icon)

  appTray.setContextMenu(contextMenu);

  ipcMain.on('sendDateFormat', (event, arg) => {
    storage.set('dateFormat', arg, function(error) {
      if (error) throw error;
      getDateFormat()
    })
  })

  updateClock(appTray)

  browserWindow.webContents.on('did-finish-load', function() {
    browserWindow.webContents.send('receiveDateFormat', retrievedDate)
  })
})

app.dock.hide()

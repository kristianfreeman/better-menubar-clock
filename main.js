const Electron = require('electron')
const {app, Tray, Menu, BrowserWindow} = require('electron')
const _ = require('lodash')
const moment = require('moment')

var appTray, contextMenu

var menuTemplate = [
  { label: 'Quit', click: app.quit }
]

updateClock = function(tray) {
  tray.setTitle(moment().format('Y-MM-DD hh:mm'))
  _.delay(updateClock, 1000, tray)
}

app.on('ready', function(){
  const icon = Electron.nativeImage.createEmpty()
  contextMenu = Menu.buildFromTemplate(menuTemplate);
  appTray = new Tray(icon)

  appTray.setContextMenu(contextMenu);
  updateClock(appTray)
})

app.dock.hide()

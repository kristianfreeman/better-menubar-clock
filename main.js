const Electron = require('electron')
const {app, Tray, Menu, BrowserWindow} = require('electron')
const _ = require('lodash')
const moment = require('moment')

var appTray, contextMenu

updateClock = function(tray) {
  tray.setTitle(moment().format('Y-MM-DD hh:mm'))
  _.delay(updateClock, 1000, tray)
}

app.on('ready', function(){
  const icon = Electron.nativeImage.createEmpty()
  appTray = new Tray(icon)
  updateClock(appTray)
})


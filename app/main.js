'use strict';

var _ = require('lodash');
const {
	app,
	BrowserWindow,
	crashReporter,
  Tray
} = require('electron')
var path = require('path');

// ####################################################
// ####################################################

// Report crashes to our server.
crashReporter.start({
  productName: 'YourName',
  companyName: 'YourCompany',
  submitURL: 'https://your-domain.com/url-to-submit',
  autoSubmit: true
})

var mainWindow = null;
var options = {
	"debug": false,
	"version": "1.0.0",
	"views_dir": "views",
	"root_view": "index.html"
};

options = _.extend({
	// ADDITIONAL CUSTOM SETTINGS
}, options);

// ############################################################################################
// ############################################################################################

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  if(process.platform !== 'darwin') { app.quit(); }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({
        webPreferences: {
        nodeIntegration: true
    },width: 1200, height: 600});


  mainWindow.loadURL(`file://${__dirname}/index.html`);

  if(options.debug || true ) { mainWindow.openDevTools(); }

  mainWindow.on('closed', function() { mainWindow = null; });
  mainWindow.maximize();
  mainWindow.setMenu(null);
  const appIcon = new Tray('/home/vlima/Documents/development/electron/usbdd/app/img/usb.png');
  mainWindow.setProgressBar(0.9);
  //mainWindow.setIcon(appIcon);
});

// ############################################################################################
// ############################################################################################


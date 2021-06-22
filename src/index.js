const { app, BrowserWindow } = require('electron');
const ejs = require('ejs-electron');
const path = require('path');

if (require('electron-squirrel-startup')) { 
  app.quit();
}

const createWindow = () => {
  const splashWindow = new BrowserWindow({
    width: 350,
    height: 450,
    icon: __dirname + '/views/public/favicon.ico',
    autoHideMenuBar: true,
    frame: false,
    resizable: false,
  })
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 700,
    minWidth: 450,
    minHeight: 450,
    icon: __dirname + '/views/public/favicon.ico',
    autoHideMenuBar: true,
    show: false
  });

  mainWindow.loadFile(path.join(__dirname, '/views/index.ejs'));
  splashWindow.loadFile(path.join(__dirname, '/views/splash.ejs'));
  //mainWindow.webContents.openDevTools(); 

  splashWindow.once('close', () => {
    mainWindow.show();
  })
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

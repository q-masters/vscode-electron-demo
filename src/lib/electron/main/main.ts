import "electron";
import {app, BrowserWindow, Menu, session} from "electron";
import * as path from "path";

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  const params = process.argv.slice(2);

  // and load the index.html of the app.
  mainWindow.loadURL(params[0] ?? 'https://www.google.com');

  mainWindow.webContents.once("dom-ready", () => {
    if (process.send) {
      process.send('electron:heartbeat')
    }
  })
  
  mainWindow.once('close', ($event) => {

    $event.preventDefault();

    session.defaultSession.cookies.get({})
      .then((cookies) => {
        if (process.send) {
          /** maybe we have to serialize this ones */
          process.send(cookies);
        }
      });
  })
}

const template: any[] = [{
  label: 'Edit',
  submenu: [{
    role: 'toggleDevTools'
  }]
}]

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu)

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  })
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})
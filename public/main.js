
// uses the electron module to create a browser window and the node-notifier module to create a notification
const { app, BrowserWindow,ipcMain } = require('electron')
const notifier = require('node-notifier');
const path = require('path')
//uses the pg module to connect to the database
const {Pool} = require('pg');

function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1281, height: 800, minWidth: 1281, minHeight: 800,
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        worldSafeExecuteJavaScript: true,
        sandbox: false,
        preload: path.join(__dirname + '/preload.js')
    }
  })

//IPC Main Events for one way communication between the main process and the renderer process
ipcMain.on(
    "quit",(event) => {
      console.log("quit")
        app.quit()
    }
  )
ipcMain.on(
  "error",(event,message) => {
    createNotification("Error",message,'error.jpg')
  }
)
ipcMain.on(
  "success",(event,message) => {
    createNotification("Success",message,'atom.jpg')
  }
)

//IPC Main Events using invoke to receive and send data between the main process and the renderer process
ipcMain.handle("notify",(event,message) => {
    return ConnectDB(message)
})

  //load the index.html from a url
  win.loadURL('http://localhost:3000');

  // Open the DevTools.
  win.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

//create a notification using node-notifier and the path module 
function createNotification(title, message,image){
  notifier.notify({
    title: title,
    message: message,
    icon: path.join(__dirname, image),
    sound: true, 
    wait: true
  })
}

// Connect to the database using the pg module and the Pool class and then return the result of the query
async function ConnectDB(command){
    const pool = new Pool({
        user: 'Tanker',
        host: 'db.bit.io',
        database: 'Tanker/Pro2023', // public database 
        password: 'v2_3z6rz_MLLRDVe6YibTFv3YN2FdwTb', // key from bit.io database page connect menu
        port: 5432,
        ssl: true,
    });
    
    myinfo = await pool.query(command);
    return myinfo.rows
}

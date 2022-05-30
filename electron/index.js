const { app, BrowserWindow } = require('electron')
const path = require('path')

const fetch = require('node-fetch');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

async function shutDown(){
  const url = 'http://127.0.0.1:5000/shutdown';
    const resp = await fetch(url)
    .then(data=>{
        try{
            return data
    .then(text=>
        process.stdout.write(text))
        }
        catch(err) {
            next(err)
        }
    })
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    shutDown();
  }
  app.quit()
})

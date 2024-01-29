import { app, shell, BrowserWindow, ipcMain, Tray, Event, IpcMainEvent } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'

import * as trayWindow from 'electron-tray-window'
import { Notification } from 'electron'
let isQuiting = false
function createWindow(): void {
  const icon = join(__dirname, '../../resources/logo.jpg')
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    minHeight: 980,
    minWidth: 670,
    icon: join(__dirname, '../../resources/logo.jpg'),
    title: 'zhernus',
    show: true,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
      // devTools: false
    }
  })
  mainWindow.maximize()

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  const tray = new Tray(join(__dirname, '../../resources/logo.jpg'))
  const window = new BrowserWindow({
    frame: false,
    width: 700, //optional
    height: 700,
    resizable: true,
    webPreferences: {
      // devTools: false,
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  trayWindow.setOptions({ tray: tray, window: window })
  trayWindow.setWindowSize({
    width: 200, //optional
    height: 300, //optional
    margin_x: 10, //optional
    margin_y: 10 //optional
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    window.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/tray.html`)
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
    window.loadFile(join(__dirname, '../renderer/tray.html'))
  }

  mainWindow.on('close', (event: Event) => {
    if (!isQuiting) {
      event.preventDefault()
      mainWindow.hide()
    }
  })

  ipcMain.on('showMainWindow', () => mainWindow.show())

  ipcMain.on('exit', () => {
    isQuiting = true
    window.close()
    mainWindow.close()
  })

  // handle translation changes
  ipcMain.on('lineLengthChanged', (_e: IpcMainEvent, line: string) => {
    if (parseInt(line) > 0) {
      window.webContents.send('lineLengthChanged', line)
    }
  })

  ipcMain.on('lineTranslatedChanged', (_e: IpcMainEvent, line: string) => {
    if (parseInt(line) > 0) {
      window.webContents.send('lineTranslatedChanged', line)
    }
  })

  ipcMain.on('fileNameChanged', (_e: IpcMainEvent, fileName: string) => {
    window.webContents.send('fileNameChanged', fileName)
  })

  ipcMain.on('translationcompleted', (_e: IpcMainEvent, fileName: string) => {
    const NOTIFICATION_TITLE = 'بە سەرکەوتووی ژێرنووسەکەت کرا بە کوردی'
    const NOTIFICATION_BODY = `ژێرنووسی ${fileName} کرا بە کوردی`

    const notifcation = new Notification({
      title: NOTIFICATION_TITLE,
      body: NOTIFICATION_BODY
    })
    notifcation.show()
    notifcation.on('click', () => {
      mainWindow.show()
    })
  })
}

app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

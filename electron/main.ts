import { app, BrowserWindow } from 'electron';
import path from 'node:path';
import { spawn, ChildProcess } from 'child_process';
import treeKill from 'tree-kill';
import fs from 'fs';

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist');
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public');

let win: BrowserWindow | null;
let djangoBackend: ChildProcess | null = null;

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];

function createWindow() {
  win = new BrowserWindow({
    width: 1450,
    height: 900,
    icon: path.join(process.env.VITE_PUBLIC, 'favicon.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webviewTag: true // Enable webview tag

    },
    
  });

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(process.env.DIST, 'index.html'));
  }
}

// Function to start the Django server
function startDjangoServer(): ChildProcess {
  const appPath = app.getAppPath();
  const appDirectory = path.dirname(appPath);
  const logFilePath = path.join(appDirectory, 'error.log');
  const executablePath = path.join(appDirectory,'mysite.exe');
  const djangoBackend = spawn(executablePath, ['runserver', '--noreload']);
  const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

  djangoBackend.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
    logStream.write(`[STDOUT] ${data}\n`);
  });

  djangoBackend.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
    logStream.write(`[STDERR] ${data}\n`);
  });

  djangoBackend.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    logStream.end();
  });

  logStream.write('--- Process started ---\n');

  return djangoBackend;
}
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    if (djangoBackend) {
      if (djangoBackend.pid !== undefined) {
        treeKill(djangoBackend.pid, 'SIGTERM', (err) => {
          if (err) {
            console.error('Error occurred while killing Django process tree:', err);
          }
          app.quit();
        });
      } else {
        console.error('Django process PID is undefined.');
        app.quit();
      }
    } else {
      app.quit();
    }
    win = null;
  }
});
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(() => {
  djangoBackend = startDjangoServer();
  createWindow();
});

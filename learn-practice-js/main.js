const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: false, // Security best practice
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"), // Optional if we need it later
    },
    icon: path.join(__dirname, "assets/icon.png"),
  });

  // Load the index.html of the app.
  mainWindow.loadFile("index.html");

  // Create Custom Menu
  const menuTemplate = [
    {
      label: "File",
      submenu: [
        { label: "Home", click: () => mainWindow.loadFile("index.html") },
        {
          label: "Admin Panel",
          click: () => mainWindow.loadFile("admin.html"),
        },
        { type: "separator" },
        { role: "quit" },
      ],
    },
    {
      label: "View",
      submenu: [
        { role: "reload" },
        { role: "forceReload" },
        { role: "toggleDevTools" },
        { type: "separator" },
        { role: "resetZoom" },
        { role: "zoomIn" },
        { role: "zoomOut" },
        { type: "separator" },
        { role: "togglefullscreen" },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
}

// This method will be called when Electron has finished initialization.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

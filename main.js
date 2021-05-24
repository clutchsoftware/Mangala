const electron = require("electron");
const url = require("url"); // *Hangi HTML sayfasını kullancağımızı belirler.
const path = require("path");
const { protocol } = require("electron");
const remote = electron.remote;

const { app, BrowserWindow, ipcMain } = electron;

let mainWindow, addWindow;

// *Uygulama hazır olduğunda ilk çalışan fonksiyon.
app.on("ready", () => {
  console.log("Uygulama çalıştı.");

  mainWindow = new BrowserWindow({
    webPreferences: {
      //* Frontend kısmında "Electron require() is not defined" hata çözümü.
      nodeIntegration: true,
      contextIsolation: false,
    },
    width: 1000,
    height: 543,
    resizable: true, // *Ekran boyutu imleç ile değiştirilemez.
    maximizable: false, // *Ekran maksimum hale getirilemez
    backgroundColor: "#d5ecc2",
    icon:"./assets/image/mangalaLogo.png"
  });
  mainWindow.setMenu(null);
  

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "main.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  mainWindow.on("close", () => {
    app.quit();
  });

  ipcMain.on("btnClick", (err, data) => {
    console.log(data);
  });

  ipcMain.on("key:settingScreen", () => {
    //createWİndow();
    console.log("key:settingScreen");
  });

  //Yeni pencere
  ipcMain.on("key:newWindow", () => {
    addWindow = new BrowserWindow({
      webPreferences: {
        //* Frontend kısmında "Electron require() is not defined" hata çözümü.
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
      },
      width: 430,
      height: 300,
      title: "Oyun Ayarları",
      frame: false,
      resizable: false, // *Ekran boyutu imleç ile değiştirilemez.
      maximizable: true, // *Ekran maksimum hale getirilemez
    });

    addWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, "./pages/settings.html"),
        protocol: "file:",
        slashes: true,
      })
    );
  });

  ipcMain.on("key:newWindow2", () => {
    addWindow = new BrowserWindow({
      webPreferences: {
        //* Frontend kısmında "Electron require() is not defined" hata çözümü.
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
      },
      width: 430,
      height: 300,
      title: "Oyun Ayarları",
      frame: false,
      resizable: false, // *Ekran boyutu imleç ile değiştirilemez.
      maximizable: true, // *Ekran maksimum hale getirilemez
      parent:mainWindow
    });

    addWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, "./pages/turnBackMain.html"),
        protocol: "file:",
        slashes: true,
      })
    );
  });

  //Pencereyi Kapat
  ipcMain.on("key:closeWindow", () => {
    remote.getCurrentWindow().close();
  });
});

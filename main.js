// 导入模块
const { app, BrowserWindow } = require("electron");
const path = require("node:path");

const createWindow = () => {
  // 创建窗口
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // 窗口加载内容
  win.loadFile("index.html");

  // 打开 devtools
  win.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();
  // Mac 上激活时，打开窗口
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// 监听所有窗口关闭
app.on("window-all-closed", () => {
  // 判断是否在 MacOS 运行应用
  if (process.platform !== "darwin") app.quit();
});

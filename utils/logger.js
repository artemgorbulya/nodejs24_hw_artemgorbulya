const fs = require("fs");
const path = require("path");
const { colorsEnabled, logLevel } = require("config");
const colors = require("colors/safe");
const { createLogMessage } = require("./createLogMessage");

if (!colorsEnabled) {
  colors.disable();
}

const LOGS_DIRECTORY = path.join(".", "log_files");
const INFO_LOG_FILE = path.join(LOGS_DIRECTORY, "info.log");
const ERROR_LOG_FILE = path.join(LOGS_DIRECTORY, "errors.log");

if (!fs.existsSync(LOGS_DIRECTORY)) {
  fs.mkdirSync(LOGS_DIRECTORY);
}

const infoStream = fs.createWriteStream(path.join(INFO_LOG_FILE), {
  flags: "a",
});
const errorStream = fs.createWriteStream(path.join(ERROR_LOG_FILE), {
  flags: "a",
});

function logger(moduleName) {
  const shouldLogInfo = logLevel === "info";
  const shouldLogWarn = logLevel !== "error";

  function info(...args) {
    if (shouldLogInfo) {
      console.log(colors.green(`${moduleName}:`), ...args);
    }
    const message = createLogMessage(moduleName, args);
    infoStream.write(message);
  }

  function warn(...args) {
    if (shouldLogWarn) {
      console.error(colors.yellow(`${moduleName}:`), ...args);
    }
    const message = createLogMessage(moduleName, args);
    errorStream.write(message);
  }

  function error(...args) {
    console.error(colors.red(`${moduleName}:`), ...args);
    const message = createLogMessage(moduleName, args);
    errorStream.write(message);
  }

  return { info, warn, error };
}

process.on("beforeExit", () => {
  infoStream.end();
  errorStream.end();
});

module.exports = logger;

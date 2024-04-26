const { colorsEnabled, logLevel } = require("config");
const colors = require("colors/safe");

if (!colorsEnabled) {
  colors.disable();
}

function logger(moduleName) {
  const shouldLogInfo = logLevel === "info";
  const shouldLogWarn = logLevel !== "error";

  const info = shouldLogInfo
    ? (...args) => console.log(colors.green(`${moduleName}:`), ...args)
    : () => {};
  const warn = shouldLogWarn
    ? (...args) => console.error(colors.yellow(`${moduleName}:`), ...args)
    : () => {};
  const error = (...args) =>
    console.error(colors.red(`${moduleName}:`), ...args);

  return { info, warn, error };
}

module.exports = logger;

const { colorsEnabled, logLevel } = require("config");
const { green, yellow, red } = require("colors/safe");

function logger(moduleName) {
  const shouldLogInfo = logLevel !== "warn" && logLevel !== "error";
  const shouldLogWarn = logLevel !== "error";

  const info = shouldLogInfo
    ? (...args) =>
        console.log(
          colorsEnabled ? green(`${moduleName}:`) : `${moduleName}:`,
          ...args
        )
    : () => {};
  const warn = shouldLogWarn
    ? (...args) =>
        console.error(
          colorsEnabled ? yellow(`${moduleName}:`) : `${moduleName}:`,
          ...args
        )
    : () => {};
  const error = (...args) =>
    console.error(
      colorsEnabled ? red(`${moduleName}:`) : `${moduleName}:`,
      ...args
    );

  return { info, warn, error };
}

module.exports = logger;

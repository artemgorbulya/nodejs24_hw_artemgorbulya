function logger(moduleName) {
  return {
    info: (...args) => console.log(bgBlue(`${moduleName}:`), ...args),
    warn: (...args) => console.error(bgYellow(`${moduleName}:`), ...args),
    error: (...args) => console.error(bgRed(`${moduleName}:`), ...args),
  };
}

module.exports = logger;

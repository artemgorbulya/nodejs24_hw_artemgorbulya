const dotenv = require("dotenv");
dotenv.config();

const logger = require("./utils/logger")("main module");
const fileSync = require("./file_sync");

logger.info("the program is running!");
fileSync.start();

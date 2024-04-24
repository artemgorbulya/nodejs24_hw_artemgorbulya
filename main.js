const dotenv = require("dotenv");
dotenv.config();

const logger = require("./utils/logger")("main module");

logger.info("the script is running!");
logger.warn("warn message!");
logger.error("error message!");
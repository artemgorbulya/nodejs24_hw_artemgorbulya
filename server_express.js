const express = require("express");
const morgan = require("morgan");

const fs = require("fs");
const path = require("path");

const dotenv = require("dotenv");
dotenv.config();
const { port } = require("config");

const logger = require("./utils/logger")("server express");
const { router: usersRouter } = require("./routes/users/users");

const LOGS_DIRECTORY = path.join(__dirname, "logs");

if (!fs.existsSync(LOGS_DIRECTORY)) {
  fs.mkdirSync(LOGS_DIRECTORY);
}

const accessLogStream = fs.createWriteStream(
  path.join(LOGS_DIRECTORY, "access.log"),
  { flags: "a" }
);

const app = express();

app.use(morgan(":date[iso] :method :url :status", { stream: accessLogStream }));

app.use(express.json());

app.use("/users", usersRouter);

app.listen(port, () => {
  logger.info(`Express server is running on port: [${port}]`);
});

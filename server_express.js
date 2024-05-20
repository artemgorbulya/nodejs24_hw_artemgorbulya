const express = require("express");
const morgan = require("morgan");
const rfs = require("rotating-file-stream");
const path = require("path");

const dotenv = require("dotenv");
dotenv.config();
const { port } = require("config");

const logger = require("./utils/logger")("server express");
const { router: usersRouter } = require("./routes/users/users");

const LOGS_DIRECTORY = path.join(__dirname, "logs");

const accessLogStream = rfs.createStream("access.log", {
  size: "10M",
  interval: "1d",
  compress: "gzip",
  path: LOGS_DIRECTORY,
});

const app = express();

app.use(morgan(":date[iso] :method :url :status", { stream: accessLogStream }));

app.use(express.json());

app.use("/users", usersRouter);

app.listen(port, () => {
  logger.info(`Express server is running on port: [${port}]`);
});

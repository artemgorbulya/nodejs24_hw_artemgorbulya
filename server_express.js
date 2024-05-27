const express = require("express");
const morgan = require("morgan");
const rfs = require("rotating-file-stream");
const path = require("path");
var cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();
const { port } = require("config");

const logger = require("./utils/logger")("server express");
const { usersRouter } = require("./routes/users/users");
const { pagesRouter } = require("./routes/users/pages");

const LOGS_DIRECTORY = path.join(__dirname, "logs");

const accessLogStream = rfs.createStream("access.log", {
  size: "10M",
  interval: "1d",
  compress: "gzip",
  path: LOGS_DIRECTORY,
});

const app = express();

app.set("view engine", "pug");

app.use(morgan(":date[iso] :method :url :status", { stream: accessLogStream }));

app.use(express.static("static"));

app.use(cors());

app.use(express.json());

app.use("/users", usersRouter);
app.use("/", pagesRouter);

app.listen(port, () => {
  logger.info(`Express server is running on port: [${port}]`);
});

const dotenv = require("dotenv");
dotenv.config();
const { port } = require("config");
const { createServer } = require("http");
const logger = require("./utils/logger")("server");
const { HTTP_STATUS_CODES } = require("./utils/constants");

const handleOk = (req, res) => {
  res.statusCode = HTTP_STATUS_CODES.OK;

  const message = `${req.method} ${req.url} ${res.statusCode}`;
  logger.info(message);

  res.end("healthcheck passed");
};

const handleError = (req, res) => {
  res.statusCode = HTTP_STATUS_CODES.NOT_FOUND;

  const message = `${req.method} ${req.url} ${res.statusCode}`;
  logger.warn(message);

  res.end("404 Not Found");
};

const server = createServer((req, res) => {
  if (req.url === "/healthcheck" && req.method === "GET") {
    handleOk(req, res);

    return;
  }

  handleError(req, res);
});

server.listen(port, () => {
  logger.info(`Server is listening on port ${port}`);
});

module.exports = server;

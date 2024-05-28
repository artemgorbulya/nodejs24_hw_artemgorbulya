const express = require("express");
const pagesRouter = express.Router();

const { getUserList } = require("./../../services/user_service");

pagesRouter.get("/", (_req, resp) => {
  const userList = getUserList();
  resp.render("index", { userList });
});

module.exports = {
  pagesRouter,
};

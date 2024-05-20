const router = require("express").Router();
const { HTTP_STATUS_CODES } = require("./../../utils/constants");

const {
  userBodyValidator,
  userIdValidator,
} = require("./../../middlewares/validators");

let users = [];

// Get all users
router.get("/", (req, resp) => {
  resp.json(users);
});

// Create a new user
router.post("/", userBodyValidator, (req, resp) => {
  resp.status(HTTP_STATUS_CODES.CREATED).json("user created");
});

// Get user by ID
router.get("/:userId", userIdValidator, (req, resp) => {
  resp.status(HTTP_STATUS_CODES.OK).json(`userId: ${req.params.userId}`);
});

// Delete user by ID
router.delete("/:userId", userIdValidator, (req, resp) => {
  resp.status(HTTP_STATUS_CODES.NO_CONTENT).json("user deleted");
});

module.exports = {
  router,
};

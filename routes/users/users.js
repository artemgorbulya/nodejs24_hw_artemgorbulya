const usersRouter = require("express").Router();
const { HTTP_STATUS_CODES } = require("./../../utils/constants");
const {
  getUserList,
  getUserById,
  createUser,
  deleteUserById,
} = require("./../../services/user_service");

const {
  userBodyValidator,
  userIdValidator,
} = require("./../../middlewares/validators");

// Get all users
usersRouter.get("/", (req, resp) => {
  resp.json(getUserList());
});

// Create a new user
usersRouter.post("/", userBodyValidator, (req, resp) => {
  resp.status(HTTP_STATUS_CODES.CREATED).json(createUser(req.body));
});

// Get user by ID
usersRouter.get("/:userId", userIdValidator, (req, resp) => {
  try {
    resp.status(HTTP_STATUS_CODES.OK).json(getUserById(req.params.userId));
  } catch (error) {
    resp.status(HTTP_STATUS_CODES.NOT_FOUND).json({ error: error.message });
  }
});

// Delete user by ID
usersRouter.delete("/:userId", userIdValidator, (req, resp) => {
  try {
    deleteUserById(req.params.userId);
    resp
      .status(HTTP_STATUS_CODES.NO_CONTENT)
      .json({ "deleted user": req.params.userId });
  } catch (error) {
    resp.status(HTTP_STATUS_CODES.NOT_FOUND).json({ error: error.message });
  }
});

module.exports = {
  usersRouter,
};

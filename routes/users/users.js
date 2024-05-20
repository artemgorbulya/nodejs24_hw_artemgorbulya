const router = require("express").Router();

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
  resp.status(201).json("user created");
});

// Get user by ID
router.get("/:userId", userIdValidator, (req, resp) => {
  resp.status(200).json(`userId: ${req.params.userId}`);
});

// Delete user by ID
router.delete("/:userId", userIdValidator, (req, resp) => {
  resp.status(204).json("user deleted");
});

module.exports = {
  router,
};

const yup = require("yup");
const { HTTP_STATUS_CODES } = require("./../utils/constants");

const userBodySchema = yup.object({
  username: yup.string().required().min(3).max(30),
  email: yup.string().required().email(),
});

const userIdSchema = yup.number().required().positive().integer();

const userBodyValidator = async (req, resp, next) => {
  try {
    await userBodySchema.validate(req.body);
  } catch (err) {
    resp.status(HTTP_STATUS_CODES.BAD_REQUEST).send({ error: err.message });
    return;
  }
  next();
};

const userIdValidator = async (req, resp, next) => {
  const { userId } = req.params;

  try {
    await userIdSchema.validate(userId);
  } catch (err) {
    resp.status(HTTP_STATUS_CODES.BAD_REQUEST).send({ error: err.message });
    return;
  }
  next();
};

module.exports = {
  userBodyValidator,
  userIdValidator,
};

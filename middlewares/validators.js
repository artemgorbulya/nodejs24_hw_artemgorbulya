const yup = require("yup");
const { HTTP_STATUS_CODES } = require("./../utils/constants");

const userBodySchema = yup.object({
  username: yup.string().required().min(3).max(30),
  email: yup.string().required().email(),
});

const userIdSchema = yup.number().required().positive().integer();

const userBodyValidator = async (req, resp, next) => {
  try {
    const parsedBody = await userBodySchema.validate(req.body);
    req.body = parsedBody;
  } catch (err) {
    resp.status(HTTP_STATUS_CODES.BAD_REQUEST).send({ error: err.message });
    return;
  }
  next();
};

const userIdValidator = async (req, resp, next) => {
  try {
    const parsedId = await userIdSchema.validate(req.params.userId);
    req.params.userId = parsedId;
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

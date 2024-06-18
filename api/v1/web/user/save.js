/**
 * This is Contain Save router/api.
 * @author Sandip Vaghasiya
 *
 */

const { Joi } = require("../../../../utilities/schemaValidate");
const { Router } = require("express");
const commonResolver = require("../../../../utilities/commonResolver");
const { addUser } = require("../../../../services/user/user");
const router = new Router();

/**
 * @swagger
 * /api/v1/user/add:
 *  post:
 *   tags: ["user"]
 *   summary: Save user information.
 *   description: api used for Save user information.
 *   parameters:
 *      - in: body
 *        name: lead
 *        description: Save customer information.
 *        schema:
 *         type: object
 *         properties:
 *           walletAddress:
 *             type: string
 *           amount:
 *             type: Number
 *           percentage:
 *             type: Number
 *           duration:
 *             type: string
 *           limit:
 *             type: string
 *           referralAddress:
 *             type: string
 *   responses:
 *    "200":
 *     description: success
 *    "400":
 *     description: fail
 */

const dataSchema = Joi.object({
  walletAddress: Joi.string().required().label("walletAddress"),
  amount: Joi.number().required("amount"),
  percentage: Joi.number().required("percentage"),
  duration: Joi.string().default(1).required("duration"),
  limit: Joi.string().required().label("limit"),
  referralAddress: Joi.string().required().label("referralAddress"),
});

router.post(
  "/add",
  commonResolver.bind({
    modelService: addUser,
    isRequestValidateRequired: true,
    schemaValidate: dataSchema,
  })
);

module.exports = router;

/**
 * This is Contain Save router/api.
 * @author Sandip Vaghasiya
 *
 */

const { Joi } = require("../../../../utilities/schemaValidate");
const { Router } = require("express");
const commonResolver = require("../../../../utilities/commonResolver");
const { addwithdrawalAmount } = require("../../../../services/user/user");
const router = new Router();

/**
 * @swagger
 * /api/v1/user/withdrawalAmount:
 *  post:
 *   tags: ["user"]
 *   summary: Save customer information.
 *   description: api used for Save customer information.
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
 *   responses:
 *    "200":
 *     description: success
 *    "400":
 *     description: fail
 */

const dataSchema = Joi.object({
  walletAddress: Joi.string().required().label("walletAddress"),
  amount: Joi.number().required("amount"),
});

router.post(
  "/withdrawalAmount",
  commonResolver.bind({
    modelService: addwithdrawalAmount,
    isRequestValidateRequired: true,
    schemaValidate: dataSchema,
  })
);

module.exports = router;

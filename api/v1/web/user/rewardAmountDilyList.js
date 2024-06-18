/**
 * This is Contain Save router/api.
 * @author Sandip Vaghasiya
 *
 */

const { Joi } = require("../../../../utilities/schemaValidate");
const { Router } = require("express");
const commonResolver = require("../../../../utilities/commonResolver");
const { rewardAmountDilyList } = require("../../../../services/user/user");
const router = new Router();

/**
 * @swagger
 * /api/v1/user/rewardAmountDilyList:
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
 *   responses:
 *    "200":
 *     description: success
 *    "400":
 *     description: fail
 */

const dataSchema = Joi.object({
  walletAddress: Joi.string().required().label("walletAddress"),
});


router.post(
  "/rewardAmountDilyList",
  commonResolver.bind({
    modelService: rewardAmountDilyList,
    isRequestValidateRequired: true,
    schemaValidate: dataSchema,
  })
);

module.exports = router;

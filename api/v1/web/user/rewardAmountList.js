/**
 * This is Contain Save router/api.
 * @author Sandip Vaghasiya
 *
 */

const { Joi } = require("../../../../utilities/schemaValidate");
const { Router } = require("express");
const commonResolver = require("../../../../utilities/commonResolver");
const { getrewardAmountList } = require("../../../../services/user/user");
const router = new Router();

/**
 * @swagger
 * /api/v1/user/rewardAmountList:
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


router.post(
  "/rewardAmountList",
  commonResolver.bind({
    modelService: getrewardAmountList,
  })
);

module.exports = router;

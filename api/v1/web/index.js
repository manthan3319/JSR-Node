/*
 * @file: index.js
 * @description: It's combine all routers.
 * @author: Sandip Vaghasiya
 */
const { Router } = require("express");
const app = Router();

const contractor = require("./contractor");
const user = require("./user");

/*********** Combine all Routes ********************/
app.use("/contractor", contractor);
app.use("/user", user);

module.exports = app;

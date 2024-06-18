/*
 * @file: index.js
 * @description: It's combine all contractor routers.
 * @author: Sandip Vaghasiya
 */

const save = require("./save");
const rewardAmountList = require("./rewardAmountList");
const userCountTeam = require("./userCountTeam");
const getUserInfo = require('./userGetinfo');
const withdrawalAmount = require('./withdrawalAmount');
const withdrawalDataList = require('./withdrawalDataList');
const rewardAmountListadd = require('./rewardAmountListadd');
const rewardAmountDilyList = require('./rewardAmountDilyList')
module.exports = [
    save,
    rewardAmountList,
    userCountTeam,
    getUserInfo,
    withdrawalAmount,
    withdrawalDataList,
    rewardAmountListadd,
    rewardAmountDilyList
];

/**
 * This is the indexer for contractor model
 * @author Sandip Vaghasiya
 * @since Saturday, May 28, 2022
 */

const mongoose = require("mongoose");

const stackAmountSchema = new mongoose.Schema({
    firstName: { type: String },
    walletAddress:{ type: String },
    duration:{ type: String },
    limit:{ type: String },
    referralAddress:{ type: String },
    dateTime:{ type: String },
    amount:{ type: Number },
    percentage:{ type: Number },
    lastName: { type: String },
    companyName: { type: String },
    phone: { type: String },
    email: { type: String },
    password: { type: String },
    loginToken: [
        {
            token: {
                type: String,
            },
        },
    ],
    isEnabled: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    lastLoginDate: {type: Number},
    deletedAt: Number,
    isUpdated: Boolean,
    isMailVerified: { type: Boolean, default: false },
    createdAt: { type: Date, default:  Date()},
    updatedAt: { type: Date, default:  Date()}
});
module.exports = mongoose.model("withdrawalAmount", stackAmountSchema);

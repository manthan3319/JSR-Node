var cron = require('node-cron');

const ObjectId = require("mongodb").ObjectID;
const dbService = require("../utilities/dbService");

/*************************** levelrewaramountDaily code start ***************************/
const levelrewaramountDaily = async (req) => {
    let stakingDataWhere = {
        isDeleted: false
    };

    let data = await dbService.findAllRecords("rewardamountModel", stakingDataWhere);

    for (let entry of data) {
        let addData = {
            walletAddress: entry.referralAddress,
            planeAmount: entry.planeAmount,
            rewardamount: entry.rewardamount,
            note: entry.note
        };

        let dailylevvelReward = await dbService.createManyRecords("levelrewaramountDailyModel", addData);

        // console.log("dailylevvelReward",dailylevvelReward);
    }
}



const rewardAmountDailyAdd = async (req) => {
    const planeAmounts = [25, 50, 100, 500, 1000, 5000, 10000, 50000];

    for (const amount of planeAmounts) {
        let stakingDataWhere = {
            isDeleted: false,
            planeAmount: amount
        };

        try {
            let stackData = await dbService.findAllRecords("rewardamountModel", stakingDataWhere);

            if (stackData) {
                stackData.forEach(async (dataItem) => {
                    let rewardPercentage = 0; // Default reward percentage

                    // Calculate reward percentage based on plane amount
                    if (dataItem.planeAmount === 50) {
                        rewardPercentage = 0.005; // 0.5%
                    } else if (dataItem.planeAmount === 100) {
                        rewardPercentage = 0.0075; // 0.75%
                    } else if (dataItem.planeAmount === 500) {
                        rewardPercentage = 0.01; // 1%
                    } else if (dataItem.planeAmount === 1000) {
                        rewardPercentage = 0.0125; // 1.25%
                    } else if (dataItem.planeAmount === 5000) {
                        rewardPercentage = 0.015; // 1.5%
                    } else if (dataItem.planeAmount === 10000) {
                        rewardPercentage = 0.0175; // 1.75%
                    } else if (dataItem.planeAmount === 50000) {
                        rewardPercentage = 0.02; // 2%
                    }

                    // Calculate reward amount
                    let rewardAmount2 = dataItem.planeAmount * rewardPercentage;
                    // console.log("rewardAmount",rewardAmount2);
                    let dataToAdd = {
                        walletAddress: dataItem.walletAddress,
                        planeAmount: dataItem.planeAmount,
                        rewardamount: rewardAmount2,
                        note: "Daily Rewards for " + dataItem.planeAmount
                    };


                    let dailyReward = await dbService.createManyRecords("rewarAmountDailyModel", dataToAdd);

                    // console.log('Data inserted:', dailyReward);
                });
            }
        } catch (err) {
            console.error('Error occurred:', err);
        }
    }
};

const job = cron.schedule('* * * * *', async () => {
    try {
        await rewardAmountDailyAdd();
        await levelrewaramountDaily();
        console.log('Executing job every minute');
    } catch (error) {
        console.error('Error executing job every minute:', error);
    }
});

job.start();


// const job = cron.schedule('55 23 * * *', async () => {
//     try {
//         await rewardAmountDilyAdd();
//         console.log('Executing job at 11:55 PM');
//     } catch (error) {
//         console.error('Error executing job at 11:55 PM:', error);
//     }
// });

// job.start();




/*************************** rewardAmountDilyAdd code end ***************************/


/*************************** team  code start ***************************/

// Define an async function to fetch user data
const fetchUserData = async () => {
    try {
        // Fetch user data from the database
        let where = { isDeleted: false };
        let useralldataget = await dbService.findAllRecords("userModel", where);


        // Initialize an object to store wallet addresses and their corresponding team member counts
        let teamCounts = {};

        // Iterate through the user data
        useralldataget.forEach(user => {
            const { walletAddress, referralAddress } = user;

            // Increment the team count for the wallet address
            if (!teamCounts[walletAddress]) {
                teamCounts[walletAddress] = 1;
            } else {
                teamCounts[walletAddress]++;
            }

            // Increment the team count for the referral address if it's different from the wallet address
            if (referralAddress !== walletAddress) {
                if (!teamCounts[referralAddress]) {
                    teamCounts[referralAddress] = 1;
                } else {
                    teamCounts[referralAddress]++;
                }
            }
        });

        return teamCounts;
    } catch (error) {
        console.error('Error fetching user info:', error);
        throw error; // Rethrow the error to handle it outside
    }
};


// Function to process teamCounts based on different thresholds
const processTeamCounts = async (teamCounts, threshold, amount) => {
    const walletAddresses = Object.keys(teamCounts).filter(walletAddress => teamCounts[walletAddress] === threshold);

    console.log(`Wallet addresses with teamCounts equal to ${threshold}:`, walletAddresses);

    // Find existing data for wallet addresses with teamCounts equal to threshold

    let findDataTeamAmount = await dbService.findAllRecords("TeamAmountModel", ({ walletAddress: { $in: walletAddresses } }));

    for (const walletAddress of walletAddresses) {
        // Check if existing data exists for the wallet address
        const existingData = findDataTeamAmount.find(data => data.walletAddress === walletAddress && data.amount === amount);
        if (!existingData) {
            // If no existing data, add new data
            let dataToAdd = {
                walletAddress: walletAddress,
                amount: amount
            };
            
            let result = await dbService.createManyRecords("TeamAmountModel", dataToAdd);

            console.log('New data added:', result);
        }
    }
};

// Cron job to run the fetchUserData function every 2 seconds
cron.schedule('*/10 * * * * *', async () => {
    try {
        const teamCounts = await fetchUserData();

        // Process teamCounts for different thresholds
        await processTeamCounts(teamCounts, 25, 100);
        await processTeamCounts(teamCounts, 125, 500);
        await processTeamCounts(teamCounts, 600, 2500);
        await processTeamCounts(teamCounts, 3000, 12500);
        await processTeamCounts(teamCounts, 15000, 62500);
        await processTeamCounts(teamCounts, 90000, 312500);
        await processTeamCounts(teamCounts, 425000, 1562500);
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
});












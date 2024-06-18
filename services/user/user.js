/**
 * This is for Contain function layer for contractor service.
 * @author Sandip Vaghasiya
 *
 */

const ObjectId = require("mongodb").ObjectID;
const dbService = require("../../utilities/dbService");

/*************************** addUserFn ***************************/
export const addUser = async (req) => {

    let insertUserData = {
      walletAddress: req.body.walletAddress,
      amount: req.body.amount,
      percentage: req.body.percentage,
      duration: req.body.duration,
      limit: req.body.limit,
      referralAddress: req.body.referralAddress
    }
  
    if (insertUserData) {
      let data = await dbService.createOneRecord("userModel", insertUserData);
  
    } else {
      messages("User Information Not Insert !");
    }
  
  
    // rewardcode start with rewardamountModel tabel
  
    let Raddress = {
      isDeleted: false,
      referralAddress: req.body.referralAddress
    }
  
    let rewardamountModelAlldata = await dbService.findAllRecords("userModel",Raddress);
    console.log("rewardamountModelAlldata",rewardamountModelAlldata);
    let uniqueCombinations = new Set();
  
    rewardamountModelAlldata.forEach(data => {
      let combination = `${data.referralAddress}-${data.walletAddress}`;
      uniqueCombinations.add(combination);
    });
  
    let uniqueCount = uniqueCombinations.size;
    console.log("uniqueCount", uniqueCount);
  
    if (uniqueCount === 0) {
      let Amount = req.body.amount;
      let percentage = req.body.percentage;
      let Amountpercentage = (Amount * percentage) / 100;
      let RewardAmount = Amountpercentage / 2;
  
      let rewardamountaddReferralData = {
        walletAddress: req.body.walletAddress,
        referralAddress: req.body.referralAddress,
        rewardamount: RewardAmount,
        level: uniqueCount,
        planeAmount: Amount,
      }
  
      let rewardamountadd = await dbService.createOneRecord("rewardamountModel", rewardamountaddReferralData);
      console.log("rewardamountFindReferral", rewardamountadd)
    }
    else if (uniqueCount === 1) {
      let Amount = req.body.amount;
      let percentage = req.body.percentage;
      let Amountpercentage = (Amount * percentage) / 100;
      let RewardAmount = Amountpercentage / 2;
  
      let rewardamountaddReferralData = {
        walletAddress: req.body.walletAddress,
        referralAddress: req.body.referralAddress,
        rewardamount: RewardAmount,
        level: uniqueCount,
        planeAmount: Amount,
      }
  
      let rewardamountadd = await dbService.createOneRecord("rewardamountModel", rewardamountaddReferralData);

      console.log("rewardamountFindReferral", rewardamountadd)
    }
    else if (uniqueCount === 2) {
      let Amount = req.body.amount;
      let percentage = req.body.percentage;
      let Amountpercentage = (Amount * percentage) / 100;
      let RewardAmount = (Amountpercentage * 25) / 100;
  
      let rewardamountaddReferralData = {
        walletAddress: req.body.walletAddress,
        referralAddress: req.body.referralAddress,
        rewardamount: RewardAmount,
        level: uniqueCount,
        planeAmount: Amount,
      }
  
            let rewardamountadd = await dbService.createOneRecord("rewardamountModel", rewardamountaddReferralData);
      // console.log("rewardamountFindReferral", rewardamountadd)
    }
    else if (uniqueCount === 3) {
      let Amount = req.body.amount;
      let percentage = req.body.percentage;
      let Amountpercentage = (Amount * percentage) / 100;
      let RewardAmount = (Amountpercentage / 10) / 100;
  
      let rewardamountaddReferralData = {
        walletAddress: req.body.walletAddress,
        referralAddress: req.body.referralAddress,
        rewardamount: RewardAmount,
        level: uniqueCount,
        planeAmount: Amount,
      }
  
      let rewardamountadd = await dbService.createOneRecord("rewardamountModel", rewardamountaddReferralData);
      // console.log("rewardamountFindReferral", rewardamountadd)
    }
    else if (uniqueCount >= 4 && uniqueCount <= 10) {
      let Amount = req.body.amount;
      let percentage = req.body.percentage;
      let Amountpercentage = (Amount * percentage) / 100;
      let RewardAmount = (Amountpercentage / 5) / 100;
  
      let rewardamountaddReferralData = {
        walletAddress: req.body.walletAddress,
        referralAddress: req.body.referralAddress,
        rewardamount: RewardAmount,
        level: uniqueCount,
        planeAmount: Amount,
      }
  
      let rewardamountadd = await dbService.createOneRecord("rewardamountModel", rewardamountaddReferralData);
      // console.log("rewardamountFindReferral", rewardamountadd)
    }
    else if (uniqueCount >= 11 && uniqueCount <= 15) {
      let Amount = req.body.amount;
      let percentage = req.body.percentage;
      let Amountpercentage = (Amount * percentage) / 100;
      let RewardAmount = (Amountpercentage * 40) / 100;
  
      let rewardamountaddReferralData = {
        walletAddress: req.body.walletAddress,
        referralAddress: req.body.referralAddress,
        rewardamount: RewardAmount,
        level: uniqueCount,
        planeAmount: Amount,
      }
  
      let rewardamountadd = await dbService.createOneRecord("rewardamountModel", rewardamountaddReferralData);
      // console.log("rewardamountFindReferral", rewardamountadd)
    } else if (uniqueCount >= 16 && uniqueCount <= 20) {
      let Amount = req.body.amount;
      let percentage = req.body.percentage;
      let Amountpercentage = (Amount * percentage) / 100;
      let RewardAmount = (Amountpercentage * 2.5) * 100;
  
      let rewardamountaddReferralData = {
        walletAddress: req.body.walletAddress,
        referralAddress: req.body.referralAddress,
        rewardamount: RewardAmount,
        level: uniqueCount,
        planeAmount: Amount,
      }
  
      let rewardamountadd = await dbService.createOneRecord("rewardamountModel", rewardamountaddReferralData);
      // console.log("rewardamountFindReferral", rewardamountadd)
    }
  
  
  
}

/*************************** getrewardAmountList ***************************/
export const getrewardAmountList = async (req) => {
  try {
    let userWalletAddress = req.body.walletAddress;

    let getrewardAmountData = await dbService.findAllRecords("rewardamountModel", { referralAddress: userWalletAddress });
    let getrewardamountdailydata = await dbService.findAllRecords("rewarAmountDailyModel", { walletAddress: userWalletAddress });

    const totalRewardAmount = getrewardAmountData.reduce((total, item) => total + item.rewardamount, 0);
    const totalRewardAmountdaily = getrewardamountdailydata.reduce((total, item) => total + item.rewardamount, 0);

    let LevelRewarsData = await dbService.findAllRecords("addwithdrawalAmountModel", { walletAddress: userWalletAddress });
    const totalUsrWithdrwalRewardAmount = LevelRewarsData.reduce((total, data) => total + data.amount, 0);

    const totalAmountUserWallet = totalRewardAmount + totalRewardAmountdaily;
    const totalAmountUserWallet2 = totalAmountUserWallet - totalUsrWithdrwalRewardAmount;

    // Calculate total limit count withdrawal
    let LevelRewarsAllData = await dbService.findAllRecords("rewardamountModel", { walletAddress: userWalletAddress });
    const totalPlaneAmount = LevelRewarsAllData.reduce((total, data) => total + data.planeAmount, 0);
    const totalPlaneAmountMultiplied = totalPlaneAmount * 3;
    const totalLimit = totalPlaneAmountMultiplied - totalUsrWithdrwalRewardAmount;

    // Calculate total Team Count
    let useralldataget = await dbService.findAllRecords("userModel", { isDeleted: false });

    let teamCounts = {};
    useralldataget.forEach(user => {
      const { walletAddress, referralAddress } = user;

      if (!teamCounts[walletAddress]) {
        teamCounts[walletAddress] = 1;
      } else {
        teamCounts[walletAddress]++;
      }

      if (referralAddress !== walletAddress) {
        if (!teamCounts[referralAddress]) {
          teamCounts[referralAddress] = 1;
        } else {
          teamCounts[referralAddress]++;
        }
      }
    });

    const walletAddressToCount = userWalletAddress;
    const countForWalletAddress = teamCounts[walletAddressToCount];

    // Calculate team Level count
    let TeamMainLevel = await dbService.findAllRecords("rewardamountModel", { walletAddress: userWalletAddress });
    const uniqueLevels = Array.from(new Set(TeamMainLevel.map(item => item.level)));

    // Calculate total team bonus
    let totalteambounsdata = await dbService.findAllRecords("TeamAmountModel", { walletAddress: userWalletAddress });
    const totalteambonus = totalteambounsdata.reduce((total, data) => total + data.amount, 0);

    return {
      Message: "rewardAmount Info Get Success!",
      userData: getrewardAmountData,
      totalRewardAmount: totalAmountUserWallet2,
      totalUsrWithdrwalRewardAmount: totalUsrWithdrwalRewardAmount,
      totalLimit: totalLimit,
      totalTeamcount: countForWalletAddress,
      teamLevel: uniqueLevels,
      totalteambonus: totalteambonus
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};


/*************************** rewardAmountListadd ***************************/
export const rewardAmountListadd = async (req) => {
  let data = await dbService.findAllRecords("TeamAmountModel",(req.body));

  console.log("rewardAmountListadd", rewardAmountListadd);
  if (data) {
    return {
      Message: "rewardAmountList  Info Get Sucess !",
      userData: data,
    }
  } else {
    throw new Error("ewardAmountList Difine!");
  }
}

/*************************** userGetinfoAll ***************************/
export const userCountTeam = async (req) => {
  try {
    let where = { isDeleted: false };
    let useralldataget = await dbService.findAllRecords("userModel", insertUserData);

    let teamCounts = {};

    useralldataget.forEach(user => {
      const { walletAddress, referralAddress } = user;

      if (!teamCounts[walletAddress]) {
        teamCounts[walletAddress] = 1;
      } else {
        teamCounts[walletAddress]++;
      }

      if (referralAddress !== walletAddress) {
        if (!teamCounts[referralAddress]) {
          teamCounts[referralAddress] = 1;
        } else {
          teamCounts[referralAddress]++;
        }
      }
    });

    return {
      teamCounts
    }
  } catch (error) {
    console.error('Error fetching user info:', error);
    return { error: error.message };
  }
}

/*************************** getUserInfo ***************************/
export const getUserInfo = async (req) => {

  let userWalletAddress = req.body.walletAddress;

  let getUserData = await dbService.findAllRecords("userModel", ({ walletAddress: userWalletAddress }));


  if (getUserData) {
    return {
      Message: "User Info Get Sucess !",
      userData: getUserData,
    }
  } else {
    throw new Error("User walletAddress not Difine!");
  }
}


/*************************** addwithdrawalAmount ***************************/
export const addwithdrawalAmount = async (req) => {
  let LevelRewardsDataGetWhere = {
    isDeleted: false,
    referralAddress: req.body.walletAddress,
  };


  let LevelRewarsData = await dbService.findAllRecords("rewardamountModel", LevelRewardsDataGetWhere);

  const totalUsrWithdrwalRewardAmount = LevelRewarsData.reduce((total, data) => total + data.rewardamount, 0);
  const totalPlaneAmount = LevelRewarsData.reduce((total, data) => total + data.planeAmount, 0);

  const totalPlaneAmountMultiplied = totalPlaneAmount * 3;

  let TotalAmountGetWhere = {
    isDeleted: false,
    walletAddress: req.body.walletAddress,
  };


  let TotalUserwithdrawalAmountDataGet = await dbService.findAllRecords("addwithdrawalAmountModel", TotalAmountGetWhere);

  let totalAmount = 0;
  TotalUserwithdrawalAmountDataGet.forEach(data => {
    totalAmount += data.amount;
  });


  let userWidtwalAmountWallet = totalUsrWithdrwalRewardAmount - totalAmount;
  let getrewardamountdailydata = await dbService.findAllRecords("rewarAmountDailyModel", ({ walletAddress: req.body.walletAddress }));
  
  const totalRewardAmountdaily = getrewardamountdailydata.reduce((total, item) => total + item.rewardamount, 0);

  //levelrewarddaily count
  let levelRewarddata = await dbService.findAllRecords("levelrewaramountDailyModel", ({ walletAddress: req.body.walletAddress }));
  
  const totallevelrewarddaily = levelRewarddata.reduce((total, item) => total + item.rewardamount, 0);

  let userWidtwalAmountWallet2 = userWidtwalAmountWallet + totalRewardAmountdaily + totallevelrewarddaily;
  console.log("userWidtwalAmountWallet2",userWidtwalAmountWallet2);

  if (totalPlaneAmountMultiplied >= req.body.amount) {
    if (req.body.amount >= 10) {
      if (userWidtwalAmountWallet2 >= req.body.amount) {
        let addstackamountData = {
          walletAddress: req.body.walletAddress,
          amount: req.body.amount,
        }
        if (addstackamountData) {
          let data = await dbService.createOneRecord("addwithdrawalAmountModel", addstackamountData);

          return {
            Message: "You have successfully withdrawn rewards !"
          }
        } else {
          return {
            messages: "User Stack Amount Data Not Insert !"
          }
        }
      } else {
        return {
          messages: "Please check your Amount !"
        }
      }
    } else {
      return {
        messages: "Withdraw minimum 5$!"
      }
    }
  } else {
    return {
      messages: "Please check your reward limit!"
    }
  }
};

/*************************** withdrawalDataList ***************************/
export const withdrawalDataList = async (req) => {
  let wherewithdrawaldata = {
    isDeleted: false,
    walletAddress: req.body.walletAddress
  }

  let data = await dbService.findAllRecords("addwithdrawalAmountModel", wherewithdrawaldata);

  console.log("data", data);
  if (data) {
    return {
      Message: "User All withdrawal Data List !",
      userData: data,
    }
  } else {
    throw new Error("ewardAmountList Difine!");
  }
}

/*************************** rewardAmountDilyList ***************************/
export const rewardAmountDilyList = async (req) => {
  let whererewardAmountDilyList = {
    isDeleted: false,
    walletAddress: req.body.walletAddress
  }

  console.log("whererewardAmountDilyList",whererewardAmountDilyList);

  let data = await dbService.findAllRecords("rewarAmountDailyModel", whererewardAmountDilyList);
  let dailylevvelReward = await dbService.findAllRecords("levelrewaramountDailyModel", whererewardAmountDilyList);


  console.log("dailylevvelReward",dailylevvelReward);
  if (data) {
    return {
      Message: "User All rewarAmountDaily Data List !",
      userData: data,
      dailylevvelReward:dailylevvelReward
    }
  } else {
    throw new Error("rewarAmountDaily Difine!");
  }
}


module.exports = {
  addUser,
  getrewardAmountList,
  rewardAmountListadd,
  getUserInfo,
  userCountTeam,
  addwithdrawalAmount,
  withdrawalDataList,
  rewardAmountDilyList
};

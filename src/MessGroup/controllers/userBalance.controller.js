import MessageService from "../../services/message.service.js";


const addAmountToUserBalance = async (personID, amount, messageID) => {
  // logic to add amount to user balance
  MessageService.reactToMessage(messageID, "👍");
};

const subtractAmountFromUserBalance = async (personID, amount, messageID) => {
  // logic to subtract amount from user balance
  MessageService.reactToMessage(messageID, "👍");
};


export {addAmountToUserBalance, subtractAmountFromUserBalance};
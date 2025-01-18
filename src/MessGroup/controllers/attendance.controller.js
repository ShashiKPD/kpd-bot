import MessageService from "../../services/message.service.js";

const markEveryoneAbsent = async (startingDate, noOfMeals, messageID) => {
  // logic to mark everyone absent
  MessageService.reactToMessage(messageID, "👍");
};

const markUserAbsent = async (personID, startingDate, noOfMeals, messageID) => {
  // logic to mark a specific person absent
  MessageService.reactToMessage(messageID, "👍");
};


export {markEveryoneAbsent, markUserAbsent}; 
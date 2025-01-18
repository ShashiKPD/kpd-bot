import MessageService from "../../services/message.service.js";

const contextMappingNotFound = async (messageID) => {
  // logic to handle context mapping not found
  MessageService.reactToMessage(messageID, "👍");
  console.log("User: " + MessageService.getUser(messageID));
   
}


export {contextMappingNotFound};
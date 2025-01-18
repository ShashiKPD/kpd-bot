import { isBotTagged } from "../utils/commonUtils.js";
import { isGiriMessGroupChat } from "../utils/groupChatUtils.js";
import { handleGiriMessGroupMessage } from "../groupMessageHandlers/index.js";
import MessageService from "../../services/message.service.js";

export const processGroupMessage = async (message, chat) => {
  console.log(`Group message from ${chat.name}(${chat.id.user}): ${message.body}`);

  // If not tagged, return
  if (!isBotTagged(message)) return;

  // Add message to global state
  MessageService.addMessage(message.id._serialized, message);

  if (isGiriMessGroupChat(chat)) {
    await handleGiriMessGroupMessage(message);
  }
};

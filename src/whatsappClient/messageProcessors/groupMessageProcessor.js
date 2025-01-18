import { isBotTagged } from "../utils/commonUtils.js";
import { isGiriMessGroupChat } from "../utils/groupChatUtils.js";
import { handleGiriMessGroupMessage } from "../groupMessageHandlers/index.js";

export const processGroupMessage = async (client, message, chat) => {
  console.log(`Group message from ${chat.name}(${chat.id.user}): ${message.body}`);

  // If not tagged, return
  if (!isBotTagged(message)) return;

  if (isGiriMessGroupChat(chat)) {
    await handleGiriMessGroupMessage(message);
  }
};

import { isMessGroupChat, isBotTagged } from "./utils.js";
import { handleMessGroupMessage } from "./messGroupMessageHandler.js";

export const processGroupMessage = async (client, message, chat) => {
  console.log(`Group message from ${chat.name}(${chat.id.user}): ${message.body}`);

  // If not tagged, return
  if (!isBotTagged(message)) return;

  if (message.body.toLowerCase() === "!ping") {
    await message.reply("Pong!");
  }

  if (isMessGroupChat(chat)) {
    await handleMessGroupMessage(message);
  }
};

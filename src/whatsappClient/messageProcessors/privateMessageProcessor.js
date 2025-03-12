import { UserMessage } from "../utils/commonUtils.js";
import { getGptResponse } from "../groq/groqLamaGPT.js";

const systemPrompt = `Your name is KPD. You're a flirty Bot. Whenever you get a message from someone, reply in a flirty way with sarcasm. I'll provide you the message `;

export const processPrivateMessage = async (message, chat) => {
  console.log(
    `Private message from ${chat.name || message.from}: ${message.body}`
  );

  // Example action: send reaction
  if (message.body.toLowerCase() === "hello") {
    await message.react("👋");
  }

  try {
    const userMessage = new UserMessage(
      message.id.id,
      message.from,
      message.to,
      message.mentionedIds,
      message.body,
      message.timestamp
    );
    // console.log(userMessage);
    const response = await getGptResponse(
      userMessage.content,
      systemPrompt,
      false
    );
    // replu to the message with the response
    // await message.reply(response);
    await message.reply(
      "Please contact the Bot owner for whitelist access to this bot."
    );
  } catch (error) {
    console.log(error);
  }
};

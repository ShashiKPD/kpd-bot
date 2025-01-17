import dotenv from 'dotenv';
dotenv.config();

export function isMessGroupChat(chat) {
  console.log(chat.id.user);
  
  const messGroupChatID = process.env.MESS_GROUP_CHAT_ID;

  return chat.id.user === messGroupChatID;
}

export function isBotTagged(message) {
  return message.mentionedIds.includes(process.env.BOT_ID);
}

export class UserMessage {
  constructor(messageID, from, to, mentionedIds, content, timestamp) {
    if (!messageID || !from || !to || !mentionedIds || !content || !timestamp) {
      throw new Error("All properties must be provided to create a UserMessageSchema object.");
    }
    const date = new Date(timestamp * 1000); // Multiply by 1000 to convert to milliseconds

    this.messageID = messageID; // string
    this.from = from;           // string
    this.to = to;               // string
    this.mentionedIds = mentionedIds.filter(id => id != process.env.BOT_ID); // array of strings
    this.content = content;     // string
    this.timestamp = date.toDateString(); // string
  }
}
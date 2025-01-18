import dotenv from 'dotenv';
dotenv.config();

export function isGiriMessGroupChat(chat) {
  const messGroupChatID = process.env.MESS_GROUP_CHAT_ID;
  return chat.id.user === messGroupChatID;
}

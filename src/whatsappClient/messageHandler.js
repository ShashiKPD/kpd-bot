import { processGroupMessage } from './messageProcessors/groupMessageProcessor.js';
import { processPrivateMessage } from './messageProcessors/privateMessageProcessor.js';

export const handleMessage = async (client, message) => {
  const chat = await message.getChat();
  const isGroup = chat.id.server === 'g.us';
  
  if (isGroup) {
    await processGroupMessage(client, message, chat);
  } else {
    await processPrivateMessage(client, message, chat);
  }
};

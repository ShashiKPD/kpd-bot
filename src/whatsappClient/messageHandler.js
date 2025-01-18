import { processGroupMessage } from './messageProcessors/groupMessageProcessor.js';
import { processPrivateMessage } from './messageProcessors/privateMessageProcessor.js';

export const handleMessage = async (message) => {
  const chat = await message.getChat();
  const isGroup = chat.id.server === 'g.us';
  
  if (isGroup) {
    await processGroupMessage(message, chat);
  } else {
    await processPrivateMessage(message, chat);
  }
};

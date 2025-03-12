class MessageService {
  // Private static variable to store messages
  static #messageMap = new Map();

  static addMessage(messageId, message) {
    this.#messageMap.set(messageId, message);
  }

  static getMessage(messageId) {
    return this.#messageMap.get(messageId);
  }

  static messageExists(messageId) {
    return this.#messageMap.has(messageId);
  }
  
  static getAuthor(messageId) {
    const message = this.getMessage(messageId);
    if (!message) {
      throw new Error(`Message not found. Message ID: ${messageId}`);
    }
    return message.author || message.from;
  }

  static async replyToMessage(messageId, replyText) {
    const message = this.getMessage(messageId);
    if (!message) {
      throw new Error(`Message not found. Message ID: ${messageId}`);
    }

    try {
      await message.reply(replyText);
      console.log(`Replied to message ${messageId} with: ${replyText}`);
    } catch (error) {
      console.error(`Failed to reply to message ${messageId}:`, error);
    }
  }

  static async reactToMessage(messageId, emoji) {
    const message = this.getMessage(messageId);
    if (!message) {
      throw new Error(`Message not found. Message ID: ${messageId}`);
    }

    try {
      await message.react(emoji); // Assuming react() is a method available in your message object
      console.log(`Reacted to message ${messageId} with: ${emoji}`);
    } catch (error) {
      console.error(`Failed to react to message ${messageId}:`, error);
    }
  }

  static clearMessages() {
    this.#messageMap.clear();
    console.log("All messages cleared from the map");
  }
}

export default MessageService;

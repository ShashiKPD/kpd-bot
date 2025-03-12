import { Group } from '../../models/group.model.js';

export async function createTranslateConfig(message, chat, step, groupDetails){
  switch(step){
    case 3: // Config generation starts at step 3.
      await chat.sendMessage("Please select the language in which you want the messages to be translated. \nAvailable languages: \n*en* - English \n*hi* - Hindi \n*bn* - Bengali \n\nReply with the language code.");
      break;
    case 4:
      const languageCode = message.body.toLowerCase();
      if(languageCode !== "en" && languageCode !== "hi" && languageCode !== "bn"){
        await chat.sendMessage("Invalid language code. Please reply with a valid language code.");
        return;
      }
      await Group.findOneAndUpdate({ groupId: chat.id._serialized }, { $set: { "configuration.translateTo": languageCode, "creationStatus.step": 5, "creationStatus.isComplete": true } }, { new: true });
      await chat.sendMessage("Language selected successfully. You can now start using the bot to translate messages. 😊");
      break;
  }
}
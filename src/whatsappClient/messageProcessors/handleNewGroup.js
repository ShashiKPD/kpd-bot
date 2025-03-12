import { Group } from '../../models/group.model.js';
import { tasklist } from "../../constants.js";
import { createTranslateConfig } from "../taskConfigHandlers/translate.config.handler.js";

const createTaskConfiguration = async (message, chat, step, groupDetails) => {
  switch(groupDetails.taskId){
    case 1: // Message Translation
      createTranslateConfig(message, chat, step, groupDetails)
      break;
  }  
}

export const assignTaskToGroup = async (message, chat, step, groupDetails) => {
  // Greet the group
  switch (step) {
    case 1: 
      await chat.sendMessage("Thank you for adding me to the group. \nI am *KPD_Bot🤖*. I can help you with different tasks. \nPlease assign me a task by choosing one of the tasks from the below options.")
      await chat.sendMessage(
        "Here are the tasks I can help you with: \n\n" +
        tasklist.map((task, index) => `${index + 1}. ${task}`).join("\n") + "\n\nReply with the task number to assign the task to me. For example, reply with *1* to assign the first task to me."
      );
      await Group.findOneAndUpdate({ groupId: chat.id._serialized }, { $set: { "creationStatus.step": 2 } } , { new: true });
      break;
    case 2:
      if(isNaN(message.body) || message.body < 1 || message.body > tasklist.length){
        await chat.sendMessage("Invalid task number. Please reply with a valid task number.");
        return;
      }
      const taskIndex = parseInt(message.body) - 1;
      const taskName = tasklist[taskIndex];
      await Group.findOneAndUpdate({ groupId: chat.id._serialized }, { $set: { taskId: taskIndex + 1, taskName, "creationStatus.step": 3 } }, { new: true });      
      await chat.sendMessage("Task assigned successfully.")
      await chat.sendMessage("When do you want me to reply? \n\n1. Only when the bot is tagged. \n2. Always. \n\nReply with *1* or *2*.");
      break;
    case 3:
      if(isNaN(message.body) || (message.body != 1 && message.body != 2)){
        await chat.sendMessage("Invalid input. Please reply with *1* or *2*.");
        return;
      }
      const shouldBotBeTagged = message.body == 1;
      if(shouldBotBeTagged){
        await chat.sendMessage("Okay. I will only reply when I'm tagged.");
      } else {
        await chat.sendMessage("Okay. I will reply to all messages.");
      }
      await createTaskConfiguration(message, chat, step, groupDetails);
      await Group.findOneAndUpdate({ groupId: chat.id._serialized }, { $set: { "configuration.shouldBotBeTagged": shouldBotBeTagged, "creationStatus.step": 4 } }, { new: true });
      break;
    case 4:
      await createTaskConfiguration(message, chat, step, groupDetails);
      // await chat.sendMessage("Configuration done successfully. I'm ready to help you with the assigned task. 😊");
      break;
  }
}
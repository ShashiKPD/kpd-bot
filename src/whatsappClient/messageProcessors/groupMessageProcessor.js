import { isBotTagged } from "../utils/commonUtils.js";
import { isGiriMessGroupChat } from "../utils/groupChatUtils.js";
import { handleGiriMessGroupMessage } from "../groupMessageHandlers/index.js";
import MessageService from "../../services/message.service.js";
import { groupStore, taskStore } from "../../index.js";
import { assignTaskToGroup } from "./handleNewGroup.js";
import { Group } from "../../models/group.model.js";
import { Task } from "../../models/task.model.js"
import { translateHandler } from "../../taskHandlers/translate.handler.js";

export const processGroupMessage = async (message, chat) => {
  console.log(`Group message from ${chat.name}(${chat.id.user}): ${message.body}`);

  // Add message to global state
  MessageService.addMessage(message.id._serialized, message);
  
  const groupDetails = await groupStore.get(chat.id._serialized)
  // If group is not found, create a new group
  if (!groupDetails) {
    await Group.create({ groupId: chat.id._serialized, name: chat.name, taskId: 1, taskName: "temp", groupName: chat.name });
    await assignTaskToGroup(message, chat, 1, groupDetails);
    return;
  }
  // If group creation is not complete, assign task to group
  if(!groupDetails.creationStatus.isComplete){
    await assignTaskToGroup(message, chat, groupDetails.creationStatus.step, groupDetails);
    return;
  }
  // Handle group message
  if(message.body.toLowerCase() === "/help"){
    await chat.sendMessage("I'm here to help you. 😊");
    return;
  }
  // If not tagged, return
  if (groupDetails.configuration.shouldBotBeTagged && !isBotTagged(message)) return;

  // Handle tasks
  const task = await Task.findOne({ taskId: groupDetails.taskId });
  if (!task) {
    await chat.sendMessage("Task not found. Please assign a task to me.");
    return;
  }
  switch (task.taskId) {
    case 1: // Message Translation
      await translateHandler(message.id._serialized, groupDetails.configuration.translateTo, task);
      break;
  }

  // if (isGiriMessGroupChat(chat)) {
  //   await handleGiriMessGroupMessage(message);
  // }
};

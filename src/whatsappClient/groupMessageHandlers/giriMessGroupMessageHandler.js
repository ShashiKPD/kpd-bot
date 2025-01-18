import { getGptResponse } from "../groq/groqLamaGPT.js";
import { UserMessage } from "../utils/commonUtils.js";
import { GroupNames } from "../../constants/constants.js";
import { handleGptJsonResponse } from "../../main.js";

const responseSchema = {
  messageID: "string",
  actions: [
    {
      name: "string",
      parameters: { // the numner and type of parameters will depend on the function
        startingDate: "string (format: DD-MM-YYYY)",
        noOfMeals: "int", 
        amount: "int",
        personID: "string",
      }
    }
  ]
};

const systemPrompt = `I am building a web application for mess management. From now on, I will be providing you messages from a group chat of mess members. The messages will provide context and information that you must translate into actionable functions. You basically have to understand the context and then map the correct function that would be the best fit to take action on that message. Here are the actionable functions and how to map the message context to the actionable functions:

Function                                                                                             MessageContext
markEveryoneAbsent(date: startingDate, int noOfMeals)    Context- when the message says something like everyone will go home after this date, or when someone says something like: didi(she's the cook) won't come for 3 days starting tomorrow.
markPersonAbsent(personID, date: startingDate, int noOfMeals)        Context- when someone says something like I am going home tomorrow. Or, my meal will be off from tomorrow for three days.
addAmountToUserBalance(personID, amount)               Context: when someone says something like I did grocery for mess for amount Rs.500
contextMappingNotFound(messageID)                           Context: when the message context doesn't map to any other functions.

---

Additional context: one day has 2 meals; The phone number of the user and will be used as personID; Make sure to keep in mind the timestamp of the message to calculate the dates. The date format is DD-MM-YYYY; The messageID is the unique identifier of the message that you must include in the JSON response.

---

from the next prompt, I will be providing you the message details from the user. And you must return the correct function in JSON format. The JSON object must use the schema: ${JSON.stringify(responseSchema)}. Follow this schema strictly.`;

const handleGiriMessGroupMessage = async (message) => {
  try{
    const userMessage = new UserMessage(message.id._serialized, message.author, message.to, message.mentionedIds, message.body, message.timestamp);
    const response = await getGptResponse(JSON.stringify(userMessage), systemPrompt, true);
    await message.reply(response);
    await handleGptJsonResponse(message.id._serialized, response, GroupNames.GIRI_MESS);
  }
  catch(error){
    console.log(error);
  }
}

export default handleGiriMessGroupMessage;
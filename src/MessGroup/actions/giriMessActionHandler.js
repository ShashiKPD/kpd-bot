import { markEveryoneAbsent, markUserAbsent, addAmountToUserBalance, contextMappingNotFound } from "../controllers/index.js";

const actionlist = {
  markEveryoneAbsent: {
    function: markEveryoneAbsent, //if the function name is changed, then the name should also be updated in the switch case
    params: ["startingDate", "noOfMeals"]
  },
  markPersonAbsent: {
    function: markUserAbsent,
    params: ["personID", "startingDate", "noOfMeals"]
  },
  addAmountToUserBalance: {
    function: addAmountToUserBalance,
    params: ["personID", "amount"]
  },
  contextMappingNotFound: {
    function: contextMappingNotFound,
    params: ["messageID"]
  }
};

// the below schema will be used to validate the JSON response from the GPT. This is just for reference here.
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
        messageID: "string" // this is the messageID of the message for which the context mapping was not found
      }
    }
  ]
};

const handleMessManagementActions = async (response) => {
  try {

    if(!response.actions) {
      throw new Error("Invalid JSON response");
    }

    response.actions.forEach(async (action) => {
      try {
        if (action.name in actionlist) {
          const params = actionlist[action.name].params;
          if (params.every(param => action.parameters[param])) {
            console.log(`Action: ${action.name} with parameters: ${JSON.stringify(action.parameters)}`);
  
            // calling the function with the parameters
            const functionName = actionlist[action.name].function;
            await functionName(...params.map(param => action.parameters[param]));
  
            // switch case can also be used to call the functions
            // switch(action.name){
            //   case actionlist.markEveryoneAbsent.functionName:
            //     markEveryoneAbsent(action.parameters.startingDate, action.parameters.noOfMeals);
            //     break;
            //   case actionlist.markPersonAbsent.functionName:
            //     markPersonAbsent(action.parameters.personID, action.parameters.startingDate, action.parameters.noOfMeals);
            //     break;
            //   case actionlist.addAmountToUserBalance.functionName:
            //     addAmountToUserBalance(action.parameters.personID, action.parameters.amount);
            //     break;
            //   case actionlist.contextMappingNotFound.functionName:
            //     contextMappingNotFound(action.parameters.messageID);
            //     break;
            //   default:
            //     console.error(`Action: ${action.name} not found`);
            // }
        
          } else {
            throw new Error(`Action: ${action.name} is missing parameters`);
          }
        } else {
          throw new Error(`Action: ${action.name} not found`);
        }
      } catch (error) {
        console.error(`handleMessManagementActions :: Error while processing action: ${action.name} - ${error}`);
      }
      
    });
  }
  catch(error){
    console.log(`handleMessManagementActions :: ${error}`);
  }
};

export default handleMessManagementActions;
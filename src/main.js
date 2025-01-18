import { GroupNames } from "./constants/constants.js";
import handleMessManagementActions from "./MessGroup/actions/giriMessActionHandler.js";

export const handleGptJsonResponse = async (messageId, JsonResponse, groupName) => {
  try {
    // check if the response is a valid json
    const response = JSON.parse(JsonResponse);

    if (response.messageID != messageId) {
      console.error(`Message ID mismatch in handleGptJsonResponse: ${response.messageID} vs ${messageId}`);
      return;
    }

    //handle GIRI_MESS group actions
    if(groupName === GroupNames.GIRI_MESS){
      await handleMessManagementActions(response);
    }

  } catch (error) {
    console.error(`handleGptJsonResponse :: Error while parsing GPT JSON response: ${error}`);
  }
};
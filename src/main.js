import { GroupNames } from "./constants/constants.js";
import handleMessManagementActions from "./MessGroup/actions/giriMessActionHandler.js";

export const handleGptJsonResponse = async (JsonResponse, groupName) => {
  try {
    // check if the response is a valid json
    const response = JSON.parse(JsonResponse);

    //handle GIRI_MESS group actions
    if(groupName === GroupNames.GIRI_MESS){
      await handleMessManagementActions(response);
    }

  } catch (error) {
    console.error(`Error while parsing GPT JSON response in handleGptJsonResponse: ${error}`);
  }
};
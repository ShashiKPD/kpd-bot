import { getGptResponse } from "../whatsappClient/groq/groqLamaGPT.js";
import MessageService from "../services/message.service.js";

const languages = {
  "en": "English",
  "hi": "Hindi",
  "bn": "Bengali",
  "es": "Spanish",
  "ko": "Korean",
  "fr": "French",
  "de": "German",
  "it": "Italian",
  "ar": "Arabic",
  "ja": "Japanese",
  // "ru": "Russian",
  // "pt": "Portuguese",
  // "nl": "Dutch",
  // "zh": "Chinese",
  // "tr": "Turkish",
  // "pl": "Polish",
  // "id": "Indonesian",
  // "th": "Thai",
  // "vi": "Vietnamese",
}

const responseSchema = {
  translateFrom: "string", 
  translateTo: "string",
  translatedText: "string"
};
const generateUserMessage = (text)=> {
  const userMessage = { textToTranslate: text }
  return JSON.stringify(userMessage);

}

const generateSystemPrompt = (language) =>{
  const systemPrompt = `You have to translate the text provided by the user to ${language}. You need to auto detect the language of the text. The text would likely be in english, hindi, hinglish or bengali, but can be in other languages. Structure your response in the following JSON format: ${responseSchema}.`
  return systemPrompt;
}

const translateHandler = async (messageId, langCode, taskDetails) => {
  try{
    const systemPrompt = generateSystemPrompt(languages[langCode]);
    const message = MessageService.getMessage(messageId);
    if(!languages[langCode]){
      throw new Error("Invalid language code");
    }

    const response = await getGptResponse(generateUserMessage(message.body), systemPrompt, true).then((res) => JSON.parse(res));
    await message.reply(response.translatedText);
    
  }
  catch(error){
    console.log("translateHandler error :: ", error);
  }
}

export { translateHandler };
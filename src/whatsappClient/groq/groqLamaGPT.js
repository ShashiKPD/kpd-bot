import Groq from "groq-sdk";
import dotenv from 'dotenv';
dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY});

export async function getGptResponse(userMessage, systemPrompt, isResponseJson) {
  const chatCompletion = await getGroqChatCompletion(userMessage, systemPrompt, isResponseJson);

  const response = chatCompletion.choices[0]?.message?.content || "";
  // saveToFile(response);
  return response;

}

export async function getGroqChatCompletion(userMessage, systemPrompt, isResponseJson) {
  let temperature = 0.5;
  if (isResponseJson) {
    temperature = 0;
  }

  const request = {
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: userMessage,
      }
    ],
    model: "llama-3.3-70b-versatile",
    temperature, // more the value closer to 0, more deterministic the response
    stream: false,
  }

  if (isResponseJson) {
    request.response_format = { type: "json_object" };
  }

  return groq.chat.completions.create(request);
}


// // save gpt response to file
// import { promises as fs } from 'fs';
// import { time } from "console";

// const saveToFile = async (content) => {
//   const filePath = './src/whatsappClient/groq/gptResponse.txt'; // Path to the text file

//   try {
//     await fs.writeFile(filePath, content, 'utf8');
//     // console.log(`File has been saved to ${filePath}`);
//   } catch (error) {
//     console.error('Error writing to file:', error);
//   }
// };

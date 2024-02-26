// ES6 import statements
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';
import config from '../config/config.js';
import fullStackMasterDeveloper from './promptService.js';

// Access your API key from the configuration
const genAI = new GoogleGenerativeAI(config.gemini.apiKey);

async function geminiApiResponse(userInput) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const generationConfig = {
    temperature: 0.5,
    topK: 50,
    topP: 0.95,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [fullStackMasterDeveloper, userInput],
  });

  const result = await chat.sendMessage(userInput);
  const response = result.response;
  console.log(response.text());
  return response.text();
}

// ES6 export
export default geminiApiResponse;

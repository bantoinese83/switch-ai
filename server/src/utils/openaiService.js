// src/utils/openaiService.js
import { OpenAI } from 'openai';

import config from '../config/config.js';

import fullStackMasterDeveloper from './promptService.js';

const openai = new OpenAI({
  apiKey: config.openAI.apiKey,
});

function selectModel(useCase = 'general') {
  return (
    {
      general: 'gpt-4',
      code: 'code-davinci-002',
      image: 'dall-e-2',
      audio: 'tts-1',
      moderation: 'text-moderation-latest',
    }[useCase] || 'gpt-4'
  );
}

async function generateCompletion(useCase = 'general') {
  try {
    const model = selectModel(useCase);
    const response = await openai.completions.create({
      model,
      prompt: fullStackMasterDeveloper,
      max_tokens: 3000,
      temperature: 0.3,
    });

    if (response && response.choices && response.choices.length > 0 && response.choices[0].text) {
      return { success: true, data: response.choices[0].text };
    }
    return { success: false, error: 'Invalid response format or empty completion.' };
  } catch (error) {
    console.error('Error generating completion:', error);
    return { success: false, error: error.message || 'An unknown error occurred.' };
  }
}

export default generateCompletion;

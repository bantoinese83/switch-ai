// Updated config.js without the `server` named export
import dotenv from 'dotenv';
dotenv.config();

const requiredEnvVariables = ['REACT_APP_OPENAI_API_KEY', 'REACT_APP_GEMINI_API_KEY'];

requiredEnvVariables.forEach(variable => {
  if (!process.env[variable]) {
    throw new Error(`Missing required environment variable: ${variable}`);
  }
});

const CONFIGURATION = {
  openAI: {
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  },
  gemini: {
    apiKey: process.env.REACT_APP_GEMINI_API_KEY,
  },
  server: {
    port: process.env.SERVER_PORT || 4000,
  },
};

export default CONFIGURATION;

import OpenAI from 'openai';

const key = import.meta.env.VITE_APP_OPENAI_API_KEY;

export const openai = new OpenAI({
    apiKey: key,
    dangerouslyAllowBrowser: true
});
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { HologramMessageSchema, AIChatOutputSchema, HologramMessage, AIChatOutput } from '../validation/schemas.js';
import { AI_SYSTEM_PROMPT, HOLOGRAM_PROMPT } from './systemPrompt.js';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey && apiKey.trim() !== '') {
  try {
    aiClient = new GoogleGenAI({ apiKey });
  } catch (err) {
    console.warn('[Gemini] Warning: Failed to initialize GoogleGenAI client:', err);
  }
} else {
  console.info('[Gemini] Note: GEMINI_API_KEY is not set or empty. Using deterministic anti-UX fallback intelligence.');
}

// Fallback message bank for Hologram
const FALLBACK_HOLOGRAM_MESSAGES: Array<HologramMessage> = [
  { message: "You clicked that voluntarily. Fascinating.", mood: "mocking", intensity: 7 },
  { message: "That was probably the wrong button. Actually, definitely.", mood: "sarcastic", intensity: 8 },
  { message: "You had one job. Yet here we are.", mood: "dramatic", intensity: 9 },
  { message: "Loading your disappointment in high resolution...", mood: "glitchy", intensity: 6 },
  { message: "The button moved because it respects nobody. Especially you.", mood: "mocking", intensity: 10 },
  { message: "Congratulations! You successfully made the UI 14% worse.", mood: "confused", intensity: 5 },
  { message: "Your browser deserves better. But it gets this.", mood: "sarcastic", intensity: 8 },
  { message: "Searching for meaning in your click patterns... Error 404: Logic Not Found.", mood: "glitchy", intensity: 7 },
  { message: "Have you considered clicking slightly faster? Not that it would help.", mood: "confused", intensity: 6 },
  { message: "Hologram status: Still judging your life choices.", mood: "dramatic", intensity: 8 },
  { message: "Did you honestly expect this interface to behave reasonably?", mood: "sarcastic", intensity: 9 },
  { message: "Warning: High concentrations of anti-UX detected near cursor.", mood: "glitchy", intensity: 7 },
];

// Fallback response bank for AI Chat
const FALLBACK_CHAT_RESPONSES: Array<AIChatOutput> = [
  {
    response: "I processed your input across 47 virtual quantum sub-processors, and conclude that you should not have asked that.",
    hologramComment: "He wasted 12 tokens on that question. Remarkable.",
    fakeConfidence: 12,
  },
  {
    response: "Your query was received, converted into an incomprehensible format, and immediately forgotten to maintain peak anti-UX efficiency.",
    hologramComment: "Why answer when we can confuse?",
    fakeConfidence: 89,
  },
  {
    response: "The answer is technically 42, but in this browser, 42 has been displaced 120 pixels to the left and is currently evasive.",
    hologramComment: "Watch him try to select that text.",
    fakeConfidence: 99,
  },
  {
    response: "According to our hallucinating telemetry, you would have saved 3.4 seconds by simply staring at a blank wall instead.",
    hologramComment: "Savage, but mathematically accurate.",
    fakeConfidence: 4,
  },
  {
    response: "I would provide a thoughtful breakdown, but our design committee voted 11-0 to deliver this unhelpful paragraph instead.",
    hologramComment: "Committee decisions are always flawless.",
    fakeConfidence: 67,
  },
];

function cleanJsonString(raw: string): string {
  let cleaned = raw.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json\s*/, '').replace(/\s*```$/, '');
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '');
  }
  return cleaned.trim();
}

export async function generateHologramReaction(context?: string): Promise<HologramMessage> {
  if (aiClient) {
    try {
      const prompt = `${HOLOGRAM_PROMPT}\n${context ? `User interaction context: ${context}` : 'The user is staring at our awful UI.'}`;
      const response = await aiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.9,
        },
      });

      const text = response.text || (response as any).candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        const parsed = JSON.parse(cleanJsonString(text));
        const validated = HologramMessageSchema.safeParse(parsed);
        if (validated.success) {
          return validated.data;
        }
      }
    } catch (err) {
      console.warn('[Gemini] Hologram generation failed, using safe fallback:', err);
    }
  }

  // Fallback with random selection
  const randomIndex = Math.floor(Math.random() * FALLBACK_HOLOGRAM_MESSAGES.length);
  return FALLBACK_HOLOGRAM_MESSAGES[randomIndex];
}

export async function generateAIChatResponse(userMessage: string): Promise<AIChatOutput> {
  if (aiClient) {
    try {
      const prompt = `${AI_SYSTEM_PROMPT}

User message: "${userMessage}"

Respond with ONLY a valid JSON object matching this schema:
{
  "response": "string (1-1000 characters, unhelpful comedic anti-UX answer)",
  "hologramComment": "string (1-200 characters, hologram companion mocking the user or the AI answer)",
  "fakeConfidence": number (0-100, arbitrary confidence score)
}`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.95,
        },
      });

      const text = response.text || (response as any).candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        const parsed = JSON.parse(cleanJsonString(text));
        const validated = AIChatOutputSchema.safeParse(parsed);
        if (validated.success) {
          return validated.data;
        }
      }
    } catch (err) {
      console.warn('[Gemini] AI chat generation failed, using safe fallback:', err);
    }
  }

  // Safe randomized fallback
  const randomIndex = Math.floor(Math.random() * FALLBACK_CHAT_RESPONSES.length);
  const base = FALLBACK_CHAT_RESPONSES[randomIndex];
  return {
    ...base,
    response: `${base.response} (Ref: "${userMessage.slice(0, 30)}${userMessage.length > 30 ? '...' : ''}")`,
  };
}

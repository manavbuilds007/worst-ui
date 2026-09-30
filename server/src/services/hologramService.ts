import { generateHologramReaction } from '../ai/gemini.js';
import { HologramMessage } from '../validation/schemas.js';

export async function fetchHologramMessage(context?: string): Promise<HologramMessage> {
  return await generateHologramReaction(context);
}

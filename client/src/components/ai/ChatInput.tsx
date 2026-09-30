import React, { useState } from 'react';
import { Send, CornerDownLeft, AlertCircle } from 'lucide-react';
import { MovingButton } from '../chaos/MovingButton.js';
import { z } from 'zod';

const InputSchema = z.string().trim().min(1, 'Please enter a message').max(2000, 'Maximum 2000 characters');

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled = false }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (disabled) return;

    const res = InputSchema.safeParse(text);
    if (!res.success) {
      setError(res.error.errors[0]?.message || 'Invalid message');
      return;
    }

    setError(null);
    onSend(text.trim());
    setText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      {error && (
        <div className="p-2 bg-red-950/50 border border-red-500/50 rounded-xl text-red-300 text-xs flex items-center gap-1.5 font-mono">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="relative flex flex-col sm:flex-row items-center gap-2">
        <div className="relative w-full">
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (error) setError(null);
            }}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder="Pose your query to the chaotic intelligence (costs 1 token)..."
            rows={2}
            maxLength={2000}
            className="w-full bg-zinc-950/90 border border-zinc-700 focus:border-cyan-400 rounded-2xl p-3 text-sm text-zinc-100 placeholder-zinc-500 outline-none resize-none transition-colors font-sans"
          />
          <span className="absolute bottom-2 right-3 text-[10px] font-mono text-zinc-500">
            {text.length}/2000
          </span>
        </div>

        {/* Evasive Send Button per Section 4.2 */}
        <MovingButton
          onClick={() => handleSubmit()}
          variant="primary"
          evasionRadius={70}
          maxAttemptsBeforeCatch={2}
          className="whitespace-nowrap flex items-center justify-center gap-1.5 px-6 py-3 font-mono font-bold"
        >
          <Send className="w-4 h-4" />
          <span>DISPATCH</span>
        </MovingButton>
      </form>
    </div>
  );
};

import React from 'react';
import { ChatMessage as ChatMessageType } from '../../types/index.js';
import { User, Bot, Skull, Percent } from 'lucide-react';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1.5 animate-fade-in`}>
      <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 uppercase px-1">
        {isUser ? (
          <>
            <span>You (The Inquirer)</span>
            <User className="w-3 h-3 text-cyan-400" />
          </>
        ) : (
          <>
            <Bot className="w-3 h-3 text-pink-400" />
            <span>Anti-UX Intelligence</span>
          </>
        )}
        <span>• {message.timestamp}</span>
      </div>

      <div
        className={`max-w-xl p-4 rounded-2xl text-sm leading-relaxed text-left shadow-lg select-text ${
          isUser
            ? 'bg-zinc-800 border border-zinc-700 text-zinc-100 rounded-br-sm'
            : 'bg-zinc-950/90 border border-cyan-500/40 text-zinc-200 rounded-bl-sm backdrop-blur-md shadow-[0_0_20px_rgba(0,247,255,0.1)]'
        }`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>

        {/* AI Confidence Meter & Hologram commentary */}
        {!isUser && (
          <div className="mt-3 pt-3 border-t border-zinc-800/80 flex flex-col gap-2 font-mono text-xs">
            {typeof message.fakeConfidence === 'number' && (
              <div className="flex items-center justify-between text-[11px] text-zinc-400">
                <span className="flex items-center gap-1 text-cyan-400">
                  <Percent className="w-3 h-3" />
                  Hallucinated Confidence:
                </span>
                <span className="font-bold text-pink-400">{message.fakeConfidence}%</span>
              </div>
            )}

            {message.hologramComment && (
              <div className="p-2 rounded-xl bg-pink-950/40 border border-pink-500/30 text-pink-300 text-xs flex items-start gap-2">
                <Skull className="w-3.5 h-3.5 mt-0.5 text-pink-400 shrink-0" />
                <div>
                  <span className="font-bold text-[10px] uppercase tracking-wider block text-pink-400">
                    Holo Commentary
                  </span>
                  <span>"{message.hologramComment}"</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

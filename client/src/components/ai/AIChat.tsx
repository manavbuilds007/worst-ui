import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage as ChatMessageType } from '../../types/index.js';
import { ChatMessage } from './ChatMessage.js';
import { ChatInput } from './ChatInput.js';
import { TokenCounter } from './TokenCounter.js';
import { AIResponseLoader } from './AIResponseLoader.js';
import { api } from '../../lib/api.js';
import { useChaosState } from '../../hooks/useChaosState.js';
import { soundEffects } from '../../lib/soundEffects.js';
import { Sparkles, Bot, AlertTriangle, ShieldCheck } from 'lucide-react';

const INITIAL_GREETING: ChatMessageType = {
  id: 'msg-0',
  role: 'assistant',
  content: 'Greetings. I am the resident unhelpful intelligence. I consume simulated tokens and produce delightfully dysfunctional answers. Ask me anything, or save yourself the disappointment.',
  hologramComment: 'Every message deducts 1 fictional token. Proceed with reckless abandon.',
  fakeConfidence: 99,
  timestamp: 'Just now',
};

export const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([INITIAL_GREETING]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { tokenBalance, setTokenBalance, setShowPaymentModal, triggerHologramReaction } = useChaosState();
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    if (tokenBalance <= 0) {
      soundEffects.playHologramChirp();
      setShowPaymentModal(true);
      return;
    }

    const userMsg: ChatMessageType = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);
    soundEffects.playBlip();

    try {
      const data = await api.sendChatMessage(text);
      if (data.success) {
        const aiMsg: ChatMessageType = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: data.message,
          hologramComment: data.hologramComment,
          fakeConfidence: data.fakeConfidence,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prev => [...prev, aiMsg]);
        setTokenBalance(data.tokensRemaining);
        localStorage.setItem('worst_ui_tokens', data.tokensRemaining.toString());
        soundEffects.playHologramChirp();

        if (data.hologramComment) {
          triggerHologramReaction(data.hologramComment);
        }
      } else {
        // Handle error (e.g. token exhaustion)
        if (data.tokensRemaining === 0) {
          setShowPaymentModal(true);
        }
      }
    } catch (err) {
      const fallbackMsg: ChatMessageType = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: 'Our neural pathways suffered a comedic disruption. But rest assured, you still lost zero actual money.',
        hologramComment: 'Even the backend was stunned by that question.',
        fakeConfidence: 13,
        timestamp: 'Just now',
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
      {/* Token Header Widget */}
      <TokenCounter />

      {/* Safety & Anti-UX Banner */}
      <div className="p-3 bg-zinc-950/60 border border-cyan-500/30 rounded-xl text-xs font-mono text-zinc-400 flex items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 text-cyan-400">
          <ShieldCheck className="w-4 h-4" />
          Server-Side Gemini Integration Active
        </span>
        <span className="text-[11px] text-zinc-500">Rate Limit: 30 queries/min</span>
      </div>

      {/* Chat Messages Frame */}
      <div className="w-full min-h-[420px] max-h-[550px] overflow-y-auto p-4 sm:p-6 bg-zinc-950/80 border-2 border-zinc-800 rounded-3xl shadow-2xl flex flex-col gap-4">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {isLoading && <AIResponseLoader />}

        <div ref={chatBottomRef} />
      </div>

      {/* Chat Input */}
      <ChatInput onSend={handleSendMessage} disabled={isLoading} />
    </div>
  );
};

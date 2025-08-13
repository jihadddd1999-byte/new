import { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '@shared/schema';

interface ChatContainerProps {
  open: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
}

function highlightSpecialWords(text: string): string {
  const specialWords = {
    'زيزو': { color: '#ff3366', shake: true },
    'جهاد': { color: '#00ffe7', shake: false },
    'حلا': { color: '#ff33cc', shake: false },
    'كول': { color: '#33ccff', shake: false },
    'مصطفى': { color: '#33ff99', shake: false },
  };

  let result = text;
  
  Object.entries(specialWords).forEach(([word, { color, shake }]) => {
    const shakeClass = shake ? ' shake' : '';
    const regex = new RegExp(`\\b${word}\\b`, 'gu');
    result = result.replace(
      regex, 
      `<span class="special-word${shakeClass}" style="color:${color}">${word}</span>`
    );
  });

  return result;
}

export default function ChatContainer({
  open,
  onClose,
  messages,
  onSendMessage,
}: ChatContainerProps) {
  const [inputValue, setInputValue] = useState('');
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  if (!open) return null;

  return (
    <aside className="chat-container open">
      <header className="chat-header">
        <h3>الشات</h3>
        <button onClick={onClose}>✖️</button>
      </header>
      
      <section ref={messagesRef} className="chat-messages">
        {messages.map(message => (
          <div key={message.id} className="chat-message">
            {message.system ? (
              <div className="chat-system-message">{message.message}</div>
            ) : (
              <>
                <span 
                  className="chat-name"
                  style={{ color: message.playerColor }}
                >
                  {message.playerName}
                </span>
                <span>: </span>
                <span 
                  dangerouslySetInnerHTML={{ 
                    __html: highlightSpecialWords(message.message) 
                  }}
                />
              </>
            )}
          </div>
        ))}
      </section>
      
      <form onSubmit={handleSubmit} className="chat-form">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="اكتب رسالة..."
            className="chat-input"
            maxLength={120}
          />
          <button type="submit" className="btn-send">
            إرسال
          </button>
        </div>
      </form>
    </aside>
  );
}

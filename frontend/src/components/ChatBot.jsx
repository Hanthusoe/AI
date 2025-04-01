import { useState, useEffect, useRef } from "react";
import { MessageSquare, Send, X } from "lucide-react";
import { generateAIResponse } from "../utils/chat";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const messageText = String(input).trim();
    if (!messageText || loading) return;

    const userMessage = { role: "user", content: messageText };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const aiResponse = await generateAIResponse(messageText);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: aiResponse },
      ]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-10 right-10 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="btn btn-circle btn-primary"
        >
          <MessageSquare size={24} />
        </button>
      ) : (
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Chat Assistant</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="btn btn-sm btn-circle"
              >
                <X size={20} />
              </button>
            </div>

            <div className="h-96 overflow-auto mb-4 space-y-4 scrollbar-thin scrollbar-thumb-base-300">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`chat ${
                    msg.role === "user" ? "chat-end" : "chat-start"
                  }`}
                >
                  <div
                    className={`chat-bubble ${
                      msg.role === "user" ? "chat-bubble-primary" : ""
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="chat chat-start">
                  <div className="chat-bubble">
                    <span className="loading loading-dots loading-sm"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="input input-bordered flex-1"
                disabled={loading}
              />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading || !input.trim()}
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;

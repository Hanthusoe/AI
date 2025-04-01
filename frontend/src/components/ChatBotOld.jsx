



import { useState, useEffect, useRef } from "react";
import { MessageSquare, Send, X, Plus } from "lucide-react";
import { generateAIResponse } from "../utils/chat";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startNewConversation = () => {
    const newConversation = {
      id: Date.now(),
      title: "New Chat",
      messages: []
    };
    setConversations([newConversation, ...conversations]);
    setActiveConversation(newConversation.id);
    setMessages([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const messageText = String(input).trim();
    if (!messageText || loading) return;

    const userMessage = { role: "user", content: messageText };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const aiResponse = await generateAIResponse(messageText);
      const newMessages = [...updatedMessages, { role: "assistant", content: aiResponse }];
      setMessages(newMessages);
      
      // Update conversation
      if (activeConversation) {
        setConversations(conversations.map(conv => 
          conv.id === activeConversation 
            ? { ...conv, messages: newMessages, title: messageText.slice(0, 30) } 
            : conv
        ));
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 btn btn-circle btn-primary"
      >
        <MessageSquare size={24} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-base-100 w-11/12 max-w-4xl h-[80vh] rounded-lg flex overflow-hidden">
            {/* Sidebar */}
            <div className="w-64 bg-base-200 p-4 flex flex-col">
              <button 
                onClick={startNewConversation}
                className="btn btn-primary mb-4 gap-2"
              >
                <Plus size={20} />
                New Chat
              </button>
              
              <div className="flex-1 overflow-y-auto space-y-2">
                {conversations.map(conv => (
                  <button
                    key={conv.id}
                    onClick={() => {
                      setActiveConversation(conv.id);
                      setMessages(conv.messages);
                    }}
                    className={`btn btn-ghost w-full justify-start text-left truncate ${
                      activeConversation === conv.id ? 'btn-active' : ''
                    }`}
                  >
                    {conv.title || 'New Chat'}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="font-bold text-lg">Chat Assistant</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="btn btn-sm btn-circle"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`chat ${
                      msg.role === "user" ? "chat-end" : "chat-start"
                    }`}
                  >
                    <div className="chat-header mb-1 opacity-50">
                      {msg.role === "user" ? "You" : "AI Assistant"}
                    </div>
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

              <form onSubmit={handleSubmit} className="p-4 border-t">
                <div className="flex gap-2">
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
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;


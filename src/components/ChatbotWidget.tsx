"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, Sparkles, ChevronDown } from "lucide-react";
import { CLINIC_INFO } from "@/data/clinicData";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
}

interface ChatbotWidgetProps {
  onOpenBookingModal: () => void;
}

export default function ChatbotWidget({ onOpenBookingModal }: ChatbotWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-1",
      sender: "bot",
      text: "Hello! Welcome to Heritage Clinic. How can I assist you today? You can ask about our treatments, doctors, hours, or schedule a visit.",
      time: "Just now",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // =========================================================================
  // N8N WEBHOOK INTEGRATION POINT:
  // When you are ready to connect to your live n8n workflow:
  // 1. Enter your n8n webhook URL below (e.g. "https://your-n8n.example.com/webhook/chat")
  // 2. Uncomment the fetch call inside sendToN8nBot()
  // =========================================================================
  const N8N_WEBHOOK_URL = ""; // <-- PASTE YOUR N8N WEBHOOK URL HERE

  const sendToN8nBot = async (userMessage: string) => {
    setIsTyping(true);

    if (N8N_WEBHOOK_URL) {
      try {
        const response = await fetch(N8N_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: userMessage,
            sessionId: "demo-session-heritage-clinic",
            timestamp: new Date().toISOString(),
          }),
        });
        const data = await response.json();
        const replyText =
          data.reply || data.output || data.text || JSON.stringify(data);

        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: "bot",
            text: replyText,
            time: "Just now",
          },
        ]);
        setIsTyping(false);
        return;
      } catch (err) {
        console.error("n8n Webhook Error:", err);
      }
    }

    // Default simulated responses for demo preview
    setTimeout(() => {
      const lower = userMessage.toLowerCase();
      let reply = "";

      if (lower.includes("hour") || lower.includes("time") || lower.includes("open")) {
        reply = `Our working hours are: Weekdays: ${CLINIC_INFO.contact.hours.weekdays}, Saturday: ${CLINIC_INFO.contact.hours.saturday}.`;
      } else if (lower.includes("address") || lower.includes("location") || lower.includes("where")) {
        reply = `Heritage Clinic is located at: ${CLINIC_INFO.contact.address}.`;
      } else if (lower.includes("book") || lower.includes("appoint") || lower.includes("schedule")) {
        reply = `You can easily book an appointment using our online scheduler! Click the 'Book Appointment' button at the top or in this chat.`;
      } else if (lower.includes("phone") || lower.includes("contact") || lower.includes("call")) {
        reply = `You can reach our main desk at ${CLINIC_INFO.contact.phone} or emergency line at ${CLINIC_INFO.contact.emergencyPhone}.`;
      } else {
        reply = `Thank you for your message! (Placeholder answer): Our clinic coordinator will review your question. When connected to your n8n workflow, custom AI responses will appear here automatically.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: reply,
          time: "Just now",
        },
      ]);
      setIsTyping(false);
    }, 700);
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText.trim();
    const newMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: userText,
      time: "Just now",
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText("");
    sendToN8nBot(userText);
  };

  const handleQuickQuestion = (question: string) => {
    const newMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: question,
      time: "Just now",
    };
    setMessages((prev) => [...prev, newMsg]);
    sendToN8nBot(question);
  };

  return (
    <aside aria-label="Heritage Clinic Chat Assistant" className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[92vw] sm:w-[380px] h-[520px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden transition-all duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-clinic-700 to-clinic-600 px-4 py-3.5 text-white flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white border border-white/30">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-clinic-700 rounded-full" />
              </div>
              <div>
                <h4 className="font-semibold text-sm leading-tight flex items-center gap-1.5">
                  Heritage Assistant
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                </h4>
                <p className="text-[11px] text-blue-100">Ready for n8n Integration</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Minimize Chatbot"
                className="p-1 rounded-lg hover:bg-white/20 text-white transition-colors"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close Chatbot"
                className="p-1 rounded-lg hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Integration Badge Notice */}
          <div className="bg-clinic-50 border-b border-clinic-100 px-3 py-1.5 text-[11px] text-clinic-800 flex items-center justify-between">
            <span className="truncate">
              ⚡ <strong>n8n Ready:</strong> Placeholder chat engine
            </span>
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenBookingModal();
              }}
              className="text-clinic-600 hover:text-clinic-800 underline font-semibold flex-shrink-0 ml-2"
            >
              Book Visit
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${
                  m.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed shadow-sm ${
                    m.sender === "user"
                      ? "bg-clinic-600 text-white rounded-br-xs"
                      : "bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs"
                  }`}
                >
                  <p>{m.text}</p>
                  <span
                    className={`block text-[10px] mt-1 text-right ${
                      m.sender === "user" ? "text-blue-200" : "text-slate-400"
                    }`}
                  >
                    {m.time}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-xs px-3.5 py-2 shadow-sm flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-clinic-600 rounded-full animate-bounce" />
                  <span
                    className="w-1.5 h-1.5 bg-clinic-600 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="w-1.5 h-1.5 bg-clinic-600 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          <div className="px-3 py-2 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto no-scrollbar">
            {[
              "Clinic Hours",
              "Where are you located?",
              "Book Appointment",
              "Emergency Number",
            ].map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => {
                  if (q === "Book Appointment") {
                    onOpenBookingModal();
                  } else {
                    handleQuickQuestion(q);
                  }
                }}
                className="whitespace-nowrap px-2.5 py-1 text-[11px] bg-slate-100 hover:bg-clinic-50 hover:text-clinic-700 text-slate-700 rounded-full transition-colors border border-slate-200"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Type your health inquiry..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 text-xs sm:text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-clinic-500 focus:bg-white text-slate-800"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2 bg-clinic-600 text-white rounded-xl hover:bg-clinic-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Launcher Button */}
      <div className="relative group">
        {!isOpen && (
          <div className="hidden sm:block absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            Chat with Heritage Assistant
            <div className="absolute top-1/2 -right-1 -translate-y-1/2 border-4 border-transparent border-l-slate-900" />
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close clinic chat" : "Open clinic chat"}
          className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-clinic-700 to-clinic-500 text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-clinic-300"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <>
              <MessageSquare className="w-6 h-6" />
              {/* Online Pulse Indicator */}
              <span className="absolute top-1 right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white" />
              </span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}

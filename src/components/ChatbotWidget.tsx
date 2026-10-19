"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  X,
  Send,
  Calendar,
  RefreshCw,
  XCircle,
  FileText,
  HeartPulse,
  RotateCcw,
  Sparkles,
} from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
  isError?: boolean;
  doctors?: Doctor[]
}


interface Doctor {
  doctor_id: string;
  doctor_name: string;
  specialization: string;
  available_days: string;
  start_time: string;
  end_time: string;
}

interface ChatbotWidgetProps {
  onOpenBookingModal?: () => void;
}

export default function ChatbotWidget({ onOpenBookingModal }: ChatbotWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      sender: "bot",
      text: "Hello! Welcome to Heritage Clinic Assistant. How can I help you today? Please choose an action above or type your inquiry below.",
      time: "Just now",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Official production n8n Chat Trigger Webhook URL
  const N8N_CHAT_WEBHOOK_URL =
    "https://oyik.cloud/webhook/1a2d6dba-0635-44a6-bdb9-e3a478a5de5f/chat";

  // Initialize persistent session ID from localStorage on client
  useEffect(() => {
    try {
      let storedId = localStorage.getItem("heritage_clinic_chat_session");
      if (!storedId) {
        storedId =
          "heritage_" + Math.random().toString(36).substring(2, 10) + "_" + Date.now();
        localStorage.setItem("heritage_clinic_chat_session", storedId);
      }
      setSessionId(storedId);
    } catch {
      setSessionId("heritage_" + Date.now());
    }
  }, []);

  // Auto-scroll conversation to bottom whenever messages update
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen]);

  // Send message to live n8n workflow
  const sendMessageToN8n = async (userText: string) => {
    if (!userText.trim()) return;

    const currentActiveSession =
      sessionId ||
      "heritage_" + Math.random().toString(36).substring(2, 10) + "_" + Date.now();

    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMessage: Message = {
      id: `usr_${Date.now()}`,
      sender: "user",
      text: userText,
      time: timestamp,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      const response = await fetch(N8N_CHAT_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatInput: userText,
          sessionId: currentActiveSession,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to receive response`);
      }

      const data = await response.json();

      const responseData =
        typeof data.output === "object" && data.output !== null
          ? data.output
          : data;

      const doctorList = Array.isArray(responseData.doctors)
        ? responseData.doctors
        : [];

      const replyText =
        typeof data === "string"
          ? data
          : typeof data.output === "string"
            ? data.output
            : data.text || data.message || data.reply || "";
      
      
      
      // const data = await response.json();
      // let replyText = "";

      // if (typeof data === "string") {
      //   replyText = data;
      // } else if (data.output) {
      //   replyText = typeof data.output === "string" ? data.output : JSON.stringify(data.output);
      // } else if (data.text) {
      //   replyText = data.text;
      // } else if (data.message) {
      //   replyText = data.message;
      // } else if (data.reply) {
      //   replyText = data.reply;
      // } else {
      //   replyText = JSON.stringify(data);
      // }

      setMessages((prev) => [
        ...prev,
        {
          id: `bot_${Date.now()}`,
          sender: "bot",
          text: replyText || "Thank you for your message. How else may I assist you?",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          doctors: doctorList.length > 0 ? doctorList : undefined,
        },
      ]);
    } catch (err: any) {
      console.error("n8n Chat Request Error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot_err_${Date.now()}`,
          sender: "bot",
          text: "We encountered a temporary connection issue reaching the clinic assistant. Please try sending your message again.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Form submit handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    sendMessageToN8n(inputText.trim());
  };

  // Quick Action Button triggers
  const handleQuickAction = (actionPrompt: string) => {
    if (isLoading) return;
    sendMessageToN8n(actionPrompt);
  };

  // Reset conversation session
  const handleResetSession = () => {
    const newSession =
      "heritage_" + Math.random().toString(36).substring(2, 10) + "_" + Date.now();
    try {
      localStorage.setItem("heritage_clinic_chat_session", newSession);
    } catch {}
    setSessionId(newSession);
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: "bot",
        text: "Conversation reset. Hello! Welcome to Heritage Clinic Assistant. How can I help you today?",
        time: "Just now",
      },
    ]);
  };

  // 4 Fixed Quick Action Buttons
  const quickActions = [
    {
      id: "book",
      label: "Book Appointment",
      icon: <Calendar className="w-4 h-4 text-clinic-600 flex-shrink-0" />,
      prompt: "I want to Book an Appointment",
      badgeColor: "hover:border-clinic-300 hover:bg-clinic-50/70",
    },
    {
      id: "reschedule",
      label: "Reschedule Appointment",
      icon: <RefreshCw className="w-4 h-4 text-sky-600 flex-shrink-0" />,
      prompt: "I want to Reschedule my Appointment",
      badgeColor: "hover:border-sky-300 hover:bg-sky-50/70",
    },
    {
      id: "cancel",
      label: "Cancel Appointment",
      icon: <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />,
      prompt: "I want to Cancel my Appointment",
      badgeColor: "hover:border-rose-300 hover:bg-rose-50/70",
    },
    {
      id: "history",
      label: "Patient History",
      icon: <FileText className="w-4 h-4 text-emerald-600 flex-shrink-0" />,
      prompt: "I want to check my Patient History and records",
      badgeColor: "hover:border-emerald-300 hover:bg-emerald-50/70",
    },
  ];

  return (
    <aside
      aria-label="Heritage Clinic Chat Assistant"
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto select-none"
    >
      {/* Expanded Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[94vw] sm:w-[420px] h-[610px] max-h-[88vh] bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-fadeIn transition-all duration-300">
          {/* 1. Header: Clinic Logo, Title, Online Status, Reset & Close */}
          <div className="bg-gradient-to-r from-navy-900 via-clinic-800 to-clinic-700 px-5 py-3.5 text-white flex items-center justify-between shadow-md flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-sm flex-shrink-0">
                <HeartPulse className="w-5 h-5 text-clinic-200" />
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-tight leading-snug flex items-center gap-1.5">
                  Heritage Clinic Assistant
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                </h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-medium text-blue-100">Online</span>
                  <span className="text-white/40 text-[10px]">•</span>
                  <span className="text-[10px] text-blue-200">Heritage Healthcare</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleResetSession}
                title="Restart conversation"
                className="p-1.5 rounded-lg text-blue-100 hover:text-white hover:bg-white/15 transition-colors focus:outline-none"
                aria-label="Reset conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-blue-100 hover:text-white hover:bg-white/15 transition-colors focus:outline-none"
                aria-label="Close Chatbot"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 2. Four Fixed Quick-Action Buttons (Prominently below header, above conversation) */}
          <div className="bg-slate-50/95 border-b border-slate-200/90 px-3.5 py-3 flex-shrink-0 shadow-xs">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Quick Healthcare Actions
              </span>
              <span className="text-[10px] text-slate-400">Direct n8n Workflow</span>
            </div>

            {/* 2-Column Responsive Layout */}
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleQuickAction(action.prompt)}
                  className={`flex items-center gap-2 p-2 rounded-xl bg-white border border-slate-200/90 shadow-2xs text-left transition-all text-xs font-semibold text-slate-700 hover:text-slate-900 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed ${action.badgeColor}`}
                >
                  <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-100">
                    {action.icon}
                  </div>
                  <span className="leading-tight text-[11px] sm:text-xs">
                    {action.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Conversation Messages Area (Scrolls independently) */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-100/40">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${
                  m.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {/* Bot Avatar Icon */}
                {m.sender === "bot" && (
                  <div className="w-7 h-7 rounded-full bg-clinic-100 border border-clinic-200 text-clinic-700 flex items-center justify-center text-xs font-bold mr-2 mt-1 flex-shrink-0 shadow-2xs">
                    <HeartPulse className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                    m.sender === "user"
                      ? "bg-clinic-600 text-white rounded-br-xs font-medium"
                      : m.isError
                      ? "bg-rose-50 text-rose-900 border border-rose-200 rounded-bl-xs"
                      : "bg-white text-slate-800 border border-slate-200/90 rounded-bl-xs"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>
                  {m.doctors && m.doctors.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {m.doctors.map((doctor) => (
                        <div
                          key={doctor.doctor_id}
                          className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm"
                        >
                          <p className="font-semibold text-slate-800">
                            {doctor.doctor_name}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {doctor.specialization}
                          </p>

                          <p className="mt-2 text-xs text-slate-600">
                            <span className="font-medium">Available days:</span>{" "}
                            {doctor.available_days}
                          </p>

                          <p className="mt-1 text-xs text-slate-600">
                            <span className="font-medium">Hours:</span>{" "}
                            {doctor.start_time} – {doctor.end_time}
                          </p>

                          <button
                            type="button"
                            disabled={isLoading}
                            onClick={() =>
                              handleQuickAction(
                                `I select doctor ${doctor.doctor_name}, doctor ID ${doctor.doctor_id}, specialization ${doctor.specialization}. Continue my appointment booking.`
                              )
                            }
                            className="mt-3 w-full rounded-lg bg-clinic-600 px-3 py-2 text-sm font-semibold text-white hover:bg-clinic-700 disabled:opacity-50"
                          >
                            Select Doctor
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <span
                    className={`block text-[10px] mt-1 text-right ${
                      m.sender === "user" ? "text-blue-100" : "text-slate-400"
                    }`}
                  >
                    {m.time}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing / Loading indicator */}
            {isLoading && (
              <div className="flex items-center gap-2 text-slate-500">
                <div className="w-7 h-7 rounded-full bg-clinic-100 border border-clinic-200 text-clinic-700 flex items-center justify-center text-xs font-bold mr-1 flex-shrink-0">
                  <HeartPulse className="w-3.5 h-3.5" />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-xs px-3.5 py-2 shadow-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-clinic-600 rounded-full animate-bounce" />
                  <span
                    className="w-1.5 h-1.5 bg-clinic-600 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="w-1.5 h-1.5 bg-clinic-600 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                  <span className="text-[11px] text-slate-500 ml-1 font-medium">
                    Assistant is typing...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* 4. Fixed Bottom Message Input and Send Button */}
          <form
            onSubmit={handleFormSubmit}
            className="p-3 bg-white border-t border-slate-200/90 flex items-center gap-2 flex-shrink-0 shadow-md"
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Type your health inquiry..."
              value={inputText}
              disabled={isLoading}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-clinic-500 focus:bg-white text-slate-800 placeholder-slate-400 transition-colors disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="p-2.5 bg-clinic-600 text-white rounded-xl hover:bg-clinic-700 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm flex-shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Bottom-Right Launcher Button */}
      <div className="relative group">
        {!isOpen && (
          <div className="hidden sm:block absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-slate-900 text-white text-xs px-3.5 py-2 rounded-xl shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            Chat with Heritage Assistant
            <div className="absolute top-1/2 -right-1 -translate-y-1/2 border-4 border-transparent border-l-slate-900" />
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close clinic chat" : "Open clinic chat"}
          className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-clinic-700 via-clinic-600 to-sky-500 text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-clinic-300 cursor-pointer"
        >
          {isOpen ? (
            <X className="w-6 h-6 transition-transform rotate-0 hover:rotate-90 duration-200" />
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

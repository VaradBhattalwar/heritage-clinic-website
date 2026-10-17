"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X } from "lucide-react";

interface ChatbotWidgetProps {
  onOpenBookingModal: () => void;
}

export default function ChatbotWidget({ onOpenBookingModal }: ChatbotWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const initializedRef = useRef(false);

  // Official production n8n Chat Webhook URL (from user's active n8n Cloud instance)
  const N8N_CHAT_WEBHOOK_URL =
    "https://oyik.cloud/webhook/1a2d6dba-0635-44a6-bdb9-e3a478a5de5f/chat";

  useEffect(() => {
    if (initializedRef.current || typeof window === "undefined") return;

    // Dynamically load @n8n/chat on the client side
    import("@n8n/chat")
      .then(({ createChat }) => {
        // Ensure the target element container exists
        let chatTarget = document.getElementById("n8n-chat");
        if (!chatTarget) {
          chatTarget = document.createElement("div");
          chatTarget.id = "n8n-chat";
          document.body.appendChild(chatTarget);
        }

        // Initialize the official n8n embedded chat widget
        createChat({
          webhookUrl: N8N_CHAT_WEBHOOK_URL,
          webhookConfig: {
            method: "POST",
            headers: {},
          },
          target: "#n8n-chat",
          mode: "window",
          showWelcomeScreen: false,
          defaultLanguage: "en",
          initialMessages: [
            "Hello! Welcome to Heritage Clinic. How can I assist you with our doctors, treatments, or scheduling today?",
          ],
          i18n: {
            en: {
              title: "Heritage Clinic Assistant",
              subtitle: "Online Healthcare Support",
              footer: "Heritage Clinic • Powered by n8n",
              getStarted: "New Conversation",
              inputPlaceholder: "Type your health inquiry...",
              closeButtonTooltip: "Close Chat",
            },
          },
        });

        initializedRef.current = true;

        // Monitor DOM to keep our floating launcher button icon (MessageSquare vs X) in sync
        const observer = new MutationObserver(() => {
          const chatWindow = document.querySelector(".chat-window");
          if (chatWindow) {
            // Check if chat-window is currently visible / active
            const style = window.getComputedStyle(chatWindow);
            const isVisible =
              style.display !== "none" &&
              style.visibility !== "hidden" &&
              style.opacity !== "0";
            setIsOpen(isVisible);
          } else {
            setIsOpen(false);
          }
        });

        const targetNode = document.getElementById("n8n-chat") || document.body;
        observer.observe(targetNode, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ["class", "style"],
        });
      })
      .catch((err) => {
        console.error("Failed to load @n8n/chat:", err);
      });
  }, [N8N_CHAT_WEBHOOK_URL]);

  // Toggle the official n8n chat window open/closed
  const handleToggleChat = () => {
    // When the chat is already open, clicking either the close button or toggle button closes it
    if (isOpen) {
      const closeBtn = document.querySelector<HTMLButtonElement>(".chat-close-button");
      if (closeBtn) {
        closeBtn.click();
        setIsOpen(false);
        return;
      }
    }

    // Trigger n8n's toggle button
    const toggleBtn = document.querySelector<HTMLButtonElement>(".chat-window-toggle");
    if (toggleBtn) {
      toggleBtn.click();
      setIsOpen(!isOpen);
    }
  };

  return (
    <aside
      aria-label="Heritage Clinic Chat Assistant"
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto"
    >
      {/* Floating Launcher Button */}
      <div className="relative group">
        {!isOpen && (
          <div className="hidden sm:block absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            Chat with Heritage Assistant
            <div className="absolute top-1/2 -right-1 -translate-y-1/2 border-4 border-transparent border-l-slate-900" />
          </div>
        )}

        <button
          onClick={handleToggleChat}
          aria-label={isOpen ? "Close clinic chat" : "Open clinic chat"}
          className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-clinic-700 to-clinic-500 text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-clinic-300 cursor-pointer"
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

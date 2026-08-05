"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { CheckCircle2, X } from "lucide-react";

interface ToastMessage {
  id: string;
  title: string;
  description?: string;
}

interface ToastContextType {
  showToast: (title: string, description?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (title: string, description?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, description }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Floating Toast Portal Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-3 max-w-sm w-full px-4 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto bg-dark text-white rounded-lg p-4 shadow-xl border border-gold/40 flex items-start space-x-3 transition-all animate-in slide-in-from-bottom-5 fade-in duration-200"
          >
            <CheckCircle2 className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
            <div className="flex-1 text-sm">
              <h5 className="font-semibold text-cream tracking-wide">{toast.title}</h5>
              {toast.description && (
                <p className="text-xs text-cream/70 mt-1">{toast.description}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-cream/50 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

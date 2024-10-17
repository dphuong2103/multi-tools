"use client";
import { Dictionary } from "@/lib/dictionary";
import React, { createContext, useEffect, useState } from "react";

interface BeforeUnloadContextProps {
  showPrompt: boolean;
  setShowPrompt: (showPrompt: boolean) => void;
}
export const BeforeUnloadContext = createContext<BeforeUnloadContextProps>(
  {} as BeforeUnloadContextProps,
);

function BeforeUnloadProvider({
  dictionary,
  children,
}: {
  children: React.ReactNode;
  dictionary: Dictionary;
}) {
  const [showPrompt, setShowPrompt] = useState(false);
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (showPrompt) {
        e.preventDefault();
        alert(dictionary.contextProvider.beforeUnload.message);
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => {
      window.removeEventListener("beforeunload", handler);
    };
  }, [showPrompt, dictionary.contextProvider.beforeUnload.message]);

  return (
    <BeforeUnloadContext.Provider value={{ showPrompt, setShowPrompt }}>
      {children}
    </BeforeUnloadContext.Provider>
  );
}
export default BeforeUnloadProvider;

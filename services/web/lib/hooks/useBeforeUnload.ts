import { useCallback, useEffect, useState } from "react";

export default function useBeforeUnload() {
  const [showPrompt, setShowPrompt] = useState(false);
  useEffect(() => {
    const handler = () => {
      if (showPrompt) {
        alert("Are you sure you want to leave?");
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => {
      window.removeEventListener("beforeunload", handler);
    };
  }, [showPrompt]);

  return useBeforeUnload;
}

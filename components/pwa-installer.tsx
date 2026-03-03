"use client";

import { useEffect, useState } from "react";

export function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    // Register service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("Service Worker registered:", registration);
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  if (!isInstallable) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-[#5F7E9D] text-white p-4 rounded-lg shadow-lg max-w-sm">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <h3 className="font-semibold mb-1">Install PawPair</h3>
          <p className="text-sm opacity-90 mb-3">
            Install our app for a better experience!
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleInstallClick}
              className="px-4 py-2 bg-white text-[#5F7E9D] rounded-lg text-sm font-medium hover:bg-gray-100 transition"
            >
              Install
            </button>
            <button
              onClick={() => setIsInstallable(false)}
              className="px-4 py-2 bg-transparent border border-white rounded-lg text-sm font-medium hover:bg-white/10 transition"
            >
              Later
            </button>
          </div>
        </div>
        <button
          onClick={() => setIsInstallable(false)}
          className="text-white/80 hover:text-white"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

export function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showAndroidPrompt, setShowAndroidPrompt] = useState(false);
  const [showIOSPrompt, setShowIOSPrompt] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Don't show if already dismissed this session
    if (sessionStorage.getItem("pwa-dismissed")) return;

    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    const isStandalone = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;

    // Don't show if already installed
    if (isStandalone) return;

    // iOS: show manual instructions
    if (isIOS) {
      setTimeout(() => setShowIOSPrompt(true), 3000);
      return;
    }

    // Android/Desktop Chrome: listen for beforeinstallprompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setTimeout(() => setShowAndroidPrompt(true), 3000);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShowAndroidPrompt(false);
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setShowAndroidPrompt(false);
    setShowIOSPrompt(false);
    setDismissed(true);
    sessionStorage.setItem("pwa-dismissed", "true");
  };

  if (dismissed || (!showAndroidPrompt && !showIOSPrompt)) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[90vw] max-w-sm">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        <div className="bg-[#5F7E9D] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/android-chrome-192x192.png"
              alt="PawPair"
              className="w-8 h-8 rounded-lg"
            />
            <span className="text-white font-semibold text-sm">PawPair</span>
          </div>
          <button
            onClick={handleDismiss}
            className="text-white/80 hover:text-white text-lg leading-none"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="px-4 py-4">
          {showAndroidPrompt && (
            <>
              <p className="text-[#2F3E4E] font-semibold text-sm mb-1">
                Install PawPair App
              </p>
              <p className="text-gray-500 text-xs mb-4">
                Install our app for a faster, better experience — works offline
                too!
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleInstall}
                  className="flex-1 py-2.5 bg-[#5F7E9D] text-white rounded-xl text-sm font-medium hover:bg-[#4e6b87] transition"
                >
                  Install App
                </button>
                <button
                  onClick={handleDismiss}
                  className="flex-1 py-2.5 border border-gray-200 text-gray-500 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
                >
                  Not Now
                </button>
              </div>
            </>
          )}

          {showIOSPrompt && (
            <>
              <p className="text-[#2F3E4E] font-semibold text-sm mb-1">
                Add PawPair to Home Screen
              </p>
              <p className="text-gray-500 text-xs mb-3">
                Install this app on your iPhone for quick access:
              </p>
              <ol className="text-xs text-gray-600 space-y-1.5 mb-4">
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#5F7E9D] text-white flex items-center justify-center text-[10px] flex-shrink-0">
                    1
                  </span>
                  Tap the{" "}
                  <strong>Share</strong> button{" "}
                  <span className="text-base">⎋</span> in Safari
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#5F7E9D] text-white flex items-center justify-center text-[10px] flex-shrink-0">
                    2
                  </span>
                  Scroll down and tap{" "}
                  <strong>"Add to Home Screen"</strong>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#5F7E9D] text-white flex items-center justify-center text-[10px] flex-shrink-0">
                    3
                  </span>
                  Tap <strong>"Add"</strong> to confirm
                </li>
              </ol>
              <button
                onClick={handleDismiss}
                className="w-full py-2.5 border border-gray-200 text-gray-500 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
              >
                Got it
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useRef } from "react";

export default function VoiceInputButton({ onTranscript, disabled }) {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Check for browser support
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = "en-US";

      rec.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onTranscript(transcript);
        setIsListening(false);
      };

      rec.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onTranscript]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Voice input is not supported in your browser.");
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return (
    <button
      onClick={toggleListening}
      disabled={disabled}
      aria-label="Voice input"
      title="Speak to the Assistant"
      style={{
        width: "38px",
        height: "38px",
        borderRadius: "12px",
        border: "none",
        background: isListening
          ? "rgba(239,68,68,0.2)"
          : "rgba(255,255,255,0.06)",
        color: isListening ? "#ef4444" : "#9ca3af",
        cursor: disabled ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.1rem",
        flexShrink: 0,
        transition: "all 0.2s",
      }}
      onMouseEnter={(e) => {
        if (!disabled) e.currentTarget.style.background = isListening ? "rgba(239,68,68,0.3)" : "rgba(255,255,255,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = isListening ? "rgba(239,68,68,0.2)" : "rgba(255,255,255,0.06)";
      }}
    >
      {isListening ? "🔴" : "🎤"}
    </button>
  );
}

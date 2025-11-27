import { useEffect, useRef, useState } from "react";
import audio1 from "./assets/bg-music.mp3";
import logo from "./assets/logo.png";
import bgImage from "./assets/Edited.jpg";
import { useCountdown } from "./hooks/useCountdown";
import Confetti from "react-confetti";
import "./App.css";

function App() {
  const targetDate = new Date(
    "December 12, 2025 22:00:00 GMT+0600"
  ).toISOString();
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  const audioRef = useRef(null);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const isFinished = days + hours + minutes + seconds <= 0;

  // Auto-play muted (only allowed way)
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = true;
      audioRef.current.play().catch(() => {});
    }
  }, []);

  // Click → only unmute (does NOT restart audio → no double play)
  const enableSound = () => {
    if (audioRef.current) {
      audioRef.current.muted = false;
    }
    setSoundEnabled(true);
  };

  return (
    <div
      className="app-container"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {isFinished && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}

      {/* Background Music */}
      <audio ref={audioRef} autoPlay loop playsInline preload="auto">
        <source src={audio1} type="audio/mp3" />
      </audio>

      {/* Enable Sound Button */}
      {!soundEnabled && (
        <button className="sound-btn" onClick={enableSound}>
          🔊 Enable Sound
        </button>
      )}

      {/* Logo + Title */}
      <div className="logo-title">
        <img src={logo} alt="Logo" />
        <h1>Saint Martin Tour</h1>
      </div>

      {/* Countdown Card */}
      <div className="countdown-card">
        {["DAYS", "HOURS", "MINUTES", "SECONDS"].map((label, i) => (
          <div key={label} className="countdown-item">
            <div className="countdown-number-card">
              <span className="countdown-number">
                {[days, hours, minutes, seconds][i]}
              </span>
            </div>
            <p className="countdown-label">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

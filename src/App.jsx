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

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = true;
      audioRef.current.play().catch(() => {});
    }
  }, []);

  // Button click to unmute
  const toggleSound = () => {
    if (!audioRef.current) return;

    audioRef.current.muted = !audioRef.current.muted;

    // Chrome requires calling play() on user interaction
    audioRef.current.play().catch(() => {});

    setSoundEnabled(!soundEnabled);
  };

  return (
    <div
      className="app-container"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {isFinished && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}

      <audio ref={audioRef} autoPlay loop playsInline preload="auto">
        <source src={audio1} type="audio/mp3" />
      </audio>

      {/* Logo + Title */}
      <div className="logo-title">
        <img src={logo} alt="Logo" className="opedia-logo" />
        <h1 className="large-title">Saint Martin Tour</h1>

        {/* Toggle Play / Mute Button */}
        <button className="sound-btn title-btn" onClick={toggleSound}>
          {soundEnabled ? "🔇 Mute Music" : "▶ Play Music raa"}
        </button>
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

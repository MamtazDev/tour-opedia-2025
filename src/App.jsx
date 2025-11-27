import { useCountdown } from "./hooks/useCountdown";
import audio1 from "./assets/bg-music.mp3";
import { useRef, useEffect, useState } from "react";
import Confetti from "react-confetti";
import logo from "./assets/logo.png";
import bgImage from "./assets/Edited.jpg";
import "./App.css";

function App() {
  const targetDate = new Date(
    "December 12, 2025 22:00:00 GMT+0600"
  ).toISOString();
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  const audioRef = useRef(null);
  const audioRef1 = useRef(null);

  const isFinished = days + hours + minutes + seconds <= 0;

  return (
    <div
      className="app-container"
      style={{ backgroundImage: `url(${bgImage})` }}
      onClick={() => audioRef.current.play()}
    >
      {/* {isFinished && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )} */}

      <audio
        ref={audioRef}
        autoPlay
        loop
        preload="auto"
        style={{ display: "none" }}
      >
        <source src={audio1} type="audio/mp3" />
      </audio>

      {/* Logo + Title */}
      <div className="logo-title">
        <img src={logo} alt="logo" />
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

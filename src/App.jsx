import { useCountdown } from "./hooks/useCountdown";
import { useRef, useEffect } from "react";
import Confetti from "react-confetti";
import logo from "./assets/logo.png";
import bgImage from "./assets/Edited.jpg";
import "./App.css";
import audio1 from "./assets/bg-music.mp3";

function App() {
  const targetDate = new Date(
    "December 12, 2025 22:00:00 GMT+0600"
  ).toISOString();

  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  const audioRef = useRef(null);
  const audioRef1 = useRef(null);

  const isFinished = days + hours + minutes + seconds <= 0;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = false;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          audioRef.current.muted = false;
          audioRef.current.play();
        });
      }
    }
  }, []);

  useEffect(() => {
    if (isFinished && audioRef1.current) {
      audioRef1.current.muted = false;
      audioRef1.current.play().catch(() => {});
    }
  }, [isFinished]);

  return (
    <div
      className="app-container"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {isFinished && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}

      {/* Audio */}
      <audio
        ref={audioRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="audio-hidden"
      >
        <source src={audio1} type="audio/mp3" />
      </audio>

      {/* Finished sound */}
      <audio
        ref={audioRef1}
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

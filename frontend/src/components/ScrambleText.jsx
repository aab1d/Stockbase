import { useEffect, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const buildScramble = (text, lockedCount) => {
  return text
    .split("")
    .map((char, i) => {
      if (i < lockedCount) return char;
      return CHARS[Math.floor(Math.random() * CHARS.length)];
    })
    .join("");
};

const ScrambleText = ({ text, className }) => {
  const [display, setDisplay] = useState(text);
  const [lockedCount, setLockedCount] = useState(0);

  useEffect(() => {
    const flickerInterval = setInterval(() => {
      setDisplay(buildScramble(text, lockedCount));
    }, 50);
    return () => clearInterval(flickerInterval);
  }, [text, lockedCount]);

  useEffect(() => {
    if (lockedCount >= text.length) return;
    const lockInterval = setInterval(() => {
      setLockedCount((prev) => Math.min(prev + 1, text.length));
    }, 150);
    return () => clearInterval(lockInterval);
  }, [text, lockedCount]);

  return <span className={`font-mono ${className}`}>{display}</span>;
};

export default ScrambleText;

"use client";

import { useEffect, useState } from "react";

const roles = [
  "Cloud & DevOps Engineer ☁️⚙️",
  "Backend API Developer ⚡",
  "AWS Certified Solutions Architect 🟠",
  "Linux & System Administration Enthusiast 🐧",
  "Automation Practitioner 🤖",
];

function getArticle(text: string) {
  const firstLetter = text.trim().charAt(0).toLowerCase();
  return ["a", "e", "i", "o", "u"].includes(firstLetter) ? "an" : "a";
}

export default function AnimatedHeroText() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const currentRole = roles[roleIndex];
  const article = getArticle(currentRole);

  useEffect(() => {
    const typingSpeed = isDeleting ? 45 : 85;

    const timeout = setTimeout(() => {
      if (!isDeleting && displayText.length < currentRole.length) {
        setDisplayText(currentRole.slice(0, displayText.length + 1));
      } else if (!isDeleting && displayText.length === currentRole.length) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && displayText.length > 0) {
        setDisplayText(currentRole.slice(0, displayText.length - 1));
      } else if (isDeleting && displayText.length === 0) {
        setIsDeleting(false);
        setRoleIndex((previousIndex) => (previousIndex + 1) % roles.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex, currentRole]);

  return (
    <p className="mt-5 text-xl text-slate-300 md:text-2xl">
      I am {article}{" "}
      <span className="font-semibold text-cyan-300">{displayText}</span>
      <span className="ml-1 animate-pulse text-cyan-300">|</span>
    </p>
  );
}
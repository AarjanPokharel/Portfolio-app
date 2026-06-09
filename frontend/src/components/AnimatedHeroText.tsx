"use client";

import { useEffect, useState } from "react";
import { RoleIcon, getRoleIconColor } from "./Icons";

function getArticle(text: string): string {
  const first = text.trim().charAt(0).toLowerCase();
  return ["a", "e", "i", "o", "u"].includes(first) ? "an" : "a";
}

export type RoleItem = {
  text: string;
  icon: string;
};

// Fallback roles used when no data comes from the backend
const DEFAULT_ROLES: RoleItem[] = [
  { text: "Cloud & DevOps Engineer",              icon: "cloud"      },
  { text: "Backend API Developer",                icon: "backend"    },
  { text: "AWS Solutions Architect",              icon: "aws"        },
  { text: "Linux & Systems Enthusiast",           icon: "linux"      },
  { text: "Automation Practitioner",              icon: "automation" },
];

type Props = {
  roles?: RoleItem[];
};

export default function AnimatedHeroText({ roles }: Props) {
  const activeRoles = roles && roles.length > 0 ? roles : DEFAULT_ROLES;

  const [roleIndex,    setRoleIndex]    = useState(0);
  const [displayText,  setDisplayText]  = useState("");
  const [isDeleting,   setIsDeleting]   = useState(false);
  const [iconVisible,  setIconVisible]  = useState(true);

  const currentRole = activeRoles[roleIndex];

  // Typewriter effect
  useEffect(() => {
    const speed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting && displayText.length < currentRole.text.length) {
        setDisplayText(currentRole.text.slice(0, displayText.length + 1));
      } else if (!isDeleting && displayText.length === currentRole.text.length) {
        setTimeout(() => setIsDeleting(true), 1400);
      } else if (isDeleting && displayText.length > 0) {
        setDisplayText(currentRole.text.slice(0, displayText.length - 1));
      } else if (isDeleting && displayText.length === 0) {
        // Fade icon out, switch role, fade back in
        setIconVisible(false);
        setTimeout(() => {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % activeRoles.length);
          setIconVisible(true);
        }, 200);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole, activeRoles]);

  const colorClass = getRoleIconColor(currentRole.icon);
  const article = getArticle(currentRole.text);

  return (
    <div className="mt-5 flex flex-wrap items-center gap-3">
      {/* Icon badge — fades when role changes */}
      <span
        className={`inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl ring-1 transition-all duration-300 ${colorClass} ${
          iconVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
        }`}
      >
        <RoleIcon icon={currentRole.icon} className="h-4 w-4" />
      </span>

      {/* Typed text with prefix */}
      <p className="text-xl text-slate-300 md:text-2xl">
        I am {article}{" "}
        <span className="font-semibold text-white">{displayText}</span>
        <span className="ml-0.5 animate-pulse text-cyan-400">|</span>
      </p>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';

interface TypingRoleProps {
  roles: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

export default function TypingRole({
  roles,
  typingSpeed = 90,
  deletingSpeed = 45,
  pauseDuration = 1800,
  className = '',
}: TypingRoleProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!roles || roles.length === 0) return;

    const currentRole = roles[roleIndex % roles.length];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      // Typing phase
      if (displayText.length < currentRole.length) {
        timer = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        // Finished typing full word, pause before deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      // Deleting phase
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length - 1));
        }, deletingSpeed);
      } else {
        // Finished deleting, move to next role
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, roles, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className={`inline-flex items-center min-h-[1.5em] ${className}`}>
      <span className="inline-block">{displayText || '\u00A0'}</span>
      <span className="ml-1 inline-block w-2 sm:w-2.5 h-5 sm:h-6 bg-[#38bdf8] animate-pulse opacity-90 shrink-0" />
    </span>
  );
}

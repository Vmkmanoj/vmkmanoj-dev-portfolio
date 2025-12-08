import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface DecryptedTextProps {
  text: string;
  className?: string;
  speed?: number;
  characters?: string;
}

export function DecryptedText({
  text,
  className = '',
  speed = 50,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*',
}: DecryptedTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!containerRef.current || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            animateText();
          }
        });
      },
      { threshold: 0.1 }
    );

    const animateText = () => {
      if (!containerRef.current) return;
      
      const element = containerRef.current;
      const originalText = text;
      let iteration = 0;

      const interval = setInterval(() => {
        element.innerText = originalText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return originalText[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('');

        if (iteration >= originalText.length) {
          clearInterval(interval);
        }

        iteration += 1 / 3;
      }, speed);
    };

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [text, speed, characters]);

  return (
    <span ref={containerRef} className={`font-mono ${className}`}>
      {text}
    </span>
  );
}

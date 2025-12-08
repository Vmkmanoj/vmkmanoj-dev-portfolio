import { useRef, useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}

export function BlurText({
  text,
  className = '',
  delay = 100,
  duration = 0.8,
}: BlurTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!containerRef.current || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            const chars = containerRef.current?.querySelectorAll('.blur-char');
            if (chars) {
              gsap.fromTo(
                chars,
                { 
                  opacity: 0, 
                  filter: 'blur(20px)',
                  y: 20,
                },
                {
                  opacity: 1,
                  filter: 'blur(0px)',
                  y: 0,
                  duration,
                  ease: 'power2.out',
                  stagger: delay / 1000,
                }
              );
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [delay, duration]);

  return (
    <span ref={containerRef} className={`inline-flex flex-wrap ${className}`}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="blur-char inline-block opacity-0"
          style={{ 
            filter: 'blur(20px)',
            whiteSpace: char === ' ' ? 'pre' : 'normal'
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

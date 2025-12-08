import { useRef, useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: 'chars' | 'words';
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

export function SplitText({
  text,
  className = '',
  delay = 50,
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  tag: Tag = 'p',
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!containerRef.current || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            const elements = containerRef.current?.querySelectorAll('.split-item');
            if (elements) {
              gsap.fromTo(
                elements,
                from,
                {
                  ...to,
                  duration,
                  ease,
                  stagger: delay / 1000,
                }
              );
            }
          }
        });
      },
      { threshold }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [delay, duration, ease, from, to, threshold]);

  const items = splitType === 'chars' ? text.split('') : text.split(' ');

  return (
    <Tag ref={containerRef as any} className={`inline-flex flex-wrap ${className}`}>
      {items.map((item, index) => (
        <span
          key={index}
          className="split-item inline-block opacity-0"
          style={{ whiteSpace: item === ' ' ? 'pre' : 'normal' }}
        >
          {item === ' ' ? '\u00A0' : item}
          {splitType === 'words' && index < items.length - 1 && '\u00A0'}
        </span>
      ))}
    </Tag>
  );
}

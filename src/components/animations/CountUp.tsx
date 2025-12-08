import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface CountUpProps {
  end: number;
  start?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  decimals?: number;
}

export function CountUp({
  end,
  start = 0,
  duration = 2,
  suffix = '',
  prefix = '',
  className = '',
  decimals = 0,
}: CountUpProps) {
  const countRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);
  const [displayValue, setDisplayValue] = useState(start);

  useEffect(() => {
    if (!countRef.current || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            
            const obj = { value: start };
            gsap.to(obj, {
              value: end,
              duration,
              ease: 'power2.out',
              onUpdate: () => {
                setDisplayValue(obj.value);
              },
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(countRef.current);
    return () => observer.disconnect();
  }, [start, end, duration]);

  return (
    <span ref={countRef} className={className}>
      {prefix}
      {displayValue.toFixed(decimals)}
      {suffix}
    </span>
  );
}

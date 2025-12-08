import { useRef, useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
}

export function GradientText({
  children,
  className = '',
  colors = ['#14b8a6', '#06b6d4', '#3b82f6', '#14b8a6'],
  animationSpeed = 3,
}: GradientTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const gradient = textRef.current;
    let progress = 0;

    const animate = () => {
      progress += 0.5;
      if (progress >= 360) progress = 0;
      gradient.style.backgroundPosition = `${progress}% 50%`;
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [animationSpeed]);

  return (
    <span
      ref={textRef}
      className={`bg-clip-text text-transparent bg-[length:200%_200%] ${className}`}
      style={{
        backgroundImage: `linear-gradient(90deg, ${colors.join(', ')})`,
      }}
    >
      {children}
    </span>
  );
}

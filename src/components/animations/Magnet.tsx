import { useRef, ReactNode, MouseEvent } from 'react';
import { gsap } from 'gsap';

interface MagnetProps {
  children: ReactNode;
  className?: string;
  padding?: number;
  disabled?: boolean;
  magnetStrength?: number;
}

export function Magnet({
  children,
  className = '',
  padding = 100,
  disabled = false,
  magnetStrength = 0.5,
}: MagnetProps) {
  const magnetRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (disabled || !magnetRef.current) return;

    const rect = magnetRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;

    gsap.to(magnetRef.current, {
      x: distX * magnetStrength,
      y: distY * magnetStrength,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (disabled || !magnetRef.current) return;

    gsap.to(magnetRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  return (
    <div
      ref={magnetRef}
      className={`inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ padding }}
    >
      {children}
    </div>
  );
}

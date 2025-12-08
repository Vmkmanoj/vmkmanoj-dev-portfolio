import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowDown, Download, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SplitText } from '@/components/animations/SplitText';
import { BlurText } from '@/components/animations/BlurText';
import { GradientText } from '@/components/animations/GradientText';
import { Magnet } from '@/components/animations/Magnet';
import { DecryptedText } from '@/components/animations/DecryptedText';

// Animated particles background
function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const count = Math.floor((canvas.width * canvas.height) / 15000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(174, 72%, 50%, ${p.opacity})`;
        ctx.fill();
      });

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `hsla(174, 72%, 50%, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(drawParticles);
    };

    resize();
    createParticles();
    drawParticles();

    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}

// Animated floating shapes
function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl animate-blob" />
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-accent/15 rounded-full filter blur-3xl animate-blob animation-delay-2000" />
      <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl animate-blob animation-delay-4000" />
    </div>
  );
}

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Delay content appearance for dramatic effect
    const timer = setTimeout(() => setShowContent(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero"
    >
      {/* Animated Background */}
      <ParticlesBackground />
      <FloatingShapes />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {showContent && (
            <>
              {/* Greeting with Decrypted Effect */}
              <div className="mb-6">
                <span className="text-primary font-medium text-sm md:text-base tracking-wider uppercase">
                  <DecryptedText text="Hello, I'm" speed={40} />
                </span>
              </div>

              {/* Name with Split Text Animation */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6">
                <SplitText
                  text="John "
                  className="text-foreground"
                  delay={60}
                  duration={0.8}
                  ease="power3.out"
                  from={{ opacity: 0, y: 60, rotateX: -90 }}
                  to={{ opacity: 1, y: 0, rotateX: 0 }}
                />
                <GradientText
                  colors={['#14b8a6', '#06b6d4', '#0ea5e9', '#14b8a6']}
                  className="font-display font-bold"
                >
                  <SplitText
                    text="Developer"
                    delay={60}
                    duration={0.8}
                    ease="power3.out"
                    from={{ opacity: 0, y: 60, rotateX: -90 }}
                    to={{ opacity: 1, y: 0, rotateX: 0 }}
                  />
                </GradientText>
              </h1>

              {/* Tagline with Blur Text */}
              <div className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-4">
                <BlurText text="Full-Stack Developer" delay={80} duration={0.6} />
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-8">
                {['Java', 'React', 'Node.js', 'TypeScript', 'MongoDB'].map((tech, index) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 md:px-4 md:py-2 bg-secondary/80 backdrop-blur-sm rounded-full text-xs md:text-sm font-medium text-secondary-foreground border border-border/50 opacity-0 animate-fade-in"
                    style={{ animationDelay: `${800 + index * 100}ms`, animationFillMode: 'forwards' }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p
                className="text-muted-foreground max-w-2xl mx-auto mb-10 text-sm md:text-base leading-relaxed opacity-0 animate-fade-in"
                style={{ animationDelay: '1300ms', animationFillMode: 'forwards' }}
              >
                I craft elegant, scalable web applications with clean code and modern technologies.
                Passionate about creating seamless user experiences and robust backend systems.
              </p>

              {/* CTA Buttons with Magnet Effect */}
              <div
                className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in"
                style={{ animationDelay: '1500ms', animationFillMode: 'forwards' }}
              >
                <Magnet magnetStrength={0.3} padding={10}>
                  <Button variant="hero" size="lg" asChild>
                    <a href="#contact">
                      <Mail className="mr-2 h-5 w-5" />
                      Hire Me
                    </a>
                  </Button>
                </Magnet>
                <Magnet magnetStrength={0.3} padding={10}>
                  <Button variant="heroOutline" size="lg" asChild>
                    <a href="/resume.pdf" download>
                      <Download className="mr-2 h-5 w-5" />
                      Download Resume
                    </a>
                  </Button>
                </Magnet>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors opacity-0 animate-fade-in"
        style={{ animationDelay: '2000ms', animationFillMode: 'forwards' }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <ArrowDown className="h-5 w-5 animate-bounce" />
        </div>
      </a>
    </section>
  );
}

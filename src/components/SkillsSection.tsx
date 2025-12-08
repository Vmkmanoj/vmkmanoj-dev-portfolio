import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { SplitText } from '@/components/animations/SplitText';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { CountUp } from '@/components/animations/CountUp';

interface Skill {
  name: string;
  level: number;
  color: string;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React', level: 95, color: 'hsl(197, 71%, 52%)' },
      { name: 'TypeScript', level: 90, color: 'hsl(211, 60%, 48%)' },
      { name: 'Next.js', level: 85, color: 'hsl(174, 72%, 50%)' },
      { name: 'Tailwind', level: 92, color: 'hsl(198, 93%, 60%)' },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', level: 90, color: 'hsl(120, 25%, 45%)' },
      { name: 'Java', level: 88, color: 'hsl(18, 94%, 50%)' },
      { name: 'Python', level: 75, color: 'hsl(207, 51%, 44%)' },
      { name: 'Express', level: 88, color: 'hsl(174, 72%, 50%)' },
    ],
  },
  {
    title: 'Database',
    skills: [
      { name: 'MongoDB', level: 85, color: 'hsl(120, 41%, 42%)' },
      { name: 'PostgreSQL', level: 82, color: 'hsl(206, 56%, 40%)' },
      { name: 'Redis', level: 78, color: 'hsl(0, 68%, 52%)' },
      { name: 'MySQL', level: 80, color: 'hsl(198, 100%, 35%)' },
    ],
  },
  {
    title: 'DevOps',
    skills: [
      { name: 'Docker', level: 82, color: 'hsl(207, 77%, 54%)' },
      { name: 'AWS', level: 75, color: 'hsl(29, 100%, 50%)' },
      { name: 'CI/CD', level: 80, color: 'hsl(174, 72%, 40%)' },
      { name: 'Git', level: 95, color: 'hsl(10, 75%, 50%)' },
    ],
  },
];

function AnimatedCircularProgress({ skill, index }: { skill: Skill; index: number }) {
  const circleRef = useRef<SVGCircleElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  
  const radius = 38;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (!circleRef.current || !containerRef.current || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            
            gsap.fromTo(
              circleRef.current,
              { strokeDashoffset: circumference },
              {
                strokeDashoffset: circumference - (skill.level / 100) * circumference,
                duration: 1.5,
                delay: index * 0.1,
                ease: 'power3.out',
              }
            );
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [skill.level, circumference, index]);

  return (
    <div ref={containerRef} className="flex flex-col items-center group">
      <div className="relative w-24 h-24 md:w-28 md:h-28">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            className="text-secondary"
          />
          {/* Glow effect */}
          <circle
            ref={circleRef}
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={skill.color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            className="drop-shadow-[0_0_8px_currentColor] transition-all duration-300 group-hover:drop-shadow-[0_0_15px_currentColor]"
            style={{ filter: `drop-shadow(0 0 6px ${skill.color})` }}
          />
        </svg>
        {/* Percentage */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-display font-bold text-foreground">
            <CountUp end={skill.level} duration={1.5} suffix="%" />
          </span>
        </div>
      </div>
      <span className="mt-3 text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
        {skill.name}
      </span>
    </div>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="section-heading mb-4">
              <SplitText text="My " className="text-foreground" delay={50} />
              <span className="text-gradient">
                <SplitText text="Skills" delay={50} />
              </span>
            </h2>
            <p className="section-subheading mx-auto">
              Technologies and tools I work with on a daily basis
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <ScrollReveal
              key={category.title}
              direction="up"
              delay={categoryIndex * 0.15}
            >
              <div className="card-glass rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-lg font-display font-semibold text-foreground text-center mb-6">
                  {category.title}
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  {category.skills.map((skill, skillIndex) => (
                    <AnimatedCircularProgress
                      key={skill.name}
                      skill={skill}
                      index={categoryIndex * 4 + skillIndex}
                    />
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useRef } from 'react';
import { Code2, Server, Database, Cloud, Smartphone, GitBranch } from 'lucide-react';
import { SplitText } from '@/components/animations/SplitText';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { CountUp } from '@/components/animations/CountUp';
import { TiltCard } from '@/components/animations/TiltCard';

const skills = [
  { name: 'Frontend Development', level: 95, icon: Code2 },
  { name: 'Backend Development', level: 90, icon: Server },
  { name: 'Database Design', level: 85, icon: Database },
  { name: 'Cloud & DevOps', level: 80, icon: Cloud },
  { name: 'Version Control', level: 95, icon: GitBranch },
];

const techStack = [
  { name: 'React', category: 'Frontend' },
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'Next.js', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Express', category: 'Backend' },
  { name: 'Java', category: 'Backend' },
  { name: 'Spring Boot', category: 'Backend' },
  { name: 'MongoDB', category: 'Database' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'AWS', category: 'DevOps' },
  { name: 'Git', category: 'Tools' },
];

function AnimatedSkillBar({ skill, index }: { skill: typeof skills[0]; index: number }) {
  const Icon = skill.icon;

  return (
    <ScrollReveal direction="left" delay={index * 0.1}>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">{skill.name}</span>
          </div>
          <span className="text-sm font-display font-semibold text-primary">
          </span>
        </div>

      </div>
    </ScrollReveal>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="section-heading mb-4">
              <SplitText
                text="About "
                className="text-foreground"
                delay={50}
                duration={0.6}
              />
              <span className="text-gradient">
                <SplitText
                  text="Me"
                  delay={50}
                  duration={0.6}
                />
              </span>
            </h2>
            <p className="section-subheading mx-auto">
              A passionate developer with expertise in building modern web applications
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* About Text */}
          <div className="space-y-6">
            <ScrollReveal direction="left">
              <TiltCard className="card-glass rounded-2xl p-6 md:p-8">
                <h3 className="text-xl font-display font-semibold mb-4 text-foreground">
                  My Journey
                </h3>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    With a strong foundation in full-stack development and hands-on experience across real-world projects, I’ve built scalable and user-centric applications for both startups and enterprise teams.
                  </p>
                  <p>
                    I specialize in developing B2B and B2C platforms, including Interview-as-a-Service (IaaS) solutions where I’ve contributed to features like dashboards, interview copilots, filtering systems, candidate identification displays, and workflow enhancements. I’ve also worked on building intelligent chatbots using modern frameworks and AI integrations
                  </p>
                  <p>
                    My technical expertise spans React, Next.js, Node.js, Flask, PostgreSQL, and cloud technologies, enabling me to deliver robust frontend experiences and efficient backend architectures. Over the years, I've developed various products including e-commerce platforms, student management systems, placement training applications, and greenhouse gas emission tracking tools.
                  </p>
                  <p>
                    I’m passionate about creating elegant solutions that solve real problems—whether it's designing intuitive UI/UX, optimizing performance, integrating AI-driven features, or improving data flows across systems.
                  </p>
                  <p>When I’m not coding, I enjoy exploring new technologies, experimenting with AI tools, contributing to open-source concepts, and sharing knowledge through mentorship and technical discussions. I’m passionate about creating elegant solutions that solve real problems—whether it's designing intuitive UI/UX, optimizing performance, integrating AI-driven features, or improving data flows across systems.
                  </p>
                </div>
              </TiltCard>
            </ScrollReveal>

            {/* Tech Stack Grid */}
            <ScrollReveal direction="left" delay={0.2}>
              <TiltCard className="card-glass rounded-2xl p-6 md:p-8">
                <h3 className="text-xl font-display font-semibold mb-4 text-foreground">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech, index) => (
                    <span
                      key={tech.name}
                      className="px-3 py-1.5 bg-secondary hover:bg-primary hover:text-primary-foreground rounded-lg text-sm font-medium text-secondary-foreground border border-border transition-all duration-300 cursor-default hover:scale-105"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </ScrollReveal>
          </div>

          {/* Skills */}
          <ScrollReveal direction="right">
            <TiltCard className="card-glass rounded-2xl p-6 md:p-8" maxTilt={5}>
              <h3 className="text-xl font-display font-semibold mb-6 text-foreground">
                Skills & Expertise
              </h3>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <AnimatedSkillBar key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </TiltCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

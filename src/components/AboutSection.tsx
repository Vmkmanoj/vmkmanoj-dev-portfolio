import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Server, Database, Cloud, Smartphone, GitBranch } from 'lucide-react';

const skills = [
  { name: 'Frontend Development', level: 95, icon: Code2 },
  { name: 'Backend Development', level: 90, icon: Server },
  { name: 'Database Design', level: 85, icon: Database },
  { name: 'Cloud & DevOps', level: 80, icon: Cloud },
  { name: 'Mobile Development', level: 75, icon: Smartphone },
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
  { name: 'Redis', category: 'Database' },
  { name: 'Docker', category: 'DevOps' },
  { name: 'AWS', category: 'DevOps' },
  { name: 'Git', category: 'Tools' },
];

function SkillBar({ skill, index }: { skill: typeof skills[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const Icon = skill.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="space-y-2"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground">{skill.name}</span>
        </div>
        <span className="text-sm text-muted-foreground">{skill.level}%</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : {}}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.8, ease: 'easeOut' }}
          className="h-full bg-gradient-primary rounded-full"
        />
      </div>
    </motion.div>
  );
}

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="section-subheading mx-auto">
            A passionate developer with expertise in building modern web applications
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-6"
          >
            <div className="card-glass rounded-2xl p-6 md:p-8">
              <h3 className="text-xl font-display font-semibold mb-4 text-foreground">
                My Journey
              </h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  With over 5 years of experience in software development, I've had the privilege
                  of working on diverse projects ranging from startups to enterprise applications.
                </p>
                <p>
                  I specialize in building scalable web applications using modern technologies
                  like React, Node.js, and cloud services. My passion lies in creating elegant
                  solutions that solve real-world problems.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new technologies, contributing
                  to open-source projects, or sharing knowledge through technical writing.
                </p>
              </div>
            </div>

            {/* Tech Stack Grid */}
            <div className="card-glass rounded-2xl p-6 md:p-8">
              <h3 className="text-xl font-display font-semibold mb-4 text-foreground">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, index) => (
                  <motion.span
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="px-3 py-1.5 bg-secondary hover:bg-primary hover:text-primary-foreground rounded-lg text-sm font-medium text-secondary-foreground border border-border transition-colors cursor-default"
                  >
                    {tech.name}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="card-glass rounded-2xl p-6 md:p-8"
          >
            <h3 className="text-xl font-display font-semibold mb-6 text-foreground">
              Skills & Expertise
            </h3>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <SkillBar key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

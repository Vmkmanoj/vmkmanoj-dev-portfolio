import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

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
      { name: 'Next.js', level: 85, color: 'hsl(0, 0%, 20%)' },
      { name: 'Tailwind', level: 92, color: 'hsl(198, 93%, 60%)' },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', level: 90, color: 'hsl(120, 25%, 45%)' },
      { name: 'Java', level: 88, color: 'hsl(18, 94%, 50%)' },
      { name: 'Python', level: 75, color: 'hsl(207, 51%, 44%)' },
      { name: 'Express', level: 88, color: 'hsl(0, 0%, 30%)' },
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

function CircularProgress({ skill, index }: { skill: Skill; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (skill.level / 100) * circumference;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="flex flex-col items-center"
    >
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
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={skill.color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset } : {}}
            transition={{ delay: index * 0.1 + 0.3, duration: 1, ease: 'easeOut' }}
          />
        </svg>
        {/* Percentage */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="text-lg font-display font-semibold text-foreground">
            {skill.level}%
          </span>
        </motion.div>
      </div>
      <span className="mt-3 text-sm font-medium text-muted-foreground">{skill.name}</span>
    </motion.div>
  );
}

export function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading mb-4">
            My <span className="text-gradient">Skills</span>
          </h2>
          <p className="section-subheading mx-auto">
            Technologies and tools I work with on a daily basis
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: categoryIndex * 0.15, duration: 0.5 }}
              className="card-glass rounded-2xl p-6"
            >
              <h3 className="text-lg font-display font-semibold text-foreground text-center mb-6">
                {category.title}
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {category.skills.map((skill, skillIndex) => (
                  <CircularProgress
                    key={skill.name}
                    skill={skill}
                    index={categoryIndex * 4 + skillIndex}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

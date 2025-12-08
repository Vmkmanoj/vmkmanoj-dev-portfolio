import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, GraduationCap, Calendar } from 'lucide-react';

interface TimelineItem {
  id: number;
  type: 'work' | 'education';
  title: string;
  organization: string;
  location: string;
  period: string;
  description: string;
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    type: 'work',
    title: 'Senior Full-Stack Developer',
    organization: 'Tech Solutions Inc.',
    location: 'San Francisco, CA',
    period: '2022 - Present',
    description: 'Leading development of enterprise web applications, mentoring junior developers, and implementing best practices for scalable architecture.',
  },
  {
    id: 2,
    type: 'work',
    title: 'Full-Stack Developer',
    organization: 'StartUp Hub',
    location: 'New York, NY',
    period: '2020 - 2022',
    description: 'Built and maintained multiple client projects using React, Node.js, and AWS. Collaborated with cross-functional teams to deliver high-quality solutions.',
  },
  {
    id: 3,
    type: 'education',
    title: 'Master of Computer Science',
    organization: 'MIT',
    location: 'Cambridge, MA',
    period: '2018 - 2020',
    description: 'Specialized in Software Engineering and Distributed Systems. Published research on microservices architecture patterns.',
  },
  {
    id: 4,
    type: 'work',
    title: 'Junior Developer',
    organization: 'Digital Agency',
    location: 'Boston, MA',
    period: '2018 - 2020',
    description: 'Developed responsive websites and web applications. Gained experience in Agile methodologies and version control systems.',
  },
  {
    id: 5,
    type: 'education',
    title: 'Bachelor of Computer Science',
    organization: 'Stanford University',
    location: 'Stanford, CA',
    period: '2014 - 2018',
    description: 'Graduated with honors. Active member of the Computer Science Club and participated in multiple hackathons.',
  },
];

function TimelineCard({ item, index, isLeft }: { item: TimelineItem; index: number; isLeft: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className={`relative flex items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Content */}
      <div className={`w-full md:w-1/2 ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}>
        <div className="card-glass rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2 rounded-lg ${item.type === 'work' ? 'bg-primary/10' : 'bg-accent/10'}`}>
              {item.type === 'work' ? (
                <Briefcase className="h-5 w-5 text-primary" />
              ) : (
                <GraduationCap className="h-5 w-5 text-accent" />
              )}
            </div>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {item.period}
            </span>
          </div>
          <h3 className="text-lg font-display font-semibold text-foreground mb-1">
            {item.title}
          </h3>
          <p className="text-primary font-medium text-sm mb-2">
            {item.organization}
          </p>
          <p className="text-xs text-muted-foreground mb-3">{item.location}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>

      {/* Timeline Dot - Hidden on mobile, shown on md+ */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background z-10" />
    </motion.div>
  );
}

export function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading mb-4">
            Experience & <span className="text-gradient">Education</span>
          </h2>
          <p className="section-subheading mx-auto">
            My professional journey and academic background
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line - Hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />

          <div className="space-y-8 md:space-y-12">
            {timelineData.map((item, index) => (
              <TimelineCard
                key={item.id}
                item={item}
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { Briefcase, GraduationCap, Calendar } from 'lucide-react';
import { SplitText } from '@/components/animations/SplitText';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { TiltCard } from '@/components/animations/TiltCard';

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
  return (
    <div className={`relative flex items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
      {/* Content */}
      <div className={`w-full md:w-1/2 ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}>
        <ScrollReveal direction={isLeft ? 'left' : 'right'} delay={index * 0.1}>
          <TiltCard maxTilt={5}>
            <div className="card-glass rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg transition-colors duration-300 ${
                  item.type === 'work' 
                    ? 'bg-primary/10 group-hover:bg-primary/20' 
                    : 'bg-accent/10 group-hover:bg-accent/20'
                }`}>
                  {item.type === 'work' ? (
                    <Briefcase className="h-5 w-5 text-primary" />
                  ) : (
                    <GraduationCap className="h-5 w-5 text-primary" />
                  )}
                </div>
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {item.period}
                </span>
              </div>
              <h3 className="text-lg font-display font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
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
          </TiltCard>
        </ScrollReveal>
      </div>

      {/* Timeline Dot - Hidden on mobile */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background z-10 shadow-[0_0_10px_hsl(var(--primary)/0.5)]" />
    </div>
  );
}

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="section-heading mb-4">
              <SplitText text="Experience & " className="text-foreground" delay={50} />
              <span className="text-gradient">
                <SplitText text="Education" delay={50} />
              </span>
            </h2>
            <p className="section-subheading mx-auto">
              My professional journey and academic background
            </p>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line with Gradient - Hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2">
            <div className="w-full h-full bg-gradient-to-b from-primary via-primary/50 to-primary" />
          </div>

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

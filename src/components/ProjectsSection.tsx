import { useState } from 'react';
import { ExternalLink, Github, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SplitText } from '@/components/animations/SplitText';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { TiltCard } from '@/components/animations/TiltCard';
import { Magnet } from '@/components/animations/Magnet';

type ProjectCategory = 'all' | 'frontend' | 'backend' | 'fullstack';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: ProjectCategory;
  liveUrl?: string;
  githubUrl?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform with real-time inventory, payment processing, and admin dashboard.',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=600&h=400&fit=crop',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    category: 'fullstack',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'Collaborative project management tool with real-time updates, kanban boards, and team analytics.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL'],
    category: 'fullstack',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description: 'Beautiful weather app with 7-day forecast, location search, and animated weather conditions.',
    image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=600&h=400&fit=crop',
    tags: ['React', 'Tailwind', 'Weather API'],
    category: 'frontend',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 4,
    title: 'RESTful API Service',
    description: 'Scalable microservices architecture with authentication, rate limiting, and comprehensive documentation.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop',
    tags: ['Node.js', 'Express', 'Redis', 'Docker'],
    category: 'backend',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 5,
    title: 'Portfolio Template',
    description: 'Modern, animated portfolio template with dark mode, smooth scrolling, and contact form.',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop',
    tags: ['React', 'Framer Motion', 'Tailwind'],
    category: 'frontend',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 6,
    title: 'Real-time Chat API',
    description: 'WebSocket-based chat server with rooms, file sharing, and message persistence.',
    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=600&h=400&fit=crop',
    tags: ['Node.js', 'Socket.io', 'MongoDB'],
    category: 'backend',
    liveUrl: '#',
    githubUrl: '#',
  },
];

const filters: { label: string; value: ProjectCategory }[] = [
  { label: 'All', value: 'all' },
  { label: 'Frontend', value: 'frontend' },
  { label: 'Backend', value: 'backend' },
  { label: 'Full-Stack', value: 'fullstack' },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <ScrollReveal direction="up" delay={index * 0.1}>
      <TiltCard className="h-full" maxTilt={8}>
        <article className="group card-glass rounded-2xl overflow-hidden h-full flex flex-col">
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-80" />
            
            {/* Overlay Links */}
            <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-background/70 backdrop-blur-sm">
              {project.liveUrl && (
                <Magnet magnetStrength={0.5} padding={5}>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:scale-110 transition-transform"
                    aria-label="View live demo"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </Magnet>
              )}
              {project.githubUrl && (
                <Magnet magnetStrength={0.5} padding={5}>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-secondary text-secondary-foreground rounded-full shadow-lg hover:scale-110 transition-transform"
                    aria-label="View source code"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </Magnet>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex-1 flex flex-col">
            <div className="flex items-start gap-3 mb-3">
              <Folder className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <h3 className="text-lg font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                {project.title}
              </h3>
            </div>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-secondary/50 rounded text-xs font-medium text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </article>
      </TiltCard>
    </ScrollReveal>
  );
}

export function ProjectsSection() {
  const [filter, setFilter] = useState<ProjectCategory>('all');

  const filteredProjects = projects.filter(
    (project) => filter === 'all' || project.category === filter
  );

  return (
    <section id="projects" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="section-heading mb-4">
              <SplitText text="Featured " className="text-foreground" delay={50} />
              <span className="text-gradient">
                <SplitText text="Projects" delay={50} />
              </span>
            </h2>
            <p className="section-subheading mx-auto">
              A selection of my recent work and personal projects
            </p>
          </div>
        </ScrollReveal>

        {/* Filters */}
        <ScrollReveal delay={0.2}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {filters.map((item) => (
              <Magnet key={item.value} magnetStrength={0.2} padding={5}>
                <Button
                  variant={filter === item.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter(item.value)}
                  className="rounded-full"
                >
                  {item.label}
                </Button>
              </Magnet>
            ))}
          </div>
        </ScrollReveal>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

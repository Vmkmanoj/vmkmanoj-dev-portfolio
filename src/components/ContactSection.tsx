import { useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { SplitText } from '@/components/animations/SplitText';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { TiltCard } from '@/components/animations/TiltCard';
import { Magnet } from '@/components/animations/Magnet';
import emailjs from '@emailjs/browser';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'vmkmano13@gmail.com', href: 'mailto:vmkmano13@gmail.com' },
  { icon: MapPin, label: 'Location', value: 'Chennai', href: '#' },
];

const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/Vmkmanoj' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/manojkumar-v-680683298?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
];

export function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitting(true);

  emailjs
    .sendForm(
      "service_9hlx3sj",
      "template_kzcqf9o",
      formRef.current!,
      "CqfGWMMGUdafG330w"
    )
    .then(
      () => {
        toast.success("Message sent!");
        setIsSubmitting(false);
        setFormData({ name: "", email: "", subject: "", message: "" });
      },
      () => {
        toast.error("Something went wrong.");
        setIsSubmitting(false);
      }
    );
};


  return (
    <section id="contact" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="section-heading mb-4">
              <SplitText text="Get In " className="text-foreground" delay={50} />
              <span className="text-gradient">
                <SplitText text="Touch" delay={50} />
              </span>
            </h2>
            <p className="section-subheading mx-auto">
              Have a project in mind? Let's work together to bring your ideas to life.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <ScrollReveal direction="left">
              <TiltCard className="card-glass rounded-2xl p-6 md:p-8" maxTilt={5}>
                <h3 className="text-xl font-display font-semibold mb-6 text-foreground">
                  Contact Information
                </h3>
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex items-center gap-4 group"
                    >
                      <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        <p className="text-foreground font-medium group-hover:text-primary transition-colors">
                          {item.value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </TiltCard>
            </ScrollReveal>

            {/* Social Links */}
            <ScrollReveal direction="left" delay={0.1}>
              <TiltCard className="card-glass rounded-2xl p-6 md:p-8" maxTilt={5}>
                <h3 className="text-xl font-display font-semibold mb-6 text-foreground">
                  Follow Me
                </h3>
                <div className="flex gap-4 overflow-visible">
  {socialLinks.map((social) => (
    <Magnet key={social.label} magnetStrength={0.4} padding={5}>
      <a
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        className="p-4 bg-secondary hover:bg-primary hover:text-primary-foreground
                   rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg
                   flex items-center justify-center overflow-visible"
        aria-label={social.label}
      >
        <social.icon className="h-5 w-5 text-foreground" />
      </a>
    </Magnet>
  ))}
</div>

              </TiltCard>
            </ScrollReveal>
          </div>

          {/* Contact Form */}
          <ScrollReveal direction="right">
            <TiltCard className="card-glass rounded-2xl p-6 md:p-8" maxTilt={3}>
              <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="group">
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 text-foreground placeholder:text-muted-foreground hover:border-primary/50"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 text-foreground placeholder:text-muted-foreground hover:border-primary/50"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 text-foreground placeholder:text-muted-foreground hover:border-primary/50"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 resize-none text-foreground placeholder:text-muted-foreground hover:border-primary/50"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <Magnet magnetStrength={0.2} padding={0} className="w-full">
                  <Button
                    type="submit"
                    variant="gradient"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="h-5 w-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </Magnet>
              </form>
            </TiltCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

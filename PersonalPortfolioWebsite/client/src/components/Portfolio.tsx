import { useEffect, useRef, useState } from "react";

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const skillsRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const experienceRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    // Initialize portfolio JavaScript functionality
    const script = document.createElement('script');
    script.src = '/src/lib/portfolio.js';
    script.type = 'module';
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters long";
    }
    
    if (!validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters long";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    }, 2000);
  };

  const scrollToSection = (ref) => {
    if (ref.current) {
      const headerOffset = 80;
      const elementPosition = ref.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Animated Background */}
      <div className="bg-animation">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      {/* Navigation */}
      <nav id="navbar" role="navigation" aria-label="Main navigation">
        <div className="nav-container">
          <a href="#" className="logo" aria-label="Zinedine Firmansyah Portfolio Home">
            <span>ZF</span>
          </a>
          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`} role="menubar">
            <li role="none">
              <a href="#about" role="menuitem" onClick={(e) => { e.preventDefault(); scrollToSection(aboutRef); }}>
                About
              </a>
            </li>
            <li role="none">
              <a href="#skills" role="menuitem" onClick={(e) => { e.preventDefault(); scrollToSection(skillsRef); }}>
                Skills
              </a>
            </li>
            <li role="none">
              <a href="#projects" role="menuitem" onClick={(e) => { e.preventDefault(); scrollToSection(projectsRef); }}>
                Projects
              </a>
            </li>
            <li role="none">
              <a href="#contact" role="menuitem" onClick={(e) => { e.preventDefault(); scrollToSection(contactRef); }}>
                Contact
              </a>
            </li>
          </ul>
          <button 
            className={`mobile-menu-toggle ${isMenuOpen ? 'active' : ''}`} 
            aria-label="Toggle mobile menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="hero" id="home">
          <div className="floating-shapes" aria-hidden="true">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
            <div className="shape shape-5"></div>
          </div>
          <div className="hero-content">
            <div className="hero-badge">
              <i className="fas fa-rocket"></i>
              <span>Available for new opportunities</span>
            </div>
            <h1>
              <span className="greeting">Hello, I'm</span>
              <span className="name">Zinedine Firmansyah</span>
              <span className="title">Full Stack Developer & Creative Technologist</span>
            </h1>
            <p className="hero-description">
              Crafting exceptional digital experiences through innovative code, intuitive design, and cutting-edge technology solutions that drive real business impact.
            </p>
            <div className="hero-actions">
              <a 
                href="#contact" 
                className="cta-button primary"
                onClick={(e) => { e.preventDefault(); scrollToSection(contactRef); }}
              >
                <span>Let's Work Together</span>
                <i className="fas fa-arrow-right"></i>
              </a>
              <a 
                href="#projects" 
                className="cta-button secondary"
                onClick={(e) => { e.preventDefault(); scrollToSection(projectsRef); }}
              >
                <span>View My Work</span>
                <i className="fas fa-external-link-alt"></i>
              </a>
            </div>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="GitHub Profile">
                <i className="fab fa-github"></i>
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn Profile">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="social-link" aria-label="Twitter Profile">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-link" aria-label="Email Contact">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about fade-in" ref={aboutRef}>
          <div className="section-container">
            <div className="section-header">
              <span className="section-tag">Get to know me</span>
              <h2 className="section-title">About Me</h2>
              <p className="section-subtitle">Passionate about creating digital solutions that make a difference</p>
            </div>
            <div className="about-content">
              <div className="about-image-container-small">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400" 
                  alt="Zinedine Firmansyah - Professional Developer" 
                  className="about-image-small" 
                />
              </div>
              <div className="about-text">
                <div className="about-intro">
                  <h3>Passionate Developer & Problem Solver</h3>
                  <p>I'm a full-stack developer with 5+ years of experience creating web applications that solve real-world problems. I specialize in modern JavaScript frameworks and have a keen eye for user experience design.</p>
                  <p>When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, mentoring junior developers, or sharing knowledge with the tech community through writing and speaking.</p>
                </div>
                <div className="about-actions">
                  <a 
                    href="#contact" 
                    className="btn-outline"
                    onClick={(e) => { e.preventDefault(); scrollToSection(contactRef); }}
                  >
                    <span>Get In Touch</span>
                    <i className="fas fa-arrow-right"></i>
                  </a>
                  <a href="#" className="btn-text">
                    <span>Download Resume</span>
                    <i className="fas fa-download"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="skills fade-in" ref={skillsRef}>
          <div className="section-container">
            <div className="section-header centered">
              <span className="section-tag">What I do best</span>
              <h2 className="section-title">Skills & Expertise</h2>
              <p className="section-subtitle">Comprehensive technical skills across the full development stack</p>
            </div>
            <div className="skills-grid">
              <div className="skill-card">
                <div className="skill-icon">
                  <i className="fab fa-react"></i>
                </div>
                <h4>Frontend Development</h4>
                <p>Creating responsive, interactive user interfaces with modern frameworks and best practices.</p>
                <div className="skill-tags">
                  <span className="skill-tag">React</span>
                  <span className="skill-tag">Vue.js</span>
                  <span className="skill-tag">TypeScript</span>
                  <span className="skill-tag">Tailwind CSS</span>
                </div>
                <div className="skill-level">
                  <div className="skill-bar">
                    <div className="skill-progress" data-level="95"></div>
                  </div>
                  <span className="skill-percentage">95%</span>
                </div>
              </div>
              
              <div className="skill-card">
                <div className="skill-icon">
                  <i className="fas fa-server"></i>
                </div>
                <h4>Backend Development</h4>
                <p>Building scalable server-side applications with robust APIs and database integrations.</p>
                <div className="skill-tags">
                  <span className="skill-tag">Node.js</span>
                  <span className="skill-tag">Python</span>
                  <span className="skill-tag">PostgreSQL</span>
                  <span className="skill-tag">MongoDB</span>
                </div>
                <div className="skill-level">
                  <div className="skill-bar">
                    <div className="skill-progress" data-level="90"></div>
                  </div>
                  <span className="skill-percentage">90%</span>
                </div>
              </div>
              

              
              <div className="skill-card">
                <div className="skill-icon">
                  <i className="fas fa-mobile-alt"></i>
                </div>
                <h4>Mobile Development</h4>
                <p>Cross-platform mobile applications with native performance and user experience.</p>
                <div className="skill-tags">
                  <span className="skill-tag">React Native</span>
                  <span className="skill-tag">Flutter</span>
                  <span className="skill-tag">PWA</span>
                  <span className="skill-tag">Expo</span>
                </div>
                <div className="skill-level">
                  <div className="skill-bar">
                    <div className="skill-progress" data-level="80"></div>
                  </div>
                  <span className="skill-percentage">80%</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="projects fade-in" ref={projectsRef}>
          <div className="section-container">
            <div className="section-header">
              <span className="section-tag">My latest work</span>
              <h2 className="section-title">Featured Projects</h2>
              <p className="section-subtitle">Showcasing innovative solutions and technical excellence</p>
            </div>
            <div className="projects-grid">
              <article className="project-card featured">
                <div className="project-image-container">
                  <img 
                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800" 
                    alt="E-Commerce Platform Project" 
                    className="project-image" 
                  />
                  <div className="project-overlay">
                    <div className="project-actions">
                      <a href="#" className="project-link" aria-label="View live demo">
                        <i className="fas fa-external-link-alt"></i>
                      </a>
                      <a href="#" className="project-link" aria-label="View source code">
                        <i className="fab fa-github"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="project-content">
                  <div className="project-header">
                    <h4>E-Commerce Platform</h4>
                    <span className="project-type">Full Stack</span>
                  </div>
                  <p>A comprehensive e-commerce solution featuring real-time inventory management, secure payment processing, admin dashboard, and advanced analytics. Built with modern technologies for scalability and performance.</p>
                  <div className="project-tags">
                    <span className="tag">React</span>
                    <span className="tag">Node.js</span>
                    <span className="tag">PostgreSQL</span>
                    <span className="tag">Stripe</span>
                    <span className="tag">AWS</span>
                  </div>

                </div>
              </article>
              
              <article className="project-card">
                <div className="project-image-container">
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800" 
                    alt="Analytics Dashboard Project" 
                    className="project-image" 
                  />
                  <div className="project-overlay">
                    <div className="project-actions">
                      <a href="#" className="project-link" aria-label="View live demo">
                        <i className="fas fa-external-link-alt"></i>
                      </a>
                      <a href="#" className="project-link" aria-label="View source code">
                        <i className="fab fa-github"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="project-content">
                  <div className="project-header">
                    <h4>Analytics Dashboard</h4>
                    <span className="project-type">Frontend</span>
                  </div>
                  <p>Interactive data visualization dashboard with real-time updates, customizable charts, and advanced filtering capabilities for business intelligence.</p>
                  <div className="project-tags">
                    <span className="tag">Vue.js</span>
                    <span className="tag">D3.js</span>
                    <span className="tag">Python</span>
                    <span className="tag">FastAPI</span>
                  </div>
                </div>
              </article>
              
              <article className="project-card">
                <div className="project-image-container">
                  <img 
                    src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800" 
                    alt="Task Management App Project" 
                    className="project-image" 
                  />
                  <div className="project-overlay">
                    <div className="project-actions">
                      <a href="#" className="project-link" aria-label="View live demo">
                        <i className="fas fa-external-link-alt"></i>
                      </a>
                      <a href="#" className="project-link" aria-label="View source code">
                        <i className="fab fa-github"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="project-content">
                  <div className="project-header">
                    <h4>Task Management App</h4>
                    <span className="project-type">Mobile</span>
                  </div>
                  <p>Cross-platform mobile application for team collaboration and project management with offline support and real-time synchronization.</p>
                  <div className="project-tags">
                    <span className="tag">React Native</span>
                    <span className="tag">Firebase</span>
                    <span className="tag">Redux</span>
                    <span className="tag">TypeScript</span>
                  </div>
                </div>
              </article>
            </div>
            <div className="projects-footer">
              <a href="#" className="btn-outline">
                <span>View All Projects</span>
                <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </section>



        {/* Contact Section */}
        <section id="contact" className="contact fade-in" ref={contactRef}>
          <div className="section-container">
            <div className="section-header centered">
              <span className="section-tag">Let's connect</span>
              <h2 className="section-title">Get In Touch</h2>
              <p className="section-subtitle">Ready to bring your ideas to life? Let's discuss how we can work together.</p>
            </div>
            <div className="contact-content">
              <div className="contact-info">
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="contact-details">
                    <h4>Email</h4>
                    <a href="mailto:firmansyahzinedine@gmail.com">firmansyahzinedine@gmail.com</a>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div className="contact-details">
                    <h4>Phone</h4>
                    <a href="tel:+621325678263">+62 132 567 8263</a>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="contact-details">
                    <h4>Location</h4>
                    <span>Indonesia</span>
                  </div>
                </div>
              </div>
              
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      placeholder="Your full name" 
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                    {formErrors.name && <span className="form-error">{formErrors.name}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      placeholder="your.email@example.com" 
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    {formErrors.email && <span className="form-error">{formErrors.email}</span>}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    placeholder="What's this about?"
                    value={formData.subject}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="6" 
                    placeholder="Tell me about your project, ideas, or how I can help you..." 
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                  ></textarea>
                  {formErrors.message && <span className="form-error">{formErrors.message}</span>}
                </div>
                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <div className="btn-loader">
                        <i className="fas fa-spinner fa-spin"></i>
                      </div>
                    </>
                  ) : submitSuccess ? (
                    <>
                      <span className="btn-text">Message Sent!</span>
                      <i className="fas fa-check"></i>
                    </>
                  ) : (
                    <>
                      <span className="btn-text">Send Message</span>
                      <i className="fas fa-paper-plane"></i>
                    </>
                  )}
                </button>
                {submitSuccess && (
                  <div className="form-success">
                    <i className="fas fa-check-circle"></i>
                    <span>Message sent successfully! I'll get back to you soon.</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-brand">
              <a href="#" className="footer-logo">
                <i className="fas fa-code"></i>
                <span>Alex Johnson</span>
              </a>
              <p>Full Stack Developer passionate about creating innovative digital solutions.</p>
              <div className="footer-social">
                <a href="#" className="social-link" aria-label="GitHub">
                  <i className="fab fa-github"></i>
                </a>
                <a href="#" className="social-link" aria-label="LinkedIn">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="#" className="social-link" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-link" aria-label="Email">
                  <i className="fas fa-envelope"></i>
                </a>
              </div>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Navigation</h4>
                <ul>
                  <li>
                    <a 
                      href="#about" 
                      onClick={(e) => { e.preventDefault(); scrollToSection(aboutRef); }}
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#skills" 
                      onClick={(e) => { e.preventDefault(); scrollToSection(skillsRef); }}
                    >
                      Skills
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#projects" 
                      onClick={(e) => { e.preventDefault(); scrollToSection(projectsRef); }}
                    >
                      Projects
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#contact" 
                      onClick={(e) => { e.preventDefault(); scrollToSection(contactRef); }}
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div className="footer-column">
                <h4>Services</h4>
                <ul>
                  <li><a href="#">Web Development</a></li>
                  <li><a href="#">Mobile Apps</a></li>
                  <li><a href="#">UI/UX Design</a></li>
                  <li><a href="#">Consulting</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Alex Johnson. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Portfolio;

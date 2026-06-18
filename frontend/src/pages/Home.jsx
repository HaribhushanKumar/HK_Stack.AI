import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { submitContactForm } from '../services/api';
import profileImg from '../assets/profile.jpg';
import { 
    FiArrowRight, FiMail, FiPhone, FiLinkedin, FiGithub, 
    FiSend, FiSearch, FiCode, FiCpu, FiDatabase, FiLayers,
    FiUsers, FiBarChart2, FiCloud, FiBookOpen
} from 'react-icons/fi';
import { HeroBadge, SectionLabel, SkillTag, ProjectCategoryBadge, TechTag } from '../components/AnimatedBadge';

const skillsData = [
    {
        category: "AI & Machine Learning",
        icon: <FiCpu />,
        skills: [
            { name: "AI Machine learning", level: "Expert" },
            { name: "Deep Learning", level: "Advanced" },
            { name: "NLP", level: "Advanced" },
            { name: "Generative AI", level: "Expert" },
            { name: "RAG Pipelines", level: "Expert" },
            { name: "OpenAI API", level: "Expert" },
            { name: "Python Scripting", level: "Advanced" }
        ]
    },
    {
        category: "Frontend Engineering",
        icon: <FiCode />,
        skills: [
            { name: "React.js", level: "Expert" },
            { name: "HTML5 & CSS3", level: "Expert" },
            { name: "JavaScript (ES6)", level: "Expert" },
            { name: "Vite Scaffolds", level: "Advanced" },
            { name: "SCSS Layouts", level: "Advanced" }
        ]
    },
    {
        category: "Backend & Database",
        icon: <FiDatabase />,
        skills: [
            { name: "Node.js", level: "Expert" },
            { name: "Express.js", level: "Expert" },
            { name: "Flask APIs", level: "Advanced" },
            { name: "Pinecone (Vector DB)", level: "Expert" },
            { name: "MongoDB", level: "Expert" },
            { name: "MySQL", level: "Advanced" },
            { name: "DBMS Concepts", level: "Advanced" }
        ]
    },
    {
        category: "Data Analytics",
        icon: <FiBarChart2 />,
        skills: [
            { name: "Python (Pandas / NumPy)", level: "Advanced" },
            { name: "Power BI Dashboards", level: "Advanced" },
            { name: "Jupyter Notebooks", level: "Advanced" },
            { name: "ETL Pipelines", level: "Advanced" },
            { name: "Web Scraping", level: "Expert" },
            { name: "Data Visualization", level: "Advanced" },
            { name: "Statistical Analysis", level: "Intermediate" }
        ]
    },
    {
        category: "DevOps & Deployment",
        icon: <FiCloud />,
        skills: [
            { name: "Render", level: "Advanced" },
            { name: "Railway", level: "Advanced" },
            { name: "Docker", level: "Advanced" },
            { name: "Kubernetes", level: "Intermediate" },
            { name: "Git", level: "Expert" },
            { name: "GitHub", level: "Expert" }
        ]
    },
    {
        category: "Soft Skills",
        icon: <FiUsers />,
        skills: [
            { name: "Problem Solving", level: "Expert" },
            { name: "Team Collaboration", level: "Expert" },
            { name: "Time Management", level: "Advanced" },
            { name: "Continuous Learning", level: "Expert" }
        ]
    }
];

const Home = () => {
    const { showToast } = useTheme();

    // ==========================================
    // 1. Typewriter Title Effect
    // ==========================================
    const [typingText, setTypingText] = useState('');
    const phrases = [
        "Full Stack Developer & AI Engineer",
        "AI & Machine Learning Engineer",
        "RAG & LLM Specialist",
        "MCA Graduate"
    ];
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    
    useEffect(() => {
        let timer;
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            timer = setTimeout(() => {
                setTypingText(currentPhrase.substring(0, charIndex - 1));
                setCharIndex(prev => prev - 1);
            }, 50);
        } else {
            timer = setTimeout(() => {
                setTypingText(currentPhrase.substring(0, charIndex + 1));
                setCharIndex(prev => prev + 1);
            }, 120);
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            timer = setTimeout(() => setIsDeleting(true), 2000);
        } else if (isDeleting && charIndex === 0) {
            setIsDeleting(false);
            setPhraseIndex(prev => (prev + 1) % phrases.length);
        }
        
        return () => clearTimeout(timer);
    }, [charIndex, isDeleting, phraseIndex]);

    // ==========================================
    // 2. Project Search & Category Filtering
    // ==========================================
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    
    const projects = [
        {
            title: "presi-bot",
            description: "A Generative AI-powered academic assistant built using OpenAI APIs, Hugging Face embeddings, Pinecone vector database, and a Retrieval-Augmented Generation (RAG) pipeline.",
            category: "ai",
            tech: ["RAG Pipeline", "OpenAI API", "HuggingFace", "Pinecone"],
            github: "https://github.com/HaribhushanKumar/presi-bot"
        },
        {
            title: "AI-Power-Smart-Grocery-System",
            description: "AI-powered recipe and smart grocery recommendation system that allows users to select recipes based on cuisine, dietary preferences, health conditions, and serving sizes.",
            category: "ai",
            tech: ["JavaScript", "Recommender", "AI Search", "JSON Data"],
            github: "https://github.com/HaribhushanKumar/AI-Power-Smart-Grocery-System"
        },
        {
            title: "Jail-Management-System",
            description: "A backend-driven web application designed to streamline the operations of a correctional facility. Built using Spring Boot and MongoDB, this system handles inmate profiles, security logs, and personnel assignments.",
            category: "fullstack",
            tech: ["Spring Boot", "MongoDB", "TypeScript", "React.js"],
            github: "https://github.com/HaribhushanKumar/Jail-Management-System"
        },
        {
            title: "Zoom Meeting App",
            description: "A fully integrated Zoom Meeting replica supporting secure user login authentication, instant video calls, screen-sharing pipelines, private chats, scheduled calendar hooks, and recording support.",
            category: "fullstack",
            tech: ["React.js", "WebRTC", "Node / Express", "Socket.io"],
            github: "https://github.com/HaribhushanKumar/Zoom"
        },
        {
            title: "Invoice Generator",
            description: "Invoice Generator App built using Spring Boot and React. Features customer profiles, tax rules structures, invoice generator pipelines, and high-fidelity PDF downloads.",
            category: "fullstack",
            tech: ["Spring Boot", "React", "Java", "PDF Generation"],
            github: "https://github.com/HaribhushanKumar/Invoice_Generator"
        },
        {
            title: "Stock-Trading-App",
            description: "Interactive stock portfolio and trading simulator featuring secure authentication layouts using JSON Web Tokens (JWT), real-time stock simulation, and dynamic charting panels.",
            category: "fullstack",
            tech: ["SCSS", "JWT Auth", "Mock Charts", "Dashboard"],
            github: "https://github.com/HaribhushanKumar/Stock-Trading-App"
        },
        {
            title: "cricket-data-analytics",
            description: "Cricket Performance Analytics using Python (pandas, web-scraping) and Power BI dashboards to transform complex match stats into actionable player profiling insights.",
            category: "ai",
            tech: ["Power BI", "Jupyter", "Python", "ETL Pipeline"],
            github: "https://github.com/HaribhushanKumar/cricket-data-analytics"
        },
        {
            title: "Iris-Flower-Classification",
            description: "Machine learning classification project evaluating Iris flower species attributes to run predictive modeling benchmarks using Python ML classifiers.",
            category: "ai",
            tech: ["Python", "Scikit-Learn", "Classification", "Data Modeling"],
            github: "https://github.com/HaribhushanKumar/Iris-Flower-Classification"
        },
        {
            title: "hand-written-digit-recognition",
            description: "Computer vision model evaluating handwritten digits classification benchmarks over MNIST dataset loops utilizing Python neural networks.",
            category: "ai",
            tech: ["Python", "MNIST", "Neural Nets", "Computer Vision"],
            github: "https://github.com/HaribhushanKumar/hand-written-digit-recognition"
        }
    ];

    const filteredProjects = projects.filter(project => {
        const matchesFilter = filter === 'all' || project.category === filter;
        const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesFilter && matchesSearch;
    });

    // ==========================================
    // 3. Contact Form Submission
    // ==========================================
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [submitting, setSubmitting] = useState(false);

    const handleFormChange = (e) => {
        const { id, value } = e.target;
        // Map elements ids to formData attributes
        const fieldMap = {
            'form-name': 'name',
            'form-email': 'email',
            'form-phone': 'phone',
            'form-subject': 'subject',
            'form-message': 'message'
        };
        setFormData(prev => ({
            ...prev,
            [fieldMap[id]]: value
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.phone || !formData.subject || !formData.message) {
            showToast('Please fill out all fields.', 'error');
            return;
        }

        setSubmitting(true);
        try {
            const res = await submitContactForm(formData);
            if (res.success) {
                showToast(res.message, 'success');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: ''
                });
            } else {
                showToast(res.message || 'Failed to submit form.', 'error');
            }
        } catch (err) {
            console.error(err);
            showToast(err.response?.data?.message || 'Server connection failed, try again.', 'error');
        } finally {
            setSubmitting(false);
        }
    };

    // Card spotlight mouse coordinate tracker
    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    };

    // Framer motion variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
    };

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section" id="hero">
                <div className="section-container hero-grid">
                    <motion.div 
                        className="hero-text"
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        <HeroBadge text="MCA Graduate" />
                        <h1 className="hero-title">
                            Hi, I'm <br /><span className="gradient-text">Haribhushan Kumar</span>
                        </h1>
                        <div className="hero-subtitle">
                            <span>{typingText}</span><span className="typewriter-cursor"></span>
                        </div>
                        <p className="hero-description">
                            A focused MCA graduate, Full Stack Developer & AI Engineer. Passionate about engineering production-grade web systems and integrating advanced AI components like custom RAG pipelines, generative integrations, and vector indexes.
                        </p>
                        <div className="hero-ctas">
                            <a href="#projects" className="btn btn-primary">
                                View My Work <FiArrowRight />
                            </a>
                            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                                View CV
                            </a>
                            <a href="/resume.pdf" download="Haribhushan_Kumar_Resume.pdf" className="btn btn-secondary">
                                Download CV
                            </a>
                        </div>
                    </motion.div>

                    <motion.div 
                        className="hero-avatar"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        <div className="avatar-wrapper">
                            <img src={profileImg} alt="Haribhushan Kumar Avatar" className="avatar-img" />
                            <div className="avatar-glow"></div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* About Me Section */}
            <section className="about-section" id="about">
                <div className="section-container">
                    <div className="section-header">
                        <SectionLabel text="My Profile" icon={<FiUsers />} />
                        <h2 className="section-title text-center text-3xl font-extrabold tracking-tight" style={{ marginTop: '12px' }}>About Me</h2>
                    </div>

                    <div className="about-grid" style={{ marginTop: '48px' }}>
                        <motion.div 
                            className="glass-card about-card"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            style={{ padding: '32px' }}
                        >
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>MCA Graduate & AI/Fullstack Enthusiast</h3>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
                                I recently completed my Master of Computer Applications (MCA) at Presidency University, Bangalore, building upon my foundational knowledge in Bachelor of Computer Applications (BCA) from Veer Kunwar Singh University.
                            </p>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
                                My path centers around engineering enterprise-level software systems, integrating robust databases, and building modern AI components (specifically Retrieval-Augmented Generation or RAG models, custom vector embeddings, and language API pipelines).
                            </p>

                            <div className="core-domains-highlights" style={{ marginBottom: '28px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <span className="domain-dot" style={{ background: 'var(--accent-primary)', width: '8px', height: '8px', borderRadius: '50%', display: 'inline-block' }}></span>
                                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}><strong>AI & ML Engineering:</strong> RAG pipelines, Deep Learning, NLP, and Pinecone vector databases.</span>
                                </div>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <span className="domain-dot" style={{ background: 'var(--accent-secondary)', width: '8px', height: '8px', borderRadius: '50%', display: 'inline-block' }}></span>
                                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}><strong>Full-Stack Development:</strong> Scalable web applications using MERN Stack, Java, and Spring Boot.</span>
                                </div>
                            </div>

                            <div className="about-highlights" style={{ marginTop: '20px' }}>
                                <div className="highlight-box">
                                    <span className="highlight-num">9+</span>
                                    <span className="highlight-label">GitHub Projects</span>
                                </div>
                                <div className="highlight-box">
                                    <span className="highlight-num">Presidency</span>
                                    <span className="highlight-label">MCA Alumnus</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div 
                            className="glass-card about-card"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            style={{ padding: '32px' }}
                        >
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Domain Focus & Expertise</h3>
                            <div className="focus-list">
                                <div className="focus-item">
                                    <div className="focus-icon-wrap"><FiCpu /></div>
                                    <div className="focus-info">
                                        <h4>Machine Learning & RAG</h4>
                                        <p>Designing semantic queries pipelines, hosting indexes in Pinecone databases, and tailoring HuggingFace embeddings pipelines.</p>
                                    </div>
                                </div>
                                <div className="focus-item">
                                    <div className="focus-icon-wrap"><FiCode /></div>
                                    <div className="focus-info">
                                        <h4>Enterprise Server Architectures</h4>
                                        <p>Crafting robust logic maps in MERN (Node/Express) and Spring Boot, securing logins via custom JWT token checks.</p>
                                    </div>
                                </div>
                                <div className="focus-item">
                                    <div className="focus-icon-wrap"><FiBarChart2 /></div>
                                    <div className="focus-info">
                                        <h4>Data Analytics & Insights</h4>
                                        <p>Analyzing datasets using Python (Pandas/NumPy), designing interactive Power BI dashboards, and automating ETL/scraping workflows.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section className="skills-section" id="skills">
                <div className="section-container">
                    <div className="section-header">
                        <SectionLabel text="Core Capabilities" icon={<FiLayers />} />
                        <h2 className="section-title" style={{ marginTop: '12px' }}>Technical Skills</h2>
                    </div>

                    <div className="skills-grid" style={{ marginTop: '48px' }}>
                        {skillsData.map((cat, idx) => (
                            <div key={idx} className="glass-card skills-card" style={{ padding: '32px' }}>
                                <h3 className="skills-category-title">{cat.icon} {cat.category}</h3>
                                <div className="skills-list">
                                    {cat.skills.map((skill, sIdx) => (
                                        <SkillTag key={sIdx} text={skill.name} level={skill.level} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section className="projects-section" id="projects">
                <div className="section-container">
                    <div className="section-header">
                        <SectionLabel text="Showcase" icon={<FiCode />} />
                        <h2 className="section-title" style={{ marginTop: '12px' }}>Featured Projects</h2>
                    </div>

                    <div className="projects-filter-bar" style={{ marginTop: '48px' }}>
                        <div className="filter-btn-group">
                            <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All Projects</button>
                            <button className={`filter-btn ${filter === 'ai' ? 'active' : ''}`} onClick={() => setFilter('ai')}>AI & ML</button>
                            <button className={`filter-btn ${filter === 'fullstack' ? 'active' : ''}`} onClick={() => setFilter('fullstack')}>Fullstack Apps</button>
                        </div>
                        
                        <div className="search-wrapper">
                            <FiSearch />
                            <input 
                                type="text" 
                                className="search-input" 
                                placeholder="Search by tech or title..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="projects-grid" style={{ marginTop: '32px' }}>
                        {filteredProjects.map((project, idx) => {
                            return (
                                <motion.div 
                                    key={project.title}
                                    className="glass-card project-card"
                                    onMouseMove={handleMouseMove}
                                    onClick={() => window.open(project.github, '_blank', 'noopener,noreferrer')}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={fadeInUp}
                                    style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '28px', position: 'relative', cursor: 'pointer' }}
                                >
                                    <ProjectCategoryBadge category={project.category} />
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', color: 'var(--text-primary)', marginTop: '12px' }}>{project.title}</h3>
                                    <p className="project-description" style={{ flexGrow: 1 }}>{project.description}</p>
                                    
                                    <div className="project-tech" style={{ marginTop: '16px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {project.tech.map(t => (
                                            <TechTag key={t} text={t} />
                                        ))}
                                    </div>

                                    <div className="project-footer" style={{ marginTop: '24px' }}>
                                        <span className="project-link">
                                            <FiGithub /> GitHub Code
                                        </span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Education Section */}
            <section className="education-section" id="education">
                <div className="section-container">
                    <div className="section-header">
                        <SectionLabel text="Academic Path" icon={<FiBookOpen />} />
                        <h2 className="section-title" style={{ marginTop: '12px' }}>Timeline & Education</h2>
                    </div>

                    <div className="timeline" style={{ marginTop: '48px' }}>
                        <div className="timeline-item">
                            <div className="timeline-dot"></div>
                            <motion.div 
                                className="glass-card timeline-card"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeInUp}
                                style={{ padding: '28px' }}
                            >
                                <span className="timeline-date">2024 - 2026</span>
                                <h3>Master of Computer Applications (MCA)</h3>
                                <span className="timeline-institution">Presidency University, Bangalore</span>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                    Post-graduate degree with focus on Advanced Software Architectures, Distributed Systems, Artificial Intelligence configurations, and RAG architectures.
                                </p>
                            </motion.div>
                        </div>

                        <div className="timeline-item">
                            <div className="timeline-dot"></div>
                            <motion.div 
                                className="glass-card timeline-card"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeInUp}
                                style={{ padding: '28px' }}
                            >
                                <span className="timeline-date">2020 - 2024</span>
                                <h3>Bachelor of Computer Applications (BCA)</h3>
                                <span className="timeline-institution">Veer Kunwar Singh University, Ara, Bihar</span>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                    Undergraduate degree completed. Built core programming logic, learned Database Management Systems (DBMS), Structured Query Languages, Object-Oriented concepts, and HTML interfaces.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="contact-section" id="contact">
                <div className="section-container">
                    <div className="section-header">
                        <SectionLabel text="Get In Touch" icon={<FiMail />} />
                        <h2 className="section-title" style={{ marginTop: '12px' }}>Connect With Me</h2>
                    </div>

                    <div className="contact-grid" style={{ marginTop: '48px' }}>
                        <div className="glass-card contact-info-card" style={{ padding: '32px' }}>
                            <h3>Let's collaborate on AI & Full-Stack systems</h3>
                            <p style={{ color: 'var(--text-muted)' }}>
                                I'm actively looking for full-time roles in AI Engineering and Full Stack Web Development. Drop a message to start collaboration.
                            </p>
                            
                            <div className="contact-details" style={{ margin: '24px 0' }}>
                                <div className="contact-item" style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
                                    <div className="contact-icon"><FiMail /></div>
                                    <div className="contact-meta">
                                        <h4>Email</h4>
                                        <a href="mailto:haribhushan7852@gmail.com">haribhushan7852@gmail.com</a>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="social-links">
                                <a href="https://github.com/HaribhushanKumar" className="social-btn" target="_blank" rel="noopener noreferrer"><FiGithub /></a>
                                <a href="https://www.linkedin.com/in/haribhushan-kumar-850703326/" className="social-btn" target="_blank" rel="noopener noreferrer"><FiLinkedin /></a>
                            </div>
                        </div>

                        <div className="glass-card contact-form-card" style={{ padding: '40px' }}>
                            <form className="contact-form" onSubmit={handleFormSubmit}>
                                <div className="form-group">
                                    <input type="text" className="form-input" id="form-name" placeholder=" " value={formData.name} onChange={handleFormChange} required />
                                    <label htmlFor="form-name" className="form-label">Full Name</label>
                                </div>
                                <div className="form-group">
                                    <input type="email" className="form-input" id="form-email" placeholder=" " value={formData.email} onChange={handleFormChange} required />
                                    <label htmlFor="form-email" className="form-label">Email Address</label>
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-input" id="form-phone" placeholder=" " value={formData.phone} onChange={handleFormChange} required />
                                    <label htmlFor="form-phone" className="form-label">Phone Number</label>
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-input" id="form-subject" placeholder=" " value={formData.subject} onChange={handleFormChange} required />
                                    <label htmlFor="form-subject" className="form-label">Subject</label>
                                </div>
                                <div className="form-group">
                                    <textarea className="form-textarea" id="form-message" placeholder=" " value={formData.message} onChange={handleFormChange} required></textarea>
                                    <label htmlFor="form-message" className="form-label">Message</label>
                                </div>

                                <button type="submit" className="btn btn-primary" disabled={submitting} style={{ alignSelf: 'flex-start' }}>
                                    {submitting ? 'Sending...' : 'Send Message'} <FiSend />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;

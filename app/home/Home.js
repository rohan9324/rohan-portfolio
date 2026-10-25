
"use client";

import { motion } from "framer-motion";
import { FaArrowDown, FaArrowUpRightFromSquare, FaGithub, FaLinkedin, FaEnvelope, FaCode, FaReact, FaDatabase, FaMobileScreen, FaCloud, FaBriefcase, FaLocationDot } from "react-icons/fa6";
import { SiNextdotjs, SiJavascript, SiPhp, SiLaravel, SiMysql, SiMongodb, SiNodedotjs } from "react-icons/si";
import "./Home.css";

const skills = [
  ["JavaScript", SiJavascript], ["React.js", FaReact], ["Next.js", SiNextdotjs],
  ["React Native / Expo", FaMobileScreen], ["PHP", SiPhp], ["Laravel", SiLaravel],
  ["MySQL / SQL", SiMysql], ["MongoDB", SiMongodb], ["Node.js / Express", SiNodedotjs],
  ["REST APIs", FaCode], ["AWS S3 / CloudFront", FaCloud], ["Git & GitHub", FaGithub] 
];

const projects = [
  {
    number: "01", title: "RWITC Website & Admin Platform", type: "PROFESSIONAL EXPERIENCE",
    description: "Contributed to website and admin functionality, Next.js pages, PHP modules, API integration, access control, article management, media delivery and performance troubleshooting.",
    stack: "Next.js · PHP · MySQL · AWS S3 · CloudFront",
    url: "https://rwitc.com/", label: "VISIT LIVE WEBSITE", icon: FaBriefcase, tone: "violet"
  },
  {
    number: "02", title: "CineVault", type: "PERSONAL PROJECT",
    description: "A MERN movie-management app with dynamic movie creation and listing, REST APIs, MongoDB storage, reusable React components and client-side validation.",
    stack: "React · Node.js · Express · MongoDB",
    url: "", label: "PERSONAL PROJECT", icon: FaReact, tone: "lime"
  },
  {
    number: "03", title: "User Profile & Task Manager", type: "PERSONAL PROJECT",
    description: "A responsive PHP application with registration and login, session handling, profile photo uploads, user-detail updates and task CRUD operations.",
    stack: "PHP · MySQL · JavaScript · Bootstrap",
    url: "", label: "PERSONAL PROJECT", icon: FaDatabase, tone: "peach"
  }
];

const experience = [
  { date: "2025 — PRESENT", title: "Full Stack Developer", place: "ENATS LLP · Mumbai, India", text: "Building and maintaining web and mobile features, integrating APIs, developing admin modules, managing database-driven functionality and troubleshooting production issues." },
  { date: "JUL 2025", title: "Full Stack Developer Training", place: "SDAC InfoTech · Grade A", text: "Full Stack Developer training and practical software development foundations.", link: "https://drive.google.com/file/d/1oFL0dVD5p2PNPjLd4ORSGhscVOissay1/view" },
  { date: "2024", title: "B.Sc. Information Technology", place: "Smt. K. G. Mittal Institute of Management, Information Technology and Research", text: "Graduated with 6.95 / 10." },
  { date: "2021 / 2019", title: "HSC & SSC", place: "P. D. Turakhia Junior College / Shivaji Vidya Mandir High School", text: "HSC: 72.67% · SSC: 63.40%." }
];

const reveal = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

export default function Home() {
  return (
    <main className="portfolio" id="home">
      <header className="nav">
        <a className="logo" href="#home">rohan<span>®</span></a>
        <nav>{["About", "Skills", "Work", "Journey", "Contact"].map(x => <a key={x} href={`#${x.toLowerCase()}`}>{x}</a>)}</nav>
        <a className="nav-cta" href="mailto:rohansingh5594@gmail.com">Let's talk <FaArrowUpRightFromSquare /></a>
      </header>

      <section className="hero">
        <div className="hero-meta"><span><i /> AVAILABLE FOR OPPORTUNITIES</span><span>MUMBAI, INDIA <FaLocationDot /></span></div>
        <div className="hero-layout">
          <motion.div className="hero-copy" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: .12 } } }}>
            <motion.p variants={reveal} className="eyebrow">FULL STACK DEVELOPER · PORTFOLIO 2026</motion.p>
            <motion.h1 variants={reveal}>I make the<br />digital world<br /><span>work better.</span></motion.h1>
            <motion.p variants={reveal} className="intro">I'm Rohan Singh — a full stack developer building responsive web experiences, mobile features and dependable backend solutions.</motion.p>
            <motion.div variants={reveal} className="hero-actions"><a href="#work" className="btn-primary">Explore my work <FaArrowDown /></a><a href="mailto:rohansingh5594@gmail.com" className="btn-quiet">Get in touch ↗</a></motion.div>
            <motion.div variants={reveal} className="hero-foot"><span>FRONTEND</span><b>✳</b><span>BACKEND</span><b>✳</b><span>INTEGRATION</span></motion.div>
          </motion.div>

          <motion.div className="hero-art" initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8 }}>
            <div className="art-grid" /><div className="art-circle circle-one" /><div className="art-circle circle-two" />
            <div className="monogram"><span>RS</span><small>DEVELOPER<br />BY PRACTICE</small></div>
            <motion.div className="float-tag tag-code" animate={{ y: [0, -8, 0] }} transition={{ duration: 3.5, repeat: Infinity }}><FaCode /> Clean code</motion.div>
            <motion.div className="float-tag tag-stack" animate={{ y: [0, 8, 0] }} transition={{ duration: 4, repeat: Infinity }}><FaReact /> Modern stack</motion.div>
            <div className="art-note">IDEAS → CODE → REAL-WORLD IMPACT</div>
          </motion.div>
        </div>
        <div className="hero-bottom"><span>01 / INTRODUCTION</span><span>SCROLL TO DISCOVER ↓</span></div>
      </section>

      <div className="skill-ticker"><div>{[...skills, ...skills].map(([name], i) => <span key={`${name}-${i}`}>{name} <b>✳</b></span>)}</div></div>

      <section className="section about" id="about">
        <p className="section-label">01 — ABOUT ME</p>
        <div className="split-heading"><h2>Curiosity first.<br /><span>Solutions always.</span></h2><div className="about-copy"><p>I'm a Full Stack Developer at <strong>ENATS LLP</strong>, working across web and mobile features, PHP backend services, APIs, databases and deployment-related troubleshooting.</p><p>I enjoy taking a real requirement, understanding the problem and turning it into a responsive, practical and maintainable solution.</p><a className="text-link" href="#journey">Explore my journey ↗</a></div></div>
        <div className="metrics"><div><strong>01+</strong><span>YEAR OF EXPERIENCE</span></div><div><strong>12</strong><span>CORE TECHNOLOGIES</span></div><div><strong>360°</strong><span>FULL STACK FOCUS</span></div></div>
      </section>

      <section className="section skills-section" id="skills">
        <p className="section-label">02 — MY TOOLKIT</p>
        <div className="split-heading"><h2>Tools for<br /><span>building things.</span></h2><p className="section-summary">The languages, frameworks and platforms I use to build interfaces, connect services and work with data.</p></div>
        <div className="skills-list">{skills.map(([name, Icon], i) => <motion.div className="skill-row" key={name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal} transition={{ delay: i * .035 }}><span className="skill-num">0{i + 1}</span><Icon className="skill-icon" /><span>{name}</span><FaArrowUpRightFromSquare className="skill-arrow" /></motion.div>)}</div>
      </section>

      <section className="section work-section" id="work">
        <p className="section-label">03 — SELECTED WORK</p>
        <div className="split-heading"><h2>Real work.<br /><span>Practical impact.</span></h2><p className="section-summary">Professional website work and personal projects, with the technologies and purpose behind each.</p></div>
        <div className="project-list">{projects.map((p, i) => <motion.article className="project" key={p.number} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .15 }} variants={reveal} transition={{ delay: i * .08 }}>
          <div className={`project-art ${p.tone}`}><span className="project-num">{p.number} / 03</span><p>{p.title}</p><p className="project-art-foot">SELECTED WORK · RS</p>{(() => { const Icon = p.icon; return <Icon className="project-icon" />; })()}</div>
          <div className="project-copy"><p className="project-type">{p.type}</p><h3>{p.title}</h3><p className="project-desc">{p.description}</p><p className="project-stack">{p.stack}</p>{p.url ? <a className="project-link" href={p.url} target="_blank" rel="noreferrer">{p.label} <FaArrowUpRightFromSquare /></a> : <span className="project-link muted-link">{p.label}</span>}</div>
          <span className="project-index">{p.number}</span>
        </motion.article>)}</div>
      </section>

      <section className="section journey-section" id="journey">
        <p className="section-label">04 — EXPERIENCE & EDUCATION</p>
        <h2>Every step<br /><span>builds the next.</span></h2>
        <div className="timeline">{experience.map((e, i) => <motion.div className="timeline-row" key={e.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal} transition={{ delay: i * .08 }}><span className="timeline-date">{e.date}</span><div><h3>{e.title}</h3><p className="timeline-place">{e.place}</p><p>{e.text}</p>{e.link && <a className="text-link" href={e.link} target="_blank" rel="noreferrer">View certificate ↗</a>}</div></motion.div>)}</div>
      </section>

      <section className="contact section" id="contact">
        <p className="section-label">05 — LET'S CONNECT</p>
        <div className="contact-content"><h2>Got a challenge?<br /><span>Let's build.</span></h2><p>Open to discussing developer opportunities, collaborations and interesting problems worth solving.</p><a className="email-link" href="mailto:rohansingh5594@gmail.com"><FaEnvelope /> rohansingh5594@gmail.com <FaArrowUpRightFromSquare /></a></div>
        <div className="contact-details"><span><FaLocationDot /> MUMBAI, INDIA</span><a href="tel:+919324519782">+91 93245 19782</a><a href="https://rwitc.com/" target="_blank" rel="noreferrer">RWITC WEBSITE ↗</a></div>
      </section>

      <footer className="footer"><a className="logo" href="#home">rohan<span>®</span></a><span>DESIGNED & BUILT BY ROHAN SINGH</span><a href="#home">BACK TO TOP ↑</a><span>© 2026</span></footer>
    </main>
  );
}

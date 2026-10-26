"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import {
  FaArrowDown, FaArrowUp, FaArrowUpRightFromSquare, FaBars, FaBriefcase, FaCloud, FaCode,
  FaDatabase, FaEnvelope, FaGithub, FaLocationDot, FaMobileScreen, FaPhone, FaReact, FaXmark
} from "react-icons/fa6";
import { SiJavascript, SiLaravel, SiMongodb, SiMysql, SiNextdotjs, SiNodedotjs, SiPhp } from "react-icons/si";
import "./Home.css";

/* ---------------------------------- CONFIG ---------------------------------- */
// Optional: your own PHP endpoint (see notes). Leave empty to use the free counterapi.dev service.
const VISITOR_ENDPOINT = "";
// Change this namespace to something unique to you (public free counter key).
const COUNTER_NAMESPACE = "rohansingh-portfolio-2026";
const COUNTER_KEY = "visits";

const EMAIL = "rohansingh5594@gmail.com";
const PHONE = "+919324519782";
const ROLES = ["Full Stack Developer", "Next.js Builder", "PHP & MySQL Engineer", "API Integrator"];
const NAV = ["About", "Skills", "Work", "Journey", "Contact"];
const EASE = [0.2, 0.8, 0.2, 1];

/* ----------------------------------- DATA ----------------------------------- */
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
    url: "https://rwitc.com/", label: "VISIT LIVE WEBSITE", icon: FaBriefcase, tone: "ember"
  },
  {
    number: "02", title: "CineVault", type: "PERSONAL PROJECT",
    description: "A MERN movie-management app with dynamic movie creation and listing, REST APIs, MongoDB storage, reusable React components and client-side validation.",
    stack: "React · Node.js · Express · MongoDB",
    url: "", label: "PERSONAL PROJECT", icon: FaReact, tone: "teal"
  },
  {
    number: "03", title: "User Profile & Task Manager", type: "PERSONAL PROJECT",
    description: "A responsive PHP application with registration and login, session handling, profile photo uploads, user-detail updates and task CRUD operations.",
    stack: "PHP · MySQL · JavaScript · Bootstrap",
    url: "", label: "PERSONAL PROJECT", icon: FaDatabase, tone: "gold"
  }
];

const experience = [
  { date: "2025 — PRESENT", title: "Full Stack Developer", place: "ENATS LLP · Mumbai, India", text: "Building and maintaining web and mobile features, integrating APIs, developing admin modules, managing database-driven functionality and troubleshooting production issues." },
  { date: "JUL 2025", title: "Full Stack Developer Training", place: "SDAC InfoTech · Grade A", text: "Full Stack Developer training and practical software development foundations.", link: "https://drive.google.com/file/d/1oFL0dVD5p2PNPjLd4ORSGhscVOissay1/view" },
  { date: "2024", title: "B.Sc. Information Technology", place: "Smt. K. G. Mittal Institute of Management, Information Technology and Research", text: "Graduated with 6.95 / 10." },
  { date: "2021 / 2019", title: "HSC & SSC", place: "P. D. Turakhia Junior College / Shivaji Vidya Mandir High School", text: "HSC: 72.67% · SSC: 63.40%." }
];

const metrics = [
  { to: 1, suffix: "+", label: "YEAR OF EXPERIENCE" },
  { to: 12, suffix: "", label: "CORE TECHNOLOGIES" },
  { to: 360, suffix: "°", label: "FULL STACK FOCUS" }
];

/* ------------------------------- ANIMATION BITS ------------------------------ */
const reveal = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.75, delay: i * 0.08, ease: EASE } })
};

// Shared visitor request so React strict mode does not count twice in development.
let visitorRequest = null;

function useVisitors() {
  const [count, setCount] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let alive = true;
    if (!visitorRequest) {
      let seen = false;
      try { seen = localStorage.getItem("rs_visited") === "1"; } catch {}
      const base = VISITOR_ENDPOINT || `https://api.counterapi.dev/v1/${COUNTER_NAMESPACE}/${COUNTER_KEY}`;
      const url = VISITOR_ENDPOINT ? `${base}?hit=${seen ? 0 : 1}` : seen ? base : `${base}/up`;
      visitorRequest = fetch(url)
        .then((r) => r.json())
        .then((d) => {
          const n = Number(d.count ?? d.value);
          if (!Number.isFinite(n)) throw new Error("bad response");
          try { localStorage.setItem("rs_visited", "1"); } catch {}
          return n;
        });
    }
    visitorRequest
      .then((n) => alive && setCount(n))
      .catch(() => alive && setError(true));
    return () => { alive = false; };
  }, []);

  return { count, error };
}

function useTypewriter(words) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    const delay = deleting ? 35 : text === word ? 1400 : 75;
    const t = setTimeout(() => {
      if (!deleting && text === word) { setDeleting(true); return; }
      if (deleting && text === "") { setDeleting(false); setIndex((i) => i + 1); return; }
      setText(word.slice(0, text.length + (deleting ? -1 : 1)));
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, index, words]);

  return text;
}

function CountUp({ to, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const duration = 1600;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return <span ref={ref}>{String(value).padStart(2, "0")}{suffix}</span>;
}

// Rolling odometer digits for the visitor counter
function Roll({ value }) {
  const digits = String(value).split("");
  return (
    <span className="roll" aria-label={String(value)}>
      {digits.map((d, i) => (
        <span className="roll-col" key={`${digits.length}-${i}`}>
          <motion.span
            className="roll-strip"
            initial={{ y: "0%" }}
            animate={{ y: `${-Number(d) * 10}%` }}
            transition={{ type: "spring", stiffness: 55, damping: 14, delay: i * 0.1 }}
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => <span key={n}>{n}</span>)}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function Magnetic({ children }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16 });
  const sy = useSpring(y, { stiffness: 220, damping: 16 });
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.3);
    y.set((e.clientY - r.top - r.height / 2) * 0.3);
  };
  const leave = () => { x.set(0); y.set(0); };
  return (
    <motion.div ref={ref} className="magnetic" style={{ x: sx, y: sy }} onMouseMove={move} onMouseLeave={leave}>
      {children}
    </motion.div>
  );
}

function Tilt({ children, className = "", max = 9 }) {
  const ref = useRef(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), { stiffness: 150, damping: 15 });
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), { stiffness: 150, damping: 15 });
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const leave = () => { px.set(0); py.set(0); };
  return (
    <motion.div ref={ref} className={className} style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }} onMouseMove={move} onMouseLeave={leave}>
      {children}
    </motion.div>
  );
}

// Updates CSS variables so the card spotlight follows the mouse
const spot = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};

function CursorGlow() {
  const x = useMotionValue(-300);
  const y = useMotionValue(-300);
  const sx = useSpring(x, { stiffness: 120, damping: 20 });
  const sy = useSpring(y, { stiffness: 120, damping: 20 });
  useEffect(() => {
    const move = (e) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);
  return <motion.div className="cursor-glow" style={{ x: sx, y: sy }} />;
}

function Preloader({ onDone }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setN((v) => Math.min(100, v + (v < 70 ? 4 : 2))), 30);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    if (n >= 100) {
      const t = setTimeout(onDone, 350);
      return () => clearTimeout(t);
    }
  }, [n, onDone]);
  return (
    <motion.div className="preloader" exit={{ y: "-100%" }} transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}>
      <div className="pre-inner">
        <p className="pre-name">rohan<span>®</span></p>
        <p className="pre-count">{String(n).padStart(3, "0")}</p>
        <div className="pre-bar"><div className="pre-fill" style={{ width: `${n}%` }} /></div>
        <p className="pre-note">LOADING PORTFOLIO</p>
      </div>
    </motion.div>
  );
}

function Label({ children }) {
  return (
    <motion.p className="label" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      <i /> {children}
    </motion.p>
  );
}

function Title({ a, b }) {
  const line = (text, cls, delay) => (
    <span className={`mask ${cls}`}>
      <motion.span
        initial={{ y: "110%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {text}
      </motion.span>
    </span>
  );
  return <h2 className="title">{line(a, "", 0)}{line(b, "accent", 0.12)}</h2>;
}

/* ----------------------------------- PAGE ----------------------------------- */
export default function Home() {
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("home");
  const [showTop, setShowTop] = useState(false);
  const { count, error } = useVisitors();
  const role = useTypewriter(ROLES);
  const finishLoading = useCallback(() => setLoading(false), []);
  const ready = !loading;

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  const timelineRef = useRef(null);
  const { scrollYProgress: tlProgress } = useScroll({ target: timelineRef, offset: ["start 75%", "end 60%"] });
  const tlScale = useSpring(tlProgress, { stiffness: 100, damping: 25 });

  // Lock page scroll while preloader or mobile menu is open
  useEffect(() => {
    document.body.style.overflow = loading || menu ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [loading, menu]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav link of the section currently in view
  useEffect(() => {
    const ids = ["home", ...NAV.map((n) => n.toLowerCase())];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const visitorText = error ? "—" : count === null ? "···" : count.toLocaleString("en-IN");

  return (
    <main className="portfolio" id="home">
      <AnimatePresence>{loading && <Preloader onDone={finishLoading} />}</AnimatePresence>

      <motion.div className="progress" style={{ scaleX: progress }} />
      <CursorGlow />
      <div className="aurora" aria-hidden="true"><i className="blob b1" /><i className="blob b2" /><i className="blob b3" /></div>

      {/* NAVBAR */}
      <motion.header className="nav" initial={{ y: -80, opacity: 0 }} animate={ready ? { y: 0, opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.2, ease: EASE }}>
        <div className="nav-inner">
          <a className="logo" href="#home">rohan<span>®</span></a>
          <nav className="nav-links">
            {NAV.map((x) => (
              <a key={x} href={`#${x.toLowerCase()}`} className={active === x.toLowerCase() ? "active" : ""}>{x}</a>
            ))}
          </nav>
          <a className="nav-cta" href={`mailto:${EMAIL}`}>Let's talk <FaArrowUpRightFromSquare /></a>
          <button className="burger" onClick={() => setMenu(true)} aria-label="Open menu"><FaBars /></button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menu && (
          <motion.div className="drawer" initial={{ clipPath: "circle(0% at 92% 4%)" }} animate={{ clipPath: "circle(150% at 92% 4%)" }} exit={{ clipPath: "circle(0% at 92% 4%)" }} transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}>
            <button className="drawer-close" onClick={() => setMenu(false)} aria-label="Close menu"><FaXmark /></button>
            <nav className="drawer-links">
              {NAV.map((x, i) => (
                <motion.a key={x} href={`#${x.toLowerCase()}`} onClick={() => setMenu(false)} initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.07 }}>
                  <small>0{i + 1}</small>{x}
                </motion.a>
              ))}
            </nav>
            <p className="drawer-foot">{EMAIL}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section className="hero">
        <motion.div className="hero-status" initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}>
          <span><i className="dot" /> AVAILABLE FOR OPPORTUNITIES</span>
          <span>MUMBAI, INDIA <FaLocationDot /></span>
        </motion.div>

        <div className="hero-layout">
          <motion.div className="hero-copy" initial="hidden" animate={ready ? "visible" : "hidden"} variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}>
            <motion.p variants={reveal} className="eyebrow">FULL STACK DEVELOPER · PORTFOLIO 2026</motion.p>
            <h1>
              {["I make the", "digital world", "work better."].map((l, i) => (
                <span className={`line ${i === 2 ? "accent" : ""}`} key={l}>
                  <motion.span initial={{ y: "115%" }} animate={ready ? { y: 0 } : {}} transition={{ duration: 0.95, delay: 0.25 + i * 0.13, ease: EASE }}>{l}</motion.span>
                </span>
              ))}
            </h1>
            <motion.p variants={reveal} className="role-line"><span className="role">{role}</span><span className="caret" /></motion.p>
            <motion.p variants={reveal} className="intro">I'm Rohan Singh — a full stack developer building responsive web experiences, mobile features and dependable backend solutions.</motion.p>
            <motion.div variants={reveal} className="hero-actions">
              <Magnetic><a href="#work" className="btn-primary">Explore my work <FaArrowDown /></a></Magnetic>
              <Magnetic><a href={`mailto:${EMAIL}`} className="btn-ghost">Get in touch ↗</a></Magnetic>
            </motion.div>
            <motion.div variants={reveal} className="hero-foot"><span>FRONTEND</span><b>✳</b><span>BACKEND</span><b>✳</b><span>INTEGRATION</span></motion.div>
          </motion.div>

          <motion.div className="hero-art" initial={{ opacity: 0, scale: 0.85 }} animate={ready ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 1, delay: 0.4, ease: EASE }}>
            <Tilt className="art-stage" max={8}>
              <div className="ring ring-1" /><div className="ring ring-2" />
              <div className="orbit">
                <span className="orbit-dot d1"><span><FaReact /></span></span>
                <span className="orbit-dot d2"><span><SiPhp /></span></span>
                <span className="orbit-dot d3"><span><SiMysql /></span></span>
              </div>
              <div className="monogram"><span>RS</span><small>DEVELOPER<br />BY PRACTICE</small></div>
              <motion.div className="float-tag tag-code" animate={{ y: [0, -10, 0] }} transition={{ duration: 3.5, repeat: Infinity }}><FaCode /> Clean code</motion.div>
              <motion.div className="float-tag tag-stack" animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity }}><SiNextdotjs /> Modern stack</motion.div>
            </Tilt>
            <div className="terminal">
              <div className="term-bar"><i /><i /><i /><span>rohan.js</span></div>
              <div className="term-body">
                <p><b>const</b> rohan = {"{"}</p>
                <p>&nbsp;&nbsp;role: <em>"Full Stack"</em>,</p>
                <p>&nbsp;&nbsp;open: <em>true</em><span className="caret" /></p>
                <p>{"}"};</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="hero-bottom">
          <span>01 / INTRODUCTION</span>
          <span className="live-pill"><i className="dot" /> LIVE · {visitorText} VISITORS</span>
          <span className="scroll-hint">SCROLL <FaArrowDown /></span>
        </div>
      </section>

      {/* TICKERS */}
      <div className="ticker"><div className="ticker-track">{[...skills, ...skills].map(([name], i) => <span key={`a-${name}-${i}`}>{name} <b>✳</b></span>)}</div></div>
      <div className="ticker outline"><div className="ticker-track reverse">{[...skills, ...skills].map(([name], i) => <span key={`b-${name}-${i}`}>{name} <b>✳</b></span>)}</div></div>

      {/* ABOUT */}
      <section className="section about" id="about">
        <Label>01 — ABOUT ME</Label>
        <div className="split">
          <Title a="Curiosity first." b="Solutions always." />
          <motion.div className="about-copy" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} custom={2}>
            <p>I'm a Full Stack Developer at <strong>ENATS LLP</strong>, working across web and mobile features, PHP backend services, APIs, databases and deployment-related troubleshooting.</p>
            <p>I enjoy taking a real requirement, understanding the problem and turning it into a responsive, practical and maintainable solution.</p>
            <a className="text-link" href="#journey">Explore my journey ↗</a>
          </motion.div>
        </div>

        <div className="metrics">
          {metrics.map((m, i) => (
            <motion.div className="metric" key={m.label} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}>
              <strong><CountUp to={m.to} suffix={m.suffix} /></strong><span>{m.label}</span>
            </motion.div>
          ))}
          <motion.div className="metric visitor-card" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3}>
            <strong>{error ? "—" : count === null ? <span className="pulse-text">···</span> : <Roll value={count} />}</strong>
            <span><i className="dot" /> PEOPLE VISITED THIS PORTFOLIO</span>
          </motion.div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="section skills-section" id="skills">
        <Label>02 — MY TOOLKIT</Label>
        <div className="split">
          <Title a="Tools for" b="building things." />
          <motion.p className="section-summary" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}>The languages, frameworks and platforms I use to build interfaces, connect services and work with data.</motion.p>
        </div>
        <div className="skills-grid">
          {skills.map(([name, Icon], i) => (
            <motion.div className="skill-card" key={name} onMouseMove={spot} initial={{ opacity: 0, y: 40, scale: 0.92 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, delay: (i % 4) * 0.07, ease: EASE }} whileHover={{ y: -8 }}>
              <div className="skill-top"><span className="skill-num">{String(i + 1).padStart(2, "0")}</span><FaArrowUpRightFromSquare className="skill-arrow" /></div>
              <Icon className="skill-icon" />
              <span className="skill-name">{name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WORK */}
      <section className="section work-section" id="work">
        <Label>03 — SELECTED WORK</Label>
        <div className="split">
          <Title a="Real work." b="Practical impact." />
          <motion.p className="section-summary" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}>Professional website work and personal projects, with the technologies and purpose behind each.</motion.p>
        </div>
        <div className="project-list">
          {projects.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.article className="project" key={p.number} onMouseMove={spot} initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.8, delay: i * 0.05, ease: EASE }}>
                <Tilt className={`project-art ${p.tone}`} max={7}>
                  <span className="project-bg-num">{p.number}</span>
                  <span className="project-num">{p.number} / 03</span>
                  <p>{p.title}</p>
                  <Icon className="project-icon" />
                </Tilt>
                <div className="project-copy">
                  <p className="project-type">{p.type}</p>
                  <h3>{p.title}</h3>
                  <p className="project-desc">{p.description}</p>
                  <div className="chips">{p.stack.split(" · ").map((s) => <span key={s}>{s}</span>)}</div>
                  {p.url ? (
                    <a className="project-link" href={p.url} target="_blank" rel="noreferrer">{p.label} <FaArrowUpRightFromSquare /></a>
                  ) : (
                    <span className="project-link muted-link">{p.label}</span>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* JOURNEY */}
      <section className="section journey-section" id="journey">
        <Label>04 — EXPERIENCE & EDUCATION</Label>
        <Title a="Every step" b="builds the next." />
        <div className="timeline" ref={timelineRef}>
          <div className="timeline-line"><motion.div className="timeline-fill" style={{ scaleY: tlScale }} /></div>
          {experience.map((e, i) => (
            <motion.div className="timeline-row" key={e.title} initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, delay: 0.05, ease: EASE }}>
              <span className="timeline-dot" />
              <span className="timeline-date">{e.date}</span>
              <div>
                <h3>{e.title}</h3>
                <p className="timeline-place">{e.place}</p>
                <p>{e.text}</p>
                {e.link && <a className="text-link" href={e.link} target="_blank" rel="noreferrer">View certificate ↗</a>}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact section" id="contact">
        <Label>05 — LET'S CONNECT</Label>
        <div className="contact-content">
          <Title a="Got a challenge?" b="Let's build." />
          <motion.p variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}>Open to discussing developer opportunities, collaborations and interesting problems worth solving.</motion.p>
          <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3}>
            <Magnetic><a className="email-link" href={`mailto:${EMAIL}`}><FaEnvelope /> <span>{EMAIL}</span> <FaArrowUpRightFromSquare /></a></Magnetic>
          </motion.div>
        </div>
        <div className="contact-details">
          <span><FaLocationDot /> MUMBAI, INDIA</span>
          <a href={`tel:${PHONE}`}><FaPhone /> +91 93245 19782</a>
          <a href="https://rwitc.com/" target="_blank" rel="noreferrer">RWITC WEBSITE ↗</a>
        </div>
      </section>

      <footer className="footer">
        <a className="logo" href="#home">rohan<span>®</span></a>
        <span>DESIGNED & BUILT BY ROHAN SINGH</span>
        <span>{error ? "" : `${visitorText} VISITS`} © 2026</span>
      </footer>

      <AnimatePresence>
        {showTop && (
          <motion.a href="#home" className="to-top" aria-label="Back to top" initial={{ opacity: 0, scale: 0.5, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.5, y: 20 }} whileHover={{ y: -4 }}>
            <FaArrowUp />
          </motion.a>
        )}
      </AnimatePresence>
    </main>
  );
}
"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, MotionConfig, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import {
  FaArrowRight, FaArrowUp, FaArrowUpRightFromSquare, FaBars, FaBriefcase, FaCloud, FaCode, FaDatabase,
  FaDownload, FaEye, FaGithub, FaInstagram, FaLocationDot, FaMobileScreen, FaReact, FaWhatsapp, FaXmark
} from "react-icons/fa6";
import { SiGmail, SiJavascript, SiLaravel, SiMongodb, SiMysql, SiNextdotjs, SiNodedotjs, SiPhp } from "react-icons/si";
import "./Home.css";

/* ---------------------------------- CONFIG ---------------------------------- */
// Files inside the /public folder (the leading slash is required)
const RESUME_FILE = "/Rohan_Singh_Resume.pdf"; // <-- change if your resume file name is different
const RESUME_NAME = "Rohan_Singh_Resume.pdf"; // file name used when the visitor downloads it
const PHOTO_FILE = "/rohan.jpg"; // <-- change if your photo file name is different

// Contact details
const EMAIL = "rohansingh5594@gmail.com";
const WHATSAPP_NUMBER = "919324519782"; // country code + number, no plus sign
const WHATSAPP_DISPLAY = "+91 93245 19782";
const INSTAGRAM_USERNAME = "your_instagram_username"; // <-- change to your Instagram username (without @)

const WA_MESSAGE = "Hi Rohan, I saw your portfolio and would like to connect.";
const MAIL_SUBJECT = "Hello Rohan";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;
const INSTAGRAM_LINK = `https://ig.me/m/${INSTAGRAM_USERNAME}`;
const MAILTO_LINK = `mailto:${EMAIL}?subject=${encodeURIComponent(MAIL_SUBJECT)}`;
const GMAIL_LINK = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${encodeURIComponent(MAIL_SUBJECT)}`;

const ROLES = ["Full Stack Developer", "Next.js Builder", "PHP & MySQL Engineer", "API Integrator"];
const NAV = ["About", "Skills", "Work", "Journey", "Contact"];
const EASE = [0.22, 0.8, 0.2, 1];

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
    url: "https://rwitc.com/", label: "VISIT LIVE WEBSITE", icon: FaBriefcase, tone: "blue"
  },
  {
    number: "02", title: "CineVault", type: "PERSONAL PROJECT",
    description: "A MERN movie-management app with dynamic movie creation and listing, REST APIs, MongoDB storage, reusable React components and client-side validation.",
    stack: "React · Node.js · Express · MongoDB",
    url: "", label: "PERSONAL PROJECT", icon: FaReact, tone: "pink"
  },
  {
    number: "03", title: "User Profile & Task Manager", type: "PERSONAL PROJECT",
    description: "A responsive PHP application with registration and login, session handling, profile photo uploads, user-detail updates and task CRUD operations.",
    stack: "PHP · MySQL · JavaScript · Bootstrap",
    url: "", label: "PERSONAL PROJECT", icon: FaDatabase, tone: "mint"
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

// Gmail opens the web compose window on desktop, and the mail app on mobile
const openGmail = (e) => {
  const mobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (mobile) return;
  e.preventDefault();
  window.open(GMAIL_LINK, "_blank", "noopener,noreferrer");
};

const channels = [
  { key: "wa", name: "WHATSAPP", value: WHATSAPP_DISPLAY, hint: "Opens a direct chat", href: WHATSAPP_LINK, icon: FaWhatsapp, external: true },
  { key: "ig", name: "INSTAGRAM", value: `@${INSTAGRAM_USERNAME}`, hint: "Opens a direct message", href: INSTAGRAM_LINK, icon: FaInstagram, external: true },
  { key: "gm", name: "GMAIL", value: EMAIL, hint: "Opens a new mail", href: MAILTO_LINK, icon: SiGmail, onClick: openGmail }
];

/* ------------------------------- ANIMATION BITS ------------------------------ */
// Generic fade-up with a soft blur, delay is controlled through the `custom` prop
const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: (i = 0) => ({ opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, delay: i * 0.08, ease: EASE } })
};

// Word-by-word reveal used for headings
const wordV = {
  hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
  visible: (d = 0) => ({ opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, delay: d, ease: EASE } })
};

function Words({ text, className = "", delay = 0, inView = false }) {
  const words = text.split(" ");
  const trigger = inView
    ? { whileInView: "visible", viewport: { once: true, amount: 0.6 } }
    : { animate: "visible" };
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`}>
          <motion.span className="w" variants={wordV} initial="hidden" custom={delay + i * 0.07} {...trigger}>{w}</motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </span>
  );
}

function Title({ a, b, className = "" }) {
  return (
    <h2 className={`title ${className}`}>
      <Words inView text={a} className="t-line" />
      <Words inView text={b} className="t-line accent" delay={0.18} />
    </h2>
  );
}

function Label({ children }) {
  return (
    <motion.p className="label" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      <motion.i initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.2, ease: EASE }} /> {children}
    </motion.p>
  );
}

function ResumeButtons() {
  return (
    <div className="resume-btns">
      <a href={RESUME_FILE} target="_blank" rel="noreferrer" className="btn-primary shine"><FaEye /> View Resume</a>
      <a href={RESUME_FILE} download={RESUME_NAME} className="btn-ghost"><FaDownload /> Download Resume</a>
    </div>
  );
}

/* ------------------------------- ANIMATED BACKGROUND ------------------------------ */
// Particle network canvas: runs the whole time, reacts to the mouse, pauses when the tab is hidden
function NetworkBackground() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const LINK = 130;
    const mouse = { x: -9999, y: -9999 };
    let w = 0, h = 0, raf = 0, particles = [];

    const seed = () => {
      const count = Math.max(28, Math.min(90, Math.floor((w * h) / 16000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.4 + 0.6
      }));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const nw = window.innerWidth;
      const nh = window.innerHeight;
      const widthChanged = nw !== w;
      w = nw; h = nh;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Re-seed only when the width changes (mobile address bar resize should not reset particles)
      if (widthChanged || !particles.length) seed();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!reduce) {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
        }
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d = Math.hypot(dx, dy);
        // Gently push particles away from the cursor
        if (d < 120 && d > 0) { p.x += (dx / d) * 1.2; p.y += (dy / d) * 1.2; }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(140,175,255,0.75)";
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dist = Math.hypot(p.x - q.x, p.y - q.y);
          if (dist < LINK) {
            ctx.strokeStyle = `rgba(91,140,255,${(1 - dist / LINK) * 0.28})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
        // Cyan lines between the cursor and nearby particles
        if (d < 160) {
          ctx.strokeStyle = `rgba(34,211,238,${(1 - d / 160) * 0.5})`;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else if (!reduce) raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="bg" aria-hidden="true">
      <i className="glow g1" /><i className="glow g2" /><i className="glow g3" />
      <div className="bg-grid" />
      <canvas ref={ref} className="bg-canvas" />
    </div>
  );
}

/* ------------------------------------ HOOKS ------------------------------------ */
function CountUp({ to, format = (n) => String(n) }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const duration = 1800;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      setValue(Math.round(to * (1 - Math.pow(1 - p, 4))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return <span ref={ref}>{format(value)}</span>;
}

// Roles slide up one after another inside a clipped window
function RoleRotator() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % ROLES.length), 2600);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="role-window">
      <AnimatePresence mode="wait">
        <motion.span
          key={ROLES[i]}
          className="role"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          {ROLES[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// Chat bubble entrance for the contact preview
const bubble = (i) => ({
  initial: { opacity: 0, scale: 0.85, y: 14 },
  whileInView: { opacity: 1, scale: 1, y: 0 },
  viewport: { once: true },
  transition: { delay: 0.3 + i * 0.55, duration: 0.5, ease: EASE }
});

/* ----------------------------------- PAGE ----------------------------------- */
export default function Home() {
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("home");
  const [showTop, setShowTop] = useState(false);
  const [hideNav, setHideNav] = useState(false);
  const [imgOk, setImgOk] = useState(true);
  const lastY = useRef(0);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  // Photo moves slightly slower than the page for a parallax feel
  const photoY = useTransform(scrollY, [0, 700], [0, -50]);

  const timelineRef = useRef(null);
  const { scrollYProgress: tlProgress } = useScroll({ target: timelineRef, offset: ["start 75%", "end 60%"] });
  const tlScale = useSpring(tlProgress, { stiffness: 100, damping: 25 });

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menu]);

  // Back-to-top visibility and navbar hide on scroll down / show on scroll up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setShowTop(y > 600);
      setHideNav(y > 120 && y > lastY.current);
      lastY.current = y;
    };
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

  return (
    <MotionConfig reducedMotion="user">
      <main className="portfolio" id="home">
        <NetworkBackground />

        {/* NAVBAR */}
        <motion.header className="nav" initial={{ y: -80, opacity: 0 }} animate={{ y: hideNav && !menu ? -100 : 0, opacity: 1 }} transition={{ duration: 0.45, ease: EASE }}>
          <div className="nav-inner">
            <a className="logo" href="#home">rohan<span>®</span></a>
            <nav className="nav-links">
              {NAV.map((x) => {
                const id = x.toLowerCase();
                return (
                  <a key={x} href={`#${id}`} className={active === id ? "active" : ""}>
                    {active === id && <motion.span layoutId="nav-pill" className="nav-pill" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                    <span>{x}</span>
                  </a>
                );
              })}
            </nav>
            <a className="nav-cta" href="#contact">Let's talk <FaArrowRight /></a>
            <button className="burger" onClick={() => setMenu(true)} aria-label="Open menu"><FaBars /></button>
            <motion.i className="nav-progress" style={{ scaleX: progress }} />
          </div>
        </motion.header>

        <AnimatePresence>
          {menu && (
            <motion.div className="drawer" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}>
              <button className="drawer-close" onClick={() => setMenu(false)} aria-label="Close menu"><FaXmark /></button>
              <nav className="drawer-links">
                {NAV.map((x, i) => (
                  <motion.a key={x} href={`#${x.toLowerCase()}`} onClick={() => setMenu(false)} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.07, duration: 0.5, ease: EASE }}>
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
          <motion.div className="hero-status" variants={fadeUp} initial="hidden" animate="visible" custom={2}>
            <span><i className="dot" /> AVAILABLE FOR OPPORTUNITIES</span>
            <span>MUMBAI, INDIA <FaLocationDot /></span>
          </motion.div>

          <div className="hero-layout">
            <motion.div className="hero-copy" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } }}>
              <motion.p variants={fadeUp} className="eyebrow">FULL STACK DEVELOPER · PORTFOLIO 2026</motion.p>
              <h1>
                <Words className="h-line" text="I make the" delay={0.2} />
                <Words className="h-line" text="digital world" delay={0.4} />
                <Words className="h-line accent" text="work better." delay={0.65} />
              </h1>
              <motion.p variants={fadeUp} className="role-line"><span className="prompt">›</span> <RoleRotator /></motion.p>
              <motion.p variants={fadeUp} className="intro">I'm Rohan Singh — a full stack developer building responsive web experiences, mobile features and dependable backend solutions.</motion.p>
              <motion.div variants={fadeUp}><ResumeButtons /></motion.div>
              <motion.div variants={fadeUp} className="hero-foot"><span>FRONTEND</span><b /><span>BACKEND</span><b /><span>INTEGRATION</span></motion.div>
            </motion.div>

            <motion.div className="hero-art" initial={{ opacity: 0, y: 40, scale: 0.96, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }} transition={{ duration: 1, delay: 0.5, ease: EASE }}>
              <motion.div className="photo-wrap" style={{ y: photoY }}>
                <i className="photo-glow" />
                <div className="photo-card">
                  <div className="photo-inner">
                    {imgOk ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img className="photo" src={PHOTO_FILE} alt="Rohan Singh" onError={() => setImgOk(false)} />
                    ) : (
                      <div className="photo-fallback">RS</div>
                    )}
                    <div className="photo-shade" />
                    <div className="photo-caption">
                      <h3>Rohan Singh</h3>
                      <p>Full Stack Developer · ENATS LLP</p>
                    </div>
                  </div>
                </div>
                <motion.div className="fchip c1" animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}><SiNextdotjs /> Next.js</motion.div>
                <motion.div className="fchip c2" animate={{ y: [0, 10, 0] }} transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}><SiPhp /> PHP · MySQL</motion.div>
                <motion.div className="fchip c3" animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}><FaReact /> React</motion.div>
                <motion.div className="fchip c4" animate={{ y: [0, 8, 0] }} transition={{ duration: 4.3, repeat: Infinity, ease: "easeInOut" }}><i className="dot" /> Open to work</motion.div>
              </motion.div>
            </motion.div>
          </div>

          <div className="hero-bottom">
            <span>01 / INTRODUCTION</span>
            <span className="scroll-hint"><i className="wheel"><b /></i> SCROLL</span>
          </div>
        </section>

        {/* ABOUT */}
        <section className="section about" id="about">
          <Label>01 — ABOUT ME</Label>
          <div className="split">
            <Title a="Curiosity first." b="Solutions always." />
            <motion.div className="about-copy" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} custom={2}>
              <p>I'm a Full Stack Developer at <strong>ENATS LLP</strong>, working across web and mobile features, PHP backend services, APIs, databases and deployment-related troubleshooting.</p>
              <p>I enjoy taking a real requirement, understanding the problem and turning it into a responsive, practical and maintainable solution.</p>
              <a className="text-link" href="#journey">Explore my journey ↗</a>
            </motion.div>
          </div>

          <div className="metrics">
            {metrics.map((m, i) => (
              <motion.div className="metric shine" key={m.label} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} whileHover={{ y: -5 }}>
                <strong><CountUp to={m.to} format={(n) => `${String(n).padStart(2, "0")}${m.suffix}`} /></strong>
                <span>{m.label}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section className="section skills-section" id="skills">
          <Label>02 — MY TOOLKIT</Label>
          <div className="split">
            <Title a="Tools for" b="building things." />
            <motion.p className="section-summary" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}>The languages, frameworks and platforms I use to build interfaces, connect services and work with data.</motion.p>
          </div>
          <div className="skills-grid">
            {skills.map(([name, Icon], i) => (
              <motion.div className="skill-card shine" key={name} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} custom={i % 4} whileHover={{ y: -6 }}>
                <div className="skill-top"><span className="skill-num">{String(i + 1).padStart(2, "0")}</span><FaArrowUpRightFromSquare className="skill-arrow" /></div>
                <Icon className="skill-icon" style={{ "--i": i }} />
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
            <motion.p className="section-summary" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}>Professional website work and personal projects, with the technologies and purpose behind each.</motion.p>
          </div>
          <div className="project-list">
            {projects.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.article className="project" key={p.number} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} custom={i * 0.5}>
                  <div className={`project-art ${p.tone}`}>
                    <span className="project-bg-num">{p.number}</span>
                    <span className="project-num">{p.number} / 03</span>
                    <p>{p.title}</p>
                    <Icon className="project-icon" />
                  </div>
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
            {experience.map((e) => (
              <motion.div className="timeline-row" key={e.title} initial={{ opacity: 0, x: -36, filter: "blur(6px)" }} whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, ease: EASE }}>
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
        <section className="section contact" id="contact">
          <div className="contact-panel">
            <i className="cp-orb o1" /><i className="cp-orb o2" />

            <div className="contact-left">
              <motion.p className="contact-tag" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <i className="dot" /> OPEN TO NEW OPPORTUNITIES
              </motion.p>
              <Title a="Got an idea?" b="Let's talk." className="title-lg" />
              <motion.p className="contact-text" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}>
                Pick whichever is easiest for you. WhatsApp and Instagram open a direct chat with me, and Gmail opens a ready-to-send mail.
              </motion.p>

              <div className="chat">
                <motion.div className="bubble you" {...bubble(0)}>Hi Rohan, I have a project idea.</motion.div>
                <motion.div className="bubble me" {...bubble(1)}>Sounds great. Tell me more!</motion.div>
                <motion.div className="typing" {...bubble(2)}><i /><i /><i /></motion.div>
              </div>

              <motion.span className="contact-loc" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3}>
                <FaLocationDot /> MUMBAI, INDIA
              </motion.span>
            </div>

            <div className="contact-right">
              {channels.map((c, i) => {
                const Icon = c.icon;
                return (
                  <motion.a
                    key={c.key}
                    className={`channel ${c.key} shine`}
                    href={c.href}
                    onClick={c.onClick}
                    {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    custom={i + 1}
                    whileHover={{ x: 6 }}
                  >
                    <span className="ch-icon"><Icon /></span>
                    <span className="ch-text">
                      <span className="ch-name">{c.name}</span>
                      <span className="ch-value">{c.value}</span>
                      <span className="ch-hint">{c.hint}</span>
                    </span>
                    <span className="ch-arrow"><FaArrowRight /></span>
                  </motion.a>
                );
              })}

              <motion.div className="contact-resume" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={4}>
                <p>WANT THE FULL STORY?</p>
                <ResumeButtons />
              </motion.div>
            </div>
          </div>
        </section>

        <footer className="footer">
          <a className="logo" href="#home">rohan<span>®</span></a>
          <span>DESIGNED & BUILT BY ROHAN SINGH</span>
          <span>© 2026</span>
        </footer>

        <AnimatePresence>
          {showTop && (
            <motion.a href="#home" className="to-top" aria-label="Back to top" initial={{ opacity: 0, scale: 0.5, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.5, y: 20 }} whileHover={{ y: -4 }}>
              <FaArrowUp />
            </motion.a>
          )}
        </AnimatePresence>
      </main>
    </MotionConfig>
  );
}
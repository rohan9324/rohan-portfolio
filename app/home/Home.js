"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence, motion, MotionConfig, useInView, useMotionValue, useScroll, useSpring, useTransform
} from "framer-motion";
import {
  FaArrowRight, FaArrowUp, FaArrowUpRightFromSquare, FaBars, FaCheck, FaCloud, FaCode, FaCopy,
  FaDownload, FaEye, FaGithub, FaGooglePlay, FaGraduationCap, FaHouse, FaInstagram, FaLocationDot,
  FaMagnifyingGlass, FaMobileScreen, FaReact, FaWhatsapp, FaXmark
} from "react-icons/fa6";
import { SiGmail, SiJavascript, SiLaravel, SiMongodb, SiMysql, SiNextdotjs, SiNodedotjs, SiPhp } from "react-icons/si";
import "./Home.css";

/* ---------------------------------- CONFIG ---------------------------------- */
// Files inside the /public folder (the leading slash is required)
const RESUME_FILE = "/Rohan_Singh_Resume.pdf";
const RESUME_NAME = "Rohan_Singh_Resume.pdf";
const PHOTO_FILE = "/rohan.jpg";

// Contact details
const EMAIL = "rohansingh5594@gmail.com";
const WHATSAPP_NUMBER = "919324519782";
const WHATSAPP_DISPLAY = "+91 93245 19782";
const INSTAGRAM_USERNAME = "rohansingh._19";
const GITHUB_USERNAME = "rohan9324";

// Project links
const RWITC_URL = "https://rwitc.com/";
const INTUCATE_WEB = "https://register.intucate.com/";
const INTUCATE_APP = "https://play.google.com/store/apps/details?id=com.tech.intucate";

const WA_MESSAGE = "Hi Rohan, I saw your portfolio and would like to connect.";
const MAIL_SUBJECT = "Hello Rohan";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;
const INSTAGRAM_LINK = `https://ig.me/m/${INSTAGRAM_USERNAME}`;
const GITHUB_LINK = `https://github.com/${GITHUB_USERNAME}`;
const MAILTO_LINK = `mailto:${EMAIL}?subject=${encodeURIComponent(MAIL_SUBJECT)}`;
const GMAIL_LINK = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${encodeURIComponent(MAIL_SUBJECT)}`;

const ROLES = ["Full Stack Developer", "Next.js Builder", "PHP & MySQL Engineer", "API Integrator"];
const NAV = ["About", "Stack", "Work", "Journey", "Contact"];
const EASE = [0.22, 0.8, 0.2, 1];

/* ----------------------------------- DATA ----------------------------------- */
const skills = [
  { name: "JavaScript", icon: SiJavascript, cat: "Frontend" },
  { name: "React.js", icon: FaReact, cat: "Frontend" },
  { name: "Next.js", icon: SiNextdotjs, cat: "Frontend" },
  { name: "React Native / Expo", icon: FaMobileScreen, cat: "Frontend" },
  { name: "PHP", icon: SiPhp, cat: "Backend" },
  { name: "Laravel", icon: SiLaravel, cat: "Backend" },
  { name: "Node.js / Express", icon: SiNodedotjs, cat: "Backend" },
  { name: "REST APIs", icon: FaCode, cat: "Backend" },
  { name: "MySQL / SQL", icon: SiMysql, cat: "Database" },
  { name: "MongoDB", icon: SiMongodb, cat: "Database" },
  { name: "AWS S3 / CloudFront", icon: FaCloud, cat: "Cloud & Tools" },
  { name: "Git & GitHub", icon: FaGithub, cat: "Cloud & Tools" }
];
const CATS = ["Frontend", "Backend", "Database", "Cloud & Tools"];

// Order of this array is the order on the page. `links` can be empty for projects without a public link.
const projects = [
  {
    title: "User Profile & Task Manager", type: "Personal project", mock: "tasks", host: "localhost:3000",
    description: "A responsive PHP application for user management: registration and login, session handling, profile photo uploads, user-detail updates and task CRUD operations.",
    highlights: ["Registration & login", "Session handling", "Profile photo uploads", "User-detail updates", "Task CRUD"],
    stack: ["PHP", "MySQL", "JavaScript", "Bootstrap"],
    links: [], note: "Personal project"
  },
  {
    title: "RWITC Website & Admin Platform", type: "Professional experience", mock: "site", host: "rwitc.com",
    description: "Worked on the full stack of the Royal Western India Turf Club platform: Next.js pages, PHP admin modules, MySQL-backed APIs, access control, article management, media delivery from S3 and performance troubleshooting.",
    highlights: ["Next.js pages", "PHP admin modules", "API integration", "Access control", "Article management", "Media delivery", "Performance troubleshooting"],
    stack: ["Next.js", "PHP", "MySQL", "AWS S3", "CloudFront"],
    links: [{ label: "Visit live website", url: RWITC_URL, icon: FaArrowUpRightFromSquare }]
  },
  {
    title: "Intucate — CA Exam Prep", type: "Professional experience", mock: "learn", host: "register.intucate.com",
    description: "Frontend work on Intucate, a CA exam-preparation platform, across its registration web app and its Android app: responsive screens, referral-based sign-up flow and clean, fast interfaces for students.",
    highlights: ["Responsive frontend", "Registration & referral sign-up", "Android app screens", "Reusable components", "API integration"],
    stack: ["React", "JavaScript", "REST APIs", "Android"],
    links: [
      { label: "Open web app", url: INTUCATE_WEB, icon: FaArrowUpRightFromSquare },
      { label: "Get it on Google Play", url: INTUCATE_APP, icon: FaGooglePlay }
    ]
  }
].map((p, i) => ({ ...p, number: String(i + 1).padStart(2, "0") }));

const experience = [
  { date: "2025 — Present", title: "Full Stack Developer", place: "ENATS LLP · Mumbai, India", text: "Building and maintaining web and mobile features, integrating APIs, developing admin modules, managing database-driven functionality and troubleshooting production issues." },
  { date: "Jul 2025", title: "Full Stack Developer Training", place: "SDAC InfoTech · Grade A", text: "Full Stack Developer training and practical software development foundations.", link: "https://drive.google.com/file/d/1oFL0dVD5p2PNPjLd4ORSGhscVOissay1/view" },
  { date: "2024", title: "B.Sc. Information Technology", place: "Smt. K. G. Mittal Institute of Management, Information Technology and Research", text: "Graduated with 6.95 / 10." },
  { date: "2021 / 2019", title: "HSC & SSC", place: "P. D. Turakhia Junior College / Shivaji Vidya Mandir High School", text: "HSC: 72.67% · SSC: 63.40%." }
];

const stats = [
  { to: 1, suffix: "+", label: "Year of experience" },
  { to: skills.length, suffix: "", label: "Core technologies" },
  { to: projects.length, suffix: "", label: "Projects showcased" }
];

const ABOUT_TEXT =
  "I'm a Full Stack Developer at ENATS LLP. I take a real requirement, understand the problem behind it and turn it into a responsive, practical and maintainable product, from the interface to the API to the database.";

// Gmail opens the web compose window on desktop, and the mail app on mobile
const isMobile = () => /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
const openGmail = (e) => {
  if (isMobile()) return;
  e.preventDefault();
  window.open(GMAIL_LINK, "_blank", "noopener,noreferrer");
};

const channels = [
  { key: "wa", name: "WhatsApp", value: WHATSAPP_DISPLAY, hint: "Opens a direct chat", href: WHATSAPP_LINK, icon: FaWhatsapp, external: true },
  { key: "ig", name: "Instagram", value: `@${INSTAGRAM_USERNAME}`, hint: "Opens a direct message", href: INSTAGRAM_LINK, icon: FaInstagram, external: true },
  { key: "gm", name: "Gmail", value: EMAIL, hint: "Opens a new mail", href: MAILTO_LINK, icon: SiGmail, onClick: openGmail },
  { key: "gh", name: "GitHub", value: `@${GITHUB_USERNAME}`, hint: "See my code", href: GITHUB_LINK, icon: FaGithub, external: true }
];

/* ------------------------------- ANIMATION BITS ------------------------------ */
// Soft fade used for small supporting elements
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: i * 0.08, ease: EASE } })
};

// Masked slide-up used for headings: the text rises out of an invisible line
const maskV = {
  hide: { y: "118%", rotate: 3 },
  show: (d = 0) => ({ y: "0%", rotate: 0, transition: { duration: 1, delay: d, ease: EASE } })
};

function Lines({ text, className = "", delay = 0, play = true, inView = false }) {
  const words = text.split(" ");
  const trigger = inView
    ? { whileInView: "show", viewport: { once: true, amount: 0.6 } }
    : { animate: play ? "show" : "hide" };
  return (
    <span className={`line-wrap ${className}`}>
      {words.map((w, i) => (
        <span className="mask" key={`${w}-${i}`}>
          <motion.span className="mask-in" variants={maskV} initial="hide" custom={delay + i * 0.06} {...trigger}>{w}</motion.span>
        </span>
      ))}
    </span>
  );
}

function Title({ a, b, className = "" }) {
  return (
    <h2 className={`title ${className}`}>
      <Lines inView text={a} />
      <Lines inView text={b} className="dim" delay={0.16} />
    </h2>
  );
}

function SectionLabel({ children }) {
  return (
    <motion.p className="label" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      <motion.i initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.15, ease: EASE }} />
      {children}
    </motion.p>
  );
}

// Paragraph whose words light up one by one while the page scrolls
function ScrollWord({ w, range, progress }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <>
      <motion.span className="sw-word" style={{ opacity }}>{w}</motion.span>{" "}
    </>
  );
}
function ScrollText({ text, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 82%", "end 48%"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <ScrollWord key={`${w}-${i}`} w={w} progress={scrollYProgress} range={[i / words.length, Math.min(1, (i + 1.6) / words.length)]} />
      ))}
    </p>
  );
}

// Moves its child slightly towards the cursor
function Magnetic({ children, strength = 0.3 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16 });
  const sy = useSpring(y, { stiffness: 220, damping: 16 });
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * strength);
  };
  const leave = () => { x.set(0); y.set(0); };
  return (
    <motion.div ref={ref} className="magnetic" style={{ x: sx, y: sy }} onMouseMove={move} onMouseLeave={leave}>
      {children}
    </motion.div>
  );
}

// 3D tilt that follows the cursor
function Tilt({ children, className = "", max = 7 }) {
  const ref = useRef(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), { stiffness: 150, damping: 18 });
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const leave = () => { px.set(0); py.set(0); };
  return (
    <motion.div ref={ref} className={className} style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }} onMouseMove={move} onMouseLeave={leave}>
      {children}
    </motion.div>
  );
}

// Updates CSS variables so a card spotlight follows the mouse
const spot = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};

// Endless horizontal ticker
function Marquee({ items, reverse = false }) {
  const base = [...items, ...items];
  const list = [...base, ...base];
  return (
    <div className="marquee" aria-hidden="true">
      <div className={`marquee-track ${reverse ? "rev" : ""}`}>
        {list.map((t, i) => (<span key={`${t}-${i}`} className="marquee-item">{t}<i /></span>))}
      </div>
    </div>
  );
}

function ResumeButtons() {
  return (
    <div className="resume-btns">
      <Magnetic strength={0.2}><a href={RESUME_FILE} target="_blank" rel="noreferrer" className="btn-primary"><span>View resume</span><FaEye /></a></Magnetic>
      <Magnetic strength={0.2}><a href={RESUME_FILE} download={RESUME_NAME} className="btn-ghost"><span>Download resume</span><FaDownload /></a></Magnetic>
    </div>
  );
}

/* ------------------------------------ HOOKS ------------------------------------ */
// Text that "decodes" from random glyphs into the next word
const GLYPHS = "!<>-_/[]{}=+*^?#";
function useScramble(words, hold = 2600) {
  const [text, setText] = useState(words[0]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let i = 0, raf = 0, timer = 0;

    const scrambleTo = (from, to, done) => {
      const len = Math.max(from.length, to.length);
      const queue = Array.from({ length: len }, (_, k) => {
        const start = Math.floor(Math.random() * 12);
        return { from: from[k] || "", to: to[k] || "", start, end: start + 10 + Math.floor(Math.random() * 14) };
      });
      let frame = 0;
      const tick = () => {
        let out = "";
        let complete = 0;
        for (const q of queue) {
          if (frame >= q.end) { complete++; out += q.to; }
          else if (frame >= q.start) out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          else out += q.from;
        }
        setText(out);
        if (complete === queue.length) { done(); return; }
        frame++;
        raf = requestAnimationFrame(tick);
      };
      tick();
    };

    const loop = () => {
      timer = window.setTimeout(() => {
        const next = (i + 1) % words.length;
        if (reduce) { i = next; setText(words[i]); loop(); return; }
        scrambleTo(words[i], words[next], () => { i = next; loop(); });
      }, hold);
    };
    loop();
    return () => { clearTimeout(timer); cancelAnimationFrame(raf); };
  }, [words, hold]);

  return text;
}

// Live local time in Mumbai
function useMumbaiTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: "Asia/Kolkata" });
    const update = () => setTime(fmt.format(new Date()).toUpperCase());
    update();
    const id = setInterval(update, 20000);
    return () => clearInterval(id);
  }, []);
  return time;
}

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

/* ------------------------------------ PRELOADER ----------------------------------- */
// One orchestrated opening moment: a counter runs, then the curtain lifts to reveal the hero
function Preloader({ onDone }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    let raf, timer;
    const start = performance.now();
    const duration = 1700;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      setN(Math.round(100 * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
      else timer = setTimeout(() => onDone(true), 350);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); clearTimeout(timer); };
  }, [onDone]);

  return (
    <motion.div className="preloader" initial={{ y: 0 }} exit={{ y: "-100%" }} transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}>
      <div className="pre-top">
        <span>Rohan Singh</span>
        <span>Portfolio</span>
      </div>
      <div className="pre-count">{String(n).padStart(3, "0")}</div>
      <div className="pre-bar"><motion.i style={{ scaleX: n / 100 }} /></div>
    </motion.div>
  );
}

/* ------------------------------- ANIMATED BACKGROUND ------------------------------ */
// Slow drifting glow, a faint grid that fades out, a cursor spotlight and film grain
function Background() {
  const ref = useRef(null);
  useEffect(() => {
    const onMove = (e) => {
      if (!ref.current) return;
      ref.current.style.setProperty("--gx", `${e.clientX}px`);
      ref.current.style.setProperty("--gy", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div className="bg" ref={ref} aria-hidden="true">
      <i className="glow g-1" /><i className="glow g-2" />
      <div className="bg-grid" />
      <i className="bg-spot" />
      <i className="grain" />
    </div>
  );
}

// Cursor: a small dot plus a trailing ring that grows on links and shows labels (desktop only)
function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const dx = useSpring(x, { stiffness: 700, damping: 45, mass: 0.3 });
  const dy = useSpring(y, { stiffness: 700, damping: 45, mass: 0.3 });
  const rx = useSpring(x, { stiffness: 160, damping: 22 });
  const ry = useSpring(y, { stiffness: 160, damping: 22 });

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setEnabled(true);
    const move = (e) => { x.set(e.clientX); y.set(e.clientY); setVisible(true); };
    const over = (e) => {
      const t = e.target.closest ? e.target.closest("[data-cursor], a, button, input") : null;
      setHover(!!t);
      setLabel(t && t.getAttribute ? t.getAttribute("data-cursor") || "" : "");
    };
    const leave = () => setVisible(false);
    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);

  if (!enabled) return null;
  return (
    <>
      <motion.div className="cursor-ring" style={{ x: rx, y: ry }}>
        <span className={`cr ${visible ? "show" : ""} ${hover ? "on" : ""} ${label ? "labeled" : ""}`}>{label}</span>
      </motion.div>
      <motion.div className={`cursor-dot ${visible ? "show" : ""}`} style={{ x: dx, y: dy }} />
    </>
  );
}

/* ------------------------------- COMMAND PALETTE ------------------------------ */
function CommandPalette({ open, onClose, actions }) {
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const needle = q.trim().toLowerCase();
  const filtered = actions.filter((a) => `${a.group} ${a.label}`.toLowerCase().includes(needle));

  useEffect(() => {
    if (!open) return;
    setQ("");
    setIdx(0);
    const t = setTimeout(() => inputRef.current && inputRef.current.focus(), 60);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => { setIdx(0); }, [q]);

  useEffect(() => {
    if (!listRef.current) return;
    const el = listRef.current.querySelector(".cmd-item.on");
    if (el) el.scrollIntoView({ block: "nearest" });
  }, [idx, open]);

  const run = (a) => { onClose(); setTimeout(() => a.run(), 150); };
  const onKey = (e) => {
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowDown") { e.preventDefault(); setIdx((i) => Math.min(i + 1, filtered.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setIdx((i) => Math.max(i - 1, 0)); }
    else if (e.key === "Enter" && filtered[idx]) { e.preventDefault(); run(filtered[idx]); }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="cmd-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onClose}>
          <motion.div
            className="cmd" role="dialog" aria-modal="true" aria-label="Command palette"
            initial={{ opacity: 0, y: -18, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.28, ease: EASE }} onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="cmd-input">
              <FaMagnifyingGlass />
              <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={onKey} placeholder="Type a command or search" aria-label="Search commands" />
              <kbd>Esc</kbd>
            </div>
            <div className="cmd-list" ref={listRef}>
              {filtered.length === 0 && <p className="cmd-empty">No results. Try another word.</p>}
              {filtered.map((a, i) => {
                const Icon = a.icon;
                return (
                  <button key={a.id} className={`cmd-item ${i === idx ? "on" : ""}`} onMouseEnter={() => setIdx(i)} onClick={() => run(a)}>
                    <span className="cmd-ico"><Icon /></span>
                    <span className="cmd-label">{a.label}</span>
                    <span className="cmd-group">{a.group}</span>
                  </button>
                );
              })}
            </div>
            <div className="cmd-foot">
              <span><kbd>↑</kbd><kbd>↓</kbd> move</span>
              <span><kbd>↵</kbd> open</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------- PROJECT VISUALS ------------------------------ */
// Abstract CSS "screens" so the cards do not need screenshots
function Mock({ kind, host }) {
  return (
    <div className={`mock ${kind}`}>
      <div className="mock-bar"><i /><i /><i /><span>{host}</span></div>
      <div className="mock-body">
        {kind === "site" && (
          <>
            <div className="m-hero"><b /><b /><em /></div>
            <div className="m-cards"><i /><i /><i /></div>
            <div className="m-lines"><b /><b /><b /></div>
          </>
        )}
        {kind === "learn" && (
          <>
            <div className="m-top"><b /><span className="m-coin" /></div>
            <div className="m-hero"><b /><b /><em /></div>
            <div className="m-bars">{[42, 68, 54, 86, 62, 92].map((h, n) => <i key={n} style={{ "--h": `${h}%`, "--n": n }} />)}</div>
          </>
        )}
        {kind === "tasks" && (
          <div className="m-tasks">{[0, 1, 2, 3].map((n) => <div key={n} style={{ "--n": n }}><i /><b /></div>)}</div>
        )}
      </div>
    </div>
  );
}

// Stacking chapter: the card sticks, shrinks and fades back while the next one slides over it
function Chapter({ p, i, total, progress }) {
  const from = i / total;
  const to = (i + 1) / total;
  const last = i === total - 1;
  const scale = useTransform(progress, last ? [0, 1] : [from, to], last ? [1, 1] : [1, 0.92]);
  const dim = useTransform(progress, last ? [0, 1] : [from, to], last ? [0, 0] : [0, 0.55]);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const visualY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <div className="chapter" style={{ "--i": i }} ref={ref}>
      <motion.article className="chapter-card spot" style={{ scale }} onMouseMove={spot}>
        <div className="chapter-visual">
          <motion.div className="visual-inner" style={{ y: visualY }}><Mock kind={p.mock} host={p.host} /></motion.div>
        </div>
        <div className="chapter-copy">
          <p className="chapter-type">{p.type}</p>
          <h3>{p.title}</h3>
          <p className="chapter-desc">{p.description}</p>
          <ul className="chapter-points">{p.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
          <div className="chips">{p.stack.map((s) => <span key={s}>{s}</span>)}</div>
          {p.links.length > 0 ? (
            <div className="chapter-links">
              {p.links.map((l) => {
                const Icon = l.icon;
                return (
                  <a key={l.url} className="project-link" href={l.url} target="_blank" rel="noreferrer" data-cursor="Visit">{l.label} <Icon /></a>
                );
              })}
            </div>
          ) : (
            <span className="project-link muted-link">{p.note}</span>
          )}
        </div>
        <motion.i className="chapter-dim" style={{ opacity: dim }} />
      </motion.article>
    </div>
  );
}

/* ----------------------------------- PAGE ----------------------------------- */
export default function Home() {
  const [ready, setReady] = useState(false);
  const [menu, setMenu] = useState(false);
  const [palette, setPalette] = useState(false);
  const [active, setActive] = useState("home");
  const [showTop, setShowTop] = useState(false);
  const [hideNav, setHideNav] = useState(false);
  const [imgOk, setImgOk] = useState(true);
  const [toast, setToast] = useState("");
  const lastY = useRef(0);
  const toastTimer = useRef(null);

  const role = useScramble(ROLES);
  const time = useMumbaiTime();

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  // Hero parallax: photo drifts slower than the page, headline drifts up and fades
  const photoY = useTransform(scrollY, [0, 800], [0, -70]);
  const heroTextY = useTransform(scrollY, [0, 700], [0, 90]);
  const heroTextOpacity = useTransform(scrollY, [0, 520], [1, 0.15]);

  const stackRef = useRef(null);
  const { scrollYProgress: stackP } = useScroll({ target: stackRef, offset: ["start start", "end end"] });

  const timelineRef = useRef(null);
  const { scrollYProgress: tlProgress } = useScroll({ target: timelineRef, offset: ["start 75%", "end 60%"] });
  const tlScale = useSpring(tlProgress, { stiffness: 100, damping: 25 });

  const showToast = useCallback((message) => {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2200);
  }, []);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      showToast("Email copied to clipboard");
    } catch {
      showToast(EMAIL);
    }
  }, [showToast]);

  // Lock page scroll while the preloader or an overlay is open
  useEffect(() => {
    document.body.style.overflow = !ready || menu || palette ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [ready, menu, palette]);

  // Keyboard shortcut: Ctrl/Cmd + K opens the command palette
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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

  const go = (id) => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: "smooth" }); };
  const openUrl = (url) => window.open(url, "_blank", "noopener,noreferrer");
  const downloadResume = () => {
    const a = document.createElement("a");
    a.href = RESUME_FILE;
    a.download = RESUME_NAME;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const actions = [
    { id: "go-home", group: "Go to", label: "Home", icon: FaHouse, run: () => go("home") },
    ...NAV.map((n) => ({ id: `go-${n}`, group: "Go to", label: n, icon: FaArrowRight, run: () => go(n.toLowerCase()) })),
    { id: "resume-view", group: "Resume", label: "View resume", icon: FaEye, run: () => openUrl(RESUME_FILE) },
    { id: "resume-dl", group: "Resume", label: "Download resume", icon: FaDownload, run: downloadResume },
    { id: "wa", group: "Contact", label: "Chat on WhatsApp", icon: FaWhatsapp, run: () => openUrl(WHATSAPP_LINK) },
    { id: "ig", group: "Contact", label: "Message on Instagram", icon: FaInstagram, run: () => openUrl(INSTAGRAM_LINK) },
    { id: "gm", group: "Contact", label: "Send an email", icon: SiGmail, run: () => (isMobile() ? (window.location.href = MAILTO_LINK) : openUrl(GMAIL_LINK)) },
    { id: "copy", group: "Contact", label: "Copy email address", icon: FaCopy, run: copyEmail },
    { id: "gh", group: "Links", label: "Open GitHub", icon: FaGithub, run: () => openUrl(GITHUB_LINK) },
    { id: "rwitc", group: "Links", label: "Visit rwitc.com", icon: FaArrowUpRightFromSquare, run: () => openUrl(RWITC_URL) },
    { id: "intucate-web", group: "Links", label: "Open Intucate web app", icon: FaArrowUpRightFromSquare, run: () => openUrl(INTUCATE_WEB) },
    { id: "intucate-app", group: "Links", label: "Intucate on Google Play", icon: FaGooglePlay, run: () => openUrl(INTUCATE_APP) }
  ];

  return (
    <MotionConfig reducedMotion="user">
      <main className="portfolio" id="home">
        <AnimatePresence>{!ready && <Preloader key="preloader" onDone={setReady} />}</AnimatePresence>

        <a className="skip" href="#about">Skip to content</a>
        <Background />
        <CustomCursor />
        <motion.i className="top-progress" style={{ scaleX: progress }} />

        {/* NAVBAR */}
        <motion.header className="nav" initial={{ y: -90, opacity: 0 }} animate={ready ? { y: hideNav && !menu ? -110 : 0, opacity: 1 } : { y: -90, opacity: 0 }} transition={{ duration: 0.6, ease: EASE, delay: ready ? 0.9 : 0 }}>
          <div className="nav-inner">
            <a className="logo" href="#home">rohan<span>.</span></a>
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
            <div className="nav-right">
              <button className="kbd-btn" onClick={() => setPalette(true)} aria-label="Open command palette"><FaMagnifyingGlass /> Search <kbd>Ctrl K</kbd></button>
              <a className="nav-cta" href="#contact" data-cursor="Talk">Let&apos;s talk <FaArrowRight /></a>
              <button className="burger" onClick={() => setMenu(true)} aria-label="Open menu"><FaBars /></button>
            </div>
          </div>
        </motion.header>

        <AnimatePresence>
          {menu && (
            <motion.div className="drawer" initial={{ clipPath: "circle(0% at 100% 0%)" }} animate={{ clipPath: "circle(150% at 100% 0%)" }} exit={{ clipPath: "circle(0% at 100% 0%)" }} transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}>
              <button className="drawer-close" onClick={() => setMenu(false)} aria-label="Close menu"><FaXmark /></button>
              <nav className="drawer-links">
                {NAV.map((x, i) => (
                  <motion.a key={x} href={`#${x.toLowerCase()}`} onClick={() => setMenu(false)} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.07, duration: 0.6, ease: EASE }}>
                    {x}
                  </motion.a>
                ))}
              </nav>
              <p className="drawer-foot">{EMAIL}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* HERO */}
        <section className="hero">
          <motion.div className="hero-status" variants={fadeUp} initial="hidden" animate={ready ? "visible" : "hidden"} custom={8}>
            <span><i className="dot" /> Available for opportunities</span>
            <span>Mumbai, India <FaLocationDot /></span>
          </motion.div>

          <div className="hero-layout">
            <motion.div className="hero-copy" style={{ y: heroTextY, opacity: heroTextOpacity }}>
              <motion.p className="eyebrow" variants={fadeUp} initial="hidden" animate={ready ? "visible" : "hidden"} custom={9}>Hello, I&apos;m Rohan Singh</motion.p>
              <h1>
                <Lines play={ready} text="I make the" delay={0.55} />
                <Lines play={ready} text="digital world" delay={0.75} />
                <Lines play={ready} text="work better." delay={0.95} className="dim" />
              </h1>
              <motion.p className="role-line" variants={fadeUp} initial="hidden" animate={ready ? "visible" : "hidden"} custom={13}><span className="prompt">›</span><span className="role">{role}</span><span className="caret" /></motion.p>
              <motion.p className="intro" variants={fadeUp} initial="hidden" animate={ready ? "visible" : "hidden"} custom={14}>A full stack developer at ENATS LLP building responsive web experiences, mobile features and dependable backend solutions with Next.js, React, PHP and MySQL.</motion.p>
              <motion.div variants={fadeUp} initial="hidden" animate={ready ? "visible" : "hidden"} custom={15} className="hero-cta"><ResumeButtons /></motion.div>
              <motion.div variants={fadeUp} initial="hidden" animate={ready ? "visible" : "hidden"} custom={16} className="socials">
                {channels.map((c) => {
                  const Icon = c.icon;
                  return (
                    <a key={c.key} className={`social ${c.key}`} href={c.href} onClick={c.onClick} aria-label={c.name} {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}><Icon /></a>
                  );
                })}
                <span className="socials-hint">Press <kbd>Ctrl K</kbd> to explore</span>
              </motion.div>
            </motion.div>

            <motion.div className="hero-art" initial={{ clipPath: "inset(100% 0 0 0 round 28px)" }} animate={ready ? { clipPath: "inset(0% 0 0 0 round 28px)" } : { clipPath: "inset(100% 0 0 0 round 28px)" }} transition={{ duration: 1.3, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}>
              <motion.div className="photo-wrap" style={{ y: photoY }}>
                <Tilt className="photo-tilt">
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
                        <p>Full Stack Developer at ENATS LLP</p>
                      </div>
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            </motion.div>
            <motion.div className="fchip c1" initial={{ opacity: 0, scale: 0.7 }} animate={ready ? { opacity: 1, scale: 1, y: [0, -10, 0] } : {}} transition={{ opacity: { delay: 1.6, duration: 0.5 }, scale: { delay: 1.6, duration: 0.5 }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}><SiNextdotjs /> Next.js</motion.div>
            <motion.div className="fchip c2" initial={{ opacity: 0, scale: 0.7 }} animate={ready ? { opacity: 1, scale: 1, y: [0, 10, 0] } : {}} transition={{ opacity: { delay: 1.8, duration: 0.5 }, scale: { delay: 1.8, duration: 0.5 }, y: { duration: 4.6, repeat: Infinity, ease: "easeInOut" } }}><SiPhp /> PHP and MySQL</motion.div>
            <motion.div className="fchip c3" initial={{ opacity: 0, scale: 0.7 }} animate={ready ? { opacity: 1, scale: 1, y: [0, -8, 0] } : {}} transition={{ opacity: { delay: 2, duration: 0.5 }, scale: { delay: 2, duration: 0.5 }, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}><FaLocationDot /> Mumbai {time && `· ${time}`}</motion.div>
          </div>

          <div className="hero-bottom">
            <span>Scroll to explore</span>
            <span className="scroll-hint"><i className="wheel"><b /></i></span>
          </div>
        </section>

        <div className="ticker-band"><Marquee items={skills.map((s) => s.name)} /></div>

        {/* ABOUT */}
        <section className="section about" id="about">
          <SectionLabel>About me</SectionLabel>
          <ScrollText text={ABOUT_TEXT} className="about-statement" />

          <div className="bento">
            <motion.div className="tile t-stats spot" onMouseMove={spot} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
              {stats.map((s) => (
                <div className="stat" key={s.label}>
                  <strong><CountUp to={s.to} format={(n) => `${String(n).padStart(2, "0")}${s.suffix}`} /></strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div className="tile t-now spot" onMouseMove={spot} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={1}>
              <p className="tile-tag"><i className="dot" /> Currently, 2025 to present</p>
              <h3>Full Stack Developer</h3>
              <p className="tile-sub">ENATS LLP · Mumbai, India</p>
              <div className="chips">{["Web", "Mobile", "APIs", "Admin modules"].map((c) => <span key={c}>{c}</span>)}</div>
            </motion.div>

            <motion.div className="tile t-time spot" onMouseMove={spot} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={2}>
              <div className="radar"><i /><i /><i /><FaLocationDot /></div>
              <p className="tile-tag">Based in</p>
              <h3>Mumbai, India</h3>
              <p className="clock">{time || "--:--"}</p>
              <p className="tile-sub">IST · UTC+5:30</p>
            </motion.div>

            <motion.a className="tile t-git spot" href={GITHUB_LINK} target="_blank" rel="noreferrer" data-cursor="Open" onMouseMove={spot} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={3}>
              <FaGithub className="tile-big" />
              <p className="tile-tag">Code</p>
              <h3>@{GITHUB_USERNAME}</h3>
              <p className="tile-sub">See my code on GitHub</p>
              <FaArrowUpRightFromSquare className="tile-arrow" />
            </motion.a>

            <motion.div className="tile t-edu spot" onMouseMove={spot} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={4}>
              <FaGraduationCap className="tile-big" />
              <p className="tile-tag">Education</p>
              <h3>B.Sc. Information Technology</h3>
              <p className="tile-sub">2024 · 6.95 / 10</p>
              <p className="tile-sub">SDAC InfoTech training · Grade A</p>
            </motion.div>
          </div>
        </section>

        {/* STACK */}
        <section className="section stack-section" id="stack">
          <SectionLabel>Toolkit</SectionLabel>
          <div className="split">
            <Title a="Tools for" b="building things." />
            <motion.p className="section-summary" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}>The languages, frameworks and platforms I use to build interfaces, connect services and work with data.</motion.p>
          </div>

          <div className="stack-list">
            {CATS.map((c, ci) => (
              <motion.div className="stack-row" key={c} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, delay: ci * 0.05, ease: EASE }}>
                <h3 className="stack-cat">{c}</h3>
                <div className="stack-items">
                  {skills.filter((s) => s.cat === c).map((s) => {
                    const Icon = s.icon;
                    return (
                      <motion.span key={s.name} className="stack-pill" whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
                        <Icon /> {s.name}
                      </motion.span>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* WORK */}
        <section className="section work-section" id="work">
          <SectionLabel>Selected work</SectionLabel>
          <div className="split">
            <Title a="Real work." b="Practical impact." />
            <motion.p className="section-summary" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}>Personal and professional projects, with the technologies and purpose behind each.</motion.p>
          </div>
          <div className="chapters" ref={stackRef}>
            {projects.map((p, i) => <Chapter key={p.number} p={p} i={i} total={projects.length} progress={stackP} />)}
          </div>
        </section>

        {/* JOURNEY */}
        <section className="section journey-section" id="journey">
          <SectionLabel>Experience and education</SectionLabel>
          <Title a="Every step" b="builds the next." />
          <div className="timeline" ref={timelineRef}>
            <div className="timeline-line"><motion.div className="timeline-fill" style={{ scaleY: tlScale }} /></div>
            {experience.map((e) => (
              <motion.div className="timeline-row" key={e.title} initial={{ opacity: 0, x: -36 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, ease: EASE }}>
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
            <i className="cp-orb o1" />

            <div className="contact-left">
              <motion.p className="contact-tag" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <i className="dot" /> Open to new opportunities
              </motion.p>
              <Title a="Got an idea?" b="Let's talk." className="title-lg" />
              <motion.p className="contact-text" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}>
                Pick whichever is easiest for you. WhatsApp and Instagram open a direct chat with me, and Gmail opens a ready-to-send mail.
              </motion.p>
              <motion.div className="contact-actions" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3}>
                <button className="btn-primary" onClick={copyEmail}><span>Copy email</span><FaCopy /></button>
                <span className="contact-loc"><FaLocationDot /> Mumbai · {time || "--:--"}</span>
              </motion.div>
              <motion.div className="contact-resume" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={4}>
                <p>Want the full story?</p>
                <ResumeButtons />
              </motion.div>
            </div>

            <div className="contact-right">
              {channels.map((c, i) => {
                const Icon = c.icon;
                return (
                  <motion.a
                    key={c.key}
                    className="row"
                    href={c.href}
                    onClick={c.onClick}
                    data-cursor="Open"
                    {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    custom={i + 1}
                  >
                    <span className="row-ico"><Icon /></span>
                    <span className="row-main">
                      <span className="row-name">{c.name}</span>
                      <span className="row-value">{c.value}</span>
                    </span>
                    <span className="row-hint">{c.hint}</span>
                    <span className="row-arrow"><FaArrowUpRightFromSquare /></span>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </section>

        <footer className="footer">
          <h2 className="foot-big" aria-label="Rohan Singh"><Lines inView text="Rohan Singh" /></h2>
          <div className="foot-row">
            <a className="logo" href="#home">rohan<span>.</span></a>
            <span>Designed and built by Rohan Singh</span>
            <span>© 2026</span>
          </div>
        </footer>

        {/* Plain back-to-top button (no progress ring) */}
        <AnimatePresence>
          {showTop && (
            <motion.a href="#home" className="to-top" aria-label="Back to top" initial={{ opacity: 0, scale: 0.5, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.5, y: 20 }} whileHover={{ y: -4 }}>
              <FaArrowUp />
            </motion.a>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {toast && (
            <motion.div className="toast" initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.95 }} transition={{ duration: 0.3, ease: EASE }}>
              <FaCheck /> {toast}
            </motion.div>
          )}
        </AnimatePresence>

        <CommandPalette open={palette} onClose={() => setPalette(false)} actions={actions} />
      </main>
    </MotionConfig>
  );
}
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence, motion, MotionConfig, useInView, useMotionValue, useScroll, useSpring, useTransform
} from "framer-motion";
import {
  FaArrowRight, FaArrowUp, FaArrowUpRightFromSquare, FaBars, FaCheck, FaCloud, FaCode, FaCopy,
  FaDownload, FaEye, FaGithub, FaGraduationCap, FaHouse, FaInstagram, FaLocationDot, FaMagnifyingGlass,
  FaMobileScreen, FaPalette, FaReact, FaWhatsapp, FaXmark
} from "react-icons/fa6";
import { SiGmail, SiJavascript, SiLaravel, SiMongodb, SiMysql, SiNextdotjs, SiNodedotjs, SiPhp } from "react-icons/si";
import "./Home.css";

/* ---------------------------------- CONFIG ---------------------------------- */
// Files inside the /public folder (the leading slash is required)
const RESUME_FILE = "/Rohan_Singh_Resume.pdf"; // change if your resume file name is different
const RESUME_NAME = "Rohan_Singh_Resume.pdf"; // file name used when the visitor downloads it
const PHOTO_FILE = "/rohan.jpg"; // change if your photo file name is different

// Contact details
const EMAIL = "rohansingh5594@gmail.com";
const WHATSAPP_NUMBER = "919324519782"; // country code + number, no plus sign
const WHATSAPP_DISPLAY = "+91 93245 19782";
const INSTAGRAM_USERNAME = "rohansingh._19";
const GITHUB_USERNAME = "rohan9324"; // change if your GitHub username is different

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

// Accent colour themes (the visitor can switch them from the palette button)
const THEMES = [
  { id: "aurora", name: "Aurora", a1: "#7c8cff", a2: "#2ee6c0", a3: "#f472b6" },
  { id: "ocean", name: "Ocean", a1: "#4f8cff", a2: "#22d3ee", a3: "#a78bfa" },
  { id: "ember", name: "Ember", a1: "#ff7a45", a2: "#ffc857", a3: "#ff4d8d" },
  { id: "violet", name: "Violet", a1: "#a78bfa", a2: "#f472b6", a3: "#60a5fa" },
  { id: "lime", name: "Lime", a1: "#b6f23d", a2: "#34d399", a3: "#22d3ee" }
];
const hexToRgb = (h) => {
  const n = parseInt(h.slice(1), 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
};

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
const CATS = ["All", "Frontend", "Backend", "Database", "Cloud & Tools"];

const projects = [
  {
    number: "01", title: "RWITC Website & Admin Platform", type: "PROFESSIONAL EXPERIENCE", mock: "site",
    description: "Contributed to website and admin functionality, Next.js pages, PHP modules, API integration, access control, article management, media delivery and performance troubleshooting.",
    highlights: ["Next.js pages", "PHP modules", "API integration", "Access control", "Article management", "Media delivery", "Performance troubleshooting"],
    stack: ["Next.js", "PHP", "MySQL", "AWS S3", "CloudFront"],
    url: "https://rwitc.com/", label: "Visit live website"
  },
  {
    number: "02", title: "CineVault", type: "PERSONAL PROJECT", mock: "movies",
    description: "A MERN movie-management app with dynamic movie creation and listing, REST APIs, MongoDB storage, reusable React components and client-side validation.",
    highlights: ["Dynamic movie creation", "Movie listing", "REST APIs", "MongoDB storage", "Reusable React components", "Client-side validation"],
    stack: ["React", "Node.js", "Express", "MongoDB"],
    url: "", label: "Personal project"
  },
  {
    number: "03", title: "User Profile & Task Manager", type: "PERSONAL PROJECT", mock: "tasks",
    description: "A responsive PHP application with registration and login, session handling, profile photo uploads, user-detail updates and task CRUD operations.",
    highlights: ["Registration & login", "Session handling", "Profile photo uploads", "User-detail updates", "Task CRUD"],
    stack: ["PHP", "MySQL", "JavaScript", "Bootstrap"],
    url: "", label: "Personal project"
  }
];

const experience = [
  { date: "2025 — PRESENT", title: "Full Stack Developer", place: "ENATS LLP · Mumbai, India", text: "Building and maintaining web and mobile features, integrating APIs, developing admin modules, managing database-driven functionality and troubleshooting production issues." },
  { date: "JUL 2025", title: "Full Stack Developer Training", place: "SDAC InfoTech · Grade A", text: "Full Stack Developer training and practical software development foundations.", link: "https://drive.google.com/file/d/1oFL0dVD5p2PNPjLd4ORSGhscVOissay1/view" },
  { date: "2024", title: "B.Sc. Information Technology", place: "Smt. K. G. Mittal Institute of Management, Information Technology and Research", text: "Graduated with 6.95 / 10." },
  { date: "2021 / 2019", title: "HSC & SSC", place: "P. D. Turakhia Junior College / Shivaji Vidya Mandir High School", text: "HSC: 72.67% · SSC: 63.40%." }
];

const stats = [
  { to: 1, suffix: "+", label: "YEAR OF EXPERIENCE" },
  { to: 12, suffix: "", label: "CORE TECHNOLOGIES" },
  { to: 3, suffix: "", label: "PROJECTS SHOWCASED" }
];

// Gmail opens the web compose window on desktop, and the mail app on mobile
const isMobile = () => /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
const openGmail = (e) => {
  if (isMobile()) return;
  e.preventDefault();
  window.open(GMAIL_LINK, "_blank", "noopener,noreferrer");
};

const channels = [
  { key: "wa", name: "WHATSAPP", value: WHATSAPP_DISPLAY, hint: "Opens a direct chat", href: WHATSAPP_LINK, icon: FaWhatsapp, external: true },
  { key: "ig", name: "INSTAGRAM", value: `@${INSTAGRAM_USERNAME}`, hint: "Opens a direct message", href: INSTAGRAM_LINK, icon: FaInstagram, external: true },
  { key: "gm", name: "GMAIL", value: EMAIL, hint: "Opens a new mail", href: MAILTO_LINK, icon: SiGmail, onClick: openGmail },
  { key: "gh", name: "GITHUB", value: `@${GITHUB_USERNAME}`, hint: "See my code", href: GITHUB_LINK, icon: FaGithub, external: true }
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

function Label({ index, children }) {
  return (
    <motion.p className="label" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      <span className="label-idx">{index}</span>
      <motion.i initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.2, ease: EASE }} />
      {children}
    </motion.p>
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
function Tilt({ children, className = "", max = 8 }) {
  const ref = useRef(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), { stiffness: 150, damping: 16 });
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), { stiffness: 150, damping: 16 });
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

function ResumeButtons() {
  return (
    <div className="resume-btns">
      <Magnetic strength={0.2}><a href={RESUME_FILE} target="_blank" rel="noreferrer" className="btn-primary shine"><FaEye /> View Resume</a></Magnetic>
      <Magnetic strength={0.2}><a href={RESUME_FILE} download={RESUME_NAME} className="btn-ghost"><FaDownload /> Download Resume</a></Magnetic>
    </div>
  );
}

/* ------------------------------------ HOOKS ------------------------------------ */
// Theme state: applies the accent colours as CSS variables and remembers the choice
function useTheme() {
  const [id, setId] = useState(THEMES[0].id);
  const colorsRef = useRef({ a1: hexToRgb(THEMES[0].a1), a2: hexToRgb(THEMES[0].a2) });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("rs_theme");
      if (saved && THEMES.some((t) => t.id === saved)) setId(saved);
    } catch {}
  }, []);

  useEffect(() => {
    const t = THEMES.find((x) => x.id === id) || THEMES[0];
    const root = document.documentElement.style;
    ["a1", "a2", "a3"].forEach((k) => {
      root.setProperty(`--${k}`, t[k]);
      root.setProperty(`--${k}-rgb`, hexToRgb(t[k]));
    });
    colorsRef.current = { a1: hexToRgb(t.a1), a2: hexToRgb(t.a2) };
    try { localStorage.setItem("rs_theme", id); } catch {}
  }, [id]);

  return { id, setId, colorsRef };
}

// Text that "decodes" from random glyphs into the next word
const GLYPHS = "!<>-_/[]{}=+*^?#";
function useScramble(words, hold = 2400) {
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

/* ------------------------------- ANIMATED BACKGROUND ------------------------------ */
// Aurora glow + moving grid + particle network + cursor glow + film grain
function Background({ colorsRef }) {
  const canvasRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const LINK = 130;
    const mouse = { x: -9999, y: -9999 };
    let w = 0, h = 0, raf = 0, particles = [];

    const seed = () => {
      const count = Math.max(26, Math.min(85, Math.floor((w * h) / 17000)));
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
      const c = colorsRef.current;
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
        ctx.fillStyle = `rgba(${c.a1}, 0.7)`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dist = Math.hypot(p.x - q.x, p.y - q.y);
          if (dist < LINK) {
            ctx.strokeStyle = `rgba(${c.a1}, ${(1 - dist / LINK) * 0.26})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
        // Lines between the cursor and nearby particles
        if (d < 160) {
          ctx.strokeStyle = `rgba(${c.a2}, ${(1 - d / 160) * 0.5})`;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    const onMove = (e) => {
      mouse.x = e.clientX; mouse.y = e.clientY;
      if (bgRef.current) {
        bgRef.current.style.setProperty("--gx", `${e.clientX}px`);
        bgRef.current.style.setProperty("--gy", `${e.clientY}px`);
      }
    };
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
  }, [colorsRef]);

  return (
    <div className="bg" ref={bgRef} aria-hidden="true">
      <i className="aurora a-1" /><i className="aurora a-2" /><i className="aurora a-3" />
      <div className="bg-grid" />
      <canvas ref={canvasRef} className="bg-canvas" />
      <i className="bg-spot" />
      <i className="grain" />
    </div>
  );
}

// Smooth ring that follows the cursor (desktop only). Elements can set data-cursor="Label".
function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const dx = useSpring(x, { stiffness: 600, damping: 40, mass: 0.3 });
  const dy = useSpring(y, { stiffness: 600, damping: 40, mass: 0.3 });
  const rx = useSpring(x, { stiffness: 170, damping: 22 });
  const ry = useSpring(y, { stiffness: 170, damping: 22 });

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
            transition={{ duration: 0.25, ease: EASE }} onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="cmd-input">
              <FaMagnifyingGlass />
              <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={onKey} placeholder="Type a command or search..." aria-label="Search commands" />
              <kbd>ESC</kbd>
            </div>
            <div className="cmd-list" ref={listRef}>
              {filtered.length === 0 && <p className="cmd-empty">No results found</p>}
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
              <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
              <span><kbd>↵</kbd> select</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ThemeSwitcher({ themeId, setThemeId }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  return (
    <div className="theme" ref={ref}>
      <button className="icon-btn" onClick={() => setOpen((v) => !v)} aria-label="Change accent colours" aria-expanded={open}><FaPalette /></button>
      <AnimatePresence>
        {open && (
          <motion.div className="theme-pop" initial={{ opacity: 0, y: -8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.96 }} transition={{ duration: 0.2, ease: EASE }}>
            <p>ACCENT COLOURS</p>
            {THEMES.map((t) => (
              <button key={t.id} className={`theme-item ${themeId === t.id ? "on" : ""}`} onClick={() => { setThemeId(t.id); setOpen(false); }}>
                <i className="sw" style={{ background: `linear-gradient(135deg, ${t.a1}, ${t.a2})` }} />
                <span>{t.name}</span>
                {themeId === t.id && <FaCheck />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------- PROJECT VISUALS ------------------------------ */
// Abstract CSS "screens" so the cards do not need screenshots
function Mock({ kind }) {
  return (
    <div className={`mock ${kind}`}>
      <div className="mock-bar"><i /><i /><i /><span>{kind === "site" ? "rwitc.com" : "localhost:3000"}</span></div>
      <div className="mock-body">
        {kind === "site" && (
          <>
            <div className="m-hero"><b /><b /><em /></div>
            <div className="m-cards"><i /><i /><i /></div>
            <div className="m-lines"><b /><b /><b /></div>
          </>
        )}
        {kind === "movies" && (
          <div className="m-posters">{[0, 1, 2, 3, 4, 5].map((n) => <i key={n} style={{ "--n": n }} />)}</div>
        )}
        {kind === "tasks" && (
          <div className="m-tasks">{[0, 1, 2, 3].map((n) => <div key={n} style={{ "--n": n }}><i /><b /></div>)}</div>
        )}
      </div>
    </div>
  );
}

// Stacking chapter: the card sticks while the next one slides over it
function Chapter({ p, i, total, progress }) {
  const from = i / total;
  const to = (i + 1) / total;
  const last = i === total - 1;
  const scale = useTransform(progress, last ? [0, 1] : [from, to], last ? [1, 1] : [1, 0.93]);
  return (
    <div className="chapter" style={{ "--i": i }}>
      <motion.article className="chapter-card spot" style={{ scale }} onMouseMove={spot}>
        <div className="chapter-visual"><Mock kind={p.mock} /><span className="chapter-num">{p.number}</span></div>
        <div className="chapter-copy">
          <p className="chapter-type"><span>{p.number} / 0{total}</span>{p.type}</p>
          <h3>{p.title}</h3>
          <p className="chapter-desc">{p.description}</p>
          <ul className="chapter-points">{p.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
          <div className="chips">{p.stack.map((s) => <span key={s}>{s}</span>)}</div>
          {p.url ? (
            <a className="project-link" href={p.url} target="_blank" rel="noreferrer" data-cursor="Visit">{p.label} <FaArrowUpRightFromSquare /></a>
          ) : (
            <span className="project-link muted-link">{p.label}</span>
          )}
        </div>
      </motion.article>
    </div>
  );
}

/* ----------------------------------- PAGE ----------------------------------- */
export default function Home() {
  const [menu, setMenu] = useState(false);
  const [palette, setPalette] = useState(false);
  const [active, setActive] = useState("home");
  const [showTop, setShowTop] = useState(false);
  const [hideNav, setHideNav] = useState(false);
  const [imgOk, setImgOk] = useState(true);
  const [cat, setCat] = useState("All");
  const [toast, setToast] = useState("");
  const lastY = useRef(0);
  const toastTimer = useRef(null);

  const { id: themeId, setId: setThemeId, colorsRef } = useTheme();
  const role = useScramble(ROLES);
  const time = useMumbaiTime();

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  // Photo moves slightly slower than the page for a parallax feel
  const photoY = useTransform(scrollY, [0, 700], [0, -50]);

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

  // Lock page scroll while an overlay is open
  useEffect(() => {
    document.body.style.overflow = menu || palette ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menu, palette]);

  // Ctrl/Cmd + K opens the command palette
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
    { id: "rwitc", group: "Links", label: "Visit rwitc.com", icon: FaArrowUpRightFromSquare, run: () => openUrl("https://rwitc.com/") },
    ...THEMES.map((t) => ({ id: `theme-${t.id}`, group: "Theme", label: `${t.name} colours`, icon: FaPalette, run: () => setThemeId(t.id) }))
  ];

  const shown = cat === "All" ? skills : skills.filter((s) => s.cat === cat);

  return (
    <MotionConfig reducedMotion="user">
      <main className="portfolio" id="home">
        <Background colorsRef={colorsRef} />
        <CustomCursor />

        {/* NAVBAR */}
        <motion.header className="nav" initial={{ y: -80, opacity: 0 }} animate={{ y: hideNav && !menu ? -110 : 0, opacity: 1 }} transition={{ duration: 0.45, ease: EASE }}>
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
            <div className="nav-right">
              <button className="kbd-btn" onClick={() => setPalette(true)} aria-label="Open command palette"><FaMagnifyingGlass /> Search <kbd>Ctrl K</kbd></button>
              <ThemeSwitcher themeId={themeId} setThemeId={setThemeId} />
              <a className="nav-cta" href="#contact" data-cursor="Talk">Let&apos;s talk <FaArrowRight /></a>
              <button className="burger" onClick={() => setMenu(true)} aria-label="Open menu"><FaBars /></button>
            </div>
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
              <motion.p variants={fadeUp} className="eyebrow">HELLO, I&apos;M ROHAN SINGH</motion.p>
              <h1>
                <Words className="h-line" text="I make the" delay={0.2} />
                <Words className="h-line" text="digital world" delay={0.4} />
                <Words className="h-line accent" text="work better." delay={0.65} />
              </h1>
              <motion.p variants={fadeUp} className="role-line"><span className="prompt">›</span><span className="role">{role}</span><span className="caret" /></motion.p>
              <motion.p variants={fadeUp} className="intro">A full stack developer at ENATS LLP building responsive web experiences, mobile features and dependable backend solutions with Next.js, PHP and MySQL.</motion.p>
              <motion.div variants={fadeUp}><ResumeButtons /></motion.div>
              <motion.div variants={fadeUp} className="socials">
                {channels.map((c) => {
                  const Icon = c.icon;
                  return (
                    <a key={c.key} className={`social ${c.key}`} href={c.href} onClick={c.onClick} aria-label={c.name} {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}><Icon /></a>
                  );
                })}
                <span className="socials-hint">Press <kbd>Ctrl K</kbd> to explore</span>
              </motion.div>
            </motion.div>

            <motion.div className="hero-art" initial={{ opacity: 0, y: 40, scale: 0.96, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }} transition={{ duration: 1, delay: 0.5, ease: EASE }}>
              <motion.div className="photo-wrap" style={{ y: photoY }}>
                <i className="photo-glow" />
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
                        <p>Full Stack Developer · ENATS LLP</p>
                      </div>
                    </div>
                  </div>
                </Tilt>
                <motion.div className="fchip c1" animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}><SiNextdotjs /> Next.js</motion.div>
                <motion.div className="fchip c2" animate={{ y: [0, 10, 0] }} transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}><SiPhp /> PHP · MySQL</motion.div>
                <motion.div className="fchip c3" animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}><FaLocationDot /> Mumbai {time && `· ${time}`}</motion.div>
                <motion.div className="fchip c4" animate={{ y: [0, 8, 0] }} transition={{ duration: 4.3, repeat: Infinity, ease: "easeInOut" }}><i className="dot" /> Open to work</motion.div>
              </motion.div>
            </motion.div>
          </div>

          <div className="hero-bottom">
            <span>01 / INTRODUCTION</span>
            <span className="scroll-hint"><i className="wheel"><b /></i> SCROLL</span>
          </div>
        </section>

        {/* ABOUT — bento grid */}
        <section className="section about" id="about">
          <Label index="01">ABOUT ME</Label>
          <div className="bento">
            <motion.div className="tile t-bio spot" onMouseMove={spot} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
              <Title a="Curiosity first." b="Solutions always." />
              <p>I&apos;m a Full Stack Developer at <strong>ENATS LLP</strong>, working across web and mobile features, PHP backend services, APIs, databases and deployment-related troubleshooting.</p>
              <p>I enjoy taking a real requirement, understanding the problem and turning it into a responsive, practical and maintainable solution.</p>
              <a className="text-link" href="#journey">Explore my journey ↗</a>
            </motion.div>

            <motion.div className="tile t-stats spot" onMouseMove={spot} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={1}>
              {stats.map((s) => (
                <div className="stat" key={s.label}>
                  <strong><CountUp to={s.to} format={(n) => `${String(n).padStart(2, "0")}${s.suffix}`} /></strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div className="tile t-now spot" onMouseMove={spot} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={2}>
              <p className="tile-tag"><i className="dot" /> CURRENTLY · 2025 — PRESENT</p>
              <h3>Full Stack Developer</h3>
              <p className="tile-sub">ENATS LLP · Mumbai, India</p>
              <div className="chips">{["Web", "Mobile", "APIs", "Admin modules"].map((c) => <span key={c}>{c}</span>)}</div>
            </motion.div>

            <motion.div className="tile t-time spot" onMouseMove={spot} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={3}>
              <div className="radar"><i /><i /><i /><FaLocationDot /></div>
              <p className="tile-tag">BASED IN</p>
              <h3>Mumbai, India</h3>
              <p className="clock">{time || "--:--"}</p>
              <p className="tile-sub">IST · UTC+5:30</p>
            </motion.div>

            <motion.a className="tile t-git spot" href={GITHUB_LINK} target="_blank" rel="noreferrer" data-cursor="Open" onMouseMove={spot} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={4}>
              <FaGithub className="tile-big" />
              <p className="tile-tag">OPEN SOURCE MIND</p>
              <h3>@{GITHUB_USERNAME}</h3>
              <p className="tile-sub">See my code on GitHub</p>
              <FaArrowUpRightFromSquare className="tile-arrow" />
            </motion.a>

            <motion.div className="tile t-edu spot" onMouseMove={spot} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={5}>
              <FaGraduationCap className="tile-big" />
              <p className="tile-tag">EDUCATION</p>
              <h3>B.Sc. Information Technology</h3>
              <p className="tile-sub">2024 · 6.95 / 10</p>
              <p className="tile-sub">SDAC InfoTech training · Grade A</p>
            </motion.div>
          </div>
        </section>

        {/* STACK */}
        <section className="section stack-section" id="stack">
          <Label index="02">MY TOOLKIT</Label>
          <div className="split">
            <Title a="Tools for" b="building things." />
            <motion.p className="section-summary" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}>The languages, frameworks and platforms I use to build interfaces, connect services and work with data.</motion.p>
          </div>

          <div className="tabs" role="tablist">
            {CATS.map((c) => (
              <button key={c} role="tab" aria-selected={cat === c} className={`tab ${cat === c ? "on" : ""}`} onClick={() => setCat(c)}>
                {cat === c && <motion.span layoutId="tab-pill" className="tab-pill" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                <span>{c}</span>
              </button>
            ))}
          </div>

          <motion.div className="skills-grid" layout>
            <AnimatePresence mode="popLayout">
              {shown.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={s.name} className="skill-card spot" layout onMouseMove={spot}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: i * 0.03, ease: EASE }} whileHover={{ y: -6 }}
                  >
                    <div className="skill-top"><span className="skill-cat">{s.cat.toUpperCase()}</span><FaArrowUpRightFromSquare className="skill-arrow" /></div>
                    <Icon className="skill-icon" style={{ "--i": i }} />
                    <span className="skill-name">{s.name}</span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* WORK — stacking chapters */}
        <section className="section work-section" id="work">
          <Label index="03">SELECTED WORK</Label>
          <div className="split">
            <Title a="Real work." b="Practical impact." />
            <motion.p className="section-summary" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}>Professional website work and personal projects, with the technologies and purpose behind each.</motion.p>
          </div>
          <div className="chapters" ref={stackRef}>
            {projects.map((p, i) => <Chapter key={p.number} p={p} i={i} total={projects.length} progress={stackP} />)}
          </div>
        </section>

        {/* JOURNEY */}
        <section className="section journey-section" id="journey">
          <Label index="04">EXPERIENCE &amp; EDUCATION</Label>
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
              <motion.div className="contact-actions" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3}>
                <button className="btn-primary shine" onClick={copyEmail}><FaCopy /> Copy email</button>
                <span className="contact-loc"><FaLocationDot /> MUMBAI · {time || "--:--"}</span>
              </motion.div>
              <motion.div className="contact-resume" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={4}>
                <p>WANT THE FULL STORY?</p>
                <ResumeButtons />
              </motion.div>
            </div>

            <div className="contact-right">
              {channels.map((c, i) => {
                const Icon = c.icon;
                return (
                  <motion.a
                    key={c.key}
                    className={`row ${c.key}`}
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
          <a className="logo" href="#home">rohan<span>®</span></a>
          <span>DESIGNED &amp; BUILT BY ROHAN SINGH</span>
          <span>© 2026</span>
        </footer>

        <AnimatePresence>
          {showTop && (
            <motion.a href="#home" className="to-top" aria-label="Back to top" initial={{ opacity: 0, scale: 0.5, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.5, y: 20 }} whileHover={{ y: -4 }}>
              <svg viewBox="0 0 48 48" className="ring" aria-hidden="true">
                <circle cx="24" cy="24" r="22" className="ring-bg" />
                <motion.circle cx="24" cy="24" r="22" className="ring-fg" style={{ pathLength: progress }} />
              </svg>
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
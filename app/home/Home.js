"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import {
  AnimatePresence, motion, MotionConfig, useAnimationFrame, useInView, useMotionValue, useScroll,
  useSpring, useTransform, useVelocity
} from "framer-motion";
import {
  FaArrowRight, FaArrowUp, FaArrowUpRightFromSquare, FaCheck, FaCloud, FaCode, FaCopy, FaDownload, FaEye,
  FaGithub, FaGooglePlay, FaGraduationCap, FaHouse, FaInstagram, FaLocationDot, FaMagnifyingGlass,
  FaMobileScreen, FaMoon, FaPlus, FaReact, FaSun, FaWhatsapp, FaXmark
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
const GREETINGS = ["Hello", "नमस्ते", "नमस्कार", "Welcome"];
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
const CATS = ["All", "Frontend", "Backend", "Database", "Cloud & Tools"];

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
const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: i * 0.08, ease: EASE } })
};

// Hero letters rise out of an invisible line
const maskV = {
  hide: { y: "120%", rotate: 6 },
  show: (d = 0) => ({ y: "0%", rotate: 0, transition: { duration: 1, delay: d, ease: EASE } })
};

// Section titles flip in character by character
const charV = {
  hide: { opacity: 0, y: "0.55em", rotateX: -85 },
  show: (d = 0) => ({ opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.85, delay: d, ease: EASE } })
};

function SplitChars({ text, className = "", delay = 0, play = true, inView = true }) {
  const words = text.split(" ");
  const trigger = inView
    ? { whileInView: "show", viewport: { once: true, amount: 0.7 } }
    : { animate: play ? "show" : "hide" };
  let n = 0;
  return (
    <span className={`split ${className}`} aria-label={text}>
      {words.map((w, wi) => (
        <span className="word" key={`${w}-${wi}`} aria-hidden="true">
          {w.split("").map((c, ci) => {
            const d = delay + n++ * 0.028;
            return (
              <motion.span className="ch" key={ci} variants={charV} initial="hide" custom={d} {...trigger}>{c}</motion.span>
            );
          })}
        </span>
      ))}
    </span>
  );
}

function Title({ a, b, className = "" }) {
  return (
    <h2 className={`title ${className}`}>
      <SplitChars text={a} />
      <SplitChars text={b} className="dim" delay={0.25} />
    </h2>
  );
}

function SectionLabel({ children }) {
  return (
    <motion.p className="label" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      <i />{children}
    </motion.p>
  );
}

// Paragraph whose words change colour one by one while the page scrolls
function ScrollWord({ w, range, progress }) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <>
      <motion.span className="sw-word" style={{ opacity }}>{w}</motion.span>{" "}
    </>
  );
}
function ScrollText({ text, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
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
function Tilt({ children, className = "", max = 8 }) {
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

// Keeps a number looping inside [min, max)
const wrap = (min, max, v) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

// Marquee whose speed and direction react to how fast the page is scrolled
function VelocityMarquee({ items, base = -2.2 }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 5], { clamp: false });
  const dir = useRef(1);
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    let move = dir.current * base * (delta / 1000);
    if (factor.get() < 0) dir.current = -1;
    else if (factor.get() > 0) dir.current = 1;
    move += dir.current * move * factor.get();
    baseX.set(baseX.get() + move);
  });

  const group = [...items, ...items];
  return (
    <div className="vmarquee" aria-hidden="true">
      <motion.div className="vm-track" style={{ x }}>
        {[0, 1, 2, 3].map((k) => (
          <span className="vm-group" key={k}>
            {group.map((t, i) => (<span className="vm-item" key={`${k}-${i}`}>{t}<i /></span>))}
          </span>
        ))}
      </motion.div>
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
// Light / dark mode with a circular reveal from the toggle button (where the browser supports it)
function useTheme() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    let t = "dark";
    try {
      const saved = localStorage.getItem("rs_theme");
      if (saved === "light" || saved === "dark") t = saved;
      else t = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    } catch {}
    setTheme(t);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  const toggle = useCallback((e) => {
    const next = theme === "dark" ? "light" : "dark";
    const apply = () => {
      setTheme(next);
      document.documentElement.dataset.theme = next;
      document.documentElement.style.colorScheme = next;
      try { localStorage.setItem("rs_theme", next); } catch {}
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce) { apply(); return; }

    let x = window.innerWidth - 60;
    let y = 40;
    if (e && e.currentTarget && e.currentTarget.getBoundingClientRect) {
      const r = e.currentTarget.getBoundingClientRect();
      x = r.left + r.width / 2;
      y = r.top + r.height / 2;
    }
    const end = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const t = document.startViewTransition(() => { flushSync(apply); });
    t.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${end}px at ${x}px ${y}px)`] },
        { duration: 750, easing: "cubic-bezier(0.22, 0.8, 0.2, 1)", pseudoElement: "::view-transition-new(root)" }
      );
    }).catch(() => {});
  }, [theme]);

  return { theme, toggle };
}

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
// Greets in a few languages, then the whole panel slides away with a curved edge
function Preloader({ onDone }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (i >= GREETINGS.length - 1) {
      const t = setTimeout(() => onDone(true), 650);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setI((v) => v + 1), i === 0 ? 700 : 380);
    return () => clearTimeout(t);
  }, [i, onDone]);

  return (
    <motion.div className="preloader" initial={{ y: 0 }} exit={{ y: "-105%" }} transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1] }}>
      <p className="pre-word"><i />{GREETINGS[i]}</p>
    </motion.div>
  );
}

/* ------------------------------- ANIMATED BACKGROUND ------------------------------ */
// A quiet dot grid that lights up around the cursor, plus film grain
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
      <i className="bg-dots" />
      <i className="bg-dots lit" />
      <i className="grain" />
    </div>
  );
}

// Cursor: a blended disc that grows over links, with an optional label (desktop only)
function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 420, damping: 32, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 420, damping: 32, mass: 0.4 });

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
    <motion.div className="cursor" style={{ x: sx, y: sy }}>
      <span className={`cursor-disc ${visible ? "show" : ""} ${hover ? "on" : ""} ${label ? "big" : ""}`} />
      {label && visible && <span className="cursor-label">{label}</span>}
    </motion.div>
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

/* ------------------------------------- HERO NAME ------------------------------------ */
// Big name: letters rise in, then swell in weight as the cursor gets close (desktop)
function HeroName({ play }) {
  const refs = useRef([]);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let raf = 0, mx = -9999, my = -9999;
    const apply = () => {
      raf = 0;
      refs.current.forEach((el) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const d = Math.hypot(mx - (r.left + r.width / 2), my - (r.top + r.height / 2));
        const k = Math.max(0, 1 - d / 340);
        el.style.fontVariationSettings = `"wght" ${Math.round(380 + k * 420)}`;
      });
    };
    const move = (e) => { mx = e.clientX; my = e.clientY; if (!raf) raf = requestAnimationFrame(apply); };
    window.addEventListener("mousemove", move, { passive: true });
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);

  let n = 0;
  return (
    <>
      {["Rohan", "Singh"].map((word) => (
        <span className="hn-line" key={word}>
          {word.split("").map((ch, ci) => {
            const idx = n++;
            return (
              <span className="mask hn-mask" key={ci}>
                <motion.span
                  ref={(el) => { refs.current[idx] = el; }}
                  className="mask-in hn-char" variants={maskV} initial="hide" animate={play ? "show" : "hide"} custom={0.45 + idx * 0.06}
                >{ch}</motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </>
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

/* ------------------------------- WORK (HORIZONTAL SCROLL) ----------------------------- */
// Vertical scrolling drives a sideways track of project cards (stacked normally on mobile)
const CARD_W = 72; // vw
const CARD_GAP = 3; // vw
const TRACK_PAD = 8; // vw

function WorkTrack() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const total = TRACK_PAD * 2 + projects.length * CARD_W + (projects.length - 1) * CARD_GAP;
  const x = useTransform(smooth, [0, 1], ["0vw", `${-(total - 100)}vw`]);

  return (
    <div className="work-pin" ref={ref} style={{ "--n": projects.length }}>
      <div className="work-sticky">
        <div className="work-head">
          <SectionLabel>Selected work</SectionLabel>
          <Title a="Real work." b="Practical impact." />
        </div>
        <motion.div className="work-track" style={{ x }}>
          {projects.map((p) => (
            <article className="wcard spot" key={p.number} onMouseMove={spot}>
              <div className="wcard-visual">
                <span className="wcard-num">{p.number}</span>
                <Mock kind={p.mock} host={p.host} />
              </div>
              <div className="wcard-copy">
                <p className="wcard-type">{p.type}</p>
                <h3>{p.title}</h3>
                <p className="wcard-desc">{p.description}</p>
                <ul className="wcard-points">{p.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
                <div className="chips">{p.stack.map((s) => <span key={s}>{s}</span>)}</div>
                {p.links.length > 0 ? (
                  <div className="wcard-links">
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
            </article>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ----------------------------------- TOOLBOX ----------------------------------- */
// Skills as chips that can be dragged around inside a box (drag is disabled on touch screens)
function Toolbox() {
  const [cat, setCat] = useState("All");
  const [canDrag, setCanDrag] = useState(false);
  const boxRef = useRef(null);
  const shown = cat === "All" ? skills : skills.filter((s) => s.cat === cat);

  useEffect(() => {
    setCanDrag(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  return (
    <div className="toolbox-wrap">
      <div className="tabs" role="tablist">
        {CATS.map((c) => (
          <button key={c} role="tab" aria-selected={cat === c} className={`tab ${cat === c ? "on" : ""}`} onClick={() => setCat(c)}>
            {cat === c && <motion.span layoutId="tab-pill" className="tab-pill" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
            <span>{c}</span>
          </button>
        ))}
      </div>
      <div className="toolbox" ref={boxRef}>
        {shown.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={`${cat}-${s.name}`} className="chip" data-cursor={canDrag ? "Drag" : undefined}
              drag={canDrag} dragConstraints={boxRef} dragElastic={0.25} dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
              whileDrag={{ scale: 1.1, zIndex: 5 }}
              initial={{ opacity: 0, scale: 0.6, y: 36 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: i * 0.045 }}
            >
              <Icon /> <span>{s.name}</span><small>{s.cat}</small>
            </motion.div>
          );
        })}
        {canDrag && <p className="toolbox-hint">Drag the chips around</p>}
      </div>
    </div>
  );
}

/* ---------------------------------- EXPERIENCE ---------------------------------- */
// Expandable list, first item open
function Experience() {
  const [open, setOpen] = useState(0);
  return (
    <div className="xp-list">
      {experience.map((e, i) => {
        const isOpen = open === i;
        return (
          <motion.div className={`xp ${isOpen ? "open" : ""}`} key={e.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, delay: i * 0.06, ease: EASE }}>
            <button className="xp-head" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen}>
              <span className="xp-date">{e.date}</span>
              <span className="xp-title">{e.title}</span>
              <span className="xp-plus"><FaPlus /></span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div className="xp-body" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease: EASE }}>
                  <div className="xp-inner">
                    <p className="xp-place">{e.place}</p>
                    <p className="xp-text">{e.text}</p>
                    {e.link && <a className="text-link" href={e.link} target="_blank" rel="noreferrer">View certificate ↗</a>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
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
  const [imgOk, setImgOk] = useState(true);
  const [toast, setToast] = useState("");
  const toastTimer = useRef(null);

  const { theme, toggle } = useTheme();
  const role = useScramble(ROLES);
  const time = useMumbaiTime();

  const { scrollY } = useScroll();
  // Hero parallax: photo drifts up slower than the page, the name drifts up faster
  const photoY = useTransform(scrollY, [0, 800], [0, -90]);
  const nameY = useTransform(scrollY, [0, 800], [0, 120]);

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

  // Back-to-top visibility
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the side dot of the section currently in view
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
    { id: "theme", group: "Appearance", label: theme === "dark" ? "Switch to light mode" : "Switch to dark mode", icon: theme === "dark" ? FaSun : FaMoon, run: () => toggle() },
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

  const ThemeIcon = theme === "dark" ? FaSun : FaMoon;
  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <MotionConfig reducedMotion="user">
      <main className="portfolio" id="home">
        <AnimatePresence>{!ready && <Preloader key="preloader" onDone={setReady} />}</AnimatePresence>

        <a className="skip" href="#about">Skip to content</a>
        <Background />
        <CustomCursor />

        {/* HEADER: logo, local time, theme toggle, menu */}
        <motion.header className="topbar" initial={{ opacity: 0, y: -30 }} animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }} transition={{ duration: 0.8, delay: ready ? 1 : 0, ease: EASE }}>
          <a className="logo" href="#home">rohan<span>.</span></a>
          <div className="topbar-right">
            <span className="tb-time"><i className="dot" /> Mumbai {time || "--:--"}</span>
            <button className="tb-btn" onClick={() => setPalette(true)} aria-label="Open command palette"><FaMagnifyingGlass /></button>
            <button className="tb-btn" onClick={toggle} aria-label={`Switch to ${nextTheme} mode`} title={`Switch to ${nextTheme} mode`}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={theme} className="tb-ico" initial={{ rotate: -90, scale: 0.4, opacity: 0 }} animate={{ rotate: 0, scale: 1, opacity: 1 }} exit={{ rotate: 90, scale: 0.4, opacity: 0 }} transition={{ duration: 0.22, ease: EASE }}>
                  <ThemeIcon />
                </motion.span>
              </AnimatePresence>
            </button>
            <button className="menu-btn" onClick={() => setMenu(true)} aria-label="Open menu">
              <span>Menu</span><i /><i />
            </button>
          </div>
        </motion.header>

        {/* Side dots: jump to a section */}
        <nav className="dots" aria-label="Sections">
          {["home", ...NAV.map((n) => n.toLowerCase())].map((id) => (
            <button key={id} className={active === id ? "on" : ""} onClick={() => go(id)} aria-label={`Go to ${id}`}><span>{id}</span><i /></button>
          ))}
        </nav>

        {/* FULL SCREEN MENU */}
        <AnimatePresence>
          {menu && (
            <motion.div className="menu" initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}>
              <button className="menu-close" onClick={() => setMenu(false)} aria-label="Close menu"><span>Close</span><FaXmark /></button>
              <div className="menu-main">
                <nav className="menu-links">
                  {NAV.map((x, i) => (
                    <motion.a key={x} href={`#${x.toLowerCase()}`} className="roll" onClick={() => setMenu(false)} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.07, duration: 0.7, ease: EASE }}>
                      <span className="roll-in"><span>{x}</span><span aria-hidden="true">{x}</span></span>
                    </motion.a>
                  ))}
                </nav>
                <motion.div className="menu-side" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.7, ease: EASE }}>
                  <p>Say hello</p>
                  <a href={MAILTO_LINK} onClick={openGmail}>{EMAIL}</a>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer">{WHATSAPP_DISPLAY}</a>
                  <div className="socials">
                    {channels.map((c) => {
                      const Icon = c.icon;
                      return (
                        <a key={c.key} className="social" href={c.href} onClick={c.onClick} aria-label={c.name} {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}><Icon /></a>
                      );
                    })}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* HERO */}
        <section className="hero">
          <motion.div className="hero-top" variants={fadeUp} initial="hidden" animate={ready ? "visible" : "hidden"} custom={9}>
            <span><i className="dot" /> Available for opportunities</span>
            <span>Based in Mumbai, India <FaLocationDot /></span>
          </motion.div>

          <div className="hero-stage">
            <motion.div className="hero-photo" style={{ y: photoY }} initial={{ opacity: 0, scale: 0.85, rotate: -6 }} animate={ready ? { opacity: 1, scale: 1, rotate: 0 } : {}} transition={{ duration: 1.2, delay: 0.9, ease: EASE }}>
              <Tilt className="photo-tilt">
                <div className="photo-card">
                  {imgOk ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className="photo" src={PHOTO_FILE} alt="Rohan Singh" onError={() => setImgOk(false)} />
                  ) : (
                    <div className="photo-fallback">RS</div>
                  )}
                </div>
              </Tilt>
              <svg className="badge" viewBox="0 0 120 120" aria-hidden="true">
                <defs><path id="badge-path" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" /></defs>
                <text><textPath href="#badge-path">Full Stack Developer • Next.js • PHP • MySQL • </textPath></text>
              </svg>
              <motion.span className="fchip" animate={ready ? { y: [0, -9, 0] } : {}} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}><SiNextdotjs /> Next.js</motion.span>
            </motion.div>

            <motion.h1 className="hero-name" style={{ y: nameY }} aria-label="Rohan Singh">
              <HeroName play={ready} />
            </motion.h1>
          </div>

          <div className="hero-foot">
            <motion.div className="hf-col" variants={fadeUp} initial="hidden" animate={ready ? "visible" : "hidden"} custom={13}>
              <p className="hero-tag">I make the digital world work better.</p>
              <p className="intro">A full stack developer at ENATS LLP building responsive web experiences, mobile features and dependable backend solutions with Next.js, React, PHP and MySQL.</p>
            </motion.div>
            <motion.div className="hf-col" variants={fadeUp} initial="hidden" animate={ready ? "visible" : "hidden"} custom={14}>
              <p className="role-line"><span className="prompt">›</span><span className="role">{role}</span><span className="caret" /></p>
              <ResumeButtons />
            </motion.div>
            <motion.div className="hf-col hf-right" variants={fadeUp} initial="hidden" animate={ready ? "visible" : "hidden"} custom={15}>
              <div className="socials">
                {channels.map((c) => {
                  const Icon = c.icon;
                  return (
                    <a key={c.key} className="social" href={c.href} onClick={c.onClick} aria-label={c.name} {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}><Icon /></a>
                  );
                })}
              </div>
              <span className="socials-hint">Press <kbd>Ctrl K</kbd> to explore</span>
            </motion.div>
          </div>
        </section>

        <div className="vm-band"><VelocityMarquee items={["Full Stack Developer", "Next.js", "PHP", "MySQL", "React", "APIs"]} /></div>

        {/* ABOUT */}
        <section className="section about" id="about">
          <div className="about-grid">
            <div className="about-left">
              <SectionLabel>About me</SectionLabel>
              <Title a="Curiosity first." b="Solutions always." />
              <a className="text-link" href="#journey">Explore my journey ↗</a>
            </div>
            <div className="about-right">
              <ScrollText text={ABOUT_TEXT} className="about-statement" />

              <div className="stats">
                {stats.map((s) => (
                  <div className="stat" key={s.label}>
                    <strong><CountUp to={s.to} format={(n) => `${String(n).padStart(2, "0")}${s.suffix}`} /></strong>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>

              <div className="info-grid">
                <motion.div className="card spot" onMouseMove={spot} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                  <p className="card-tag"><i className="dot" /> Currently, 2025 to present</p>
                  <h3>Full Stack Developer</h3>
                  <p className="card-sub">ENATS LLP · Mumbai, India</p>
                  <div className="chips">{["Web", "Mobile", "APIs", "Admin modules"].map((c) => <span key={c}>{c}</span>)}</div>
                </motion.div>

                <motion.div className="card spot" onMouseMove={spot} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={1}>
                  <p className="card-tag">Local time</p>
                  <p className="clock">{time || "--:--"}</p>
                  <p className="card-sub">Mumbai · IST (UTC+5:30)</p>
                </motion.div>

                <motion.div className="card spot" onMouseMove={spot} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={2}>
                  <FaGraduationCap className="card-big" />
                  <p className="card-tag">Education</p>
                  <h3>B.Sc. Information Technology</h3>
                  <p className="card-sub">2024 · 6.95 / 10</p>
                  <p className="card-sub">SDAC InfoTech training · Grade A</p>
                </motion.div>

                <motion.a className="card spot card-link" href={GITHUB_LINK} target="_blank" rel="noreferrer" data-cursor="Open" onMouseMove={spot} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={3}>
                  <FaGithub className="card-big" />
                  <p className="card-tag">Code</p>
                  <h3>@{GITHUB_USERNAME}</h3>
                  <p className="card-sub">See my code on GitHub</p>
                  <FaArrowUpRightFromSquare className="card-arrow" />
                </motion.a>
              </div>
            </div>
          </div>
        </section>

        {/* STACK */}
        <section className="section stack-section" id="stack">
          <SectionLabel>Toolkit</SectionLabel>
          <div className="split-head">
            <Title a="Tools for" b="building things." />
            <motion.p className="section-summary" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}>The languages, frameworks and platforms I use to build interfaces, connect services and work with data.</motion.p>
          </div>
          <Toolbox />
        </section>

        {/* WORK */}
        <section className="work-section" id="work">
          <WorkTrack />
        </section>

        {/* JOURNEY */}
        <section className="section journey-section" id="journey">
          <SectionLabel>Experience and education</SectionLabel>
          <Title a="Every step" b="builds the next." />
          <Experience />
        </section>

        {/* CONTACT */}
        <section className="section contact" id="contact">
          <div className="contact-top">
            <div>
              <motion.p className="contact-tag" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <i className="dot" /> Open to new opportunities
              </motion.p>
              <Title a="Got an idea?" b="Let's talk." className="title-lg" />
              <motion.p className="contact-text" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}>
                Pick whichever is easiest for you. WhatsApp and Instagram open a direct chat with me, and Gmail opens a ready-to-send mail.
              </motion.p>
            </div>
            <Magnetic strength={0.25}>
              <button className="copy-orb" onClick={copyEmail} data-cursor="Copy" aria-label="Copy email address">
                <svg viewBox="0 0 120 120" aria-hidden="true">
                  <defs><path id="orb-path" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" /></defs>
                  <text><textPath href="#orb-path">Copy email • Copy email • Copy email • </textPath></text>
                </svg>
                <FaCopy />
              </button>
            </Magnetic>
          </div>

          <div className="channels">
            {channels.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.a
                  key={c.key} className="channel" href={c.href} onClick={c.onClick} data-cursor="Open"
                  {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} custom={i + 1}
                >
                  <span className="ch-ico"><Icon /></span>
                  <span className="ch-name">{c.name}</span>
                  <span className="ch-value">{c.value}</span>
                  <span className="ch-hint">{c.hint}</span>
                  <FaArrowUpRightFromSquare className="ch-arrow" />
                </motion.a>
              );
            })}
          </div>

          <motion.div className="contact-resume" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}>
            <p>Want the full story?</p>
            <ResumeButtons />
          </motion.div>
        </section>

        <footer className="footer">
          <VelocityMarquee items={["Let's build something great"]} base={1.6} />
          <div className="foot-row">
            <a className="logo" href="#home">rohan<span>.</span></a>
            <span>Designed and built by Rohan Singh</span>
            <span>© 2026</span>
          </div>
        </footer>

        {/* Plain back-to-top button */}
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
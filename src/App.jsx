import { useState, useEffect } from "react";
import {
  Github, Linkedin, Mail, ExternalLink, Shield,
  TrendingUp, Globe, ChevronDown, Code2, Wifi,
  Music2, ShoppingBag, Terminal, Target,
} from "lucide-react";

/* ─────────────────────────  GLOBAL STYLES  ───────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&family=Rajdhani:wght@400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg:    #04040a;
      --bg2:   #08080f;
      --green: #00ff9d;
      --red:   #ff3864;
      --cyan:  #00d4ff;
      --amber: #ffb800;
      --purple:#b44fff;
      --dim:   rgba(224,224,224,0.55);
      --mono:  'Share Tech Mono', monospace;
      --head:  'Orbitron', monospace;
      --body:  'Rajdhani', sans-serif;
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--bg);
      color: #e0e0e0;
      font-family: var(--body);
      overflow-x: hidden;
    }

    /* Scanlines */
    body::after {
      content: '';
      position: fixed; inset: 0;
      background: repeating-linear-gradient(
        0deg, transparent, transparent 3px,
        rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px
      );
      pointer-events: none;
      z-index: 9999;
    }

    /* Grid */
    .grid-bg {
      background-image:
        linear-gradient(rgba(0,255,157,0.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,255,157,0.025) 1px, transparent 1px);
      background-size: 44px 44px;
    }

    /* Glitch */
    @keyframes glitch {
      0%,88%,100% { transform: none; text-shadow: 0 0 12px var(--green), 0 0 40px rgba(0,255,157,0.25); }
      89% { transform: skew(-1deg) translateX(4px); color: var(--red); text-shadow: -4px 0 var(--cyan); }
      90% { transform: skew(0.5deg) translateX(-3px); color: var(--cyan); text-shadow: 4px 0 var(--red); }
      91% { transform: none; text-shadow: 0 0 12px var(--green); }
    }
    .glitch { animation: glitch 5s infinite; }

    /* Cursor */
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
    .cursor { animation: blink 1s step-end infinite; }

    /* Scroll reveal */
    .reveal { opacity: 0; transform: translateY(28px); transition: opacity .65s ease, transform .65s ease; }
    .reveal.visible { opacity: 1; transform: none; }
    .reveal.delay-1 { transition-delay: .12s; }
    .reveal.delay-2 { transition-delay: .24s; }
    .reveal.delay-3 { transition-delay: .36s; }
    .reveal.delay-4 { transition-delay: .48s; }
    .reveal.delay-5 { transition-delay: .60s; }

    /* Fade-in for hero */
    @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:none} }
    .fu   { opacity:0; animation: fadeUp .7s ease forwards; }
    .fu-1 { animation-delay:.1s }
    .fu-2 { animation-delay:.3s }
    .fu-3 { animation-delay:.55s }
    .fu-4 { animation-delay:.75s }
    .fu-5 { animation-delay:.95s }

    /* Terminal chrome */
    .term {
      background: var(--bg2);
      border: 1px solid rgba(0,255,157,0.18);
      border-radius: 6px;
      overflow: hidden;
    }
    .term-head {
      padding: 9px 14px;
      border-bottom: 1px solid rgba(0,255,157,0.12);
      background: rgba(0,255,157,0.03);
      display: flex; align-items: center; gap: 7px;
    }
    .dot { width:10px; height:10px; border-radius:50%; flex-shrink:0; }

    /* Nav */
    nav {
      position: fixed; top:0; left:0; right:0; z-index:200;
      backdrop-filter: blur(14px);
      background: rgba(4,4,10,.82);
      border-bottom: 1px solid rgba(0,255,157,0.1);
    }

    /* Buttons */
    .btn-g, .btn-c {
      font-family: var(--mono); font-size:.82rem;
      letter-spacing:.1em; cursor:pointer;
      padding: 10px 26px;
      border-radius: 2px;
      transition: all .22s;
    }
    .btn-g {
      background: transparent;
      border: 1px solid var(--green);
      color: var(--green);
    }
    .btn-g:hover {
      background: var(--green); color: var(--bg);
      box-shadow: 0 0 22px rgba(0,255,157,.55);
    }
    .btn-c {
      background: transparent;
      border: 1px solid rgba(0,212,255,.45);
      color: var(--cyan);
    }
    .btn-c:hover {
      background: rgba(0,212,255,.1);
      border-color: var(--cyan);
      box-shadow: 0 0 18px rgba(0,212,255,.3);
    }

    /* Skill tag */
    .stag {
      font-family: var(--mono); font-size:.72rem;
      padding: 3px 11px;
      border-radius: 2px;
      border: 1px solid rgba(0,255,157,.28);
      color: var(--green);
      background: rgba(0,255,157,.05);
      transition: all .2s;
      display:inline-block;
    }
    .stag:hover {
      background: rgba(0,255,157,.15);
      border-color: var(--green);
      box-shadow: 0 0 8px rgba(0,255,157,.3);
    }

    /* Card hover */
    .card-hover {
      transition: border-color .25s, box-shadow .25s, transform .25s;
    }
    .card-hover:hover {
      transform: translateY(-3px);
      box-shadow: 0 0 28px rgba(0,255,157,.15), inset 0 0 16px rgba(0,255,157,.04);
    }

    /* Corner decoration */
    .corner-tl { position:absolute; top:72px; left:32px; width:52px; height:52px; border-left:2px solid rgba(0,255,157,.3); border-top:2px solid rgba(0,255,157,.3); }
    .corner-tr { position:absolute; top:72px; right:32px; width:52px; height:52px; border-right:2px solid rgba(0,255,157,.3); border-top:2px solid rgba(0,255,157,.3); }
    .corner-bl { position:absolute; bottom:48px; left:32px; width:52px; height:52px; border-left:2px solid rgba(0,255,157,.3); border-bottom:2px solid rgba(0,255,157,.3); }
    .corner-br { position:absolute; bottom:48px; right:32px; width:52px; height:52px; border-right:2px solid rgba(0,255,157,.3); border-bottom:2px solid rgba(0,255,157,.3); }

    /* Scrollbar */
    ::-webkit-scrollbar { width:3px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: var(--green); }

    @keyframes chevBlink { 0%,100%{opacity:.35} 50%{opacity:.8} }
    .chev { animation: chevBlink 2.2s ease-in-out infinite; }

    @keyframes pulseBorder {
      0%,100% { border-color: rgba(0,255,157,.2); box-shadow: none; }
      50% { border-color: rgba(0,255,157,.55); box-shadow: 0 0 20px rgba(0,255,157,.2); }
    }
    .pulse { animation: pulseBorder 3s ease-in-out infinite; }
  `}</style>
);

/* ─────────────────────────  DATA  ───────────────────────── */
const ROLES = [
  "Networking & Security Engineer",
  "Software Developer",
  "Honeypot Researcher",
  "Web3 & Blockchain Explorer",
];

const PROJECTS = [
  {
    tag: "FINAL YEAR PROJECT",
    status: "PRIMARY",
    title: "IoT Honeypot Simulation Lab",
    Icon: Shield,
    color: "#00ff9d",
    desc: "Lightweight HTTP honeypot built with Flask & SQLite, simulating IoT attack surfaces. Features an Active Defense Loop (IPS simulation), Kill Chain Visualization mapped to MITRE ATT&CK stages, and a Noise vs Signal Challenge mode for student security training.",
    tech: ["Python", "Flask", "SQLite", "Jinja2", "Tailwind", "Kali Linux", "MITRE ATT&CK"],
    github: "#",
  },
  {
    tag: "SIDE PROJECT",
    status: "COMPLETE",
    title: "Bitcoin Trading Backtester",
    Icon: TrendingUp,
    color: "#ffb800",
    desc: "Modular 6-file Python backtesting engine for crypto trading strategies. Implements RSI + Volume Spike + Candlestick Wick logic, 4 named strategy presets, grid search optimisation, and a tkinter GUI for interactive visual analysis.",
    tech: ["Python", "yfinance", "tkinter", "Pandas", "NumPy"],
    github: "#",
  },
  {
    tag: "SIDE PROJECT",
    status: "IN PROGRESS",
    title: "SonicUV — Local Music Server",
    Icon: Music2,
    color: "#b44fff",
    desc: "A local Spotify-like streaming server for personal osu! music libraries. Built with a modern Python stack — FastAPI serves audio streams via dynamic endpoints, uv manages dependencies, and a vanilla HTML/JS frontend handles client-side search without any database overhead.",
    tech: ["Python", "FastAPI", "uvicorn", "uv", "Docker", "HTML/JS"],
    github: "#",
  },
  {
    tag: "COURSEWORK // IBM4202",
    status: "DEPLOYED",
    title: "Agrimarket Web Platform",
    Icon: ShoppingBag,
    color: "#00d4ff",
    desc: "Full-stack agricultural marketplace connecting vendors with customers, featuring role-based dashboards for Admin, Staff, Vendor, and Customer. Includes cart & checkout, order tracking, refund requests, subscription plans, and an analytics dashboard.",
    tech: ["PHP", "MySQL", "jQuery", "PHPMailer", "PDO", "XAMPP"],
    github: "#",
  },
  {
    tag: "COURSEWORK",
    status: "DEPLOYED",
    title: "TaskHub Web App",
    Icon: Globe,
    color: "#ff3864",
    desc: "PHP-based task management platform with user authentication, full CRUD operations, and a clean MVC-like architecture. Structured for clean GitHub presentation with secure credential handling.",
    tech: ["PHP", "MySQL", "HTML/CSS", "JavaScript"],
    github: "#",
  },
];

const CTF_PLATFORMS = [
  {
    Icon: Target,
    name: "picoCTF",
    color: "#00ff9d",
    desc: "Gamified challenges covering web exploitation, binary analysis, reverse engineering, cryptography, and general security scripting.",
    href: "#",
  },
  {
    Icon: Terminal,
    name: "PortSwigger Web Academy",
    color: "#00d4ff",
    desc: "Real-world web vulnerabilities manually exploited using Burp Suite — SQL injection, XSS, SSRF, authentication bypasses, and more.",
    href: "#",
  },
];

const SKILLS = {
  "Security & Networking": ["Kali Linux", "Wireshark", "Burp Suite", "MITRE ATT&CK", "Honeypot", "IPS/IDS", "TCP/IP", "Packet Analysis"],
  "Languages": ["Python", "PHP", "JavaScript", "SQL", "HTML/CSS", "Bash"],
  "Frameworks & Tools": ["Flask", "FastAPI", "React", "Tailwind CSS", "Docker", "uv", "jQuery"],
  "Databases & Infra": ["SQLite", "MySQL", "PDO", "XAMPP", "Git", "GitHub"],
};

const INTERESTS = [
  { Icon: Shield,    label: "Security Research",    desc: "Honeypot deployment, IoT threat simulation, MITRE ATT&CK",   color: "#00ff9d" },
  { Icon: Code2,     label: "Software Engineering", desc: "Full-stack dev, Python systems, REST APIs",                   color: "#00d4ff" },
  { Icon: TrendingUp,label: "Quantitative Finance", desc: "Algorithmic trading strategy design & backtesting",           color: "#ffb800" },
  { Icon: Wifi,      label: "Networking",           desc: "TCP/IP, packet analysis, network security protocols",         color: "#ff3864" },
];

/* ─────────────────────────  HOOKS  ───────────────────────── */
function useTypewriter(strings) {
  const [display, setDisplay]   = useState("");
  const [roleIdx, setRoleIdx]   = useState(0);
  const [charIdx, setCharIdx]   = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = strings[roleIdx];
    const delay   = deleting ? 40 : charIdx === current.length ? 1800 : 75;
    const t = setTimeout(() => {
      if (!deleting && charIdx < current.length) {
        setDisplay(current.slice(0, charIdx + 1));
        setCharIdx(c => c + 1);
      } else if (!deleting) {
        setDeleting(true);
      } else if (charIdx > 0) {
        setDisplay(current.slice(0, charIdx - 1));
        setCharIdx(c => c - 1);
      } else {
        setDeleting(false);
        setRoleIdx(i => (i + 1) % strings.length);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [display, charIdx, deleting, roleIdx, strings]);

  return display;
}

function useScrollReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.45 }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

/* ─────────────────────────  COMPONENTS  ───────────────────────── */
const NAV_IDS = ["home", "about", "projects", "ctf", "skills", "contact"];

function Nav({ active }) {
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <nav>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center", height: 54 }}>
        <span style={{ fontFamily: "var(--head)", color: "var(--green)", fontSize: ".9rem", letterSpacing: ".18em", textShadow: "0 0 10px rgba(0,255,157,.45)" }}>
          KK<span style={{ color: "var(--red)" }}>.</span>DEV
        </span>
        <div style={{ display: "flex", gap: 24 }}>
          {NAV_IDS.map(id => (
            <button key={id} onClick={() => go(id)} style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "var(--mono)", fontSize: ".72rem", letterSpacing: ".12em",
              textTransform: "uppercase",
              color: active === id ? "var(--green)" : "rgba(224,224,224,.4)",
              borderBottom: active === id ? "1px solid var(--green)" : "1px solid transparent",
              paddingBottom: 2,
              transition: "color .2s, border-color .2s",
            }}>
              {id}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const typed = useTypewriter(ROLES);
  const go    = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="grid-bg" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", paddingTop: 54 }}>
      <div className="corner-tl" /><div className="corner-tr" />
      <div className="corner-bl" /><div className="corner-br" />

      <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 300, background: "radial-gradient(ellipse, rgba(0,255,157,.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ textAlign: "center", padding: "0 24px", maxWidth: 780 }}>
        <p className="fu fu-1" style={{ fontFamily: "var(--mono)", color: "var(--green)", fontSize: ".8rem", letterSpacing: ".35em", marginBottom: 14 }}>
          &gt;&nbsp;INITIALIZING PORTFOLIO.EXE
        </p>
        <p className="fu fu-2" style={{ fontFamily: "var(--mono)", color: "rgba(0,255,157,.45)", fontSize: ".72rem", letterSpacing: ".22em", marginBottom: 28 }}>
          ✓ ACCESS GRANTED — WELCOME
        </p>

        <h1 className="glitch fu fu-3" style={{ fontFamily: "var(--head)", fontWeight: 900, fontSize: "clamp(2.8rem,7vw,5.5rem)", color: "var(--green)", letterSpacing: ".06em", lineHeight: 1.05, marginBottom: 10 }}>
          KHONG KOK KIN
        </h1>

        <div className="fu fu-4" style={{ fontFamily: "var(--mono)", fontSize: "clamp(.95rem,2.2vw,1.3rem)", color: "#e0e0e0", marginBottom: 10, minHeight: "2em" }}>
          <span style={{ color: "var(--red)" }}>&gt;&nbsp;</span>{typed}<span className="cursor" style={{ color: "var(--green)" }}>█</span>
        </div>

        <p className="fu fu-4" style={{ color: "rgba(224,224,224,.38)", fontFamily: "var(--mono)", fontSize: ".78rem", letterSpacing: ".18em", marginBottom: 44 }}>
          CS @ INTI INTERNATIONAL UNIVERSITY &nbsp;·&nbsp; NETWORKING &amp; SECURITY
        </p>

        <div className="fu fu-5" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn-g" onClick={() => go("projects")}>&gt;&nbsp;VIEW_PROJECTS</button>
          <button className="btn-c" onClick={() => go("contact")}>&gt;&nbsp;CONNECT</button>
        </div>
      </div>

      <button className="chev" onClick={() => go("about")} style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(0,255,157,.5)" }}>
        <ChevronDown size={22} />
      </button>
    </section>
  );
}

function SectionLabel({ num, title, accent }) {
  return (
    <div className="reveal" style={{ marginBottom: 44 }}>
      <div style={{ fontFamily: "var(--mono)", color: "var(--red)", fontSize: ".72rem", letterSpacing: ".3em", marginBottom: 6 }}>// {num}</div>
      <h2 style={{ fontFamily: "var(--head)", fontSize: "clamp(1.5rem,3vw,2.1rem)", color: "#e0e0e0", letterSpacing: ".1em" }}>
        {title.split(accent)[0]}<span style={{ color: "var(--green)" }}>{accent}</span>{title.split(accent)[1] ?? ""}
      </h2>
    </div>
  );
}

function About() {
  return (
    <section id="about" style={{ padding: "96px 24px", maxWidth: 1080, margin: "0 auto" }}>
      <SectionLabel num="01" title={`ABOUT ME`} accent="ME" />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
        {/* Terminal card — text-align left fix */}
        <div className="term reveal">
          <div className="term-head">
            <div className="dot" style={{ background:"#ff5f57" }} />
            <div className="dot" style={{ background:"#ffbd2e" }} />
            <div className="dot" style={{ background:"#28c840" }} />
            <span style={{ fontFamily:"var(--mono)", color:"rgba(0,255,157,.4)", fontSize:".7rem", marginLeft:8 }}>about.sh</span>
          </div>
          <div style={{ padding:24, fontFamily:"var(--mono)", fontSize:".82rem", lineHeight:1.85, textAlign:"left" }}>
            <p style={{ color:"var(--green)" }}>&gt; whoami</p>
            <p style={{ color:"var(--dim)", marginBottom:14 }}>
              Final year CS student specialising in&nbsp;
              <span style={{ color:"var(--cyan)" }}>Networking &amp; Security</span>&nbsp;
              at INTI International University, Malaysia.
            </p>
            <p style={{ color:"var(--green)" }}>&gt; cat interests.txt</p>
            <p style={{ color:"var(--dim)", marginBottom:14 }}>
              Cybersecurity research, honeypot engineering, Web3 exploration, and shipping clean, portfolio-ready code on GitHub.
            </p>
            <p style={{ color:"var(--green)" }}>&gt; ls opportunities/</p>
            <p style={{ color:"var(--amber)" }}>
              SWE_Internship.txt &nbsp; NetSec_Internship.txt
            </p>
            <p style={{ color:"rgba(0,255,157,.5)", marginTop:10 }}>[ STATUS: OPEN TO OFFERS ✓ ]</p>
          </div>
        </div>

        {/* Interest cards */}
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {INTERESTS.map(({ Icon, label, desc, color }, i) => (
            <div key={label} className={`card-hover reveal delay-${i+1}`} style={{
              display:"flex", gap:14, alignItems:"flex-start",
              padding:"14px 16px",
              border:"1px solid rgba(0,255,157,.14)",
              background:"rgba(0,255,157,.025)",
              borderRadius:4,
            }}>
              <Icon size={18} color={color} style={{ flexShrink:0, marginTop:3 }} />
              <div style={{ textAlign:"left" }}>
                <div style={{ fontFamily:"var(--head)", fontSize:".72rem", color, letterSpacing:".06em", marginBottom:3 }}>{label}</div>
                <div style={{ color:"rgba(224,224,224,.55)", fontSize:".88rem" }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [idx, setIdx] = useState(0);
  const [anim, setAnim] = useState(""); // "left" | "right"
  const total = PROJECTS.length;

  const navigate = (dir) => {
    setAnim(dir === 1 ? "right" : "left");
    setTimeout(() => {
      setIdx(i => (i + dir + total) % total);
      setAnim("");
    }, 220);
  };

  const p = PROJECTS[idx];
  const { Icon } = p;

  // Prev / next indices for peek cards
  const prevIdx = (idx - 1 + total) % total;
  const nextIdx = (idx + 1) % total;

  return (
    <section id="projects" style={{ padding:"96px 24px", background:"rgba(0,255,157,.018)", overflow:"hidden" }}>
      <div style={{ maxWidth:1080, margin:"0 auto" }}>
        <SectionLabel num="02" title="PROJECTS" accent="ECTS" />

        {/* Counter + dots */}
        <div className="reveal" style={{ display:"flex", alignItems:"center", gap:14, marginBottom:28 }}>
          <span style={{ fontFamily:"var(--mono)", color:"rgba(0,255,157,.4)", fontSize:".75rem", letterSpacing:".15em" }}>
            {String(idx+1).padStart(2,"0")} / {String(total).padStart(2,"0")}
          </span>
          <div style={{ display:"flex", gap:6 }}>
            {PROJECTS.map((pp, i) => (
              <button key={i} onClick={() => { setAnim(i > idx ? "right" : "left"); setTimeout(()=>{ setIdx(i); setAnim(""); },220); }} style={{
                width: i === idx ? 22 : 7, height:7, borderRadius:4,
                background: i === idx ? p.color : "rgba(0,255,157,.18)",
                border:"none", cursor:"pointer", transition:"all .3s", padding:0,
              }} />
            ))}
          </div>
        </div>

        {/* Carousel row */}
        <div style={{ display:"flex", alignItems:"center", gap:16 }}>

          {/* Left button */}
          <button onClick={() => navigate(-1)} style={{
            flexShrink:0, width:44, height:44, borderRadius:2,
            background:"none", border:"1px solid rgba(0,255,157,.25)", color:"rgba(0,255,157,.6)",
            cursor:"pointer", fontFamily:"var(--mono)", fontSize:"1.1rem",
            display:"flex", alignItems:"center", justifyContent:"center",
            transition:"all .2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background="rgba(0,255,157,.08)"; e.currentTarget.style.borderColor="var(--green)"; e.currentTarget.style.color="var(--green)"; e.currentTarget.style.boxShadow="0 0 14px rgba(0,255,157,.3)"; }}
          onMouseLeave={e => { e.currentTarget.style.background="none"; e.currentTarget.style.borderColor="rgba(0,255,157,.25)"; e.currentTarget.style.color="rgba(0,255,157,.6)"; e.currentTarget.style.boxShadow="none"; }}
          >‹</button>

          {/* Peek prev */}
          <div style={{
            flexShrink:0, width:200, opacity:.3, transform:"scale(0.92) translateX(12px)",
            transition:"all .25s", pointerEvents:"none", display:"flex", flexDirection:"column",
            overflow:"hidden", borderRadius:6,
            border:`1px solid ${PROJECTS[prevIdx].color}20`,
            background:"var(--bg2)", minHeight:260,
          }}>
            <div style={{ padding:"10px 14px", borderBottom:`1px solid ${PROJECTS[prevIdx].color}15`, fontFamily:"var(--mono)", fontSize:".62rem", color:"rgba(224,224,224,.3)" }}>
              {PROJECTS[prevIdx].tag}
            </div>
            <div style={{ padding:"14px", flex:1 }}>
              <div style={{ fontFamily:"var(--head)", fontSize:".72rem", color:"rgba(224,224,224,.5)", marginBottom:6 }}>{PROJECTS[prevIdx].title}</div>
              <p style={{ color:"rgba(224,224,224,.3)", fontSize:".8rem", lineHeight:1.6 }}>{PROJECTS[prevIdx].desc.slice(0,80)}…</p>
            </div>
          </div>

          {/* Main active card */}
          <div style={{
            flex:1, minWidth:0,
            opacity: anim ? 0 : 1,
            transform: anim === "right" ? "translateX(30px)" : anim === "left" ? "translateX(-30px)" : "none",
            transition:"opacity .22s ease, transform .22s ease",
          }}>
            <div className="term" style={{ borderColor:`${p.color}35` }}>
              <div className="term-head" style={{ borderColor:`${p.color}20` }}>
                <div className="dot" style={{ background:"#ff5f57" }} />
                <div className="dot" style={{ background:"#ffbd2e" }} />
                <div className="dot" style={{ background:"#28c840" }} />
                <span style={{ fontFamily:"var(--mono)", color:"rgba(224,224,224,.35)", fontSize:".68rem", marginLeft:8 }}>{p.tag}</span>
                <span style={{ marginLeft:"auto", fontFamily:"var(--mono)", fontSize:".62rem", color:p.color, padding:"2px 8px", border:`1px solid ${p.color}40`, borderRadius:2 }}>{p.status}</span>
              </div>
              <div style={{ padding:28, display:"flex", flexDirection:"column" }}>
                <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
                  <Icon size={22} color={p.color} />
                  <h3 style={{ fontFamily:"var(--head)", fontSize:"1rem", color:"#e0e0e0", letterSpacing:".04em" }}>{p.title}</h3>
                </div>
                <p style={{ color:"rgba(224,224,224,.62)", fontSize:".92rem", lineHeight:1.78, marginBottom:22 }}>{p.desc}</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:7, marginBottom:22 }}>
                  {p.tech.map(t => (
                    <span key={t} style={{ fontFamily:"var(--mono)", fontSize:".68rem", padding:"3px 10px", border:`1px solid ${p.color}38`, color:p.color, background:`${p.color}08`, borderRadius:2 }}>{t}</span>
                  ))}
                </div>
                <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none", alignSelf:"flex-start" }}>
                  <button style={{
                    background:"none", border:`1px solid ${p.color}50`, color:p.color,
                    padding:"8px 20px", fontFamily:"var(--mono)", fontSize:".75rem",
                    cursor:"pointer", letterSpacing:".1em", display:"flex", alignItems:"center", gap:7,
                    borderRadius:2, transition:"all .2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background=`${p.color}14`; e.currentTarget.style.boxShadow=`0 0 14px ${p.color}40`; }}
                  onMouseLeave={e => { e.currentTarget.style.background="none"; e.currentTarget.style.boxShadow="none"; }}
                  >
                    <ExternalLink size={12} />&nbsp;VIEW_ON_GITHUB
                  </button>
                </a>
              </div>
            </div>
          </div>

          {/* Peek next */}
          <div style={{
            flexShrink:0, width:200, opacity:.3, transform:"scale(0.92) translateX(-12px)",
            transition:"all .25s", pointerEvents:"none", display:"flex", flexDirection:"column",
            overflow:"hidden", borderRadius:6,
            border:`1px solid ${PROJECTS[nextIdx].color}20`,
            background:"var(--bg2)", minHeight:260,
          }}>
            <div style={{ padding:"10px 14px", borderBottom:`1px solid ${PROJECTS[nextIdx].color}15`, fontFamily:"var(--mono)", fontSize:".62rem", color:"rgba(224,224,224,.3)" }}>
              {PROJECTS[nextIdx].tag}
            </div>
            <div style={{ padding:"14px", flex:1 }}>
              <div style={{ fontFamily:"var(--head)", fontSize:".72rem", color:"rgba(224,224,224,.5)", marginBottom:6 }}>{PROJECTS[nextIdx].title}</div>
              <p style={{ color:"rgba(224,224,224,.3)", fontSize:".8rem", lineHeight:1.6 }}>{PROJECTS[nextIdx].desc.slice(0,80)}…</p>
            </div>
          </div>

          {/* Right button */}
          <button onClick={() => navigate(1)} style={{
            flexShrink:0, width:44, height:44, borderRadius:2,
            background:"none", border:"1px solid rgba(0,255,157,.25)", color:"rgba(0,255,157,.6)",
            cursor:"pointer", fontFamily:"var(--mono)", fontSize:"1.1rem",
            display:"flex", alignItems:"center", justifyContent:"center",
            transition:"all .2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background="rgba(0,255,157,.08)"; e.currentTarget.style.borderColor="var(--green)"; e.currentTarget.style.color="var(--green)"; e.currentTarget.style.boxShadow="0 0 14px rgba(0,255,157,.3)"; }}
          onMouseLeave={e => { e.currentTarget.style.background="none"; e.currentTarget.style.borderColor="rgba(0,255,157,.25)"; e.currentTarget.style.color="rgba(0,255,157,.6)"; e.currentTarget.style.boxShadow="none"; }}
          >›</button>

        </div>
      </div>
    </section>
  );
}

function CTF() {
  return (
    <section id="ctf" style={{ padding:"96px 24px", maxWidth:1080, margin:"0 auto" }}>
      <SectionLabel num="03" title="SECURITY LAB" accent="LAB" />

      <p className="reveal" style={{ color:"rgba(224,224,224,.5)", fontFamily:"var(--mono)", fontSize:".82rem", marginBottom:32, borderLeft:"2px solid rgba(0,255,157,.3)", paddingLeft:14 }}>
        // Ongoing CTF practice & vulnerability research. Not a project — a mindset.
      </p>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))", gap:22, marginBottom:36 }}>
        {CTF_PLATFORMS.map(({ Icon, name, color, desc, href }, i) => (
          <div key={name} className={`term card-hover reveal delay-${i+1}`} style={{ borderColor:`${color}28` }}>
            <div className="term-head" style={{ borderColor:`${color}20` }}>
              <div className="dot" style={{ background:"#ff5f57" }} />
              <div className="dot" style={{ background:"#ffbd2e" }} />
              <div className="dot" style={{ background:"#28c840" }} />
              <span style={{ fontFamily:"var(--mono)", color:"rgba(224,224,224,.35)", fontSize:".68rem", marginLeft:8 }}>PLATFORM</span>
              <span style={{ marginLeft:"auto", fontFamily:"var(--mono)", fontSize:".62rem", color, padding:"2px 8px", border:`1px solid ${color}40`, borderRadius:2 }}>ACTIVE</span>
            </div>
            <div style={{ padding:22 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                <Icon size={18} color={color} />
                <h3 style={{ fontFamily:"var(--head)", fontSize:".82rem", color:"#e0e0e0", letterSpacing:".04em" }}>{name}</h3>
              </div>
              <p style={{ color:"rgba(224,224,224,.58)", fontSize:".88rem", lineHeight:1.72, marginBottom:18 }}>{desc}</p>
              <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none" }}>
                <button style={{
                  background:"none", border:`1px solid ${color}50`, color,
                  padding:"6px 16px", fontFamily:"var(--mono)", fontSize:".72rem",
                  cursor:"pointer", letterSpacing:".1em", display:"flex", alignItems:"center", gap:6,
                  borderRadius:2, transition:"all .2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background=`${color}14`; e.currentTarget.style.boxShadow=`0 0 14px ${color}40`; }}
                onMouseLeave={e => { e.currentTarget.style.background="none"; e.currentTarget.style.boxShadow="none"; }}
                >
                  <ExternalLink size={11} />&nbsp;VIEW_WRITEUPS
                </button>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Tools used row */}
      <div className="reveal delay-3" style={{ padding:"16px 20px", border:"1px solid rgba(0,255,157,.1)", borderRadius:4, background:"rgba(0,255,157,.02)", display:"flex", alignItems:"center", gap:16, flexWrap:"wrap" }}>
        <span style={{ fontFamily:"var(--mono)", color:"rgba(0,255,157,.5)", fontSize:".72rem", letterSpacing:".14em", flexShrink:0 }}>&gt; TOOLS_USED:</span>
        {["Burp Suite", "Kali Linux", "Wireshark", "nmap", "Python scripting", "Bash"].map(t => (
          <span key={t} className="stag">{t}</span>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" style={{ padding:"96px 24px", background:"rgba(0,255,157,.018)" }}>
      <div style={{ maxWidth:1080, margin:"0 auto" }}>
        <SectionLabel num="04" title="TECH STACK" accent="STACK" />

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:36 }}>
          {Object.entries(SKILLS).map(([cat, list], i) => (
            <div key={cat} className={`reveal delay-${i+1}`}>
              <div style={{ fontFamily:"var(--mono)", color:"var(--green)", fontSize:".75rem", letterSpacing:".14em", marginBottom:14, borderLeft:"2px solid var(--green)", paddingLeft:10 }}>
                &gt;&nbsp;{cat.toUpperCase()}
              </div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
                {list.map(s => <span key={s} className="stag">{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const links = [
    { Icon: Github,   label: "GITHUB",   href: "https://github.com/kkk0813" },
    { Icon: Linkedin, label: "LINKEDIN", href: "https://www.linkedin.com/in/khong-kok-kin-45495b37b/" },
    { Icon: Mail,     label: "EMAIL",    href: "https://mail.google.com/mail/?view=cm&to=khongkokkin0@gmail.com" },
  ];
  return (
    <section id="contact" style={{ padding:"96px 24px", background:"rgba(0,255,157,.018)" }}>
      <div style={{ maxWidth:560, margin:"0 auto", textAlign:"center" }}>
        <SectionLabel num="05" title="GET IN TOUCH" accent="TOUCH" />

        <div className="term pulse reveal" style={{ padding:36, marginBottom:28 }}>
          <p style={{ fontFamily:"var(--mono)", color:"var(--green)", fontSize:".8rem", marginBottom:10 }}>
            &gt; echo "Open to internship opportunities"
          </p>
          <p style={{ color:"rgba(224,224,224,.65)", fontSize:"1rem", lineHeight:1.75, marginBottom:24 }}>
            Final year CS student targeting SWE &amp; Network Security internships. Let's connect and build something great together.
          </p>
          <a href="https://mail.google.com/mail/?view=cm&to=khongkokkin0@gmail.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none" }}>
            <button className="btn-g" style={{ width:"100%" }}>&gt;&nbsp;SEND_MESSAGE</button>
          </a>
        </div>

        <div className="reveal" style={{ display:"flex", justifyContent:"center", gap:16 }}>
          {links.map(({ Icon, label, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none" }}>
              <div style={{
                display:"flex", flexDirection:"column", alignItems:"center", gap:8,
                color:"rgb(228, 247, 106)", padding:"14px 20px",
                border:"1px solid rgba(0, 255, 157, 0.17)", borderRadius:4, minWidth:82,
                transition:"all .22s", cursor:"pointer",
              }}
              onMouseEnter={e => { e.currentTarget.style.color="var(--green)"; e.currentTarget.style.borderColor="rgba(0,255,157,.45)"; e.currentTarget.style.boxShadow="0 0 14px rgba(0,255,157,.2)"; }}
              onMouseLeave={e => { e.currentTarget.style.color="rgb(228, 247, 106)"; e.currentTarget.style.borderColor="rgba(0, 255, 157, 0.17)"; e.currentTarget.style.boxShadow="none"; }}
              >
                <Icon size={20} />
                <span style={{ fontFamily:"var(--mono)", fontSize:".64rem", letterSpacing:".1em" }}>{label}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop:"1px solid rgba(0,255,157,.1)", padding:"22px", textAlign:"center" }}>
      <span style={{ fontFamily:"var(--mono)", color:"rgba(0,255,157,.28)", fontSize:".7rem", letterSpacing:".15em" }}>
        &copy; 2026 Khong Kok Kin &nbsp;·&nbsp; BUILT WITH REACT &nbsp;·&nbsp;
        <span style={{ color:"var(--red)" }}>♥</span>
      </span>
    </footer>
  );
}

/* ─────────────────────────  APP  ───────────────────────── */
export default function Portfolio() {
  useScrollReveal();
  const active = useActiveSection(NAV_IDS);

  return (
    <div style={{ background:"var(--bg)", minHeight:"100vh" }}>
      <GlobalStyles />
      <Nav active={active} />
      <Hero />
      <About />
      <Projects />
      <CTF />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
}
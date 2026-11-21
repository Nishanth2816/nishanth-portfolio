import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { ArrowDown, ArrowDownToLine, ArrowRight, ArrowUpRight, Github, Linkedin, Mail, MoveUpRight, MousePointer2 } from 'lucide-react';
import type { MutableRefObject } from 'react';
import Navigation from './components/Navigation';
import ProjectCard from './components/ProjectCard';
import SkillConstellation from './components/SkillConstellation';
import { experience, navigation, profile, projects } from './config/portfolio';

const NeuralScene = lazy(() => import('./features/NeuralScene'));
gsap.registerPlugin(ScrollTrigger);

const chapterNumber = (number: string, name: string) => <div className="chapter-kicker"><span className="chapter-number">{number}</span><span className="chapter-line"/><span>{name}</span></div>;

function SceneStage({ progress, motionEnabled, onReady }: { progress: MutableRefObject<number>; motionEnabled: boolean; onReady: () => void }) {
  return (
    <div className="scene-container">
      <div className="scene-ambient scene-ambient-one" />
      <div className="scene-ambient scene-ambient-two" />
      <div className="scene-grid" />
      <Suspense fallback={<div className="scene-placeholder" aria-hidden="true" />}>
        <NeuralScene progress={progress} motionEnabled={motionEnabled} onReady={onReady} />
      </Suspense>
      <div className="scene-vignette" />
    </div>
  );
}

function Preloader({ ready }: { ready: boolean }) {
  return (
    <AnimatePresence>
      {!ready && <motion.div className="preloader" initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] } }} aria-live="polite" role="status">
        <div className="preloader-top"><span>N / INTELLIGENCE</span><span>INITIALIZING EXPERIENCE</span></div>
        <div className="preloader-body"><div className="preloader-mark">N<span>.</span></div><p>CONNECTING THE DOTS</p><div className="preloader-track"><motion.div animate={{ scaleX: ready ? 1 : 0.78 }} transition={{ duration: ready ? 0.22 : 2.3, ease: 'easeOut' }} /></div><small>RENDERING / PREPARING INTERFACE</small></div>
        <div className="preloader-bottom"><span>PORTFOLIO 2026</span><span>LINGAMPALLI NISHANTH</span></div>
      </motion.div>}
    </AnimatePresence>
  );
}

function Hero({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <section className="hero section" id="home" aria-labelledby="hero-title">
      <div className="hero-coordinate mono">35° 08′ N / DIGITAL UNIVERSE</div>
      <div className="hero-content">
        <div className="hero-intro"><span className="hero-intro-mark">✳</span><span>AI IS NOT THE FUTURE.<br/>IT'S WHAT WE BUILD NOW.</span></div>
        <h1 id="hero-title" className="hero-title"><span className="hero-small-line">HI, I'M <span className="hero-name">LINGAMPALLI NISHANTH.</span></span><span className="hero-line">MAKING</span><span className="hero-line outlined">DATA</span><span className="hero-line last">THINK<span className="hero-period">.</span></span></h1>
        <div className="hero-bottom">
          <div className="hero-description"><span className="cyan-cross" aria-hidden="true">✦</span><p>AI engineer & data professional creating practical intelligence from complex information.</p><div className="hero-keywords">MACHINE LEARNING <span>/</span> LLM SYSTEMS <span>/</span> MLOPS</div></div>
          <div className="hero-ctas"><button type="button" className="button-primary" onClick={() => onNavigate('projects')}>EXPLORE WORK <ArrowUpRight size={18}/></button><a className="button-secondary" href={profile.resume} target="_blank" rel="noopener noreferrer">DOWNLOAD RESUME <ArrowDownToLine size={17}/></a></div>
        </div>
      </div>
      <div className="hero-side-stats" aria-hidden="true"><span>SYS / 001</span><span>ML + GENAI</span><span>INDIA / GLOBAL</span></div>
      <div className="hero-scroll"><span>SCROLL TO EXPLORE</span><ArrowDown size={15}/><div className="scroll-line" /></div>
    </section>
  );
}

function SignalMarquee() {
  return <div className="signal-marquee" aria-hidden="true"><div className="signal-ticker">{Array.from({ length: 4 }, (_, index) => <span key={index}>IDEAS <i>✳</i> INTELLIGENCE <i>✳</i> IMPACT <i>✳</i> HUMAN-CENTERED AI <i>✳</i></span>)}</div></div>;
}

function About() {
  return (
    <section className="about-section section" id="about" aria-labelledby="about-title">
      <div className="section-inner">
        {chapterNumber('01', 'ORIGIN / ABOUT ME')}
        <div className="about-main">
          <div className="about-headline"><span className="section-preface">SOME CONTEXT</span><h2 id="about-title" data-reveal>CURIOUS BY<br/> <em>DESIGN.</em><br/>PRECISE BY<br/> <em>NATURE.</em></h2></div>
          <div className="about-details"><div className="about-top-rule"/><p className="about-lead" data-reveal>My work lives at the intersection of <strong>data, engineering and intelligent systems.</strong></p><p>I'm Lingampalli Nishanth, an IIT Indore graduate building real-world AI applications—from retrieval-augmented assistants to predictive retail platforms. I enjoy the journey from messy datasets to meaningful decisions and reliable APIs.</p><p>My engineering background shaped how I approach ambiguous problems: research deeply, design carefully, measure outcomes, and ship what works.</p><div className="about-qualifications"><span><small>EDUCATION</small>IIT INDORE / B.TECH</span><span><small>FOCUS</small>AI · DATA · MLOPS</span><span><small>BASED IN</small>TELANGANA, INDIA</span></div></div>
        </div>
        <div className="journey-heading"><span>THE JOURNEY / 03 CHAPTERS</span><span>↘</span></div>
        <div className="journey-grid"><article className="journey-card"><span>2022 / FOUNDATION</span><b>01</b><h3>ENGINEERING<br/>MINDSET</h3><p>Built an analytical foundation at IIT Indore, studying materials science and engineering.</p></article><article className="journey-card"><span>2025 / EXPERIMENTATION</span><b>02</b><h3>BUILDING<br/>WITH AI</h3><p>Explored document retrieval, backend systems, structured data and LLM-powered interfaces.</p></article><article className="journey-card"><span>2026 / REAL-WORLD IMPACT</span><b>03</b><h3>FROM MODELS<br/>TO VALUE</h3><p>Worked on retail analytics, churn prediction, time-series forecasting and model evaluation.</p></article></div>
      </div>
    </section>
  );
}

function Projects({ motionEnabled }: { motionEnabled: boolean }) {
  return (
    <section className="projects-section section" id="projects" aria-labelledby="projects-title">
      <div className="section-inner">
        {chapterNumber('02', 'SELECTED WORK / CASE STUDIES')}
        <div className="projects-intro"><h2 id="projects-title" data-reveal>PROOF OF<br/><em>THOUGHT.</em><br/>PROOF OF WORK.</h2><div className="projects-intro-side"><span className="mini-asterisk">✳</span><p>Four explorations in applied intelligence. Scroll through the problem, the method, and the measurable outcome.</p><span className="small-index">01 — 04 / SELECTED</span></div></div>
        <div className="project-list">{projects.map(project => <ProjectCard key={project.slug} project={project} motionEnabled={motionEnabled} />)}</div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="experience-section section" id="experience" aria-labelledby="experience-title">
      <div className="section-inner">
        {chapterNumber('03', 'EXPERIENCE / MY TIMELINE')}
        <div className="experience-header"><h2 id="experience-title" data-reveal>REAL WORK.<br/><em>REAL LEARNING.</em></h2><p>From fundamental engineering to applied machine learning and responsible AI evaluation.</p></div>
        <div className="experience-timeline"><div className="experience-track"><div className="experience-track-progress"/></div>{experience.map((item, index) => <article className="experience-item" key={`${item.company}-${item.role}`}><div className="experience-index"><span>0{index + 1}</span><i/></div><div className="experience-period">{item.period}<span>{item.type}</span></div><div className="experience-body"><h3>{item.role}</h3><div className="experience-company">{item.company}</div><p>{item.description}</p><div className="experience-chips">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div><ArrowUpRight className="experience-arrow" size={21} aria-hidden="true"/></article>)}</div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="skills-section section" id="skills" aria-labelledby="skills-title"><div className="section-inner">
      {chapterNumber('04', 'TOOLKIT / TECHNICAL CAPABILITIES')}
      <div className="skills-heading"><div><span className="section-preface">CONTINUOUSLY EVOLVING</span><h2 id="skills-title" data-reveal>THE<br/><em>STACK.</em></h2></div><p>A connected toolkit for turning ideas into tested, working systems.</p></div>
      <SkillConstellation />
    </div></section>
  );
}

function Contact({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <section className="contact-section section" id="contact" aria-labelledby="contact-title"><div className="section-inner contact-inner">
      {chapterNumber('05', 'THE NEXT CHAPTER / CONTACT')}
      <div className="contact-signal"><span className="status-led"/> AVAILABLE FOR INTERESTING PROBLEMS & COLLABORATIONS</div>
      <h2 id="contact-title" data-reveal>LET'S BUILD<br/>WHAT'S <em>NEXT.</em></h2>
      <p className="contact-description">Have a meaningful AI, ML or data challenge? I'd love to hear about it.</p>
      <a className="contact-email" href={`mailto:${profile.email}`}><span>{profile.email}</span><MoveUpRight size={32}/></a>
      <div className="contact-links"><a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={18}/> LINKEDIN <ArrowUpRight size={15}/></a><a href={profile.github} target="_blank" rel="noopener noreferrer"><Github size={18}/> GITHUB <ArrowUpRight size={15}/></a><a href={profile.resume} target="_blank" rel="noopener noreferrer"><ArrowDownToLine size={18}/> RESUME <ArrowUpRight size={15}/></a><a href={`mailto:${profile.email}`}><Mail size={18}/> EMAIL <ArrowUpRight size={15}/></a></div>
      <footer className="site-footer"><div><span className="footer-identity">N<span>.</span></span><span>DESIGNED FOR CURIOSITY.<br/>BUILT FOR IMPACT.</span></div><span>© {new Date().getFullYear()} LINGAMPALLI NISHANTH</span><button type="button" onClick={() => onNavigate('home')}>BACK TO TOP ↑</button></footer>
    </div></section>
  );
}

function ScrollMarkers({ activeSection, onNavigate }: { activeSection: string; onNavigate: (id: string) => void }) {
  return <div className="side-markers" aria-label="Section quick navigation"><span className="side-marker-title">INDEX</span>{navigation.map((item, i) => <button key={item.id} type="button" aria-label={`Jump to ${item.label}`} title={item.label} className={activeSection === item.id ? 'active' : ''} onClick={() => onNavigate(item.id)}><span>0{i + 1}</span><i/></button>)}</div>;
}

export default function App() {
  const [motionEnabled, setMotionEnabled] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [sceneReady, setSceneReady] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const progress = useRef(0);
  const lenisRef = useRef<Lenis | null>(null);
  const onReady = useCallback(() => setSceneReady(true), []);

  // Lenis drives the browser's native scroll position; ScrollTrigger reads that position.
  useEffect(() => {
    if (!motionEnabled) { lenisRef.current = null; return; }
    const lenis = new Lenis({ duration: 1.25, smoothWheel: true, touchMultiplier: 1.05, wheelMultiplier: 0.92 });
    lenisRef.current = lenis;
    const tick = (time: number) => lenis.raf(time * 1000);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(tick); lenis.destroy(); lenisRef.current = null; };
  }, [motionEnabled]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ScrollTrigger scrubs one camera progress proxy and the atmospheric layers together.
      const cameraProxy = { value: 0 };
      const cameraTimeline = gsap.timeline({ scrollTrigger: { trigger: '#page', start: 'top top', end: 'bottom bottom', scrub: motionEnabled ? 0.8 : 0.001 } });
      cameraTimeline.to(cameraProxy, { value: 1, ease: 'none', onUpdate: () => { progress.current = cameraProxy.value; } }, 0)
        .to('.scene-ambient-one', { xPercent: -36, yPercent: -20, ease: 'none' }, 0)
        .to('.scene-ambient-two', { xPercent: 38, yPercent: 12, ease: 'none' }, 0);

      navigation.forEach((item) => {
        ScrollTrigger.create({ trigger: `#${item.id}`, start: 'top 48%', end: 'bottom 48%', onToggle: self => { if (self.isActive) setActiveSection(item.id); } });
      });
      ScrollTrigger.create({ trigger: '#home', start: 'top top', end: 'bottom 48%', onToggle: self => { if (self.isActive) setActiveSection('home'); } });

      if (motionEnabled) {
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
          gsap.fromTo(element, { autoAlpha: 0, y: 68, filter: 'blur(8px)' }, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 1.15, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 88%', once: true } });
        });
        gsap.fromTo('.experience-track-progress', { scaleY: 0, transformOrigin: 'top' }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.experience-timeline', start: 'top 70%', end: 'bottom 58%', scrub: 0.6 } });
        gsap.utils.toArray<HTMLElement>('.journey-card, .project-case, .experience-item').forEach((element) => {
          gsap.fromTo(element, { y: 35, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: element, start: 'top 94%', once: true } });
        });
      }
    }, document.getElementById('page')!);
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [motionEnabled]);

  useEffect(() => {
    if (!motionEnabled) return;
    const handler = () => ScrollTrigger.refresh();
    window.addEventListener('load', handler);
    return () => window.removeEventListener('load', handler);
  }, [motionEnabled]);

  const navigate = useCallback((id: string) => {
    const section = document.getElementById(id);
    if (!section) return;
    const reduce = !motionEnabled;
    if (!reduce && lenisRef.current) lenisRef.current.scrollTo(section, { offset: id === 'home' ? 0 : -72, duration: 1.2 });
    else section.scrollIntoView({ behavior: 'auto', block: 'start' });
    window.history.replaceState(null, '', id === 'home' ? window.location.pathname : `#${id}`);
    setActiveSection(id);
  }, [motionEnabled]);

  const toggleMotion = () => setMotionEnabled(value => !value);

  return (
    <div className={`site-shell ${motionEnabled ? 'motion-enabled' : 'motion-disabled'}`} id="page">
      <SceneStage progress={progress} motionEnabled={motionEnabled} onReady={onReady}/>
      <div className="grain-layer" aria-hidden="true"/>
      <Navigation onNavigate={navigate} activeSection={activeSection} motionEnabled={motionEnabled} onToggleMotion={toggleMotion}/>
      <ScrollMarkers activeSection={activeSection} onNavigate={navigate}/>
      <main id="main"><Hero onNavigate={navigate}/><SignalMarquee/><About/><Projects motionEnabled={motionEnabled}/><Experience/><Skills/><Contact onNavigate={navigate}/></main>
      <div className="fixed-corner-meta" aria-hidden="true"><MousePointer2 size={13}/><span>INTERACTIVE / SCROLL TO EXPLORE</span><ArrowRight size={16}/></div>
      <Preloader ready={sceneReady}/>
    </div>
  );
}

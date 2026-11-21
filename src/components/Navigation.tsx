import { useState } from 'react';
import { ArrowDownToLine, Menu, X, Volume2, VolumeX } from 'lucide-react';
import { navigation, profile } from '../config/portfolio';

type Navigate = (id: string) => void;

export default function Navigation({ onNavigate, activeSection, motionEnabled, onToggleMotion }: { onNavigate: Navigate; activeSection: string; motionEnabled: boolean; onToggleMotion: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = (id: string) => { setMenuOpen(false); onNavigate(id); };
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-nav">
        <button type="button" className="brand-mark" onClick={() => navigate('home')} aria-label="Go to top"><span className="brand-glyph">N<span className="brand-dot">.</span></span><span className="brand-description">NISHANTH<br/>AI ENGINEER</span></button>
        <div className="nav-center"><span className="tiny-live-dot" /> <span>INDEPENDENT PORTFOLIO</span><span className="nav-center-rule">/</span><span>2026 EDITION</span></div>
        <nav className="desktop-nav" aria-label="Primary navigation">{navigation.map((item) => <a key={item.id} className={activeSection === item.id ? 'active' : ''} href={`#${item.id}`} onClick={(event) => { event.preventDefault(); navigate(item.id); }}>{item.label}</a>)}</nav>
        <div className="nav-controls"><button className="motion-toggle" type="button" onClick={onToggleMotion} title={motionEnabled ? 'Disable 3D motion' : 'Enable 3D motion'} aria-label={motionEnabled ? 'Disable animations' : 'Enable animations'}>{motionEnabled ? <Volume2 size={16}/> : <VolumeX size={16}/>}<span>{motionEnabled ? 'MOTION ON' : 'MOTION OFF'}</span></button><button className="menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X size={22}/> : <Menu size={22}/>}</button></div>
      </header>
      <div id="mobile-menu" className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <nav aria-label="Mobile navigation">{navigation.map((item, index) => <a href={`#${item.id}`} key={item.id} onClick={(event) => { event.preventDefault(); navigate(item.id); }}><small>0{index + 1}</small>{item.label}<span>↗</span></a>)}</nav>
        <a className="mobile-resume" href={profile.resume} target="_blank" rel="noopener noreferrer"><ArrowDownToLine size={17}/> VIEW RESUME</a>
      </div>
    </>
  );
}

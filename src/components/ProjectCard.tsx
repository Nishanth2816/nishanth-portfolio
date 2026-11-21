import { useMotionValue, useSpring, motion } from 'framer-motion';
import { ArrowUpRight, Code2, Mail } from 'lucide-react';
import type { PointerEvent } from 'react';
import { profile, type Project } from '../config/portfolio';
import ProjectVisual from './ProjectVisual';

export default function ProjectCard({ project, motionEnabled }: { project: Project; motionEnabled: boolean }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const tiltX = useSpring(x, { stiffness: 170, damping: 24 });
  const tiltY = useSpring(y, { stiffness: 170, damping: 24 });

  const handleMove = (event: PointerEvent<HTMLElement>) => {
    if (!motionEnabled || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    x.set(py * -4);
    y.set(px * 4);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <article id={project.slug} className={`project-case accent-${project.accent}`} aria-labelledby={`${project.slug}-title`}>
      <div className="project-case-index"><span>{project.number} / 04</span><span>{project.label}</span></div>
      <div className="project-layout">
        <div className="project-copy">
          <div className="project-symbol" aria-hidden="true">✳</div>
          <p className="eyebrow">{project.subtitle}</p>
          <h3 id={`${project.slug}-title`} data-reveal>{project.title}</h3>
          <div className="project-brief">
            <div><h4>01 / THE PROBLEM</h4><p>{project.problem}</p></div>
            <div><h4>02 / THE APPROACH</h4><p>{project.approach}</p></div>
            <div><h4>03 / THE OUTCOME</h4><p>{project.result}</p></div>
          </div>
          <div className="tech-chips">{project.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div>
          <div className="project-actions">
            {project.sourceUrl ? (
              <a className="text-action" href={project.sourceUrl} target="_blank" rel="noopener noreferrer"><Code2 size={16} /> PROJECT SOURCE <ArrowUpRight size={15} /></a>
            ) : (
              <a className="text-action" href={profile.github} target="_blank" rel="noopener noreferrer" title="Opens Nishanth's GitHub profile; project-specific source URL has not been verified"><Code2 size={16} /> GITHUB PROFILE <ArrowUpRight size={15} /></a>
            )}
            {project.demoUrl ? (
              <a className="text-action" href={project.demoUrl} target="_blank" rel="noopener noreferrer">LIVE DEMO <ArrowUpRight size={15}/></a>
            ) : (
              <a className="text-action" href={`mailto:${profile.email}?subject=${encodeURIComponent(`Demo request — ${project.title}`)}`}><Mail size={16} /> REQUEST A DEMO <ArrowUpRight size={15} /></a>
            )}
          </div>
        </div>
        <motion.div className="project-visual-shell" style={motionEnabled ? { rotateX: tiltX, rotateY: tiltY, transformPerspective: 1200 } : undefined} onPointerMove={handleMove} onPointerLeave={reset}>
          <div className="project-visual-frame"><div className="project-frame-corner left-top"/><div className="project-frame-corner right-bottom"/><ProjectVisual visual={project.visual} title={project.title}/></div>
          <div className="project-depth-shadow" aria-hidden="true" />
        </motion.div>
      </div>
    </article>
  );
}

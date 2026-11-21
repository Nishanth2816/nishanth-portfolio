import { useState } from 'react';
import { skillGroups } from '../config/portfolio';

export default function SkillConstellation() {
  const [selectedId, setSelectedId] = useState(skillGroups[0].id);
  const selected = skillGroups.find((group) => group.id === selectedId) ?? skillGroups[0];

  return (
    <div className="skill-deck">
      <div className="skill-orbit-area" aria-hidden="true">
        <div className="skill-orbit orbit-one" />
        <div className="skill-orbit orbit-two" />
        <div className="skill-orbit orbit-three" />
        <div className="skill-core"><div className="skill-core-inner"><span>AI</span><small>DATA SYSTEMS</small></div></div>
        <span className="skill-satellite sat-one">PY</span><span className="skill-satellite sat-two">SQL</span><span className="skill-satellite sat-three">ML</span><span className="skill-satellite sat-four">RAG</span>
        <span className="orbit-caption top">KNOWLEDGE NETWORK / 04 DOMAINS</span>
        <span className="orbit-caption bottom">SIGNAL TRANSMISSION: ACTIVE</span>
      </div>
      <div className="skills-interface">
        <p className="eyebrow">SELECT A DISCIPLINE / INTERACTIVE INDEX</p>
        <div className="skill-tabs" role="tablist" aria-label="Skill categories">
          {skillGroups.map((group, i) => (
            <button
              type="button"
              key={group.id}
              role="tab"
              id={`skill-tab-${group.id}`}
              aria-controls={`skill-panel-${group.id}`}
              aria-selected={selectedId === group.id}
              className={selectedId === group.id ? 'skill-tab active' : 'skill-tab'}
              onClick={() => setSelectedId(group.id)}
            >
              <span>0{i + 1}</span><strong>{group.name}</strong><span aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
        {skillGroups.map((group) => <div key={group.id} role="tabpanel" id={`skill-panel-${group.id}`} aria-labelledby={`skill-tab-${group.id}`} hidden={selectedId !== group.id} className="skill-panel">
          <p>{group.deck}</p>
          <div className="skill-pills">{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
        </div>)}
        <span className="skill-index-number">0{skillGroups.findIndex((group) => group.id === selected.id) + 1} / 04</span>
      </div>
    </div>
  );
}

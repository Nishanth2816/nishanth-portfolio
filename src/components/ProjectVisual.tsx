import type { Project } from '../config/portfolio';

function RetailVisual() {
  const bars = [42, 61, 54, 74, 53, 82, 76, 94, 68, 88, 92, 73];
  return (
    <div className="mock mock-retail">
      <div className="mock-top"><span className="mock-brand"><span className="status-led" /> NEURALRETAIL / INTELLIGENCE</span><span>ANALYTICS V1.0</span></div>
      <div className="mock-stats">
        <div><small>TRANSACTIONS</small><strong>1M+</strong></div>
        <div><small>CUSTOMERS</small><strong>5,878</strong></div>
        <div><small>SEGMENTS</small><strong>06</strong></div>
      </div>
      <div className="mock-chart-grid">
        <div className="mock-chart">
          <div className="mock-label-line"><span>TRANSACTION SIGNAL</span><span>↗</span></div>
          <div className="bar-stack">{bars.map((height, index) => <span key={index} style={{ height: `${height}%`, opacity: 0.43 + index / 25 }} />)}</div>
          <div className="mock-axis">JAN <span>JUN</span> DEC</div>
        </div>
        <div className="mock-donut-wrap"><div className="mock-donut"><span>6<small>COHORTS</small></span></div><small>CUSTOMER SEGMENTS</small></div>
      </div>
      <div className="mock-foot"><span>CHURN BASELINE</span><b>40.8%</b><span>MODEL MONITORING / ACTIVE</span></div>
    </div>
  );
}
function RAGVisual() {
  return (
    <div className="mock mock-rag">
      <div className="mock-top"><span className="mock-brand"><span className="status-led violet" /> CONTEXT ENGINE</span><span>RAG / 01</span></div>
      <div className="rag-conversation">
        <div className="rag-message user"><small>USER QUERY</small><p>What does this document say about the process?</p></div>
        <div className="rag-pipeline"><span>01 INGEST</span><i /> <span>02 EMBED</span><i /><span>03 RETRIEVE</span><i/><span>04 GENERATE</span></div>
        <div className="rag-message system"><small><span className="status-led violet" /> GROUNDED RESPONSE</small><p>The relevant passages are retrieved from your document and used to compose a contextual answer.</p><div className="rag-source">▥ SOURCE DOCUMENT / CONTEXT</div></div>
      </div>
      <div className="mock-foot"><span>FASTAPI PIPELINE</span><span>VECTOR SIMILARITY SEARCH</span></div>
    </div>
  );
}
function HostelVisual() {
  return (
    <div className="mock mock-hostel">
      <div className="mock-top"><span className="mock-brand"><span className="status-led teal" /> HOSTEL / OPERATIONS</span><span>DATA CONSOLE</span></div>
      <div className="hostel-header"><span>OPERATIONS OVERVIEW</span><span>SQL / PYTHON</span></div>
      <div className="hostel-metrics"><div><small>OCCUPANCY</small><strong>↗</strong><span>CAPACITY TRACKING</span></div><div><small>PAYMENTS</small><strong>◎</strong><span>RECORDS VIEW</span></div><div><small>REQUESTS</small><strong>⇄</strong><span>SERVICE LOGS</span></div></div>
      <div className="hostel-grid">{Array.from({ length: 32 }, (_, i) => <span key={i} className={i % 7 === 1 || i % 9 === 4 ? 'is-highlighted' : ''} />)}</div>
      <div className="mock-foot"><span>SQL DATA MODEL</span><span>KPI DASHBOARDS</span></div>
    </div>
  );
}
function CinemaVisual() {
  return (
    <div className="mock mock-cinema">
      <div className="mock-top"><span className="mock-brand"><span className="status-led" /> CINEMA / BOOKING API</span><span>DJANGO + SQL</span></div>
      <div className="cinema-visual"><div className="screen">SCREEN / A</div><div className="seat-grid">{Array.from({ length: 48 }, (_, i) => <span key={i} className={i === 13 || i === 14 || i === 21 ? 'selected' : i % 11 === 0 ? 'blocked' : ''} />)}</div></div>
      <div className="cinema-legend"><span><i className="free"/>AVAILABLE</span><span><i className="selected"/>SELECTED</span><span><i className="blocked"/>UNAVAILABLE</span></div>
      <div className="mock-foot"><span>JWT AUTH</span><span>REST API ENDPOINTS</span></div>
    </div>
  );
}

export default function ProjectVisual({ visual, title }: { visual: Project['visual']; title: string }) {
  return (
    <figure className="project-visual" aria-label={`Concept illustration for ${title}; not an actual product screenshot`}>
      {visual === 'retail' && <RetailVisual />}
      {visual === 'rag' && <RAGVisual />}
      {visual === 'hostel' && <HostelVisual />}
      {visual === 'cinema' && <CinemaVisual />}
      <figcaption>INTERFACE CONCEPT / ILLUSTRATIVE, NOT A PRODUCT SCREENSHOT</figcaption>
    </figure>
  );
}

/**
 * Portfolio content is intentionally centralized for safe migration from an existing site.
 * This first pass is grounded in two resumes supplied by Nishanth. Source/demo URLs were
 * NOT guessed; replace null with verified, project-specific URLs from the original repo.
 * All visual cards are illustrative interface studies, NOT claimed product screenshots.
 */
export const profile = {
  name: 'Lingampalli Nishanth',
  displayName: 'NISHANTH',
  role: 'AI ENGINEER / DATA PROFESSIONAL',
  location: 'Telangana, India',
  email: 'nishanthsunny07@gmail.com',
  github: 'https://github.com/Nishanth2816',
  linkedin: 'https://www.linkedin.com/in/lingampallinishanth',
  resume: '/Lingampalli_Nishanth_Resume.pdf',
  alternateResume: '/Lingampalli_Nishanth_Alternate_Resume.pdf',
  availability: 'OPEN TO OPPORTUNITIES',
};

export type Project = {
  number: string;
  slug: string;
  title: string;
  subtitle: string;
  label: string;
  accent: 'cyan' | 'violet' | 'teal' | 'blue';
  problem: string;
  approach: string;
  result: string;
  technologies: string[];
  sourceUrl: string | null;
  demoUrl: string | null;
  visual: 'retail' | 'rag' | 'hostel' | 'cinema';
};

export const projects: Project[] = [
  {
    number: '01',
    slug: 'neuralretail',
    title: 'NeuralRetail',
    subtitle: 'AI-POWERED RETAIL INTELLIGENCE',
    label: 'FEATURED / MACHINE LEARNING',
    accent: 'cyan',
    problem: 'Make a million-plus transactions actionable: understand customer value, surface churn risk, and forecast demand.',
    approach: 'Prepared UCI Online Retail II data; built RFM, temporal and rolling features; contributed to Logistic Regression churn scoring, K-Means segmentation, and Prophet forecasting. Used MLflow, FastAPI and Streamlit across the workflow.',
    result: 'Analyzed 1M+ transactions representing 5,878 customers after cleaning. Identified six customer segments and a 40.8% baseline churn rate; evaluated forecasting with RMSE, MAE and MAPE.',
    technologies: ['Python', 'Pandas', 'Scikit-learn', 'Prophet', 'MLflow', 'FastAPI', 'Streamlit', 'Docker'],
    sourceUrl: null,
    demoUrl: null,
    visual: 'retail',
  },
  {
    number: '02',
    slug: 'rag-chatbot',
    title: 'RAG-based AI Chatbot',
    subtitle: 'DOCUMENT INTELLIGENCE / LLM SYSTEMS',
    label: 'LANGUAGE MODELS / RETRIEVAL',
    accent: 'violet',
    problem: 'Help people ask natural-language questions about documents without relying solely on a model’s internal knowledge.',
    approach: 'Built a retrieval-augmented question-answering pipeline with OpenAI embeddings, vector similarity search, prompt templates and a FastAPI REST service.',
    result: 'Delivered document-grounded question answering through an API. No public benchmark or live demo was supplied, so performance metrics are intentionally omitted.',
    technologies: ['Python', 'FastAPI', 'OpenAI API', 'RAG', 'Embeddings', 'Vector Search'],
    sourceUrl: null,
    demoUrl: null,
    visual: 'rag',
  },
  {
    number: '03',
    slug: 'hostel-analytics',
    title: 'Hostel Operations Analytics',
    subtitle: 'DATA ENGINEERING / REPORTING',
    label: 'DATA / ANALYTICS',
    accent: 'teal',
    problem: 'Bring occupancy, payments and service requests together so day-to-day hostel operations can be reported clearly.',
    approach: 'Modeled records in SQL, used Python to work with operational data and built KPI dashboards for reporting.',
    result: 'Created a database-backed reporting workflow for occupancy, payments and service requests; quantitative business impact was not provided.',
    technologies: ['SQL', 'Python', 'Data Modeling', 'KPI Dashboards'],
    sourceUrl: null,
    demoUrl: null,
    visual: 'hostel',
  },
  {
    number: '04',
    slug: 'cinema-booking',
    title: 'Cinema Booking System',
    subtitle: 'BACKEND / API DEVELOPMENT',
    label: 'ENGINEERING / FULL STACK',
    accent: 'blue',
    problem: 'Coordinate booking data, user authentication and reservation flows through a structured backend.',
    approach: 'Developed a Django-based booking platform with JWT authentication, REST APIs and relational SQL data modeling.',
    result: 'Implemented core backend booking capabilities and authenticated API flows. No public deployment has been verified.',
    technologies: ['Python', 'Django', 'JWT', 'REST APIs', 'SQL'],
    sourceUrl: null,
    demoUrl: null,
    visual: 'cinema',
  },
];

export const experience = [
  {
    period: '2026',
    role: 'AI Model Evaluation Tasker',
    company: 'Handshake · Project SEAL',
    type: 'LLM RED-TEAMING · REMOTE',
    description: 'Designed research-heavy prompts with verified sources; tested models, documented failure modes and supported reproducible model evaluation.',
    tags: ['LLM Evaluation', 'Research', 'Red Teaming'],
  },
  {
    period: 'JUN — JUL 2026',
    role: 'Machine Learning & MLOps Intern',
    company: 'AMDOX Technologies',
    type: 'NEURALRETAIL · REMOTE',
    description: 'Engineered retail features, developed and evaluated churn and forecasting workflows, tracked experiments in MLflow and supported FastAPI / Streamlit delivery.',
    tags: ['Machine Learning', 'MLflow', 'FastAPI', 'Python'],
  },
  {
    period: '2022 — 2026',
    role: 'B.Tech · Metallurgical Engineering & Materials Science',
    company: 'Indian Institute of Technology Indore',
    type: 'EDUCATION · INDORE',
    description: 'An engineering foundation in analytical problem-solving, systems thinking and quantitative methods. Served as Head of the Indigenous Club (2024–2025).',
    tags: ['IIT Indore', 'Engineering', 'Leadership'],
  },
];

export const skillGroups = [
  {
    id: 'ai',
    name: 'AI / LLM SYSTEMS',
    deck: 'Building grounded and useful language model workflows.',
    skills: ['RAG', 'LLM Integration', 'Prompt Engineering', 'Embeddings', 'Vector Search', 'LangChain'],
  },
  {
    id: 'ml',
    name: 'MACHINE LEARNING',
    deck: 'Training, evaluating and explaining predictive systems.',
    skills: ['Scikit-learn', 'Feature Engineering', 'Classification', 'Model Evaluation', 'Prophet', 'SHAP', 'MLflow'],
  },
  {
    id: 'data',
    name: 'DATA / ANALYTICS',
    deck: 'Turning raw records into clean decisions.',
    skills: ['Python', 'SQL', 'Pandas', 'NumPy', 'Power BI', 'Data Pipelines', 'Streamlit'],
  },
  {
    id: 'systems',
    name: 'BACKEND / DELIVERY',
    deck: 'Making models and data available through practical services.',
    skills: ['FastAPI', 'Django', 'Flask', 'REST APIs', 'Docker', 'Docker Compose', 'Git / GitHub'],
  },
];

export const navigation = [
  { label: 'About', id: 'about' },
  { label: 'Projects', id: 'projects' },
  { label: 'Experience', id: 'experience' },
  { label: 'Skills', id: 'skills' },
  { label: 'Contact', id: 'contact' },
] as const;

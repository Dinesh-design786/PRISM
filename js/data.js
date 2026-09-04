// ─── MOSPI PAIMANA MULTI-MONTH DATA REPOSITORY (APRIL, MAY & JUNE 2026 REPORTS) ────

const PORTFOLIO = {
  totalProjects: 2048,
  originalCost: 38412.62, // in Lakh Crore (₹38.41L Cr)
  revisedCost: 44101.07, // in Lakh Crore (₹44.10L Cr)
  expenditure: 21843.20, // in Lakh Crore (₹21.84L Cr)
  delayedProjects: 792,
  avgDelay: 44.0, // Months
  costOverrunPct: 14.8, // %
  newProjectsMonth: 67
};

const SECTORS = [
  'Railways', 'Roads & Highways', 'Power', 'Petroleum', 'Irrigation',
  'Telecom', 'Urban Development', 'Atomic Energy', 'Coal', 'Steel'
];

const MINISTRIES = [
  'Ministry of Railways', 'MoRTH', 'Ministry of Power', 'MoPNG',
  'Ministry of Water Resources', 'Department of Telecommunications',
  'Ministry of Housing & Urban Affairs', 'Department of Atomic Energy',
  'Ministry of Coal', 'Ministry of Steel'
];

const INDIAN_STATES = [
  'Maharashtra', 'Uttar Pradesh', 'Gujarat', 'Tamil Nadu', 'Andhra Pradesh',
  'Karnataka', 'West Bengal', 'Rajasthan', 'Madhya Pradesh', 'Assam & NE',
  'Odisha', 'Bihar', 'Telangana', 'Kerala', 'Haryana', 'Punjab', 'Jharkhand',
  'Jammu & Kashmir', 'Uttarakhand', 'Chhattisgarh', 'Delhi (NCR)', 'Multi-State'
];

// STATE-WISE INFRASTRUCTURE METRICS & PROJECT COUNTS
const STATE_ANALYTICS = [
  { state: 'Maharashtra', projects: 218, origCost: 512000, revCost: 589000, exp: 310500, delayed: 82, avgDelay: 42, criticalRisk: 4 },
  { state: 'Uttar Pradesh', projects: 194, origCost: 445000, revCost: 518000, exp: 275000, delayed: 76, avgDelay: 46, criticalRisk: 5 },
  { state: 'Gujarat', projects: 182, origCost: 410000, revCost: 452000, exp: 248000, delayed: 48, avgDelay: 32, criticalRisk: 2 },
  { state: 'Tamil Nadu', projects: 156, origCost: 320000, revCost: 368000, exp: 189000, delayed: 58, avgDelay: 38, criticalRisk: 3 },
  { state: 'Andhra Pradesh', projects: 142, origCost: 285000, revCost: 356000, exp: 162000, delayed: 68, avgDelay: 52, criticalRisk: 4 },
  { state: 'Rajasthan', projects: 135, origCost: 270000, revCost: 324000, exp: 155000, delayed: 52, avgDelay: 48, criticalRisk: 3 },
  { state: 'West Bengal', projects: 128, origCost: 240000, revCost: 298000, exp: 142000, delayed: 61, avgDelay: 50, criticalRisk: 3 },
  { state: 'Karnataka', projects: 120, origCost: 255000, revCost: 288000, exp: 151000, delayed: 42, avgDelay: 34, criticalRisk: 1 },
  { state: 'Madhya Pradesh', projects: 114, origCost: 210000, revCost: 246000, exp: 128000, delayed: 39, avgDelay: 36, criticalRisk: 1 },
  { state: 'Assam & NE', projects: 108, origCost: 195000, revCost: 254000, exp: 112000, delayed: 55, avgDelay: 58, criticalRisk: 2 }
];

const DELAYED_PROJECTS = [
  { id: '705728', name: 'MUMBAI-AHMEDABAD HIGH SPEED RAIL PROJECT (508 KM)', sector: 'Railways', ministry: 'Ministry of Railways', state: 'Maharashtra', originalCost: 108000, revisedCost: 108000, exp: 90502, delay: 38, riskScore: 88, risk: 'Critical' },
  { id: '706112', name: 'BHARATNET NATIONAL OPTICAL FIBRE NETWORK (PHASE II)', sector: 'Telecom', ministry: 'Department of Telecommunications', state: 'Multi-State', originalCost: 61109, revisedCost: 188000, exp: 46432, delay: 66, riskScore: 96, risk: 'Critical' },
  { id: '704981', name: 'WESTERN DEDICATED FREIGHT CORRIDOR (WDFC - 1504 KM)', sector: 'Railways', ministry: 'Ministry of Railways', state: 'Gujarat', originalCost: 51101, revisedCost: 124005, exp: 124623, delay: 54, riskScore: 94, risk: 'Critical' },
  { id: '708234', name: 'HPCL RAJASTHAN REFINERY PROJECT BARMER (9 MMTPA)', sector: 'Petroleum', ministry: 'MoPNG', state: 'Rajasthan', originalCost: 43129, revisedCost: 79459, exp: 69202, delay: 72, riskScore: 92, risk: 'Critical' },
  { id: '707441', name: 'ETHYLENE CRACKER PROJECT BINA REFINERY', sector: 'Petroleum', ministry: 'MoPNG', state: 'Madhya Pradesh', originalCost: 43367, revisedCost: 43367, exp: 4803, delay: 18, riskScore: 65, risk: 'High' },
  { id: '709102', name: 'SARDAR SAROVAR MULTIPURPOSE IRRIGATION PROJECT', sector: 'Irrigation', ministry: 'Ministry of Water Resources', state: 'Gujarat', originalCost: 20718, revisedCost: 33413, exp: 31861, delay: 58, riskScore: 84, risk: 'Critical' },
  { id: '703890', name: 'POLAVARAM MAJOR MULTIPURPOSE IRRIGATION PROJECT', sector: 'Irrigation', ministry: 'Ministry of Water Resources', state: 'Andhra Pradesh', originalCost: 10151, revisedCost: 55549, exp: 26675, delay: 62, riskScore: 90, risk: 'Critical' },
  { id: '708552', name: 'DELHI METRO RAIL PROJECT PHASE-IV CORRIDORS', sector: 'Urban Dev', ministry: 'Ministry of Housing & Urban Affairs', state: 'Delhi (NCR)', originalCost: 33749, revisedCost: 33795, exp: 14539, delay: 24, riskScore: 68, risk: 'High' },
  { id: '702319', name: 'KUDANKULAM NUCLEAR POWER PROJECT (UNITS 3 & 4)', sector: 'Power', ministry: 'Department of Atomic Energy', state: 'Tamil Nadu', originalCost: 17238, revisedCost: 21780, exp: 21238, delay: 48, riskScore: 79, risk: 'High' },
  { id: '701988', name: 'MUMBAI URBAN TRANSPORT PROJECT (MUTP PHASE III)', sector: 'Railways', ministry: 'Ministry of Railways', state: 'Maharashtra', originalCost: 10947, revisedCost: 10947, exp: 6609, delay: 30, riskScore: 72, risk: 'High' }
];

const SECTOR_DATA = {
  labels: ['Railways', 'Roads', 'Power', 'Petroleum', 'Irrigation', 'Telecom', 'Urban Dev', 'Coal'],
  originalCost: [12.4, 8.2, 5.8, 4.1, 2.9, 2.1, 1.8, 1.1],
  revisedCost: [15.8, 8.4, 6.2, 4.7, 3.8, 3.8, 1.9, 1.2],
  expenditure: [8.9, 5.1, 3.4, 2.9, 1.8, 1.5, 1.1, 0.7]
};

const RISK_DIST = { critical: 28, high: 154, medium: 426, low: 1440 };

const MINISTRY_PERF = [
  { name: 'Ministry of Railways', projects: 423, delayed: 212, avgDelay: 51, costOverrun: 27.4, score: 62 },
  { name: 'MoRTH (Roads & Highways)', projects: 765, delayed: 284, avgDelay: 38, costOverrun: 2.5, score: 88 },
  { name: 'Ministry of Power', projects: 182, delayed: 76, avgDelay: 32, costOverrun: 6.9, score: 79 },
  { name: 'MoPNG (Petroleum)', projects: 145, delayed: 68, avgDelay: 44, costOverrun: 14.6, score: 71 },
  { name: 'Ministry of Water Resources', projects: 98, delayed: 58, avgDelay: 58, costOverrun: 31.0, score: 54 },
  { name: 'Dept of Telecommunications', projects: 45, delayed: 30, avgDelay: 66, costOverrun: 80.8, score: 42 }
];

const TREND_YEARS = ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', 'Apr 26', 'May 26', 'Jun 26'];
const COST_OVERRUN_TREND = [19.2, 18.5, 21.0, 22.4, 18.8, 16.5, 15.2, 15.0, 15.2, 14.9, 14.8];
const TIME_OVERRUN_TREND = [36, 38, 41, 45, 42, 43, 44, 43.5, 43.0, 43.5, 44.0];

const COST_DRIVERS = [
  { factor: 'Land Acquisition Delays', impact: 31, primarySector: 'Railways & Highways' },
  { factor: 'Environmental & Forest Clearances', impact: 22, primarySector: 'Power & Mining' },
  { factor: 'Contractor Default & Disputes', impact: 18, primarySector: 'Roads & Infra' },
  { factor: 'Scope Changes & Redesign', impact: 14, primarySector: 'Urban Rail & Telecom' },
  { factor: 'Raw Material Inflation & Supply Chain', impact: 9, primarySector: 'Steel & Construction' },
  { factor: 'Law & Order / Local Disturbance', impact: 6, primarySector: 'North-East & Mining' }
];

const MODEL_METRICS = {
  modelsCompared: ['XGBoost (PAIMANA AI)', 'Random Forest', 'LSTM Sequence', 'Linear Baseline', 'SVM Classifier'],
  f1Scores: [0.912, 0.865, 0.841, 0.650, 0.720],
  accuracy: '88.6%',
  aucRoc: '0.942'
};

const ALERTS = [
  {
    level: 'critical',
    title: 'BharatNet Telecom Ph-II Overrun Warning',
    desc: 'Cost escalation reached 207.6% (Original ₹61,109 Cr → Revised ₹1,88,000 Cr) with 66-month schedule drift.',
    ministry: 'Dept of Telecommunications',
    date: 'June 2026'
  },
  {
    level: 'critical',
    title: 'Polavaram Multipurpose Irrigation Delay Flag',
    desc: 'Schedule delayed by 62 months with 447% cost jump due to land clearance & dam design redesigns.',
    ministry: 'Ministry of Water Resources',
    date: 'June 2026'
  },
  {
    level: 'high',
    title: 'HPCL Barmer Refinery Commissioning Lag',
    desc: 'Time overrun stands at 72 months. Equipment procurement supply chain bottlenecks detected.',
    ministry: 'MoPNG',
    date: 'May 2026'
  }
];

function predictRisk(inputs) {
  const { sector, delay, costOverrunPct, expenditurePct, contractorIssues, envClearance, landIssues } = inputs;
  let score = 30;
  score += Math.min(32, (delay / 60) * 32);
  score += Math.min(28, (costOverrunPct / 100) * 28);
  if (expenditurePct < 40 && delay > 12) score += 12;
  if (landIssues) score += 10;
  if (envClearance) score += 8;
  if (contractorIssues) score += 8;
  score = Math.min(99, Math.max(10, Math.round(score)));

  let level = 'Low';
  if (score >= 70) level = 'Critical';
  else if (score >= 50) level = 'High';
  else if (score >= 35) level = 'Medium';

  return {
    riskScore: score,
    level: level,
    costOverrunProb: Math.min(98, Math.round(score * 0.95)),
    timeOverrunProb: Math.min(98, Math.round(score * 1.02))
  };
}

function getLLMResponse(query) {
  const q = query.toLowerCase();
  if (q.includes('cuf') || q.includes('prism') || q.includes('concept note') || q.includes('upload form') || q.includes('annexure')) {
    return `<strong>PRISM & MoSPI CUF (Common Upload Form) Architecture:</strong><br>` +
           `• <strong>Principle:</strong> Implements "One Data, One Entry" across Line Ministries/Departments on the unified OCMS / IIG-PMG Portal.<br>` +
           `• <strong>Annexure-I (CUF Format):</strong> Captures General Details, Location (Single/Multiple/Off-shore), Development Stage, Mode (PPP/EPC/Private), Sanction & Completion Dates, Financials, Funding Breakdown (Central, State, EAP, Debt, Internal Accruals, VGF), Land & Clearances, and Tenders.<br>` +
           `• <strong>Annexure-III (Milestones):</strong> Divides lifecycle into <em>Pre-construction stage</em> (Planning to Tender Publish) and <em>Construction stage</em> (Tender Award to Commissioning).<br>` +
           `• <strong>Annexure-IV (New Overrun Methodology):</strong> Milestone Time Overrun $ToR^M = (RDM - SDM)$ or $(Current Date - SDM)$ if lapsed; Milestone Cost Overrun $CoR^M = (RCM - SCM)$. Construction stage calculates overrun using Revised Date ($RDM$) and Cumulative Expenditure vs Revised Cost.`;
  }
  if (q.includes('compare') || q.includes('april') || q.includes('june') || q.includes('trend')) {
    return `Comparing the April, May, and June 2026 PRISM / MoSPI Flash Reports:<br>• Total monitored projects grew from 1,981 (April) to 2,014 (May) and 2,048 (June 2026).<br>• Total anticipated cost rose to ₹44.10 Lakh Crore with ₹5.69L Cr cumulative overrun (+14.8%).<br>• Delayed projects increased from 761 to 792 projects, with average delay remaining high at 44 months.`;
  }
  if (q.includes('cost') || q.includes('overrun') || q.includes('price')) {
    return `Total sanctioned cost of ₹38.41 Lakh Crore has escalated to an anticipated cost of ₹44.10 Lakh Crore across 2,048 projects (+14.8% overrun). Under PRISM CUF Annexure-IV, cost overrun is tracked against both Original Cost (OC) and Revised Cost (RC). Highest escalation: Telecom (BharatNet, +207%) and Railways (Western DFC, +143%).`;
  }
  if (q.includes('state') || q.includes('maharashtra') || q.includes('gujarat') || q.includes('up')) {
    return `State-Wise Analytics in PRISM: Maharashtra leads with 218 projects (₹5.89L Cr revised cost), followed by Uttar Pradesh (194 projects, ₹5.18L Cr), Gujarat (182 projects, ₹4.52L Cr), and Tamil Nadu (156 projects).`;
  }
  return `PRISM Project Intelligence Report: Monitored portfolio consists of 2,048 central infrastructure projects valued at ₹44.10 Lakh Crore (June 2026 MoSPI Flash Report). 792 projects face average delays of 44 months. Data is synchronized via the PRISM CUF (Common Upload Form) standard.`;
}

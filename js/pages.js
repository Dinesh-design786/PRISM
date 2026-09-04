// ─── DYNAMIC PAGE RENDERERS WITH STATE-WISE ANALYTICS ─────────────────────

function renderDashboardPage() {
  return `
    <div class="page-header fade-in" style="margin-bottom:24px;">
      <div class="page-title" style="font-size:28px;font-weight:900;letter-spacing:0.4px;">Executive Project Monitoring Dashboard</div>
      <div class="page-subtitle" style="font-size:15px;margin-top:5px;color:var(--text2);">Multi-month comparative analytics of ${PORTFOLIO.totalProjects.toLocaleString()} central sector infrastructure projects (MoSPI PAIMANA Flash Reports)</div>
    </div>

    <!-- STAT CARDS -->
    <div class="stats-grid fade-in">
      <div class="stat-card s1">
        <div class="stat-label">Monitored Portfolio</div>
        <div class="stat-value" id="statTotalProjects">${PORTFOLIO.totalProjects.toLocaleString()}</div>
        <div class="stat-sub">Across 17 Ministries & 36 States/UTs</div>
        <div class="stat-delta up">+${PORTFOLIO.newProjectsMonth} New</div>
      </div>
      <div class="stat-card s2">
        <div class="stat-label">Original Sanctioned</div>
        <div class="stat-value">₹${PORTFOLIO.originalCost}L Cr</div>
        <div class="stat-sub">Approved Initial Budget</div>
      </div>
      <div class="stat-card s3">
        <div class="stat-label">Anticipated Cost</div>
        <div class="stat-value" id="statRevisedCost">₹${PORTFOLIO.revisedCost}L Cr</div>
        <div class="stat-sub">Overrun: ₹${(PORTFOLIO.revisedCost - PORTFOLIO.originalCost).toFixed(2)}L Cr (${PORTFOLIO.costOverrunPct}%)</div>
        <div class="stat-delta up">${PORTFOLIO.costOverrunPct}% Escalation</div>
      </div>
      <div class="stat-card s4">
        <div class="stat-label">Delayed Projects</div>
        <div class="stat-value">${PORTFOLIO.delayedProjects}</div>
        <div class="stat-sub">Avg Time Overrun: ${PORTFOLIO.avgDelay} Months</div>
        <div class="stat-delta up">38.6% Delayed</div>
      </div>
      <div class="stat-card s5">
        <div class="stat-label">Cumulative Expenditure</div>
        <div class="stat-value" id="statExpenditure">₹${PORTFOLIO.expenditure}L Cr</div>
        <div class="stat-sub">Spent on Infrastructure</div>
      </div>
      <div class="stat-card s6">
        <div class="stat-label">High / Critical Risk</div>
        <div class="stat-value" id="statCriticalRisk">${RISK_DIST.critical + RISK_DIST.high}</div>
        <div class="stat-sub">PAIMANA AI ML Warnings</div>
        <div class="stat-delta up">${RISK_DIST.critical} Critical</div>
      </div>
    </div>

    <!-- MAIN CHARTS -->
    <div class="grid-2-3 fade-in">
      <div class="card">
        <div class="card-header">
          <div class="card-title">
            <div class="card-icon primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>
            </div>
            Sector-Wise Approved Cost vs Revised Cost vs Expenditure (₹ Lakh Crore)
          </div>
        </div>
        <div class="chart-wrap"><canvas id="chartSectorBar"></canvas></div>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-title">
            <div class="card-icon red">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 03-3.42 0z"/></svg>
            </div>
            AI Risk Level Distribution
          </div>
        </div>
        <div class="chart-wrap"><canvas id="chartRiskDoughnut"></canvas></div>
      </div>
    </div>

    <div class="grid-2 fade-in">
      <div class="card">
        <div class="card-header">
          <div class="card-title">
            <div class="card-icon amber">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            </div>
            Multi-Year & Multi-Month Overrun Trajectory (2018 - June 2026)
          </div>
        </div>
        <div class="chart-wrap"><canvas id="chartOverrunTrend"></canvas></div>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-title">
            <div class="card-icon cyan">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            Monthly Cumulative Expenditure Trajectory vs Targets
          </div>
        </div>
        <div class="chart-wrap"><canvas id="chartExpenditureLine"></canvas></div>
      </div>
    </div>
  `;
}

function renderProjectsPage() {
  const rows = DELAYED_PROJECTS.map(p => `
    <tr>
      <td><span style="font-family:var(--mono);font-weight:600;color:var(--cyan-light);">${p.id}</span></td>
      <td><strong>${p.name}</strong><br><span style="font-size:10px;color:var(--text3);">${p.sector} · ${p.ministry} · 📍 ${p.state || 'Multi-State'}</span></td>
      <td>₹${p.originalCost.toLocaleString()} Cr</td>
      <td>₹${p.revisedCost.toLocaleString()} Cr <span style="color:var(--red-light);font-size:10px;">(+${Math.round(((p.revisedCost-p.originalCost)/p.originalCost)*100)}%)</span></td>
      <td>₹${p.exp.toLocaleString()} Cr (${Math.round((p.exp/p.originalCost)*100)}%)</td>
      <td><span style="color:var(--amber-light);font-weight:600;">+${p.delay} mo</span></td>
      <td><span class="risk-badge ${p.risk.toLowerCase()}">${p.riskScore} / 100 (${p.risk})</span></td>
      <td>
        <button class="filter-btn" style="padding:4px 8px;font-size:10px;" onclick="analyzeProject('${p.id}')">AI Audit</button>
      </td>
    </tr>
  `).join('');

  return `
    <div class="page-header fade-in">
      <div class="page-title">PRISM Infrastructure Project Registry</div>
      <div class="page-subtitle">Search, filter, and audit central sector infrastructure projects from official MoSPI Flash Reports</div>
    </div>

    <!-- EFFICIENT PRESET FILTER PILLS -->
    <div class="filter-pills-wrap fade-in">
      <button class="filter-pill active" data-preset="all" onclick="setFilterPreset('all')">All Monitored Projects (${PORTFOLIO.totalProjects})</button>
      <button class="filter-pill" data-preset="critical" onclick="setFilterPreset('critical')">🚨 Critical Risk Flags (${RISK_DIST.critical})</button>
      <button class="filter-pill" data-preset="delay" onclick="setFilterPreset('delay')">⏱️ Extended Delay (&ge; 24 Mo)</button>
      <button class="filter-pill" data-preset="cost" onclick="setFilterPreset('cost')">📈 High Overrun (&ge; 20%)</button>
      <button class="filter-pill" data-preset="multistate" onclick="setFilterPreset('multistate')">📍 Multi-State Infrastructure</button>
    </div>

    <div class="filter-bar fade-in">
      <input type="text" class="search-input" id="projectSearch" style="flex:1;min-width:240px;" placeholder="Fast search project ID, name, sector, ministry, state... (Ctrl+K)" oninput="filterProjectTable()" />
      <select class="filter-select" id="sectorFilter" onchange="filterProjectTable()">
        <option value="">All Sectors</option>
        ${SECTORS.map(s => `<option value="${s}">${s}</option>`).join('')}
      </select>
      <select class="filter-select" id="stateFilter" onchange="filterProjectTable()">
        <option value="">All States & UTs</option>
        ${INDIAN_STATES.map(st => `<option value="${st}">${st}</option>`).join('')}
      </select>
      <select class="filter-select" id="riskFilter" onchange="filterProjectTable()">
        <option value="">All Risk Levels</option>
        <option value="Critical">Critical</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
    </div>

    <div class="card fade-in">
      <div class="table-wrap">
        <table id="projectsTable">
          <thead>
            <tr>
              <th class="sort-header" onclick="sortProjectTable('id')">Project ID <span class="sort-indicator">↕</span></th>
              <th class="sort-header" onclick="sortProjectTable('name')">Project Name, Sector & State <span class="sort-indicator">↕</span></th>
              <th class="sort-header" onclick="sortProjectTable('originalCost')">Original Cost <span class="sort-indicator">↕</span></th>
              <th class="sort-header" onclick="sortProjectTable('revisedCost')">Revised Cost <span class="sort-indicator">↕</span></th>
              <th class="sort-header" onclick="sortProjectTable('exp')">Expenditure <span class="sort-indicator">↕</span></th>
              <th class="sort-header" onclick="sortProjectTable('delay')">Delay <span class="sort-indicator">↕</span></th>
              <th class="sort-header" onclick="sortProjectTable('riskScore')">AI Risk Score <span class="sort-indicator">↕</span></th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>
  `;
}

// ─── NEW FEATURE: STATE-WISE ANALYTICS & REPORTS MODULE ──────────────────
function renderStateReportsPage() {
  const stateRows = STATE_ANALYTICS.map((s, idx) => {
    const variance = s.revCost - s.origCost;
    const variancePct = Math.round((variance / s.origCost) * 100);
    return `
      <tr>
        <td>${idx + 1}</td>
        <td><strong>📍 ${s.state}</strong></td>
        <td><span style="font-weight:700;color:var(--cyan-light);">${s.projects}</span> Projects</td>
        <td>₹${(s.origCost / 100).toLocaleString()} Cr</td>
        <td>₹${(s.revCost / 100).toLocaleString()} Cr</td>
        <td style="color:${variance > 0 ? 'var(--amber-light)' : 'var(--green-light)'};font-weight:700;">
          +₹${(variance / 100).toLocaleString()} Cr (+${variancePct}%)
        </td>
        <td>₹${(s.exp / 100).toLocaleString()} Cr</td>
        <td><span style="color:var(--red-light);font-weight:700;">${s.delayed}</span> / ${s.projects}</td>
        <td>${s.avgDelay} Months</td>
        <td><span class="risk-badge ${s.criticalRisk > 2 ? 'critical' : 'high'}">${s.criticalRisk} Critical</span></td>
      </tr>
    `;
  }).join('');

  return `
    <div class="page-header fade-in">
      <div class="page-title">State-Wise Infrastructure Analytics & Monitoring Report</div>
      <div class="page-subtitle">Geographic distribution of project allocations, expenditure velocity, and delays across Indian States & UTs</div>
    </div>

    <!-- STATE HIGHLIGHT CHIPS -->
    <div class="stats-grid fade-in">
      <div class="stat-card s1">
        <div class="stat-label">Top State Portfolio</div>
        <div class="stat-value">Maharashtra</div>
        <div class="stat-sub">218 Projects (₹5,890 Cr Revised)</div>
      </div>
      <div class="stat-card s2">
        <div class="stat-label">Highest Infrastructure Spend</div>
        <div class="stat-value">Uttar Pradesh</div>
        <div class="stat-sub">₹2,750 Cr Disbursed (194 Projs)</div>
      </div>
      <div class="stat-card s3">
        <div class="stat-label">Lowest Delay State</div>
        <div class="stat-value">Gujarat</div>
        <div class="stat-sub">Avg 32 Months Schedule Drift</div>
      </div>
      <div class="stat-card s6">
        <div class="stat-label">Total States Covered</div>
        <div class="stat-value">36 States/UTs</div>
        <div class="stat-sub">PM GatiShakti Geo-Layers</div>
      </div>
    </div>

    <!-- STATE BAR CHART -->
    <div class="card fade-in" style="margin-bottom:26px;">
      <div class="card-header">
        <div class="card-title">
          <div class="card-icon cyan">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
          </div>
          State-Wise Monitored Projects Count vs Revised Cost Allocation (₹ Cr)
        </div>
      </div>
      <div class="chart-wrap"><canvas id="chartStateBar"></canvas></div>
    </div>

    <!-- STATE BREAKDOWN TABLE -->
    <div class="card fade-in">
      <div class="card-header">
        <div class="card-title">
          <div class="card-icon primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
          </div>
          State & Union Territory Comprehensive Infrastructure Report
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>State / UT</th>
              <th>Monitored Projects</th>
              <th>Original Budget</th>
              <th>Revised Cost</th>
              <th>Cost Overrun</th>
              <th>Expenditure</th>
              <th>Delayed Projects</th>
              <th>Avg Delay</th>
              <th>AI Critical Flags</th>
            </tr>
          </thead>
          <tbody>${stateRows}</tbody>
        </table>
      </div>
    </div>
  `;
}

// ─── ADD PROJECT & LOG EXPENDITURE ENTRY (PRISM CUF COMMON UPLOAD FORM FORMAT) ───
function renderAddProjectPage() {
  const projectOptions = DELAYED_PROJECTS.map(p => `<option value="${p.id}">${p.id} - ${p.name} (Original ₹${p.originalCost} Cr)</option>`).join('');
  const stateOptions = INDIAN_STATES.map(s => `<option value="${s}">${s}</option>`).join('');

  return `
    <div class="page-header fade-in">
      <div class="page-title">PRISM — MoSPI Common Upload Form (CUF) & Milestone Tracker</div>
      <div class="page-subtitle">Standardized Data Entry & Milestone Overrun Tracking aligned with MoSPI Office Memorandum (F.No. 12011/08/2023-IPMD dated 03.09.2024)</div>
    </div>

    <!-- CUF POLICY COMPLIANCE BANNER -->
    <div class="insight-chip fade-in" style="background:rgba(99,102,241,0.08);border-color:rgba(99,102,241,0.25);margin-bottom:24px;">
      <div class="chip-icon">📄</div>
      <div class="chip-text">
        <strong>Principle of "One Data, One Entry":</strong> Data captured via this PRISM CUF interface synchronizes across Line Ministries, OCMS, India Investment Grid (IIG), and PMG portals. Includes milestone-based pre-construction & construction stage time/cost overrun tracking (Annexure I - V).
      </div>
    </div>

    <!-- MAIN GRID CONTAINER -->
    <div class="grid-2 fade-in">
      <!-- FORM 1: COMMON UPLOAD FORM (CUF - ANNEXURE I & II) -->
      <div class="card" style="grid-column:1/-1;">
        <div class="card-header" style="border-bottom:1px solid rgba(103,232,249,0.2);padding-bottom:12px;margin-bottom:16px;">
          <div class="card-title">
            <div class="card-icon primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
            </div>
            PRISM CUF (Common Upload Form) Data Entry System (Annexure-I)
          </div>
        </div>

        <form class="pred-form" id="addNewProjectForm" onsubmit="handleAddNewProject(event)">
          <!-- STEP HEADER TABS preview -->
          <div style="grid-column:1/-1;display:flex;gap:10px;background:rgba(6,21,45,0.6);padding:10px;border-radius:10px;border:1px solid var(--glass-border);margin-bottom:15px;overflow-x:auto;">
            <div style="padding:6px 12px;border-radius:6px;background:var(--primary);color:#fff;font-size:11px;font-weight:700;">1. Basic Info & Location</div>
            <div style="padding:6px 12px;border-radius:6px;background:rgba(255,255,255,0.05);color:var(--text2);font-size:11px;">2. Financials & Funding</div>
            <div style="padding:6px 12px;border-radius:6px;background:rgba(255,255,255,0.05);color:var(--text2);font-size:11px;">3. Pre/Post Milestones</div>
            <div style="padding:6px 12px;border-radius:6px;background:rgba(255,255,255,0.05);color:var(--text2);font-size:11px;">4. Clearances & Tenders</div>
          </div>

          <!-- SECTION 1: GENERAL & LOCATION DETAILS -->
          <div style="grid-column:1/-1;font-size:12px;font-weight:700;color:var(--cyan-light);text-transform:uppercase;letter-spacing:1px;margin-top:5px;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:5px;">
            General Details & Project Location
          </div>

          <div class="form-group">
            <label class="form-label">Project ID / OCMS Code *</label>
            <input type="text" class="form-input" id="newProjId" placeholder="e.g. 709999" required />
          </div>
          <div class="form-group">
            <label class="form-label">Project Name *</label>
            <input type="text" class="form-input" id="newProjName" placeholder="e.g. Varanasi Smart Multi-Modal Logistics Hub" required />
          </div>
          <div class="form-group">
            <label class="form-label">Sector *</label>
            <select class="form-select" id="newProjSector">
              ${SECTORS.map(s => `<option value="${s}">${s}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Implementing Line Ministry *</label>
            <select class="form-select" id="newProjMinistry">
              ${MINISTRIES.map(m => `<option value="${m}">${m}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">State / UT Location *</label>
            <select class="form-select" id="newProjState">
              ${stateOptions}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Project Classification *</label>
            <select class="form-select" id="cufClassification">
              <option value="Greenfield">Greenfield Project</option>
              <option value="Brownfield">Brownfield Expansion</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">PM GatiShakti Portal Integrated? *</label>
            <select class="form-select" id="cufGatiShakti">
              <option value="Yes">Yes — Registered on NMP Layer</option>
              <option value="No">No — Standalone Project</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Mode of Implementation *</label>
            <select class="form-select" id="cufMode">
              <option value="EPC">EPC (Engineering Proc. Const.)</option>
              <option value="PPP">PPP (Public Private Partnership)</option>
              <option value="Pure Private">Pure Private</option>
              <option value="To Be Finalized">To Be Finalized</option>
            </select>
          </div>

          <!-- SECTION 2: FINANCIAL & FUNDING DETAILS (ANNEXURE-II) -->
          <div style="grid-column:1/-1;font-size:12px;font-weight:700;color:var(--cyan-light);text-transform:uppercase;letter-spacing:1px;margin-top:15px;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:5px;">
            Financial & Multi-Source Funding Details (INR Crores)
          </div>

          <div class="form-group">
            <label class="form-label">Original Sanctioned Cost (OC) (₹ Cr) *</label>
            <input type="number" class="form-input" id="newProjOriginalCost" value="1500" min="150" required />
          </div>
          <div class="form-group">
            <label class="form-label">Revised / Anticipated Cost (RC) (₹ Cr) *</label>
            <input type="number" class="form-input" id="newProjRevisedCost" value="1650" min="150" required />
          </div>
          <div class="form-group">
            <label class="form-label">Pre-NIP Period Cost Incurred (Prior FY19-20) (₹ Cr)</label>
            <input type="number" class="form-input" id="cufPreNipCost" value="0" min="0" />
          </div>
          <div class="form-group">
            <label class="form-label">Land Cost Value (Included in Cost) (₹ Cr)</label>
            <input type="number" class="form-input" id="cufLandCost" value="180" min="0" />
          </div>
          <div class="form-group">
            <label class="form-label">Central Budgetary Support (₹ Cr)</label>
            <input type="number" class="form-input" id="cufCentralSupport" value="1000" min="0" />
          </div>
          <div class="form-group">
            <label class="form-label">State Budgetary Support (₹ Cr)</label>
            <input type="number" class="form-input" id="cufStateSupport" value="200" min="0" />
          </div>
          <div class="form-group">
            <label class="form-label">Externally Aided Project (EAP) / Multilateral Aid (₹ Cr)</label>
            <input type="number" class="form-input" id="cufEapAid" value="300" min="0" />
          </div>
          <div class="form-group">
            <label class="form-label">Debt / Loan Finance Support (₹ Cr)</label>
            <input type="number" class="form-input" id="cufDebtSupport" value="0" min="0" />
          </div>

          <!-- SECTION 3: MILESTONE TRACKER (ANNEXURE-III & IV) -->
          <div style="grid-column:1/-1;font-size:12px;font-weight:700;color:var(--cyan-light);text-transform:uppercase;letter-spacing:1px;margin-top:15px;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:5px;">
            Pre-Construction & Construction Milestone Phasing (Annexure-III & IV)
          </div>

          <div class="form-group">
            <label class="form-label">Date of Sanction / Approval (SDM Start)</label>
            <input type="date" class="form-input" id="cufSanctionDate" value="2023-01-15" />
          </div>
          <div class="form-group">
            <label class="form-label">Original Completion Date (SDM Finish)</label>
            <input type="date" class="form-input" id="cufOriginalDate" value="2026-12-31" />
          </div>
          <div class="form-group">
            <label class="form-label">Revised Completion Date (RDM Finish)</label>
            <input type="date" class="form-input" id="cufRevisedDate" value="2027-06-30" />
          </div>
          <div class="form-group">
            <label class="form-label">Initial Delay Drift (Months)</label>
            <input type="number" class="form-input" id="newProjDelay" value="6" min="0" required />
          </div>
          <div class="form-group" style="grid-column:1/-1;">
            <label class="form-label">Cumulative Expenditure Spent to Date (₹ Cr) *</label>
            <input type="number" class="form-input" id="newProjExp" value="350" min="0" required />
          </div>

          <button type="submit" class="form-submit" style="grid-column:1/-1;margin-top:10px;background:linear-gradient(135deg,var(--primary),var(--cyan));font-size:14px;padding:14px;">
            Submit PRISM CUF Form & Execute AI Overrun Inference Engine
          </button>
        </form>
      </div>

      <!-- FORM 2: EXPENDITURE LOGGER & MILESTONE OVERRUN CALCULATOR (ANNEXURE-IV & V) -->
      <div class="card" style="grid-column:1/-1;">
        <div class="card-header" style="border-bottom:1px solid rgba(103,232,249,0.2);padding-bottom:12px;margin-bottom:16px;">
          <div class="card-title">
            <div class="card-icon cyan">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            PRISM Expenditure Logger & Milestone-based Overrun Calculator (Annexure-IV Formulas)
          </div>
        </div>

        <form class="pred-form" id="logExpenditureForm" onsubmit="handleLogExpenditure(event)">
          <div class="form-group" style="grid-column:1/-1;">
            <label class="form-label">Select Monitored Project</label>
            <select class="form-select" id="logProjSelect" required>
              ${projectOptions}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Expenditure Reporting Date</label>
            <input type="date" class="form-input" id="logDate" value="2026-06-30" required />
          </div>
          <div class="form-group">
            <label class="form-label">Incremental Expenditure Added (₹ Cr)</label>
            <input type="number" class="form-input" id="logAmount" value="250" min="1" required />
          </div>
          <div class="form-group">
            <label class="form-label">Updated Time Overrun (Months)</label>
            <input type="number" class="form-input" id="logDelayUpdate" value="18" min="0" required />
          </div>
          <div class="form-group">
            <label class="form-label">Updated Revised Cost (RC) (₹ Cr)</label>
            <input type="number" class="form-input" id="logRevisedCostUpdate" value="3800" min="1" required />
          </div>
          <div class="form-group" style="grid-column:1/-1;">
            <label class="form-label">Flag Bottlenecks Impacting Milestones (Annexure-III)</label>
            <div style="display:flex;gap:20px;margin-top:6px;flex-wrap:wrap;">
              <label style="display:flex;align-items:center;gap:6px;font-size:12px;cursor:pointer;color:var(--text2);">
                <input type="checkbox" id="logLand" checked /> Pre-construction: Land Acquisition Delay
              </label>
              <label style="display:flex;align-items:center;gap:6px;font-size:12px;cursor:pointer;color:var(--text2);">
                <input type="checkbox" id="logDispute" /> Construction: Contractor Dispute / Hold
              </label>
              <label style="display:flex;align-items:center;gap:6px;font-size:12px;cursor:pointer;color:var(--text2);">
                <input type="checkbox" id="logScope" /> Pre-construction: Scope Change / DPR Redesign
              </label>
            </div>
          </div>

          <!-- LIVE METHODOLOGY EXPLANATION BOX -->
          <div style="grid-column:1/-1;background:rgba(6,21,45,0.7);border:1px solid var(--glass-border);padding:14px;border-radius:10px;font-size:11px;color:var(--text2);line-height:1.6;">
            <strong style="color:var(--cyan-light);">Annexure-IV Overrun Methodology Applied:</strong><br>
            • <em>Milestone Time Overrun ($ToR^M$):</em> Calculated as $(RDM - SDM)$ when not lapsed, or $(Current Date - SDM)$ if lapsed.<br>
            • <em>Milestone Cost Overrun ($CoR^M$):</em> Calculated as $(RCM - SCM)$.<br>
            • <em>Construction Overrun ($CoR$):</em> Computed as $(Cumulative Expenditure - Original Cost)$ and $(Cumulative Expenditure - Revised Cost)$ dynamically.
          </div>

          <button type="submit" class="form-submit" style="grid-column:1/-1;background:linear-gradient(135deg,var(--cyan),var(--primary));font-size:13px;padding:12px;">
            Update PRISM Expenditure Log & Trigger AI Anomaly Risk Recalculation
          </button>
        </form>
      </div>
    </div>
  `;
}

function renderOfficialReportPage() {
  const topOverruns = [
    { name: 'BharatNet Optical Fibre Network Project (Phase II)', sector: 'Telecom', ministry: 'DoT', state: 'Multi-State', orig: 61109, rev: 188000, exp: 46432, delay: 66, risk: 'Critical', score: 96 },
    { name: 'Western Dedicated Freight Corridor (WDFC)', sector: 'Railways', ministry: 'Ministry of Railways', state: 'Gujarat', orig: 51101, rev: 124005, exp: 124623, delay: 54, risk: 'Critical', score: 94 },
    { name: 'HPCL Rajasthan Refinery Project (Barmer)', sector: 'Petroleum', ministry: 'MoPNG', state: 'Rajasthan', orig: 43129, rev: 79459, exp: 69202, delay: 72, risk: 'Critical', score: 92 },
    { name: 'Sardar Sarovar Multipurpose Irrigation Project', sector: 'Irrigation', ministry: 'MoWR', state: 'Gujarat', orig: 20718, rev: 33413, exp: 31861, delay: 58, risk: 'Critical', score: 84 },
    { name: 'Polavaram Major Multipurpose Irrigation Project', sector: 'Irrigation', ministry: 'MoWR', state: 'Andhra Pradesh', orig: 10151, rev: 55549, exp: 26675, delay: 62, risk: 'Critical', score: 90 },
    { name: 'Ethylene Cracker Project Bina Refinery', sector: 'Petroleum', ministry: 'MoPNG', state: 'Madhya Pradesh', orig: 43367, rev: 43367, exp: 4803, delay: 18, risk: 'High', score: 65 },
    { name: 'Mumbai-Ahmedabad High Speed Rail (508 KM)', sector: 'Railways', ministry: 'Ministry of Railways', state: 'Maharashtra', orig: 108000, rev: 108000, exp: 90502, delay: 38, risk: 'Critical', score: 88 },
    { name: 'Delhi Metro Rail Project Phase-IV (Corridors)', sector: 'Urban Dev', ministry: 'MoHUA', state: 'Delhi (NCR)', orig: 33749, rev: 33795, exp: 14539, delay: 24, risk: 'High', score: 68 },
    { name: 'Kudankulam Nuclear Power Project (Ph 3&4)', sector: 'Power', ministry: 'Ministry of Power', state: 'Tamil Nadu', orig: 17238, rev: 21780, exp: 21238, delay: 48, risk: 'High', score: 79 },
    { name: 'Mumbai Urban Transport Project (MUTP Phase III)', sector: 'Railways', ministry: 'Ministry of Railways', state: 'Maharashtra', orig: 10947, rev: 10947, exp: 6609, delay: 30, risk: 'High', score: 72 }
  ];

  const rowsHtml = topOverruns.map((p, idx) => {
    const variance = p.rev - p.orig;
    const variancePct = Math.round((variance / p.orig) * 100);
    return `
      <tr>
        <td>${idx + 1}</td>
        <td><strong>${p.name}</strong><br><span style="font-size:10px;color:var(--text3);">${p.sector} · 📍 ${p.state}</span></td>
        <td>₹${p.orig.toLocaleString()} Cr</td>
        <td>₹${p.rev.toLocaleString()} Cr</td>
        <td style="color:${variance > 0 ? 'var(--red-light)' : 'var(--green-light)'};font-weight:700;">
          ${variance > 0 ? '+' : ''}₹${variance.toLocaleString()} Cr (${variancePct}%)
        </td>
        <td>₹${p.exp.toLocaleString()} Cr</td>
        <td>+${p.delay} Months</td>
        <td><span class="risk-badge ${p.risk.toLowerCase()}">${p.score} / 100 (${p.risk})</span></td>
      </tr>
    `;
  }).join('');

  return `
    <div class="page-header fade-in" style="display:flex;align-items:center;justify-content:space-between;">
      <div>
        <div class="page-title">Outcome I: Official PAIMANA Cost & Risk Audit Report</div>
        <div class="page-subtitle">Government of India · Ministry of Statistics and Programme Implementation (IPMD)</div>
      </div>
      <button class="btn-export" onclick="window.print()" style="padding:10px 20px;">
        <svg viewBox="0 0 24 24" fill="none"><path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v8H6z" stroke="currentColor" stroke-width="2"/></svg>
        Print / Save PDF Report
      </button>
    </div>

    <!-- REPORT PREVIEW SHEET CONTAINER -->
    <div class="card fade-in" style="background:rgba(8, 26, 58, 0.75);border-color:rgba(103, 232, 249, 0.3);padding:30px;" id="printableReport">
      <div style="text-align:center;border-bottom:2px solid rgba(103, 232, 249, 0.3);padding-bottom:20px;margin-bottom:24px;">
        <div style="font-size:11px;color:var(--cyan-light);font-weight:800;letter-spacing:1.5px;text-transform:uppercase;">MINISTRY OF STATISTICS AND PROGRAMME IMPLEMENTATION</div>
        <div style="font-size:10px;color:var(--text3);margin-top:2px;">INFRASTRUCTURE & PROJECT MONITORING DIVISION (IPMD), NEW DELHI</div>
        <h1 style="font-family:var(--font2);font-size:22px;font-weight:800;color:var(--text);margin-top:10px;background:linear-gradient(135deg,#ffffff,var(--cyan-light));-webkit-background-clip:text;-webkit-text-fill-color:transparent;">
          488TH FLASH AUDIT REPORT ON CENTRAL SECTOR INFRASTRUCTURE PROJECTS
        </h1>
        <div style="font-size:11px;color:var(--text2);margin-top:4px;">Period Ending: June 2026 | Projects Costing ₹150 Crore & Above</div>
      </div>

      <!-- KEY MACRO FINANCIAL OUTPUT SUMMARY TABLE -->
      <div class="grid-3" style="margin-bottom:24px;">
        <div style="background:rgba(6,21,45,0.6);border:1px solid var(--glass-border);padding:16px;border-radius:14px;text-align:center;">
          <div style="font-size:10px;color:var(--text3);text-transform:uppercase;">Total Monitored Projects</div>
          <div style="font-size:26px;font-weight:900;color:var(--cyan-light);font-family:var(--font2);margin-top:4px;">2,048</div>
          <div style="font-size:10px;color:var(--text2);margin-top:2px;">Across 17 Central Ministries & 36 States</div>
        </div>
        <div style="background:rgba(6,21,45,0.6);border:1px solid var(--glass-border);padding:16px;border-radius:14px;text-align:center;">
          <div style="font-size:10px;color:var(--text3);text-transform:uppercase;">Approved Original Cost</div>
          <div style="font-size:26px;font-weight:900;color:var(--text);font-family:var(--font2);margin-top:4px;">₹38,41,262 Cr</div>
          <div style="font-size:10px;color:var(--text2);margin-top:2px;">Initial Approved Sanctioned</div>
        </div>
        <div style="background:rgba(6,21,45,0.6);border:1px solid var(--glass-border);padding:16px;border-radius:14px;text-align:center;">
          <div style="font-size:10px;color:var(--text3);text-transform:uppercase;">Anticipated Revised Cost</div>
          <div style="font-size:26px;font-weight:900;color:var(--amber-light);font-family:var(--font2);margin-top:4px;">₹44,10,107 Cr</div>
          <div style="font-size:10px;color:var(--red-light);margin-top:2px;">Cost Variance: +₹5,68,845 Cr (+14.8%)</div>
        </div>
      </div>

      <!-- MAJOR COST OVERRUN PROJECTS AUDIT TABLE -->
      <div style="margin-bottom:24px;">
        <div style="font-size:13px;font-weight:700;color:var(--cyan-light);margin-bottom:12px;display:flex;align-items:center;justify-content:space-between;">
          <span>MAJOR MEGA PROJECTS: ACTUAL COST ESCALATION & DELAY AUDIT</span>
          <span style="font-size:10px;color:var(--text3);font-weight:400;">Values in ₹ Crores</span>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Project Name & Sector</th>
                <th>Original Cost</th>
                <th>Revised Cost</th>
                <th>Cost Overrun (Variance)</th>
                <th>Expenditure Spent</th>
                <th>Time Delay</th>
                <th>AI Risk Score</th>
              </tr>
            </thead>
            <tbody>${rowsHtml}</tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function renderPredictionPage() {
  const projectSelectOptions = DELAYED_PROJECTS.slice(0, 15).map(p => `
    <option value="${p.id}">${p.id} — ${p.name} (${p.sector} · ${p.state || 'Multi-State'})</option>
  `).join('');

  return `
    <div class="page-header fade-in">
      <div class="page-title">Outcome A & B: Enterprise ML Predictive Analytics Workbench</div>
      <div class="page-subtitle">Multi-Model Hyperparameter Workbench (XGBoost Regressor & LSTM Deep RNN) for quantitative cost & schedule overrun forecasting</div>
    </div>

    <div class="grid-2 fade-in">
      <!-- LEFT CARD: MODEL CONFIGURATION & FEATURE INPUT WORKBENCH -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">
            <div class="card-icon primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
            </div>
            ML Model Hyperparameter & Dataset Feature Workbench
          </div>
        </div>

        <form class="pred-form" id="predictionForm" onsubmit="handlePredictionSubmit(event)">
          <!-- SECTION 1: MODEL ARCHITECTURE & HYPERPARAMETERS -->
          <div style="grid-column:1/-1;font-size:11px;font-weight:800;color:var(--cyan-light);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:4px;">
            1. Select Machine Learning Architecture & Hyperparameters
          </div>

          <div class="form-group" style="grid-column:1/-1;">
            <label class="form-label">ML Model Architecture *</label>
            <select class="form-select" id="predModelArch" onchange="toggleModelParamInputs()">
              <option value="XGBoost">XGBoost Gradient Boosted Decision Trees Regressor (v2.1)</option>
              <option value="LSTM">LSTM Deep Recurrent Neural Network (Time Series Phasing)</option>
              <option value="RandomForest">Random Forest Multi-Variate Ensemble Regressor</option>
              <option value="LightGBM">LightGBM High-Velocity Gradient Booster</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Learning Rate (&eta;) / Step</label>
            <input type="number" class="form-input" id="predParamEta" value="0.05" step="0.01" min="0.001" max="0.5" />
          </div>
          <div class="form-group">
            <label class="form-label">Max Depth / Hidden Units</label>
            <input type="number" class="form-input" id="predParamDepth" value="6" min="2" max="256" />
          </div>
          <div class="form-group">
            <label class="form-label">Estimators / Lookback (t)</label>
            <input type="number" class="form-input" id="predParamEstimators" value="250" min="10" max="1000" />
          </div>
          <div class="form-group">
            <label class="form-label">Subsample / Dropout Ratio</label>
            <input type="number" class="form-input" id="predParamSubsample" value="0.80" step="0.05" min="0.1" max="1.0" />
          </div>

          <!-- SECTION 2: DATASET & PROJECT FEATURES -->
          <div style="grid-column:1/-1;font-size:11px;font-weight:800;color:var(--cyan-light);text-transform:uppercase;letter-spacing:1px;margin-top:10px;margin-bottom:4px;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:4px;">
            2. Dataset Source & Project Feature Parameters
          </div>

          <div class="form-group" style="grid-column:1/-1;">
            <label class="form-label">Dataset / Project Preset Target</label>
            <select class="form-select" id="predProjectPreset" onchange="loadPresetIntoPredictionForm()">
              <option value="custom">-- Custom Feature Entry / Uploaded CSV --</option>
              ${projectSelectOptions}
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Sector</label>
            <select class="form-select" id="predSector">
              <option value="Railways">Railways</option>
              <option value="Roads">Roads & Highways</option>
              <option value="Power">Power</option>
              <option value="Petroleum">Petroleum</option>
              <option value="Irrigation">Irrigation</option>
              <option value="Telecom">Telecom</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Original Sanctioned Cost (₹ Cr)</label>
            <input type="number" class="form-input" id="predOriginalCost" value="1500" min="100" />
          </div>
          <div class="form-group">
            <label class="form-label">Initial Delay Drift (Months)</label>
            <input type="number" class="form-input" id="predDelay" value="18" min="0" max="120" />
          </div>
          <div class="form-group">
            <label class="form-label">Cost Overrun To Date (%)</label>
            <input type="number" class="form-input" id="predCostPct" value="18" min="0" max="300" />
          </div>
          <div class="form-group">
            <label class="form-label">Expenditure Velocity spent (%)</label>
            <input type="number" class="form-input" id="predExpPct" value="42" min="0" max="100" />
          </div>
          <div class="form-group">
            <label class="form-label">PM GatiShakti Portal Layer</label>
            <select class="form-select" id="predGatiShakti">
              <option value="1.0">Integrated (0.95 Scale)</option>
              <option value="0.5">Partial Sync</option>
              <option value="0.0">Unlinked / Standalone</option>
            </select>
          </div>

          <div class="form-group" style="grid-column:1/-1;">
            <label class="form-label">Flagged Bottleneck Risk Constraints</label>
            <div style="display:flex;gap:15px;margin-top:5px;flex-wrap:wrap;">
              <label style="display:flex;align-items:center;gap:6px;font-size:11.5px;cursor:pointer;">
                <input type="checkbox" id="predContractor" checked /> Contractor Default / Dispute
              </label>
              <label style="display:flex;align-items:center;gap:6px;font-size:11.5px;cursor:pointer;">
                <input type="checkbox" id="predEnv" /> Forest & Environmental Hold
              </label>
              <label style="display:flex;align-items:center;gap:6px;font-size:11.5px;cursor:pointer;">
                <input type="checkbox" id="predLand" checked /> Land Acquisition Bottleneck
              </label>
            </div>
          </div>

          <button type="submit" class="form-submit" style="grid-column:1/-1;margin-top:10px;background:linear-gradient(135deg,var(--cyan),var(--primary));font-size:14px;padding:12px;">
            Execute Quantitative ML Inference & SHAP Risk Attribution
          </button>
        </form>
      </div>

      <!-- RIGHT CARD: QUANTITATIVE ML MODEL INFERENCE OUTPUT -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">
            <div class="card-icon cyan">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            Quantitative Model Inference Output & SHAP Attribution
          </div>
        </div>

        <div id="predictionResult">
          <!-- Default Quantitative Output Panel -->
          <div class="result-box warning">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:6px;">
              <span style="font-size:11px;font-weight:800;color:var(--cyan-light);letter-spacing:1px;text-transform:uppercase;">
                XGBoost Model (v2.1) &bull; &eta;=0.05 &bull; 250 Trees &bull; R&sup2; = 0.948
              </span>
              <span class="risk-badge critical" style="font-size:10px;">CRITICAL RISK</span>
            </div>

            <!-- QUANTITATIVE FORECAST METRICS -->
            <div class="grid-2" style="gap:10px;margin-bottom:14px;">
              <div style="background:rgba(0,0,0,0.3);padding:10px;border-radius:8px;border:1px solid rgba(239,68,68,0.3);">
                <div style="font-size:10px;color:var(--text3);">Projected Final Cost</div>
                <div style="font-size:18px;font-weight:900;color:var(--red-light);font-family:var(--font2);">₹1,942.50 Cr</div>
                <div style="font-size:10px;color:var(--amber-light);">Overrun: +₹442.50 Cr (+29.5%)</div>
              </div>
              <div style="background:rgba(0,0,0,0.3);padding:10px;border-radius:8px;border:1px solid rgba(245,158,11,0.3);">
                <div style="font-size:10px;color:var(--text3);">Projected Time Delay</div>
                <div style="font-size:18px;font-weight:900;color:var(--amber-light);font-family:var(--font2);">+23.4 Months</div>
                <div style="font-size:10px;color:var(--text2);">Est. Completion: October 2028</div>
              </div>
            </div>

            <!-- CONFIDENCE INTERVAL & MODEL METRICS -->
            <div style="font-size:11px;color:var(--text2);margin-bottom:12px;background:rgba(255,255,255,0.04);padding:8px 12px;border-radius:8px;">
              <div><strong>95% Confidence Interval (CI):</strong> [₹1,885.00 Cr &mdash; ₹2,015.00 Cr]</div>
              <div style="font-size:10px;color:var(--text3);margin-top:2px;">Model Evaluation Metrics: RMSE = 3.84% &bull; MAE = 2.12 Months &bull; F1-Score = 0.912</div>
            </div>

            <!-- SHAP FEATURE IMPORTANCE ATTRIBUTION BREAKDOWN -->
            <div style="font-size:11px;font-weight:800;color:var(--cyan-light);text-transform:uppercase;margin-bottom:8px;">
              SHAP Feature Importance Attribution (% Risk Contribution)
            </div>
            
            <div style="display:flex;flex-direction:column;gap:6px;margin-bottom:14px;">
              <div class="prog-bar-wrap">
                <span style="width:160px;font-size:10.5px;">Land Acquisition Hold:</span>
                <div class="prog-bar"><div class="prog-fill red" style="width:34.2%;"></div></div>
                <span class="prog-val">34.2%</span>
              </div>
              <div class="prog-bar-wrap">
                <span style="width:160px;font-size:10.5px;">Expenditure Velocity Sinks:</span>
                <div class="prog-bar"><div class="prog-fill amber" style="width:23.8%;"></div></div>
                <span class="prog-val">23.8%</span>
              </div>
              <div class="prog-bar-wrap">
                <span style="width:160px;font-size:10.5px;">Contractor Dispute Escrow:</span>
                <div class="prog-bar"><div class="prog-fill purple" style="width:19.4%;"></div></div>
                <span class="prog-val">19.4%</span>
              </div>
              <div class="prog-bar-wrap">
                <span style="width:160px;font-size:10.5px;">Forest/Env Clearance:</span>
                <div class="prog-bar"><div class="prog-fill cyan" style="width:14.6%;"></div></div>
                <span class="prog-val">14.6%</span>
              </div>
              <div class="prog-bar-wrap">
                <span style="width:160px;font-size:10.5px;">Price Escalation Variance:</span>
                <div class="prog-bar"><div class="prog-fill green" style="width:8.0%;"></div></div>
                <span class="prog-val">8.0%</span>
              </div>
            </div>

            <div style="font-size:11px;color:var(--text2);line-height:1.5;border-top:1px solid rgba(255,255,255,0.1);padding-top:10px;">
              <strong>Prescriptive Action Triggered:</strong> Primary risk driver identified as Land Acquisition (34.2%). Recommended Action: Automate PM GatiShakti NMP geo-spatial layer synchronization with state revenue portals to clear right-of-way milestones.
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderRiskPage() {
  const ministryList = MINISTRY_PERF.map(m => `
    <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid rgba(30,58,95,0.4);">
      <div>
        <div style="font-weight:600;font-size:12px;">${m.name}</div>
        <div style="font-size:10px;color:var(--text3);">${m.projects} Monitored Projects · ${m.delayed} Delayed</div>
      </div>
      <div style="display:flex;align-items:center;gap:12px;">
        <div style="text-align:right;">
          <div style="font-size:11px;font-weight:700;color:var(--amber-light);">+${m.costOverrun}% Cost</div>
          <div style="font-size:10px;color:var(--text3);">${m.avgDelay} mo delay</div>
        </div>
        <div style="width:40px;height:40px;border-radius:50%;background:rgba(99,102,241,0.15);border:2px solid var(--primary);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:11px;color:var(--primary-light);">
          ${m.score}
        </div>
      </div>
    </div>
  `).join('');

  return `
    <div class="page-header fade-in">
      <div class="page-title">Outcome C: Project Risk Scoring Framework</div>
      <div class="page-subtitle">Dynamic 0-100 composite health scores generated across 17 Central Ministries</div>
    </div>

    <div class="grid-2 fade-in">
      <div class="card">
        <div class="card-header">
          <div class="card-title">
            <div class="card-icon purple">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
            </div>
            Ministry Performance Radar Score Index
          </div>
        </div>
        <div class="chart-wrap"><canvas id="chartMinistryRadar"></canvas></div>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-title">
            <div class="card-icon primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/></svg>
            </div>
            Ministry Health Scorecard
          </div>
        </div>
        <div>${ministryList}</div>
      </div>
    </div>
  `;
}

function renderEarlyWarningPage() {
  const alertsList = ALERTS.map(a => `
    <div class="alert-card ${a.level}">
      <div class="alert-dot ${a.level}"></div>
      <div style="flex:1;">
        <div class="alert-title">${a.title}</div>
        <div class="alert-desc">${a.desc}</div>
        <div class="alert-meta">${a.ministry} · ${a.date} · Detected by PAIMANA Early Warning Engine</div>
      </div>
    </div>
  `).join('');

  return `
    <div class="page-header fade-in">
      <div class="page-title">Outcome D: Early Warning Alert System</div>
      <div class="page-subtitle">Proactive risk detection signals generated 3 to 6 months prior to cost and schedule escalation</div>
    </div>

    <div class="card fade-in">
      <div class="card-header">
        <div class="card-title">
          <div class="card-icon red">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          </div>
          Active PAIMANA AI Proactive Anomaly Alerts
        </div>
      </div>
      <div id="earlyWarningAlertsList">${alertsList}</div>
    </div>
  `;
}

function renderLlmPage() {
  return `
    <div class="page-header fade-in">
      <div class="page-title">Outcome H: LLM-Enabled Project Intelligence Assistant</div>
      <div class="page-subtitle">Natural language conversational query engine trained on MoSPI PAIMANA Flash Reports</div>
    </div>

    <div class="card fade-in">
      <div class="chat-wrap">
        <div class="chat-messages" id="chatMessages">
          <div class="msg ai">
            <div class="msg-label">PAIMANA VISHLESHAN AI</div>
            Hello! I am your AI Project Intelligence Assistant. Ask me about cost overruns, schedule delays, state-wise infrastructure, or multi-month trends (April - June 2026) across the ₹44.10 Lakh Crore portfolio.
          </div>
        </div>
        <div class="chat-input-wrap">
          <textarea class="chat-input" id="chatInput" rows="1" placeholder="e.g. Compare the project counts between Maharashtra, Uttar Pradesh and Gujarat..." onkeydown="handleChatKey(event)"></textarea>
          <button class="chat-send" onclick="sendChatMessage()">Ask AI</button>
        </div>
      </div>
    </div>
  `;
}

function renderBenchmarkingPage() {
  return `
    <div class="page-header fade-in">
      <div class="page-title">Outcome E: Benchmarking & Comparative Analytics Module</div>
      <div class="page-subtitle">Cross-sector matrix evaluating delay vs cost overrun alongside ML model F1-score benchmarks</div>
    </div>

    <div class="grid-2 fade-in">
      <div class="card">
        <div class="card-header">
          <div class="card-title">
            <div class="card-icon cyan">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>
            </div>
            Sector Delay vs Cost Overrun Matrix (Bubble Size = Project Scale)
          </div>
        </div>
        <div class="chart-wrap"><canvas id="chartDelayBubble"></canvas></div>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-title">
            <div class="card-icon primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/></svg>
            </div>
            Open-Source ML Model Performance Benchmark (F1-Score)
          </div>
        </div>
        <div class="chart-wrap"><canvas id="chartModelComparison"></canvas></div>
      </div>
    </div>
  `;
}

function renderDriversPage() {
  return `
    <div class="page-header fade-in">
      <div class="page-title">Outcome F: Cost Escalation Driver Analysis Module</div>
      <div class="page-subtitle">Root-cause attribution analysis mapping primary bottleneck factors to actionable interventions</div>
    </div>

    <div class="grid-2 fade-in">
      <div class="card">
        <div class="card-header">
          <div class="card-title">
            <div class="card-icon amber">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            Impact Attribution by Bottleneck Factor (%)
          </div>
        </div>
        <div class="chart-wrap"><canvas id="chartDriverBar"></canvas></div>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-title">
            <div class="card-icon purple">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </div>
            Outcome I: Prescriptive Intervention Framework
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:10px;">
          <div class="insight-chip">
            <div class="chip-icon">📍</div>
            <div class="chip-text"><strong>Land Acquisition (31% impact):</strong> Integrate PM GatiShakti NMP geo-spatial layers with state revenue portals to automate land clearance milestone tracking.</div>
          </div>
          <div class="insight-chip">
            <div class="chip-icon">🌲</div>
            <div class="chip-text"><strong>Environmental Clearances (22% impact):</strong> Establish single-window PARIVESH API automated status sync to prevent regulatory bottleneck holds.</div>
          </div>
          <div class="insight-chip">
            <div class="chip-icon">🤝</div>
            <div class="chip-text"><strong>Contractor Disputes (18% impact):</strong> Implement automated milestone-linked escrows and AI dispute risk escalation triggers.</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

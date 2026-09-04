// ─── CHART FACTORY WITH MULTI-MONTH & STATE TREND SUPPORT ──────────────────
Chart.defaults.color = '#64748b';
Chart.defaults.font.family = "'Inter',sans-serif";
Chart.defaults.font.size = 11;

const chartInstances = {};

function destroyChart(id) {
  if (chartInstances[id]) {
    chartInstances[id].destroy();
    delete chartInstances[id];
  }
}

// Sector Bar Chart
function renderSectorBarChart(canvasId) {
  destroyChart(canvasId);
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;

  chartInstances[canvasId] = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: SECTOR_DATA.labels,
      datasets: [
        { label: 'Original Cost (₹L Cr)', data: SECTOR_DATA.originalCost, backgroundColor: 'rgba(99, 102, 241, 0.75)', borderRadius: 4 },
        { label: 'Revised Cost (₹L Cr)', data: SECTOR_DATA.revisedCost, backgroundColor: 'rgba(245, 158, 11, 0.75)', borderRadius: 4 },
        { label: 'Expenditure (₹L Cr)', data: SECTOR_DATA.expenditure, backgroundColor: 'rgba(16, 185, 129, 0.75)', borderRadius: 4 }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { labels: { color: '#94a3b8', font: { size: 10 } } } },
      scales: {
        x: { ticks: { color: '#64748b', font: { size: 9 } }, grid: { color: 'rgba(30,58,95,0.3)' } },
        y: { ticks: { color: '#64748b', callback: v => v + 'L Cr' }, grid: { color: 'rgba(30,58,95,0.3)' } }
      }
    }
  });
}

// State-Wise Project & Cost Allocation Bar Chart
function renderStateBarChart(canvasId) {
  destroyChart(canvasId);
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;

  chartInstances[canvasId] = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: STATE_ANALYTICS.map(s => s.state),
      datasets: [
        { label: 'Monitored Projects Count', data: STATE_ANALYTICS.map(s => s.projects), backgroundColor: 'rgba(6, 182, 212, 0.75)', borderRadius: 6, yAxisID: 'y' },
        { label: 'Revised Cost (₹ Cr)', data: STATE_ANALYTICS.map(s => Math.round(s.revCost / 100)), backgroundColor: 'rgba(99, 102, 241, 0.65)', borderRadius: 6, yAxisID: 'y2' }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { labels: { color: '#94a3b8', font: { size: 10 } } } },
      scales: {
        x: { ticks: { color: '#94a3b8', font: { size: 10 } }, grid: { color: 'rgba(30,58,95,0.3)' } },
        y: { ticks: { color: '#06b6d4', callback: v => v + ' Projs' }, grid: { color: 'rgba(30,58,95,0.3)' } },
        y2: { position: 'right', ticks: { color: '#a5b4fc', callback: v => '₹' + v + ' Cr' }, grid: { display: false } }
      }
    }
  });
}

// Overrun & Delay Trend Line
function renderOverrunTrend(canvasId) {
  destroyChart(canvasId);
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;

  chartInstances[canvasId] = new Chart(ctx, {
    type: 'line',
    data: {
      labels: TREND_YEARS,
      datasets: [
        { label: 'Cost Overrun %', data: COST_OVERRUN_TREND, borderColor: 'rgba(239,68,68,1)', backgroundColor: 'rgba(239,68,68,0.1)', fill: true, tension: 0.4, pointRadius: 4 },
        { label: 'Avg Delay (months)', data: TIME_OVERRUN_TREND.map(v => v / 3), borderColor: 'rgba(245,158,11,1)', backgroundColor: 'rgba(245,158,11,0.08)', fill: true, tension: 0.4, pointRadius: 4, yAxisID: 'y2' }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { labels: { color: '#94a3b8', font: { size: 10 } } } },
      scales: {
        x: { ticks: { color: '#64748b' }, grid: { color: 'rgba(30,58,95,0.3)' } },
        y: { ticks: { color: '#64748b', callback: v => v + '%' }, grid: { color: 'rgba(30,58,95,0.3)' } },
        y2: { position: 'right', ticks: { color: '#64748b', callback: v => Math.round(v * 3) + ' mo' }, grid: { display: false } }
      }
    }
  });
}

// Risk Doughnut
function renderRiskDoughnut(canvasId) {
  destroyChart(canvasId);
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;

  chartInstances[canvasId] = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Critical Risk', 'High Risk', 'Medium Risk', 'Low Risk'],
      datasets: [{
        data: [RISK_DIST.critical, RISK_DIST.high, RISK_DIST.medium, RISK_DIST.low],
        backgroundColor: ['rgba(239,68,68,0.85)', 'rgba(245,158,11,0.85)', 'rgba(99,102,241,0.85)', 'rgba(16,185,129,0.85)'],
        borderWidth: 2,
        borderColor: '#060b17'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '72%',
      plugins: { legend: { position: 'bottom', labels: { color: '#94a3b8', font: { size: 10 } } } }
    }
  });
}

// Ministry Performance Radar
function renderMinistryRadar(canvasId) {
  destroyChart(canvasId);
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;

  chartInstances[canvasId] = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: MINISTRY_PERF.map(m => m.name),
      datasets: [{
        label: 'Performance Score (0-100)',
        data: MINISTRY_PERF.map(m => m.score),
        borderColor: 'rgba(99,102,241,1)',
        backgroundColor: 'rgba(99,102,241,0.15)',
        pointRadius: 4,
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { labels: { color: '#94a3b8' } } },
      scales: { r: { ticks: { color: '#64748b', backdropColor: 'transparent' }, grid: { color: 'rgba(30,58,95,0.4)' }, pointLabels: { color: '#94a3b8' }, suggestedMin: 0, suggestedMax: 100 } }
    }
  });
}

// Model Comparison Bar
function renderModelComparison(canvasId) {
  destroyChart(canvasId);
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;

  chartInstances[canvasId] = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: MODEL_METRICS.modelsCompared,
      datasets: [{
        label: 'F1-Score',
        data: MODEL_METRICS.f1Scores,
        backgroundColor: ['rgba(99,102,241,0.8)', 'rgba(6,182,212,0.8)', 'rgba(168,85,247,0.8)', 'rgba(245,158,11,0.6)', 'rgba(239,68,68,0.6)'],
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: '#64748b' }, grid: { color: 'rgba(30,58,95,0.3)' }, min: 0.5, max: 1.0 },
        y: { ticks: { color: '#94a3b8' }, grid: { display: false } }
      }
    }
  });
}

// Driver Chart
function renderDriverChart(canvasId) {
  destroyChart(canvasId);
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;

  chartInstances[canvasId] = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: COST_DRIVERS.map(d => d.factor),
      datasets: [{
        label: 'Impact %',
        data: COST_DRIVERS.map(d => d.impact),
        backgroundColor: ['rgba(239,68,68,0.8)', 'rgba(245,158,11,0.8)', 'rgba(168,85,247,0.8)', 'rgba(99,102,241,0.8)', 'rgba(6,182,212,0.8)', 'rgba(16,185,129,0.8)'],
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: '#64748b', callback: v => v + '%' }, grid: { color: 'rgba(30,58,95,0.3)' } },
        y: { ticks: { color: '#94a3b8' }, grid: { display: false } }
      }
    }
  });
}

// Expenditure Line Chart
function renderExpenditureLine(canvasId) {
  destroyChart(canvasId);
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;

  const months = ['Apr 25','May 25','Jun 25','Jul 25','Aug 25','Sep 25','Oct 25','Nov 25','Dec 25','Jan 26','Feb 26','Mar 26','Apr 26','May 26','Jun 26'];
  const actual = [1.2, 2.1, 2.8, 4.1, 5.3, 6.8, 8.2, 9.6, 11.4, 13.1, 15.2, 17.8, 20.36, 21.08, 21.84];
  const target = [2.0, 4.0, 6.0, 8.0, 10.0, 12.0, 14.0, 16.0, 18.0, 20.0, 22.0, 24.0, 26.0, 28.0, 30.0];

  chartInstances[canvasId] = new Chart(ctx, {
    type: 'line',
    data: {
      labels: months,
      datasets: [
        { label: 'Actual Expenditure (₹L Cr)', data: actual, borderColor: 'rgba(16,185,129,1)', backgroundColor: 'rgba(16,185,129,0.1)', fill: true, tension: 0.4, pointRadius: 3 },
        { label: 'Target Expenditure', data: target, borderColor: 'rgba(99,102,241,0.6)', backgroundColor: 'transparent', borderDash: [6,3], tension: 0.4, pointRadius: 0 }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { labels: { color: '#94a3b8' } } },
      scales: {
        x: { ticks: { color: '#64748b' }, grid: { color: 'rgba(30,58,95,0.3)' } },
        y: { ticks: { color: '#64748b', callback: v => v + 'L Cr' }, grid: { color: 'rgba(30,58,95,0.3)' } }
      }
    }
  });
}

// Sector Delay Bubble Matrix
function renderDelayBubble(canvasId) {
  destroyChart(canvasId);
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;

  chartInstances[canvasId] = new Chart(ctx, {
    type: 'bubble',
    data: {
      datasets: [
        { label: 'Roads & Highways', data: [{ x: 38, y: 2.5, r: 18 }], backgroundColor: 'rgba(99,102,241,0.7)' },
        { label: 'Railways', data: [{ x: 51, y: 21.0, r: 14 }], backgroundColor: 'rgba(239,68,68,0.7)' },
        { label: 'Power', data: [{ x: 32, y: 11.5, r: 10 }], backgroundColor: 'rgba(245,158,11,0.7)' },
        { label: 'Petroleum', data: [{ x: 44, y: 14.9, r: 9 }], backgroundColor: 'rgba(168,85,247,0.7)' },
        { label: 'Irrigation', data: [{ x: 58, y: 33.4, r: 8 }], backgroundColor: 'rgba(6,182,212,0.7)' },
        { label: 'Telecom', data: [{ x: 66, y: 80.8, r: 6 }], backgroundColor: 'rgba(251,191,36,0.7)' }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { labels: { color: '#94a3b8' } } },
      scales: {
        x: { ticks: { color: '#64748b' }, grid: { color: 'rgba(30,58,95,0.3)' }, title: { display: true, text: 'Average Delay (Months)', color: '#64748b' } },
        y: { ticks: { color: '#64748b', callback: v => v + '%' }, grid: { color: 'rgba(30,58,95,0.3)' }, title: { display: true, text: 'Cost Overrun (%)', color: '#64748b' } }
      }
    }
  });
}

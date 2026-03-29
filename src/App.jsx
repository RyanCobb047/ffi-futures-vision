import { useMemo, useState } from 'react'

const phases = [
  {
    id: 'signal',
    step: '01',
    name: 'Signal & Thesis',
    summary: 'Frame the market opportunity, underwriting posture, and the investor narrative that anchors the program.',
    focus: ['Demand signal quality', 'Target borrower profile', 'Capital narrative'],
    metrics: [
      { label: 'Opportunity quality', value: '82 / 100' },
      { label: 'Partner readiness', value: '6 funds' },
      { label: 'Narrative confidence', value: 'Strong' },
    ],
    detail:
      'This opening phase distills the purpose of FFI into a concise investment case: what category gap is being addressed, why the timing matters, and what proof points support a durable funding model.',
  },
  {
    id: 'design',
    step: '02',
    name: 'Program Design',
    summary: 'Translate the thesis into eligibility rules, product mechanics, review checkpoints, and operating guardrails.',
    focus: ['Funding structure', 'Approval checkpoints', 'Risk controls'],
    metrics: [
      { label: 'Eligibility rules', value: '12 mapped' },
      { label: 'Review gates', value: '4 stages' },
      { label: 'Control coverage', value: 'High' },
    ],
    detail:
      'The reconstructed draft strongly implied a planning layer between strategy and scale. This section formalizes that midpoint with policy, process, and pacing so the model remains auditable as volume grows.',
  },
  {
    id: 'deployment',
    step: '03',
    name: 'Deployment & Adoption',
    summary: 'Launch the operating rhythm, equip partners, and make performance visible through shared dashboards.',
    focus: ['Channel activation', 'Partner enablement', 'Operational visibility'],
    metrics: [
      { label: 'Launch regions', value: '3 markets' },
      { label: 'Time to decision', value: '36 hrs' },
      { label: 'Pipeline visibility', value: 'Realtime' },
    ],
    detail:
      'Once the funding design is stable, the experience shifts to execution. The app surfaces the rollout story as a set of visible operating indicators rather than hidden internal steps.',
  },
  {
    id: 'expansion',
    step: '04',
    name: 'Expansion Forecast',
    summary: 'Model how approved volume, revenue, and reserve posture evolve as the program expands into new capacity bands.',
    focus: ['Revenue trajectory', 'Reserve pressure', 'Phase triggers'],
    metrics: [
      { label: 'Modeled originations', value: '$18.4M' },
      { label: 'Expansion trigger', value: '72% utilization' },
      { label: 'Margin posture', value: 'Healthy' },
    ],
    detail:
      'The damaged draft appeared to end in a more speculative, forecast-style section. This reconstruction keeps that intent while making the assumptions explicit and interactive for review.',
  },
]

const dashboardStats = [
  { label: 'Active capital lanes', value: '4', note: 'Structured across pilot, core, growth, and reserve bands.' },
  { label: 'Target funded volume', value: '$24M', note: 'Illustrative annualized throughput under the current model.' },
  { label: 'Expected gross yield', value: '11.8%', note: 'Blended return estimate before loss reserves and operating drag.' },
  { label: 'Review cadence', value: 'Weekly', note: 'Shared operating review cadence across finance, ops, and partners.' },
]

const scenarioPresets = {
  conservative: { funding: 2500000, feeRate: 7.5, approvalRate: 42, reserveRate: 14, months: 6 },
  base: { funding: 5000000, feeRate: 9, approvalRate: 56, reserveRate: 11, months: 9 },
  aggressive: { funding: 9000000, feeRate: 10.5, approvalRate: 68, reserveRate: 9, months: 12 },
}

const formatMoney = (value) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)

const formatPercent = (value) => `${value.toFixed(1)}%`

export default function App() {
  const [inputs, setInputs] = useState(scenarioPresets.base)
  const [selectedPhase, setSelectedPhase] = useState(phases[0].id)

  const outputs = useMemo(() => {
    const funding = Number(inputs.funding) || 0
    const feeRate = (Number(inputs.feeRate) || 0) / 100
    const approvalRate = (Number(inputs.approvalRate) || 0) / 100
    const reserveRate = (Number(inputs.reserveRate) || 0) / 100
    const months = Math.max(1, Number(inputs.months) || 1)

    const approvedVolume = funding * approvalRate
    const grossRevenue = approvedVolume * feeRate
    const reserveRequirement = approvedVolume * reserveRate
    const netProgramRevenue = grossRevenue - reserveRequirement
    const monthlyRunRate = netProgramRevenue / months
    const healthBand = netProgramRevenue > 0 ? (reserveRate < feeRate ? 'Expansion ready' : 'Tight margin') : 'Review structure'

    return { approvedVolume, grossRevenue, reserveRequirement, netProgramRevenue, monthlyRunRate, healthBand }
  }, [inputs])

  const forecastRows = useMemo(() => {
    return phases.map((phase, index) => {
      const multiplier = 0.72 + index * 0.18
      const volume = outputs.approvedVolume * multiplier
      const revenue = outputs.netProgramRevenue * multiplier
      const readiness = Math.min(96, Math.round((Number(inputs.approvalRate) || 0) + 12 + index * 6))
      return {
        phase: phase.name,
        volume: formatMoney(volume),
        revenue: formatMoney(revenue),
        readiness: `${readiness}%`,
      }
    })
  }, [outputs, inputs.approvalRate])

  const applyPreset = (preset) => setInputs(scenarioPresets[preset])
  const handleChange = (key, value) => setInputs((current) => ({ ...current, [key]: value }))

  return (
    <div className="app-shell">
      <header className="hero section">
        <div className="hero-copy">
          <p className="eyebrow">Futures Funding / FFI</p>
          <h1>Recovered strategy view for a phased funding system.</h1>
          <p className="lede">
            A polished reconstruction of the damaged draft: summary first, phase-by-phase detail next, and
            interactive planning tools for revenue and expansion assumptions.
          </p>
          <div className="hero-actions">
            <a href="#phase-nav" className="button primary">Review phases</a>
            <a href="#calculator" className="button secondary">Open calculator</a>
          </div>
        </div>
        <aside className="hero-panel">
          <span className="panel-label">Recovered intent snapshot</span>
          <div className="panel-metric">
            <strong>4-phase flow</strong>
            <span>Summary → design → deployment → forecast</span>
          </div>
          <div className="panel-metric">
            <strong>Dashboard summaries</strong>
            <span>Capital lanes, throughput, yield, and cadence</span>
          </div>
          <div className="panel-metric assumption">
            <strong>[ASSUMPTION]</strong>
            <span>Exact original labels were partially unreadable, so phase names are conservative reconstructions.</span>
          </div>
        </aside>
      </header>

      <section className="section stats-grid">
        {dashboardStats.map((stat) => (
          <article key={stat.label} className="stat-card">
            <span className="stat-label">{stat.label}</span>
            <strong>{stat.value}</strong>
            <p>{stat.note}</p>
          </article>
        ))}
      </section>

      <section id="phase-nav" className="section">
        <div className="section-heading">
          <p className="eyebrow">Phase navigation</p>
          <h2>Track the funding journey as one coherent operating system.</h2>
        </div>
        <div className="phase-nav">
          {phases.map((phase) => (
            <button
              key={phase.id}
              className={`phase-chip ${selectedPhase === phase.id ? 'active' : ''}`}
              onClick={() => {
                setSelectedPhase(phase.id)
                document.getElementById(phase.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
            >
              <span>{phase.step}</span>
              <strong>{phase.name}</strong>
            </button>
          ))}
        </div>
      </section>

      <section className="section phase-stack">
        {phases.map((phase) => (
          <article key={phase.id} id={phase.id} className={`phase-card ${selectedPhase === phase.id ? 'active' : ''}`}>
            <div className="phase-header">
              <div>
                <p className="eyebrow">Phase {phase.step}</p>
                <h3>{phase.name}</h3>
              </div>
              <p className="phase-summary">{phase.summary}</p>
            </div>
            <div className="phase-body">
              <div>
                <p>{phase.detail}</p>
                <ul className="focus-list">
                  {phase.focus.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="metrics-grid">
                {phase.metrics.map((metric) => (
                  <div key={metric.label} className="metric-card">
                    <span>{metric.label}</span>
                    <strong>{metric.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>

      <section id="calculator" className="section calculator-section">
        <div className="section-heading">
          <p className="eyebrow">Revenue calculator</p>
          <h2>Stress-test the economics behind the rollout.</h2>
          <p>
            The original draft clearly called for calculator-style interactions but the exact formulas were not fully
            recoverable. This module uses a transparent fee / approval / reserve model so reviewers can inspect the
            assumptions directly.
          </p>
        </div>

        <div className="calculator-layout">
          <div className="input-panel">
            <div className="preset-row">
              {Object.keys(scenarioPresets).map((preset) => (
                <button key={preset} className="button ghost" onClick={() => applyPreset(preset)}>
                  {preset}
                </button>
              ))}
            </div>
            <label>
              Funding capacity
              <input type="number" min="0" step="100000" value={inputs.funding} onChange={(e) => handleChange('funding', e.target.value)} />
            </label>
            <label>
              Fee rate (%)
              <input type="number" min="0" max="100" step="0.1" value={inputs.feeRate} onChange={(e) => handleChange('feeRate', e.target.value)} />
            </label>
            <label>
              Approval rate (%)
              <input type="number" min="0" max="100" step="1" value={inputs.approvalRate} onChange={(e) => handleChange('approvalRate', e.target.value)} />
            </label>
            <label>
              Reserve rate (%)
              <input type="number" min="0" max="100" step="0.1" value={inputs.reserveRate} onChange={(e) => handleChange('reserveRate', e.target.value)} />
            </label>
            <label>
              Horizon (months)
              <input type="number" min="1" max="36" step="1" value={inputs.months} onChange={(e) => handleChange('months', e.target.value)} />
            </label>
          </div>

          <div className="output-panel">
            <div className="output-card"><span>Approved volume</span><strong>{formatMoney(outputs.approvedVolume)}</strong></div>
            <div className="output-card"><span>Gross revenue</span><strong>{formatMoney(outputs.grossRevenue)}</strong></div>
            <div className="output-card"><span>Reserve requirement</span><strong>{formatMoney(outputs.reserveRequirement)}</strong></div>
            <div className="output-card"><span>Net program revenue</span><strong>{formatMoney(outputs.netProgramRevenue)}</strong></div>
            <div className="output-card"><span>Monthly run rate</span><strong>{formatMoney(outputs.monthlyRunRate)}</strong></div>
            <div className="output-card"><span>Margin posture</span><strong>{outputs.healthBand}</strong></div>
          </div>
        </div>
      </section>

      <section className="section forecast-section">
        <div className="section-heading">
          <p className="eyebrow">Forecast view</p>
          <h2>See how each phase changes revenue readiness.</h2>
          <p>
            This forecast is interpretive rather than historical. It translates the calculator outputs into phase-based
            operating checkpoints so the page ends with a forward-looking review, as the damaged draft appeared to do.
          </p>
        </div>

        <div className="forecast-table">
          <div className="forecast-head">
            <span>Phase</span>
            <span>Modeled volume</span>
            <span>Modeled revenue</span>
            <span>Readiness</span>
          </div>
          {forecastRows.map((row) => (
            <div key={row.phase} className="forecast-row">
              <strong>{row.phase}</strong>
              <span>{row.volume}</span>
              <span>{row.revenue}</span>
              <span>{row.readiness}</span>
            </div>
          ))}
        </div>

        <div className="assumption-note">
          <strong>Assumption handling:</strong> The exact draft formulas and some labels were not recoverable from the
          available project files, so the forecast uses explicit illustrative logic instead of opaque placeholder math.
        </div>
      </section>
    </div>
  )
}

import { useState } from 'react'
import './App.css'
import { EverydayScenariosCalculator } from './components/EverydayScenariosCalculator'
import { PercentChangeCalculator } from './components/PercentChangeCalculator'
import { PercentOfWholeCalculator } from './components/PercentOfWholeCalculator'
import { ReversePercentCalculator } from './components/ReversePercentCalculator'

type CalculatorMode =
  | 'basic'
  | 'percentOfWhole'
  | 'percentChange'
  | 'reversePercent'
  | 'scenarios'

interface ModeDefinition {
  id: CalculatorMode
  label: string
  description: string
}

const MODES: ModeDefinition[] = [
  {
    id: 'basic',
    label: 'Overview',
    description: 'Pick the right way to work with percentages.',
  },
  {
    id: 'percentOfWhole',
    label: 'Part & Whole',
    description: 'Find X% of Y or what % one number is of another.',
  },
  {
    id: 'percentChange',
    label: 'Percent change',
    description: 'See the percent increase or decrease between two values.',
  },
  {
    id: 'reversePercent',
    label: 'Original from change',
    description: 'You know the final value and percent change—find the starting point.',
  },
  {
    id: 'scenarios',
    label: 'Everyday scenarios',
    description: 'Quick tip, tax, and discount helpers.',
  },
]

function App() {
  const [activeMode, setActiveMode] = useState<CalculatorMode>('percentOfWhole')

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header-main">
          <h1 className="app-title">Percent Studio</h1>
          <p className="app-subtitle">
            A focused place to work with percentages from different angles — clean, visual, and
            easy to scan.
          </p>
        </div>
      </header>

      <main className="app-main">
        <section className="app-layout" aria-label="Percent calculators">
          <nav className="mode-nav" aria-label="Calculator modes">
            <h2 className="mode-nav-title">How do you want to think about percent?</h2>
            <ul className="mode-nav-list">
              {MODES.map((mode) => {
                const isActive = mode.id === activeMode
                return (
                  <li key={mode.id}>
                    <button
                      type="button"
                      className={isActive ? 'mode-pill mode-pill--active' : 'mode-pill'}
                      onClick={() => setActiveMode(mode.id)}
                      aria-pressed={isActive}
                    >
                      <span className="mode-pill-label">{mode.label}</span>
                      <span className="mode-pill-description">{mode.description}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>

          <section className="panel-area">
            <header className="panel-header">
              <h2 className="panel-title">
                {MODES.find((m) => m.id === activeMode)?.label ?? 'Percent calculator'}
              </h2>
              <p className="panel-help">
                Fill in the numbers, then press <strong>Calculate</strong>. You can move through
                fields with <kbd>Tab</kbd> and press <kbd>Enter</kbd> to run the calculation.
              </p>
            </header>

            <div className="panel-body" aria-live="polite">
              {activeMode === 'basic' && (
                <div className="panel-placeholder">
                  <p>
                    Choose a mode on the left to match how you&apos;re thinking about percent.
                    Each view gives you focused inputs and a clear explanation of the result.
                  </p>
                  <ul className="panel-list">
                    <li>
                      <strong>Part & whole</strong> – when you know a percent or a part of
                      something.
                    </li>
                    <li>
                      <strong>Percent change</strong> – see how much something grew or shrank.
                    </li>
                    <li>
                      <strong>Original value</strong> – recover the starting point from a final
                      value and a percent change.
                    </li>
                    <li>
                      <strong>Everyday</strong> – quick helpers for tips, discounts, and tax.
                    </li>
                  </ul>
                </div>
              )}
              {activeMode === 'percentOfWhole' && <PercentOfWholeCalculator />}
              {activeMode === 'percentChange' && <PercentChangeCalculator />}
              {activeMode === 'reversePercent' && <ReversePercentCalculator />}
              {activeMode === 'scenarios' && <EverydayScenariosCalculator />}
            </div>
          </section>
        </section>
      </main>

      <footer className="app-footer">
        <p>Designed to make percentages feel clear at a glance.</p>
      </footer>
    </div>
  )
}

export default App

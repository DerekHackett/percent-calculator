import type { FormEvent } from 'react'
import { useState } from 'react'
import { applyDiscount, applyTaxOrTip, formatNumber } from '../utils/percentMath'
import { CalculatorShell, NumericField } from './inputs'

type Scenario = 'tip' | 'discount' | 'tax'

interface ScenarioConfig {
  id: Scenario
  label: string
  description: string
  commonRates: number[]
}

const SCENARIOS: ScenarioConfig[] = [
  {
    id: 'tip',
    label: 'Tip',
    description: 'Restaurant or delivery tip.',
    commonRates: [15, 18, 20],
  },
  {
    id: 'discount',
    label: 'Discount',
    description: 'Sale or coupon on a price.',
    commonRates: [10, 20, 30],
  },
  {
    id: 'tax',
    label: 'Tax',
    description: 'Sales tax added at checkout.',
    commonRates: [5, 8, 10],
  },
]

export function EverydayScenariosCalculator() {
  const [scenario, setScenario] = useState<Scenario>('tip')
  const [base, setBase] = useState('')
  const [rate, setRate] = useState('20')
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [explanation, setExplanation] = useState<string | null>(null)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setError(null)
    setResult(null)
    setExplanation(null)

    try {
      const baseNumber = Number(base)
      const rateNumber = Number(rate)
      if (Number.isNaN(baseNumber) || Number.isNaN(rateNumber)) {
        throw new Error('Enter numbers for amount and rate.')
      }

      let total: number
      let label: string

      if (scenario === 'discount') {
        total = applyDiscount(baseNumber, rateNumber)
        label = 'after discount'
      } else {
        total = applyTaxOrTip(baseNumber, rateNumber)
        label = scenario === 'tip' ? 'including tip' : 'including tax'
      }

      setResult(formatNumber(total, 2))
      const scenarioLabel = SCENARIOS.find((s) => s.id === scenario)?.label ?? 'Rate'
      setExplanation(
        `${scenarioLabel} of ${formatNumber(rateNumber, 2)}% on ${formatNumber(
          baseNumber,
          2,
        )} gives a total of ${formatNumber(total, 2)} ${label}.`,
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Check your numbers.')
    }
  }

  const activeScenario = SCENARIOS.find((s) => s.id === scenario) ?? SCENARIOS[0]

  const resultNode =
    result && explanation ? (
      <div>
        <p className="result-primary">{result}</p>
        <p className="result-secondary">{explanation}</p>
      </div>
    ) : null

  return (
    <CalculatorShell
      title="Everyday scenarios"
      summary="Quick helpers for common real‑world percent cases like tips, discounts, and tax."
      onSubmit={handleSubmit}
      result={resultNode}
    >
      <div className="field-group field-group--toggle">
        {SCENARIOS.map((cfg) => {
          const isActive = cfg.id === scenario
          return (
            <button
              key={cfg.id}
              type="button"
              className={isActive ? 'segmented-button segmented-button--active' : 'segmented-button'}
              onClick={() => {
                setScenario(cfg.id)
                setRate(String(cfg.commonRates[0] ?? 10))
              }}
              aria-pressed={isActive}
            >
              <span>{cfg.label}</span>
              <span className="segmented-button-sub">{cfg.description}</span>
            </button>
          )
        })}
      </div>

      <NumericField
        id="base"
        label="Amount"
        value={base}
        onChange={setBase}
        placeholder="e.g., 48.50"
        helperText="Bill, price, or subtotal."
      />

      <div className="field field--inline-presets">
        <NumericField
          id="rate"
          label="Percent"
          value={rate}
          onChange={setRate}
          placeholder="e.g., 20"
          helperText="You can also pick a preset."
          error={error ?? undefined}
        />
        <div className="preset-chips" aria-label="Common rates">
          {activeScenario.commonRates.map((value) => (
            <button
              key={value}
              type="button"
              className={Number(rate) === value ? 'chip chip--active' : 'chip'}
              onClick={() => setRate(String(value))}
            >
              {value}%
            </button>
          ))}
        </div>
      </div>
    </CalculatorShell>
  )
}


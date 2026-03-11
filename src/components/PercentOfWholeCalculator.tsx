import type { FormEvent } from 'react'
import { useState } from 'react'
import { formatNumber, partAsPercent, percentOfWhole } from '../utils/percentMath'
import { CalculatorShell, NumericField } from './inputs'

export function PercentOfWholeCalculator() {
  const [percent, setPercent] = useState('')
  const [whole, setWhole] = useState('')
  const [part, setPart] = useState('')
  const [mode, setMode] = useState<'forward' | 'inverse'>('forward')
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [explanation, setExplanation] = useState<string | null>(null)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setError(null)
    setResult(null)
    setExplanation(null)

    try {
      if (mode === 'forward') {
        const pct = Number(percent)
        const wh = Number(whole)
        if (Number.isNaN(pct) || Number.isNaN(wh)) {
          throw new Error('Enter numbers for both percent and whole.')
        }
        const value = percentOfWhole(pct, wh)
        setResult(formatNumber(value, 4))
        setExplanation(`${formatNumber(pct, 4)}% of ${formatNumber(wh, 4)} is ${formatNumber(value, 4)}.`)
      } else {
        const prt = Number(part)
        const wh = Number(whole)
        if (Number.isNaN(prt) || Number.isNaN(wh)) {
          throw new Error('Enter numbers for both part and whole.')
        }
        const value = partAsPercent(prt, wh)
        setResult(`${formatNumber(value, 4)}%`)
        setExplanation(`${formatNumber(prt, 4)} is ${formatNumber(value, 4)}% of ${formatNumber(wh, 4)}.`)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Check your numbers.')
    }
  }

  const resultNode =
    result && explanation ? (
      <div>
        <p className="result-primary">{result}</p>
        <p className="result-secondary">{explanation}</p>
      </div>
    ) : null

  return (
    <CalculatorShell
      title="Part & whole"
      summary="Use this when you know either the percent and whole or the part and whole."
      onSubmit={handleSubmit}
      result={resultNode}
    >
      <div className="field-group field-group--toggle">
        <button
          type="button"
          className={mode === 'forward' ? 'segmented-button segmented-button--active' : 'segmented-button'}
          onClick={() => setMode('forward')}
          aria-pressed={mode === 'forward'}
        >
          Find part from percent
        </button>
        <button
          type="button"
          className={mode === 'inverse' ? 'segmented-button segmented-button--active' : 'segmented-button'}
          onClick={() => setMode('inverse')}
          aria-pressed={mode === 'inverse'}
        >
          Find percent from part
        </button>
      </div>

      {mode === 'forward' ? (
        <>
          <NumericField
            id="percent"
            label="Percent"
            value={percent}
            onChange={setPercent}
            placeholder="e.g., 20"
            helperText="How many percent?"
          />
          <NumericField
            id="whole"
            label="Whole"
            value={whole}
            onChange={setWhole}
            placeholder="e.g., 80"
            helperText="What are you taking a percent of?"
            error={error ?? undefined}
          />
        </>
      ) : (
        <>
          <NumericField
            id="part"
            label="Part"
            value={part}
            onChange={setPart}
            placeholder="e.g., 20"
            helperText="The portion you know."
          />
          <NumericField
            id="whole"
            label="Whole"
            value={whole}
            onChange={setWhole}
            placeholder="e.g., 80"
            helperText="The total amount."
            error={error ?? undefined}
          />
        </>
      )}
    </CalculatorShell>
  )
}


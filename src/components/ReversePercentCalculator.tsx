import type { FormEvent } from 'react'
import { useState } from 'react'
import { formatNumber, originalFromPercentChange, type PercentChangeDirection } from '../utils/percentMath'
import { CalculatorShell, NumericField } from './inputs'

export function ReversePercentCalculator() {
  const [finalValue, setFinalValue] = useState('')
  const [percentValue, setPercentValue] = useState('')
  const [direction, setDirection] = useState<Exclude<PercentChangeDirection, 'none'>>('increase')
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [explanation, setExplanation] = useState<string | null>(null)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setError(null)
    setResult(null)
    setExplanation(null)

    try {
      const finalNumber = Number(finalValue)
      const pct = Number(percentValue)
      if (Number.isNaN(finalNumber) || Number.isNaN(pct)) {
        throw new Error('Enter numbers for both final value and percent change.')
      }
      const original = originalFromPercentChange(finalNumber, pct, direction)
      setResult(formatNumber(original, 4))
      const label = direction === 'increase' ? 'increase' : 'decrease'
      setExplanation(
        `${formatNumber(original, 4)} with a ${formatNumber(pct, 4)}% ${label} becomes ${formatNumber(
          finalNumber,
          4,
        )}.`,
      )
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
      title="Original value from change"
      summary="Use this when you know the final value and the percent change and want to recover the starting point."
      onSubmit={handleSubmit}
      result={resultNode}
    >
      <div className="field-group field-group--toggle">
        <button
          type="button"
          className={direction === 'increase' ? 'segmented-button segmented-button--active' : 'segmented-button'}
          onClick={() => setDirection('increase')}
          aria-pressed={direction === 'increase'}
        >
          Final value after increase
        </button>
        <button
          type="button"
          className={direction === 'decrease' ? 'segmented-button segmented-button--active' : 'segmented-button'}
          onClick={() => setDirection('decrease')}
          aria-pressed={direction === 'decrease'}
        >
          Final value after decrease
        </button>
      </div>

      <NumericField
        id="final-reverse"
        label="Final value"
        value={finalValue}
        onChange={setFinalValue}
        placeholder="e.g., 120"
        helperText="The number you currently have."
      />
      <NumericField
        id="percent-reverse"
        label="Percent change"
        value={percentValue}
        onChange={setPercentValue}
        placeholder="e.g., 20"
        helperText="How much it went up or down in percent."
        error={error ?? undefined}
      />
    </CalculatorShell>
  )
}


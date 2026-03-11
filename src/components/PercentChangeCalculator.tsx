import type { FormEvent } from 'react'
import { useState } from 'react'
import { formatNumber, percentChange } from '../utils/percentMath'
import { CalculatorShell, NumericField } from './inputs'

export function PercentChangeCalculator() {
  const [original, setOriginal] = useState('')
  const [finalValue, setFinalValue] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [explanation, setExplanation] = useState<string | null>(null)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setError(null)
    setResult(null)
    setExplanation(null)

    try {
      const start = Number(original)
      const end = Number(finalValue)
      if (Number.isNaN(start) || Number.isNaN(end)) {
        throw new Error('Enter numbers for both starting and ending values.')
      }
      const change = percentChange(start, end)
      if (change.direction === 'none') {
        setResult('0%')
        setExplanation('No change between the two values.')
      } else {
        const label = change.direction === 'increase' ? 'increase' : 'decrease'
        const valueText = `${formatNumber(change.value, 4)}%`
        setResult(valueText)
        setExplanation(
          `${formatNumber(start, 4)} to ${formatNumber(end, 4)} is a ${valueText} ${label}.`,
        )
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
      title="Percent change"
      summary="Use this when you know a starting value and an ending value and want the percent difference."
      onSubmit={handleSubmit}
      result={resultNode}
    >
      <NumericField
        id="original"
        label="Starting value"
        value={original}
        onChange={setOriginal}
        placeholder="e.g., 80"
        helperText="Where you began."
      />
      <NumericField
        id="final"
        label="Ending value"
        value={finalValue}
        onChange={setFinalValue}
        placeholder="e.g., 100"
        helperText="Where you ended."
        error={error ?? undefined}
      />
    </CalculatorShell>
  )
}


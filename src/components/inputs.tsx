import type { ChangeEvent, FormEvent } from 'react'

export interface NumericFieldProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  helperText?: string
  error?: string
  autoFocus?: boolean
}

export function NumericField({
  id,
  label,
  value,
  onChange,
  placeholder,
  helperText,
  error,
  autoFocus,
}: NumericFieldProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  const describedById = error ? `${id}-error` : helperText ? `${id}-helper` : undefined

  return (
    <div className="field">
      <label className="field-label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className={error ? 'field-input field-input--error' : 'field-input'}
        inputMode="decimal"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={describedById}
        autoFocus={autoFocus}
      />
      {helperText && !error ? (
        <p id={`${id}-helper`} className="field-helper">
          {helperText}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export interface CalculatorShellProps {
  title: string
  summary: string
  onSubmit: (event: FormEvent) => void
  children: React.ReactNode
  result?: React.ReactNode
}

export function CalculatorShell({ title, summary, onSubmit, children, result }: CalculatorShellProps) {
  return (
    <form className="calc-shell" onSubmit={onSubmit}>
      <div className="calc-shell-main">
        <div className="calc-shell-header">
          <h3 className="calc-shell-title">{title}</h3>
          <p className="calc-shell-summary">{summary}</p>
        </div>
        <div className="calc-shell-grid">{children}</div>
      </div>
      <div className="calc-shell-footer">
        <button type="submit" className="primary-button">
          Calculate
        </button>
        {result ? <div className="calc-shell-result">{result}</div> : null}
      </div>
    </form>
  )
}


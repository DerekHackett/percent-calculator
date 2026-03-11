export type PercentChangeDirection = 'increase' | 'decrease' | 'none'

export interface PercentChangeResult {
  value: number
  direction: PercentChangeDirection
}

export function percentOfWhole(percent: number, whole: number): number {
  if (!Number.isFinite(percent) || !Number.isFinite(whole)) {
    throw new Error('Percent and whole must be finite numbers.')
  }
  return (whole * percent) / 100
}

export function partAsPercent(part: number, whole: number): number {
  if (!Number.isFinite(part) || !Number.isFinite(whole)) {
    throw new Error('Part and whole must be finite numbers.')
  }
  if (whole === 0) {
    throw new Error('Cannot compute percentage of a zero whole.')
  }
  return (part / whole) * 100
}

export function percentChange(original: number, final: number): PercentChangeResult {
  if (!Number.isFinite(original) || !Number.isFinite(final)) {
    throw new Error('Original and final must be finite numbers.')
  }
  if (original === 0) {
    if (final === 0) {
      return { value: 0, direction: 'none' }
    }
    throw new Error('Cannot compute percent change from zero to a non-zero value.')
  }
  const raw = ((final - original) / Math.abs(original)) * 100
  if (raw === 0) {
    return { value: 0, direction: 'none' }
  }
  return {
    value: Math.abs(raw),
    direction: raw > 0 ? 'increase' : 'decrease',
  }
}

export function originalFromPercentChange(
  final: number,
  percentChangeValue: number,
  direction: Exclude<PercentChangeDirection, 'none'>,
): number {
  if (!Number.isFinite(final) || !Number.isFinite(percentChangeValue)) {
    throw new Error('Final and percent change must be finite numbers.')
  }

  const factor = percentChangeValue / 100

  if (direction === 'increase') {
    if (factor === -1) {
      throw new Error('Invalid percent increase.')
    }
    return final / (1 + factor)
  }

  if (direction === 'decrease') {
    if (factor === 1) {
      throw new Error('Original value would be infinite.')
    }
    return final / (1 - factor)
  }

  throw new Error('Unsupported direction for originalFromPercentChange.')
}

export function applyDiscount(original: number, discountPercent: number): number {
  if (!Number.isFinite(original) || !Number.isFinite(discountPercent)) {
    throw new Error('Original and discount must be finite numbers.')
  }
  const clamped = Math.max(0, Math.min(discountPercent, 100))
  return original * (1 - clamped / 100)
}

export function applyTaxOrTip(original: number, ratePercent: number): number {
  if (!Number.isFinite(original) || !Number.isFinite(ratePercent)) {
    throw new Error('Original and rate must be finite numbers.')
  }
  return original * (1 + ratePercent / 100)
}

export function formatNumber(value: number, maxFractionDigits = 4): string {
  if (!Number.isFinite(value)) {
    return '—'
  }
  const formatted = value.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxFractionDigits,
  })
  return formatted
}


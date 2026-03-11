import {
  applyDiscount,
  applyTaxOrTip,
  formatNumber,
  originalFromPercentChange,
  partAsPercent,
  percentChange,
  percentOfWhole,
} from './percentMath'

describe('percentOfWhole', () => {
  it('computes a simple percentage of a whole', () => {
    expect(percentOfWhole(25, 80)).toBe(20)
  })

  it('handles zero percent', () => {
    expect(percentOfWhole(0, 123)).toBe(0)
  })
})

describe('partAsPercent', () => {
  it('computes what percent a part is of a whole', () => {
    expect(partAsPercent(20, 80)).toBe(25)
  })

  it('throws when whole is zero', () => {
    expect(() => partAsPercent(10, 0)).toThrow(/zero whole/i)
  })
})

describe('percentChange', () => {
  it('returns increase with correct value', () => {
    const result = percentChange(80, 100)
    expect(result.direction).toBe('increase')
    expect(result.value).toBeCloseTo(25)
  })

  it('returns decrease with correct value', () => {
    const result = percentChange(100, 80)
    expect(result.direction).toBe('decrease')
    expect(result.value).toBeCloseTo(20)
  })

  it('handles no change', () => {
    const result = percentChange(50, 50)
    expect(result.direction).toBe('none')
    expect(result.value).toBe(0)
  })

  it('throws when original is zero and final non-zero', () => {
    expect(() => percentChange(0, 10)).toThrow(/percent change from zero/i)
  })
})

describe('originalFromPercentChange', () => {
  it('finds original from an increase', () => {
    const original = originalFromPercentChange(120, 20, 'increase')
    expect(original).toBeCloseTo(100)
  })

  it('finds original from a decrease', () => {
    const original = originalFromPercentChange(80, 20, 'decrease')
    expect(original).toBeCloseTo(100)
  })
})

describe('applyDiscount', () => {
  it('applies a basic discount', () => {
    expect(applyDiscount(100, 20)).toBe(80)
  })

  it('clamps discount to 0–100%', () => {
    expect(applyDiscount(100, 200)).toBe(0)
    expect(applyDiscount(100, -10)).toBe(100)
  })
})

describe('applyTaxOrTip', () => {
  it('applies a simple increase', () => {
    expect(applyTaxOrTip(100, 20)).toBe(120)
  })
})

describe('formatNumber', () => {
  it('formats numbers with sensible decimals', () => {
    expect(formatNumber(12.34567, 2)).toMatch(/12.35/)
  })

  it('returns dash for non-finite values', () => {
    expect(formatNumber(Number.NaN)).toBe('—')
  })
})


export function toCurrency(input: number | undefined | null) {
  if (input === undefined || input === null) return 'N/A'

  return `$${input.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

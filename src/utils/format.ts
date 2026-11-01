export const EMPTY_VALUE = '—'

const LOCALE = 'ru-RU'

export const priceFormat = new Intl.NumberFormat(LOCALE, { style: 'currency', currency: 'USD' })
export const percentFormat = new Intl.NumberFormat(LOCALE, {
  style: 'percent',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})
export const integerFormat = new Intl.NumberFormat(LOCALE, { maximumFractionDigits: 0 })
export const ratingFormat = new Intl.NumberFormat(LOCALE, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})
export const numberFormat = new Intl.NumberFormat(LOCALE)
export const dateTimeFormat = new Intl.DateTimeFormat(LOCALE, {
  dateStyle: 'medium',
  timeStyle: 'short',
})
export const dateFormat = new Intl.DateTimeFormat(LOCALE, { dateStyle: 'medium' })

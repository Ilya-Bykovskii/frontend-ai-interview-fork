import type { Product } from '../types.ts'

export const productSortFields = [
  'title',
  'price',
  'discountPercentage',
  'stock',
  'rating',
] as const satisfies readonly (keyof Product)[]

export type ProductSortField = (typeof productSortFields)[number]

export type SortOrder = 'asc' | 'desc'

export type ProductSort = { field: ProductSortField; order: SortOrder }

function isSortField(value: string | null): value is ProductSortField {
  return productSortFields.some((field) => field === value)
}

// Both values must be known, otherwise there is no sorting
export function parseSort(field: string | null, order: string | null): ProductSort | null {
  if (!isSortField(field) || (order !== 'asc' && order !== 'desc')) return null
  return { field, order }
}

// asc → desc → no sorting; another column starts from asc
export function nextSort(current: ProductSort | null, field: ProductSortField): ProductSort | null {
  if (current?.field !== field) return { field, order: 'asc' }
  if (current.order === 'asc') return { field, order: 'desc' }
  return null
}

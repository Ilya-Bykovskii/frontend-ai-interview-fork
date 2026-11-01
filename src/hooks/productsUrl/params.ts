// A new URL parameter is added in three places: PARAM, parseProductsUrl and toCanonicalParams
export const PARAM = {
  q: 'q',
  category: 'category',
  sortBy: 'sortBy',
  order: 'order',
  productId: 'productId',
} as const

export function setOrDelete(params: URLSearchParams, name: string, value: string | null) {
  if (value) params.set(name, value)
  else params.delete(name)
}

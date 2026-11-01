import { PARAM, setOrDelete } from './params.ts'
import type { ProductsUrlState } from './parse.ts'

// Unknown parameter names are kept as is. Unknown values of known parameters and
// default values are removed. A pending category is kept until it can be validated.
export function toCanonicalParams(params: URLSearchParams, state: ProductsUrlState) {
  const next = new URLSearchParams(params)
  setOrDelete(next, PARAM.q, state.filters.q)
  if (!state.categoryPending) setOrDelete(next, PARAM.category, state.filters.category)
  setOrDelete(next, PARAM.sortBy, state.filters.sort?.field ?? null)
  setOrDelete(next, PARAM.order, state.filters.sort?.order ?? null)
  setOrDelete(next, PARAM.productId, state.productId === null ? null : String(state.productId))
  return next
}

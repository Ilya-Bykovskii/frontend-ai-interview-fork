import { useEffect, useRef } from 'react'
import { useLocation, useNavigationType, useSearchParams } from 'react-router'
import { useAppSelector } from '../store.ts'
import { selectCategoryList } from '../../entities/category/slice.ts'
import type { ProductSort } from '../../entities/product/list/sort.ts'
import { toCanonicalParams } from './canonical.ts'
import { PARAM, setOrDelete } from './params.ts'
import { parseProductsUrl } from './parse.ts'

// Owns the products URL: parsing, normalization and history policy. Call once per page.
export function useProductsUrlState() {
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryList = useAppSelector(selectCategoryList)
  const location = useLocation()
  const navigationType = useNavigationType()
  // The first search change in a typing series creates a history entry, the next ones replace it
  const searchSeries = useRef(false)

  const state = parseProductsUrl(searchParams, categoryList)
  const current = searchParams.toString()
  const canonical = toCanonicalParams(searchParams, state).toString()

  useEffect(() => {
    if (canonical !== current) setSearchParams(new URLSearchParams(canonical), { replace: true })
  }, [canonical, current, setSearchParams])

  useEffect(() => {
    if (navigationType === 'POP') searchSeries.current = false
  }, [location.key, navigationType])

  const update = (mutate: (params: URLSearchParams) => void, replace: boolean) => {
    setSearchParams(
      (params) => {
        const next = new URLSearchParams(params)
        mutate(next)
        return next
      },
      { replace },
    )
  }

  const endSearchSeries = () => {
    searchSeries.current = false
  }

  return {
    filters: state.filters,
    // `null` while the category from the URL cannot be validated yet
    listQuery: state.categoryPending ? null : state.filters,
    productId: state.productId,
    setSearch: (q: string) => {
      update((params) => setOrDelete(params, PARAM.q, q), searchSeries.current)
      searchSeries.current = true
    },
    endSearchSeries,
    setCategory: (category: string | null) => {
      endSearchSeries()
      update((params) => setOrDelete(params, PARAM.category, category), false)
    },
    setSort: (sort: ProductSort | null) => {
      endSearchSeries()
      update((params) => {
        setOrDelete(params, PARAM.sortBy, sort?.field ?? null)
        setOrDelete(params, PARAM.order, sort?.order ?? null)
      }, false)
    },
    openProduct: (id: number) => update((params) => params.set(PARAM.productId, String(id)), true),
    closeProduct: () => update((params) => params.delete(PARAM.productId), true),
  }
}

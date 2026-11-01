import type { CategoryListState } from '../../entities/category/slice.ts'
import { parseSort } from '../../entities/product/list/sort.ts'
import type { ProductListQuery } from '../../entities/product/list/types.ts'
import { PARAM } from './params.ts'

type CategoryList = Pick<CategoryListState, 'items' | 'status'>

export type ProductsUrlState = {
  filters: ProductListQuery
  productId: number | null
  // A category from the URL can be validated only after the category list is loaded
  categoryPending: boolean
}

function parseProductId(value: string | null): number | null {
  if (!value) return null
  const id = Number(value)
  return Number.isInteger(id) && id > 0 ? id : null
}

function parseCategory(value: string | null, categoryList: CategoryList) {
  if (!value) return { category: null, categoryPending: false }
  switch (categoryList.status) {
    case 'succeeded':
      return {
        category: categoryList.items.includes(value) ? value : null,
        categoryPending: false,
      }
    // Without the list the value cannot be checked, so it is used as is
    case 'failed':
      return { category: value, categoryPending: false }
    default:
      return { category: value, categoryPending: true }
  }
}

export function parseProductsUrl(
  params: URLSearchParams,
  categoryList: CategoryList,
): ProductsUrlState {
  const { category, categoryPending } = parseCategory(params.get(PARAM.category), categoryList)
  return {
    filters: {
      q: (params.get(PARAM.q) ?? '').trim(),
      category,
      sort: parseSort(params.get(PARAM.sortBy), params.get(PARAM.order)),
    },
    productId: parseProductId(params.get(PARAM.productId)),
    categoryPending,
  }
}

import { createAsyncThunk } from '@reduxjs/toolkit'
import { getProducts, getProductsByCategory, searchProducts } from '../../../api/products.ts'
import { PRODUCT_LIST_LIMIT } from './constants.ts'
import type { ProductSort } from './sort.ts'
import type { ProductListItem, ProductListQuery } from './types.ts'

type SearchInCategoryParams = { q: string; category: string; sort: ProductSort | null }

// /products/search ignores the category, so all matches are loaded and filtered here.
// A server page (skip) cannot be applied to this branch without a new API.
async function searchInCategory(
  { q, category, sort }: SearchInCategoryParams,
  signal: AbortSignal,
): Promise<ProductListItem[]> {
  const { products } = await searchProducts(q, { limit: 0, sort }, signal)
  return products.filter((product) => product.category === category).slice(0, PRODUCT_LIST_LIMIT)
}

export const fetchProductList = createAsyncThunk(
  'productList/fetch',
  async ({ q, category, sort }: ProductListQuery, { signal }): Promise<ProductListItem[]> => {
    if (q && category) return searchInCategory({ q, category, sort }, signal)

    const options = { limit: PRODUCT_LIST_LIMIT, sort }
    const response = q
      ? await searchProducts(q, options, signal)
      : category
        ? await getProductsByCategory(category, options, signal)
        : await getProducts(options, signal)
    return response.products
  },
)

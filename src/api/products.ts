import { request } from './http.ts'
import { productListFields } from '../entities/product/list/constants.ts'
import type { ProductListItem } from '../entities/product/list/types.ts'
import type { ProductSort } from '../entities/product/list/sort.ts'
import type { Product } from '../entities/product/types.ts'

export type ProductListOptions = {
  // 0 returns all matches
  limit: number
  sort: ProductSort | null
}

type ProductListResponse<T> = {
  products: T[]
  total: number
  skip: number
  limit: number
}

type ProductListPage = ProductListResponse<ProductListItem>

function buildListQuery({ limit, sort }: ProductListOptions, params: Record<string, string> = {}) {
  const query = new URLSearchParams({
    ...params,
    limit: String(limit),
    select: productListFields.join(','),
  })
  if (sort) {
    query.set('sortBy', sort.field)
    query.set('order', sort.order)
  }
  return query
}

export function getProducts(options: ProductListOptions, signal?: AbortSignal) {
  return request<ProductListPage>(`/products?${buildListQuery(options)}`, signal)
}

export function searchProducts(q: string, options: ProductListOptions, signal?: AbortSignal) {
  return request<ProductListPage>(`/products/search?${buildListQuery(options, { q })}`, signal)
}

export function getProductsByCategory(
  category: string,
  options: ProductListOptions,
  signal?: AbortSignal,
) {
  return request<ProductListPage>(
    `/products/category/${encodeURIComponent(category)}?${buildListQuery(options)}`,
    signal,
  )
}

export function getProduct(id: number, signal?: AbortSignal) {
  return request<Product>(`/products/${id}`, signal)
}

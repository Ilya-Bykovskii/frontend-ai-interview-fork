import type { Product } from '../types.ts'
import { productListFields } from './constants.ts'
import type { ProductSort } from './sort.ts'


// The API always returns `id`, even when it is not listed in `select`
export type ProductListItem = Pick<Product, 'id' | (typeof productListFields)[number]>

export type ProductListQuery = {
  q: string
  category: string | null
  sort: ProductSort | null
}

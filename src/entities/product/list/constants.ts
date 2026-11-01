import type { Product } from '../types.ts'

export const PRODUCT_LIST_LIMIT = 20

export const productListFields = [
    'title',
    'category',
    'brand',
    'price',
    'discountPercentage',
    'stock',
    'availabilityStatus',
    'rating',
] as const satisfies readonly (keyof Product)[]
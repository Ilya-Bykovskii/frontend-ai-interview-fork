import type { ChipProps } from '@mui/material'
import type { AvailabilityStatus } from '../entities/product/types.ts'

export const availabilityLabel: Record<AvailabilityStatus, string> = {
  'In Stock': 'В наличии',
  'Low Stock': 'Заканчивается',
  'Out of Stock': 'Нет в наличии',
}

export const availabilityColor: Record<AvailabilityStatus, ChipProps['color']> = {
  'In Stock': 'success',
  'Low Stock': 'warning',
  'Out of Stock': 'error',
}

// "home-decoration" → "Home decoration"
export function formatCategoryName(slug: string) {
  const text = slug.replaceAll('-', ' ')
  return text.charAt(0).toUpperCase() + text.slice(1)
}

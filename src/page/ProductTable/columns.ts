import type { ProductSortField } from '../../entities/product/list/sort.ts'

type Column = {
  label: string
  numeric: boolean
  // `undefined` lets the column take the remaining width
  width?: number
  sortField?: ProductSortField
}

// Cells of ProductTableRow follow the same order
export const columns: Column[] = [
  { label: 'Название', numeric: false, sortField: 'title' },
  { label: 'Категория', numeric: false, width: 140 },
  { label: 'Бренд', numeric: false, width: 140 },
  { label: 'Цена', numeric: true, width: 120, sortField: 'price' },
  { label: 'Скидка', numeric: true, width: 120, sortField: 'discountPercentage' },
  { label: 'Остаток', numeric: true, width: 125, sortField: 'stock' },
  { label: 'Статус', numeric: false, width: 140 },
  { label: 'Рейтинг', numeric: true, width: 125, sortField: 'rating' },
]

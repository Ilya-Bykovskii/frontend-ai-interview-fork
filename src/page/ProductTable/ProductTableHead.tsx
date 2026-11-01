import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material'
import { nextSort } from '../../entities/product/list/sort.ts'
import type { ProductSort } from '../../entities/product/list/sort.ts'
import { columns } from './columns.ts'

type ProductTableHeadProps = {
  sort: ProductSort | null
  onSortChange: (sort: ProductSort | null) => void
}

export default function ProductTableHead({ sort, onSortChange }: ProductTableHeadProps) {
  return (
    <TableHead>
      <TableRow>
        {columns.map(({ label, numeric, width, sortField }) => {
          const isActive = sortField !== undefined && sort?.field === sortField
          const direction = isActive && sort ? sort.order : 'asc'
          return (
            <TableCell
              key={label}
              align={numeric ? 'right' : 'left'}
              sortDirection={isActive ? direction : false}
              sx={{ width }}
            >
              {sortField ? (
                <TableSortLabel
                  active={isActive}
                  direction={direction}
                  onClick={() => onSortChange(nextSort(sort, sortField))}
                >
                  {label}
                </TableSortLabel>
              ) : (
                label
              )}
            </TableCell>
          )
        })}
      </TableRow>
    </TableHead>
  )
}

import { Skeleton, TableBody, TableCell, TableRow } from '@mui/material'
import { PRODUCT_LIST_LIMIT } from '../../entities/product/list/constants.ts'
import { columns } from './columns.ts'
import ProductTableRow from './ProductTableRow.tsx'
import { useProductListView } from './useProductListView.ts'

type ProductTableBodyProps = {
  onOpenProduct: (id: number) => void
}

export default function ProductTableBody({ onOpenProduct }: ProductTableBodyProps) {
  const { keys, isLoading, showSkeleton, isRefreshing, isEmpty } = useProductListView()

  return (
    <TableBody
      aria-busy={isLoading}
      sx={{ opacity: isRefreshing ? 0.5 : 1, transition: 'opacity 150ms' }}
    >
      {showSkeleton &&
        Array.from({ length: PRODUCT_LIST_LIMIT }, (_, index) => (
          <TableRow key={index}>
            {columns.map((column) => (
              <TableCell key={column.label}>
                <Skeleton />
              </TableCell>
            ))}
          </TableRow>
        ))}

      {isEmpty && (
        <TableRow>
          <TableCell colSpan={columns.length} align="center" sx={{ py: 6 }}>
            Ничего не найдено
          </TableCell>
        </TableRow>
      )}

      {keys.map((key) => (
        <ProductTableRow key={key} productKey={key} onOpen={onOpenProduct} />
      ))}
    </TableBody>
  )
}

import { Alert, Box, Button, LinearProgress, Stack, Table, TableContainer } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../hooks/store.ts'
import { useLatestRequest } from '../../hooks/useLatestRequest.ts'
import { selectProductListError } from '../../entities/product/list/slice.ts'
import { fetchProductList } from '../../entities/product/list/thunks.ts'
import type { ProductSort } from '../../entities/product/list/sort.ts'
import type { ProductListQuery } from '../../entities/product/list/types.ts'
import { errorText } from '../../utils/errorText.ts'
import ProductTableBody from './ProductTableBody.tsx'
import ProductTableHead from './ProductTableHead.tsx'
import { useProductListView } from './useProductListView.ts'

type ProductTableProps = {
  // `null` while the query cannot be built yet; no request is sent
  query: ProductListQuery | null
  sort: ProductSort | null
  onSortChange: (sort: ProductSort | null) => void
  onOpenProduct: (id: number) => void
}

export default function ProductTable({
  query,
  sort,
  onSortChange,
  onOpenProduct,
}: ProductTableProps) {
  const dispatch = useAppDispatch()
  const error = useAppSelector(selectProductListError)
  const { status, isRefreshing } = useProductListView()

  const retry = useLatestRequest(query, (nextQuery) => dispatch(fetchProductList(nextQuery)))

  return (
    <Stack spacing={1}>
      {status === 'failed' && (
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={retry}>
              Повторить
            </Button>
          }
        >
          {errorText(error?.status ?? null, 'Не удалось загрузить товары')}
        </Alert>
      )}

      <Box>
        <Box sx={{ height: 4 }}>
          {isRefreshing && <LinearProgress aria-label="Загрузка товаров" />}
        </Box>
        <TableContainer>
          <Table
            size="small"
            sx={{
              tableLayout: 'fixed',
              width: '100%',
              minWidth: 1120,
              '& td, & th': { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
            }}
          >
            <ProductTableHead sort={sort} onSortChange={onSortChange} />
            <ProductTableBody onOpenProduct={onOpenProduct} />
          </Table>
        </TableContainer>
      </Box>
    </Stack>
  )
}

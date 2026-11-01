import { Container, Stack, Typography } from '@mui/material'
import { useProductsUrlState } from '../hooks/productsUrl/useProductsUrlState.ts'
import ProductFilters from './ProductFilters.tsx'
import ProductTable from './ProductTable/index.tsx'
import { focusProductRow } from './ProductTable/focusProductRow.ts'
import ProductDetailsDialog from './ProductDetailsDialog/index.tsx'

// Owns the URL and focus; each component loads and reads its own data
export default function ProductsPage() {
  const url = useProductsUrlState()

  return (
    <Container sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Typography variant="h4" component="h1">
          Товары
        </Typography>
        <ProductFilters
          q={url.filters.q}
          category={url.filters.category}
          onSearchChange={url.setSearch}
          onSearchBlur={url.endSearchSeries}
          onCategoryChange={url.setCategory}
        />
        <ProductTable
          query={url.listQuery}
          sort={url.filters.sort}
          onSortChange={url.setSort}
          onOpenProduct={url.openProduct}
        />
      </Stack>
      <ProductDetailsDialog
        productId={url.productId}
        onClose={url.closeProduct}
        onExited={focusProductRow}
      />
    </Container>
  )
}

import { useState } from 'react'
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../hooks/store.ts'
import { useLatestRequest } from '../../hooks/useLatestRequest.ts'
import { selectProductDetails } from '../../entities/product/details/slice.ts'
import { fetchProductDetails } from '../../entities/product/details/thunks.ts'
import { errorText } from '../../utils/errorText.ts'
import ProductDetails from './ProductDetails.tsx'

type ProductDetailsDialogProps = {
  // `null` closes the dialog
  productId: number | null
  onClose: () => void
  // Called with the shown product after the close transition, when the page is focusable again
  onExited: (productId: number) => void
}

export default function ProductDetailsDialog({
  productId,
  onClose,
  onExited,
}: ProductDetailsDialogProps) {
  const dispatch = useAppDispatch()

  // Keeps the last opened product while the dialog plays its close transition
  const [shownProductId, setShownProductId] = useState(productId)
  if (productId !== null && productId !== shownProductId) {
    setShownProductId(productId)
  }
  const entry = useAppSelector((state) => selectProductDetails(state, shownProductId))
  const item = entry?.item ?? null

  const retry = useLatestRequest(productId, (id) => dispatch(fetchProductDetails(id)))

  return (
    <Dialog
      open={productId !== null}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll="paper"
      aria-labelledby="product-details-title"
      disableRestoreFocus
      slotProps={{
        transition: {
          onExited: () => {
            if (shownProductId !== null) onExited(shownProductId)
          },
        },
      }}
    >
      <DialogTitle id="product-details-title">{item?.title ?? 'Товар'}</DialogTitle>
      <DialogContent dividers>
        {entry?.status === 'failed' ? (
          <Alert
            severity="error"
            action={
              <Button color="inherit" size="small" onClick={retry}>
                Повторить
              </Button>
            }
          >
            {errorText(entry.error?.status ?? null, 'Не удалось загрузить товар', 'Товар не найден')}
          </Alert>
        ) : item ? (
          <ProductDetails product={item} />
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress aria-label="Загрузка товара" />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Закрыть</Button>
      </DialogActions>
    </Dialog>
  )
}

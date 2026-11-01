import { createAsyncThunk } from '@reduxjs/toolkit'
import { getProduct } from '../../../api/products.ts'
import type { RootState } from '../../../store/index.ts'

export const fetchProductDetails = createAsyncThunk(
  'productDetails/fetch',
  (id: number, { signal }) => getProduct(id, signal),
  {
    condition: (id, { getState }) => {
      const entry = (getState() as RootState).productDetails.entities[String(id)]
      return entry === undefined || entry.status === 'failed'
    },
  },
)

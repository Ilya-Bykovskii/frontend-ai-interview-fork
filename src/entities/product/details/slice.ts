import { createSlice } from '@reduxjs/toolkit'
import type { Product } from '../types.ts'
import { fetchProductDetails } from './thunks.ts'

import { toRequestError } from '../../../utils/requestError.ts'
import type { RequestError } from '../../../utils/requestError.ts'

export type ProductDetailsEntry = {
  item: Product | null
  status: 'loading' | 'succeeded' | 'failed'
  error: RequestError | null
}

type ProductDetailsState = {
  // Cache by product id: a loaded product is shown again without a new request
  entities: Record<string, ProductDetailsEntry>
}

const initialState: ProductDetailsState = {
  entities: {},
}

export const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetails.pending, (state, action) => {
        state.entities[String(action.meta.arg)] = { item: null, status: 'loading', error: null }
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.entities[String(action.meta.arg)] = {
          item: action.payload,
          status: 'succeeded',
          error: null,
        }
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        const key = String(action.meta.arg)
        // An aborted request leaves no entry, so the next open starts a new one
        if (action.meta.aborted) {
          delete state.entities[key]
          return
        }
        state.entities[key] = { item: null, status: 'failed', error: toRequestError(action.error) }
      })
  },
  selectors: {
    selectProductDetails: (state, id: number | null): ProductDetailsEntry | undefined =>
      id === null ? undefined : state.entities[String(id)],
  },
})

export const { selectProductDetails } = productDetailsSlice.selectors

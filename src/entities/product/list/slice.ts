import { createSlice } from '@reduxjs/toolkit'
import { fetchProductList } from './thunks.ts'
import type { ProductListItem } from './types.ts'

import { toRequestError } from '../../../utils/requestError.ts'
import type { RequestError } from '../../../utils/requestError.ts'

type ProductListState = {
  entities: Record<string, ProductListItem>
  // Order of products as returned by the API
  keys: string[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: RequestError | null
}

const initialState: ProductListState = {
  entities: {},
  keys: [],
  status: 'idle',
  error: null,
}

export const productListSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductList.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchProductList.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.entities = {}
        state.keys = []
        for (const product of action.payload) {
          const key = String(product.id)
          state.entities[key] = product
          state.keys.push(key)
        }
      })
      .addCase(fetchProductList.rejected, (state, action) => {
        // Aborted requests are superseded by a newer one that is already pending
        if (action.meta.aborted) return
        state.status = 'failed'
        state.error = toRequestError(action.error)
      })
  },
  selectors: {
    selectProductListKeys: (state) => state.keys,
    selectProductListItem: (state, key: string) => state.entities[key],
    selectProductListStatus: (state) => state.status,
    selectProductListError: (state) => state.error,
  },
})

export const {
  selectProductListKeys,
  selectProductListItem,
  selectProductListStatus,
  selectProductListError,
} = productListSlice.selectors

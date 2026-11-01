import { createSlice } from '@reduxjs/toolkit'
import { fetchCategoryList } from './thunks.ts'

import { toRequestError } from '../../utils/requestError.ts'
import type { RequestError } from '../../utils/requestError.ts'

export type CategoryListState = {
  // Category slugs, e.g. "home-decoration"
  items: string[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: RequestError | null
}

const initialState: CategoryListState = {
  items: [],
  status: 'idle',
  error: null,
}

export const categoryListSlice = createSlice({
  name: 'categoryList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryList.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchCategoryList.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchCategoryList.rejected, (state, action) => {
        if (action.meta.aborted) return
        state.status = 'failed'
        state.error = toRequestError(action.error)
      })
  },
  selectors: {
    selectCategoryList: (state) => state,
  },
})

export const { selectCategoryList } = categoryListSlice.selectors

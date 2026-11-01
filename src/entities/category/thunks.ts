import { createAsyncThunk } from '@reduxjs/toolkit'
import { getCategoryList } from '../../api/categories.ts'
import type { RootState } from '../../store/index.ts'

export const fetchCategoryList = createAsyncThunk(
  'categoryList/fetch',
  (_: void, { signal }) => getCategoryList(signal),
  {
    condition: (_, { getState }) => {
      const { status } = (getState() as RootState).categoryList
      return status === 'idle' || status === 'failed'
    },
  },
)

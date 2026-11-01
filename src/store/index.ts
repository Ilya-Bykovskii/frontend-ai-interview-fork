import { combineSlices, configureStore } from '@reduxjs/toolkit'
import { productListSlice } from '../entities/product/list/slice.ts'
import { productDetailsSlice } from '../entities/product/details/slice.ts'
import { categoryListSlice } from '../entities/category/slice.ts'

const rootReducer = combineSlices(productListSlice, productDetailsSlice, categoryListSlice)

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

import { useAppSelector } from '../../hooks/store.ts'
import {
  selectProductListKeys,
  selectProductListStatus,
} from '../../entities/product/list/slice.ts'

export function useProductListView() {
  const keys = useAppSelector(selectProductListKeys)
  const status = useAppSelector(selectProductListStatus)
  const isLoading = status === 'idle' || status === 'loading'

  return {
    keys,
    status,
    isLoading,
    showSkeleton: isLoading && keys.length === 0,
    // Old rows stay on screen while a new request is in flight
    isRefreshing: status === 'loading' && keys.length > 0,
    isEmpty: status === 'succeeded' && keys.length === 0,
  }
}

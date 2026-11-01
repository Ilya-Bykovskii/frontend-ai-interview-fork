import { request } from './http.ts'

export function getCategoryList(signal?: AbortSignal) {
  return request<string[]>('/products/category-list', signal)
}

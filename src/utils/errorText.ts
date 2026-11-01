// `status` is the HTTP status, 0 for a network error, `null` when unknown
export function errorText(status: number | null, fallback: string, notFound = fallback) {
  if (status === 0) return 'Не удалось связаться с сервером'
  if (status === 404) return notFound
  if (status !== null && status >= 500) return 'Сервер временно недоступен'
  return fallback
}

const BASE_URL = 'https://dummyjson.com'

type ApiError = { message: string }

export class ApiRequestError extends Error {
  status: number
  // Kept by RTK when a thunk rejects, so the status survives error serialization
  code: string

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiRequestError'
    this.status = status
    this.code = String(status)
  }
}

// Status 0 means the request did not reach the server
export async function request<T>(path: string, signal?: AbortSignal): Promise<T> {
  let response: Response
  try {
    response = await fetch(`${BASE_URL}${path}`, { signal })
  } catch (error) {
    if (signal?.aborted) throw error
    throw new ApiRequestError('Network error', 0)
  }

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as ApiError | null
    throw new ApiRequestError(
      body?.message ?? `Request failed with status ${response.status}`,
      response.status,
    )
  }

  return (await response.json()) as T
}

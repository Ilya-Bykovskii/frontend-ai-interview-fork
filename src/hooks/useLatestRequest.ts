import { useCallback, useEffect, useRef } from 'react'

type AbortableRequest = { abort: () => void }

// Starts a request when `args` change (compared as JSON) and aborts the previous one;
// `null` means no request. Requests are not aborted on effect cleanup, so the StrictMode
// double effect does not send a duplicate request.
export function useLatestRequest<Args>(
  args: Args | null,
  start: (args: Args) => AbortableRequest,
) {
  const key = args === null ? null : JSON.stringify(args)
  const latest = useRef({ args, start })
  const current = useRef<{ key: string; args: Args; request: AbortableRequest } | null>(null)

  useEffect(() => {
    latest.current = { args, start }
  })

  useEffect(() => {
    if ((current.current?.key ?? null) === key) return
    current.current?.request.abort()
    const { args: nextArgs, start: startRequest } = latest.current
    current.current =
      key === null || nextArgs === null
        ? null
        : { key, args: nextArgs, request: startRequest(nextArgs) }
  }, [key])

  return useCallback(() => {
    const active = current.current
    if (!active) return
    active.request.abort()
    current.current = { ...active, request: latest.current.start(active.args) }
  }, [])
}

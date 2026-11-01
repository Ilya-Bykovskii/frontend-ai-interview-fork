import { useCallback, useEffect, useMemo, useRef } from 'react'

export function useDebouncedCallback<Args extends unknown[]>(
  callback: (...args: Args) => void,
  delay: number,
) {
  const callbackRef = useRef(callback)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    callbackRef.current = callback
  })

  const cancel = useCallback(() => clearTimeout(timer.current), [])

  useEffect(() => cancel, [cancel])

  const run = useCallback(
    (...args: Args) => {
      cancel()
      timer.current = setTimeout(() => callbackRef.current(...args), delay)
    },
    [cancel, delay],
  )

  return useMemo(() => ({ run, cancel }), [run, cancel])
}

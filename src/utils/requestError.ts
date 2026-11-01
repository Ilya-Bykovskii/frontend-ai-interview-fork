import type { SerializedError } from '@reduxjs/toolkit'

// `message` is the raw API text, kept for debugging; the UI picks its own wording by `status`
export type RequestError = { status: number | null; message: string }

export function toRequestError(error: SerializedError): RequestError {
  const status = Number(error.code)
  return { status: Number.isInteger(status) ? status : null, message: error.message ?? '' }
}

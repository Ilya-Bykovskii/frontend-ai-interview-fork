export const PRODUCT_ID_ATTRIBUTE = 'data-product-id'

export function focusProductRow(id: number) {
  document.querySelector<HTMLElement>(`[${PRODUCT_ID_ATTRIBUTE}="${id}"]`)?.focus()
}

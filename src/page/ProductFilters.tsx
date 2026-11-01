import { useEffect, useRef, useState } from 'react'
import { Alert, Button, MenuItem, Stack, TextField } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../hooks/store.ts'
import { useDebouncedCallback } from '../hooks/useDebouncedCallback.ts'
import { selectCategoryList } from '../entities/category/slice.ts'
import { fetchCategoryList } from '../entities/category/thunks.ts'
import { errorText } from '../utils/errorText.ts'
import { formatCategoryName } from './productLabels.ts'

const SEARCH_DELAY_MS = 300
const ALL_CATEGORIES = ''

type ProductFiltersProps = {
  q: string
  category: string | null
  onSearchChange: (q: string) => void
  onSearchBlur: () => void
  onCategoryChange: (category: string | null) => void
}

export default function ProductFilters({
  q,
  category,
  onSearchChange,
  onSearchBlur,
  onCategoryChange,
}: ProductFiltersProps) {
  const dispatch = useAppDispatch()
  const categoryList = useAppSelector(selectCategoryList)
  const [draft, setDraft] = useState(q)
  const committedSearch = useRef(q)

  useEffect(() => {
    dispatch(fetchCategoryList())
  }, [dispatch])

  const commitSearch = useDebouncedCallback((value: string) => {
    const next = value.trim()
    if (next === committedSearch.current) return
    committedSearch.current = next
    onSearchChange(next)
  }, SEARCH_DELAY_MS)

  // The URL changed outside the field: history navigation or normalization
  useEffect(() => {
    if (q === committedSearch.current) return
    committedSearch.current = q
    commitSearch.cancel()
    setDraft(q)
  }, [q, commitSearch])

  // Until the list is loaded (or when it failed) the category from the URL is shown as is
  const categoryOptions =
    category && !categoryList.items.includes(category)
      ? [category, ...categoryList.items]
      : categoryList.items
  const isCategoryListLoading = categoryList.status === 'idle' || categoryList.status === 'loading'

  return (
    <Stack spacing={2}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <TextField
          type="search"
          label="Поиск"
          placeholder="Название или описание"
          value={draft}
          onChange={(event) => {
            setDraft(event.target.value)
            commitSearch.run(event.target.value)
          }}
          onBlur={onSearchBlur}
          sx={{ flex: 1 }}
        />
        <TextField
          select
          label="Категория"
          value={category ?? ALL_CATEGORIES}
          onChange={(event) => onCategoryChange(event.target.value || null)}
          disabled={isCategoryListLoading}
          slotProps={{ select: { displayEmpty: true }, inputLabel: { shrink: true } }}
          sx={{ minWidth: 240 }}
        >
          <MenuItem value={ALL_CATEGORIES}>Все категории</MenuItem>
          {categoryOptions.map((slug) => (
            <MenuItem key={slug} value={slug}>
              {formatCategoryName(slug)}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      {categoryList.status === 'failed' && (
        <Alert
          severity="warning"
          action={
            <Button color="inherit" size="small" onClick={() => dispatch(fetchCategoryList())}>
              Повторить
            </Button>
          }
        >
          {errorText(categoryList.error?.status ?? null, 'Не удалось загрузить категории')}
        </Alert>
      )}
    </Stack>
  )
}

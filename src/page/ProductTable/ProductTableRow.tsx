import { ButtonBase, Chip, TableCell, TableRow } from '@mui/material'
import { useAppSelector } from '../../hooks/store.ts'
import { selectProductListItem } from '../../entities/product/list/slice.ts'
import {
  EMPTY_VALUE,
  integerFormat,
  percentFormat,
  priceFormat,
  ratingFormat,
} from '../../utils/format.ts'
import { availabilityColor, availabilityLabel, formatCategoryName } from '../productLabels.ts'
import { PRODUCT_ID_ATTRIBUTE } from './focusProductRow.ts'

type ProductTableRowProps = {
  productKey: string
  onOpen: (id: number) => void
}

export default function ProductTableRow({ productKey, onOpen }: ProductTableRowProps) {
  const product = useAppSelector((state) => selectProductListItem(state, productKey))
  const category = formatCategoryName(product.category)

  return (
    <TableRow hover onClick={() => onOpen(product.id)} sx={{ cursor: 'pointer' }}>
      <TableCell title={product.title}>
        {/* Enter and Space click the button; the click bubbles to the row */}
        <ButtonBase
          {...{ [PRODUCT_ID_ATTRIBUTE]: product.id }}
          aria-label={`Открыть товар ${product.title}`}
          sx={{
            display: 'block',
            width: '100%',
            font: 'inherit',
            textAlign: 'left',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            borderRadius: 0.5,
            '&.Mui-focusVisible': {
              outline: '2px solid',
              outlineColor: 'primary.main',
            },
          }}
        >
          {product.title}
        </ButtonBase>
      </TableCell>
      <TableCell title={category}>{category}</TableCell>
      <TableCell title={product.brand}>{product.brand ?? EMPTY_VALUE}</TableCell>
      <TableCell align="right">{priceFormat.format(product.price)}</TableCell>
      <TableCell align="right">{percentFormat.format(product.discountPercentage / 100)}</TableCell>
      <TableCell align="right">{integerFormat.format(product.stock)}</TableCell>
      <TableCell>
        <Chip
          size="small"
          label={availabilityLabel[product.availabilityStatus]}
          color={availabilityColor[product.availabilityStatus]}
        />
      </TableCell>
      <TableCell align="right">{ratingFormat.format(product.rating)}</TableCell>
    </TableRow>
  )
}

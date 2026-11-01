import { Box, Chip, Divider, Stack, Typography } from '@mui/material'
import type { Product } from '../../entities/product/types.ts'
import {
  EMPTY_VALUE,
  dateTimeFormat,
  integerFormat,
  numberFormat,
  percentFormat,
  priceFormat,
  ratingFormat,
} from '../../utils/format.ts'
import { availabilityColor, availabilityLabel, formatCategoryName } from '../productLabels.ts'
import { Field, FieldGrid, Section } from './Field.tsx'
import ProductReviews from './ProductReviews.tsx'

export default function ProductDetails({ product }: { product: Product }) {
  const { width, height, depth } = product.dimensions

  return (
    <Stack spacing={3} divider={<Divider />}>
      <Stack spacing={2}>
        <Typography variant="body1">{product.description}</Typography>
        <FieldGrid>
          <Field label="Категория">{formatCategoryName(product.category)}</Field>
          <Field label="Бренд">{product.brand ?? EMPTY_VALUE}</Field>
          <Field label="Цена">{priceFormat.format(product.price)}</Field>
          <Field label="Скидка">{percentFormat.format(product.discountPercentage / 100)}</Field>
          <Field label="Рейтинг">{ratingFormat.format(product.rating)}</Field>
          <Field label="Остаток">{integerFormat.format(product.stock)}</Field>
          <Field label="Статус">
            <Chip
              size="small"
              label={availabilityLabel[product.availabilityStatus]}
              color={availabilityColor[product.availabilityStatus]}
            />
          </Field>
        </FieldGrid>
        <Field label="Теги">
          {product.tags.length > 0 ? (
            <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap', mt: 0.5 }}>
              {product.tags.map((tag) => (
                <Chip key={tag} size="small" variant="outlined" label={tag} />
              ))}
            </Stack>
          ) : (
            EMPTY_VALUE
          )}
        </Field>
      </Stack>

      <Section title="Изображения">
        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
          {product.images.map((src, index) => (
            <Box
              key={src}
              component="img"
              src={src}
              alt={`${product.title}, изображение ${index + 1}`}
              loading="lazy"
              sx={{
                width: 120,
                height: 120,
                objectFit: 'contain',
                border: 1,
                borderColor: 'divider',
                borderRadius: 1,
              }}
            />
          ))}
        </Stack>
      </Section>

      <Section title="Характеристики">
        <FieldGrid>
          <Field label="Артикул (SKU)">{product.sku}</Field>
          <Field label="Вес">{numberFormat.format(product.weight)}</Field>
          <Field label="Размеры (Ш × В × Г)">
            {`${numberFormat.format(width)} × ${numberFormat.format(height)} × ${numberFormat.format(depth)}`}
          </Field>
        </FieldGrid>
      </Section>

      <Section title="Условия покупки">
        <FieldGrid>
          <Field label="Гарантия">{product.warrantyInformation}</Field>
          <Field label="Доставка">{product.shippingInformation}</Field>
          <Field label="Возврат">{product.returnPolicy}</Field>
          <Field label="Минимальный заказ">
            {integerFormat.format(product.minimumOrderQuantity)}
          </Field>
        </FieldGrid>
      </Section>

      <Section title="Служебная информация">
        <FieldGrid>
          <Field label="Штрихкод">{product.meta.barcode}</Field>
          <Field label="Создан">{dateTimeFormat.format(new Date(product.meta.createdAt))}</Field>
          <Field label="Обновлён">{dateTimeFormat.format(new Date(product.meta.updatedAt))}</Field>
          <Field label="QR-код">
            <Box
              component="img"
              src={product.meta.qrCode}
              alt={`QR-код товара ${product.title}`}
              loading="lazy"
              sx={{ width: 96, height: 96, mt: 0.5 }}
            />
          </Field>
        </FieldGrid>
      </Section>

      <ProductReviews reviews={product.reviews} />
    </Stack>
  )
}

import { Box, Rating, Stack, Typography } from '@mui/material'
import type { Review } from '../../entities/product/types.ts'
import { EMPTY_VALUE, dateFormat } from '../../utils/format.ts'
import { Section } from './Field.tsx'

export default function ProductReviews({ reviews }: { reviews: Review[] }) {
  return (
    <Section title={`Отзывы (${reviews.length})`}>
      {reviews.length > 0 ? (
        <Stack spacing={2}>
          {reviews.map((review, index) => (
            <Box key={index}>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
                <Rating value={review.rating} readOnly size="small" />
                <Typography variant="subtitle2" component="span">
                  {review.reviewerName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {review.reviewerEmail}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {dateFormat.format(new Date(review.date))}
                </Typography>
              </Stack>
              <Typography variant="body2">{review.comment}</Typography>
            </Box>
          ))}
        </Stack>
      ) : (
        <Typography variant="body2">{EMPTY_VALUE}</Typography>
      )}
    </Section>
  )
}

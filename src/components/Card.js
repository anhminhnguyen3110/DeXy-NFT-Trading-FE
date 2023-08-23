import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea, Stack, styled } from '@mui/material'
import EthereumIcon from '@/components/EthereumIcon'

const TypographyStyledTitle = styled(Typography)(({ theme }) => ({
  display: 'flex',
  width: '135px',
  height: '37px',
  flexDirection: 'column',
  justifyContent: 'center',
  flexShrink: 0,
}))

const TypographyStyledPrice = styled(Typography)(({ theme }) => ({
  display: 'flex',
  width: '46px',
  height: '32px',
  justifyContent: 'center',
  alignItems: 'center',
  flexShrink: 0,
}))

export default function ActionAreaCard({ image, title, price, props }) {
  return (
    <Card {...props}>
      <CardActionArea>
        <CardMedia component="img" height="180" image={image} alt={title} />
        <CardContent>
          <TypographyStyledTitle gutterBottom variant="h5" component="div">
            {title}
          </TypographyStyledTitle>
          <Stack direction="row">
            <EthereumIcon size={13} />
            <TypographyStyledPrice variant="body2" color="text.secondary">
              {price}
            </TypographyStyledPrice>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

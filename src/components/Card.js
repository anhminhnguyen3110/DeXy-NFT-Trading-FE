import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea, Stack } from '@mui/material'
import EthereumIcon from '@/components/EthereumIcon'

export default function ActionAreaCard({ image, title, price, onClick }) {
  return (
    <Card sx={{ maxWidth: 180, height: 280 }}>
      <CardActionArea onClick={onClick}>
        <CardMedia component="img" height="180" image={image} alt={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Stack direction="row" alignItems="center" gap={0.8}>
            <EthereumIcon size={10} />
            <Typography variant="body2" color="text.secondary">
              {price}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

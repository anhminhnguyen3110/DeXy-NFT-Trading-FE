import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea, Stack, styled } from '@mui/material'
import EthereumIcon from '@/components/EthereumIcon'

export default function ActionAreaCard({ image, title, price, onClick }) {
  return (
    <Card>
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

const TypographyUsernameStyled = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
}))

export function ActionAreaCardWithUserAddress({ image, title, price, userAddress, onClick }) {
  return (
    <Card>
      <CardActionArea onClick={onClick}>
        <CardMedia component="img" height="180" image={image} alt={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <TypographyUsernameStyled gutterBottom variant="body1" component="div">
            {userAddress}
          </TypographyUsernameStyled>
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

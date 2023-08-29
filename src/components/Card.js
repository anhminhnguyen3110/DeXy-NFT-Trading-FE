/**
 * Author: Kien Quoc Mai, Anh Minh Nguyen
 * Created date: 18/08/2023
 * Last modified Date: 29/08/2023
 */
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
  Stack,
  styled,
} from '@mui/material'
import EthereumIcon from '@/components/EthereumIcon'

const CardStyled = styled(Card)(({ theme }) => ({
  '&:hover': {
    outline: `2px solid ${theme.palette.primary.dark}`,
  },
}))

/**
 *
 * @param {string} image image url
 * @param {string} title item title
 * @param {string} price item price
 * @param {function} onClick click handler
 * @param {string} userAddress user wallet address
 * @returns {JSX.Element}
 */
export default function ActionAreaCard({ image, title, price, onClick, userAddress }) {
  return (
    <CardStyled>
      <CardActionArea onClick={onClick}>
        <CardMedia component="img" height="180" image={image} alt={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          {userAddress ? (
            <Typography gutterBottom variant="subtitle1" component="div">
              {userAddress}
            </Typography>
          ) : null}
          <Stack direction="row" alignItems="center" gap={0.8}>
            <EthereumIcon size={10} />
            <Typography variant="body2" color="text.secondary">
              {price}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </CardStyled>
  )
}

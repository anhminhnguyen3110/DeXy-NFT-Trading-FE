import * as React from 'react'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'

export default function PaginationButtons({ spacing = 10, pageCount = 4 }) {
  const [page, setPage] = React.useState(1)

  const StyledPagination = styled(Pagination)(({ theme }) => ({
    '& .MuiPaginationItem-root': {
      '&.Mui-selected': {
        backgroundColor: theme.palette.primary.dark,
      },
      '&:hover': {
        // Add this block for hover styles
        backgroundColor: theme.palette.primary.main, // Change this to the desired hover color
      },
    },
    [theme.breakpoints.down('sm')]: {
      '& .MuiPaginationItem-root': {
        fontSize: '0.7rem',
        minWidth: '20px',
        height: '20px',
        lineHeight: '20px',
        margin: '0 2px',
      },
    },
  }))

  const handlePageChange = (event, newPage) => {
    setPage(newPage)
  }

  return (
    <Stack spacing={spacing}>
      <StyledPagination
        page={page}
        count={pageCount}
        showFirstButton
        showLastButton
        onChange={handlePageChange}
      />
    </Stack>
  )
}

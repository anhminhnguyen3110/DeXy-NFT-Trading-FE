import { useState } from 'react'
import { Pagination, Stack, styled, alpha } from '@mui/material'

const StyledPagination = styled(Pagination)(({ theme }) => ({
  '& .MuiPaginationItem-root': {
    '&.Mui-selected': {
      backgroundColor: theme.palette.primary.light,
      '&:hover': {
        backgroundColor: alpha(theme.palette.primary.light, 0.6),
      },
    },
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  },
  [theme.breakpoints.down('sm')]: {
    '& .MuiPaginationItem-root': {
      minWidth: '20px',
      height: '20px',
      lineHeight: '20px',
      margin: '0 2px',
    },
  },
}))

export default function PaginationButtons({ spacing = 10, pageCount = 4, ...props }) {
  const [page, setPage] = useState(1)

  const handlePageChange = (_event, newPage) => {
    setPage(newPage)
  }

  return (
    <Stack spacing={spacing} {...props}>
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

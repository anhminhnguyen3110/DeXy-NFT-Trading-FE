/**
 * Author: Kien Quoc Mai, Anh Minh Nguyen
 * Created date: 18/08/2023
 * Last modified Date: 19/09/2023
 */
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

/**
 *
 * @param {int} spacing spacing between buttons
 * @param {int} pageCount number of pages
 * @param {object} props other props
 * @returns {JSX.Element}
 */
export default function PaginationButtons({
  page = 1,
  handlePageChange,
  spacing = 10,
  pageCount = 4,
  ...props
}) {
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

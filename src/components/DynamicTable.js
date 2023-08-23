import React from 'react'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import { Box, Stack, Typography } from '@mui/material'
import dynamic from 'next/dynamic'

const Table = dynamic(() => import('@mui/material/Table'), {
  ssr: false,
})

const TableStyled = styled(Table)(({ theme }) => ({
  backgroundColor: '#1D222A',
}))

const TableContainerStyled = styled(TableContainer)(({ theme }) => ({
  borderRadius: '0px',
}))

const TableRowStyle = styled(TableRow)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    borderTop: `1px solid ${theme.palette.main}`,
    borderBottom: `1px solid ${theme.palette.main}`,
  },
}))

const TableHeadColumnStyled = styled(TableHead)(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.primary.main}`,
  borderBottom: `2px solid ${theme.palette.primary.main}`,
}))

const DynamicTableDesktop = ({ data }) => {
  const columns = Object.keys(data[0])

  return (
    <Box sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}>
      <TableContainerStyled component={Paper}>
        <TableStyled>
          <TableHeadColumnStyled>
            <TableRowStyle>
              {columns.map((column) => (
                <TableCell key={column} align={'left'}>
                  {column}
                </TableCell>
              ))}
            </TableRowStyle>
          </TableHeadColumnStyled>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRowStyle key={rowIndex}>
                {columns.map((column) => (
                  <TableCell key={column} align={'left'}>
                    {row[column]}
                  </TableCell>
                ))}
              </TableRowStyle>
            ))}
          </TableBody>
        </TableStyled>
      </TableContainerStyled>
    </Box>
  )
}

const DynamicTableMobile = ({ data }) => {
  const columns = Object.keys(data[0])

  return (
    <Box sx={{ display: { xs: 'flex', sm: 'flex', md: 'none' } }}>
      <TableContainerStyled component={Paper}>
        <TableStyled>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRowStyle key={rowIndex}>
                <Stack spacing={2}>
                  <TableCell align={'left'} sx={{ width: '50%' }}>
                    {columns.map((column) => (
                      <Stack
                        key={column}
                        direction="row"
                        rowGap={2}
                        spacing={2}
                        sx={{ flexGrow: 1 }}
                      >
                        <Typography width={'50%'} variant="body1" sx={{ flexGrow: 1 }}>
                          {column}
                        </Typography>
                        <Typography width={'50%'} variant="body1" sx={{ flexGrow: 1 }}>
                          {row[column]}
                        </Typography>
                      </Stack>
                    ))}
                  </TableCell>
                </Stack>
              </TableRowStyle>
            ))}
          </TableBody>
        </TableStyled>
      </TableContainerStyled>
    </Box>
  )
}

function DynamicTable({ data }) {
  return (
    <>
      <DynamicTableDesktop data={data} />
      <DynamicTableMobile data={data} />
    </>
  )
}

export default DynamicTable

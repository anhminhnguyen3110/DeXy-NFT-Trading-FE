import React from 'react'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import { Box, Stack } from '@mui/material'

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

const DynamicTableDesktop = ({ data, columns }) => {
  return (
    <Box sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}>
      <TableContainerStyled component={Paper}>
        <TableStyled>
          <TableHeadColumnStyled>
            <TableRowStyle>
              {columns.map((column) => (
                <TableCell key={column.id} align={'left'}>
                  {column.label}
                </TableCell>
              ))}
            </TableRowStyle>
          </TableHeadColumnStyled>
          <TableBody>
            {data.map((row) => (
              <TableRowStyle key={row.name}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={'left'}>
                    {row[column.id]}
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

const DynamicTableMobile = ({ data, columns }) => {
  return (
    <Box sx={{ display: { xs: 'flex', sm: 'flex', md: 'none' } }}>
      <TableContainerStyled component={Paper}>
        <TableStyled>
          <TableBody>
            {data.map((row, id) => (
              <TableRowStyle key={id}>
                <Stack spacing={2}>
                  {columns.map((column, id) => (
                    <Stack key={id} direction="row" spacing={2} sx={{ flexGrow: 1 }}>
                      <TableCell align={'left'} sx={{ width: '50%' }}>
                        {column.label}
                      </TableCell>
                      <TableCell align={'left'} sx={{ width: '50%' }}>
                        {data[id][column.id]}
                      </TableCell>
                    </Stack>
                  ))}
                </Stack>
              </TableRowStyle>
            ))}
          </TableBody>
        </TableStyled>
      </TableContainerStyled>
    </Box>
  )
}

function DynamicTable({ data, columns }) {
  return (
    <>
      <DynamicTableDesktop data={data} columns={columns} />
      <DynamicTableMobile data={data} columns={columns} />
    </>
  )
}

export default DynamicTable

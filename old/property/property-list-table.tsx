import type { ChangeEvent, FC, MouseEvent } from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

import { RouterLink } from 'src/components/router-link'
import { Scrollbar } from 'src/components/scrollbar'
import { paths } from 'src/paths'
import { toCurrency } from '../../data/shared'
import { RolledUpParcel } from '../../types/property'

interface PropertyListTableProps {
  count?: number
  items?: RolledUpParcel[]
  onPageChange?: (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => void
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void
  page?: number
  rowsPerPage?: number
}

export const PropertyListTable: FC<PropertyListTableProps> = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 10,
  } = props

  return (
    <Box sx={{ position: 'relative' }}>
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell>Parcel ID</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Market value</TableCell>
              <TableCell>Total taxes</TableCell>
              <TableCell>Village assessment</TableCell>
              <TableCell>Town assessment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((property) => {
              const marketValue = toCurrency(property.fullMarketValue)
              const townAssessment = toCurrency(property.totalTownAssessment)
              const villageAssessment = toCurrency(
                property.totalVillageAssessment,
              )
              const totalTaxes = toCurrency(property.totalTaxes)

              return (
                <TableRow hover key={property.topParcelId}>
                  <TableCell>
                    <Stack alignItems="center" direction="row" spacing={1}>
                      <div>
                        <Link
                          color="inherit"
                          component={RouterLink}
                          href={paths.properties.details(property.topParcelId)}
                          variant="subtitle2"
                        >
                          {property.topParcelId}
                        </Link>
                      </div>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Link
                      color="inherit"
                      component={RouterLink}
                      href={paths.properties.details(property.topParcelId)}
                      variant="subtitle2"
                    >
                      {property.propertyLocation}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      color="inherit"
                      component={RouterLink}
                      href={paths.properties.details(property.topParcelId)}
                      variant="subtitle2"
                    >
                      {marketValue}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      <Link
                        color="inherit"
                        component={RouterLink}
                        href={paths.properties.details(property.topParcelId)}
                        variant="subtitle2"
                      >
                        {totalTaxes}
                      </Link>
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Link
                      color="inherit"
                      component={RouterLink}
                      href={paths.properties.details(property.topParcelId)}
                      variant="subtitle2"
                    >
                      {villageAssessment}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      color="inherit"
                      component={RouterLink}
                      href={paths.properties.details(property.topParcelId)}
                      variant="subtitle2"
                    >
                      {townAssessment}
                    </Link>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 15]}
      />
    </Box>
  )
}

PropertyListTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
}

import React from 'react'
import { DataGrid, type GridColDef, type GridRowParams } from '@mui/x-data-grid'
import { Icon, TextField } from '@mui/material'
import { green } from '@mui/material/colors'
import { toCurrency } from './data/shared'
import { RolledUpParcel } from './types/property'

function containsSearchString(value: RolledUpParcel, searchText: string) {
  const needle = searchText.toLowerCase()
  return (
    value.propertyLocation.toLowerCase().includes(needle) ||
    value.currentOwnersName
      .map((value) => value.toLowerCase())
      .filter((value) => value.includes(needle)).length !== 0 ||
    value.topParcelId.includes(needle)
  )
}

function PropertyOverviewDataGrid(props: {
  parcels: RolledUpParcel[]
  selectedRow: RolledUpParcel | undefined
  selectRow: React.Dispatch<React.SetStateAction<RolledUpParcel | undefined>>
}) {
  const rows: RolledUpParcel[] = props.parcels

  const columns: Array<GridColDef<RolledUpParcel>> = [
    {
      field: 'addbutton',
      headerName: '',
      width: 100,
      sortable: false,
      renderCell: () => {
        return <Icon sx={{ color: green[500] }}>add_circle</Icon>
      },
    },
    {
      field: 'parcelId',
      headerName: 'Parcel ID',
    },
    {
      field: 'currentOwnersName',
      headerName: 'Current owner',
      width: 300,
    },
    {
      field: 'propertyLocation',
      headerName: 'Location',
      width: 300,
    },
    {
      field: 'fullMarketValue',
      headerName: 'Market value',
      width: 150,
      renderCell: (params) => {
        return <>{toCurrency(params.row.fullMarketValue ?? 0)}</>
      },
    },
    {
      field: 'totalTaxes',
      headerName: 'Total taxes',
      width: 150,
      renderCell: (params) => {
        return <>{toCurrency(params.row.totalTaxes)}</>
      },
    },
  ]

  const [searchModel, setSearchText] = React.useState('')

  return (
    <div className="App" style={{ width: '100%' }}>
      <TextField
        id="search"
        label="Search"
        defaultValue=""
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setSearchText(event.target.value)
        }}
      />
      <div style={{ width: '100%' }}>
        <DataGrid
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          rows={rows.filter((value) =>
            searchModel === ''
              ? true
              : containsSearchString(value, searchModel),
          )}
          onRowClick={(rowData: GridRowParams<RolledUpParcel>) => {
            props.selectRow(rowData.row)
          }}
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
          autoHeight
        />
      </div>
    </div>
  )
}

export default PropertyOverviewDataGrid

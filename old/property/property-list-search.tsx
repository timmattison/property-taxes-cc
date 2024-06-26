import type { FC } from 'react'
import { ChangeEvent, useCallback, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import Stack from '@mui/material/Stack'
import SvgIcon from '@mui/material/SvgIcon'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

import { useUpdateEffect } from 'src/hooks/use-update-effect'

export interface PropertyFilters {
  query?: string
  residential?: boolean
  commercial?: boolean
  vacant?: boolean
}

type TabValue = 'all' | 'residential' | 'commercial' | 'vacant'

interface TabOption {
  label: string
  value: TabValue
}

const tabs: TabOption[] = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Residential',
    value: 'residential',
  },
  {
    label: 'Commercial',
    value: 'commercial',
  },
  {
    label: 'Vacant',
    value: 'vacant',
  },
]

type SortValue =
  | 'updatedAt|desc'
  | 'updatedAt|asc'
  | 'totalOrders|desc'
  | 'totalOrders|asc'

interface SortOption {
  label: string
  value: SortValue
}

const sortOptions: SortOption[] = [
  {
    label: 'Last update (newest)',
    value: 'updatedAt|desc',
  },
  {
    label: 'Last update (oldest)',
    value: 'updatedAt|asc',
  },
  {
    label: 'Total orders (highest)',
    value: 'totalOrders|desc',
  },
  {
    label: 'Total orders (lowest)',
    value: 'totalOrders|asc',
  },
]

type SortDir = 'asc' | 'desc'

interface PropertyListSearchProps {
  onFiltersChange?: (filters: PropertyFilters) => void
  onSortChange?: (sort: { sortBy: string; sortDir: SortDir }) => void
  sortBy?: string
  sortDir?: SortDir
}

export const PropertyListSearch: FC<PropertyListSearchProps> = (props) => {
  const { onFiltersChange, onSortChange, sortBy, sortDir } = props
  const queryRef = useRef<HTMLInputElement | null>(null)
  const [currentTab, setCurrentTab] = useState<TabValue>('all')
  const [filters, setFilters] = useState<PropertyFilters>({})

  const handleFiltersUpdate = useCallback(() => {
    onFiltersChange?.(filters)
  }, [filters, onFiltersChange])

  useUpdateEffect(() => {
    handleFiltersUpdate()
  }, [filters, handleFiltersUpdate])

  const handleTabsChange = useCallback(
    (event: ChangeEvent<any>, value: TabValue): void => {
      setCurrentTab(value)
      setFilters((prevState) => {
        const updatedFilters: PropertyFilters = {
          ...prevState,
          residential: undefined,
          commercial: undefined,
          vacant: undefined,
        }

        if (value !== 'all') {
          updatedFilters[value] = true
        }

        return updatedFilters
      })
    },
    [],
  )

  const handleQueryChange = useCallback(
    (_: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      setFilters((prevState) => ({
        ...prevState,
        query: queryRef.current?.value,
      }))
    },
    [],
  )

  const handleSortChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      const [sortBy, sortDir] = event.target.value.split('|') as [
        string,
        SortDir,
      ]

      onSortChange?.({
        sortBy,
        sortDir,
      })
    },
    [onSortChange],
  )

  return (
    <>
      <Tabs
        indicatorColor="primary"
        onChange={handleTabsChange}
        scrollButtons="auto"
        sx={{ px: 3 }}
        textColor="primary"
        value={currentTab}
        variant="scrollable"
      >
        {tabs.map((tab) => (
          <Tab key={tab.value} label={tab.label} value={tab.value} />
        ))}
      </Tabs>
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        flexWrap="wrap"
        spacing={3}
        sx={{ p: 3 }}
      >
        <Box component="form" sx={{ flexGrow: 1 }}>
          <OutlinedInput
            onChange={handleQueryChange}
            defaultValue=""
            fullWidth
            inputProps={{ ref: queryRef }}
            placeholder="Enter a property owner's name, parcel ID, or address"
            startAdornment={
              <InputAdornment position="start">
                <SvgIcon>
                  <SearchMdIcon />
                </SvgIcon>
              </InputAdornment>
            }
          />
        </Box>
        {/*<TextField*/}
        {/*  label="Sort By"*/}
        {/*  name="sort"*/}
        {/*  onChange={handleSortChange}*/}
        {/*  select*/}
        {/*  SelectProps={{ native: true }}*/}
        {/*  value={`${sortBy}|${sortDir}`}*/}
        {/*>*/}
        {/*  {sortOptions.map((option) => (*/}
        {/*    <option key={option.value} value={option.value}>*/}
        {/*      {option.label}*/}
        {/*    </option>*/}
        {/*  ))}*/}
        {/*</TextField>*/}
      </Stack>
    </>
  )
}

PropertyListSearch.propTypes = {
  onFiltersChange: PropTypes.func,
  onSortChange: PropTypes.func,
  sortBy: PropTypes.string,
  sortDir: PropTypes.oneOf<SortDir>(['asc', 'desc']),
}

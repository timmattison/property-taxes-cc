<script setup lang="ts">
import type { ColumnDef, ColumnFiltersState, SortingState, VisibilityState } from '@tanstack/vue-table'
import {
    FlexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useVueTable,
} from '@tanstack/vue-table'
import { ArrowUpDown, ChevronDown } from 'lucide-vue-next'

import { h, ref } from 'vue'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { valueUpdater } from '@/lib/utils'
import { RolledUpParcels, RolledUpParcelType } from '@/types/property'

const columns: ColumnDef<RolledUpParcelType>[] = [
    {
        accessorKey: 'topParcelId',
        // @ts-ignore
        headerText: 'Parcel ID',
        header: 'Parcel ID',
        cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('topParcelId')),
    },
    {
        accessorKey: 'propertyLocation',
        // @ts-ignore
        headerText: 'Location',
        header: 'Location',
        cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('propertyLocation')),
    },
    {
        accessorKey: 'fullMarketValue',
        // @ts-ignore
        headerText: 'Market value',
        header: ({ column }) => {
            return h(Button, {
                variant: 'ghost',
                onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
            }, () => ['Market value', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
        },
        cell: ({ row }) => {
            const amount = Number.parseFloat(row.getValue('fullMarketValue'))

            // Format the amount as a dollar amount
            const formatted = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(amount)

            return h('div', { class: 'text-right font-medium' }, formatted)
        },
    },
    {
        accessorKey: 'totalTaxes',
        // @ts-ignore
        headerText: 'Total taxes',
        header: () => h('div', { class: 'text-right' }, 'Total taxes'),
        cell: ({ row }) => {
            const amount = Number.parseFloat(row.getValue('totalTaxes'))

            // Format the amount as a dollar amount
            const formatted = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(amount)

            return h('div', { class: 'text-right font-medium' }, formatted)
        },
    },
    {
        accessorKey: 'totalVillageAssessment',
        // @ts-ignore
        headerText: 'Village assessment',
        header: () => h('div', { class: 'text-right' }, 'Village assessment'),
        cell: ({ row }) => {
            const amount = Number.parseFloat(row.getValue('totalVillageAssessment'))

            // Format the amount as a dollar amount
            const formatted = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(amount)

            return h('div', { class: 'text-right font-medium' }, formatted)
        },
    },
    {
        accessorKey: 'totalTownAssessment',
        // @ts-ignore
        headerText: 'Town assessment',
        header: () => h('div', { class: 'text-right' }, 'Town assessment'),
        cell: ({ row }) => {
            const amount = Number.parseFloat(row.getValue('totalTownAssessment'))

            // Format the amount as a dollar amount
            const formatted = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(amount)

            return h('div', { class: 'text-right font-medium' }, formatted)
        },
    },
]

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})

const table = useVueTable({
    data: RolledUpParcels,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
    onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
    onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
    onRowSelectionChange: updaterOrValue => valueUpdater(updaterOrValue, rowSelection),
    state: {
        get sorting() {
            return sorting.value
        },
        get columnFilters() {
            return columnFilters.value
        },
        get columnVisibility() {
            return columnVisibility.value
        },
        get rowSelection() {
            return rowSelection.value
        },
    },
})
</script>

<template>
    <div class="w-full">
        <div class="flex gap-2 items-center py-4">
            <Input
                class="max-w-sm"
                placeholder="Filter property by location..."
                :model-value="table.getColumn('propertyLocation')?.getFilterValue() as string"
                @update:model-value=" table.getColumn('propertyLocation')?.setFilterValue($event)"
            />
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <Button variant="outline" class="ml-auto">
                        Columns
                        <ChevronDown class="ml-2 h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuCheckboxItem
                        v-for="column in table.getAllColumns().filter((column) => column.getCanHide())"
                        :key="column.id"
                        class="capitalize"
                        :checked="column.getIsVisible()"
                        @update:checked="(value) => {
              column.toggleVisibility(!!value)
            }"
                    >
                        {{
                            // @ts-ignore
                            column.columnDef.headerText
                        }}
                    </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        <div class="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                        <TableHead v-for="header in headerGroup.headers" :key="header.id">
                            <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
                                        :props="header.getContext()" />
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <template v-if="table.getRowModel().rows?.length">
                        <TableRow
                            v-for="row in table.getRowModel().rows"
                            :key="row.id"
                            :data-state="row.getIsSelected() && 'selected'"
                        >
                            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                            </TableCell>
                        </TableRow>
                    </template>

                    <TableRow v-else>
                        <TableCell
                            :colspan="columns.length"
                            class="h-24 text-center"
                        >
                            No results.
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>

        <div class="flex items-center justify-end space-x-2 py-4">
            <div class="flex-1 text-sm text-muted-foreground">
                {{ table.getFilteredSelectedRowModel().rows.length }} of
                {{ table.getFilteredRowModel().rows.length }} row(s) selected.
            </div>
            <div class="space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    :disabled="!table.getCanPreviousPage()"
                    @click="table.previousPage()"
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    :disabled="!table.getCanNextPage()"
                    @click="table.nextPage()"
                >
                    Next
                </Button>
            </div>
        </div>
    </div>
</template>

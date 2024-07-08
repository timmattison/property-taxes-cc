<script setup lang="ts">
import { Toaster } from '@/components/ui/toast'
import { useUiStore } from '@/data/ui-store'
import { computed } from 'vue'
import { HistoricalTaxType } from '@/types/property'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const uiStore = useUiStore()

type HistoricalTaxForYear = {
    [year: string]: HistoricalTaxType
}

type HistoricalTaxesGroupedByType = {
    [type: string]: HistoricalTaxForYear
}

const groupedHistoricalTaxes = computed<HistoricalTaxesGroupedByType | undefined>(() => uiStore.selectedProperty?.historicalTax?.reduce((acc: HistoricalTaxesGroupedByType, historicalTax) => {
    // Get the taxes by type
    let historicalTaxesGroupedByType = acc[historicalTax.type] || {} as HistoricalTaxesGroupedByType

    // Fill in the historical tax type for that year
    acc[historicalTax.type] = {
        ...historicalTaxesGroupedByType,
        [historicalTax.year]: historicalTax,
    }

    return acc
}, {}))

const startYear = computed(() => {
    if (!uiStore.selectedProperty) {
        return undefined
    }

    if (!groupedHistoricalTaxes.value) {
        return undefined
    }

    const years = Object.keys(groupedHistoricalTaxes.value).map(type => Object.keys(groupedHistoricalTaxes.value![type])).flat()

    return years.length > 0 ? String(Math.min(...years.map(value => parseInt(value)))) : undefined
})

function calculateChangePercent(type: string, requestedYear: number, processor: (input: HistoricalTaxType) => number) {
    if (!uiStore.selectedProperty) {
        return undefined
    }

    if (!groupedHistoricalTaxes.value) {
        return undefined
    }

    if (!startYear.value) {
        return undefined
    }

    let currentTax = groupedHistoricalTaxes.value[type][requestedYear]

    if (!currentTax) {
        return undefined
    }

    const startYearNumber = parseInt(startYear.value)

    for (let year = requestedYear - 1; year >= startYearNumber; year--) {
        let previousTax = groupedHistoricalTaxes.value[type][year]

        if (!previousTax) {
            continue
        }

        const previousAmount = processor(previousTax)

        if (previousAmount == 0) {
            return ''
        }

        const currentAmount = processor(currentTax)

        let change = ((currentAmount - previousAmount) / previousAmount) * 100.0
        change = Math.round(change * 100) / 100

        return change
    }

    return undefined
}

function taxAmountChange(type: string, requestedYear: number) {
    return calculateChangePercent(type, requestedYear, (input: HistoricalTaxType) => input.amount)
}

function taxableValueChange(type: string, requestedYear: number) {
    return calculateChangePercent(type, requestedYear, (input: HistoricalTaxType) => input.taxableValue)
}

function taxRateChange(type: string, requestedYear: number) {
    return calculateChangePercent(type, requestedYear, (input: HistoricalTaxType) => input.taxRate)
}
</script>

<template>
    <div class="w-full">
        <Toaster />
        <template v-if="!uiStore.selectedProperty">
            <div>Nothing selected yet</div>
        </template>
        <template v-else-if="!groupedHistoricalTaxes">
            <div>No history</div>
        </template>
        <template v-else>
            <div class="p-4">
                <h2 class="text-lg font-semibold">{{ uiStore.selectedProperty!.propertyLocation }}</h2>
            </div>
            <div class="mb-4" v-for="type in Object.keys(groupedHistoricalTaxes)" v-if="type != 'VILLAGE GARBAGE'">
                <div class="rounded-md border">
                    <div class="p-4">
                        <h2 class="text-lg font-semibold">{{ type }}</h2>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Year</TableHead>
                                <TableHead>Taxable value</TableHead>
                                <TableHead>Taxable value change (%)</TableHead>
                                <TableHead>Tax rate</TableHead>
                                <TableHead>Tax rate change (%)</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Amount change (%)</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow
                                v-for="row in groupedHistoricalTaxes[type]"
                                :key="row.year">
                                <TableCell>{{ row.year }}</TableCell>
                                <TableCell>{{ row.taxableValue }}</TableCell>
                                <TableCell>{{ taxableValueChange(type, row.year) }}</TableCell>
                                <TableCell>{{ row.taxRate }}</TableCell>
                                <TableCell>{{ taxRateChange(type, row.year) }}</TableCell>
                                <TableCell>{{ row.amount }}</TableCell>
                                <TableCell>{{ taxAmountChange(type, row.year) }}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </template>
    </div>
</template>

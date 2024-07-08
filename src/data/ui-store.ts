import { defineStore } from 'pinia'
import { RolledUpParcelType } from '@/types/property'

const uiStoreName = 'ui-store'

export const useUiStore = defineStore(uiStoreName, {
    state: () => ({
        selectedProperty: undefined as RolledUpParcelType | undefined,
    }),
    getters: {},
    actions: {
        setSelectedProperty(selectedProperty: RolledUpParcelType) {
            this.selectedProperty = selectedProperty
        },
    },
})

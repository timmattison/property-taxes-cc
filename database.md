---
# https://vitepress.dev/reference/default-theme-home-page
layout: false
---

<script setup>
// @ts-ignore
import PropertyTaxDataTable from './src/components/PropertyTaxDataTable.vue'
// @ts-ignore
import PropertyTaxDetailView from './src/components/PropertyTaxDetailView.vue'
</script>

<div class="px-4">
  <p>Pleasantville property tax data</p>
  <PropertyTaxDataTable />
  <PropertyTaxDetailView />
</div>

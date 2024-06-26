---
title: "Moved site to VitePress"
date: 2024-06-26 09:36:00
---

# {{ $frontmatter.title }}

It's just easier this way. Stay tuned for fun posts about how screwed up our property tax situation is.

<script setup>
// @ts-ignore
import TresJsSample from '../../src/components/TresJsSample.vue'
import TestTable from '../../src/components/TestTable.vue'
import TestDataTable from '../../src/components/TestDataTable.vue'
import TestButton from '../../src/components/TestButton.vue'
</script>

I wanted to see if I could embed TresJS in a Vue component in VitePress. It seems to work!

<TestButton />
<TestDataTable />
<TestTable />
<TresJsSample />

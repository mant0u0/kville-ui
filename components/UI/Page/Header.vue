<script setup lang="ts">
import { LibraryBig } from '@lucide/vue'

withDefaults(
  defineProps<{
    title: string
    description: string
    eyebrow?: string
  }>(),
  {
    eyebrow: 'COMPONENT WORKSPACE',
  },
)
</script>

<template>
  <header class="max-w-175">
    <div
      class="text-brand-500 flex items-center gap-2 text-xs font-black tracking-widest"
    >
      <LibraryBig :size="16" aria-hidden="true" />
      {{ eyebrow }}
    </div>
    <h1
      class="text-brand-900 mt-4 mb-3 text-4xl leading-tight font-black max-md:text-3xl"
    >
      {{ title }}
    </h1>
    <p class="text-brand-600 m-0 text-base leading-7">
      {{ description }}
    </p>
  </header>
</template>

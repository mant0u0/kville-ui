<script setup lang="ts">
import { ReceiptText } from '@lucide/vue'

const { homeItem, uiWorkspace } = useAppNavigation()
</script>

<template>
  <header
    class="border-brand-600 bg-brand-500 sticky top-0 z-20 flex min-h-15.75 items-center justify-between border-b px-5 text-lg font-bold text-white max-sm:px-3"
  >
    <NuxtLink
      class="flex items-center gap-1 text-inherit no-underline"
      :to="homeItem.to"
      aria-label="返回首頁"
    >
      <ReceiptText class="text-white" :size="34" :stroke-width="1.5" />
      <strong class="px-2 leading-[1.4] max-sm:px-0 max-sm:text-base">
        UI 元件</strong
      >
    </NuxtLink>
    <nav aria-label="主要導覽">
      <NuxtLink
        class="rounded-full px-3 py-1.75 text-[13px] text-white no-underline hover:bg-white/16 max-sm:px-2 max-sm:text-xs"
        active-class="bg-white/16"
        :to="uiWorkspace.to"
        >{{ uiWorkspace.title }}</NuxtLink
      >
    </nav>
  </header>
</template>

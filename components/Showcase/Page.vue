<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <main class="page-shell bg-desert-50">
    <div
      class="mx-auto grid w-[min(100%,1180px)] grid-cols-[230px_minmax(0,1fr)] gap-10 px-6 py-10 max-lg:grid-cols-1 max-lg:gap-8 max-md:px-4 max-md:py-6"
    >
      <UIPageSidebar scope="ui" />

      <div class="min-w-0">
        <UIPageHeader :title="title" :description="description" />

        <div class="mt-8 grid gap-6">
          <slot />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
const categories = useUiShowcaseCategories().filter(
  (category) => category.showInOverview,
)
</script>

<template>
  <ShowcasePage
    title="UI 元件總覽"
    description="專案現有元件的互動目錄。依功能分類查看實際狀態、props 與基本使用方式。"
  >
    <div class="grid grid-cols-2 gap-4 max-md:grid-cols-1">
      <UIButtonIconBlock
        v-for="category in categories"
        :key="category.to"
        :to="category.to"
        :title="category.title"
        :subtitle="category.subtitle"
        :description="category.description"
        :icon="category.icon"
      />
    </div>
  </ShowcasePage>
</template>

<script setup lang="ts">
import { ChevronRight } from '@lucide/vue'

const props = withDefaults(
  defineProps<{
    scope?: 'main' | 'ui'
  }>(),
  {
    scope: 'main',
  },
)

const route = useRoute()
const { mainNavigation, uiNavigation } = useAppNavigation()

const config = computed(() =>
  props.scope === 'ui'
    ? { eyebrow: 'UI CATALOG', title: '元件選單', items: uiNavigation }
    : { eyebrow: 'WORKSPACE', title: '主要選單', items: mainNavigation },
)
</script>

<template>
  <aside
    class="self-start max-lg:overflow-x-auto max-lg:pb-1 lg:sticky lg:top-22"
  >
    <div
      class="border-nurse-200 border-b pb-5 max-lg:min-w-max max-lg:border-b-0 max-lg:pb-0"
    >
      <div class="mb-5 max-lg:hidden">
        <p class="text-brand-500 m-0 text-xs font-black tracking-widest">
          {{ config.eyebrow }}
        </p>
        <h2 class="text-brand-900 mt-2 mb-0 text-xl">{{ config.title }}</h2>
      </div>

      <nav
        class="flex flex-col gap-1 max-lg:flex-row"
        :aria-label="config.title"
      >
        <NuxtLink
          v-for="item in config.items"
          :key="item.to"
          class="text-brand-700 hover:bg-brand-50 hover:text-brand-900 flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-bold no-underline transition-colors"
          :class="
            route.path === item.to
              ? 'bg-brand-500 hover:bg-brand-500 text-white hover:text-white'
              : ''
          "
          :to="item.to"
        >
          <component :is="item.icon" :size="18" aria-hidden="true" />
          <span>{{ item.title }}</span>
          <ChevronRight
            v-if="item.hasChildren"
            class="ml-auto"
            :size="18"
            aria-hidden="true"
          />
        </NuxtLink>
      </nav>
    </div>
  </aside>
</template>

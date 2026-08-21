<script setup lang="ts">
import { ChevronRight } from '@lucide/vue'

const { pageItems, workspaceItems } = useAppNavigation()
</script>

<template>
  <main class="page-shell bg-desert-50">
    <div
      class="mx-auto grid w-[min(100%,1180px)] grid-cols-[230px_minmax(0,1fr)] gap-10 px-6 py-10 max-lg:grid-cols-1 max-lg:gap-8 max-md:px-4 max-md:py-6"
    >
      <UIPageSidebar />

      <div class="min-w-0">
        <UIPageHeader
          title="UI 元件工作區"
          description="從左側選單進入各個工作區。UI 介面包含多個分類，會在進入後顯示專屬選單。"
        />

        <section class="mt-8">
          <p class="text-brand-500 m-0 text-xs font-black tracking-widest">
            WORKSPACES
          </p>
          <h2 class="text-brand-900 mt-2 mb-5 text-2xl font-bold">
            多層工作區
          </h2>
          <div class="grid gap-3">
            <NuxtLink
              v-for="item in workspaceItems"
              :key="item.to"
              class="group border-nurse-200 hover:border-brand-300 flex items-center gap-5 rounded-2xl border bg-white p-5 no-underline transition-colors"
              :to="item.to"
            >
              <component
                :is="item.icon"
                class="text-brand-500 shrink-0"
                :size="24"
                aria-hidden="true"
              />
              <div class="min-w-0 flex-1">
                <h3 class="text-brand-900 m-0 text-lg font-bold">
                  {{ item.title }}
                </h3>
                <p class="text-brand-600 mt-1 mb-0 text-sm leading-6">
                  {{ item.description }}
                </p>
              </div>
              <ChevronRight
                class="text-nurse-400 group-hover:text-brand-600 shrink-0"
                :size="20"
                aria-hidden="true"
              />
            </NuxtLink>
          </div>
        </section>

        <section class="border-nurse-200 mt-10 border-t pt-8">
          <p class="text-brand-500 m-0 text-xs font-black tracking-widest">
            PAGES
          </p>
          <h2 class="text-brand-900 mt-2 mb-1 text-2xl font-bold">單層頁面</h2>
          <div class="mt-5 grid gap-3">
            <NuxtLink
              v-for="item in pageItems"
              :key="item.to"
              class="group border-nurse-200 hover:border-brand-300 flex items-center gap-5 rounded-2xl border bg-white p-5 no-underline transition-colors"
              :to="item.to"
            >
              <component
                :is="item.icon"
                class="text-brand-500 shrink-0"
                :size="24"
                aria-hidden="true"
              />
              <div class="min-w-0 flex-1">
                <h3 class="text-brand-900 m-0 text-lg font-bold">
                  {{ item.title }}
                </h3>
                <p class="text-brand-600 mt-1 mb-0 text-sm leading-6">
                  {{ item.description }}
                </p>
              </div>
              <ChevronRight
                class="text-nurse-400 group-hover:text-brand-600 shrink-0"
                :size="20"
                aria-hidden="true"
              />
            </NuxtLink>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

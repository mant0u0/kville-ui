<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string
    componentName: string
    description: string
    usage?: string
    tone?: 'default' | 'brand'
  }>(),
  {
    usage: '',
    tone: 'default',
  }
)
</script>

<template>
  <section class="overflow-hidden rounded-[20px] border border-nurse-200 bg-white">
    <header class="border-b border-nurse-200 px-5 pt-4 pb-5">
      <div>
        <code class="text-xs font-bold text-brand-500">{{ componentName }}</code>
        <h2 class="m-0 text-xl font-bold">{{ title }}</h2>
      </div>
      <p class="mt-1 mb-0 self-center text-sm leading-[1.6] text-brand-600">{{ description }}</p>
    </header>

    <div class="px-6 py-7" :class="props.tone === 'brand' ? 'bg-brand-500' : 'bg-desert-50'">
      <slot />
    </div>

    <details v-if="usage" class="border-t border-nurse-200">
      <summary class="cursor-pointer px-6 py-3.5 text-[13px] font-bold text-brand-600">查看使用方式</summary>
      <pre class="m-0 overflow-x-auto bg-brand-950 px-6 py-[18px] text-sm leading-[1.7] text-nurse-100"><code>{{ usage }}</code></pre>
    </details>
  </section>
</template>

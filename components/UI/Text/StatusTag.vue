<script setup lang="ts">
type StatusTagStatus = 'active' | 'complete' | 'inactive'

const props = withDefaults(
  defineProps<{
    status: StatusTagStatus
    size?: 'sm' | 'md'
  }>(),
  {
    size: 'sm',
  },
)

const statusCopy: Record<StatusTagStatus, string> = {
  active: '進行中',
  complete: '已完成',
  inactive: '未啟用',
}

const statusClasses: Record<StatusTagStatus, string> = {
  active: 'bg-brand-50 text-brand-700',
  complete: 'bg-nurse-100 text-nurse-700',
  inactive: 'bg-rose-50 text-rose-700',
}
</script>

<template>
  <span
    class="inline-flex shrink-0 items-center rounded-full font-bold"
    :class="[
      statusClasses[props.status],
      size === 'md' ? 'px-3 py-1.5 text-sm' : 'px-2.5 py-1 text-xs',
    ]"
  >
    {{ statusCopy[props.status] }}
  </span>
</template>

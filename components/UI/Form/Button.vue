<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    type?: 'button' | 'submit' | 'reset'
    variant?: 'primary' | 'secondary' | 'outline'
    disabled?: boolean
    warning?: boolean
  }>(),
  {
    type: 'button',
    variant: 'primary',
    disabled: false,
    warning: false,
  }
)

const variantClasses = {
  primary: 'border-brand-600 bg-brand-500 text-white hover:not-disabled:border-brand-700 hover:not-disabled:bg-brand-600',
  secondary: 'border-nurse-200 bg-nurse-100 text-brand-700 hover:not-disabled:border-nurse-300 hover:not-disabled:bg-nurse-200',
  outline: 'border-brand-600 bg-white text-brand-600 hover:not-disabled:bg-brand-50 hover:not-disabled:text-brand-700'
} as const
</script>

<template>
  <button
    class="inline-flex h-11 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border px-4 text-sm font-bold focus-visible:outline-3 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    :class="warning ? 'border-rose-600 bg-rose-500 text-white hover:not-disabled:border-rose-700 hover:not-disabled:bg-rose-600 focus-visible:outline-rose-100' : [variantClasses[props.variant], 'focus-visible:outline-brand-100']"
    :type="type"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

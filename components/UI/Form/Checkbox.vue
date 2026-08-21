<script setup lang="ts">
import { Check } from '@lucide/vue'

const model = defineModel<boolean>({ default: false })

withDefaults(
  defineProps<{
    label?: string
    disabled?: boolean
    warning?: boolean
    ariaLabel?: string
  }>(),
  {
    label: '',
    disabled: false,
    warning: false,
    ariaLabel: undefined
  }
)
</script>

<template>
  <label
    class="form-checkbox group relative inline-flex w-fit items-center gap-[9px] text-[15px]"
    :class="disabled ? 'form-checkbox--disabled cursor-not-allowed text-nurse-400' : warning ? 'form-checkbox--warning cursor-pointer text-rose-600' : 'cursor-pointer text-brand-700'"
  >
    <input v-model="model" class="peer sr-only" type="checkbox" :disabled="disabled" :aria-label="ariaLabel" />
    <span
      class="form-checkbox__control grid size-5 shrink-0 place-items-center rounded-[5px] border-[1.5px] bg-white text-white transition-[border-color,background-color,box-shadow] duration-[160ms]"
      :class="[
        disabled ? 'border-nurse-200 bg-nurse-100' : warning ? 'border-rose-500 group-hover:border-rose-600' : 'border-nurse-400 group-hover:border-brand-500',
        warning ? 'peer-checked:border-rose-500 peer-checked:bg-rose-500 peer-focus-visible:ring-3 peer-focus-visible:ring-rose-50' : 'peer-checked:border-brand-500 peer-checked:bg-brand-500 peer-focus-visible:ring-3 peer-focus-visible:ring-brand-50'
      ]"
      aria-hidden="true"
    >
      <Check v-if="model" :size="13" :stroke-width="3" />
    </span>
    <span v-if="label || $slots.default"><slot>{{ label }}</slot></span>
  </label>
</template>

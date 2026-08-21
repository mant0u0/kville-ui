<script setup lang="ts">
const model = defineModel<string | number>({ required: true })

withDefaults(
  defineProps<{
    value: string | number
    label?: string
    name?: string
    disabled?: boolean
    warning?: boolean
    ariaLabel?: string
  }>(),
  {
    label: '',
    name: undefined,
    disabled: false,
    warning: false,
    ariaLabel: undefined
  }
)
</script>

<template>
  <label
    class="form-radio group relative inline-flex w-fit items-center gap-[9px] text-[15px]"
    :class="disabled ? 'form-radio--disabled cursor-not-allowed text-nurse-400' : warning ? 'form-radio--warning cursor-pointer text-rose-600' : 'cursor-pointer text-brand-700'"
  >
    <input
      v-model="model"
      class="peer sr-only"
      type="radio"
      :name="name"
      :value="value"
      :disabled="disabled"
      :aria-label="ariaLabel"
    />
    <span
      class="form-radio__control grid size-5 shrink-0 place-items-center rounded-full border-[1.5px] bg-white transition-[border-color,background-color,box-shadow] duration-[160ms]"
      :class="[
        disabled ? 'border-nurse-200 bg-nurse-100' : warning ? 'border-rose-500' : 'border-nurse-400 group-hover:border-brand-500',
        warning ? 'peer-checked:border-rose-500 peer-focus-visible:ring-3 peer-focus-visible:ring-rose-50' : 'peer-checked:border-brand-500 peer-focus-visible:ring-3 peer-focus-visible:ring-brand-50'
      ]"
      aria-hidden="true"
    ><span class="size-2.5 rounded-full" :class="model === value ? (warning ? 'bg-rose-500' : 'bg-brand-500') : 'bg-transparent'" /></span>
    <span v-if="label || $slots.default"><slot>{{ label }}</slot></span>
  </label>
</template>

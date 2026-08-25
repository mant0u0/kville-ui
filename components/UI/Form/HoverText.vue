<script setup lang="ts">
import { CircleHelp } from '@lucide/vue'

const props = withDefaults(
  defineProps<{
    text?: string
  }>(),
  {
    text: '',
  },
)

const slots = useSlots()
const hasDefaultSlot = computed(() => Boolean(slots.default))
const tooltipId = useId()
</script>

<template>
  <span
    class="group relative inline-flex align-middle"
    tabindex="0"
    :aria-label="hasDefaultSlot ? undefined : props.text"
    :aria-describedby="props.text ? tooltipId : undefined"
  >
    <slot v-if="hasDefaultSlot" />
    <span v-else class="text-brand-500 inline-flex" aria-hidden="true">
      <CircleHelp :size="18" :stroke-width="2" />
    </span>

    <span
      v-if="props.text"
      :id="tooltipId"
      role="tooltip"
      class="pointer-events-none invisible absolute bottom-full left-1/2 z-10 mb-2 w-max max-w-64 -translate-x-1/2 rounded-md bg-black/75 px-3 py-2 text-xs leading-relaxed text-white opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus:visible group-focus:opacity-100"
    >
      {{ props.text }}
    </span>
  </span>
</template>

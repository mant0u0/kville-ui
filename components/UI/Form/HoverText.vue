<script setup lang="ts">
import { CircleHelp } from '@lucide/vue'

const triggerRef = ref<HTMLElement | null>(null)
const isHovered = ref(false)
const isFocused = ref(false)
const tooltipPosition = ref<Record<string, string>>({})

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
const isTooltipVisible = computed(() => isHovered.value || isFocused.value)

function updateTooltipPosition() {
  const trigger = triggerRef.value
  if (!trigger) return

  const rect = trigger.getBoundingClientRect()
  tooltipPosition.value = {
    left: `${rect.left + rect.width / 2}px`,
    top: `${rect.top}px`,
  }
}

function showTooltip() {
  updateTooltipPosition()
}

function handleMouseEnter() {
  isHovered.value = true
  showTooltip()
}

function handleFocusIn() {
  isFocused.value = true
  showTooltip()
}

function hideTooltipOnBlur(event: FocusEvent) {
  if (triggerRef.value?.contains(event.relatedTarget as Node | null)) return
  isFocused.value = false
}

function updateVisibleTooltipPosition() {
  if (isTooltipVisible.value) updateTooltipPosition()
}

onMounted(() => {
  window.addEventListener('resize', updateVisibleTooltipPosition)
  window.addEventListener('scroll', updateVisibleTooltipPosition, true)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateVisibleTooltipPosition)
  window.removeEventListener('scroll', updateVisibleTooltipPosition, true)
})
</script>

<template>
  <span
    ref="triggerRef"
    class="relative inline-flex align-middle"
    tabindex="0"
    :aria-label="hasDefaultSlot ? undefined : props.text"
    :aria-describedby="props.text ? tooltipId : undefined"
    @mouseenter="handleMouseEnter"
    @mouseleave="isHovered = false"
    @focusin="handleFocusIn"
    @focusout="hideTooltipOnBlur"
  >
    <slot v-if="hasDefaultSlot" />
    <span v-else class="text-brand-500 inline-flex" aria-hidden="true">
      <CircleHelp :size="18" :stroke-width="2" />
    </span>
  </span>

  <Teleport to="body">
    <span
      v-if="props.text"
      :style="tooltipPosition"
      class="pointer-events-none fixed z-1000 h-0 w-0"
    >
      <Transition name="tooltip-fade">
        <span
          v-if="isTooltipVisible"
          :id="tooltipId"
          role="tooltip"
          class="tooltip absolute bottom-2 left-1/2 w-max max-w-64 rounded-md bg-black/75 px-3 py-2 text-xs leading-relaxed text-white"
        >
          {{ props.text }}
        </span>
      </Transition>
    </span>
  </Teleport>
</template>

<style scoped>
.tooltip {
  transform: translateX(-50%);
}

.tooltip-fade-enter-active,
.tooltip-fade-leave-active {
  transition:
    opacity 150ms ease,
    transform 150ms ease;
}

.tooltip-fade-enter-from,
.tooltip-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, 8px);
}
</style>

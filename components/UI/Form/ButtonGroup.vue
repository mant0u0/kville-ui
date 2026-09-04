<script setup lang="ts">
import type { FormControlSize } from '../../../composables/useFormControlStyles'

type OverflowItem = {
  element: HTMLElement
  text: string
  icon: string
  iconPosition: 'left' | 'right'
  isDanger: boolean
}

const props = withDefaults(
  defineProps<{
    size?: FormControlSize
    gap?: number
  }>(),
  {
    size: 'md',
    gap: 8,
  },
)

const rootRef = ref<HTMLElement | null>(null)
const actionsRef = ref<HTMLElement | null>(null)
const menuTriggerRef = ref<HTMLElement | null>(null)
const menuRef = ref<HTMLElement | null>(null)
const isOpen = ref(false)
const overflowItems = ref<OverflowItem[]>([])
const menuId = useId()
const menuPosition = ref({ top: 0, left: 0 })

const menuButtonSizeClasses: Record<FormControlSize, string> = {
  sm: 'size-9',
  md: 'size-11',
  lg: 'size-13',
}

const updateLayout = () => {
  const root = rootRef.value
  const actions = actionsRef.value
  if (!root || !actions) return

  const elements = Array.from(actions.children).filter(
    (element): element is HTMLElement => element instanceof HTMLElement,
  )
  if (!elements.length) return

  elements.forEach((element) => {
    element.style.display = ''
    element.style.flexShrink = '0'
  })

  const availableWidth = root.clientWidth
  const gap = Math.max(0, props.gap)
  const widths = elements.map(
    (element) => element.getBoundingClientRect().width,
  )
  const totalWidth = widths.reduce((sum, width) => sum + width, 0)
  const fullWidth = totalWidth + gap * Math.max(elements.length - 1, 0)

  if (fullWidth <= availableWidth) {
    overflowItems.value = []
    isOpen.value = false
    return
  }

  const menuWidth = props.size === 'sm' ? 36 : props.size === 'lg' ? 52 : 44
  let count = elements.length - 1

  while (count > 0) {
    const visibleWidth = widths
      .slice(0, count)
      .reduce((sum, width) => sum + width, 0)
    const requiredWidth = visibleWidth + gap * count + menuWidth
    if (requiredWidth <= availableWidth) break
    count -= 1
  }

  overflowItems.value = elements.slice(count).map((element) => ({
    element,
    text:
      element.getAttribute('aria-label') ||
      element.textContent?.trim() ||
      '未命名操作',
    icon: element.dataset.buttonIcon || '',
    iconPosition:
      element.dataset.buttonIconPosition === 'right' ? 'right' : 'left',
    isDanger: Array.from(element.classList).some(
      (className) =>
        className.startsWith('border-danger-') ||
        className.startsWith('bg-danger-') ||
        className.startsWith('text-danger-'),
    ),
  }))
  elements.slice(count).forEach((element) => {
    element.style.display = 'none'
  })
}

const updateMenuPosition = () => {
  const trigger = menuTriggerRef.value
  if (!trigger) return

  const triggerRect = trigger.getBoundingClientRect()
  const menuWidth = 176
  const menuHeight = Math.min(
    overflowItems.value.length * 44 + 12,
    window.innerHeight - 16,
  )
  const left = Math.min(
    Math.max(8, triggerRect.right - menuWidth),
    window.innerWidth - menuWidth - 8,
  )
  const top =
    triggerRect.bottom + 8 + menuHeight <= window.innerHeight
      ? triggerRect.bottom + 8
      : Math.max(8, triggerRect.top - menuHeight - 8)

  menuPosition.value = { top, left }
}

const toggleMenu = async () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) await nextTick(updateMenuPosition)
}

const handleOverflowItemClick = (item: OverflowItem) => {
  item.element.click()
  isOpen.value = false
}

const handlePointerDown = (event: PointerEvent) => {
  const target = event.target as Node
  if (!rootRef.value?.contains(target) && !menuRef.value?.contains(target)) {
    isOpen.value = false
  }
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') isOpen.value = false
}

let resizeObserver: ResizeObserver | undefined

const handleWindowResize = () => {
  updateLayout()
  if (isOpen.value) updateMenuPosition()
}

watch(
  () => [props.size, props.gap],
  () => nextTick(updateLayout),
)

onMounted(async () => {
  await nextTick()
  updateLayout()
  resizeObserver = new ResizeObserver(() => {
    updateLayout()
    if (isOpen.value) updateMenuPosition()
  })
  if (rootRef.value) resizeObserver.observe(rootRef.value)
  document.addEventListener('pointerdown', handlePointerDown)
  window.addEventListener('keydown', handleKeydown)
  window.addEventListener('resize', handleWindowResize)
  window.addEventListener('scroll', updateMenuPosition, true)
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  document.removeEventListener('pointerdown', handlePointerDown)
  window.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('resize', handleWindowResize)
  window.removeEventListener('scroll', updateMenuPosition, true)
})
</script>

<template>
  <div
    ref="rootRef"
    class="relative flex min-w-0 flex-nowrap items-center"
    :style="{ gap: `${Math.max(0, gap)}px` }"
  >
    <div ref="actionsRef" class="contents">
      <slot />
    </div>

    <div v-if="overflowItems.length" ref="menuTriggerRef" class="shrink-0">
      <button
        class="border-nurse-300 text-brand-700 hover:bg-brand-50 focus:ring-brand-500/45 grid shrink-0 place-items-center rounded-lg border bg-white transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
        :class="menuButtonSizeClasses[size]"
        type="button"
        :aria-controls="menuId"
        :aria-expanded="isOpen"
        aria-haspopup="menu"
        aria-label="更多操作"
        @click="toggleMenu"
      >
        <UIIcon name="MoreVertical" :size="size === 'sm' ? 18 : 20" />
      </button>
    </div>

    <Teleport to="body">
      <Transition name="button-group-menu">
        <div
          v-if="isOpen"
          ref="menuRef"
          :id="menuId"
          class="border-nurse-200 fixed z-50 grid max-h-[calc(100vh-16px)] w-44 overflow-y-auto rounded-xl border bg-white p-1.5 shadow-[0_12px_30px_rgba(10,19,13,0.18)]"
          :style="{
            top: `${menuPosition.top}px`,
            left: `${menuPosition.left}px`,
          }"
          role="menu"
        >
          <button
            v-for="item in overflowItems"
            :key="`${item.text}-${item.icon}`"
            class="inline-flex w-full items-center gap-2 rounded-lg border-0 bg-transparent px-3 py-2.5 text-left text-sm font-medium focus-visible:outline-0"
            :class="
              item.isDanger
                ? 'text-danger-600 hover:bg-danger-50 hover:text-danger-700 focus-visible:bg-danger-50 focus-visible:text-danger-700'
                : 'text-brand-800 hover:bg-brand-50 hover:text-brand-700 focus-visible:bg-brand-50 focus-visible:text-brand-700'
            "
            type="button"
            role="menuitem"
            @click="handleOverflowItemClick(item)"
          >
            <template v-if="item.iconPosition === 'left'">
              <UIIcon v-if="item.icon" :name="item.icon" :size="16" />
              <span class="min-w-0 flex-1 truncate">{{ item.text }}</span>
            </template>
            <template v-else>
              <span class="min-w-0 flex-1 truncate">{{ item.text }}</span>
              <UIIcon v-if="item.icon" :name="item.icon" :size="16" />
            </template>
          </button>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.button-group-menu-enter-active,
.button-group-menu-leave-active {
  transition:
    opacity 140ms ease,
    transform 140ms ease;
}

.button-group-menu-enter-from,
.button-group-menu-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>

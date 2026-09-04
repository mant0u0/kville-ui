<script setup lang="ts">
import Chart from 'chart.js/auto'
import { Clock3, Cpu, FileUp, Gauge, RotateCcw, Smartphone } from '@lucide/vue'

type SensorRow = number[]
type SensorPayload = {
  device_name?: string
  device_type?: string
  interval_ms?: number
  values?: SensorRow[]
}
type SensorData = { payload?: SensorPayload } & SensorPayload

const canvasAcc = ref<HTMLCanvasElement | null>(null)
const canvasGyr = ref<HTMLCanvasElement | null>(null)
const canvasMag = ref<HTMLCanvasElement | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)
const currentData = ref<SensorData>(createDefaultData())
const fileName = ref('已載入範例資料')
const errorMessage = ref('')
const visibleAxes = reactive({
  acc: [true, true, true],
  gyr: [true, true, true],
  mag: [true, true, true],
})

let chartAcc: Chart | null = null
let chartGyr: Chart | null = null
let chartMag: Chart | null = null

const payload = computed(() => currentData.value.payload ?? currentData.value)
const values = computed(() => payload.value.values ?? [])
const interval = computed(() => payload.value.interval_ms || 10)
const totalSeconds = computed(() =>
  ((values.value.length * interval.value) / 1000).toFixed(2),
)
const frequency = computed(() => (1000 / interval.value).toFixed(0))

const axisColors = [
  { line: '#f43f5e', fill: 'rgba(244, 63, 94, 0.08)', label: 'X 軸' },
  { line: '#10b981', fill: 'rgba(16, 185, 129, 0.08)', label: 'Y 軸' },
  { line: '#38bdf8', fill: 'rgba(56, 189, 248, 0.08)', label: 'Z 軸' },
]

function createDefaultData(): SensorData {
  const generatedValues = Array.from({ length: 120 }, (_, index) => {
    const time = index / 10
    return [
      Number(
        (Math.sin(time * 1.7) * 2 + Math.cos(time * 0.4) * 0.4).toFixed(3),
      ),
      Number((9.6 + Math.sin(time * 0.8) * 1.2).toFixed(3)),
      Number((Math.cos(time * 1.2) * 1.8).toFixed(3)),
      Number((-32 - time * 1.4 + Math.sin(time * 1.5) * 12).toFixed(3)),
      Number((Math.cos(time * 1.1) * 24).toFixed(3)),
      Number((-8 + Math.sin(time * 0.9) * 18).toFixed(3)),
      Number((2 + Math.sin(time * 0.5) * 1.5).toFixed(3)),
      Number((12 + Math.cos(time * 0.7) * 4).toFixed(3)),
      Number((23 + Math.sin(time * 0.35) * 2).toFixed(3)),
    ]
  })

  return {
    device_name: '44:C3:FB:DB:FB:45',
    device_type: 'ARDUINO_NANO33BLE',
    interval_ms: 10,
    values: generatedValues,
  }
}

function chartOptions(unit: string) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 250 },
    interaction: { mode: 'index' as const, intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0f172a',
        titleColor: '#fff',
        bodyColor: '#cbd5e1',
        borderColor: '#334155',
        borderWidth: 1,
        padding: 10,
        cornerRadius: 6,
        callbacks: {
          label: (context: {
            dataset: { label?: string }
            parsed: { y: number }
          }) =>
            ` ${context.dataset.label}: ${context.parsed.y.toFixed(3)} ${unit}`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(15, 23, 42, 0.08)' },
        ticks: {
          color: '#64748b',
          font: { family: 'JetBrains Mono', size: 10 },
          maxTicksLimit: 10,
        },
      },
      y: {
        grid: { color: 'rgba(15, 23, 42, 0.1)' },
        ticks: {
          color: '#64748b',
          font: { family: 'JetBrains Mono', size: 10 },
        },
      },
    },
  }
}

function createDatasets(
  offset: number,
  label: string,
  group: keyof typeof visibleAxes,
) {
  return axisColors.map((axis, axisIndex) => ({
    label: `${axis.label}${label}`,
    data: values.value.map((row) => row[offset + axisIndex] ?? 0),
    borderColor: axis.line,
    backgroundColor: axis.fill,
    borderWidth: 1.5,
    pointRadius: 0,
    hoverRadius: 4,
    tension: 0.2,
    hidden: !visibleAxes[group][axisIndex],
  }))
}

function renderCharts() {
  chartAcc?.destroy()
  chartGyr?.destroy()
  chartMag?.destroy()
  const labels = values.value.map((_, index) => `${index * interval.value}ms`)
  if (canvasAcc.value)
    chartAcc = new Chart(canvasAcc.value, {
      type: 'line',
      data: { labels, datasets: createDatasets(0, '加速度', 'acc') },
      options: chartOptions('m/s²'),
    })
  if (canvasGyr.value)
    chartGyr = new Chart(canvasGyr.value, {
      type: 'line',
      data: { labels, datasets: createDatasets(3, '角速度', 'gyr') },
      options: chartOptions('deg/s'),
    })
  if (canvasMag.value)
    chartMag = new Chart(canvasMag.value, {
      type: 'line',
      data: { labels, datasets: createDatasets(6, '磁場', 'mag') },
      options: chartOptions('µT'),
    })
}

function toggleAxis(group: keyof typeof visibleAxes, axisIndex: number) {
  visibleAxes[group][axisIndex] = !visibleAxes[group][axisIndex]
  const chart =
    group === 'acc' ? chartAcc : group === 'gyr' ? chartGyr : chartMag
  chart?.setDatasetVisibility(axisIndex, visibleAxes[group][axisIndex])
  chart?.update()
}

function resetData() {
  currentData.value = createDefaultData()
  fileName.value = '已載入範例資料'
  errorMessage.value = ''
  visibleAxes.acc.fill(true)
  visibleAxes.gyr.fill(true)
  visibleAxes.mag.fill(true)
  nextTick(renderCharts)
}

function openFilePicker() {
  fileInput.value?.click()
}

function loadFile(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    try {
      currentData.value = JSON.parse(String(reader.result)) as SensorData
      fileName.value = `已載入：${file.name}`
      errorMessage.value = ''
      nextTick(renderCharts)
    } catch {
      errorMessage.value = '無效的 JSON 格式，請重新選擇檔案。'
    }
  }
  reader.readAsText(file)
}

onMounted(renderCharts)
onBeforeUnmount(() => {
  chartAcc?.destroy()
  chartGyr?.destroy()
  chartMag?.destroy()
})
</script>

<template>
  <div class="mx-auto w-[min(100%,1180px)] p-6 max-md:p-4">
    <UIPageHeader
      title="感測器時序可視化分析"
      description="解析 Arduino Nano 33 BLE / Edge Impulse 結構化 9 軸封包"
      class="mb-4"
    />

    <UIPageContent class="flex flex-col gap-6">
      <input
        ref="fileInput"
        type="file"
        accept=".json,application/json"
        class="hidden"
        @change="loadFile"
      />
      <div
        class="flex flex-col justify-between gap-2 sm:flex-row sm:items-center"
      >
        <div
          class="inline-flex items-center gap-2 self-start rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 sm:self-auto"
        >
          <span class="size-1.5 animate-pulse rounded-full bg-emerald-500" />{{
            fileName
          }}
        </div>
        <div class="flex items-center gap-2">
          <UIFormButton size="sm" text="載入 JSON" @click="openFilePicker">
            <FileUp :size="14" aria-hidden="true" />
          </UIFormButton>
          <UIFormButton
            size="sm"
            variant="outline"
            text="重設資料"
            @click="resetData"
          >
            <RotateCcw :size="14" aria-hidden="true" />
          </UIFormButton>
        </div>
      </div>
      <p
        v-if="errorMessage"
        class="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
      >
        {{ errorMessage }}
      </p>

      <div class="grid grid-cols-2 gap-3 md:grid-cols-4">
        <div
          v-for="item in [
            {
              label: '裝置 MAC',
              value: payload.device_name || 'N/A',
              note: 'Device Identifier',
              icon: Smartphone,
            },
            {
              label: '硬體型號',
              value: payload.device_type || 'N/A',
              note: 'MCU Architecture',
              icon: Cpu,
            },
            {
              label: '取樣週期 / 總時長',
              value: `${interval} ms (${totalSeconds}s)`,
              note: `${frequency} Hz Frequency`,
              icon: Clock3,
            },
            {
              label: '採集點數 (Samples)',
              value: values.length.toLocaleString(),
              note: 'Total Vector Records',
              icon: Gauge,
            },
          ]"
          :key="item.label"
          class="min-w-0 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
        >
          <div
            class="flex items-center justify-between text-xs font-medium text-slate-500"
          >
            {{ item.label
            }}<component
              :is="item.icon"
              :size="15"
              class="opacity-70"
              aria-hidden="true"
            />
          </div>
          <div class="mt-2 truncate font-mono text-sm font-bold text-slate-900">
            {{ item.value }}
          </div>
          <p class="mt-1 truncate text-[11px] text-slate-500">
            {{ item.note }}
          </p>
        </div>
      </div>

      <section
        v-for="chart in [
          {
            key: 'acc',
            title: '加速度',
            subtitle: 'X, Y, Z 三軸線性加速度數值變化',
            unit: 'm/s²',
          },
          {
            key: 'gyr',
            title: '角速度',
            subtitle: 'X, Y, Z 三軸旋轉動態角速度',
            unit: 'deg/s',
          },
          {
            key: 'mag',
            title: '磁場強度',
            subtitle: '地磁感應微特斯拉向量',
            unit: 'µT',
          },
        ]"
        :key="chart.key"
        class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
      >
        <div
          class="flex flex-col justify-between gap-3 border-b border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:px-5"
        >
          <div>
            <div class="flex items-center gap-2">
              <h2 class="text-base font-bold tracking-tight text-slate-900">
                {{ chart.title }}
              </h2>
              <span
                class="rounded-full border border-slate-200 px-2 py-0.5 font-mono text-xs text-slate-500"
                >{{ chart.unit }}</span
              >
            </div>
            <p class="mt-1 text-xs text-slate-500">{{ chart.subtitle }}</p>
          </div>
          <div class="flex items-center gap-1.5 sm:gap-2">
            <button
              v-for="(axis, axisIndex) in axisColors"
              :key="axis.label"
              type="button"
              class="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium transition sm:text-sm"
              :class="
                visibleAxes[chart.key as keyof typeof visibleAxes][axisIndex]
                  ? axisIndex === 0
                    ? 'border-rose-500/30 bg-rose-500/10 text-rose-600'
                    : axisIndex === 1
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600'
                      : 'border-sky-500/30 bg-sky-500/10 text-sky-600'
                  : 'border-slate-200 bg-slate-100 text-slate-400 line-through opacity-60'
              "
              @click="
                toggleAxis(chart.key as keyof typeof visibleAxes, axisIndex)
              "
            >
              <span
                class="size-2 rounded-full"
                :style="{ backgroundColor: axis.line }"
              />{{ axis.label }}
            </button>
          </div>
        </div>
        <div class="h-64 p-4 pt-3 sm:h-80 sm:p-5 sm:pt-3">
          <canvas
            :ref="
              (element) => {
                if (chart.key === 'acc')
                  canvasAcc = element as HTMLCanvasElement
                if (chart.key === 'gyr')
                  canvasGyr = element as HTMLCanvasElement
                if (chart.key === 'mag')
                  canvasMag = element as HTMLCanvasElement
              }
            "
          />
        </div>
      </section>
    </UIPageContent>
  </div>
</template>

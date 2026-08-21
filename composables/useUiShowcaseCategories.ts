import type { Component } from 'vue'
import {
  AppWindow,
  CalendarDays,
  Images,
  LayoutGrid,
  MessageCircleMore,
  MousePointerClick,
  PanelsTopLeft,
  Rows3,
  Table2,
  TextCursorInput,
} from '@lucide/vue'

export interface UiShowcaseCategory {
  title: string
  subtitle: string
  description: string
  to: string
  icon: Component
  showInOverview: boolean
}

const categories: readonly UiShowcaseCategory[] = [
  {
    title: '總覽',
    subtitle: '9 個分類',
    description: '瀏覽專案內所有 UI 元件分類。',
    to: '/UI',
    icon: LayoutGrid,
    showInOverview: false,
  },
  {
    title: '按鈕',
    subtitle: '5 個元件',
    description: '操作、選項與下拉選單。',
    to: '/UI/buttons',
    icon: MousePointerClick,
    showInOverview: true,
  },
  {
    title: '表單',
    subtitle: '13 個元件',
    description: '輸入、選項與數值控制。',
    to: '/UI/forms',
    icon: TextCursorInput,
    showInOverview: true,
  },
  {
    title: '選擇器',
    subtitle: '1 個元件',
    description: '可重複使用的卡片選項。',
    to: '/UI/selections',
    icon: CalendarDays,
    showInOverview: true,
  },
  {
    title: '視窗',
    subtitle: '1 個元件',
    description: '尺寸、操作區、鎖定與長內容。',
    to: '/UI/modals',
    icon: AppWindow,
    showInOverview: true,
  },
  {
    title: '回饋狀態',
    subtitle: '4 個元件',
    description: 'Alert、空狀態、載入與骨架。',
    to: '/UI/feedback',
    icon: MessageCircleMore,
    showInOverview: true,
  },
  {
    title: '內容',
    subtitle: '7 個元件',
    description: '標題、資料列與狀態。',
    to: '/UI/content',
    icon: Rows3,
    showInOverview: true,
  },
  {
    title: '版面',
    subtitle: '4 個元件',
    description: '導覽、流程與頁尾容器。',
    to: '/UI/layout',
    icon: PanelsTopLeft,
    showInOverview: true,
  },
  {
    title: '表格',
    subtitle: '1 個元件',
    description: '原生表格的統一樣式包裝器。',
    to: '/UI/tables',
    icon: Table2,
    showInOverview: true,
  },
  {
    title: '圖片',
    subtitle: '2 個元件',
    description: '圖片上傳、預覽與空狀態顯示。',
    to: '/UI/images',
    icon: Images,
    showInOverview: true,
  },
]

export const useUiShowcaseCategories = () => categories

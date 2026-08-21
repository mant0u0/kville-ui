import { FilePlus2, LayoutDashboard, LibraryBig } from '@lucide/vue'
import type { Component } from 'vue'

export interface AppNavigationItem {
  title: string
  description: string
  to: string
  icon: Component
  hasChildren?: boolean
}

const mainNavigation: readonly AppNavigationItem[] = [
  {
    title: '總覽',
    description: '查看所有工作區與頁面入口。',
    to: '/',
    icon: LayoutDashboard,
  },
  {
    title: 'UI 介面',
    description: '瀏覽元件分類、互動範例與使用方式。',
    to: '/UI',
    icon: LibraryBig,
    hasChildren: true,
  },
  {
    title: '空白範例頁',
    description: '可作為不含子頁的獨立頁面起點。',
    to: '/example',
    icon: FilePlus2,
  },
]

export const useAppNavigation = () => {
  const uiCategories = useUiShowcaseCategories()
  const homeItem = mainNavigation[0]
  const uiWorkspace = mainNavigation[1]
  const pageItems = mainNavigation.filter(
    (item) => item.to !== '/' && !item.hasChildren,
  )
  const workspaceItems = mainNavigation.filter((item) => item.hasChildren)

  const uiNavigation: readonly AppNavigationItem[] = [
    {
      ...homeItem,
      title: '首頁',
    },
    {
      title: '總覽',
      description: uiWorkspace.description,
      to: uiWorkspace.to,
      icon: LibraryBig,
    },
    ...uiCategories
      .filter((category) => category.showInOverview)
      .map(({ title, description, to, icon }) => ({
        title,
        description,
        to,
        icon,
      })),
  ]

  return {
    homeItem,
    mainNavigation,
    pageItems,
    uiNavigation,
    uiWorkspace,
    workspaceItems,
  }
}

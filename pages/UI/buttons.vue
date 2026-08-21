<script setup lang="ts">
import { Images, UserRound } from '@lucide/vue'
import type { NavMenuConfig } from '~/components/UI/Button/NavMenu.vue'

const selectedChoice = ref('下午')
const lastAction = ref('尚未操作')

const setAction = (message: string) => {
  lastAction.value = message
}

const demoDropdown: NavMenuConfig = {
  items: [
    { text: '編輯資料', onClick: () => setAction('點擊：編輯資料') },
    { text: '查看紀錄', onClick: () => setAction('點擊：查看紀錄') },
    {
      text: '刪除帳號',
      onClick: () => setAction('點擊：刪除帳號'),
      isRed: true,
    },
  ],
}
</script>

<template>
  <ShowcasePage
    title="按鈕"
    description="主要操作、單選狀態與可選下拉行為。所有範例都可直接互動。"
  >
    <ShowcaseSection
      title="頁面操作按鈕"
      component-name="UIButtonPageBottom"
      description="用於頁面底部的主要與次要操作，內容由預設 slot 提供。"
      usage='<UIButtonPageBottom variant="primary">確認變更</UIButtonPageBottom>'
    >
      <div class="flex flex-wrap items-center justify-center gap-3 py-20">
        <UIButtonPageBottom
          variant="primary"
          @click="setAction('點擊：確認變更')"
          >確認變更</UIButtonPageBottom
        >
        <UIButtonPageBottom
          variant="secondary"
          @click="setAction('點擊：返回上一步')"
          >返回上一步</UIButtonPageBottom
        >
      </div>
      <p class="text-brand-600 mt-3.5 mb-0 text-[13px]">{{ lastAction }}</p>
    </ShowcaseSection>

    <ShowcaseSection
      title="圖示區塊按鈕"
      component-name="UIButtonIconBlock"
      description="適合總覽或功能入口，可傳入標題、次標題、說明、圖示與前往位置。"
      usage='<UIButtonIconBlock title="圖片" subtitle="2 個元件" description="圖片上傳與顯示。" :icon="Images" to="/UI/images" />'
    >
      <div class="mx-auto w-[min(100%,480px)]">
        <UIButtonIconBlock
          title="圖片"
          subtitle="2 個元件"
          description="圖片上傳、預覽與空狀態顯示。"
          :icon="Images"
          to="/UI/images"
        />
      </div>
    </ShowcaseSection>

    <ShowcaseSection
      title="展示頁頁籤"
      component-name="UIButtonPageTab"
      description="用於 UI 展示頁分類導覽；active 狀態會標示目前頁面並自動捲入可視範圍。"
      usage='<UIButtonPageTab title="按鈕" to="/UI/buttons" active />'
    >
      <div class="flex flex-wrap items-center justify-center gap-2 py-10">
        <UIButtonPageTab title="總覽" to="/UI" />
        <UIButtonPageTab title="按鈕" to="/UI/buttons" active />
        <UIButtonPageTab title="圖片" to="/UI/images" />
      </div>
    </ShowcaseSection>

    <ShowcaseSection
      title="選項按鈕"
      component-name="UIButtonChoice"
      description="提供 default、selected、disabled 三種狀態，使用 select event 更新選擇。"
      usage='<UIButtonChoice text="下午" state="selected" @select="selectPeriod" />'
    >
      <div class="grid grid-cols-3 gap-3">
        <UIButtonChoice
          text="上午"
          :state="selectedChoice === '上午' ? 'selected' : 'default'"
          @select="selectedChoice = '上午'"
        />
        <UIButtonChoice
          text="下午"
          :state="selectedChoice === '下午' ? 'selected' : 'default'"
          @select="selectedChoice = '下午'"
        />
        <UIButtonChoice text="晚上" state="disabled" status-text="已滿" />
      </div>
    </ShowcaseSection>

    <ShowcaseSection
      title="導覽／下拉按鈕"
      component-name="UIButtonNavMenu"
      description="文字、圖示、點擊函式與下拉設定均可自訂；項目可設定為危險色。"
      tone="brand"
      usage='<UIButtonNavMenu text="王小明" :icon="UserRound" has-dropdown :dropdown="menuConfig" />'
    >
      <div class="flex flex-wrap items-center justify-center gap-3 py-20">
        <UIButtonNavMenu
          text="王小明"
          :icon="UserRound"
          has-dropdown
          :dropdown="demoDropdown"
        />
        <UIButtonNavMenu
          text="一般操作"
          :on-click="() => setAction('點擊：一般操作')"
        />
      </div>
    </ShowcaseSection>
  </ShowcasePage>
</template>

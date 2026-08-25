# 專案開發與文件同步規範 (Agent Guidelines)

## 專案概要

- 這是 Nuxt 3 與 Vue 3 的 TypeScript 元件展示工作區，主要程式碼位於根目錄下的 `components/`、`composables/` 與 `pages/`，沒有 `src/` 目錄。
- `components/UI/` 放可重用 UI 元件；`components/Showcase/` 放展示頁的共用外框；`pages/UI/` 是各元件分類的互動展示頁。
- Tailwind CSS v4 透過 `@tailwindcss/vite` 整合，樣式入口是 `assets/styles/main.css`；元件圖示使用 `@lucide/vue`。
- 優先沿用現有元件 API、`<script setup lang="ts">`、Nuxt auto-import 與 Tailwind class 寫法，避免引入平行抽象或重複元件。

## 常用命令

先執行 `npm install` 安裝依賴。可用命令如下：

| 目的       | 命令                   |
| ---------- | ---------------------- |
| 開發伺服器 | `npm run dev`          |
| 格式檢查   | `npm run format:check` |
| 自動格式化 | `npm run format`       |
| 生產建置   | `npm run build`        |
| 靜態產生   | `npm run generate`     |
| 預覽建置   | `npm run preview`      |

目前 `package.json` 沒有獨立的 lint 或 test script；完成修改後至少執行受影響範圍可用的格式檢查，並在元件、路由或設定變更時執行 `npm run build`。

## 專案文件

- 根本開發流程與 Nuxt 指令參見 [README.md](README.md)。
- 元件文件集中於 `docs/`，例如 [docs/UI/Form/HoverText.md](docs/UI/Form/HoverText.md)。先讀取受影響模組的文件，再以目前程式碼核對內容。

## 文件優先檢查

每次 AI 接收到與專案程式碼、元件、功能、API、設定或除錯相關的請求時，開始處理前都必須先檢查 `docs/` 是否已有對應文件。

1. **定位對應文件**：依照下方鏡像目錄規則尋找受影響程式碼的 Markdown 文件；若請求涉及既有模組，也需一併查看該模組文件。
2. **以程式碼為準核對**：閱讀目前實作，確認文件中的用途、公開介面、參數、狀態、限制與使用方式仍然正確；不得依推測補寫未實作的行為。
3. **缺漏時補齊**：若對應文件不存在，依現有程式碼建立文件；若內容不完整、過時或缺少重要細節，僅局部補充或修正受影響段落。
4. **保留既有內容**：除非內容已與程式碼衝突，否則不得刪除原有說明；所有新增或修正必須可由目前程式碼驗證。

## 核心職責

每當你修改、重構或新增程式碼時，必須自動檢查並同步更新 `docs/` 下的對應 Markdown 文件。

## 鏡像目錄映射規則 (Path Mapping)

文件集中於 `docs/`，結構與目前根目錄的程式碼路徑 1:1 鏡像對齊：

- 元件對應：`components/{path}/{filename}.vue` ➜ `docs/{path}/{filename}.md`
- Composable 對應：`composables/{filename}.ts` ➜ `docs/composables/{filename}.md`
- 頁面對應：`pages/{path}/{filename}.vue` ➜ `docs/pages/{path}/{filename}.md`
- 模組對應：若目錄包含多個互相協作的檔案，使用對應目錄下的 `index.md`。
- 若修改的是 `app.vue`、`nuxt.config.ts` 或其他根目錄設定，使用 `docs/` 下語意相符的文件；找不到時才建立最小必要文件。

## 編輯準則

1. **局部增修**：只改動受本次程式碼變更影響的章節（如參數、型別、行為邏輯），禁止覆寫既有內容。
2. **自動建檔**：若為新模組且對應 `.md` 不存在，依照鏡像路徑於 `docs/` 建立新檔。
3. **回報記錄**：在完成回應時註明已修改的 `.md` 路徑。

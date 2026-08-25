# UIFormCopy

顯示由 `text` prop 提供的文字，並提供複製按鈕。成功複製後，按鈕圖示會暫時由複製圖示變為勾勾，約 2 秒後恢復。

## 使用方式

```vue
<UIFormCopy text="copy-this-text" />
<UIFormCopy text="不可複製的文字" disabled />
```

## Props

| 名稱       | 型別      | 預設值  | 說明                                       |
| ---------- | --------- | ------- | ------------------------------------------ |
| `text`     | `string`  | `''`    | 顯示及複製的文字。空字串時複製按鈕會停用。 |
| `disabled` | `boolean` | `false` | 停用輸入框與複製按鈕。                     |

## 行為與限制

- 元件沒有 `v-model`；複製內容永遠取自 `text` prop。
- 複製功能使用瀏覽器的 `navigator.clipboard.writeText()`，需要瀏覽器允許 Clipboard API。
- 輸入框目前透過 `value` 顯示文字，未設定 `readonly` 屬性；使用者若直接編輯畫面內容，實際複製值仍不會改變。
- 沒有提供 slots 或自訂事件。

# UIFormButton

表單或欄位旁的操作按鈕。元件固定為 44px 高，提供主要、次要、外框與警告樣式，內容由預設 slot 提供。

## 使用方式

```vue
<UIFormButton variant="outline" @click="lookup">查詢</UIFormButton>
<UIFormButton type="submit">送出</UIFormButton>
<UIFormButton warning>刪除</UIFormButton>
```

## Props

| 名稱       | 型別                                    | 預設值      | 說明                                          |
| ---------- | --------------------------------------- | ----------- | --------------------------------------------- |
| `type`     | `'button' \| 'submit' \| 'reset'`       | `'button'`  | 原生 button type。                            |
| `variant`  | `'primary' \| 'secondary' \| 'outline'` | `'primary'` | 一般狀態的視覺變體。                          |
| `disabled` | `boolean`                               | `false`     | 停用按鈕並套用停用樣式。                      |
| `warning`  | `boolean`                               | `false`     | 使用警告色樣式，會覆蓋 `variant` 的一般配色。 |

## Slots

| 名稱    | 說明                       |
| ------- | -------------------------- |
| default | 按鈕文字、圖示或其他內容。 |

# UIFormPassword

密碼輸入欄位。預設隱藏內容，使用者可透過右側按鈕切換顯示與隱藏，並共用一般表單欄位的尺寸與狀態樣式。

## 使用方式

```vue
<UIFormPassword
  v-model="password"
  placeholder="請輸入密碼"
  autocomplete="new-password"
  required
/>
```

## Model

`v-model` 型別為 `string`，預設值為空字串。

## Props

| 名稱           | 型別                | 預設值               | 說明                                    |
| -------------- | ------------------- | -------------------- | --------------------------------------- |
| `placeholder`  | `string`            | `''`                 | 原生 placeholder。                      |
| `required`     | `boolean`           | `false`              | 設定原生 required。                     |
| `disabled`     | `boolean`           | `false`              | 停用輸入與顯示切換按鈕。                |
| `readonly`     | `boolean`           | `false`              | 設定原生 readonly；仍可切換顯示與隱藏。 |
| `autocomplete` | `string`            | `'current-password'` | 原生 autocomplete 值。                  |
| `warning`      | `boolean`           | `false`              | 將有效狀態轉為 `error` 視覺樣式。       |
| `status`       | `FormControlStatus` | `'default'`          | `default`、`error` 或 `warning`。       |
| `size`         | `FormControlSize`   | `'md'`               | `sm`、`md` 或 `lg`。                    |

切換按鈕具備 `aria-label` 與 `aria-pressed`；有效狀態為 `error` 時輸入框會設定 `aria-invalid="true"`。

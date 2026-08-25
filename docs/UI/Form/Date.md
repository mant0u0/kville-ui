# UIFormDate

封裝原生 `date` input，並套用共用表單欄位樣式、尺寸與狀態。

## 使用方式

```vue
<UIFormDate v-model="selectedDate" min="2026-08-01" max="2026-12-31" required />
```

## Model

`v-model` 型別為 `string`，預設值為空字串。值的格式遵循瀏覽器原生 date input，通常為 `YYYY-MM-DD`。

## Props

| 名稱       | 型別                  | 預設值      | 說明                              |
| ---------- | --------------------- | ----------- | --------------------------------- |
| `min`      | `string \| undefined` | `undefined` | 原生可選日期下限。                |
| `max`      | `string \| undefined` | `undefined` | 原生可選日期上限。                |
| `required` | `boolean`             | `false`     | 設定原生 required。               |
| `disabled` | `boolean`             | `false`     | 停用輸入。                        |
| `readonly` | `boolean`             | `false`     | 設定原生 readonly。               |
| `warning`  | `boolean`             | `false`     | 將有效狀態轉為 `error` 視覺樣式。 |
| `status`   | `FormControlStatus`   | `'default'` | `default`、`error` 或 `warning`。 |
| `size`     | `FormControlSize`     | `'md'`      | `sm`、`md` 或 `lg`。              |

日期欄位會在有效狀態為 `error` 時設定 `aria-invalid="true"`。

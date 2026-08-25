# UIFormTextarea

封裝原生多行文字輸入框，提供 rows、maxlength、resize 與共用表單欄位尺寸及狀態樣式。

## 使用方式

```vue
<UIFormTextarea
  v-model="note"
  :rows="4"
  :maxlength="500"
  resize="vertical"
  placeholder="請輸入特殊需求"
/>
```

## Model

`v-model` 型別為 `string`，預設值為空字串。

## Props

| 名稱          | 型別                                             | 預設值       | 說明                              |
| ------------- | ------------------------------------------------ | ------------ | --------------------------------- |
| `placeholder` | `string`                                         | `''`         | 原生 placeholder。                |
| `rows`        | `number`                                         | `4`          | 原生 textarea rows。              |
| `maxlength`   | `number \| undefined`                            | `undefined`  | 原生最大字元數。                  |
| `required`    | `boolean`                                        | `false`      | 設定原生 required。               |
| `disabled`    | `boolean`                                        | `false`      | 停用輸入。                        |
| `readonly`    | `boolean`                                        | `false`      | 設定原生 readonly。               |
| `warning`     | `boolean`                                        | `false`      | 將有效狀態轉為 `error` 視覺樣式。 |
| `resize`      | `'none' \| 'vertical' \| 'horizontal' \| 'both'` | `'vertical'` | 控制原生 textarea 的調整方向。    |
| `status`      | `FormControlStatus`                              | `'default'`  | `default`、`error` 或 `warning`。 |
| `size`        | `FormControlSize`                                | `'md'`       | `sm`、`md` 或 `lg`。              |

有效狀態為 `error` 時會設定 `aria-invalid="true"`。

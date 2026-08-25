# UIFormNumber

封裝原生 `number` input，提供數值型 `v-model` 與最小值、最大值、步進設定，並使用共用表單欄位樣式。

## 使用方式

```vue
<UIFormNumber v-model="participantCount" :min="1" :max="10" />
<UIFormNumber v-model="amount" :step="0.5" size="lg" />
```

## Model

`v-model` 型別為 `number | undefined`，預設值為 `undefined`。元件使用 `v-model.number`，空值或無法轉換的原生輸入可能得到 `undefined`。

## Props

| 名稱          | 型別                  | 預設值      | 說明                              |
| ------------- | --------------------- | ----------- | --------------------------------- |
| `min`         | `number \| undefined` | `undefined` | 原生數值下限。                    |
| `max`         | `number \| undefined` | `undefined` | 原生數值上限。                    |
| `step`        | `number`              | `1`         | 原生數值步進。                    |
| `placeholder` | `string`              | `''`        | 原生 placeholder。                |
| `required`    | `boolean`             | `false`     | 設定原生 required。               |
| `disabled`    | `boolean`             | `false`     | 停用輸入。                        |
| `readonly`    | `boolean`             | `false`     | 設定原生 readonly。               |
| `warning`     | `boolean`             | `false`     | 將有效狀態轉為 `error` 視覺樣式。 |
| `status`      | `FormControlStatus`   | `'default'` | `default`、`error` 或 `warning`。 |
| `size`        | `FormControlSize`     | `'md'`      | `sm`、`md` 或 `lg`。              |

有效狀態為 `error` 時會設定 `aria-invalid="true"`。

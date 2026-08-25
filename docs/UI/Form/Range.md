# UIFormRange

封裝原生 range input，並以 CSS 漸層顯示目前值的進度；可選擇在右側顯示數值與單位後綴。

## 使用方式

```vue
<UIFormRange
  v-model="intensity"
  :min="0"
  :max="100"
  :step="5"
  value-suffix="%"
/>

<UIFormRange v-model="volume" :show-value="false" />
```

## Model

`v-model` 型別為 `number`，預設值為 `0`。元件使用 `v-model.number`。

## Props

| 名稱          | 型別      | 預設值  | 說明                             |
| ------------- | --------- | ------- | -------------------------------- |
| `min`         | `number`  | `0`     | 原生 range 下限。                |
| `max`         | `number`  | `100`   | 原生 range 上限。                |
| `step`        | `number`  | `1`     | 原生 range 步進。                |
| `disabled`    | `boolean` | `false` | 停用拖曳與鍵盤調整。             |
| `showValue`   | `boolean` | `true`  | 是否顯示 `<output>`。            |
| `valueSuffix` | `string`  | `''`    | 顯示在數值後方的文字，例如 `%`。 |
| `warning`     | `boolean` | `false` | 套用警告色進度、滑塊與輸出樣式。 |

進度百分比由 `(model - min) / (max - min) * 100` 計算。元件本身未提供 label 或 `aria-label`，需要由外層自行提供可存取名稱。

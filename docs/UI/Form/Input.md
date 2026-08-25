# UIFormInput

封裝原生文字輸入框，負責 `v-model` 與原生輸入狀態，並使用共用表單欄位樣式。

## 使用方式

```vue
<UIFormInput v-model="name" placeholder="請輸入姓名" />
<UIFormInput v-model="code" status="error" size="sm" />
```

## Model

`v-model` 型別為 `string`，預設值為空字串。

## Props

| 名稱          | 型別                | 預設值      | 說明                              |
| ------------- | ------------------- | ----------- | --------------------------------- |
| `type`        | `string`            | `'text'`    | 原生 input type。                 |
| `placeholder` | `string`            | `''`        | 原生 placeholder。                |
| `required`    | `boolean`           | `false`     | 設定原生 required。               |
| `disabled`    | `boolean`           | `false`     | 停用輸入。                        |
| `readonly`    | `boolean`           | `false`     | 設定原生 readonly。               |
| `warning`     | `boolean`           | `false`     | 將有效狀態轉為 `error` 視覺樣式。 |
| `status`      | `FormControlStatus` | `'default'` | `default`、`error` 或 `warning`。 |
| `size`        | `FormControlSize`   | `'md'`      | `sm`、`md` 或 `lg`。              |

有效狀態為 `error` 時會設定 `aria-invalid="true"`。樣式由 [useFormControlStyles](../../../composables/useFormControlStyles.ts) 統一組合。

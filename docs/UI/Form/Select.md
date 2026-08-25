# UIFormSelect

封裝原生 select，使用 options 陣列產生選項，並加上共用表單欄位樣式與下拉箭頭圖示。

## 使用方式

```vue
<UIFormSelect
  v-model="location"
  :options="locationOptions"
  placeholder="請選擇門市"
/>
```

```ts
const locationOptions = [
  { label: '台北門市', value: 'taipei' },
  { label: '高雄門市（暫停服務）', value: 'kaohsiung', disabled: true },
]
```

## Model

`v-model` 型別為 `string | number`，預設值為空字串。

## Props

| 名稱          | 型別                 | 預設值      | 說明                                                                 |
| ------------- | -------------------- | ----------- | -------------------------------------------------------------------- |
| `options`     | `FormSelectOption[]` | 無，必要    | 要渲染的選項陣列。                                                   |
| `placeholder` | `string`             | `'請選擇'`  | 顯示在第一個 disabled option 的提示文字；空字串時不渲染提示 option。 |
| `required`    | `boolean`            | `false`     | 設定原生 required。                                                  |
| `disabled`    | `boolean`            | `false`     | 停用 select。                                                        |
| `warning`     | `boolean`            | `false`     | 將有效狀態轉為 `error` 視覺樣式。                                    |
| `status`      | `FormControlStatus`  | `'default'` | `default`、`error` 或 `warning`。                                    |
| `size`        | `FormControlSize`    | `'md'`      | `sm`、`md` 或 `lg`。                                                 |

## FormSelectOption

| 欄位       | 型別                   | 說明           |
| ---------- | ---------------------- | -------------- |
| `label`    | `string`               | 顯示文字。     |
| `value`    | `string \| number`     | 選項值。       |
| `disabled` | `boolean \| undefined` | 只停用此選項。 |

有效狀態為 `error` 時會設定 `aria-invalid="true"`。

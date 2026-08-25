# UIFormRadioGroup

依照 options 陣列產生一組 Radio，統一處理選項值、群組名稱、排列方向、停用與警告狀態。

## 使用方式

```vue
<UIFormRadioGroup
  v-model="contactMethod"
  :options="contactOptions"
  direction="vertical"
/>
```

```ts
const contactOptions = [
  { label: 'Email', value: 'email' },
  { label: '電話', value: 'phone' },
  { label: '簡訊', value: 'sms', disabled: true },
]
```

## Model

`v-model` 型別為 `string | number`，為必要的 model。

## Props

| 名稱        | 型別                         | 預設值         | 說明                                                     |
| ----------- | ---------------------------- | -------------- | -------------------------------------------------------- |
| `options`   | `FormRadioOption[]`          | 無，必要       | 要產生的 Radio 選項。                                    |
| `name`      | `string \| undefined`        | `undefined`    | 原生 radio 群組名稱；未提供時使用 `useId()` 產生的名稱。 |
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | 水平換行或垂直排列。                                     |
| `disabled`  | `boolean`                    | `false`        | 停用整組選項。                                           |
| `warning`   | `boolean`                    | `false`        | 將整組選項套用警告色樣式。                               |

## FormRadioOption

| 欄位       | 型別                   | 說明           |
| ---------- | ---------------------- | -------------- |
| `label`    | `string`               | 選項文字。     |
| `value`    | `string \| number`     | 選項值。       |
| `disabled` | `boolean \| undefined` | 只停用此選項。 |

單一選項的停用狀態會合併整組的 `disabled` 與該 option 的 `disabled`。元件根節點設定 `role="radiogroup"`。

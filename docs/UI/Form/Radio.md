# UIFormRadio

單一原生 radio 控制項的自訂外觀元件。多個 Radio 應使用相同的 `name` 組成原生選項群組。

## 使用方式

```vue
<UIFormRadio
  v-model="contactMethod"
  name="contact"
  value="email"
  label="Email"
/>

<UIFormRadio
  v-model="enabled"
  name="feature"
  value="yes"
  aria-label="啟用功能"
/>
```

## Model

`v-model` 型別為 `string | number`，為必要的 model。

## Props

| 名稱        | 型別                  | 預設值      | 說明                                                     |
| ----------- | --------------------- | ----------- | -------------------------------------------------------- |
| `value`     | `string \| number`    | 無，必要    | 此 Radio 代表的值。                                      |
| `label`     | `string`              | `''`        | 沒有 default slot 時顯示的文字。                         |
| `name`      | `string \| undefined` | `undefined` | 原生 radio 群組名稱；手動組合多個 Radio 時應提供相同值。 |
| `disabled`  | `boolean`             | `false`     | 停用選項。                                               |
| `warning`   | `boolean`             | `false`     | 套用警告色樣式。                                         |
| `ariaLabel` | `string \| undefined` | `undefined` | 沒有 label 或 slot 時，提供 radio 的可存取名稱。         |

## Slots

| 名稱    | 說明                                        |
| ------- | ------------------------------------------- |
| default | 自訂 radio 旁的文字或內容；存在時優先使用。 |

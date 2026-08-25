# UIFormCheckbox

使用原生 checkbox 控制勾選狀態，並以自訂外觀呈現勾選、警告與停用狀態。

## 使用方式

```vue
<UIFormCheckbox v-model="agreed" label="我同意服務條款" />
<UIFormCheckbox v-model="enabled" aria-label="啟用通知" />
```

有 default slot 時，slot 內容會優先於 `label`：

```vue
<UIFormCheckbox v-model="newsletter" warning>
  接收通知與最新消息
</UIFormCheckbox>
```

## Model

`v-model` 型別為 `boolean`，預設值為 `false`。

## Props

| 名稱        | 型別                  | 預設值      | 說明                                                |
| ----------- | --------------------- | ----------- | --------------------------------------------------- |
| `label`     | `string`              | `''`        | 沒有 default slot 時顯示的文字。                    |
| `disabled`  | `boolean`             | `false`     | 停用原生 checkbox 與互動。                          |
| `warning`   | `boolean`             | `false`     | 套用警告色樣式。                                    |
| `ariaLabel` | `string \| undefined` | `undefined` | 沒有 label 或 slot 時，提供 checkbox 的可存取名稱。 |

## Slots

| 名稱    | 說明                                           |
| ------- | ---------------------------------------------- |
| default | 自訂 checkbox 旁的文字或內容；存在時優先使用。 |

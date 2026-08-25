# UIFormGroup

表單欄位的共用容器，負責標題、必填標記、warning 訊息、外框 class 與前後內容 slot；不綁定特定欄位元件。

## 使用方式

```vue
<UIFormGroup label="姓名" star>
  <UIFormInput v-model="name" />
</UIFormGroup>

<UIFormGroup label="Email" warning-text="格式不正確">
  <UIFormInput v-model="email" />
</UIFormGroup>
```

## Props

| 名稱          | 型別      | 預設值  | 說明                                                                  |
| ------------- | --------- | ------- | --------------------------------------------------------------------- |
| `label`       | `string`  | `''`    | 顯示欄位標題；空字串時不渲染標題區。值為 `'default'` 時顯示空白佔位。 |
| `star`        | `boolean` | `false` | 在標題後顯示必填星號。                                                |
| `merge`       | `boolean` | `false` | 將內容容器 class 從 `form-box w-full` 改為 `form-merge`。             |
| `groupClass`  | `string`  | `''`    | 加到最外層 group 的額外 class。                                       |
| `boxClass`    | `string`  | `''`    | 加到欄位內容容器的額外 class。                                        |
| `warning`     | `boolean` | `false` | 套用欄位警告外觀。                                                    |
| `warningText` | `string`  | `''`    | 顯示警告圖示與訊息；非空時也會啟用警告外觀。                          |

## Slots

| 名稱          | 說明                             |
| ------------- | -------------------------------- |
| `slot-before` | 標題與欄位內容之前。             |
| `slot-label`  | 插入標題文字後方，例如「選填」。 |
| default       | 欄位內容。                       |
| `slot-after`  | 欄位內容與 warning 訊息之後。    |

`warning` 會透過 scoped deep styles 影響內部 `.form-control`、Radio、Checkbox 與 Range 的部分外觀。

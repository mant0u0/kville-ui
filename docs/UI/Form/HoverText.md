# UIFormHoverText

在觸發內容移入或取得鍵盤焦點時，顯示半透明黑色的說明提示框。

## 使用方式

```vue
<UIFormHoverText text="顯示說明的文字">說明</UIFormHoverText>
```

未提供預設 slot 時，元件會顯示圓圈問號作為觸發圖示：

```vue
<UIFormHoverText text="顯示說明的文字" />
```

## Props

| 名稱   | 型別     | 預設值 | 說明                         |
| ------ | -------- | ------ | ---------------------------- |
| `text` | `string` | `''`   | 要顯示在提示框中的說明文字。 |

JUMP TO(may have problems): [中文](#配置)  [English](#configure)

> 请注意：目前版本配置仅为临时稳定版。
>
> NOTICE: Current configuration version is temporary stable version.

# Configure

`Your workspace dir/data/snippets/vsc_edit.config.json` is the configuration file.

Theme uses configuration file to enable parts of theme. This is the meaning of the file.

```json
{
    "theme": {
        "codeBlock": true,
        "reference": true,
        "bazaar": true,
        "embeddedBlock": true,
        "title": true
    },
    "plugins": {
        "shortcutPanel": true
    }
}
```

Change `true` to `false` in the file can disable corresponding part of theme.

## SiYuan Theme

### Code Block

The width of the line numbers on the left side of the code block has been modified, probably causing the line breaks in the code block and the display of line numbers to be out of sync. If your code block is severely affected, you can change `true` to `false`.

`"codeBlock": true/false,`

### Reference Anchor Text Styles

Reference anchor text styles add background for reference anchor text.

`"reference": true/false,`

### Bazaar Style

The style change of bazaar mostly move here, can switch on/off(I don't know what change...).

`"bazaar": true/false,`

### Embedded Block Style

It makes great change for embedded block, limit the height of embedded block. And may cause unknown problems.

`"embeddedBlock": true/false,`

### Title Style

Add special image for each title(h1#,h2##...)

`"title": true/false,`

## Plugin Adaption

### keymap(siyuan-plugin-keymap)

Add color for keymap panel's titles.

`"shortcutPanel": true/false,`

# 配置

`Your workspace dir/data/snippets/vsc_edit.config.json`是配置文件路径。

主题使用配置文件来定义各部分是否生效。以下是配置文件的设置含义。

```json
{
    "theme": {
        "codeBlock": true,
        "reference": true,
        "bazaar": true,
        "embeddedBlock": true,
        "title": true
    },
    "plugins": {
        "shortcutPanel": true
    }
}
```

在文件中将`true`更改为`false`就可以让对应的主题失效。

## 思源主题

### 代码块

代码块样式修改了代码块左侧行号的宽度，很可能导致代码块的换行和行号的显示不同步。如果你的代码块受到影响严重，可以将`true`改为`false`。

`"codeBlock": true/false,`

### 引用锚文本样式

引用锚文本样式给引用的锚文本添加了背景。

`"reference": true/false,`

### 集市样式

对集市所做的样式更改基本上已经移动到这里，可以选择开关（不知道改了什么东西了）。

`"bazaar": true/false,`

### 嵌入块样式

这个改变严重，限制了嵌入块的高度。并且还可能导致未知的错误。

`"embeddedBlock": true/false,`

### 标题样式

为不同的标题添加独特的图片(h1#,h2##...)

`"title": true/false,`

## 插件适配

### 快捷键(siyuan-plugin-keymap)

对快捷键面板的标题添加了颜色。

`"shortcutPanel": true/false,`
LINK: [中文](#配置)  [English](#configure)

请注意：注释会在主题版本更新后失效。

NOTICE: Comments will disable after update the theme.

# Configure

TRANSLATING...

Theme use `import` to incorporate different parts' theme. For example, `@import url("CodeBlock.css")` is used to import the style of code block. Belows are instruction about import and comment.

```css
/* Plugin adaptation, comment out if not used */
/* Shortcut Key Panel */
@import url(sub/plugin/keymapPlugin.css);

/* Formal Content */
/* Application button status bar */
@import url(sub/app/statusBar.css);
/* Application top title bar */
@import url(sub/app/toolbarHead.css);
/* Application page tabs */
@import url(sub/app/tabBar.css);
/* Title tabs h123456 */
@import url(sub/block/title.css);
/* List styles */
@import url(sub/block/list.css);
/* Code block styles */
@import url(sub/block/codeBlock.css);
/* Bazaar styles */
@import url(sub/app/bazaar.css);
/* Reference anchor text styles */
@import url(sub/block/reference.css);
```

`@import` line incorporate different parts into theme.

The line begins with `/*` and ends with `*/` is comment line. The content between `/*` and `*/` named comment. This means `/* comment text */` is a comment block.

The code in comment will not activate, so can set comments on `import` to disable them.

```css
/* The content belows are content without comment, it can change the style of title tab */
@import url(sub/block/title.css);
/* The content belows are content with comment, it can't change the style of title tab */
/* @import url(sub/block/title.css); */
```

By setting comments, you can disable those style you don't want to use. Here are the contents that can set comment.

## Code Block

The width of the line numbers on the left side of the code block has been modified, causing the line breaks in the code block and the display of line numbers to be out of sync. If your code block is severely affected, you can comment out this code.

## Reference Anchor Text Styles

Reference anchor text styles add background for reference anchor text.

## Embedded Block Style

Because it makes great change for embedded block, limit the height of embedded block and cause display height error for katex block in embedded block, so I hadn't add it into theme. If you want to have a try and help me improve it, you can contact me, I will provide code snippets for you.

# 配置

主题使用 `import`来导入各部分的内容。例如，`@import url("CodeBlock.css")`用于导入代码块的样式。以下是关于各部分内容的导入和注释的说明。

```css
/* 插件适配，不用的就注释掉 */
/* 快捷键面板 */
@import url(sub/plugin/keymapPlugin.css);

/* 正式内容 */
/* 应用程序底部状态栏 */
@import url(sub/app/statusBar.css);
/* 应用程序顶部标题栏 */
@import url(sub/app/toolbarHead.css);
/* 应用程序页面标签 */
@import url(sub/app/tabBar.css);
/* 标题标签h123456 */
@import url(sub/block/title.css);
/* 列表样式 */
@import url(sub/block/list.css);
/* 代码块样式 */
@import url(sub/block/codeBlock.css);
/* 集市相关样式 */
@import url(sub/app/bazaar.css);
/* 引用锚文本样式 */
@import url(sub/block/reference.css);
```

其中，`@import`行是各部分样式的导入，就是这些代码将其他的内容导入到样式中。

在代码中以 `/*`开头，以 `*/`结尾的行称为注释行，在 `/*`和 `*/`之间包围的内容称为注释。即 `/* 注释文字内容 */`这块文字块是一个注释。

在css中注释的内容不视为样式，可以通过给 `import`行注释的方法来让这部分样式失效。

```css
/* 下面是没有注释的内容，可以正常改变标题标签的样式 */
@import url(sub/block/title.css);
/* 下面是注释掉的内容，不能改变标题标签的样式 */
/* @import url(sub/block/title.css); */
```

通过添加注释，可以让你不想使用的样式失效。下面是建议可以选择注释的各部分样式的内容说明。

## 代码块

代码块样式修改了代码块左侧行号的宽度，导致代码块的换行和行号的显示不同步。如果你的代码块受到影响严重，可以注释掉这个代码。

## 引用锚文本样式

引用锚文本样式给引用的锚文本添加了背景。

## 嵌入块样式

这个由于改变严重，限制了嵌入块的高度，还导致嵌入块中的公式显示错位，所以先不加入主题中。如有希望试用和帮助改进的用户可联系我，提供代码片段给你。

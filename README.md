# 小待的个人藏宝库 · 重构版 v2

个人网站重构版（WorkBuddy 按 SOP 流程生成）。

- 纯静态 HTML/CSS/JS，无框架
- 深色优先设计：深蓝底 + 亮蓝主色 + 琥珀强调，支持暗/亮双主题
- 7 个页面：首页 / 关于我 / 学习笔记 / 项目展示 / 博客随笔 / 工具箱 / 联系我
- 工具箱页内联可用：随机数生成器、待办事项（localStorage）、六级单词速记
- 全站响应式，导航/页脚/主题由 `js/components.js` 注入

## 本地预览

```bash
python -m http.server 8124
# 打开 http://127.0.0.1:8124/index.html
```

## 目录

```
css/style.css          设计系统（主题变量 / 组件 / 响应式）
js/components.js       导航栏 / 页脚 / 明暗主题注入
js/script.js           滚动动画 / 博客过滤 / 工具箱逻辑
index.html  about.html  notes.html  projects.html  blog.html  tools.html  contact.html
images/wechat_qr.png   微信二维码
```

> 注：作品卡详情页、笔记/博客详情页为占位，后续补充对应内容页后替换即可。

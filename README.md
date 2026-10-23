# 我的前端学习轨迹

这是我从 HTML、CSS 和 JavaScript 开始练习的个人主页与作品集项目。

我会把每次学习拆成一个小步骤，保留代码、提交记录和学习笔记，慢慢把页面搭建完整。

## 项目内容

- 使用原生 HTML 搭建页面结构
- 使用 CSS 自定义颜色、布局和响应式样式
- 使用原生 JavaScript 添加菜单、滚动导航、返回顶部和复制邮箱等交互
- 用学习记录区展示从网页结构到测试和 Git 分支的过程
- 使用 Node.js 内置模块运行无依赖的 smoke test

## 学习进度

- [x] 认识 HTML、CSS、JavaScript 的分工
- [x] 搭建个人主页的页面结构
- [x] 添加响应式视觉系统
- [x] 添加基础 JavaScript 交互
- [x] 增加学习过程卡片和时间线
- [x] 把项目放入 GitHub 学习分支
- [ ] 把示例姓名、邮箱和项目内容替换成自己的资料
- [ ] 继续练习 CSS 布局和 JavaScript 事件
- [ ] 学习如何把完成的版本发布到线上

## 仓库结构

```text
index.html                 页面内容和语义结构
style.css                  颜色、布局、响应式规则
script.js                  菜单、滚动和按钮交互
tests/portfolio-smoke.mjs  无依赖的基础检查
learning-log/              每次学习后的记录
docs/                      项目设计和学习资料
```

## 如何本地查看

直接用浏览器打开 `index.html`，或者在项目目录运行：

```bash
python -m http.server 4173
```

然后打开 <http://localhost:4173>。

## 如何运行检查

```bash
node --check script.js
node tests/portfolio-smoke.mjs
```

## 学习记录格式

每次学习完成后，我会记录：

1. 今天学了什么
2. 我修改了什么
3. 我理解了什么
4. 遇到了什么问题
5. 下一步准备做什么

第一篇记录位于 [learning-log/01-project-in-github.md](learning-log/01-project-in-github.md)。

## 项目地址

- GitHub：[zhanghuanyuan361-pixel/my-first-project](https://github.com/zhanghuanyuan361-pixel/my-first-project)
- 当前学习分支：`learning/first-homepage`

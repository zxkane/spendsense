# 📄 PRD: 墨卡 - Markdown 社交卡片生成器

## 1. 项目概述

**产品名称**: 墨卡 (MoCard)

**Slogan**: 让文字，变成艺术

开发一个单页面 Web 应用 (SPA)，允许用户输入 Markdown 格式的文本，并实时预览生成一张精美的社交媒体分享卡片。用户可以切换卡片的主题风格，并最终将卡片导出为图片。

**目标用户**: 技术博主、开发者、内容创作者。

**核心价值**: 快速将枯燥的文字转化为高颜值的图片，用于 Twitter/X、LinkedIn 或微信朋友圈分享。

---

## 2. 技术栈与约束

| 类别 | 技术选型 | 说明 |
|------|----------|------|
| 框架 | Next.js 14+ (App Router) | 现代 React 服务端组件 |
| 样式 | Tailwind CSS | 必须使用 Utility-first class |
| 图标 | Lucide React | 轻量级图标库 |
| 部署 | Vercel | 无需配置服务器，纯前端 |
| Markdown 解析 | react-markdown | 或类似轻量级库 |
| 图片生成 | html-to-image | 用于将 DOM 节点转换为 PNG |
| E2E 测试 | Playwright | 必须适配 CI 环境 |

---

## 3. 功能需求

### 3.1 布局结构

页面分为左右两栏（移动端为上下堆叠）：

- **左侧/上方 (编辑区域)**: 编辑和配置区域
- **右侧/下方 (预览区域)**: 实时预览卡片效果的区域

### 3.2 核心功能详细描述

#### A. 文本编辑器

- 提供一个多行输入框 (`<textarea>`)
- 支持输入 Markdown 语法（至少支持：H1, H2, Bold, List, Code Block）
- **默认内容**: 页面加载时，输入框内应有一段默认的示例文本（Hello World 风格）
- **测试要求**: 输入框必须包含属性 `data-testid="markdown-input"`

#### B. 主题切换器

提供 **5 种具有中国特色的预设主题风格**：

##### 1. 水墨云烟 (ink-smoke)

**设计理念**: 极简、留白、禅意。模拟中国传统水墨画的晕染效果。

| 属性 | 值 |
|------|-----|
| 背景 | 宣纸米白色 (#F7F7F2)，底部有淡灰色渐变 |
| 字体 | 衬线体/宋体风格，标题使用深墨色 (#2C2C2C) |
| 强调色 | 印泥红 (#B22222) 用于边框或项目符号 |
| 氛围 | 宁静、智慧、传统 |

**演示文本**:
```markdown
# 代码如诗 🍵

> "写代码就像写诗，不仅要运行通畅，还要行文优美。"

### 程序员的修养
* **静**：心如止水，Bug 自除
* **悟**：算法无形，重在逻辑
* **简**：大道至简，拒绝冗余

*一杯茶，一包烟，一个 Bug 改一天。*
```

##### 2. 红运当头 (lucky-red)

**设计理念**: 故宫红墙金瓦风格，喜庆、庄重。适合发布版本、庆祝上线。

| 属性 | 值 |
|------|-----|
| 背景 | 中国红 (#C41E3A) 或渐变至深红 |
| 字体 | 标题使用金色/琥珀色 (#FFD700)；正文使用白色 |
| 装饰 | 添加金色实线边框 (2px)，带圆角 |
| 氛围 | 庆祝、官方、力量 |

**演示文本**:
```markdown
# 🚀 v1.0 正式上线

**大吉大利，今晚发布！**

我们很高兴地宣布，经过 996 个小时的奋斗，核心功能终于 Ready 了：

1.  **性能优化**：加载速度提升 200%
2.  **视觉升级**：全面支持深色模式
3.  **Bug 修复**：消灭了 50+ 个陈年老 Bug

> 祝大家：需求不变更，系统不宕机！🧧
```

##### 3. 赛博修仙 (cyber-taoist)

**设计理念**: 中国风赛博朋克。霓虹灯、繁体字、道教符咒元素与代码的结合。

| 属性 | 值 |
|------|-----|
| 背景 | 深藏青/黑色 (#0F172A) |
| 强调色 | 霓虹青 (#00FFFF) 和荧光粉 (#FF00FF) |
| 效果 | 文字需有轻微发光效果 (text-shadow) |
| 边框 | 霓虹发光边框 |
| 氛围 | 未来感、故障艺术、高能量 |

**演示文本**:
```markdown
# ⚡ 赛博修仙指南

`System.out.println("道生一，一生二");`

**境界划分：**
* [ ] **炼气期**：刚学会 Hello World
* [x] **筑基期**：熟练掌握 CRUD
* [ ] **金丹期**：精通分布式架构
* [ ] **元婴期**：手写操作系统

> 警告：修仙逆天而行，注意发量预警！⚠️
```

##### 4. 复古画报 (retro-shanghai)

**设计理念**: 民国时期老上海广告画报或 80 年代大字报风格。

| 属性 | 值 |
|------|-----|
| 背景 | 复古黄/纸色 (#F0E6D2) |
| 字体 | 非常粗的无衬线体标题（黑体/Impact 风格），文字颜色使用褪色蓝 (#1E3A8A) 或铁锈红 |
| 图案 | 点阵网格背景或放射状图案叠加 |
| 氛围 | 怀旧、粗犷、海报感 |

**演示文本**:
```markdown
# 🔔 紧急通知

**致全体开发同仁：**

近日发现代码仓库中存在大量 `console.log` 未删除现象，严重影响了生产环境的清爽度！

### 这里的建议是：
1.  **善用断点**：Debugger 才是好朋友
2.  **代码洁癖**：提交前请 `Lint` 一下
3.  **不要偷懒**：注释要写清楚

*生产安全，人人有责！* 🛠️
```

##### 5. 竹林清风 (bamboo-green)

**设计理念**: 清新、自然，类似于豆瓣/森系的风格，配色取自"国色"中的竹青。

| 属性 | 值 |
|------|-----|
| 背景 | 极淡绿色 (#F0FFF4) 或白色到浅绿渐变 |
| 字体 | 深森林绿 (#14532D) |
| 卡片样式 | 极简风格，无重边框，仅有柔和阴影 |
| 氛围 | 成长、学习、清新 |

**演示文本**:
```markdown
# 🌱 每日一题：递归

递归的尽头是什么？是**栈溢出** (Stack Overflow)。

```python
def bamboo_growth(height):
    if height > 100:
        return "成材"

    # 持续向上生长
    return bamboo_growth(height + 1)
```

**今日感悟：**
不要害怕缓慢的成长，根扎得越深，未来长得越高。
```

**测试要求**: 切换按钮必须包含属性 `data-testid="theme-btn-{themeName}"`，其中 themeName 为：
- `ink-smoke`
- `lucky-red`
- `cyber-taoist`
- `retro-shanghai`
- `bamboo-green`

#### C. 实时预览卡片

- 卡片是一个固定比例（或自适应包裹内容）的容器
- 内容需垂直居中或合理排版
- 卡片底部需包含一个固定的 "Footer"，显示当前日期和 "墨卡 · 由 AI 驱动" 字样
- **测试要求**: 卡片容器必须包含属性 `data-testid="preview-card"`

#### D. 导出功能

- 点击 "下载 PNG" 按钮，将预览区域的 DOM 节点转换为 PNG 图片并自动触发浏览器下载
- **测试要求**: 按钮必须包含属性 `data-testid="download-btn"`

---

## 4. 视觉与 UI 设计规范

> 此部分用于指导 Visual Design Agent，随后生成的 CSS 变量需被 Coding Agent 严格遵守

### 4.1 通用规范

| 类别 | 规范 |
|------|------|
| 排版 | 默认使用无衬线字体 (Inter 或 system-ui)，代码块使用等宽字体 |
| 间距 | 使用宽松的 Padding，卡片要有明显的圆角 (rounded-xl) 和阴影 (shadow-2xl) |
| 反馈 | 按钮 hover 时需要有 Scale 或 Opacity 变化 |

### 4.2 中文字体回退策略

为确保中文字符正确渲染，必须配置合适的字体回退 (font-fallback) 策略：

```css
/* 默认字体栈（无衬线体） */
--font-sans: 'Inter', 'Noto Sans SC', 'Microsoft YaHei', 'PingFang SC', system-ui, sans-serif;

/* 衬线体字体栈（用于 ink-smoke 主题） */
--font-serif: 'Noto Serif SC', 'Songti SC', 'SimSun', 'Source Han Serif SC', serif;

/* 等宽字体栈 */
--font-mono: 'JetBrains Mono', 'Fira Code', 'Source Han Mono', monospace;
```

### 4.3 主题 CSS 变量定义

每个主题必须定义以下 CSS 变量：

```css
/* 示例：水墨云烟主题 */
[data-theme="ink-smoke"] {
  --card-bg: #F7F7F2;
  --card-bg-gradient: linear-gradient(to bottom, #F7F7F2, #E5E5E0);
  --text-primary: #2C2C2C;
  --text-secondary: #4A4A4A;
  --accent-color: #B22222;
  --border-color: #D4D4D4;
  --font-family: var(--font-serif);
}

/* 示例：红运当头主题 */
[data-theme="lucky-red"] {
  --card-bg: #C41E3A;
  --card-bg-gradient: linear-gradient(135deg, #C41E3A, #8B0000);
  --text-primary: #FFD700;
  --text-secondary: #FFFFFF;
  --accent-color: #FFD700;
  --border-color: #FFD700;
  --font-family: var(--font-sans);
}

/* 其他主题类推... */
```

---

## 5. E2E 测试验收标准

> Coding Agent 编写测试脚本时的依据

### 测试用例 1：渲染测试

**目标**: 验证页面基本元素正确渲染

**步骤**:
1. 访问首页
2. 确认 `data-testid="markdown-input"` 存在且有默认文本
3. 确认 `data-testid="preview-card"` 可见
4. 确认 5 个主题切换按钮均存在

**断言**:
- 输入框包含默认 Markdown 文本
- 预览卡片可见且渲染了默认内容

### 测试用例 2：交互测试

**目标**: 验证 Markdown 输入实时渲染

**步骤**:
1. 清空输入框
2. 键入 `# 你好 Agent`

**断言**:
- Preview Card 内部渲染了 `<h1>你好 Agent</h1>` 标签

### 测试用例 3：主题切换 - 水墨云烟

**目标**: 验证主题切换功能及字体回退

**步骤**:
1. 点击 `data-testid="theme-btn-ink-smoke"`

**断言**:
- Preview Card 的背景色为 `#F7F7F2` 或包含对应 CSS 类
- `font-family` 优先包含衬线体（如 `serif` 或 `Songti`）

### 测试用例 4：主题切换 - 红运当头

**目标**: 验证中国红主题正确应用

**步骤**:
1. 点击 `data-testid="theme-btn-lucky-red"`

**断言**:
- Preview Card 的背景色为 `#C41E3A`（中国红）或包含对应 CSS 类
- 标题文字颜色为金色 `#FFD700`

### 测试用例 5：主题切换 - 赛博修仙

**目标**: 验证霓虹发光效果

**步骤**:
1. 点击 `data-testid="theme-btn-cyber-taoist"`

**断言**:
- Preview Card 的背景色为深色 `#0F172A`
- 文字包含 `text-shadow` 发光效果

### 测试用例 6：主题切换 - 复古画报

**目标**: 验证复古风格正确应用

**步骤**:
1. 点击 `data-testid="theme-btn-retro-shanghai"`

**断言**:
- Preview Card 的背景色为复古纸色 `#F0E6D2`
- 标题字体为粗体无衬线体

### 测试用例 7：主题切换 - 竹林清风

**目标**: 验证清新绿色主题

**步骤**:
1. 点击 `data-testid="theme-btn-bamboo-green"`

**断言**:
- Preview Card 的背景包含浅绿色 `#F0FFF4`
- 文字颜色为深森林绿 `#14532D`

### 测试用例 8：中文字符渲染测试

**目标**: 验证中文字符在各主题下正确渲染

**步骤**:
1. 输入包含中文的 Markdown 文本
2. 依次切换 5 个主题

**断言**:
- 每个主题下中文字符均可见且无乱码
- 字体渲染清晰（无明显锯齿）

### 测试用例 9：导出功能测试

**目标**: 验证 PNG 导出功能

**步骤**:
1. 点击 `data-testid="download-btn"`

**断言**:
- 触发文件下载
- 下载的文件为 PNG 格式

---

## 6. 附录：演示用 Markdown 示例

### 默认加载内容（建议）

```markdown
# 🎨 欢迎使用墨卡

> 让文字，变成艺术

### 功能特性
- **实时预览** - 所见即所得
- **国风主题** - 水墨、故宫、赛博修仙...
- **一键导出** - 下载高清 PNG 图片

*墨卡 · 由 AI 驱动*
```

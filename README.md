# Flow-Spec 文档交付技能包

本目录是一套**与业务领域解耦的文档工作流**技能：头脑风暴 → 原型与功能清单 → 需求文档（PRD）→ 流程图（draw.io 泳道等）→ 可选技术说明文档。技能正文以 **Superpowers** 开源库中的同名能力为蓝本翻译并改写为中文；**唯一例外**是 `requirement-doc-writing/SKILL.md`：该文件为作者**已实战验证**的 PRD 写法，**未按本仓库泛化改写**，正文可能仍含原项目术语与模板引用。

本包**不包含**编码、TDD、开发实现计划或分批写代码类技能；若需扩展商务文档（如报价单），见 `workflows/default.md` 文末「扩展位」。

---

## 技能一览

| 技能目录 | 作用 | 来源说明 |
|----------|------|----------|
| `using-flow-spec` | 总章程：如何发现、加载、组合技能 | 对齐 Superpowers `using-superpowers` 理念 |
| `flow-spec-routing` | 主编排：触发词与路线 A～D | 自研编排 |
| `requirement-brainstorming` | 设计前头脑风暴与方案 | Superpowers `brainstorming` |
| `prototype-design` | 基于 brainstorm 结论生成静态 HTML 原型，含人工确认检查点 | 自研，write-doc 链路 |
| `feature-list` | 原型确认后输出 **CSV 功能清单**（系统/角色/模块/功能/前后端描述），PRD 的前置 | 自研，write-doc 链路 |
| `requirement-doc-writing` | 需求文档（PRD） | **保留原文，未泛化** |
| `swimlane-diagram` | PRD 第二章跨职能泳道图（draw.io XML） | 自研，与 `requirement-doc-writing` 联用 |
| `technical-doc-writing` | 技术说明/设计类文档（纯文档） | 泛化 + 模板引用 |

---

## 这套工作流怎么用

### 1. 会话开始时

让智能体先阅读并遵循 **`skills/using-flow-spec/SKILL.md`**。

### 2. 两种用法

**（1）只做某一环** — 只加载对应技能（例如仅 PRD 则 `requirement-doc-writing`）。

**（2）端到端** — 阅读 **`workflows/default.md`** 与 **`skills/flow-spec-routing/SKILL.md`**，按路线 A/B/C/D 执行；产物默认在 **`flow-spec/temp/`**（见 `references/rules/storage.md`）。

### 3. 快捷命令（若环境支持 `commands/`）

| 文件 | 作用 |
|------|------|
| `write-doc.md` | **文档写作完整链路**（brainstorm → 原型 → 功能点 → PRD） |
| `brainstorm.md` | 头脑风暴技能 |
| `write-requirement.md` | 需求文档技能 |
| `route-delivery.md` | 主编排 |

实际技能标识以当前编辑器为准（如带 `flow-spec:` 前缀）。

### 4. 参考与脚本

- **`references/`**：模板、规则、索引。其中部分模板文件名或示例仍可能来自历史项目，可按需替换为当前业务的术语表与场景示例。  
- **`scripts/`**：文档辅助脚本（模板填充、校验、索引同步等）。  

### 5. OpenSpec

若**业务仓库**启用 OpenSpec，变更与校验方式遵循该仓库约定；见 `using-flow-spec` 与 `flow-spec-routing` 中的可选说明。

---

## 在本机接入与验证（建议流程）

| 步骤 | 说明 |
|------|------|
| 1. 建仓库 | 包含本 `flow-spec/` 目录结构。 |
| 2. 克隆 | `git clone <仓库地址>` |
| 3. 打开 | 用 Cursor 打开项目根目录。 |
| 4. 规则 | 在 **`.cursor/rules/`** 或 **`AGENTS.md`** 中约定：会话开始阅读 **`flow-spec/skills/using-flow-spec/SKILL.md`**；技能根目录为 **`<项目根>/flow-spec/skills/`**。 |
| 5. 验证 | 新开会话，用自然语言触发某技能，确认会加载对应 **`SKILL.md`**。 |

### 用 npm CLI 初始化到任意业务项目（推荐）

本仓库根目录已配置 **`create-flow-spec`** 包（与 OpenSpec 类似：`npm create` 会执行同名工具）。发布后在**业务仓库根目录**执行：

```bash
npm create flow-spec@latest
```

等价：

```bash
npx create-flow-spec@latest
```

默认会在当前目录下生成 **`flow-spec/`** 子目录（内含 `skills/`、`references/`、`workflows/`、`commands/`、`scripts/`、`.cursor/rules/`、`temp/` 骨架等）。

常用选项：

| 选项 | 含义 |
|------|------|
| `--dir <路径>` | 指定输出目录（相对当前目录），默认 `flow-spec` |
| `--here` | 不套子目录，直接写入当前目录（适合已在 `docs/` 等目录下执行） |
| `--force` | 已存在 Flow-Spec 标记时仍覆盖拷贝 |

未发布前可在本仓库根本地调试：`node bin/create-flow-spec.mjs`、`node bin/create-flow-spec.mjs --help`。亦可 `npm link` 后在其目录运行 `create-flow-spec`。

### 发布到 npm（维护者）

1. 登录 npm：`npm login`
2. 在本仓库根：`npm publish`（`package.json` 的 `files` 已限定只打包容器内技能包文件）
3. 包名仍为 `create-flow-spec`；若需作用域包，可把 `name` 改为 `@你的组织/create-flow-spec` 再发布。

私有仓可使用 Verdaccio / GitHub Packages，用法同为 `npm create …` / `npx …`。

---

## 目录结构

```
flow-spec/
├── skills/           # 各技能（每目录 SKILL.md）
├── references/       # 模板、规则、索引
├── workflows/        # 默认路线
├── commands/         # 快捷入口
├── scripts/          # 辅助脚本
└── temp/             # 默认产出根目录
```

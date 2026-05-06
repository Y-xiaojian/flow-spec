# Flow-Spec 文档交付技能包

本目录是一套**与业务领域解耦的文档工作流**技能：头脑风暴 → 原型与功能清单 → 需求文档（PRD）→ 流程图（draw.io 泳道等）→ 可选技术说明文档。技能正文以 **Superpowers** 开源库中的同名能力为蓝本翻译并改写为中文；**唯一例外**是 `requirement-doc-writing/SKILL.md`：该文件为作者**已实战验证**的 PRD 写法，**未按本仓库泛化改写**，正文可能仍含原项目术语与模板引用。

本包**不包含**编码、TDD、开发实现计划或分批写代码类技能；若需扩展商务文档（如报价单），见 `workflows/default.md` 文末「扩展位」。

---

## 技能一览


| 技能目录                        | 作用                                              | 来源说明                                  |
| --------------------------- | ----------------------------------------------- | ------------------------------------- |
| `using-flow-spec`           | 总章程：如何发现、加载、组合技能                                | 对齐 Superpowers `using-superpowers` 理念 |
| `flow-spec-routing`         | 主编排：触发词与路线 A～D                                  | 自研编排                                  |
| `requirement-brainstorming` | 设计前头脑风暴与方案                                      | Superpowers `brainstorming`           |
| `prototype-design`          | 基于 brainstorm 结论生成静态 HTML 原型，含人工确认检查点           | 自研，write-doc 链路                       |
| `feature-list`              | 原型确认后输出 **CSV 功能清单**（系统/角色/模块/功能/前后端描述），PRD 的前置 | 自研，write-doc 链路                       |
| `requirement-doc-writing`   | 需求文档（PRD）                                       | **保留原文，未泛化**                          |
| `diagram-skill`             | 泳道/流程/架构/时序图示（YAML→CLI→draw.io）                  | 引擎在 `skills/diagram-skill/scripts`，见 `diagram-production.md` |
| `technical-doc-writing`     | 技术说明/设计类文档（纯文档）                                 | 泛化 + 模板引用                             |


---

## 这套工作流怎么用

### 1. 会话开始时

让智能体先阅读并遵循 `**skills/using-flow-spec/SKILL.md`**。

### 2. 两种用法

**（1）只做某一环** — 只加载对应技能（例如仅 PRD 则 `requirement-doc-writing`）。

**（2）端到端** — 阅读 `**workflows/default.md`** 与 `**skills/flow-spec-routing/SKILL.md**`，按路线 A/B/C/D 执行；产物目录见 `**references/rules/storage.md**`（`**flowspec/specs/…**`、`**flowspec/changes/<CHANGE-ID>/…**`）。

### 3. 快捷命令（若环境支持 `commands/`）


| 文件                     | 作用                                        |
| ---------------------- | ----------------------------------------- |
| `write-doc.md`         | **文档写作完整链路**（brainstorm → 原型 → 功能点 → PRD） |
| `brainstorm.md`        | 头脑风暴技能                                    |
| `write-requirement.md` | 需求文档技能                                    |
| `route-delivery.md`    | 主编排                                       |


实际技能标识以当前编辑器为准（如带 `flow-spec:` 前缀）。

### 4. 参考与脚本

- `**references/`**：模板、规则、索引。其中部分模板文件名或示例仍可能来自历史项目，可按需替换为当前业务的术语表与场景示例。  
- `**scripts/**`：文档辅助脚本（模板填充、校验、索引同步等）。

### 5. OpenSpec

若**业务仓库**启用 OpenSpec，变更与校验方式遵循该仓库约定；见 `using-flow-spec` 与 `flow-spec-routing` 中的可选说明。

---

## 在本机接入与验证（建议流程）


| 步骤     | 说明                                                                                                                                        |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| 1. 建仓库 | 包含本 `flow-spec/` 目录结构。                                                                                                                    |
| 2. 克隆  | `git clone <仓库地址>`                                                                                                                        |
| 3. 打开  | 用 Cursor 打开项目根目录。                                                                                                                         |
| 4. 规则  | 在 `**.cursor/rules/`** 或 `**AGENTS.md**` 中约定：会话开始阅读 `**flow-spec/skills/using-flow-spec/SKILL.md**`；技能根目录为 `**<项目根>/flow-spec/skills/**`。 |
| 5. 验证  | 新开会话，用自然语言触发某技能，确认会加载对应 `**SKILL.md**`。                                                                                                   |


### 用 npm CLI 初始化到任意业务项目（推荐）

分步图文教程见：`**[docs/flowspec-install-and-init.md](docs/flowspec-install-and-init.md)**`。

本仓库根目录已配置 `**@yalo1228/ly-flowspec**` 包。发布后在**业务仓库根目录**执行（推荐）：

```bash
npx @yalo1228/ly-flowspec@latest
```

> **说明：** `npm create @scope/foo` 会解析为 `@scope/create-foo` 这类「create 初始化包」，与本包名不同；若未单独发布 `create-ly-flowspec`，请用 `**npx @yalo1228/ly-flowspec`** 或全局安装后的 `**flow-spec` / `ly-flowspec**`。

**默认（推荐轻量）**：**不会**在仓库里再拷一份 `flow-spec/` 大目录，只会在**项目根**生成：

- `.cursor/commands/fsx-*.md`（斜杠命令入口）
- `.cursor/rules/flow-spec.mdc`
- `flowspec/`（`**specs/<小类>/`**、`**changes/CHG-local/<小类>/**`、`**logs/**`、`**.active-change**`；见 **storage.md**）
- 若存在 `package.json`：自动 `npm install -D @yalo1228/ly-flowspec@<版本>`

技能正文从 `**node_modules/@yalo1228/ly-flowspec/skills/...`** 读取（与 OpenSpec 式「只装依赖 + 项目内命令」一致）。

**仅当**需要把整包放进仓库时（旧行为 / 离线改技能）：

```bash
npx @yalo1228/ly-flowspec@latest --full
# 或
flow-spec init --full
```


| 选项             | 含义                                                                  |
| -------------- | ------------------------------------------------------------------- |
| `--full`       | 将完整 `skills/`、`references/` 等拷入 `./flow-spec`（或 `--dir` / `--here`） |
| `--no-install` | 轻量模式下不自动执行 `npm install -D`                                         |
| `--dir <路径>`   | 仅配合 `--full`：子目录名，默认 `flow-spec`                                    |
| `--here`       | 仅配合 `--full`：直接写入当前目录                                               |
| `--force`      | 覆盖                                                                  |


未发布前可在本仓库根本地调试：`node bin/create-flow-spec.mjs`、`node bin/flow-spec.mjs`。亦可 `npm link` 后使用全局命令 `flow-spec` / `create-flow-spec` / `ly-flowspec`（`ly-flowspec` 与 `flow-spec` 为同一入口）。

### 全局命令 `flow-spec`（OpenSpec 式：init + update + 项目内斜杠命令）

安装本包后同时获得 `**flow-spec**`、`**create-flow-spec**`、`**ly-flowspec**`（`ly-flowspec` 为 `flow-spec` 的别名）：

```bash
npm i -g @yalo1228/ly-flowspec@latest
```

在**业务仓库根目录**：


| 命令                      | 作用                                                                      |
| ----------------------- | ----------------------------------------------------------------------- |
| `flow-spec init`        | **默认轻量**：`fsx-*`、规则、`**flowspec/`** 目录骨架 + 开发依赖；**不拷贝**整包到 `flow-spec/` |
| `flow-spec init --full` | 将完整技能包拷入 `flow-spec/`（与旧版行为相同）                                          |
| `flow-spec update`      | 若存在嵌入的 `flow-spec/` 则同步目录；否则刷新轻量命令与 `node_modules` 依赖                   |
| `flow-spec doctor`      | 检查 fsx、规则、技能可读性（嵌入或 `node_modules`）                                     |


与 `create-flow-spec` / `npx @yalo1228/ly-flowspec` 行为一致，但 **推荐使用 `flow-spec init`** 作为日常入口。

### Cursor 项目指令（`fsx-*`）

安装后，在**业务项目根**（在 Cursor 中打开该仓库）使用命令面板，可触发：


| 指令文件                   | 含义             |
| ---------------------- | -------------- |
| `fsx-write-brainstorm` | 头脑风暴与方案收敛      |
| `fsx-write-prototype`  | 静态原型与标注        |
| `fsx-write-feature`    | 功能点清单（CSV）     |
| `fsx-write-prd`        | PRD 八章         |
| `fsx-write-diagram`    | 图示 draw.io（泳道/流程/架构等） |
| `fsx-route-delivery`   | 主编排（路线 A～D）    |
| `fsx-revise-doc`       | 增量修订与一致性       |
| `fsx-archive-doc`      | 会话日志与归档        |
| `fsx-write-quote`      | 报价单/商务文档（扩展技能） |


> 实际斜杠名以当前 Cursor 版本对 `.cursor/commands/*.md` 的解析为准；正文会引导加载 `flow-spec:*` 技能。

**本技能包仓库**若需生成上述命令，在根目录执行：`node bin/flow-spec.mjs update --force`。

### 常见问题：为什么看起来「整包都在」？

1. **轻量模式**不会在仓库根创建 `**flow-spec/`** 目录；但若执行了 `npm install -D`，`**node_modules/@yalo1228/ly-flowspec/**` 里会有完整包内容——这是依赖安装，不是往仓库里拷了一套 skills（勿提交 `node_modules`）。
2. **只有**加了 `**--full`**（或用了旧版 CLI）才会在项目里出现 `**flow-spec/skills/**` 那种嵌入拷贝。
3. 请先确认 CLI 版本（任选其一）：
  - 已全局安装：`flow-spec --version` 或 `flow-spec version` → 当前仓库为 **0.4.0**，线上应为 **≥ 0.4.0**
  - **若终端提示找不到 `flow-spec`**（未装全局或未进 PATH）：  
  `npx --package=@yalo1228/ly-flowspec@latest flow-spec --version`  
  或先安装：`npm i -g @yalo1228/ly-flowspec@latest`
  - 仅校验包版本：`npx @yalo1228/ly-flowspec@latest --version`（跑的是 `create-flow-spec` 入口，版本号一致）

### 发布到 npm（维护者）

1. 登录 npm 公网：`npm login --registry=https://registry.npmjs.org/`
2. 在本仓库根发布：`npm publish --registry=https://registry.npmjs.org/`（`package.json` 的 `files` 已限定只打包容器内技能包文件）
3. 包名为 `@yalo1228/ly-flowspec`；若 fork 发布，可改为 `@你的组织/ly-flowspec`。

私有仓可使用 Verdaccio / GitHub Packages，用法同为 `npx …` / 全局 `flow-spec`。

---

## 目录结构

```
flow-spec/
├── skills/           # 各技能（每目录 SKILL.md）
├── references/       # 模板、规则、索引
├── workflows/        # 默认路线
├── commands/         # 快捷入口
├── scripts/          # 辅助脚本
└── temp/             # 嵌入模式下的 {产出根}；内含 specs/、changes/、logs/（见 storage.md）
```


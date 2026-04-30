# 存储与命名规范

本文档为 **唯一** 产出路径约定（已取代旧的「扁平 `temp/<类别>/`」体系）。整体与 OpenSpec 理念一致：**规格（specs）** 放已定稿基线，**变更（changes）** 放进行中草稿；小类（头脑风暴、PRD、原型等）在 **`specs/`** 与 **`changes/<CHANGE-ID>/`** 下 **同名子文件夹** 对齐。

---

## 产出根 `{产出根}`

须在会话中整仓统一：

| 模式 | `{产出根}` |
|------|------------|
| **npm 轻量模式** | 项目根 **`flowspec/`** |
| **嵌入模式** | **`<技能包嵌入根>/temp/`**（例如仓库内 `./flow-spec/temp/`） |

下文路径均以 **`{产出根}/`** 开头。

---

## 当前变更 ID（必读）

- 文件 **`{产出根}/.active-change`**：**单行文本**，内容为当前使用的 **`CHANGE-ID`**（与下方 `changes/` 下文件夹名一致）。
- 若该文件**不存在**，默认视为 **`CHG-local`**（与 `flow-spec init` 脚手架生成的默认变更夹一致）。
- 切换需求时：修改 `.active-change` 中的 ID，或新建 `changes/<新ID>/` 并更新该文件。

---

## 目录树（标准）

```text
{产出根}/
├── .active-change              # 单行：当前 CHANGE-ID（可选；缺省按 CHG-local）
├── specs/                      # 已定稿 / 基线（评审通过后迁入或复制至此）
│   ├── brainstorm/
│   ├── requirements/
│   ├── technical/
│   ├── prototypes/
│   ├── diagrams/
│   ├── tasks/
│   ├── reverse/
│   ├── commercial/
│   └── logs/                   # 也可放定稿类会话摘要；见下「会话日志」
├── changes/                    # 进行中
│   ├── <CHANGE-ID>/
│   │   ├── README.md           # 变更名片（推荐）
│   │   ├── proposal.md       # 可选
│   │   ├── brainstorm/
│   │   ├── requirements/
│   │   ├── technical/
│   │   ├── prototypes/
│   │   ├── diagrams/
│   │   ├── tasks/
│   │   ├── reverse/
│   │   └── commercial/
│   └── archive/
│       └── <CHANGE-ID>/        # 已闭合变更整夹归档，结构同上
└── logs/                       # 全局会话日志（按日），见下
```

### 小类说明

| 子文件夹 | 用途 |
|----------|------|
| **`brainstorm/`** | 头脑风暴结论 |
| **`requirements/`** | PRD、功能点清单（CSV/MD）等 |
| **`technical/`** | 技术说明 / 设计类文档（纯文档） |
| **`prototypes/`** | 静态 HTML 原型与标注（可按需求再分子目录） |
| **`diagrams/`** | draw.io（`.drawio`）及约定导出图 |
| **`tasks/`** | 文档侧任务清单等 |
| **`reverse/`** | 逆向 / 现状梳理（若路线使用） |
| **`commercial/`** | 报价、商务类文档 |
| **`specs/logs/`** | 可选：与文档包相关的日志摘录 |

---

## 与技能正文中的 `temp/` 路径如何对应？

技能包 SKILL 里仍常见写法 **`temp/<类别>/...`**，在本仓库约定下表示：

> **`temp/<类别>/` ⇔ `{产出根}/changes/<当前CHANGE-ID>/<类别>/`**

其中 **`<当前CHANGE-ID>`** = **`.active-change`** 中的值（缺省 **`CHG-local`**）。  
**不要**再往 `{产出根}/` 下单独写扁平的 **`requirements/`**、**`brainstorm/`**（旧版）；一律落在 **`specs/...`** 或 **`changes/<CHANGE-ID>/...`**。

**已定稿**后：将文件迁入 **`specs/<类别>/`**（或复制后保留变更夹归档），并在变更 **`README.md`** 或 **`specs/`** 内索引中更新指针。

---

## 命名

文件命名仍建议：

`<业务ID>_<文档类型>_v<版本>_<YYYYMMDD>.md`

流程图源文件：`<需求名>-process.drawio`，置于 **`changes/<CHANGE-ID>/diagrams/`**（进行中）或定稿后 **`specs/diagrams/`**。

---

## 会话日志

全局日志（不按变更拆分时的默认）：

**`{产出根}/logs/session-YYYYMMDD.md`**

日志行格式：

`[时间] 触发词 | 路线 | 模板 | <CHANGE-ID> | 输出路径 | 校验结果`

（`<CHANGE-ID>` 列可选；项目可简化为原五列格式。）

---

## 版本与归档

变更 ID 规则、README 要点、与 **`FT-xxx`** 绑定及 **`changes/archive/`** 流程，见 **`references/rules/change-and-versioning.md`**（仅保留流程说明，目录以本文为准）。

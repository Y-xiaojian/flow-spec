# flow-spec / references 索引

## 工作流说明

- `workflows/default.md`（相对 `flow-spec/` 根目录）— 默认文档路线与技能顺序
- `workflows/write-doc.md` — 文档写作完整链路（含人工检查点）

## 技能（路径均为 `flow-spec/skills/<id>/SKILL.md`）

| id                          | 说明                                                  |
| --------------------------- | --------------------------------------------------- |
| `using-flow-spec`           | 总章程：如何发现与调用技能                                       |
| `flow-spec-routing`         | 主编排：触发词与路线 A～D                                      |
| `requirement-brainstorming` | 头脑风暴与设计（源自 Superpowers brainstorming 理念）            |
| `prototype-design`          | 静态 HTML 原型（write-doc 链路）                               |
| `feature-list`              | CSV/MD 功能点清单（PRD 前置）                                    |
| `requirement-doc-writing`   | 需求文档（**唯一 production**，正文以该文件为准，未随包泛化改写）            |
| `swimlane-diagram`          | PRD 第二章跨职能泳道图（draw.io），与 `requirement-doc-writing` 配合          |
| `technical-doc-writing`     | 技术说明/设计类文档（纯文档；边界不得超出已确认需求）                          |
| `quotation-doc-writing`      | 报价单与商务类文档（扩展；产出默认 `temp/commercial/`）                         |

## 规则

- `rules/trigger-rules.md` — 触发词与路由补充  
- `rules/constraints.md` — 硬约束与校验  
- `rules/storage.md` — 目录与命名

## 模板

`references/templates/` — 需求、任务等；具体引用以各技能正文为准。

## 其它参考

- `references/testing-anti-patterns.md` — 测试反模式摘录（可选阅读，非本包独立技能）
- `references/external/draw-io/SKILL.md` — 通用 draw.io XML/导出/版式摘录；与 `swimlane-diagram` 叠加使用

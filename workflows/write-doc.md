# Write-Doc 工作流（文档写作路线）

CLI 入口：`write-doc`  
**路径：** 下表 **`changes/<CHANGE-ID>/…`** 相对 **`{产出根}`**；**CHANGE-ID** 见 **`.active-change`**（见 **`references/rules/storage.md`**）。

## 状态机路线

```
[触发]
  ↓ 用户执行 write-doc 或说「我要写文档/写需求」
  
[Stage 1] requirement-brainstorming
  目标：多轮对话，收敛需求结论
  产物：changes/<CHANGE-ID>/brainstorm/<需求名>.md
  ⛔ CHECKPOINT A：结论完整，用户输入「结论确认」
  
[Stage 2] prototype-design
  目标：基于结论生成静态 HTML 原型
  产物：changes/<CHANGE-ID>/prototypes/<需求名>/index.html
        changes/<CHANGE-ID>/prototypes/<需求名>/annotations.md
  ⛔ CHECKPOINT B：用户在浏览器确认样式，输入「原型确认」
  
[Stage 3] feature-list
  目标：从原型提取结构化功能点清单
  产物：changes/<CHANGE-ID>/requirements/<需求名>-feature-list.csv（主）与 -feature-list.md（说明）
  ⛔ CHECKPOINT C：用户确认功能点无遗漏，输入「功能点确认」
  
[Stage 4] requirement-doc-writing（+ 按需 diagram-skill）
  目标：生成完整 PRD，归档
  产物：changes/<CHANGE-ID>/requirements/<需求名>-prd.md；第二章业务流程图为 changes/<CHANGE-ID>/diagrams/<需求名>-process.drawio（按 `diagram-skill`）
  ⛔ CHECKPOINT D：用户最终确认，文档归档完成
  
[完成]
```

## 各阶段技能映射

| 阶段  | 技能                                                                       | 输入            | 输出                                                            |
| --- | ------------------------------------------------------------------------ | ------------- | ------------------------------------------------------------- |
| 1   | `requirement-brainstorming`                                              | 用户描述          | `changes/<CHANGE-ID>/brainstorm/`                                            |
| 2   | `prototype-design`                                                       | brainstorm 结论 | `changes/<CHANGE-ID>/prototypes/`                                            |
| 3   | `feature-list`                                                           | 原型标注          | `changes/<CHANGE-ID>/requirements/*-feature-list.csv`（主）、`*-feature-list.md` |
| 4   | `requirement-doc-writing`（PRD）；`diagram-skill`（第二章 draw.io 图示，与 4 联用） | 功能点清单等        | `changes/<CHANGE-ID>/requirements/*-prd.md`；`changes/<CHANGE-ID>/diagrams/*-process.drawio` |


## 执行规则

1. **每个 CHECKPOINT 必须等待人工确认**，不得自动跳过
2. 用户若要「只做某阶段」，直接加载对应技能，不必从头走
3. 产物命名统一用需求简称（英文小写 + 连字符），例如 `user-approval`
4. 任何阶段修改意见，只在当前阶段内消化，不回退到上一阶段（除非用户明确要求）

## 单阶段入口

| 只需要        | 直接加载                                  |
| ---------- | ------------------------------------- |
| 头脑风暴       | `flow-spec:requirement-brainstorming` |
| 原型         | `flow-spec:prototype-design`          |
| 功能点        | `flow-spec:feature-list`              |
| PRD        | `flow-spec:requirement-doc-writing`   |
| PRD 第二章业务流程图 | `flow-spec:diagram-skill`          |
| 技术说明文档     | `flow-spec:technical-doc-writing`      |

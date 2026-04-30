---
description: fsx-write-swimlane — 泳道流程图（draw.io）
disable-model-invocation: true
---

请按以下步骤执行：

1. 阅读 `skills/using-flow-spec/SKILL.md`
2. 调用 `flow-spec:swimlane-diagram` 技能，并严格按加载后的全文执行。
3. 读 `references/rules/storage.md`；进行中 draw.io 写到 **`temp/changes/<CHANGE-ID>/diagrams/`**（**CHANGE-ID** 见 **`temp/.active-change`**）；npm 项目则为 **`flowspec/changes/<CHANGE-ID>/diagrams/`**。

**路径映射（storage.md）：** SKILL 中的 `temp/<类别>/` → **`temp/changes/<CHANGE-ID>/<类别>/`**（嵌入）；业务仓库轻量模式见 **`flowspec/`** 下同构路径。
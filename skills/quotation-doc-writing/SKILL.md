---
name: quotation-doc-writing
description: 生成报价单、商务方案报价说明等文档（扩展技能）；产出默认在 temp/commercial/
validation_status: experimental
---

# 报价单与商务类文档

## 适用范围

在用户提供品类、范围、交付物、计价口径后，生成可评审的**报价单或商务说明** Markdown（可按项目后续导出 PDF/Word）。

## 输入

- 客户/项目名称、`inferred` 须标注的缺口条款  
- 计价维度（人天/固定价/里程碑）、税率与币种约定  
- 交付范围边界与非包含项  

## 输出

- 默认路径：`temp/commercial/<业务ID>_quote_v<版本>_<YYYYMMDD>.md`（命名遵循 `references/rules/storage.md`）。

## 模板

若存在则优先遵循：`references/templates/quotation-doc-stub.md`。

## 约束

- 不得编造未确认的单价或折扣；缺失数据标注 `inferred`。
- 商务条款若涉及法务，提示人工复核。

# 存储与命名规范

输出根目录默认：`flow-spec/temp/`（可在会话中改为其他根路径，但须整仓统一）。

## 目录

- `temp/requirements/` — PRD、功能点清单等需求类文档
- `temp/technical/` — 技术说明/设计类文档（纯文档产出，非开发任务）
- `temp/prototypes/` — 静态 HTML 原型与标注
- `temp/diagrams/` — 流程图、泳道图等 **draw.io**（`.drawio`）及约定下的导出图
- `temp/brainstorm/` — 头脑风暴结论
- `temp/tasks/` — 文档工作相关的任务清单（模板产出）
- `temp/reverse/` — 逆向/现状梳理类文档（若路线使用）
- `temp/commercial/` — 商务类文档预留（如报价单、方案报价说明；技能就绪后使用）
- `temp/logs/` — 会话日志

## 命名

统一格式：

`<业务ID>_<文档类型>_v<版本>_<YYYYMMDD>.md`

示例：

- `MYPROJECT_requirement_v1_20260330.md`
- `MYPROJECT_technical_v1_20260330.md`
- `MYPROJECT_brainstorm_v1_20260330.md`
- `MYPROJECT_tasks_v1_20260330.md`

流程图源文件建议：`<需求名>-process.drawio`，置于 `temp/diagrams/`（与 PRD 中引用路径一致）。

## 会话日志

日志文件：

`temp/logs/session-YYYYMMDD.md`

日志行格式：

`[时间] 触发词 | 路线 | 模板 | 输出路径 | 校验结果`

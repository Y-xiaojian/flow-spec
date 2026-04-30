# 变更 `<CHANGE-ID>`

> 将 `<CHANGE-ID>` 替换为实际文件夹名（如 `CHG-20260430-example-feature`）。

## 名片

| 字段 | 值 |
|------|-----|
| **CHANGE-ID** | `<CHANGE-ID>` |
| **状态** | `draft` / `review` / `ready` / `merged` / `cancelled` |
| **关联 FT** | `FT-xxx`（可选） |
| **基线** | 基于哪版已定稿或哪次归档（可选） |

## 本夹内产出（相对路径）

- `proposal.md` — 意图与范围（推荐）
- `tasks.md` — 任务清单
- `requirements/` — PRD / 需求增量
- `diagrams/`、`prototypes/`、`technical/` — 按需

## 版本记录（可选）

| 轮次 | 日期 | 说明 |
|------|------|------|
| v1 | YYYY-MM-DD | 初稿 |
| v2 | YYYY-MM-DD | 评审修订 |

目录结构以 **`references/rules/storage.md`** 为准；归档流程见 **`references/rules/change-and-versioning.md`**。

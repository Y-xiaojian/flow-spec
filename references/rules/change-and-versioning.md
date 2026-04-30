# 变更 ID 与归档流程（补充）

**目录结构与小类文件夹名以 `references/rules/storage.md` 为唯一准绳**（`specs/<小类>`、`changes/<CHANGE-ID>/<小类>`）。

本节只约定：**CHANGE-ID 怎么起名**、**变更夹内 README**、**何时归档**、**与 OpenSpec 并存**。

---

## CHANGE-ID 命名

推荐：`CHG-<YYYYMMDD>-<kebab 短描述>`（例：`CHG-20260430-barcode-print`）。  
仅小写字母、数字、连字符；全局唯一。

脚手架默认提供 **`CHG-local`**，便于单机草稿；正式需求请改用有意义 ID，并更新 **`{产出根}/.active-change`**。

---

## 变更夹 `README.md`（推荐）

见 **`references/templates/change-readme-stub.md`**。至少包含：CHANGE-ID、状态、关联 **`FT-xxx`**、与 **`specs/`** 的合入关系。

---

## 归档

1. 评审通过 → 将已定稿文件纳入 **`specs/<小类>/`**（或保留副本于 specs，变更夹仅归档）。  
2. 将 **`changes/<CHANGE-ID>/`** 整体移至 **`changes/archive/<CHANGE-ID>/`**。  
3. 新需求新建 **`CHANGE-ID`**，勿在已归档夹内继续改。

---

## 与 OpenSpec 并存

业务仓库若已有 **`openspec/`**：代码行为规格仍走 OpenSpec；Flow-Spec 文档仅在 **`{产出根}`**（如 **`flowspec/`**）下使用本约定，命名空间分开。

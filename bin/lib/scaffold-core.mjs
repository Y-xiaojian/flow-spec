/**
 * 共享：拷贝技能包（可选）+ 生成项目根 Cursor 入口（fsx-*）
 */
import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname, relative, resolve } from "node:path";

export const COPY_DIRS = ["skills", "references", "workflows", "commands", "scripts"];
export const COPY_FILES = ["README.md", "CLAUDE.md"];
export const DOT_CURSOR = ".cursor";

export const TEMP_SUBDIRS = [
  "brainstorm",
  "requirements",
  "technical",
  "prototypes",
  "diagrams",
  "commercial",
  "tasks",
  "reverse",
  "logs",
];

/** 项目根下产出根目录（npm 链式安装时，不把文件写入 node_modules） */
export const OUTPUT_ROOT_DIR = "flow-spec-output";

export function hasFlowSpecMarker(dir) {
  return existsSync(join(dir, "skills", "using-flow-spec", "SKILL.md"));
}

export function hasNpmPackMarker(projectRoot, packageName) {
  const parts = packageName.split("/").filter(Boolean);
  const skill = join(projectRoot, "node_modules", ...parts, "skills", "using-flow-spec", "SKILL.md");
  return existsSync(skill);
}

export function ensureTempTree(targetRoot) {
  const tempRoot = join(targetRoot, "temp");
  mkdirSync(tempRoot, { recursive: true });
  for (const sub of TEMP_SUBDIRS) {
    const p = join(tempRoot, sub);
    mkdirSync(p, { recursive: true });
    const keep = join(p, ".gitkeep");
    if (!existsSync(keep)) writeFileSync(keep, "", "utf8");
  }
}

/**
 * 在项目根创建 flow-spec-output/（npm 轻量模式下的产出目录）
 */
export function ensureOutputTree(projectRoot) {
  const root = join(projectRoot, OUTPUT_ROOT_DIR);
  mkdirSync(root, { recursive: true });
  for (const sub of TEMP_SUBDIRS) {
    const p = join(root, sub);
    mkdirSync(p, { recursive: true });
    const keep = join(p, ".gitkeep");
    if (!existsSync(keep)) writeFileSync(keep, "", "utf8");
  }
}

/**
 * @param {string} packageRoot - npm 包根（含 skills/）
 * @param {string} targetRoot - flow-spec 根目录（含 skills/）
 * @param {boolean} force
 */
export function copyPackagedPack(packageRoot, targetRoot, force) {
  if (resolve(packageRoot) === resolve(targetRoot)) {
    console.log("提示: 包根与目标相同（源码仓库自举），跳过目录拷贝，仅保留 temp 与后续命令生成。");
    ensureTempTree(targetRoot);
    return;
  }
  mkdirSync(targetRoot, { recursive: true });
  for (const name of COPY_DIRS) {
    const src = join(packageRoot, name);
    const dest = join(targetRoot, name);
    if (!existsSync(src)) {
      console.warn(`跳过（源不存在）: ${src}`);
      continue;
    }
    cpSync(src, dest, { recursive: true, force });
  }
  const cursorSrc = join(packageRoot, DOT_CURSOR);
  if (existsSync(cursorSrc)) {
    cpSync(cursorSrc, join(targetRoot, DOT_CURSOR), { recursive: true, force });
  } else {
    console.warn("跳过: 包内未找到 .cursor/");
  }
  for (const f of COPY_FILES) {
    const src = join(packageRoot, f);
    if (existsSync(src)) {
      cpSync(src, join(targetRoot, f), { force });
    }
  }
  ensureTempTree(targetRoot);
}

export function flowSpecPrefixFromRoots(projectRoot, flowSpecRoot) {
  const rel = relative(projectRoot, flowSpecRoot).replace(/\\/g, "/");
  if (!rel || rel === ".") return "";
  return rel;
}

export function pathPrefix(fsSeg) {
  if (!fsSeg || fsSeg === ".") return "";
  return `${fsSeg.replace(/\/$/, "")}/`;
}

/** npm 包内 skills 的文档路径前缀（posix） */
export function npmSkillsPrefix(packageName) {
  const parts = packageName.split("/").filter(Boolean);
  const p = join("node_modules", ...parts);
  return `${p.replace(/\\/g, "/")}/`;
}

export function writePackVersionStamp(baseDir, version) {
  const p = join(baseDir, ".flow-spec-pack-version");
  writeFileSync(p, `${version}\n`, "utf8");
}

export function readPackVersion(packageRoot) {
  try {
    const j = JSON.parse(readFileSync(join(packageRoot, "package.json"), "utf8"));
    return j.version || "0.0.0";
  } catch {
    return "0.0.0";
  }
}

export function readPackageName(packageRoot) {
  try {
    const j = JSON.parse(readFileSync(join(packageRoot, "package.json"), "utf8"));
    return j.name || "@yuzijun/ly-flowspec";
  } catch {
    return "@yuzijun/ly-flowspec";
  }
}

function cmdFrontmatter(title) {
  return `---
description: ${title}
disable-model-invocation: true
---

`;
}

/**
 * @param {'embedded'|'npm'} mode - embedded: 仓库内有 flow-spec 目录；npm: 技能仅从 node_modules 读取
 * @param {string} packageName - npm 包名，如 @yuzijun/ly-flowspec
 */
export function writeFsxCursorCommands(projectRoot, fsSeg, mode, packageName) {
  const pxEmbedded = pathPrefix(fsSeg);
  const pxNpm = npmSkillsPrefix(packageName);
  const px = mode === "npm" ? pxNpm : pxEmbedded;

  const skillPath = (name) => `\`${px}skills/${name}/SKILL.md\``;

  const outPx = mode === "npm" ? `${OUTPUT_ROOT_DIR}/` : `${pxEmbedded}temp/`;
  const refPx = px;
  const tempMappingNote =
    mode === "npm"
      ? `\n\n**路径映射：** SKILL 正文若出现 \`temp/\` 产出路径，一律写到项目根 **\`${OUTPUT_ROOT_DIR}/\`** 下对应子目录（勿写入 \`node_modules\`）。\n`
      : "";

  const defs = [
    [
      "fsx-write-brainstorm.md",
      "fsx-write-brainstorm — 头脑风暴与方案收敛",
      `请按以下步骤执行：\n\n1. 阅读 ${skillPath("using-flow-spec")}\n2. 调用 \`flow-spec:requirement-brainstorming\` 技能，并严格按加载后的全文执行。${tempMappingNote}`,
    ],
    [
      "fsx-write-prototype.md",
      "fsx-write-prototype — 静态原型与标注",
      `请按以下步骤执行：\n\n1. 阅读 ${skillPath("using-flow-spec")}\n2. 调用 \`flow-spec:prototype-design\` 技能，并严格按加载后的全文执行。${tempMappingNote}`,
    ],
    [
      "fsx-write-feature.md",
      "fsx-write-feature — 功能点清单（CSV）",
      `请按以下步骤执行：\n\n1. 阅读 ${skillPath("using-flow-spec")}\n2. 调用 \`flow-spec:feature-list\` 技能，并严格按加载后的全文执行。${tempMappingNote}`,
    ],
    [
      "fsx-write-prd.md",
      "fsx-write-prd — PRD（八章结构）",
      `请按以下步骤执行：\n\n1. 阅读 ${skillPath("using-flow-spec")}\n2. 调用 \`flow-spec:requirement-doc-writing\` 技能，并严格按加载后的全文执行。${tempMappingNote}`,
    ],
    [
      "fsx-write-swimlane.md",
      "fsx-write-swimlane — 泳道流程图（draw.io）",
      `请按以下步骤执行：\n\n1. 阅读 ${skillPath("using-flow-spec")}\n2. 调用 \`flow-spec:swimlane-diagram\` 技能，并严格按加载后的全文执行。\n3. 读 \`${refPx}references/rules/storage.md\`；若处于 npm 链式模式，draw.io 产出写到 **\`${OUTPUT_ROOT_DIR}/diagrams/\`**。${tempMappingNote}`,
    ],
    [
      "fsx-route-delivery.md",
      "fsx-route-delivery — 主编排（路线 A～D）",
      `请调用 \`flow-spec:flow-spec-routing\` 技能，并严格按加载后的全文执行。\n${tempMappingNote}`,
    ],
    [
      "fsx-revise-doc.md",
      "fsx-revise-doc — 增量修订与一致性检查",
      `请按以下步骤执行：\n\n1. 阅读 ${skillPath("using-flow-spec")} 与 \`${refPx}references/rules/constraints.md\`\n2. 调用 \`flow-spec:flow-spec-routing\`，按用户意图选择路线 **B（变更）** 或 **C（单文档）**。\n3. 按需加载 \`flow-spec:requirement-doc-writing\`、\`flow-spec:technical-doc-writing\` 或 \`flow-spec:swimlane-diagram\` 做增量修订。\n4. 校验追溯号、交叉引用；产出仍遵循上述 **\`${OUTPUT_ROOT_DIR}/\`** 映射（npm 模式）。${tempMappingNote}`,
    ],
    [
      "fsx-archive-doc.md",
      "fsx-archive-doc — 归档记录与会话日志",
      `请按以下步骤执行：\n\n1. 阅读 \`${refPx}references/rules/storage.md\` 中的会话日志格式。\n2. 将本次记录追加到 **\`${mode === "npm" ? `${OUTPUT_ROOT_DIR}/logs/` : `${outPx}logs/`}session-YYYYMMDD.md\`**（日期为当天）。\n3. 若项目约定归档目录，可将定稿副本同步到该处并在日志中记录路径。${tempMappingNote}`,
    ],
    [
      "fsx-write-quote.md",
      "fsx-write-quote — 报价单与商务类文档（扩展）",
      `请按以下步骤执行：\n\n1. 阅读 ${skillPath("using-flow-spec")}\n2. 调用 \`flow-spec:quotation-doc-writing\` 技能；商务产出写到 **\`${mode === "npm" ? `${OUTPUT_ROOT_DIR}/commercial/` : `${pxEmbedded}temp/commercial/`}\`**（见技能正文）。${tempMappingNote}`,
    ],
  ];

  const cmdDir = join(projectRoot, ".cursor", "commands");
  mkdirSync(cmdDir, { recursive: true });
  for (const [file, title, body] of defs) {
    writeFileSync(join(cmdDir, file), cmdFrontmatter(title) + body, "utf8");
  }
}

export function writeProjectRootRule(projectRoot, fsSeg, mode, packageName) {
  const pxEmbedded = pathPrefix(fsSeg);
  const pxNpm = npmSkillsPrefix(packageName);
  const px = mode === "npm" ? pxNpm : pxEmbedded;

  const ruleDir = join(projectRoot, ".cursor", "rules");
  mkdirSync(ruleDir, { recursive: true });

  const npmBlock =
    mode === "npm"
      ? `
## npm 轻量模式（无仓库内 flow-spec/ 目录）

- **阅读技能与模板**：路径均以 **\`${px}\`** 为准（来自依赖包）。
- **写出产物**：SKILL 中的 \`temp/\` 一律映射到项目根 **\`${OUTPUT_ROOT_DIR}/\`**（勿写入 node_modules）。
- **依赖**：请确保已安装 \`${packageName}\`（如 \`npm install -D ${packageName}\`）。
`
      : "";

  const body = `---
description: Flow-Spec 文档技能包——会话入口（项目根规则）
alwaysApply: true
---

# Flow-Spec

本仓库使用 Flow-Spec 文档交付技能包。**不包含**编码或 TDD。
${npmBlock}
## 会话入口（必读顺序）

1. **\`${px}skills/using-flow-spec/SKILL.md\`**
2. **\`${px}references/index.md\`**
3. **\`${px}workflows/default.md\`**；完整链见 **\`${px}workflows/write-doc.md\`**
4. 意图不清时读 **\`${px}skills/flow-spec-routing/SKILL.md\`**

## 快捷指令

使用命令面板中的 **\`fsx-*\`**（见 \`.cursor/commands/\`）。

## 产出目录

${
  mode === "npm"
    ? `默认写入项目根 **\`${OUTPUT_ROOT_DIR}/\`**（与 SKILL 中 \`temp/\` 对应）；规则原文见 **\`${px}references/rules/storage.md\`**。`
    : `默认 **\`${pxEmbedded}temp/**\`，见 **\`${pxEmbedded}references/rules/storage.md\`**。`
}

## 执行习惯

- 先加载对应技能的 \`SKILL.md\`。
- 推断须标注 \`inferred\`；遵守 **\`${px}references/rules/constraints.md\`**。
`;
  writeFileSync(join(ruleDir, "flow-spec.mdc"), body, "utf8");
}

export function maybeSuggestGitignore(projectRoot, tempIgnoreLine) {
  const gitignorePath = join(projectRoot, ".gitignore");
  if (!existsSync(gitignorePath)) {
    console.log(`提示: 可在项目根 .gitignore 增加一行忽略产出目录，例如: ${tempIgnoreLine}`);
    return;
  }
  const body = readFileSync(gitignorePath, "utf8");
  if (body.includes(tempIgnoreLine.trim())) return;
  if (body.includes("flow-spec-output")) return;
  if (body.includes("flow-spec/temp")) return;
  console.log(`提示: 若需忽略文档草稿，可在 ${gitignorePath} 追加一行: ${tempIgnoreLine}`);
}

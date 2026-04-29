#!/usr/bin/env node
/**
 * create-flow-spec — 将 Flow-Spec 技能包拷贝到目标目录。
 * 用法见 --help。安装后亦可：npx create-flow-spec / npm create flow-spec
 */
import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageRoot = join(__dirname, "..");

const COPY_DIRS = ["skills", "references", "workflows", "commands", "scripts"];
const COPY_FILES = ["README.md", "CLAUDE.md"];
const DOT_CURSOR = ".cursor";

const TEMP_SUBDIRS = [
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

function parseArgs(argv) {
  const out = {
    dir: null,
    force: false,
    here: false,
    help: false,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "-h" || a === "--help") out.help = true;
    else if (a === "--force") out.force = true;
    else if (a === "--here") out.here = true;
    else if ((a === "--dir" || a === "-d") && argv[i + 1]) {
      out.dir = argv[++i];
    }
  }
  return out;
}

function printHelp() {
  console.log(`
create-flow-spec — 初始化 Flow-Spec 文档技能包目录结构

用法:
  npm create flow-spec@latest
  npx create-flow-spec@latest [选项]

选项:
  --dir <路径>   输出目录（默认: 当前目录下的 flow-spec）
  --here         直接写入当前工作目录（不套一层 flow-spec）
  --force        目标已存在时仍覆盖拷贝
  -h, --help     显示帮助

示例:
  cd ~/my-app && npx create-flow-spec
  cd ~/my-app && npx create-flow-spec --dir docs/flow-spec
  cd ~/my-app/docs && npx create-flow-spec --here --force
`);
}

function hasFlowSpecMarker(dir) {
  return existsSync(join(dir, "skills", "using-flow-spec", "SKILL.md"));
}

function ensureTempTree(targetRoot) {
  const tempRoot = join(targetRoot, "temp");
  mkdirSync(tempRoot, { recursive: true });
  for (const sub of TEMP_SUBDIRS) {
    const p = join(tempRoot, sub);
    mkdirSync(p, { recursive: true });
    const keep = join(p, ".gitkeep");
    if (!existsSync(keep)) writeFileSync(keep, "", "utf8");
  }
}

function maybeSuggestGitignore(projectRoot, tempIgnoreLine) {
  const gitignorePath = join(projectRoot, ".gitignore");
  if (!existsSync(gitignorePath)) {
    console.log(`提示: 可在项目根 .gitignore 增加一行忽略产出目录，例如: ${tempIgnoreLine}`);
    return;
  }
  const body = readFileSync(gitignorePath, "utf8");
  if (body.includes(tempIgnoreLine.trim()) || body.includes("flow-spec/temp")) return;
  console.log(`提示: 若需忽略文档草稿，可在 ${gitignorePath} 追加一行: ${tempIgnoreLine}`);
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help) {
    printHelp();
    process.exit(0);
  }

  const cwd = process.cwd();
  let target;

  if (opts.here) {
    target = cwd;
  } else if (opts.dir) {
    target = join(cwd, opts.dir);
  } else {
    target = join(cwd, "flow-spec");
  }

  if (existsSync(target) && hasFlowSpecMarker(target) && !opts.force) {
    console.error(
      `已存在 Flow-Spec 标记（${join(target, "skills/using-flow-spec/SKILL.md")}）。` +
        `如需覆盖请使用 --force。`
    );
    process.exit(1);
  }

  mkdirSync(target, { recursive: true });

  for (const name of COPY_DIRS) {
    const src = join(packageRoot, name);
    const dest = join(target, name);
    if (!existsSync(src)) {
      console.warn(`跳过（源不存在）: ${src}`);
      continue;
    }
    cpSync(src, dest, { recursive: true, force: opts.force });
  }

  const cursorSrc = join(packageRoot, DOT_CURSOR);
  if (existsSync(cursorSrc)) {
    cpSync(cursorSrc, join(target, DOT_CURSOR), { recursive: true, force: opts.force });
  } else {
    console.warn("跳过: 包内未找到 .cursor/");
  }

  for (const f of COPY_FILES) {
    const src = join(packageRoot, f);
    if (existsSync(src)) {
      cpSync(src, join(target, f), { force: opts.force });
    }
  }

  ensureTempTree(target);

  let ignoreLine = "flow-spec/temp/";
  if (opts.here) {
    ignoreLine = "temp/";
  } else {
    const rel = relative(cwd, target).replace(/\\/g, "/");
    if (rel && rel !== ".") ignoreLine = `${rel}/temp/`;
  }
  maybeSuggestGitignore(cwd, ignoreLine);

  console.log(`Flow-Spec 已初始化: ${target}`);
  console.log(
    "下一步: 在 Cursor 中打开项目，确认 .cursor/rules 已生效；会话入口见 skills/using-flow-spec/SKILL.md"
  );
}

main();

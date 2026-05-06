#!/usr/bin/env node
/**
 * flow-spec — 全局 CLI：init / update / doctor
 *
 * 默认 init：仅写入项目根 .cursor/commands（fsx-*）与规则；技能从 node_modules/@yalo1228/ly-flowspec 读取。
 * 完整拷贝：flow-spec init --full
 */
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  OUTPUT_ROOT_DIR,
  copyPackagedPack,
  ensureOutputTree,
  flowSpecPrefixFromRoots,
  hasFlowSpecMarker,
  hasNpmPackMarker,
  maybeSuggestGitignore,
  readPackVersion,
  readPackageName,
  writeFsxCursorCommands,
  writeProjectRootRule,
} from "./lib/scaffold-core.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageRoot = join(__dirname, "..");

function printHelp() {
  console.log(`
flow-spec — Flow-Spec 文档技能包 CLI

用法:
  flow-spec --version | flow-spec version
  flow-spec init [选项]
  flow-spec update [选项]
  flow-spec doctor

命令:
  init    默认仅生成项目根 Cursor 指令（fsx-*）与规则，并预建 flowspec/（specs/*、changes/CHG-local/*、logs、.active-change）；
          技能从 node_modules 中的本包读取（请 npm install -D）。
          加 --full 时才会拷贝完整 flow-spec/ 目录到仓库内（旧行为）。
  update  按当前模式刷新命令与规则；embedded 模式会同步拷贝技能包目录。
  doctor  检查嵌入目录或 node_modules 依赖与 fsx 命令是否齐全

init 选项:
  --full         将完整技能包拷贝到 ./flow-spec（或 --dir / --here 指定处）
  --no-install   不自动执行 npm install -D（默认若存在 package.json 会自动安装）
  --dir <路径>   仅 --full 时有效：flow-spec 子目录名，默认 flow-spec
  --here         仅 --full 时有效：技能包直接落在当前目录
  --force        --full 时覆盖拷贝；或强制重写 fsx/规则
  -h, --help

示例:
  cd ~/my-app && flow-spec init
  cd ~/my-app && flow-spec init --full
  cd ~/my-app && flow-spec update
`);
}

function parseCommon(argv) {
  const out = {
    dir: null,
    here: false,
    force: false,
    full: false,
    noInstall: false,
    help: false,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "-h" || a === "--help") out.help = true;
    else if (a === "--force") out.force = true;
    else if (a === "--here") out.here = true;
    else if (a === "--full") out.full = true;
    else if (a === "--no-install") out.noInstall = true;
    else if ((a === "--dir" || a === "-d") && argv[i + 1]) out.dir = argv[++i];
  }
  return out;
}

function resolveFlowSpecRoot(cwd, opts) {
  if (opts.here) return cwd;
  if (opts.dir) return join(cwd, opts.dir);
  return join(cwd, "flow-spec");
}

/** 嵌入技能包根：./flow-spec 或当前目录即包根 */
function resolveEmbeddedPackRoot(cwd) {
  const nested = join(cwd, "flow-spec");
  if (existsSync(join(nested, "skills", "using-flow-spec", "SKILL.md"))) return nested;
  if (hasFlowSpecMarker(cwd)) return cwd;
  return null;
}

function runNpmInstallDev(projectRoot, packageName, version) {
  const spec = `${packageName}@${version}`;
  const r = spawnSync("npm", ["install", "-D", spec, "--no-fund", "--no-audit"], {
    cwd: projectRoot,
    stdio: "inherit",
    shell: false,
  });
  return r.status === 0;
}

function cmdInit(argv) {
  const opts = parseCommon(argv);
  if (opts.help) {
    printHelp();
    process.exit(0);
  }

  const cwd = process.cwd();
  const pkgName = readPackageName(packageRoot);
  const ver = readPackVersion(packageRoot);

  console.log(`\n[flow-spec] CLI 版本 ${ver}（来自当前安装的 @yalo1228/ly-flowspec）`);
  if (opts.full) {
    console.log("[flow-spec] 模式: 完整拷贝（--full）→ 将在仓库内生成含 skills/ 的目录\n");
  } else {
    console.log("[flow-spec] 模式: 轻量（默认）→ 不在仓库根创建 flow-spec/ 目录");
    console.log(
      "           技能从 node_modules/@yalo1228/ly-flowspec/ 读取（npm 依赖，属正常，勿提交 node_modules）。\n"
    );
  }

  if (opts.full) {
    const flowSpecRoot = resolveFlowSpecRoot(cwd, opts);
    if (existsSync(flowSpecRoot) && hasFlowSpecMarker(flowSpecRoot) && !opts.force) {
      console.error(
        `已存在嵌入 Flow-Spec（${join(flowSpecRoot, "skills/using-flow-spec/SKILL.md")}）。` +
          `使用 flow-spec update，或加 --force。`
      );
      process.exit(1);
    }
    copyPackagedPack(packageRoot, flowSpecRoot, opts.force);
    const fsSeg = flowSpecPrefixFromRoots(cwd, flowSpecRoot);
    writeFsxCursorCommands(cwd, fsSeg, "embedded", pkgName);
    writeProjectRootRule(cwd, fsSeg, "embedded", pkgName);
    let ignoreLine = "flow-spec/temp/";
    if (opts.here) ignoreLine = "temp/";
    else if (fsSeg && fsSeg !== ".") ignoreLine = `${fsSeg}/temp/`;
    maybeSuggestGitignore(cwd, ignoreLine);
    console.log(`Flow-Spec init（--full）完成: ${flowSpecRoot}`);
    console.log(`已写入项目根: ${join(cwd, ".cursor/commands/fsx-*.md")}`);
    return;
  }

  /* 默认：仅 Cursor 指令 + 产出目录 + npm 依赖 */
  ensureOutputTree(cwd);
  writeFsxCursorCommands(cwd, "", "npm", pkgName);
  writeProjectRootRule(cwd, "", "npm", pkgName);
  maybeSuggestGitignore(cwd, `${OUTPUT_ROOT_DIR}/`);

  if (!opts.noInstall && existsSync(join(cwd, "package.json"))) {
    console.log(`正在安装开发依赖: ${pkgName}@${ver} …`);
    if (!runNpmInstallDev(cwd, pkgName, ver)) {
      console.error("npm install 失败，请手动执行: npm install -D " + pkgName + "@latest");
      process.exit(1);
    }
  } else if (!opts.noInstall) {
    console.log("提示: 未找到 package.json，请在该目录执行 npm init -y 后运行：");
    console.log(`  npm install -D ${pkgName}@latest`);
  }

  console.log("Flow-Spec init（轻量）完成：已写入 .cursor/commands 与 .cursor/rules。");
  console.log(`产出根目录: ${join(cwd, OUTPUT_ROOT_DIR)}/（见 references/rules/storage.md）`);
}

function cmdUpdate(argv) {
  const opts = parseCommon(argv);
  if (opts.help) {
    printHelp();
    process.exit(0);
  }

  const cwd = process.cwd();
  const pkgName = readPackageName(packageRoot);
  const ver = readPackVersion(packageRoot);

  const embedded = resolveEmbeddedPackRoot(cwd);

  if (embedded && hasFlowSpecMarker(embedded)) {
    copyPackagedPack(packageRoot, embedded, true);
    const fsSeg = flowSpecPrefixFromRoots(cwd, embedded);
    writeFsxCursorCommands(cwd, fsSeg, "embedded", pkgName);
    writeProjectRootRule(cwd, fsSeg, "embedded", pkgName);
    console.log(`Flow-Spec update（嵌入）完成: ${embedded} → ${ver}`);
    console.log("已刷新 .cursor/commands 与 .cursor/rules");
    return;
  }

  /* npm 轻量模式 */
  ensureOutputTree(cwd);
  writeFsxCursorCommands(cwd, "", "npm", pkgName);
  writeProjectRootRule(cwd, "", "npm", pkgName);

  if (!opts.noInstall && existsSync(join(cwd, "package.json"))) {
    console.log(`正在更新依赖: ${pkgName}@${ver} …`);
    runNpmInstallDev(cwd, pkgName, ver);
  }

  console.log(`Flow-Spec update（轻量）完成 → ${ver}`);
  console.log("已刷新 .cursor/commands、.cursor/rules 与 flowspec/ 目录骨架（若存在）");
}

function cmdDoctor() {
  const cwd = process.cwd();
  const pkgName = readPackageName(packageRoot);
  const verPack = readPackVersion(packageRoot);

  const embedded = resolveEmbeddedPackRoot(cwd);
  const npmOk = hasNpmPackMarker(cwd, pkgName);

  const outputOk = embedded
    ? existsSync(join(embedded, "temp", "specs"))
    : existsSync(join(cwd, OUTPUT_ROOT_DIR, "specs"));

  const checks = [
    ["fsx-write-prd", existsSync(join(cwd, ".cursor/commands/fsx-write-prd.md"))],
    ["fsx-route-delivery", existsSync(join(cwd, ".cursor/commands/fsx-route-delivery.md"))],
    ["项目根规则", existsSync(join(cwd, ".cursor/rules/flow-spec.mdc"))],
    [
      "技能可读（嵌入或 npm）",
      Boolean(embedded && hasFlowSpecMarker(embedded)) || npmOk,
    ],
    [
      embedded ? "产出目录（嵌入 temp/）" : "产出根目录（flowspec/）",
      outputOk,
    ],
  ];

  console.log("flow-spec doctor");
  console.log(`  CLI 包版本: ${verPack}`);
  console.log(`  嵌入目录: ${embedded || "(无)"}`);
  console.log(`  node_modules 技能包: ${npmOk ? "✓ " + pkgName : "✗"}`);
  for (const [label, ok] of checks) {
    console.log(`  ${ok ? "✓" : "✗"} ${label}`);
  }

  if (!checks.every(([, ok]) => ok)) {
    console.log("建议: 轻量模式执行 flow-spec init；嵌入模式执行 flow-spec init --full 或 flow-spec update");
    process.exit(1);
  }
}

function main() {
  const args = process.argv.slice(2);
  const v = readPackVersion(packageRoot);
  if (args[0] === "-v" || args[0] === "--version") {
    console.log(v);
    process.exit(0);
  }
  const [cmd, ...rest] = args;
  if (!cmd || cmd === "-h" || cmd === "--help") {
    printHelp();
    process.exit(0);
  }
  if (cmd === "version") {
    console.log(v);
    process.exit(0);
  }
  if (cmd === "init") cmdInit(rest);
  else if (cmd === "update") cmdUpdate(rest);
  else if (cmd === "doctor") cmdDoctor();
  else {
    console.error(`未知命令: ${cmd}`);
    printHelp();
    process.exit(1);
  }
}

main();

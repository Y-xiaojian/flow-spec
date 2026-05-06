#!/usr/bin/env node
/**
 * create-flow-spec — 与 flow-spec init 对齐。
 * 默认仅生成 Cursor 指令；加 --full 才拷贝完整 flow-spec/ 目录。
 */
import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";
import {
  OUTPUT_ROOT_DIR,
  copyPackagedPack,
  ensureOutputTree,
  flowSpecPrefixFromRoots,
  hasFlowSpecMarker,
  maybeSuggestGitignore,
  readPackVersion,
  readPackageName,
  writeFsxCursorCommands,
  writeProjectRootRule,
} from "./lib/scaffold-core.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageRoot = join(__dirname, "..");

function parseArgs(argv) {
  const out = {
    dir: null,
    force: false,
    here: false,
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
    else if ((a === "--dir" || a === "-d") && argv[i + 1]) {
      out.dir = argv[++i];
    }
  }
  return out;
}

function printHelp() {
  console.log(`
create-flow-spec — 初始化 Flow-Spec（默认仅 Cursor 指令；--full 拷贝整包）

用法:
  npx @yalo1228/ly-flowspec@latest [选项]

选项:
  --full         将完整技能包拷入 ./flow-spec（或 --dir / --here）
  --no-install   轻量模式下不自动 npm install -D
  --dir <路径>   仅 --full 时：输出子目录，默认 flow-spec
  --here         仅 --full 时：直接写入当前目录
  --force        覆盖；或轻量时强制重写命令
  -h, --help

建议优先使用: 全局或 npx 安装后执行 flow-spec init（同默认轻量行为）。

示例:
  cd ~/my-app && npx @yalo1228/ly-flowspec
  cd ~/my-app && npx @yalo1228/ly-flowspec --full
`);
}

function runNpmInstallDev(projectRoot, packageName, version) {
  const spec = `${packageName}@${version}`;
  return (
    spawnSync("npm", ["install", "-D", spec, "--no-fund", "--no-audit"], {
      cwd: projectRoot,
      stdio: "inherit",
    }).status === 0
  );
}

function main() {
  const argv = process.argv.slice(2);
  if (argv[0] === "-v" || argv[0] === "--version") {
    console.log(readPackVersion(packageRoot));
    process.exit(0);
  }

  const opts = parseArgs(argv);
  if (opts.help) {
    printHelp();
    process.exit(0);
  }

  const cwd = process.cwd();
  const pkgName = readPackageName(packageRoot);
  const ver = readPackVersion(packageRoot);

  console.log(`\n[create-flow-spec] CLI 版本 ${ver}`);
  if (opts.full) {
    console.log("[create-flow-spec] 模式: --full（将拷贝 skills/ 等到仓库内指定目录）\n");
  } else {
    console.log("[create-flow-spec] 模式: 轻量（默认）— 不创建仓库根下 flow-spec/ 文件夹");
    console.log(
      "                安装后出现 node_modules/@yalo1228/ly-flowspec/ 属正常（npm 依赖）。\n"
    );
  }

  if (opts.full) {
    let target;
    if (opts.here) target = cwd;
    else if (opts.dir) target = join(cwd, opts.dir);
    else target = join(cwd, "flow-spec");

    if (existsSync(target) && hasFlowSpecMarker(target) && !opts.force) {
      console.error(
        `已存在 Flow-Spec（${join(target, "skills/using-flow-spec/SKILL.md")}）。加 --force 覆盖。`
      );
      process.exit(1);
    }

    copyPackagedPack(packageRoot, target, opts.force);
    const fsSeg = flowSpecPrefixFromRoots(cwd, target);
    writeFsxCursorCommands(cwd, fsSeg, "embedded", pkgName);
    writeProjectRootRule(cwd, fsSeg, "embedded", pkgName);

    let ignoreLine = "flow-spec/temp/";
    if (opts.here) ignoreLine = "temp/";
    else {
      const rel = relative(cwd, target).replace(/\\/g, "/");
      if (rel && rel !== ".") ignoreLine = `${rel}/temp/`;
    }
    maybeSuggestGitignore(cwd, ignoreLine);

    console.log(`Flow-Spec（--full）已初始化: ${target}`);
    console.log(`已写入项目根: ${join(cwd, ".cursor/commands/fsx-*.md")}`);
    return;
  }

  /* 轻量：指令 + flowspec/ 目录骨架 + 可选 npm install */
  ensureOutputTree(cwd);
  writeFsxCursorCommands(cwd, "", "npm", pkgName);
  writeProjectRootRule(cwd, "", "npm", pkgName);
  maybeSuggestGitignore(cwd, `${OUTPUT_ROOT_DIR}/`);

  if (!opts.noInstall && existsSync(join(cwd, "package.json"))) {
    console.log(`正在安装: ${pkgName}@${ver} …`);
    if (!runNpmInstallDev(cwd, pkgName, ver)) {
      console.error("npm install 失败。请手动: npm install -D " + pkgName + "@latest");
      process.exit(1);
    }
  } else if (!opts.noInstall) {
    console.log("提示: 无 package.json 时请稍后执行 npm install -D " + pkgName + "@latest");
  }

  console.log("已生成 Cursor 指令与规则（轻量模式，未拷贝 flow-spec/ 目录）。");
  console.log(`产出根: ${join(cwd, OUTPUT_ROOT_DIR)}/`);
}

main();

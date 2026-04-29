from __future__ import annotations

import argparse
from datetime import datetime
from pathlib import Path


TRIGGER_MAP = {
    "需求风暴": "references/templates/requirement-storm.md",
    "需求编写": "references/templates/requirement-doc.md",
    "原型设计": "references/templates/prototype-spec.md",
    "技术设计": "references/templates/technical-doc.md",
    "测试": "references/templates/test-case.md",
    "逆向": "references/templates/reverse-report.md",
    "任务": "references/templates/task-plan.md",
}


def append_log(root: Path, trigger: str, output_path: Path) -> None:
    log_dir = root / "temp" / "logs"
    log_dir.mkdir(parents=True, exist_ok=True)
    log_file = log_dir / f"session-{datetime.now():%Y%m%d}.md"
    line = f"[{datetime.now():%H:%M:%S}] {trigger} | template={TRIGGER_MAP.get(trigger, '-')}" \
           f" | output={output_path.as_posix()} | ok\n"
    with log_file.open("a", encoding="utf-8") as f:
        f.write(line)


def ensure_required_docs(root: Path, output_path: Path) -> None:
    today = datetime.now().strftime("%Y%m%d")
    brainstorm_dir = root / "temp" / "brainstorm"
    task_dir = root / "temp" / "tasks"
    brainstorm_dir.mkdir(parents=True, exist_ok=True)
    task_dir.mkdir(parents=True, exist_ok=True)

    brainstorm_file = brainstorm_dir / f"brainstorm_{today}.md"
    task_file = task_dir / f"tasks_{today}.md"

    if not brainstorm_file.exists():
        brainstorm_tpl = (root / "references/templates/requirement-storm.md").read_text(encoding="utf-8")
        brainstorm_file.write_text(brainstorm_tpl, encoding="utf-8")

    if not task_file.exists():
        task_tpl = (root / "references/templates/task-plan.md").read_text(encoding="utf-8")
        task_file.write_text(task_tpl, encoding="utf-8")

    with task_file.open("a", encoding="utf-8") as f:
        f.write(f"\n- [ ] 处理产物：`{output_path.as_posix()}`\n")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--trigger", required=True, help="例如: 需求风暴/需求编写/技术设计")
    parser.add_argument("--output", required=True, help="输出文件路径")
    args = parser.parse_args()

    root = Path(__file__).resolve().parents[1]
    output_path = (root / args.output).resolve()
    output_path.parent.mkdir(parents=True, exist_ok=True)

    template = TRIGGER_MAP.get(args.trigger)
    if not template:
        raise SystemExit(f"unsupported trigger: {args.trigger}")

    source = (root / template).read_text(encoding="utf-8")
    output_path.write_text(source, encoding="utf-8")
    ensure_required_docs(root, output_path.relative_to(root))
    append_log(root, args.trigger, output_path.relative_to(root))
    print(f"generated: {output_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

from __future__ import annotations

from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
REF = ROOT / "references"


def list_md(path: Path) -> list[str]:
    if not path.exists():
        return []
    return sorted(str(p.relative_to(ROOT)).replace("\\", "/") for p in path.rglob("*.md"))


def main() -> int:
    lines = ["# references 自动索引", ""]
    for section in ["workflows", "rules", "templates"]:
        lines.append(f"## {section}")
        for item in list_md(REF / section):
            lines.append(f"- `{item}`")
        lines.append("")

    target = REF / "index.auto.md"
    target.write_text("\n".join(lines).rstrip() + "\n", encoding="utf-8")
    print(f"generated: {target}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

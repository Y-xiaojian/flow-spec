from __future__ import annotations

import argparse
import re
from pathlib import Path

try:
    from docxtpl import DocxTemplate
except ImportError as exc:
    raise ImportError("请先安装 docxtpl: pip install docxtpl") from exc


def extract_section(text: str, start_pattern: str, end_pattern: str) -> str:
    match = re.search(rf"{start_pattern}[^\n]*\n+([\s\S]*?)(?={end_pattern}|\Z)", text)
    return match.group(1).strip() if match else ""


def md_to_word_text(value: str) -> str:
    if not value:
        return ""
    value = re.sub(r"\*\*([^*]+)\*\*", r"\1", value)
    lines = []
    for line in value.split("\n"):
        stripped = line.strip()
        if not stripped:
            lines.append("")
            continue
        if "|" in stripped:
            parts = [p.strip() for p in stripped.split("|") if p.strip()]
            if len(parts) >= 2 and "----" not in stripped:
                lines.append(f"· {parts[0]}：{parts[1]}")
                continue
        lines.append(stripped)
    return "\n".join(lines).strip()


def parse_context(md_path: Path) -> dict[str, str]:
    text = md_path.read_text(encoding="utf-8")
    project_name = ""
    project_name_match = re.search(r"项目名称\s*\|\s*([^\n|]+)", text)
    if project_name_match:
        project_name = project_name_match.group(1).strip()

    background = extract_section(text, r"### 1\.1\s+背景描述", r"### 1\.2")
    goals_block = extract_section(text, r"### 1\.2\s+项目目标", r"### 1\.3|### 目标用户")
    goals = []
    for row in re.findall(r"\|\s*([^|]+)\|\s*([^|]+)\|", goals_block):
        left = row[0].strip()
        right = row[1].strip()
        if left and right and "目标" not in left and "描述" not in right and "---" not in left:
            goals.append(f"• {left}：{right}")

    reqs_block = extract_section(text, r"### 2\.1\s+功能清单", r"### 2\.2|### 功能")
    reqs = []
    for row in re.findall(r"\|\s*([^|]*)\|\s*([^|]*)\|\s*([^|]*)\|", reqs_block):
        req_id = row[0].strip()
        module = row[1].strip()
        func = row[2].strip()
        if req_id and module and func and "需求" not in req_id and "---" not in req_id:
            reqs.append(f"{req_id} {module}：{func}")

    return {
        "project_name": project_name,
        "project_background": md_to_word_text(background),
        "project_goals": md_to_word_text("\n".join(goals)),
        "functional_requirements": md_to_word_text("\n".join(reqs)),
    }


def main() -> int:
    parser = argparse.ArgumentParser(description="按模板填充湘彬格式 Word 文档")
    parser.add_argument("--template", "-t", required=True, help="模板 docx 路径")
    parser.add_argument("--input", "-i", required=True, help="输入需求 markdown 路径")
    parser.add_argument("--output", "-o", required=True, help="输出 docx 路径")
    parser.add_argument("--version", "-v", default="V1.0", help="版本号")
    parser.add_argument("--date", "-d", default="", help="发布日期 YYYY-MM-DD")
    parser.add_argument("--updated", "-u", default="", help="更新日期 YYYY-MM-DD")
    args = parser.parse_args()

    template_path = Path(args.template)
    input_path = Path(args.input)
    output_path = Path(args.output)

    if not template_path.exists():
        raise FileNotFoundError(f"模板不存在: {template_path}")
    if not input_path.exists():
        raise FileNotFoundError(f"输入文件不存在: {input_path}")

    output_path.parent.mkdir(parents=True, exist_ok=True)
    context = parse_context(input_path)
    context["version"] = args.version
    context["release_date"] = args.date
    context["update_date"] = args.updated or args.date

    doc = DocxTemplate(str(template_path))
    doc.render(context)
    doc.save(str(output_path))
    print(f"已生成: {output_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

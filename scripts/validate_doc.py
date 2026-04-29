from __future__ import annotations

import argparse
import re
from pathlib import Path


REQUIRED_HEADINGS = {
    "requirement": ["## 一、项目概述", "## 二、需求范围", "## 三、业务流程", "## 四、功能需求详述"],
    "technical": ["## 1. 背景与目标", "## 2. 需求追溯"],
    "test": ["## 测试步骤", "## 预期结果"],
}


def validate_headings(text: str, doc_type: str) -> list[str]:
    errors: list[str] = []
    for heading in REQUIRED_HEADINGS.get(doc_type, []):
        if heading not in text:
            errors.append(f"missing heading: {heading}")
    return errors


def validate_ids(text: str) -> list[str]:
    errors: list[str] = []
    if "FT-" in text and not re.search(r"FT-\d{3}", text):
        errors.append("invalid FT id format, expected FT-001")
    if "VR-" in text and not re.search(r"VR-\d{3}", text):
        errors.append("invalid VR id format, expected VR-001")
    if "BR-" in text and not re.search(r"BR-\d{3}", text):
        errors.append("invalid BR id format, expected BR-001")
    return errors


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--file", required=True)
    parser.add_argument("--type", required=True, choices=["requirement", "technical", "test"])
    args = parser.parse_args()

    content = Path(args.file).read_text(encoding="utf-8")
    errors = validate_headings(content, args.type)
    errors.extend(validate_ids(content))

    if errors:
        print("validate failed:")
        for err in errors:
            print(f"- {err}")
        return 1

    print("validate passed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

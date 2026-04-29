# 湘彬格式 Word 模板

将 docx 模板放入本目录，脚本按占位符替换内容。

## 模板要求

- 文件格式：`.docx`
- 默认模板名：`template.docx`

## 占位符

- `{{ project_name }}`
- `{{ project_background }}`
- `{{ project_goals }}`
- `{{ functional_requirements }}`
- `{{ version }}`
- `{{ release_date }}`
- `{{ update_date }}`

## 生成命令

```bash
python scripts/fill_template.py -t references/templates/xiangbin-word/template.docx -i docs/requirements/合同管理模块需求文档.md -o docs/requirements/word/输出.docx -v V1.0 -d 2026-03-06
```

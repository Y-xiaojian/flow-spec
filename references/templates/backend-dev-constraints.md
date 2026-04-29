# Backend Development Constraints (SRM)

## 通用约束

- 统一使用 `SecurityUtils` 获取用户与企业上下文
- 分页返回统一使用 `PageResult`
- 结果封装统一使用 `Result` 与 `ResultUtil`
- SQL 统一写在 Mapper XML，禁止注解 SQL

## DTO 与分页

- 列表查询 DTO 必须继承 `PageDomain`
- 分页参数来自 `PageDomain`
- 附件字段使用 `fileIds`，不重复定义

## Service/Controller 规范

- Controller：单条/列表使用 `ResultUtil.success`
- 分页：直接返回 `PageResult<T>`
- Service：对外返回 `Result<T>` 或 `PageResult<T>`

## 数据与字典

- 字典明文统一通过 `DictUtils` 获取
- 批量查询优先一次性获取，禁止循环逐条查询
- 用户名称、供应商、物料信息使用批量服务映射

## 代码风格

- 推荐 `@RequiredArgsConstructor` 构造器注入
- 类、方法、字段必须有 Javadoc 或字段注释
- 接口路径使用统一前缀，不重复拼接业务根路径

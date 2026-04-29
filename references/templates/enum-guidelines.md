# Enum Guidelines (SRM)

## 目标

- 统一后端状态/类型字段使用枚举，并在数据库中存储枚举 `code`（整数）。
- 保证 Controller、Service、Mapper、Domain、DTO 与前端交互一致。

## 定义规范

- 实现 `com.ly.core.entity.BaseEnum`
- 字段包含：`code`(Integer)、`desc`(String)
- `code` 使用 `@EnumValue`
- 提供 `@JsonCreator` 的 `getByCode(Integer code)` 静态方法

## Mapper 规范

- SQL 条件使用 `#{param.status.code}` 进行枚举 code 过滤
- Mapper 返回 Domain，不直接返回 DTO

## Service 规范

- DTO 与 Domain 字段同名同类型
- 枚举默认值在 Service 明确赋值
- 返回给前端时保持枚举对象或按约定返回 code/desc

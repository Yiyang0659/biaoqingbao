# 认证API文档

## 概述
表情包生成器后端的用户认证API，提供注册、登录和获取当前用户信息的功能。

## 认证流程
1. 用户注册 → 获取JWT token
2. 用户登录 → 获取JWT token  
3. 访问受保护端点 → 在Authorization头中携带Bearer token

## API端点

### 1. 用户注册
**POST** `/api/auth/register`

**请求体：**
```json
{
  "email": "user@example.com",
  "username": "username",
  "password": "password123"
}
```

**字段验证：**
- email: 必须为有效邮箱格式
- username: 3-50个字符
- password: 至少6个字符

**成功响应 (201 Created):**
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "username",
    "avatar_url": null,
    "created_at": "2024-01-01T00:00:00.000Z"
  },
  "token": "jwt_token_here"
}
```

**错误响应：**
- 400: 缺少必要字段或验证失败
- 409: 邮箱或用户名已存在
- 500: 服务器内部错误

### 2. 用户登录
**POST** `/api/auth/login`

**请求体：**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**成功响应 (200 OK):**
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "username",
    "avatar_url": null,
    "created_at": "2024-01-01T00:00:00.000Z"
  },
  "token": "jwt_token_here"
}
```

**错误响应：**
- 400: 缺少邮箱或密码
- 401: 邮箱或密码无效
- 500: 服务器内部错误

### 3. 获取当前用户信息
**GET** `/api/auth/me`

**认证要求：** Bearer Token

**请求头：**
```
Authorization: Bearer your_jwt_token_here
```

**成功响应 (200 OK):**
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "username",
    "avatar_url": null,
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

**错误响应：**
- 401: 未提供token或token无效/过期
- 404: 用户不存在
- 500: 服务器内部错误

## JWT Token
- 包含用户ID和邮箱
- 默认有效期：7天
- 存储在`config.jwtSecret`中配置的密钥签名

## 安全特性
1. **密码安全：**
   - 使用bcrypt哈希存储密码
   - 自动在创建和更新时哈希密码
   - 支持密码验证方法

2. **输入验证：**
   - 邮箱格式验证
   - 用户名长度验证
   - 密码最小长度验证

3. **错误处理：**
   - 统一的错误响应格式
   - 适当的HTTP状态码
   - 生产环境隐藏敏感错误信息

## 使用示例

### cURL示例

**注册：**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "username": "testuser",
    "password": "password123"
  }'
```

**登录：**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**获取用户信息：**
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer your_jwt_token_here"
```

## 文件结构
```
backend/src/
├── services/auth.service.ts      # 认证业务逻辑
├── middleware/auth.middleware.ts # 认证中间件
├── controllers/auth.controller.ts # 认证控制器
├── routes/auth.routes.ts         # 认证路由
└── config/jwt.ts                # JWT配置
```

## 环境变量
确保在`.env`文件中配置：
```
JWT_SECRET=your-super-secret-jwt-key-with-at-least-32-characters
JWT_EXPIRES_IN=7d
```
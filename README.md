# MemeMaker - 表情包生成器

一个基于AI的拟人化表情包生成器，可以将普通照片转换为动漫风格的表情包。

## 功能特性

- 🎨 图片上传与预处理
- 🤖 AI动漫化处理
- 💬 文字叠加与样式定制
- 📱 响应式设计
- 🔐 用户认证与作品管理
- 📤 社交分享功能

## 技术栈

### 前端
- React 18 + TypeScript
- Vite 构建工具
- Tailwind CSS 样式框架
- React Router 路由管理
- Zustand 状态管理

### 后端
- Node.js + Express
- PostgreSQL 数据库
- Sequelize ORM
- JWT 认证
- Cloudinary 图片存储
- Replicate AI 动漫化处理

## 项目结构

```
表情包生成器/
├── frontend/           # 前端代码
│   ├── src/
│   │   ├── components/ # 组件
│   │   ├── pages/     # 页面组件
│   │   ├── hooks/     # 自定义hooks
│   │   ├── App.tsx    # 主应用组件
│   │   └── main.tsx   # 入口文件
│   ├── package.json
│   └── vite.config.ts
├── backend/           # 后端代码
│   ├── src/
│   │   ├── models/    # 数据模型
│   │   ├── routes/    # API路由
│   │   ├── services/  # 业务逻辑
│   │   └── server.ts  # 服务器入口
│   └── package.json
└── docs/              # 项目文档
```

## 快速开始

### 前端开发

```bash
cd frontend
npm install
npm run dev
```

前端将在 http://localhost:3000 启动。

### 后端开发

```bash
cd backend
npm install
npm run dev
```

后端将在 http://localhost:5000 启动。

## 环境变量配置

### 前端 (.env)
```
VITE_API_BASE_URL=http://localhost:5000
```

### 后端 (.env)
```
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/meme_generator
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
REPLICATE_API_TOKEN=your_replicate_token
```

## API 文档

### 认证相关
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录
- `GET /api/auth/me` - 获取当前用户信息

### 图片处理
- `POST /api/images/upload` - 上传图片（需要认证）
- `POST /api/images/anime` - 动漫化处理（需要认证）

## 开发进度

- [x] Task 1: 项目初始化
- [x] Task 2: 前端基础配置
- [x] Task 3: 后端基础配置
- [x] Task 4: 数据库模型定义
- [x] Task 5: 认证服务实现
- [x] Task 6: 图片处理服务
- [x] Task 7: 前端基础组件
- [ ] Task 8: 图片上传组件
- [ ] Task 9: 编辑器功能实现
- [ ] Task 10: 历史记录功能
- [ ] Task 11: 部署配置

## 许可证

MIT# AI-
# biaoqingbao
# biaoqingbao

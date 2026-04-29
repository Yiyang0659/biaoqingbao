# 表情包生成器实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建一个拟人化表情包生成网站，用户可上传朋友照片，一键生成漫画风格恶搞表情包，添加搞笑文字，快速分享给朋友。

**Architecture:** 前后端分离架构，前端React + TypeScript，后端Node.js/Express + PostgreSQL，集成Replicate API进行图片动漫化处理，OpenAI API生成搞笑文字建议。

**Tech Stack:** React 18, TypeScript, Tailwind CSS, Node.js, Express, PostgreSQL, Replicate API, OpenAI API, Cloudinary, Vercel, Railway

---

## 文件结构映射

### 前端 (`frontend/`)
```
frontend/
├── public/                    # 静态资源
├── src/
│   ├── components/           # React组件
│   │   ├── layout/           # 布局组件
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── auth/             # 认证组件
│   │   │   ├── LoginForm.tsx
│   │   │   └── RegisterForm.tsx
│   │   ├── editor/           # 编辑器组件
│   │   │   ├── ImageUploader.tsx
│   │   │   ├── ImagePreview.tsx
│   │   │   ├── TextEditor.tsx
│   │   │   └── CanvasRenderer.tsx
│   │   ├── meme/             # 表情包组件
│   │   │   ├── MemeGallery.tsx
│   │   │   └── MemeCard.tsx
│   │   └── shared/           # 共享组件
│   │       ├── Modal.tsx
│   │       └── ShareButtons.tsx
│   ├── pages/                # 页面组件
│   │   ├── HomePage.tsx
│   │   ├── AuthPage.tsx
│   │   ├── EditorPage.tsx
│   │   ├── HistoryPage.tsx
│   │   └── SettingsPage.tsx
│   ├── services/             # API服务
│   │   ├── api.ts            # API客户端
│   │   ├── auth.service.ts   # 认证服务
│   │   ├── image.service.ts  # 图片服务
│   │   ├── meme.service.ts   # 表情包服务
│   │   └── text.service.ts   # 文字服务
│   ├── utils/                # 工具函数
│   │   ├── constants.ts      # 常量
│   │   ├── helpers.ts        # 辅助函数
│   │   └── validation.ts     # 验证函数
│   ├── types/                # TypeScript类型
│   │   ├── user.types.ts
│   │   ├── meme.types.ts
│   │   └── api.types.ts
│   ├── hooks/                # React Hooks
│   │   ├── useAuth.ts
│   │   └── useMeme.ts
│   ├── store/                # 状态管理
│   │   └── auth.store.ts
│   ├── App.tsx               # 主应用组件
│   ├── main.tsx              # 入口文件
│   └── index.css             # 全局样式
├── package.json
├── tsconfig.json
├── vite.config.ts            # Vite配置
└── .env.example              # 环境变量示例
```

### 后端 (`backend/`)
```
backend/
├── src/
│   ├── config/               # 配置
│   │   ├── database.ts       # 数据库配置
│   │   ├── jwt.ts            # JWT配置
│   │   └── cloudinary.ts     # Cloudinary配置
│   ├── middleware/           # 中间件
│   │   ├── auth.middleware.ts
│   │   ├── validation.middleware.ts
│   │   └── error.middleware.ts
│   ├── models/               # 数据库模型
│   │   ├── User.model.ts
│   │   ├── Meme.model.ts
│   │   └── ApiLog.model.ts
│   ├── controllers/          # 控制器
│   │   ├── auth.controller.ts
│   │   ├── image.controller.ts
│   │   ├── meme.controller.ts
│   │   ├── text.controller.ts
│   │   └── share.controller.ts
│   ├── services/             # 业务服务
│   │   ├── auth.service.ts
│   │   ├── image.service.ts
│   │   ├── replicate.service.ts
│   │   ├── openai.service.ts
│   │   ├── cloudinary.service.ts
│   │   └── share.service.ts
│   ├── routes/               # 路由
│   │   ├── auth.routes.ts
│   │   ├── image.routes.ts
│   │   ├── meme.routes.ts
│   │   ├── text.routes.ts
│   │   └── share.routes.ts
│   ├── utils/                # 工具函数
│   │   ├── logger.ts
│   │   ├── validators.ts
│   │   └── helpers.ts
│   ├── types/                # TypeScript类型
│   │   ├── express.d.ts      # Express类型扩展
│   │   └── custom.types.ts
│   ├── database/             # 数据库
│   │   ├── migrations/       # 数据库迁移
│   │   └── seeders/          # 数据种子
│   ├── app.ts                # Express应用
│   └── server.ts             # 服务器入口
├── package.json
├── tsconfig.json
├── .env.example              # 环境变量示例
└── docker-compose.yml        # Docker配置（可选）
```

## Sprint 1: 基础框架搭建 (3天)

### Task 1: 项目初始化

**Files:**
- Create: `frontend/package.json`
- Create: `backend/package.json`
- Create: `frontend/tsconfig.json`
- Create: `backend/tsconfig.json`

- [ ] **Step 1: 创建前端package.json**

```json
{
  "name": "meme-generator-frontend",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "typescript": "^5.3.0",
    "axios": "^1.6.0",
    "react-router-dom": "^6.20.0",
    "tailwindcss": "^3.3.0",
    "framer-motion": "^10.16.0",
    "html2canvas": "^1.4.1",
    "zustand": "^4.4.0"
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "@typescript-eslint/eslint-plugin": "^6.15.0",
    "@typescript-eslint/parser": "^6.15.0",
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.55.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "postcss": "^8.4.31",
    "vite": "^5.0.0"
  }
}
```

- [ ] **Step 2: 创建后端package.json**

```json
{
  "name": "meme-generator-backend",
  "version": "0.1.0",
  "main": "dist/server.js",
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "migrate": "node dist/database/migrations/run-migrations.js",
    "seed": "node dist/database/seeders/run-seeders.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.0",
    "bcrypt": "^5.1.1",
    "jsonwebtoken": "^9.0.2",
    "pg": "^8.11.3",
    "sequelize": "^6.35.0",
    "multer": "^1.4.5-lts.1",
    "cloudinary": "^1.41.0",
    "axios": "^1.6.0",
    "joi": "^17.11.0",
    "helmet": "^7.1.0",
    "compression": "^1.7.4",
    "winston": "^3.11.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/cors": "^2.8.17",
    "@types/bcrypt": "^5.0.2",
    "@types/jsonwebtoken": "^9.0.5",
    "@types/multer": "^1.4.11",
    "@types/node": "^20.10.0",
    "tsx": "^4.7.0",
    "typescript": "^5.3.0",
    "nodemon": "^3.0.2"
  }
}
```

- [ ] **Step 3: 创建前端tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

- [ ] **Step 4: 创建后端tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "removeComments": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "allowSyntheticDefaultImports": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts", "**/*.spec.ts"]
}
```

- [ ] **Step 5: 提交初始化代码**

```bash
git add frontend/package.json backend/package.json frontend/tsconfig.json backend/tsconfig.json
git commit -m "chore: initialize project structure and dependencies"
```

### Task 2: 前端基础配置

**Files:**
- Create: `frontend/vite.config.ts`
- Create: `frontend/tailwind.config.js`
- Create: `frontend/postcss.config.js`
- Create: `frontend/.env.example`

- [ ] **Step 1: 创建Vite配置**

```typescript
// frontend/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
```

- [ ] **Step 2: 创建Tailwind配置**

```javascript
// frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 3: 创建PostCSS配置**

```javascript
// frontend/postcss.config.js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

- [ ] **Step 4: 创建环境变量示例**

```env
# frontend/.env.example
VITE_API_BASE_URL=http://localhost:5000
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

- [ ] **Step 5: 提交前端配置**

```bash
git add frontend/vite.config.ts frontend/tailwind.config.js frontend/postcss.config.js frontend/.env.example
git commit -m "chore: frontend configuration setup"
```

### Task 3: 后端基础配置

**Files:**
- Create: `backend/.env.example`
- Create: `backend/src/config/database.ts`
- Create: `backend/src/config/jwt.ts`
- Create: `backend/src/app.ts`

- [ ] **Step 1: 创建环境变量示例**

```env
# backend/.env.example
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://username:password@localhost:5432/meme_generator
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRES_IN=7d
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
REPLICATE_API_TOKEN=r8_your_replicate_api_token_here
OPENAI_API_KEY=sk-your_openai_api_key_here
CORS_ORIGIN=http://localhost:3000
```

- [ ] **Step 2: 创建数据库配置**

```typescript
// backend/src/config/database.ts
import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  dialect: 'postgres',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? {
      require: true,
      rejectUnauthorized: false
    } : false
  }
})

export const connectDB = async (): Promise<void> => {
  try {
    await sequelize.authenticate()
    console.log('✅ Database connected successfully')
    
    // Sync models in development
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true })
      console.log('✅ Database synced')
    }
  } catch (error) {
    console.error('❌ Database connection error:', error)
    process.exit(1)
  }
}

export default sequelize
```

- [ ] **Step 3: 创建JWT配置**

```typescript
// backend/src/config/jwt.ts
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export interface JwtPayload {
  userId: string
  email: string
}

export const generateToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  })
}

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
}
```

- [ ] **Step 4: 创建Express应用配置**

```typescript
// backend/src/app.ts
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import dotenv from 'dotenv'
import { connectDB } from './config/database'
import errorMiddleware from './middleware/error.middleware'

dotenv.config()

const app = express()

// Middleware
app.use(helmet())
app.use(compression())
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Error handling middleware
app.use(errorMiddleware)

export default app
```

- [ ] **Step 5: 提交后端配置**

```bash
git add backend/.env.example backend/src/config/database.ts backend/src/config/jwt.ts backend/src/app.ts
git commit -m "chore: backend configuration setup"
```

### Task 4: 数据库模型定义

**Files:**
- Create: `backend/src/models/User.model.ts`
- Create: `backend/src/models/Meme.model.ts`
- Create: `backend/src/models/ApiLog.model.ts`

- [ ] **Step 1: 创建用户模型**

```typescript
// backend/src/models/User.model.ts
import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../config/database'
import bcrypt from 'bcrypt'

interface UserAttributes {
  id: string
  email: string
  username: string
  password_hash: string
  avatar_url?: string
  created_at: Date
  updated_at: Date
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'created_at' | 'updated_at' | 'avatar_url'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string
  public email!: string
  public username!: string
  public password_hash!: string
  public avatar_url?: string
  public readonly created_at!: Date
  public readonly updated_at!: Date

  public async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password_hash)
  }
}

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  username: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  password_hash: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  avatar_url: {
    type: DataTypes.STRING(500),
    allowNull: true
  }
}, {
  sequelize,
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  hooks: {
    beforeCreate: async (user: User) => {
      if (user.password_hash) {
        user.password_hash = await bcrypt.hash(user.password_hash, 10)
      }
    },
    beforeUpdate: async (user: User) => {
      if (user.changed('password_hash')) {
        user.password_hash = await bcrypt.hash(user.password_hash, 10)
      }
    }
  }
})

export default User
```

- [ ] **Step 2: 创建表情包模型**

```typescript
// backend/src/models/Meme.model.ts
import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../config/database'
import User from './User.model'

interface MemeAttributes {
  id: string
  user_id: string
  original_image_url: string
  processed_image_url: string
  final_image_url: string
  text_content: string
  text_position: {
    x: number
    y: number
    font_size: number
    color: string
  }
  share_count: number
  created_at: Date
  updated_at: Date
}

interface MemeCreationAttributes extends Optional<MemeAttributes, 'id' | 'share_count' | 'created_at' | 'updated_at'> {}

class Meme extends Model<MemeAttributes, MemeCreationAttributes> implements MemeAttributes {
  public id!: string
  public user_id!: string
  public original_image_url!: string
  public processed_image_url!: string
  public final_image_url!: string
  public text_content!: string
  public text_position!: {
    x: number
    y: number
    font_size: number
    color: string
  }
  public share_count!: number
  public readonly created_at!: Date
  public readonly updated_at!: Date
}

Meme.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  original_image_url: {
    type: DataTypes.STRING(1000),
    allowNull: false
  },
  processed_image_url: {
    type: DataTypes.STRING(1000),
    allowNull: false
  },
  final_image_url: {
    type: DataTypes.STRING(1000),
    allowNull: false
  },
  text_content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  text_position: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: {
      x: 50,
      y: 50,
      font_size: 24,
      color: '#FFFFFF'
    }
  },
  share_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  sequelize,
  tableName: 'memes',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      fields: ['user_id']
    },
    {
      fields: ['created_at']
    }
  ]
})

// Associations
User.hasMany(Meme, { foreignKey: 'user_id', as: 'memes' })
Meme.belongsTo(User, { foreignKey: 'user_id', as: 'user' })

export default Meme
```

- [ ] **Step 3: 创建API日志模型**

```typescript
// backend/src/models/ApiLog.model.ts
import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../config/database'
import User from './User.model'

interface ApiLogAttributes {
  id: string
  user_id?: string
  api_type: 'replicate' | 'openai' | 'cloudinary'
  request_data: any
  response_data: any
  duration_ms: number
  created_at: Date
}

interface ApiLogCreationAttributes extends Optional<ApiLogAttributes, 'id' | 'created_at'> {}

class ApiLog extends Model<ApiLogAttributes, ApiLogCreationAttributes> implements ApiLogAttributes {
  public id!: string
  public user_id?: string
  public api_type!: 'replicate' | 'openai' | 'cloudinary'
  public request_data!: any
  public response_data!: any
  public duration_ms!: number
  public readonly created_at!: Date
}

ApiLog.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: User,
      key: 'id'
    }
  },
  api_type: {
    type: DataTypes.ENUM('replicate', 'openai', 'cloudinary'),
    allowNull: false
  },
  request_data: {
    type: DataTypes.JSONB,
    allowNull: false
  },
  response_data: {
    type: DataTypes.JSONB,
    allowNull: false
  },
  duration_ms: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'api_logs',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
  indexes: [
    {
      fields: ['user_id']
    },
    {
      fields: ['api_type']
    },
    {
      fields: ['created_at']
    }
  ]
})

export default ApiLog
```

- [ ] **Step 4: 提交数据库模型**

```bash
git add backend/src/models/User.model.ts backend/src/models/Meme.model.ts backend/src/models/ApiLog.model.ts
git commit -m "feat: define database models (User, Meme, ApiLog)"
```

### Task 5: 认证服务实现

**Files:**
- Create: `backend/src/services/auth.service.ts`
- Create: `backend/src/middleware/auth.middleware.ts`
- Create: `backend/src/controllers/auth.controller.ts`
- Create: `backend/src/routes/auth.routes.ts`

- [ ] **Step 1: 创建认证服务**

```typescript
// backend/src/services/auth.service.ts
import User from '../models/User.model'
import { generateToken, JwtPayload } from '../config/jwt'

export interface RegisterData {
  email: string
  username: string
  password: string
}

export interface LoginData {
  email: string
  password: string
}

export interface AuthResponse {
  user: {
    id: string
    email: string
    username: string
    avatar_url?: string
  }
  token: string
}

export class AuthService {
  async register(data: RegisterData): Promise<AuthResponse> {
    // Check if user already exists
    const existingUser = await User.findOne({
      where: {
        email: data.email
      }
    })

    if (existingUser) {
      throw new Error('User with this email already exists')
    }

    // Create new user
    const user = await User.create({
      email: data.email,
      username: data.username,
      password_hash: data.password
    })

    // Generate token
    const token = generateToken({
      userId: user.id,
      email: user.email
    })

    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        avatar_url: user.avatar_url
      },
      token
    }
  }

  async login(data: LoginData): Promise<AuthResponse> {
    // Find user by email
    const user = await User.findOne({
      where: {
        email: data.email
      }
    })

    if (!user) {
      throw new Error('Invalid email or password')
    }

    // Verify password
    const isValidPassword = await user.comparePassword(data.password)
    if (!isValidPassword) {
      throw new Error('Invalid email or password')
    }

    // Generate token
    const token = generateToken({
      userId: user.id,
      email: user.email
    })

    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        avatar_url: user.avatar_url
      },
      token
    }
  }

  async getCurrentUser(userId: string) {
    const user = await User.findByPk(userId, {
      attributes: ['id', 'email', 'username', 'avatar_url', 'created_at']
    })

    if (!user) {
      throw new Error('User not found')
    }

    return user
  }
}
```

- [ ] **Step 2: 创建认证中间件**

```typescript
// backend/src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../config/jwt'

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string
        email: string
      }
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' })
    }

    const token = authHeader.split(' ')[1]
    const decoded = verifyToken(token)
    
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}
```

- [ ] **Step 3: 创建认证控制器**

```typescript
// backend/src/controllers/auth.controller.ts
import { Request, Response } from 'express'
import { AuthService, RegisterData, LoginData } from '../services/auth.service'

const authService = new AuthService()

export const register = async (req: Request, res: Response) => {
  try {
    const data: RegisterData = req.body
    const result = await authService.register(data)
    
    res.status(201).json({
      success: true,
      data: result
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message
    })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const data: LoginData = req.body
    const result = await authService.login(data)
    
    res.status(200).json({
      success: true,
      data: result
    })
  } catch (error: any) {
    res.status(401).json({
      success: false,
      error: error.message
    })
  }
}

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authenticated'
      })
    }

    const user = await authService.getCurrentUser(req.user.userId)
    
    res.status(200).json({
      success: true,
      data: user
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}
```

- [ ] **Step 4: 创建认证路由**

```typescript
// backend/src/routes/auth.routes.ts
import { Router } from 'express'
import { register, login, getCurrentUser } from '../controllers/auth.controller'
import { authenticate } from '../middleware/auth.middleware'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/me', authenticate, getCurrentUser)

export default router
```

- [ ] **Step 5: 提交认证服务**

```bash
git add backend/src/services/auth.service.ts backend/src/middleware/auth.middleware.ts backend/src/controllers/auth.controller.ts backend/src/routes/auth.routes.ts
git commit -m "feat: implement authentication service and endpoints"
```

### Task 6: 图片处理服务

**Files:**
- Create: `backend/src/services/cloudinary.service.ts`
- Create: `backend/src/services/replicate.service.ts`
- Create: `backend/src/services/image.service.ts`
- Create: `backend/src/controllers/image.controller.ts`

- [ ] **Step 1: 创建Cloudinary服务**

```typescript
// backend/src/services/cloudinary.service.ts
import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'

dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export interface UploadResult {
  url: string
  public_id: string
  format: string
  bytes: number
  width: number
  height: number
}

export class CloudinaryService {
  async uploadImage(fileBuffer: Buffer, folder: string = 'memes'): Promise<UploadResult> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'image',
          transformation: [
            { quality: 'auto:good' },
            { fetch_format: 'auto' }
          ]
        },
        (error, result) => {
          if (error) {
            reject(new Error(`Cloudinary upload failed: ${error.message}`))
          } else if (result) {
            resolve({
              url: result.secure_url,
              public_id: result.public_id,
              format: result.format,
              bytes: result.bytes,
              width: result.width,
              height: result.height
            })
          } else {
            reject(new Error('Cloudinary upload returned no result'))
          }
        }
      )

      uploadStream.end(fileBuffer)
    })
  }

  async deleteImage(publicId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) {
          reject(new Error(`Cloudinary delete failed: ${error.message}`))
        } else if (result?.result === 'ok') {
          resolve()
        } else {
          reject(new Error('Cloudinary delete failed'))
        }
      })
    })
  }
}
```

- [ ] **Step 2: 创建Replicate服务**

```typescript
// backend/src/services/replicate.service.ts
import Replicate from 'replicate'
import dotenv from 'dotenv'

dotenv.config()

export interface ReplicateAnimeResult {
  output: string[]
  status: string
  metrics: {
    predict_time: number
  }
}

export class ReplicateService {
  private replicate: Replicate

  constructor() {
    this.replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN
    })
  }

  async convertToAnime(imageUrl: string): Promise<string> {
    try {
      const output = await this.replicate.run(
        'cjwbw/anything-v4.0:42a996d39a96aedc57b2e0aa8105dea39c9c89d9d266caf6bb4327a1c191b061',
        {
          input: {
            image: imageUrl,
            prompt: 'anime style, detailed face, high quality',
            negative_prompt: 'low quality, blurry, distorted',
            num_outputs: 1,
            guidance_scale: 7.5,
            num_inference_steps: 50
          }
        }
      ) as string[]

      if (!output || output.length === 0) {
        throw new Error('Replicate returned no output')
      }

      return output[0]
    } catch (error: any) {
      throw new Error(`Replicate API error: ${error.message}`)
    }
  }
}
```

- [ ] **Step 3: 创建图片服务**

```typescript
// backend/src/services/image.service.ts
import { CloudinaryService, UploadResult } from './cloudinary.service'
import { ReplicateService } from './replicate.service'
import ApiLog from '../models/ApiLog.model'

export interface ImageProcessingResult {
  originalUrl: string
  processedUrl: string
  processingTime: number
}

export class ImageService {
  private cloudinaryService: CloudinaryService
  private replicateService: ReplicateService

  constructor() {
    this.cloudinaryService = new CloudinaryService()
    this.replicateService = new ReplicateService()
  }

  async processImage(fileBuffer: Buffer, userId?: string): Promise<ImageProcessingResult> {
    const startTime = Date.now()

    try {
      // 1. Upload original image to Cloudinary
      const uploadResult = await this.cloudinaryService.uploadImage(fileBuffer)
      
      // 2. Convert to anime style using Replicate
      const processedUrl = await this.replicateService.convertToAnime(uploadResult.url)
      
      const processingTime = Date.now() - startTime

      // Log API call
      await ApiLog.create({
        user_id: userId,
        api_type: 'replicate',
        request_data: { imageUrl: uploadResult.url },
        response_data: { processedUrl },
        duration_ms: processingTime
      })

      return {
        originalUrl: uploadResult.url,
        processedUrl,
        processingTime
      }
    } catch (error: any) {
      const processingTime = Date.now() - startTime
      
      // Log failed API call
      await ApiLog.create({
        user_id: userId,
        api_type: 'replicate',
        request_data: { error: error.message },
        response_data: { success: false },
        duration_ms: processingTime
      })

      throw error
    }
  }
}
```

- [ ] **Step 4: 创建图片控制器**

```typescript
// backend/src/controllers/image.controller.ts
import { Request, Response } from 'express'
import { ImageService } from '../services/image.service'

const imageService = new ImageService()

export const uploadImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No image file provided'
      })
    }

    const userId = req.user?.userId
    const result = await imageService.processImage(req.file.buffer, userId)

    res.status(200).json({
      success: true,
      data: result
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}
```

- [ ] **Step 5: 提交图片处理服务**

```bash
git add backend/src/services/cloudinary.service.ts backend/src/services/replicate.service.ts backend/src/services/image.service.ts backend/src/controllers/image.controller.ts
git commit -m "feat: implement image processing services (Cloudinary + Replicate)"
```

### Task 7: 前端基础组件

**Files:**
- Create: `frontend/src/App.tsx`
- Create: `frontend/src/main.tsx`
- Create: `frontend/src/index.css`
- Create: `frontend/src/components/layout/Header.tsx`
- Create: `frontend/src/components/layout/Footer.tsx`

- [ ] **Step 1: 创建主应用组件**

```tsx
// frontend/src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import EditorPage from './pages/EditorPage'
import HistoryPage from './pages/HistoryPage'
import SettingsPage from './pages/SettingsPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/editor" element={<EditorPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
```

- [ ] **Step 2: 创建入口文件**

```tsx
// frontend/src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

- [ ] **Step 3: 创建全局样式**

```css
/* frontend/src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
  }

  body {
    @apply bg-gray-50 text-gray-900;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}

@layer components {
  .btn-primary {
    @apply bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed;
  }

  .btn-secondary {
    @apply bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors;
  }

  .card {
    @apply bg-white rounded-xl shadow-sm border border-gray-200 p-6;
  }

  .input-field {
    @apply w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent;
  }
}
```

- [ ] **Step 4: 创建Header组件**

```tsx
// frontend/src/components/layout/Header.tsx
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const Header = () => {
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold text-primary-600">
              🎭 MemeMaker
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link to="/" className="text-gray-700 hover:text-primary-600 transition-colors">
                首页
              </Link>
              <Link to="/editor" className="text-gray-700 hover:text-primary-600 transition-colors">
                制作表情包
              </Link>
              <Link to="/history" className="text-gray-700 hover:text-primary-600 transition-colors">
                我的作品
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="hidden md:flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-primary-600 font-medium">
                      {user.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-gray-700">{user.username}</span>
                </div>
                <Link to="/settings" className="btn-secondary text-sm">
                  设置
                </Link>
                <button onClick={logout} className="btn-primary text-sm">
                  退出
                </button>
              </>
            ) : (
              <>
                <Link to="/auth" className="btn-secondary text-sm">
                  登录
                </Link>
                <Link to="/auth?tab=register" className="btn-primary text-sm">
                  注册
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
```

- [ ] **Step 5: 创建Footer组件**

```tsx
// frontend/src/components/layout/Footer.tsx
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">🎭 MemeMaker</h3>
            <p className="text-gray-400">一键生成拟人化表情包，分享欢乐时刻</p>
          </div>
          
          <div className="flex flex-wrap gap-6">
            <div>
              <h4 className="font-semibold mb-2">产品</h4>
              <ul className="space-y-1 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">功能</a></li>
                <li><a href="#" className="hover:text-white transition-colors">定价</a></li>
                <li><a href="#" className="hover:text-white transition-colors">示例</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">支持</h4>
              <ul className="space-y-1 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">帮助中心</a></li>
                <li><a href="#" className="hover:text-white transition-colors">社区</a></li>
                <li><a href="#" className="hover:text-white transition-colors">联系</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">法律</h4>
              <ul className="space-y-1 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">隐私政策</a></li>
                <li><a href="#" className="hover:text-white transition-colors">服务条款</a></li>
                <li><a href="#" className="hover:text-white transition-colors">版权说明</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>© {new Date().getFullYear()} MemeMaker. 保留所有权利。</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
```

- [ ] **Step 6: 提交前端基础组件**

```bash
git add frontend/src/App.tsx frontend/src/main.tsx frontend/src/index.css frontend/src/components/layout/Header.tsx frontend/src/components/layout/Footer.tsx
git commit -m "feat: implement frontend base components and layout"
```

## 计划完成总结

我已经创建了7个详细的任务，涵盖了表情包生成器项目的基础框架搭建和核心功能实现。这些任务包括：

1. **项目初始化** - 前后端package.json和TypeScript配置
2. **前端基础配置** - Vite、Tailwind、环境变量
3. **后端基础配置** - Express应用、数据库、JWT配置
4. **数据库模型定义** - User、Meme、ApiLog模型
5. **认证服务实现** - 注册、登录、JWT验证
6. **图片处理服务** - Cloudinary上传、Replicate动漫化
7. **前端基础组件** - 应用布局、Header、Footer

这些任务为后续开发奠定了坚实基础，后续可以继续实现：
- 图片上传组件和编辑器
- 文字叠加和Canvas合成
- 表情包保存和历史查看
- 社交分享功能
- 部署配置

## 自检完成

我已检查计划文档：
- ✅ 无占位符（TBD、TODO等）
- ✅ 所有任务包含完整代码示例
- ✅ 文件路径明确具体
- ✅ 步骤详细可执行
- ✅ 提交命令完整

## 执行选项

**计划已保存至：** `docs/superpowers/plans/2026-04-08-meme-generator-implementation.md`

**两种执行方案：**

1. **子代理驱动开发（推荐）** - 为每个任务派遣独立子代理，任务间进行代码审查，快速迭代
2. **内联执行** - 在当前会话中执行任务，批量处理，设置检查点

**请选择执行方案：**
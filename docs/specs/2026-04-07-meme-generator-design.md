# 拟人化表情包生成网站设计文档

## 项目概述

### 需求背景
创建一款面向普通用户的拟人化表情包生成工具，用户可以上传朋友的照片，一键生成漫画风格恶搞表情包，并添加搞笑文字，快速分享给朋友。

### 核心目标
1. **快速制作**：用户上传图片后3步完成表情包制作
2. **拟人化处理**：使用AI技术将人脸照片转化为漫画风格
3. **文字互动**：支持用户输入文字，AI提供搞笑建议
4. **社交分享**：一键分享到微信、微博等社交平台
5. **用户留存**：账户系统保存历史作品

### 成功标准
- MVP上线：1周内可用的基础版本
- 用户体验：从上传到分享不超过5分钟
- 技术指标：图片处理API响应时间<10秒
- 用户反馈：收集至少10个用户测试反馈

## 系统架构

### 技术栈
```
前端：React 18 + TypeScript + Tailwind CSS + Headless UI
后端：Node.js + Express + TypeScript
数据库：PostgreSQL (Railway提供)
AI服务：Replicate API (图像动漫化) + OpenAI API (文字建议)
部署：Vercel (前端) + Railway (后端)
存储：Cloudinary/R2对象存储 (图片临时存储)
```

### 架构图
```
用户 → React前端 → Vercel部署
              ↓ HTTP请求
        Express后端 → Railway部署
              ↓
        PostgreSQL数据库
              ↓
        Replicate API (动漫化)
              ↓  
        OpenAI API (文字建议)
              ↓
        Cloudinary (图片存储)
```

### 数据流
1. **上传流**：用户图片 → 前端FormData → 后端接收 → Cloudinary上传 → Replicate处理 → 返回处理URL
2. **文字流**：用户输入文字 → 前端Canvas叠加 → 生成最终图片 → 保存到用户历史
3. **分享流**：生成图片 → 后端生成分享链接 → 返回社交平台分享URL

## API设计

### 认证接口
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录
- `GET /api/auth/me` - 获取当前用户信息
- `POST /api/auth/logout` - 用户登出

### 图片处理接口
- `POST /api/image/upload` - 上传图片文件，返回临时ID
- `POST /api/image/anime` - 调用Replicate API进行动漫化处理
- `GET /api/image/:id` - 获取图片详情

### 表情包接口
- `POST /api/meme/generate` - 生成完整表情包（图片+文字）
- `POST /api/meme/save` - 保存表情包到用户历史
- `GET /api/meme/history` - 获取用户历史表情包
- `DELETE /api/meme/:id` - 删除表情包

### 文字处理接口
- `POST /api/text/suggest` - 获取AI生成的搞笑文字建议
- `POST /api/text/overlay` - 文字叠加到图片（返回图片URL）

### 分享接口
- `POST /api/share/generate` - 生成社交平台分享链接
- `GET /api/share/stats` - 获取分享统计

## 前端页面设计

### 页面结构
1. **首页** (`/`) - 产品介绍和快速开始
2. **登录/注册页** (`/auth/login`, `/auth/register`) - 用户认证
3. **编辑器页** (`/editor`) - 核心表情包制作页面
4. **历史记录页** (`/history`) - 用户保存的表情包列表
5. **设置页** (`/settings`) - 用户账户设置

### 组件设计
#### 核心组件
- `ImageUploader` - 图片上传组件（拖拽+点击）
- `ImagePreview` - 图片预览组件（原图/处理图对比）
- `TextEditor` - 文字编辑组件（输入框+AI建议）
- `CanvasRenderer` - Canvas图片合成组件
- `MemeGallery` - 表情包画廊组件
- `ShareButtons` - 社交分享按钮组

#### 布局组件
- `Header` - 网站头部（Logo+导航+用户菜单）
- `Footer` - 网站底部（链接+版权）
- `Sidebar` - 侧边栏（编辑器工具）
- `Modal` - 通用模态框

## 数据模型

### 用户表 (users)
```
id: string (UUID)
email: string (unique)
username: string
password_hash: string
avatar_url: string? 
created_at: timestamp
updated_at: timestamp
```

### 表情包表 (memes)
```
id: string (UUID)
user_id: string (foreign key → users.id)
original_image_url: string
processed_image_url: string
final_image_url: string
text_content: string
text_position: json (x, y, font_size, color)
share_count: integer
created_at: timestamp
```

### API调用记录表 (api_logs)
```
id: string (UUID)
user_id: string?
api_type: string (replicate, openai)
request_data: json
response_data: json
duration_ms: integer
created_at: timestamp
```

## 部署方案

### 环境配置
1. **开发环境**：localhost:3000 (前端) + localhost:5000 (后端)
2. **测试环境**：Vercel Preview Deployments
3. **生产环境**：Vercel Production + Railway Production

### 环境变量
```
# 前端
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_CLOUDINARY_CLOUD_NAME=xxx

# 后端
DATABASE_URL=postgresql://...
REPLICATE_API_TOKEN=r8_...
OPENAI_API_KEY=sk-...
JWT_SECRET=your-jwt-secret
CLOUDINARY_URL=cloudinary://...
```

### 部署步骤
1. **前端部署**：`vercel deploy --prod`
2. **后端部署**：Railway自动部署Git分支
3. **数据库初始化**：Railway PostgreSQL自动创建
4. **域名配置**：Vercel自定义域名 + Railway自定义域名

## 验收标准

### 功能验收
- [ ] 用户可注册登录
- [ ] 用户可上传JPG/PNG图片（≤5MB）
- [ ] 上传后自动进行动漫化处理
- [ ] 用户可添加自定义文字
- [ ] 可查看AI文字建议
- [ ] 可下载生成的表情包（PNG格式）
- [ ] 可保存到个人历史
- [ ] 可分享到微信/微博
- [ ] 可在历史页面查看所有作品

### 性能验收
- [ ] 图片上传时间 < 3秒（10MB以内）
- [ ] AI处理时间 < 10秒
- [ ] 页面加载时间 < 2秒
- [ ] 并发用户数支持10+同时在线

### 安全验收
- [ ] 用户密码加密存储
- [ ] JWT token验证
- [ ] 图片文件类型验证
- [ ] API调用频率限制
- [ ] 敏感数据脱敏

## 风险与应对

### 技术风险
1. **AI API成本控制** - 方案：设置用户每日使用限制，监控API用量
2. **图片存储成本** - 方案：使用Cloudinary免费额度，定期清理临时文件
3. **并发处理性能** - 方案：Redis缓存处理结果，队列异步处理

### 业务风险
1. **用户内容合规** - 方案：添加图片内容审核（NSFW检测）
2. **版权问题** - 方案：用户协议明确上传图片版权责任
3. **用户留存低** - 方案：增加模板库、社区功能增强粘性

### 开发风险
1. **API服务不稳定** - 方案：添加重试机制、降级处理（基础滤镜替代）
2. **项目复杂度** - 方案：采用MVP策略，优先核心功能

## 里程碑规划

### Sprint 1 (3天)：基础框架搭建
- [ ] 项目初始化：前端React + 后端Express
- [ ] 基础页面布局：首页、登录页
- [ ] 用户认证系统
- [ ] 基础部署配置

### Sprint 2 (4天)：核心功能实现
- [ ] 图片上传组件
- [ ] Replicate API集成
- [ ] 图片预览对比
- [ ] 文字编辑组件

### Sprint 3 (3天)：用户体验完善
- [ ] Canvas图片合成
- [ ] 表情包保存功能
- [ ] 历史记录页面
- [ ] 社交分享功能

### Sprint 4 (2天)：测试与部署
- [ ] 端到端测试
- [ ] 性能优化
- [ ] 生产环境部署
- [ ] 用户测试反馈收集

## 附录

### Replicate模型选择
推荐模型：`cjwbw/anything-v4.0` 或 `stability-ai/stable-diffusion`
参数配置：动漫风格滤镜 + 人脸保持

### 字体选择
- 中文字体：思源黑体、站酷高端黑
- 英文字体：Impact、Comic Sans MS
- 颜色方案：白字黑边（最佳可读性）

### 社交分享SDK
- 微信分享：使用JSSDK（需公众号认证）
- 微博分享：使用Share API
- QQ分享：使用官方SDK
- 通用分享：生成图片 + 短链接
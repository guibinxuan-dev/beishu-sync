# 📖 背书记录 - 免费联网同步版 部署指南

## 一句话原理
数据存在**免费云数据库**里（不是存在手机或电脑本地），所以不管你用手机还是电脑，只要打开同一个网址、输入同一个密码，看到的数据就是一样的。

---

## 🆓 费用说明

| 项目 | 费用 | 说明 |
|------|------|------|
| Supabase 数据库 | **免费** | 500MB 数据库 + 每月 50 万次请求，个人用完全够 |
| Render.com 部署 | **免费** | 免费托管后端服务，给你一个公网网址 |
| 域名 | 可选 | 不买也能用（Render 会给你一个免费网址），买了就是 xxx.com 的形式 |

**总计：0 元即可上线使用**

---

## 🚀 6 步部署教程（约 15 分钟）

### Step 1: 注册 Supabase（3 分钟）

1. 打开 https://supabase.com ，点击 "Start your project"
2. 用 GitHub 账号登录（没有就注册一个，也免费）
3. 点击 "New project"
4. 填写：
   - **Name**: beishu（随便取）
   - **Database Password**: 设一个复杂的密码（记下来！）
   - **Region**: 选 Southeast Asia (Singapore) 离国内近
5. 点击 "Create new project"，等 2 分钟初始化完成

### Step 2: 创建数据表（2 分钟）

1. 进入项目后，左侧菜单点 **SQL Editor**
2. 点 "New query"
3. 粘贴以下代码：

```sql
CREATE TABLE records (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL DEFAULT 'default',
  book TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT DEFAULT '',
  status TEXT DEFAULT 'reviewing',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 关闭行级安全（个人使用，简单方便）
ALTER TABLE records DISABLE ROW LEVEL SECURITY;
```

4. 点 "Run" 执行

### Step 3: 获取 API 密钥（1 分钟）

1. 左侧导航栏 → 点 **Configuration**（设置图标）
2. 点 **API** 子菜单
3. 复制这两个值：
   - **Project URL** → 格式 `https://xxxx.supabase.co`
   - **anon public key** → 以 `eyJ` 开头的很长字符串（注意：切到 "Legacy anon, service_role API keys" 标签页获取）

### Step 4: 把代码上传到 GitHub（3 分钟）

Render 需要从 GitHub 拉代码，所以先把项目传到 GitHub：

1. 打开 https://github.com ，登录后点右上角 **+** → **New repository**
2. Repository name 填 `beishu-sync`
3. 选 **Public**（私有也行）
4. 点 **Create repository**
5. 按页面提示，把项目文件夹推送上去：
   ```bash
   cd beishu-sync
   git init
   git add .
   git commit -m "init"
   git branch -M main
   git remote add origin https://github.com/你的用户名/beishu-sync.git
   git push -u origin main
   ```

> 💡 如果不熟悉 Git 命令行，也可以用 **GitHub Desktop**（桌面客户端），界面更简单。

### Step 5: 部署到 Render（5 分钟）

1. 打开 https://render.com 注册（建议用 GitHub 账号授权登录）
2. 登录后，点右上角 **New** → **Web Service**
3. 连接 GitHub 账号，选择刚才的 `beishu-sync` 仓库
4. 配置信息：
   - **Name**: beishu-sync（随便取）
   - **Environment**: Node
   - **Region**: 选 Singapore（离国内近）
   - **Branch**: main
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. 往下滚动，找到 **Environment Variables**（环境变量），添加两个：
   - `SUPABASE_URL` = 你的 Project URL（Step 3 复制的）
   - `SUPABASE_ANON_KEY` = 你的 anon key（Step 3 复制的）
6. 往下滚动，找到 **Instance Type**，选 **Free**（免费档）
7. 点 **Create Web Service**
8. 等待 2-5 分钟，Render 会自动构建并部署
9. 部署完成后，会给你一个网址，类似 `https://beishu-sync.onrender.com`

### Step 6: 修改前端配置并重新部署（2 分钟）

1. 打开 `index.html`，找到这行：
```javascript
const API_BASE = 'http://localhost:3000/api';
```
2. 改成你的 Render 网址（**注意加 /api**）：
```javascript
const API_BASE = 'https://beishu-sync.onrender.com/api';
```
3. 保存后，推送到 GitHub：
```bash
git add .
git commit -m "update api url"
git push
```
4. Render 会**自动检测到代码更新，自动重新部署**（等 1-2 分钟）
5. 打开你的 Render 网址 → 输入默认密码 `beishu2024` → 开始使用！

---

## ✅ 完成！

现在你可以：
- 用**电脑浏览器**打开你的网址 → 输入密码 → 添加记录
- 用**手机浏览器**打开同一个网址 → 输入同一个密码 → 数据自动同步！

---

## 🔐 自定义密码

打开 `server.js`，找到：
```javascript
const GLOBAL_PASSWORD = 'beishu2024';
```
改成你自己的密码，保存后 `git push`，Render 自动重新部署即可。

---

## 🔄 以后改内容怎么办？

不管是改数据还是改代码，流程都一样：

```bash
# 1. 改完文件后
git add .
git commit -m "改了xxx"
git push
# 2. Render 自动重新部署，几十秒到1分钟就生效
# 3. 网址不变，直接刷新就能看到新内容
```


## ❓ 常见问题

**Q: Render 免费档有什么限制？**
A: 免费 Web Service 每月有 750 小时（够用一个月），**15 分钟没访问会自动休眠**，下次访问需要等几秒唤醒。个人用完全 OK。

**Q: 唤醒等待太久怎么办？**
A: 可以用免费的 UptimeRobot（https://uptimerobot.com）定时 ping 你的网址，防止休眠。

**Q: 免费档够用吗？**
A: 够。500MB 数据库能存几万条记录，个人背诵记录绰绰有余。

**Q: 数据安全吗？**
A: 数据存在 Supabase 服务器上，有密码保护，只有知道密码的人才能访问。

**Q: Render 休眠了数据会丢吗？**
A: 不会。数据存在 Supabase 数据库里，跟 Render 服务是分开的，Render 休眠/重启不影响数据。

**Q: 网址能改吗？**
A: 可以在 Render 设置里改自定义子域名（免费），或者绑定自己的域名（需购买）。

---

## 📁 项目文件说明

| 文件 | 作用 |
|------|------|
| `index.html` | 前端页面（手机电脑都能打开） |
| `server.js` | 后端服务（处理数据存取） |
| `package.json` | 项目依赖配置 |
| `README.md` | 本文件 |

/**
 * 背书记录 - 联网同步版 后端服务
 * 
 * 免费方案说明：
 * 使用 Supabase 免费档（500MB 数据库、每月 50 万次请求），完全够个人使用。
 * 
 * 你需要做的（5分钟）：
 * 1. 打开 https://supabase.com 注册（可用 GitHub 账号）
 * 2. 新建一个项目（Database Password 随便设一个复杂的）
 * 3. 进入项目 → SQL Editor → 粘贴下面的建表语句执行：
 * 
 *    CREATE TABLE records (
 *      id BIGSERIAL PRIMARY KEY,
 *      user_id TEXT NOT NULL,
 *      book TEXT NOT NULL,
 *      title TEXT NOT NULL,
 *      content TEXT DEFAULT '',
 *      status TEXT DEFAULT 'reviewing',
 *      created_at TIMESTAMPTZ DEFAULT NOW()
 *    );
 * 
 * 4. 进入项目 → Settings → API，复制 Project URL 和 anon public key
 * 5. 把它们填到下面 supabaseUrl 和 supabaseKey 的位置
 * 6. 部署到免费平台（Vercel / Render），即可获得一个公网网址
 * 
 * 手机和电脑打开同一个网址，登录同一个账号，数据自动同步！
 */

const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

// ⚠️ 你需要替换这两个值（从 Supabase 控制台获取）
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';

const supabase = createClient(supabaseUrl, supabaseKey);

// 简单密码登录（适合个人使用，无需邮箱验证）
// 用一个全局密码即可，所有设备输入同一个密码就是同一个人
const GLOBAL_PASSWORD = 'beishu2024'; // 你可以改成自己的

// 登录验证
app.post('/api/login', (req, res) => {
  const { password } = req.body;
  if (password === GLOBAL_PASSWORD) {
    // 生成一个简单的 token（用固定值即可，个人使用足够安全）
    res.json({ token: 'beishu_token_' + Buffer.from(password).toString('base64'), success: true });
  } else {
    res.status(401).json({ success: false, message: '密码错误' });
  }
});

// 中间件：验证 token
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  const expected = 'beishu_token_' + Buffer.from(GLOBAL_PASSWORD).toString('base64');
  if (token === expected) {
    next();
  } else {
    res.status(401).json({ success: false, message: '未授权' });
  }
}

// 获取所有记录
app.get('/api/records', authMiddleware, async (req, res) => {
  const { data, error } = await supabase
    .from('records')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) return res.status(500).json({ error: error.message });
  res.json(data || []);
});

// 添加记录
app.post('/api/records', authMiddleware, async (req, res) => {
  const { book, title, content, status } = req.body;
  const { data, error } = await supabase
    .from('records')
    .insert([{ book, title, content: content || '', status: status || 'reviewing' }])
    .select();
  
  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

// 更新记录
app.put('/api/records/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { book, title, content, status } = req.body;
  const { data, error } = await supabase
    .from('records')
    .update({ book, title, content, status })
    .eq('id', id)
    .select();
  
  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

// 删除记录
app.delete('/api/records/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase
    .from('records')
    .delete()
    .eq('id', id);
  
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 背书记录服务已启动: http://localhost:${PORT}`);
});

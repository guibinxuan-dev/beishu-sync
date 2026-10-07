# 📤 把代码传到 GitHub —— 超详细图文教程

## 一句话说明

Render 需要从 GitHub 拉代码才能部署，所以你要先把 `beishu-sync` 文件夹里的代码传到 GitHub 上。整个流程：新建仓库 → 安装 Git → 推送代码 → 完成。

---

## Step 1: 在 GitHub 上新建仓库（2 分钟）

1. 打开 https://github.com ，确保已登录
2. 点右上角头像旁边的 **+** → **New repository**

   ![New repository](placeholder)

3. 填写信息（照着填）：
   - **Repository name**（仓库名）：`beishu-sync`
   - **Description**（描述）：不用填
   - 选 **Public**（或者 Private 也行）
   - ⚠️ **重要**：下面三个勾选项 **全部不要勾**：
     - ❌ 不勾 "Add a README file"
     - ❌ 不勾 "Add .gitignore"
     - ❌ 不勾 "Choose a license"
   - 页面看起来是这样的：

   | 选项 | 填什么 |
   |------|--------|
   | Repository name | `beishu-sync` |
   | Public / Private | Public |
   | Add a README | ❌ 不勾 |
   | Add .gitignore | ❌ 不勾 |
   | Choose a license | ❌ 不勾 |

4. 点 **Create repository**（创建仓库）
5. 创建后会跳到一个新页面，**这个页面先别关**，等会儿要回来复制命令

---

## Step 2: 下载并安装 Git（3 分钟）

> 如果已经装了 Git，跳过这一步。验证方法：右键文件夹空白处，看有没有 "Git Bash Here" 或 "在终端中打开"。

1. 打开 https://git-scm.com/downloads
2. 点 **Windows** 下载（如果你用 Mac 就选 Mac）
3. 下载完双击安装，**一路点 Next**，所有选项保持默认即可
4. 安装完，**关掉所有命令行窗口**，重新打开一个（让 Git 生效）

---

## Step 3: 用 Git 推送代码（3 分钟）

### 3.1 打开命令行

找到你的 `beishu-sync` 文件夹（就是有 `index.html`、`server.js` 那个文件夹），然后：

- **Windows**：在文件夹空白处，**按住 Shift 键 + 右键** → 点 **"在终端中打开"** 或 **"在此处打开 PowerShell 窗口"**
- **Mac**：打开终端，用 `cd` 命令进入那个文件夹，比如：
  ```bash
  cd ~/Downloads/beishu-sync
  ```

### 3.2 依次输入以下命令

**一行一行输入，每行输完按回车。** 遇到要输入用户名密码的地方，按提示操作。

```bash
git init
```
> 回车后显示 "Initialized empty Git repository" 就对了

```bash
git add .
```
> 回车后没什么提示是正常的

```bash
git commit -m "first commit"
```
> 回车后会出现一堆绿色文字，表示文件已添加

```bash
git branch -M main
```
> 回车后没提示是正常的

```bash
git remote add origin https://github.com/你的用户名/beishu-sync.git
```
> ⚠️ **把"你的用户名"替换成你 GitHub 的用户名！**
> 比如你的 GitHub 用户名是 `zhangsan`，就写：
> `git remote add origin https://github.com/zhangsan/beishu-sync.git`

```bash
git push -u origin main
```
> 回车后可能会弹出 GitHub 登录窗口 → 登录授权
> 或者用浏览器打开一个授权链接 → 复制验证码粘贴回命令行
> 看到 "100%" 和 "done" 就成功了

---

## Step 4: 验证是否成功（30 秒）

1. 打开浏览器，访问：
   ```
   https://github.com/你的用户名/beishu-sync
   ```
2. 如果能看到 `index.html`、`server.js`、`package.json` 这几个文件，说明**成功了！** ✅

---

## Step 5: 回到 Render 继续部署

现在 GitHub 上有仓库了，回到 Render：

1. 刷新 Render 的部署页面
2. 点 **Connect a repository** 或 **GitHub** → 授权连接
3. 在列表里找到 `beishu-sync` → 选中 → **Connect**
4. 然后按部署指南的 Step 5 继续往下走（配置环境变量等）

---

## ❓ 常见问题

### Q: `git push` 的时候提示输入用户名密码，输什么？
A: 用户名就是你 GitHub 的用户名。密码不是登录密码，需要去 GitHub → Settings → Developer settings → Personal access tokens 生成一个 token。但**更简单的方法**是：用 GitHub Desktop 客户端，登录一次就行。

### Q: 提示 "fatal: not a git repository"？
A: 说明命令行不在项目文件夹里。用 `cd` 命令进入 `beishu-sync` 文件夹再试。

### Q: 文件没显示 / 只有 README？
A: 说明你创建仓库时勾了 README，或者 push 失败了。删掉仓库重新建一个（这次什么都别勾），重新 push。

### Q: 觉得命令行太麻烦，有没有更简单的？
A: 有！下载 **GitHub Desktop**（https://desktop.github.com），安装后用 GitHub 登录，点 **Add** → **Create New Repository**，把文件夹拖进去，点 **Publish repository** 一键上传。全程点点鼠标，不用敲命令。

---

## 🎯 总结

```
1. GitHub 上新建仓库 beishu-sync（什么都别勾）
2. 安装 Git
3. 在 beishu-sync 文件夹里打开命令行
4. 输入 6 行命令（把用户名替换成你自己的）
5. 刷新 GitHub 页面确认文件已上传
6. 回到 Render 继续部署
```

搞定之后截图给我看，我帮你确认下一步 👇

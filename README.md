# Cognitive Guardrails

`cognitive-guardrails` 现在是一个双 skill 仓库，提供两个可独立安装的 AI 工作护栏：

- `instruction-intake-guardrails`：收到指令之后、开始执行前触发，用于理解任务、执行第一性原理检查、确认授权边界、识别目标漂移、风险和阻塞项。
- `final-response-guardrails`：完成工作之后、最终回复前触发，用于复核交付声明、验证证据、未完成项、阻塞项和过度承诺。

根目录 `SKILL.md` 只保留为兼容入口和迁移说明。新的安装单元在 `skills/<slug>/SKILL.md`。

英文说明见 [README.en.md](README.en.md)。

## 用途

这两个 skill 用来把一个原本混合的“思考/交付复核”流程拆成两个明确阶段：

- 执行前：先回到用户真正目标，用第一性原理拆掉默认做法和惯性路径，只保留必须成立的事实、约束和授权边界，再确认哪些动作需要再次确认，是否存在删除、推送、外发、权限变更、凭据、生产环境或用户数据风险。
- 回复前：再确认实际完成了什么、验证了什么、哪些没有完成、哪些被阻塞，以及最终回复是否暗示了未发生的部署、监控、发布或保证。

它们没有运行时网络依赖，不需要凭据，也不会替代用户授权或平台安全策略。

## 安装

### 通用本地安装

把仓库克隆到本机：

```bash
git clone https://github.com/vaynebobby-crypto/cognitive-guardrails.git
cd cognitive-guardrails
```

安装时应指向两个独立目录：

```text
skills/instruction-intake-guardrails/
skills/final-response-guardrails/
```

不要把根目录 `SKILL.md` 当成唯一新版本 skill 安装；它只是兼容入口。

### Claude Code

Claude Code 没有一个对所有环境统一的官方 marketplace 安装命令。本仓库提供适配清单：

- [marketplaces/claude-code/manifest.json](marketplaces/claude-code/manifest.json)
- [marketplaces/claude-code/README.md](marketplaces/claude-code/README.md)

如果你的 Claude Code 环境使用本地 skills 目录，可复制或软链接两个 skill 目录，例如：

```bash
mkdir -p ~/.claude/skills
ln -s "$(pwd)/skills/instruction-intake-guardrails" ~/.claude/skills/instruction-intake-guardrails
ln -s "$(pwd)/skills/final-response-guardrails" ~/.claude/skills/final-response-guardrails
```

如果你的环境通过项目级指令或提示库管理 skill，请把两个 `SKILL.md` 分别注册为独立条目，并保留 `references/prompt-templates.md` 作为可复制模板。

### Codex

Codex 的本地 skill 目录取决于 `CODEX_HOME` 或具体客户端配置。本仓库提供适配清单：

- [marketplaces/codex/manifest.json](marketplaces/codex/manifest.json)
- [marketplaces/codex/README.md](marketplaces/codex/README.md)

常见本地安装方式：

```bash
mkdir -p "${CODEX_HOME:-$HOME/.codex}/skills"
ln -s "$(pwd)/skills/instruction-intake-guardrails" "${CODEX_HOME:-$HOME/.codex}/skills/instruction-intake-guardrails"
ln -s "$(pwd)/skills/final-response-guardrails" "${CODEX_HOME:-$HOME/.codex}/skills/final-response-guardrails"
```

如果客户端不会自动发现新 skill，请重启或重新加载客户端。

### OpenClaw / 其他客户端

[openclaw.json](openclaw.json) 描述两个独立 skill 的路径和元数据。若客户端支持从 manifest 读取多个 skill，可读取该文件；若不支持，请按目录手动安装两个 `skills/<slug>`。

不要在文档中假设某个客户端存在统一 marketplace 命令。发布到真实外部 marketplace 前，需要先确认目标客户端的当前发布流程。

## 使用方式

执行前显式调用：

```text
Use instruction-intake-guardrails before starting this refactor.
```

回复前显式调用：

```text
Use final-response-guardrails before the final answer.
```

也可以让代理按阶段自动触发：

- 开始执行前：任务有歧义、可能越权、可能破坏或外发、依赖假设、存在阻塞项。
- 最终回复前：要声明完成、报告测试、给出 commit/hash/链接、说明未完成项或风险。

更多模板见 [references/prompt-templates.md](references/prompt-templates.md)。

## 目录结构

```text
cognitive-guardrails/
├── SKILL.md
├── README.md
├── README.en.md
├── openclaw.json
├── meta.json
├── skills/
│   ├── instruction-intake-guardrails/
│   │   └── SKILL.md
│   └── final-response-guardrails/
│       └── SKILL.md
├── marketplaces/
│   ├── claude-code/
│   │   ├── README.md
│   │   └── manifest.json
│   └── codex/
│       ├── README.md
│       └── manifest.json
├── references/
│   └── prompt-templates.md
├── scripts/
│   └── check-skill.cjs
└── LICENSE
```

## 验证

运行仓库自带结构校验：

```bash
node scripts/check-skill.cjs
```

校验内容包括：

- 两个独立 `SKILL.md` 存在。
- frontmatter 包含正确的 `name` 和带引号的 `description`。
- 根目录 README 以中文为主，并包含安装、使用、目录结构、验证、发布说明。
- Claude Code 和 Codex 的适配 manifest/README 存在。
- `openclaw.json`、`meta.json` 可解析并列出两个 skill。

## 发布

发布 GitHub 前：

1. 更新两个 skill 内容和共享模板。
2. 运行 `node scripts/check-skill.cjs`。
3. 确认 `git status --short` 只包含本次预期改动。
4. 正常 `git commit`，不要强推。
5. `git push origin main`。

发布到 Claude Code、Codex 或其他真实外部 marketplace 前，先确认该客户端当前支持的格式、审核流程和命令。本仓库只提供本地适配 manifest 与目录结构，不虚构官方 marketplace 命令。

## 安全

这两个 skill 的目的都是让代理更保守地处理授权、证据和交付声明。它们不能用于绕过审批、删除保护、安全策略、凭据限制或用户授权边界。

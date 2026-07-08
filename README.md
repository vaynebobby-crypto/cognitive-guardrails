# Cognitive Guardrails

`cognitive-guardrails` 是一组 cognitive guardrails skills，用来把 AI 代理在执行前和交付前最容易滑过的判断显式化：从第一性原理出发、做对抗性审查、说明最没有把握的事情、检查最大的遗漏和未意识到的事情。

这不是单个大 skill，而是一组可独立安装、可独立触发的技能。根目录不放置 `SKILL.md`，避免被客户端误识别为一个臃肿的单体 skill；安装单元只在 `skills/<slug>/SKILL.md`，同时提供 `.openclaw/skills/<slug>/SKILL.md` 兼容路径。

英文说明见 [README.en.md](README.en.md)。

## 用途

这组 skill 提炼自四个护栏点：

- `first-principles-prompt`：提示词/执行前触发，要求从第一性原理出发，拆掉惯性做法，只保留真实目标、事实、约束、授权边界和验证标准。
- `adversarial-prompt-review`：提示词/执行前或执行中触发，对当前理解、计划、假设、权限、证据和失败模式做对抗性审查。
- `uncertainty-check`：执行后/交付前触发，回答“眼下你最没有把握的事情是什么”，避免把未验证内容写成确定结论。
- `omission-check`：执行后/交付前触发，回答“最大的遗漏和没有意识到的事情是什么”，发现漏项、盲点和未说明的后果。

为兼容旧配置，仓库仍保留两个聚合入口：

- `instruction-intake-guardrails`：执行前聚合入口，覆盖 `first-principles-prompt` 和 `adversarial-prompt-review`。
- `final-response-guardrails`：交付前聚合入口，覆盖 `uncertainty-check` 和 `omission-check`。

所有 skill 都没有运行时网络依赖，不需要凭据，也不会替代用户授权、平台权限或安全策略。

## 安装

### 通用本地安装

克隆仓库：

```bash
git clone https://github.com/vaynebobby-crypto/cognitive-guardrails.git
cd cognitive-guardrails
```

推荐安装四个核心 skill：

```text
skills/first-principles-prompt/
skills/adversarial-prompt-review/
skills/uncertainty-check/
skills/omission-check/
```

如果你的客户端已有旧触发配置，也可以继续安装两个兼容聚合入口：

```text
skills/instruction-intake-guardrails/
skills/final-response-guardrails/
```

OpenClaw 或需要兼容路径的客户端也可以读取：

```text
.openclaw/skills/<slug>/SKILL.md
```

该兼容目录使用真实文件，不依赖跨平台表现不一致的 symlink。

### Claude Code

本仓库提供 Claude Code 适配说明和清单：

- [marketplaces/claude-code/manifest.json](marketplaces/claude-code/manifest.json)
- [marketplaces/claude-code/README.md](marketplaces/claude-code/README.md)

常见本地安装方式：

```bash
mkdir -p ~/.claude/skills
ln -s "$(pwd)/skills/first-principles-prompt" ~/.claude/skills/first-principles-prompt
ln -s "$(pwd)/skills/adversarial-prompt-review" ~/.claude/skills/adversarial-prompt-review
ln -s "$(pwd)/skills/uncertainty-check" ~/.claude/skills/uncertainty-check
ln -s "$(pwd)/skills/omission-check" ~/.claude/skills/omission-check
```

如果你的环境通过项目级指令或提示库管理 skill，请把四个核心 `SKILL.md` 分别注册为独立条目。需要兼容旧自动触发时，再注册两个聚合入口。

### Codex

本仓库提供 Codex 适配说明和清单：

- [marketplaces/codex/manifest.json](marketplaces/codex/manifest.json)
- [marketplaces/codex/README.md](marketplaces/codex/README.md)

常见本地安装方式：

```bash
mkdir -p "${CODEX_HOME:-$HOME/.codex}/skills"
ln -s "$(pwd)/skills/first-principles-prompt" "${CODEX_HOME:-$HOME/.codex}/skills/first-principles-prompt"
ln -s "$(pwd)/skills/adversarial-prompt-review" "${CODEX_HOME:-$HOME/.codex}/skills/adversarial-prompt-review"
ln -s "$(pwd)/skills/uncertainty-check" "${CODEX_HOME:-$HOME/.codex}/skills/uncertainty-check"
ln -s "$(pwd)/skills/omission-check" "${CODEX_HOME:-$HOME/.codex}/skills/omission-check"
```

如果客户端不会自动发现新 skill，请重启或重新加载客户端。

### OpenClaw / 其他客户端

[openclaw.json](openclaw.json) 描述 skill 组路径和元数据。若客户端支持读取多 skill manifest，可读取该文件；若客户端按目录扫描，可使用 `skills/<slug>` 或 `.openclaw/skills/<slug>`。

不要在文档中假设某个客户端存在统一 marketplace 命令。发布到真实外部 marketplace 前，需要先确认目标客户端当前支持的格式、审核流程和命令。

## 使用方式

执行前显式调用：

```text
Use first-principles-prompt before choosing an implementation path.
Use adversarial-prompt-review before executing the plan.
```

交付前显式调用：

```text
Use uncertainty-check before the final answer.
Use omission-check before the final answer.
```

兼容旧配置时也可以调用：

```text
Use instruction-intake-guardrails before starting.
Use final-response-guardrails before the final answer.
```

更多模板见 [references/prompt-templates.md](references/prompt-templates.md)。

## 目录结构

```text
cognitive-guardrails/
├── README.md
├── README.en.md
├── openclaw.json
├── meta.json
├── skills/
│   ├── first-principles-prompt/
│   │   └── SKILL.md
│   ├── adversarial-prompt-review/
│   │   └── SKILL.md
│   ├── uncertainty-check/
│   │   └── SKILL.md
│   ├── omission-check/
│   │   └── SKILL.md
│   ├── instruction-intake-guardrails/
│   │   └── SKILL.md
│   └── final-response-guardrails/
│       └── SKILL.md
├── .openclaw/
│   └── skills/
│       └── <slug>/SKILL.md
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
git diff --check
```

校验内容包括：

- 至少四个核心 skill 存在。
- 每个 `SKILL.md` frontmatter 包含 `name` 和带引号的 `description`，且不含无必要的 `argument-hint`。
- README 中文为主，并列出 skill 组、安装、使用、目录结构、验证和发布说明。
- README 和仓库文本不得出现内部参考仓库名。
- `.openclaw/skills/<slug>/SKILL.md` 兼容路径存在，并与 `skills/<slug>/SKILL.md` 内容一致。
- `openclaw.json`、`meta.json`、Claude Code manifest、Codex manifest 可解析并列出 skill 组。

## 发布

发布 GitHub 前：

1. 更新相关 skill 内容、manifest 和 README。
2. 运行 `node scripts/check-skill.cjs`。
3. 运行 `git diff --check`。
4. 确认 `git status --short` 只包含本次预期改动。
5. 正常 `git commit`，不要强推。
6. `git push origin main`。

发布到 Claude Code、Codex、OpenClaw 或其他真实外部 marketplace 前，先确认该客户端当前支持的格式、审核流程和命令。本仓库只提供本地适配 manifest 与目录结构，不虚构官方 marketplace 命令。

## 安全

这组 skill 的目的都是让代理更保守地处理目标、授权、证据、遗漏和交付声明。它们不能用于绕过审批、删除保护、安全策略、凭据限制或用户授权边界。

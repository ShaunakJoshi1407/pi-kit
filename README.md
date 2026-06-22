# pi-kit

Minimal pi extensions, skills, and themes for daily use. Extracted from [cheasee-pi](https://github.com/SchneiderDaniel/cheasee-pi).

## What's included

### Extensions

| Extension | What it does |
|-----------|-------------|
| **AgentHarness** | Runtime tool call guardrails — blocks `bash cat/grep/sed`, retry loops, cascade failures, redundant reads |
| **Caveman** | Compresses agent output — strips articles, filler, pleasantries (~30-50% token savings). Toggle via `/caveman` |
| **Session Advice** | Analyzes completed sessions for waste patterns, injects improvement lessons into future prompts |
| **Custom Footer** | Rich TUI footer showing token usage, model, thinking level, context %, and git branch |

### Skills

| Skill | What it does |
|-------|-------------|
| **write-a-skill** | Create new agent skills with proper structure and progressive disclosure |

### Themes

All 10 themes: catppuccin-mocha, dracula, gruvbox, nano, nebula-pulse, nord, one-dark-pro, opencode, rose-pine, synthwave-84, tokyo-night

## Install

```bash
pi install git:github.com/<your-username>/pi-kit
/reload
```

## Verify

```bash
pi list
```

## Uninstall

```bash
pi remove git:github.com/<your-username>/pi-kit
```

---
title: "Local LLM with Ollama"
date: 2026-10-31
tags: ["llm", "ollama", "qwen", "ai"]
categories: ["software", "applications", "tools", "ai"]
description: "Local LLM with Ollama"
draft: false
hero_images:
  - src: "https://ollama.com/public/ollama.png"
    alt: "ollama"
    width: "40"
    height: "40"
---

Run an LLM locally on Linux with [Ollama](https://ollama.com). Everything runs on your machine: once the model is downloaded, nothing leaves it.

{{< toc >}}

## Deployment

```shell
$ curl -fsSL https://ollama.com/install.sh | sh
```

The installer sets up `ollama` as a systemd service and uses an NVIDIA GPU automatically if one is present (no CUDA toolkit needed).

## Models

- Ollama library: https://ollama.com/library, run them by name (e.g. `qwen3.5:4b`)
- Hugging Face: https://huggingface.co/models (Qwen: https://huggingface.co/Qwen). Ollama runs them directly only in GGUF format:

```shell
$ ollama run hf.co/<user>/<repo>
```

With 6 GB of VRAM, models up to ~8B (Q4) fit fully on the GPU. Bigger models such as `qwen3.6:35b` still run, split between GPU and RAM (slower).

The Ollama library only sorts by popularity or date, not quality. To compare models:

- LMArena: https://arena.ai/leaderboard, ranked by people's votes
- Artificial Analysis: https://artificialanalysis.ai/, benchmarks with an open weights filter and model sizes

Then check the model's size on `https://ollama.com/library/<model>/tags` to see if it fits your GPU.

### Qwen3.5:4B

```shell
$ ollama run qwen3.5:4b
```

The first run downloads the model (~3.3 GB). Exit with `/bye` or `Ctrl+D`, and run the same command again to start a new chat.

Qwen3.5 "thinks" before answering. For quick replies start it with `--think=false`, or type `/set nothink` inside the chat:

```shell
$ ollama run qwen3.5:4b --think=false
```

Check where it is running:

```shell
$ ollama ps        # PROCESSOR column, e.g. "100% GPU"
NAME          ID              SIZE      PROCESSOR    CONTEXT    RUNNER      UNTIL
qwen3.5:4b    d8b0f5e9760c    3.1 GB    100% GPU     4096       llamacpp    4 minutes from now

$ ollama list      # models on disk
NAME          ID              SIZE      MODIFIED
qwen3.5:4b    d8b0f5e9760c    3.3 GB    26 seconds ago
```

Example with the GPU idle (no model loaded), only `gnome-shell` on it:

```shell
$ nvidia-smi
Sat Oct 31 00:21:13 2026
+-----------------------------------------------------------------------------------------+
| NVIDIA-SMI 580.178.04             Driver Version: 580.178.04     CUDA Version: 13.0     |
+-----------------------------------------+------------------------+----------------------+
| GPU  Name                 Persistence-M | Bus-Id          Disp.A | Volatile Uncorr. ECC |
| Fan  Temp   Perf          Pwr:Usage/Cap |           Memory-Usage | GPU-Util  Compute M. |
|                                         |                        |               MIG M. |
|=========================================+========================+======================|
|   0  NVIDIA RTX PRO 500 Black...    Off |   00000000:01:00.0 Off |                  N/A |
| N/A   35C    P4             10W /   60W |      11MiB /   6113MiB |      0%      Default |
|                                         |                        |                  N/A |
+-----------------------------------------+------------------------+----------------------+

+-----------------------------------------------------------------------------------------+
| Processes:                                                                              |
|  GPU   GI   CI              PID   Type   Process name                        GPU Memory |
|        ID   ID                                                               Usage      |
|=========================================================================================|
|    0   N/A  N/A           23922      G   /usr/bin/gnome-shell                      1MiB |
+-----------------------------------------------------------------------------------------+
```

With `qwen3.5:4b` loaded, `llama-server` shows up in `Processes` with the model's VRAM:

```shell
$ nvidia-smi
Sat Oct 31 00:48:53 2026
+-----------------------------------------------------------------------------------------+
| NVIDIA-SMI 580.178.04             Driver Version: 580.178.04     CUDA Version: 13.0     |
+-----------------------------------------+------------------------+----------------------+
| GPU  Name                 Persistence-M | Bus-Id          Disp.A | Volatile Uncorr. ECC |
| Fan  Temp   Perf          Pwr:Usage/Cap |           Memory-Usage | GPU-Util  Compute M. |
|                                         |                        |               MIG M. |
|=========================================+========================+======================|
|   0  NVIDIA RTX PRO 500 Black...    Off |   00000000:01:00.0 Off |                  N/A |
| N/A   39C    P8              3W /   50W |    3747MiB /   6113MiB |      0%      Default |
|                                         |                        |                  N/A |
+-----------------------------------------+------------------------+----------------------+

+-----------------------------------------------------------------------------------------+
| Processes:                                                                              |
|  GPU   GI   CI              PID   Type   Process name                        GPU Memory |
|        ID   ID                                                               Usage      |
|=========================================================================================|
|    0   N/A  N/A           23922      G   /usr/bin/gnome-shell                      1MiB |
|    0   N/A  N/A         1330762      C   ...local/lib/ollama/llama-server       3728MiB |
+-----------------------------------------------------------------------------------------+
```

Remove a model you no longer need:

```shell
$ ollama rm qwen3:4b
deleted 'qwen3:4b'
```

Don't trust what the model says about itself (e.g. "I run in the cloud"): it can't see your system, `ollama ps` can.

## Sessions and history

Each `ollama run` starts from scratch: the model doesn't remember previous chats.

Save and restore a chat from inside a session:

```shell
>>> /save my-chat
>>> /load my-chat
```

or reopen it directly:

```shell
$ ollama run my-chat
```

`~/.ollama/history` only keeps the lines you typed (up/down arrows in the prompt), not the model's answers, and the model never sees it.

For a chat history UI like ChatGPT's, put [Open WebUI](https://openwebui.com) in front of Ollama: it runs locally in the browser, keeps your chats on your own disk and talks to Ollama.

## Open WebUI

Ollama only listens on `127.0.0.1:11434`, so run Open WebUI with the host network and keep it local too (`HOST`/`PORT`):

```shell
$ docker run -d --name open-webui --restart unless-stopped \
    --network=host \
    -e OLLAMA_BASE_URL=http://127.0.0.1:11434 \
    -e HOST=127.0.0.1 -e PORT=3000 \
    -v open-webui:/app/backend/data \
    ghcr.io/open-webui/open-webui:0.12.5
```

Open <http://localhost:3000> and create the first (admin) account, stored only on your machine. Models from `ollama list` show up in the model picker.

Chats and settings live in the `open-webui` Docker volume, so they survive restarts and upgrades:

```shell
$ docker logs -f open-webui     # first start takes a minute or two
$ docker stop open-webui
$ docker start open-webui
$ docker rm -f open-webui       # upgrade: remove, then run again with the new tag
```

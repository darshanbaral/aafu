---
title: "PIP Upgrade Packages"
date: 2025-11-05
tags: ["python", "pip", "packages", "cli"]
categories: ["software", "applications", "tools"]
description: "PIP Upgrade Packages"
draft: false
hero_images:
  - src: "https://upload.wikimedia.org/wikipedia/commons/6/64/PyPI_logo.svg"
    alt: "pip"
    width: "200"
    height: "150"
---

**pip** is the package installer for Python. It has no command to upgrade every package at once, so the one-liner below lists the outdated packages as JSON, extracts their names with `jq` and upgrades them one by one. On recent distributions the system Python is marked as externally managed (PEP 668), hence `--break-system-packages`; inside a virtual environment that flag is not needed.

Update outdated pip packages:

```shell
$ pip list --outdated --format=json | jq -r '.[].name' | xargs -n1 pip install -U --break-system-packages
```

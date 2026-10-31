---
title: "Dotfiles"
date: 2025-11-19
tags: ["dotfiles", "configurations", "shell"]
categories: ["software", "applications", "tools"]
description: "Dotfiles"
draft: false
hero_images:
  - src: "https://miro.medium.com/v2/resize:fit:1400/1*_Vl2vhvWMUSctKZmxFACDw.png"
    alt: "dotfiles"
    width: "400"
    height: "200"
---

**Dotfiles**.

```shell
$ grep -v "^#" .config/ghostty/config
font-size = 13
theme = "Adwaita Dark"
palette = 01=#e66142
palette = 15=#BBBBBB
palette = 07=#BBBBBB
keybind = unconsumed:alt+up=goto_split:top
keybind = unconsumed:alt+down=goto_split:bottom
keybind = unconsumed:alt+left=goto_split:left
keybind = unconsumed:alt+right=goto_split:right

$ tail -n2 .ssh/config
Host *
    SetEnv TERM=xterm-256color
```

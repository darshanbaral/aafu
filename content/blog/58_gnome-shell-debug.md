---
title: "GNOME Shell Debugging"
date: 2026-04-17
tags: ["gnome", "gnome-shell", "debugging"]
categories: ["software", "applications", "tools", "gnome", "gnome-shell", "extensions"]
description: "GNOME Shell Debugging"
draft: false
hero_images:
  - src: "https://upload.wikimedia.org/wikipedia/commons/3/39/Gnomelogo-footprint.svg"
    alt: "gnome-shell"
    width: "40"
    height: "40"
---

<p>
  <img src="https://gitlab.gnome.org/uploads/-/system/project/avatar/546/gnomeshell.png?width=96" alt="gnome-shell" style="display:inline-block;vertical-align:middle;width:48px;height:48px;"/> <strong>GNOME Shell Debugging</strong>
</p>

```shell
$ sudo journalctl -f /usr/bin/gnome-shell
```

and

`Alt-F2` + `lg` -> `Extensions` choose extensions and `Show Errors`.

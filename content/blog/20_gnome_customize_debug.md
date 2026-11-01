---
title: "Customize and Debug GNOME"
date: 2024-04-15
lastmod: 2026-11-01
tags: ["gnome", "gnome-shell", "nautilus", "gtk", "theme", "file-manager", "custom-icon", "debugging"]
categories: ["linux", "software", "applications", "tools"]
description: "Customize and Debug GNOME"
draft: false
---

Tweaks for Nautilus and the GTK theme, and how to debug GNOME Shell.

{{< toc >}}

## Nautilus Custom Icon

{{< img src="https://upload.wikimedia.org/wikipedia/commons/6/65/GNOME_Files_icon_2019.svg" alt="nautilus" width="100" height="100" >}}

Custom Icons in Nautilus is not allowed anymore since version 46. It  works for directories from UI only. Thus it is required to set a custom icon through command-line:

https://discourse.gnome.org/t/survey-custom-file-thumbnail-usage/18241

```shell
$ gio set $HOME/AppImage/BLAH.AppImage metadata::custom-icon file://$HOME/Pictures/BLAH.png

delete:
$ gio set -t string BLAH.AppImage metadata::custom-icon-name -d
```

## GTK Dark Theme

{{< img src="https://www.gtk.org/assets/img/logo-gtk-sm.png" alt="gtk" width="100" height="100" >}}

Set dark theme for nautilus.

Run `dconf-editor` and set `org.gnome.desktop.interface.color-scheme` to `prefer-dark` &rarr; Apply.

## GNOME Shell Debugging

{{< img src="https://gitlab.gnome.org/uploads/-/system/project/avatar/546/gnomeshell.png?width=96" alt="gnome-shell" width="96" height="96" >}}

```shell
$ sudo journalctl -f /usr/bin/gnome-shell
```

and

`Alt-F2` + `lg` -> `Extensions` choose extensions and `Show Errors`.

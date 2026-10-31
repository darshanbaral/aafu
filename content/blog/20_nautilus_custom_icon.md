---
title: "Nautilus Custom Icon File"
date: 2024-04-15
tags: ["gnome", "nautilus", "file-manager", "custom-icon"]
categories: ["linux", "software", "applications", "tools"]
description: "Nautilus Custom Icon File"
draft: false
hero_images:
  - src: "https://upload.wikimedia.org/wikipedia/commons/6/65/GNOME_Files_icon_2019.svg"
    alt: "Nautilus-custom-icon"
    width: "90"
    height: "90"
---

Custom Icons in Nautilus is not allowed anymore since version 46. It  works for directories from UI only. Thus it is required to set a custom icon through command-line:

https://discourse.gnome.org/t/survey-custom-file-thumbnail-usage/18241

```shell
$ gio set $HOME/AppImage/BLAH.AppImage metadata::custom-icon file://$HOME/Pictures/BLAH.png

delete:
$ gio set -t string BLAH.AppImage metadata::custom-icon-name -d
```

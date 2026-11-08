---
title: "Applications"
date: 2024-02-20
lastmod: 2026-11-08
tags: ["applications", "backup", "sync", "storage", "diff", "compare", "git", "k8s", "kubernetes", "ide", "homeassistant", "home-automation", "selfhosted", "monitoring", "system-info", "netdata", "nextcloud", "cloud", "security", "deleted-files", "recover", "remote", "touchpad", "smartphone", "renovatebot", "updates", "dependencies", "automation", "cli", "webcheck", "osint", "restic", "garage", "s3", "object-storage"]
categories: ["linux", "software", "applications", "tools", "backup"]
description: "Applications"
draft: false
---

A collection of applications and tools I use/recommend.

{{< toc >}}

## Backups

### FreeFileSync

{{< img src="https://freefilesync.org/images/FreeFileSync.png" alt="freefilesync" width="100" height="100" >}}

**FreeFileSync** is a folder comparison and synchronization software that creates and manages backup copies of all your important files. Instead of copying every file every time, FreeFileSync determines the differences between a source and a target folder and transfers only the minimum amount of data needed. FreeFileSync is Open Source software, available for Windows, macOS, and Linux.

https://freefilesync.org

### Garage

{{< img src="https://garagehq.deuxfleurs.fr/images/garage-logo.svg" alt="garage" width="100" height="100" >}}

**Garage** is an open-source distributed object storage service tailored for self-hosting. It is S3-compatible, lightweight, and designed to run on modest hardware spread across multiple locations, which makes it a good target for backups.

https://garagehq.deuxfleurs.fr

https://git.deuxfleurs.fr/Deuxfleurs/garage

### Restic

{{< img src="https://raw.githubusercontent.com/restic/restic/c734245fd3ae9bcac8ab3aaafb4482d4b5d0ae92/doc/logo/logo.png" alt="restic" width="100" height="100" >}}

**restic** is a fast, secure and efficient backup program. It encrypts and deduplicates your data and supports many storage backends, such as local disks, SFTP and S3-compatible object storage (Garage included).

https://restic.net

https://github.com/restic/restic

## HomeAssistant

{{< img src="https://brands.home-assistant.io/homeassistant/logo.png" alt="homeassistant" width="300" height="42" >}}

**HomeAssistant** Open source home automation that puts local control and privacy first.

https://www.home-assistant.io

https://github.com/home-assistant

## Lens

### FreeLens

{{< img src="https://freelensapp.github.io/images/freelens-logo.png" alt="freelens" width="100" height="100" >}}

**FreeLens** Free IDE for Kubernetes.

https://freelensapp.github.io

https://github.com/freelensapp/freelens

### Lens

{{< img src="https://cdn.sanity.io/images/67awagrd/production/e345de5fb756590c2c60ef75413579b82cc718b2-1792x1024.png" alt="lens" width="200" height="114" >}}

**Lens** The Way The World Runs Kubernetes.

https://k8slens.dev

https://github.com/lensapp/lens

## Meld

{{< img src="https://dl.flathub.org/repo/appstream/x86_64/icons/128x128/org.gnome.meld.png" alt="meld" width="100" height="100" >}}

**Meld** helps you compare files, directories, and version controlled projects. It provides two- and three-way comparison of both files and directories, and has support for many popular version control systems.

**Meld** helps you review code changes and understand patches. It might even help you to figure out what's going on in that merge you keep avoiding.

https://meldmerge.org

## Monitoring

### Mission Center

{{< img src="https://dl.flathub.org/repo/appstream/x86_64/icons/128x128/io.missioncenter.MissionCenter.png" alt="mission-center" width="100" height="100" >}}

**Mission Center** Monitor your CPU, Memory, Disk, Network and GPU usage.

https://flathub.org/apps/io.missioncenter.MissionCenter

### NetData

{{< img src="https://avatars.githubusercontent.com/u/43390781?s=200&v=4" alt="netdata" width="100" height="100" >}}

**NetData** collects metrics per second and presents them in beautiful low-latency dashboards. It is designed to run on all of your physical and virtual servers, cloud deployments, Kubernetes clusters, and edge/IoT devices, to monitor your systems, containers, and applications.

https://github.com/netdata/netdata

## NextCloud

{{< img src="https://upload.wikimedia.org/wikipedia/commons/6/60/Nextcloud_Logo.svg" alt="nextcloud" width="141" height="100" >}}

**NextCloud** Regain control over your data.

https://nextcloud.com/

https://github.com/nextcloud

## Recover Files

### TestDisk

{{< img src="https://www.cgsecurity.org/mw/images/Testdisklogo_clear_100.png" alt="testdisk" width="100" height="100" >}}

**TestDisk** Data Recovery.

https://www.cgsecurity.org/wiki/TestDisk

## Remote Control from Smartphone

### Remote TouchPad

{{< img src="https://dl.flathub.org/repo/appstream/x86_64/icons/128x128/com.github.unrud.RemoteTouchpad.png" alt="remote touchpad" width="100" height="100" >}}

**Remote TouchPad** Control mouse and keyboard from the webbrowser of a smartphone (or any other device with a touchscreen). To take control open the displayed URL or scan the QR code.

It supports both X Servers **Wayland** and **X11**.

https://github.com/Unrud/remote-touchpad

### Unified Remote

{{< img src="https://www.unifiedremote.com/favicon.svg" alt="unified remote" width="100" height="100" >}}

**Unified Remote** The one-and-only remote for your computer.
Turn your smartphone into a universal remote control.

https://www.unifiedremote.com

## Renovatebot

{{< img src="https://docs.renovatebot.com/assets/images/logo.png" alt="renovatebot" width="100" height="100" >}}

**Renovatebot** Automated Dependency Updates.

**Mend Renovate** keeps source code dependencies up-to-date using automated Pull Requests. It will scan repositories for package manager files (e.g. from npm/Yarn, Bundler, Composer, Go Modules, Pip/Pipenv/Poetry, Maven/Gradle, Dockerfile/k8s, and many more), and submit Pull Requests with updated versions whenever they are found.

https://github.com/apps/renovate

Renovate runs: https://developer.mend.io/github/althaser/website

## WebCheck

{{< img src="https://upload.wikimedia.org/wikipedia/commons/1/17/System-search.svg" alt="webcheck" width="64" height="64" >}}

**WebCheck** Get an insight into the inner-workings of a given website: uncover potential attack vectors, analyse server architecture, view security configurations, and learn what technologies a site is using.

https://github.com/Lissy93/web-check

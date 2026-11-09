---
title: "Applications"
date: 2024-02-20
lastmod: 2026-11-09
tags: ["applications", "backup", "sync", "storage", "diff", "compare", "git", "k8s", "kubernetes", "ide", "homeassistant", "home-automation", "selfhosted", "monitoring", "system-info", "netdata", "nextcloud", "cloud", "security", "deleted-files", "recover", "remote", "touchpad", "smartphone", "renovatebot", "updates", "dependencies", "automation", "cli", "webcheck", "osint", "restic", "garage", "s3", "object-storage", "utils", "linux", "cleanup", "deduplication", "jless", "less", "json", "topgrade", "upgrade", "wttr", "weather", "nuclei", "scanner", "vulnerabilities", "headscale", "tailscale", "cloudflared", "cloudflare", "tunnel", "vpn", "wireguard", "networking", "ghostty", "starship", "gogh", "terminal", "shell", "colors", "sablier", "docker", "editor", "code", "ai"]
categories: ["linux", "software", "applications", "tools", "backup"]
description: "Applications"
draft: false
---

A collection of applications and tools I use/recommend.

{{< toc >}}

## AI Code Editors

AI powered code editors.

### Cursor

{{< img src="https://cursor.com/marketing-static/icon-192x192-light.png" alt="cursor" width="100" height="100" >}}

**Cursor** The AI code editor and coding agent, built on VS Code.

https://cursor.com/

### Void Editor

{{< img src="https://voideditor.com/void/slice_of_void.png" alt="void-editor" width="100" height="100" >}}

**Void Editor** The open source AI code editor.

https://voideditor.com

https://github.com/voideditor/void

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

## CLI Tools

### JLess

{{< img src="https://raw.githubusercontent.com/PaulJuliusMartinez/jless/e6cdef719c7319020391d6bbf838ab272ce44cf0/logo/mascot.svg" alt="jless" width="110" height="100" >}}

**jless** is a command-line JSON viewer. Use it as a replacement for whatever combination of less, jq, cat and your editor you currently use for viewing JSON files. It is written in Rust and can be installed as a single standalone binary.

https://jless.io/

https://github.com/PaulJuliusMartinez/jless

### Rdfind

{{< img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Bash_Logo_Colored.svg/960px-Bash_Logo_Colored.svg.png" alt="rdfind" width="100" height="100" >}}

**Rdfind** is a command line tool that finds duplicate files. It is useful for compressing backup directories or just finding duplicate files. It compares files based on their content, NOT on their file names.

https://github.com/pauldreik/rdfind

### Topgrade

{{< img src="https://raw.githubusercontent.com/topgrade-rs/topgrade/31c5d0da3c554f7b0d822bb73ddf8db68cf8a99e/doc/topgrade_transparent.png" alt="topgrade" width="300" height="79" >}}

**Topgrade** keeps your system up to date with a single command. It detects which package managers and tools you use (apt, flatpak, snap, cargo, pip, npm, firmware and many more) and runs the appropriate commands to update them. It is written in Rust.

https://github.com/topgrade-rs/topgrade

### Weather

{{< img src="https://upload.wikimedia.org/wikipedia/commons/5/52/Weather-few-clouds.svg" alt="weather" width="64" height="64" >}}

**Weather** in the terminal with https://wttr.in.

```shell
$ curl wttr.in/lisbon?format=2
⛅  🌡️+15°C 🌬️↘21km/h

$ curl wttr.in/lisbon
Weather report: lisbon

     \  /       Partly cloudy
   _ /"".-.     15 °C
     \_(   ).   ↘ 21 km/h
     /(___(__)  10 km
                0.1 mm
                                                       ┌─────────────┐
┌──────────────────────────────┬───────────────────────┤  Mon 13 Apr ├───────────────────────┬──────────────────────────────┐
│            Morning           │             Noon      └──────┬──────┘     Evening           │             Night            │
├──────────────────────────────┼──────────────────────────────┼──────────────────────────────┼──────────────────────────────┤
│    \  /       Partly Cloudy  │    \  /       Partly cloudy  │  _`/"".-.     Patchy rain ne…│               Cloudy         │
│  _ /"".-.     +13(11) °C     │  _ /"".-.     15 °C          │   ,\_(   ).   15 °C          │      .--.     +13(12) °C     │
│    \_(   ).   ↘ 19-25 km/h   │    \_(   ).   ↘ 21-24 km/h   │    /(___(__)  ↘ 22-27 km/h   │   .-(    ).   ↘ 15-21 km/h   │
│    /(___(__)  10 km          │    /(___(__)  10 km          │      ‘ ‘ ‘ ‘  10 km          │  (___.__)__)  10 km          │
│               0.0 mm | 0%    │               0.1 mm | 100%  │     ‘ ‘ ‘ ‘   0.0 mm | 84%   │               0.0 mm | 0%    │
└──────────────────────────────┴──────────────────────────────┴──────────────────────────────┴──────────────────────────────┘
                                                       ┌─────────────┐
┌──────────────────────────────┬───────────────────────┤  Tue 14 Apr ├───────────────────────┬──────────────────────────────┐
│            Morning           │             Noon      └──────┬──────┘     Evening           │             Night            │
├──────────────────────────────┼──────────────────────────────┼──────────────────────────────┼──────────────────────────────┤
│    \  /       Partly Cloudy  │  _`/"".-.     Patchy rain ne…│     \   /     Sunny          │     \   /     Clear          │
│  _ /"".-.     15 °C          │   ,\_(   ).   18 °C          │      .-.      18 °C          │      .-.      +15(14) °C     │
│    \_(   ).   → 9-12 km/h    │    /(___(__)  ↘ 13-15 km/h   │   ― (   ) ―   ↘ 20-27 km/h   │   ― (   ) ―   ↘ 15-23 km/h   │
│    /(___(__)  10 km          │      ‘ ‘ ‘ ‘  10 km          │      `-’      10 km          │      `-’      10 km          │
│               0.0 mm | 0%    │     ‘ ‘ ‘ ‘   0.0 mm | 80%   │     /   \     0.0 mm | 0%    │     /   \     0.0 mm | 0%    │
└──────────────────────────────┴──────────────────────────────┴──────────────────────────────┴──────────────────────────────┘
                                                       ┌─────────────┐
┌──────────────────────────────┬───────────────────────┤  Wed 15 Apr ├───────────────────────┬──────────────────────────────┐
│            Morning           │             Noon      └──────┬──────┘     Evening           │             Night            │
├──────────────────────────────┼──────────────────────────────┼──────────────────────────────┼──────────────────────────────┤
│     \   /     Sunny          │     \   /     Sunny          │     \   /     Sunny          │     \   /     Clear          │
│      .-.      +15(14) °C     │      .-.      19 °C          │      .-.      18 °C          │      .-.      +14(13) °C     │
│   ― (   ) ―   ↘ 13-18 km/h   │   ― (   ) ―   ↓ 14-17 km/h   │   ― (   ) ―   ↘ 24-30 km/h   │   ― (   ) ―   ↘ 17-26 km/h   │
│      `-’      10 km          │      `-’      10 km          │      `-’      10 km          │      `-’      10 km          │
│     /   \     0.0 mm | 0%    │     /   \     0.0 mm | 0%    │     /   \     0.0 mm | 0%    │     /   \     0.0 mm | 0%    │
└──────────────────────────────┴──────────────────────────────┴──────────────────────────────┴──────────────────────────────┘
Location: Lisboa, Grande Lisboa, Área Metropolitana de Lisboa, Portugal [38.7077926,-9.136506]

Follow @igor_chubin for wttr.in updates
```

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

## Sablier

{{< img src="https://raw.githubusercontent.com/sablierapp/artwork/b203cf1509329ca044340ce68e2712c10e679b6e/icon/sablier-icon-color.png" alt="sablier" width="100" height="100" >}}

**Sablier** is a free and open-source software that can scale your workloads on demand, down to zero when they are not in use.

https://sablierapp.dev

https://github.com/sablierapp/sablier

## Security

### Nuclei

{{< img src="https://raw.githubusercontent.com/projectdiscovery/nuclei/df57ae6d2955864fd92a1bd2565fe9e4e9a7592b/static/nuclei-cover-image.png" alt="nuclei" width="400" height="92" >}}

**Nuclei** is a modern, high-performance vulnerability scanner that leverages simple YAML-based templates. It empowers you to design custom vulnerability detection scenarios that mimic real-world conditions, leading to zero false positives.

https://projectdiscovery.io/nuclei

https://github.com/projectdiscovery/nuclei

```shell
pbeja@Sirius:~/go $ bin/nuclei -u https://althaser.eu

                     __     _
   ____  __  _______/ /__  (_)
  / __ \/ / / / ___/ / _ \/ /
 / / / / /_/ / /__/ /  __/ /
/_/ /_/\__,_/\___/_/\___/_/   v3.3.7

		projectdiscovery.io

[INF] Current nuclei version: v3.3.7 (latest)
[INF] Current nuclei-templates version: v10.1.1 (latest)
[WRN] Scan results upload to cloud is disabled.
[INF] New templates added in latest release: 154
[INF] Templates loaded for current scan: 7607
[INF] Executing 7425 signed templates from projectdiscovery/nuclei-templates
[WRN] Loading 182 unsigned templates for scan. Use with caution.
[INF] Targets loaded for current scan: 1
[INF] Templates clustered: 1702 (Reduced 1602 Requests)
[INF] Using Interactsh Server: oast.online
[waf-detect:varnish] [http] [info] https://althaser.eu
[tls-version] [ssl] [info] althaser.eu:443 ["tls12"]
[tls-version] [ssl] [info] althaser.eu:443 ["tls13"]
[http-missing-security-headers:cross-origin-embedder-policy] [http] [info] https://althaser.eu
[http-missing-security-headers:permissions-policy] [http] [info] https://althaser.eu
[http-missing-security-headers:x-permitted-cross-domain-policies] [http] [info] https://althaser.eu
[http-missing-security-headers:referrer-policy] [http] [info] https://althaser.eu
[http-missing-security-headers:x-content-type-options] [http] [info] https://althaser.eu
[http-missing-security-headers:clear-site-data] [http] [info] https://althaser.eu
[http-missing-security-headers:cross-origin-opener-policy] [http] [info] https://althaser.eu
[http-missing-security-headers:cross-origin-resource-policy] [http] [info] https://althaser.eu
[http-missing-security-headers:strict-transport-security] [http] [info] https://althaser.eu
[http-missing-security-headers:content-security-policy] [http] [info] https://althaser.eu
[http-missing-security-headers:x-frame-options] [http] [info] https://althaser.eu
[caa-fingerprint] [dns] [info] althaser.eu
[nameserver-fingerprint] [dns] [info] althaser.eu ["ns71.domaincontrol.com.","ns72.domaincontrol.com."]
[ssl-issuer] [ssl] [info] althaser.eu:443 ["Let's Encrypt"]
[ssl-dns-names] [ssl] [info] althaser.eu:443 ["althaser.eu"]
```

### WebCheck

{{< img src="https://upload.wikimedia.org/wikipedia/commons/1/17/System-search.svg" alt="webcheck" width="64" height="64" >}}

**WebCheck** Get an insight into the inner-workings of a given website: uncover potential attack vectors, analyse server architecture, view security configurations, and learn what technologies a site is using.

https://github.com/Lissy93/web-check

## Terminals

### Ghostty

{{< img src="https://avatars.githubusercontent.com/u/169223740?s=200&v=4" alt="ghostty" width="100" height="100" >}}

**Ghostty** is a fast, feature-rich, and cross-platform terminal emulator that uses platform-native UI and GPU acceleration.

https://ghostty.org

https://github.com/ghostty-org/ghostty

### Gogh

{{< img src="https://raw.githubusercontent.com/Gogh-Co/Gogh/3277da1a295142cd8664e0657c5a3c2a44cc520a/.images/gogh/Gogh-logo-dark.png" alt="gogh" width="200" height="85" >}}

**Gogh** Color Schemes For Ubuntu, Linux Mint, Elementary OS and all distributions that use Gnome Terminal, Pantheon Terminal, Tilix, or XFCE4 Terminal; initially inspired by Elementary OS Luna. Also works on iTerm for macOS.

https://gogh.website

https://github.com/Gogh-Co/Gogh

### Starship

{{< img src="https://starship.rs/logo.svg" alt="starship" width="200" height="53" >}}

**Starship** The minimal, blazing-fast, and infinitely customizable prompt for any shell!

https://starship.rs

https://github.com/starship/starship

### Warp

{{< img src="https://avatars.githubusercontent.com/u/71840468?s=200&v=4" alt="warp" width="100" height="100" >}}

**Warp** is the terminal reimagined with AI and collaborative tools for better productivity.

https://www.warp.dev/

## Tunnels and VPN

Tools to reach your devices and self-hosted services from anywhere, through a private mesh VPN or a tunnel, without opening inbound ports.

### Cloudflared

{{< img src="https://upload.wikimedia.org/wikipedia/commons/4/4b/Cloudflare_Logo.svg" alt="cloudflared" width="200" height="66" >}}

**Cloudflared** The Cloudflare Tunnel connector: exposes local services through Cloudflare without opening inbound ports.

https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel/

### Headscale

{{< img src="https://headscale.net/stable/assets/logo/headscale3-dots.svg" alt="headscale" width="200" height="100" >}}

**Headscale** An open source, self-hosted implementation of the Tailscale control server.

https://headscale.net/stable/

### Tailscale

{{< img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Tailscale-Logo-Black.svg/500px-Tailscale-Logo-Black.svg.png?_=20210201215505" alt="tailscale" width="200" height="64" >}}

**Tailscale** A mesh VPN built on WireGuard that connects your devices securely, wherever they are.

https://tailscale.com/blog/how-tailscale-works

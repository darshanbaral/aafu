---
title: "CLI Tools"
date: 2024-02-20
lastmod: 2026-11-08
tags: ["cli", "utils", "linux", "storage", "cleanup", "deduplication", "jless", "less", "json", "topgrade", "upgrade", "updates", "wttr", "weather", "nuclei", "security", "scanner", "vulnerabilities"]
categories: ["linux", "software", "applications", "tools"]
description: "CLI Tools"
draft: false
---

Command line tools and resources.

{{< toc >}}

## JLess

{{< img src="https://raw.githubusercontent.com/PaulJuliusMartinez/jless/e6cdef719c7319020391d6bbf838ab272ce44cf0/logo/mascot.svg" alt="jless" width="110" height="100" >}}

**jless** is a command-line JSON viewer. Use it as a replacement for whatever combination of less, jq, cat and your editor you currently use for viewing JSON files. It is written in Rust and can be installed as a single standalone binary.

https://jless.io/

https://github.com/PaulJuliusMartinez/jless

## Nuclei

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

## Rdfind

{{< img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Bash_Logo_Colored.svg/960px-Bash_Logo_Colored.svg.png" alt="rdfind" width="100" height="100" >}}

**Rdfind** is a command line tool that finds duplicate files. It is useful for compressing backup directories or just finding duplicate files. It compares files based on their content, NOT on their file names.

https://github.com/pauldreik/rdfind

## Topgrade

{{< img src="https://raw.githubusercontent.com/topgrade-rs/topgrade/31c5d0da3c554f7b0d822bb73ddf8db68cf8a99e/doc/topgrade_transparent.png" alt="topgrade" width="300" height="79" >}}

**Topgrade** keeps your system up to date with a single command. It detects which package managers and tools you use (apt, flatpak, snap, cargo, pip, npm, firmware and many more) and runs the appropriate commands to update them. It is written in Rust.

https://github.com/topgrade-rs/topgrade

## Weather

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

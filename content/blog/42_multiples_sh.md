---
title: "Multiples sh"
date: 2025-02-11
tags: ["ssh", "bash", "dsh", "pdsh", "cli"]
categories: ["linux", "software", "applications", "tools"]
description: "Multiples sh"
draft: false
hero_images:
  - src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Bash_Logo_Colored.svg/1280px-Bash_Logo_Colored.svg.png"
    alt: "dsh"
    width: "70"
    height: "70"
---

Tools to run the same shell command on many machines at once over SSH, and collect the output of each host in a single terminal.

{{< toc >}}

## pdsh

**pdsh** A high performance, parallel remote shell utility.

https://github.com/chaos/pdsh

```shell
$ pdsh -f 10 -w de-back01-master[01-03],de-back01-opensearch[06-16],de-back01-worker[02,03,07,09-24],de-back-opensearch[01-05],de-back-worker[01,08] "pro fix --dry-run CVE-2026-31431 |tail -n1" | column -t -s ':'
de-back01-opensearch12   ✔ CVE-2026-31431 is resolved.
de-back01-opensearch06   ✔ CVE-2026-31431 is resolved.
de-back01-master02       ✔ CVE-2026-31431 is resolved.
de-back01-opensearch07   ✔ CVE-2026-31431 is resolved.
de-back01-opensearch10   ✔ CVE-2026-31431 is resolved.
de-back01-master03       ✔ CVE-2026-31431 is resolved.
de-back01-opensearch09   ✔ CVE-2026-31431 is resolved.
de-back01-opensearch11   ✔ CVE-2026-31431 is resolved.
de-back01-master01       ✔ CVE-2026-31431 is resolved.
de-back01-opensearch08   ✔ CVE-2026-31431 is resolved.
de-back01-worker07       ✔ CVE-2026-31431 is resolved.
de-back01-worker09       ✔ CVE-2026-31431 is resolved.
de-back01-opensearch14   ✔ CVE-2026-31431 is resolved.
de-back01-worker02       ✔ CVE-2026-31431 is resolved.
de-back01-worker03       ✔ CVE-2026-31431 is resolved.
de-back01-worker10       ✔ CVE-2026-31431 is resolved.
de-back01-opensearch13   ✔ CVE-2026-31431 is resolved.
de-back01-opensearch16   ✔ CVE-2026-31431 is resolved.
de-back01-opensearch15   ✔ CVE-2026-31431 is resolved.
de-back01-worker11       ✘ CVE-2026-31431 is not resolved.
de-back01-worker13       ✔ CVE-2026-31431 is resolved.
de-back01-worker15       ✔ CVE-2026-31431 is resolved.
de-back01-worker14       ✔ CVE-2026-31431 is resolved.
de-back01-worker16       ✔ CVE-2026-31431 is resolved.
de-back01-worker21       ✔ CVE-2026-31431 is resolved.
de-back01-worker19       ✔ CVE-2026-31431 is resolved.
de-back01-worker18       ✘ CVE-2026-31431 is not resolved.
de-back01-worker17       ✘ CVE-2026-31431 is not resolved.
de-back01-worker20       ✔ CVE-2026-31431 is resolved.
de-back01-worker12       ✘ CVE-2026-31431 is not resolved.
de-back01-worker24       ✔ CVE-2026-31431 is resolved.
de-back01-worker22       ✔ CVE-2026-31431 is resolved.
de-back01-worker23       ✔ CVE-2026-31431 is resolved.
de-back-worker01         ✔ CVE-2026-31431 is resolved.
de-back-opensearch01     ✔ CVE-2026-31431 is resolved.
de-back-opensearch05     ✔ CVE-2026-31431 is resolved.
de-back-worker08         ✔ CVE-2026-31431 is resolved.
de-back-opensearch03     ✔ CVE-2026-31431 is resolved.
de-back-opensearch04     ✔ CVE-2026-31431 is resolved.
de-back-opensearch02     ✔ CVE-2026-31431 is resolved.
```

## dsh

**dsh** dancer's shell, or distributed shell.

https://www.netfort.gr.jp/~dancer/software/dsh.html

https://www.tecmint.com/using-dsh-distributed-shell-to-run-linux-commands-across-multiple-machines/

```shell
$ sudo apt install dsh

$ sudo vim /etc/dsh/dsh.conf
replace remoteshell =rsh to remoteshell =ssh

$ mkdir -p ~/.dsh/group

$ vim ~/.dsh/group/machine-group
machine1.bla.org
machine2.bla.org
machine3.bla.org

$ dsh -M -g machine-group -c "lsb_release -a"
```

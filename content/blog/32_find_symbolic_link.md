---
title: "Find symbolic links"
date: 2025-01-02
tags: ["shell", "find", "cli"]
categories: ["linux", "software", "applications", "tools"]
description: "Find symbolic links"
draft: false
hero_images:
  - src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Bash_Logo_Colored.svg/1280px-Bash_Logo_Colored.svg.png"
    alt: "ls"
    width: "70"
    height: "70"
---

**Find symbolic links** that point to a given file. `ls -lR` lists every file recursively, `grep "^l"` keeps only the symbolic links (their permissions start with `l`) and the second `grep` filters the ones pointing to the target. Then `find` shows in which directories those links live.

```shell
$ ls -lR |grep "^l" |grep backend-swarm.yml
lrwxrwxrwx 1 pbeja pbeja  58 ago  4  2023 cpe-securitygroup-swarm.yml -> ../../Templates/domain.com/sg/backend-swarm.yml
lrwxrwxrwx 1 pbeja pbeja  58 ago  4  2023 cpe-securitygroup-swarm.yml -> ../../Templates/domain.com/sg/backend-swarm.yml
lrwxrwxrwx 1 pbeja pbeja  58 abr 19  2024 cpe-securitygroup-back-swarm.yml -> ../../Templates/domain.com/sg/backend-swarm.yml

$ find . -name "cpe-securitygroup-swarm.yml"
./Europe/Backend/cpe-securitygroup-swarm.yml
./Asia/Backend/cpe-securitygroup-swarm.yml
```

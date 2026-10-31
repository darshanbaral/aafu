---
title: "Git Pulls"
date: 2025-06-11
tags: ["git", "vcs"]
categories: ["software", "applications", "tools"]
description: "Git Pulls"
draft: false
hero_images:
  - src: "https://avatars.githubusercontent.com/u/18133?s=280&v=4"
    alt: "git-pulls"
    width: "200"
    height: "100"
---

**Git Pulls**.

```shell
$ for dir in ~/Development/gitlab.com/elara-raspberrypi/*; do cd $dir && echo -e "\e[1;34m$PWD\e[0m" && git pull && cd; done
/home/pbeja/Development/gitlab.com/elara-raspberrypi/ansible
Already up-to-date.
/home/pbeja/Development/gitlab.com/elara-raspberrypi/docker-swarm
fatal: not a git repository (or any of the parent directories): .git
/home/pbeja/Development/gitlab.com/elara-raspberrypi/renovatebot
Already up-to-date.

$ for dir in ~/Development/gitlab.com/elara-raspberrypi/docker-swarm/*; do cd $dir && echo -e "\e[1;34m$PWD\e[0m" && git pull && cd; done
/home/pbeja/Development/gitlab.com/elara-raspberrypi/docker-swarm/ci-templates
Already up-to-date.
/home/pbeja/Development/gitlab.com/elara-raspberrypi/docker-swarm/gitlab-runner
Already up-to-date.
/home/pbeja/Development/gitlab.com/elara-raspberrypi/docker-swarm/monitoring
Already up-to-date.
/home/pbeja/Development/gitlab.com/elara-raspberrypi/docker-swarm/networking
Already up-to-date.
/home/pbeja/Development/gitlab.com/elara-raspberrypi/docker-swarm/pihole
Already up-to-date.
/home/pbeja/Development/gitlab.com/elara-raspberrypi/docker-swarm/tools
Already up-to-date.
/home/pbeja/Development/gitlab.com/elara-raspberrypi/docker-swarm/wireguard
Already up-to-date.
```

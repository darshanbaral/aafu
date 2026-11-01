---
title: "Ansible Callbacks"
date: 2024-03-12
tags: ["ansible", "python", "automation"]
categories: ["linux", "software", "applications", "tools"]
description: "Ansible Callbacks"
draft: false
hero_images:
  - src: "https://upload.wikimedia.org/wikipedia/commons/2/24/Ansible_logo.svg"
    alt: "ansible"
    width: "100"
    height: "100"
---

Calculate **timers** for each task and **timers by each role** at the end of ansible run:

```shell
$ cat ansible.cfg
[defaults]
callbacks_enabled = timer,profile_roles
```

```shell
TASK [Gathering Facts] ********************************************************
terça 27 fevereiro 2024  14:52:13 +0000 (0:00:15.978)       0:00:15.988 *******
....
....
....
Playbook run took 0 days, 0 hours, 2 minutes, 5 seconds
terça 27 fevereiro 2024  14:54:02 +0000 (0:00:15.819)       0:02:05.110 *******
===============================================================================
gather_facts ----------------------------------------------------------- 75.83s
prepare ---------------------------------------------------------------- 49.27s
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
total ----------------------------------------------------------------- 125.10s
```

https://docs.ansible.com/ansible/latest/plugins/callback.html#enabling-callback-plugins

---
title: "Bash"
date: 2024-02-20
lastmod: 2026-11-01
tags: ["bash", "shell", "branch", "git", "configurations"]
categories: ["linux", "software", "applications", "tools"]
description: "Bash"
draft: false
hero_images:
  - src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Bash_Logo_Colored.svg/1280px-Bash_Logo_Colored.svg.png"
    alt: "bash"
    width: "70"
    height: "70"
---

Bash configuration: the `~/.bashrc` file and a prompt with the git branch name.

{{< toc >}}

## Bashrc

Bashrc configuration file:

```shell
$ cat ~/.bashrc
if [ "$color_prompt" = yes ]; then
    PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ '
else
    PS1='${debian_chroot:+($debian_chroot)}\u@\h:\w\$ '
fi
unset color_prompt force_color_prompt

# ignore xdotool command to be saved in history
HISTIGNORE='xdotool'

alias yt-dlp="yt-dlp --no-playlist -S res:720"
alias genpw='pwgen -cns 64'
alias background_local='printf "\e]11;#2E3436\e\\"'
alias background_server='printf "\e]11;#012849\e\\"'
alias harbor="background_server; ssh -A <user>@<jump_server> -t ssh <user>@<private_harbor_ip>; background_local;"

ssh () { command ssh "$@"; background_local; }
```

## Prompt With Branch Name

How to setup bashrc to support branch name in its prompt:

https://medium.com/@chiraggandhi70726/how-to-add-git-branch-name-to-bash-prompt-b112b93606e

```shell
$ code ~/.bashrc
```

Append the following:
```shell
# Show git branch name
force_color_prompt=yes
color_prompt=yes
parse_git_branch() {
     git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
}
export PS1="\u@\h \[\033[32m\]\w\[\033[33m\]\$(parse_git_branch)\[\033[00m\] $ "

mine:
PS1='${debian_chroot:+($debian_chroot)}\[\033[1;33m\]\t \u@\h\[\033[0m\]:\[\033[34m\]\w\[\033[00m\]\[\033[31m\]$(parse_git_branch)\[\033[00m\] $ '
```

Reload
```shell
$ exec bash
```

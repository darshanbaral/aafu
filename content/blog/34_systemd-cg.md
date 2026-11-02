---
title: "Systemd CGroups"
date: 2025-01-04
tags: ["cgroups", "systemd", "linux"]
categories: ["linux", "software", "applications", "tools"]
description: "Systemd CGroups"
draft: false
hero_images:
  - src: "https://brand.systemd.io/assets/png/systemd-dark.png"
    alt: "systemd"
    width: "300"
    height: "200"
---

**Control groups (cgroups)** are the Linux kernel feature that systemd uses to organize every process into a tree of slices, services and scopes, and to account and limit their CPU, memory and I/O. `systemd-cgls` shows that tree (which process belongs to which user session or service), and `systemd-cgtop` shows live resource usage per cgroup, like `top` but grouped by service.

https://systemd.io/

https://github.com/systemd/systemd

```shell
pbeja@Sirius:~ $ systemd-cgls
CGroup /:
-.slice
├─user.slice
│ └─user-1000.slice
│   ├─user@1000.service …
│   │ ├─session.slice
│   │ │ ├─gvfs-goa-volume-monitor.service
│   │ │ │ └─5191 /usr/libexec/gvfs-goa-volume-monitor
│   │ │ ├─org.gnome.SettingsDaemon.MediaKeys.service
│   │ │ │ └─4871 /usr/libexec/gsd-media-keys
│   │ │ ├─org.gnome.SettingsDaemon.Smartcard.service
│   │ │ │ └─4902 /usr/libexec/gsd-smartcard
│   │ │ ├─xdg-permission-store.service
│   │ │ │ └─4436 /usr/libexec/xdg-permission-store
│   │ │ ├─org.gnome.SettingsDaemon.Datetime.service
│   │ │ │ └─4858 /usr/libexec/gsd-datetime
│   │ │ ├─filter-chain.service
│   │ │ │ └─4367 /usr/bin/pipewire -c filter-chain.conf
│   │ │ ├─xdg-document-portal.service
│   │ │ │ ├─4420 /usr/libexec/xdg-document-portal
│   │ │ │ └─4445 fusermount3 -o rw,nosuid,nodev,fsname=portal,auto_unmount,subtype=portal -- /run/user/1000/doc
│   │ │ ├─org.gnome.SettingsDaemon.Housekeeping.service
│   │ │ │ └─4864 /usr/libexec/gsd-housekeeping
│   │ │ ├─org.gnome.Shell@x11.service
│   │ │ │ ├─4730 /usr/bin/gnome-shell
│   │ │ │ ├─4770 /usr/libexec/mutter-x11-frames
│   │ │ │ ├─8356 cat
│   │ │ │ └─8357 cat
│   │ │ ├─xdg-desktop-portal.service
│   │ │ │ └─5526 /usr/libexec/xdg-desktop-portal
│   │ │ ├─org.freedesktop.IBus.session.GNOME.service
│   │ │ │ ├─4852 /usr/bin/ibus-daemon --panel disable --xim
│   │ │ │ ├─5011 /usr/libexec/ibus-dconf
│   │ │ │ ├─5022 /usr/libexec/ibus-extension-gtk3
│   │ │ │ ├─5031 /usr/libexec/ibus-x11 --kill-daemon
│   │ │ │ └─5277 /usr/libexec/ibus-engine-simple
│   │ │ ├─pipewire-pulse.service
│   │ │ │ └─4383 /usr/bin/pipewire-pulse
│   │ │ ├─org.gnome.SettingsDaemon.Keyboard.service
│   │ │ │ └─4868 /usr/libexec/gsd-keyboard
│   │ │ ├─org.gnome.SettingsDaemon.A11ySettings.service
│   │ │ │ └─4853 /usr/libexec/gsd-a11y-settings
│   │ │ ├─wireplumber.service
│   │ │ │ └─4377 /usr/bin/wireplumber
│   │ │ ├─org.gnome.SettingsDaemon.Wacom.service
│   │ │ │ └─4914 /usr/libexec/gsd-wacom
│   │ │ ├─gvfs-daemon.service
│   │ │ │ ├─ 4688 /usr/libexec/gvfsd
│   │ │ │ ├─ 4696 /usr/libexec/gvfsd-fuse /run/user/1000/gvfs -f
│   │ │ │ ├─19023 /usr/libexec/gvfsd-trash --spawner :1.27 /org/gtk/gvfs/exec_spaw/0
│   │ │ │ ├─19062 /usr/libexec/gvfsd-recent --spawner :1.27 /org/gtk/gvfs/exec_spaw/1
│   │ │ │ ├─25697 /usr/libexec/gvfsd-network --spawner :1.27 /org/gtk/gvfs/exec_spaw/2
│   │ │ │ ├─25714 /usr/libexec/gvfsd-dnssd --spawner :1.27 /org/gtk/gvfs/exec_spaw/4

pbeja@Sirius:~ $ systemd-cgtop
CGroup                                                      Tasks   %CPU     Memory  Input/s Output/s
user.slice                                                  1423    148.6    11.6G   -        -
user.slice/user-1000.slice                                  1423    148.7    11.6G   -        -
user.slice/user-1000.slice/user@1000.service                1403    145.0    11.5G   -        -
/                                                           2071    143.5    11.7G   -        -
user.slice/user-1000.slice/session-2.scope                  20      3.7      150.4M  -        -
mde                                                         167     0.9      587.5M  -        -
system.slice                                                290     0.4      1.8G    -        -
system.slice/docker.service                                 22      0.2      59.0M   -        -
system.slice/microsoft-identity-device-broker.service       34      0.1      732.8M  -        -
system.slice/containerd.service                             19      0.1      26.2M   -        -
system.slice/NetworkManager.service                         4       0.0      6.6M    -        -
system.slice/thermald.service                               5       0.0      1.5M    -        -
system.slice/systemd-oomd.service                           1       0.0      940.0K  -        -
system.slice/strongswan-starter.service                     18      0.0      2.0M    -        -
system.slice/systemd-resolved.service                       1       0.0      4.0M    -        -
system.slice/avahi-daemon.service                           2       0.0      1.0M    -        -
system.slice/fwupd.service                                  6       0.0      18.4M   -        -
dev-hugepages.mount                                         -       -        84.0K   -        -
dev-mqueue.mount                                            -       -        56.0K   -        -
init.scope                                                  1       -        10.4M   -        -
proc-fs-nfsd.mount                                          -       -        20.0K   -        -
proc-sys-fs-binfmt_misc.mount                               -       -        8.0K    -        -
sys-fs-fuse-connections.mount                               -       -        8.0K    -        -
sys-kernel-config.mount                                     -       -        4.0K    -        -
sys-kernel-debug.mount                                      -       -        4.0K    -        -
sys-kernel-tracing.mount                                    -       -        4.0K    -        -
system.slice/ModemManager.service                           4       -        1.3M    -        -
system.slice/accounts-daemon.service                        4       -        1.4M    -        -
system.slice/auditd.service                                 2       -        952.0K  -        -
system.slice/bluetooth.service                              1       -        1.6M    -        -
system.slice/bolt.service                                   4       -        944.0K  -        -
system.slice/boot-efi.mount                                 -       -        24.0K   -        -
system.slice/boot.mount                                     -       -        120.0K  -        -
system.slice/clamav-freshclam.service                       1       -        4.3M    -        -
system.slice/colord.service                                 4       -        13.4M   -        -
system.slice/cron.service                                   1       -        2.7M    -        -
system.slice/cups-browsed.service                           4       -        2.8M    -        -
system.slice/cups.service                                   1       -        2.2M    -        -
system.slice/dbus.service                                   1       -        3.7M    -        -
system.slice/dev-mapper-vgubuntu\x2dswap_1.swap             -       -        8.0K    -        -
system.slice/forticlient.service                            45      -        29.9M   -        -
system.slice/fsidd.service                                  1       -        144.0K  -        -
system.slice/gdm.service                                    4       -        2.5M    -        -
system.slice/glances.service                                1       -        1.8M    -        -
system.slice/gnome-remote-desktop.service                   4       -        4.1M    -        -
system.slice/intune-daemon.service                          11      -        169.2M  -        -
system.slice/kerneloops.service                             2       -        572.0K  -        -
system.slice/mdatp.service                                  2       -        59.5M   -        -
system.slice/networkd-dispatcher.service                    1       -        5.4M    -        -
```

---
title: "Boot Charts"
date: 2025-06-11
tags: ["systemd", "bootchart", "boot", "linux"]
categories: ["software", "applications", "tools"]
description: "Boot Charts"
draft: false
hero_images:
  - src: "https://brand.systemd.io/assets/png/systemd-dark.png"
    alt: "systemd"
    width: "200"
    height: "100"
---

**Systemd - BootCharts**.

```shell
$ systemd-analyze
Startup finished in 3.509s (firmware) + 3.594s (loader) + 23.431s (kernel) + 11.597s (userspace) = 42.132s 
graphical.target reached after 11.570s in userspace.

$ systemd-analyze critical-chain
The time when unit became active or started is printed after the "@" character.
The time the unit took to start is printed after the "+" character.
graphical.target @11.570s
└─multi-user.target @11.570s
  └─docker.service @9.015s +2.554s
    └─network-online.target @9.002s
      └─NetworkManager-wait-online.service @3.225s +5.777s
        └─NetworkManager.service @1.864s +1.335s
          └─dbus.service @1.778s +81ms
            └─basic.target @1.772s
              └─sockets.target @1.772s
                └─snapd.socket @1.770s +1ms
                  └─sysinit.target @1.756s
                    └─systemd-backlight@backlight:intel_backlight.service @2.791s +9ms
                      └─system-systemd\x2dbacklight.slice @829ms
                        └─system.slice @326ms
                          └─-.slice @326ms

$ systemd-analyze blame
5.777s NetworkManager-wait-online.service
3.482s plymouth-quit-wait.service
2.554s docker.service
2.420s snapd.seeded.service
2.338s snapd.service
1.582s vboxdrv.service
1.335s NetworkManager.service
 547ms postfix@-.service
 545ms containerd.service
 293ms thermald.service
 278ms networkd-dispatcher.service
 275ms dpkg-db-backup.service
 269ms dev-mapper-vgubuntu\x2droot.device
 265ms user@1000.service
 228ms snapd.apparmor.service
 194ms udisks2.service
 167ms dev-loop1.device
 162ms accounts-daemon.service
 161ms dev-loop2.device
 155ms gnome-remote-desktop.service
 154ms dev-loop7.device
 146ms upower.service
 143ms dev-loop3.device
 142ms rsyslog.service
 141ms power-profiles-daemon.service
 138ms dev-loop6.device
 135ms dev-loop5.device
 135ms gpu-manager.service
 131ms polkit.service
 130ms dev-loop4.device
 126ms proc-fs-nfsd.mount
 124ms dev-loop0.device
 120ms systemd-udev-trigger.service
 120ms ModemManager.service
 116ms dev-loop14.device
 112ms systemd-modules-load.service
 109ms xl2tpd.service
 100ms systemd-journal-flush.service
  99ms teamviewerd.service
  98ms bluetooth.service
  97ms avahi-daemon.service
  95ms dev-loop18.device
  93ms apparmor.service
  91ms systemd-resolved.service
  85ms dev-loop19.device
  83ms dev-loop15.device
  82ms dev-loop9.device
  81ms dbus.service
  80ms dev-loop17.device
  78ms systemd-logind.service
  77ms dev-loop10.device
  77ms dev-loop8.device
  75ms systemd-oomd.service
  75ms secureboot-db.service
  71ms systemd-timesyncd.service
  71ms kerneloops.service
  70ms switcheroo-control.service
  69ms dev-loop13.device
  66ms dev-loop12.device
  66ms dev-loop25.device
  65ms plymouth-start.service
  64ms colord.service
  64ms dev-loop24.device
  64ms dev-loop22.device
  64ms grub-common.service
  62ms dev-loop11.device
  62ms cups.service
  61ms dev-loop27.device
  61ms dev-loop21.device
  61ms dev-loop26.device
  61ms dev-loop16.device
  61ms dev-loop20.device
  60ms auditd.service
  59ms systemd-udevd.service
  59ms snap-bare-5.mount
  59ms dev-loop23.device
  58ms gdm.service
  58ms snap-chromium-3153.mount
  57ms snap-chromium-3161.mount
  57ms systemd-rfkill.service
  56ms lm-sensors.service
  56ms snap-core18-2846.mount
  55ms snap-core18-2855.mount
  54ms bolt.service
  54ms snap-core20-2571.mount
  53ms snap-core20-2582.mount
  52ms snap-core22-1963.mount
  51ms snap-core22-1981.mount
  50ms nginx.service
  50ms lvm2-monitor.service
  49ms snap-core24-888.mount
  48ms snap-core24-988.mount
  46ms snap-cups-1085.mount
  46ms systemd-journald.service
  46ms nfs-server.service
  45ms snap-cups-1100.mount
  44ms snap-firefox-6259.mount
  41ms snap-firefox-6316.mount
  40ms snap-firmware\x2dupdater-147.mount
  39ms keyboard-setup.service
  38ms snap-firmware\x2dupdater-167.mount
  37ms snap-gnome\x2d42\x2d2204-176.mount
  36ms e2scrub_reap.service
  36ms snap-gnome\x2d42\x2d2204-202.mount
  35ms snap-gtk\x2dcommon\x2dthemes-1535.mount
  34ms systemd-fsck@dev-disk-by\x2duuid-f6c4d076\x2d5e24\x2d40b2\x2da91d\x2d173d857ab91e.service
  33ms systemd-remount-fs.service
  33ms systemd-tmpfiles-setup.service
  32ms snap-helm-452.mount
  32ms systemd-tmpfiles-setup-dev-early.service
  31ms snap-helm-455.mount
  31ms systemd-fsck@dev-disk-by\x2duuid-8F6C\x2d348C.service
  30ms snap-prompting\x2dclient-104.mount
  29ms snap-prompting\x2dclient-87.mount
  28ms nfs-idmapd.service
  28ms systemd-sysctl.service
  28ms snap-snapd-23771.mount
  27ms snap-snapd-24505.mount
  27ms nfs-mountd.service
  26ms snap-snapd\x2ddesktop\x2dintegration-247.mount
  24ms grub-initrd-fallback.service
  22ms snap-snapd\x2ddesktop\x2dintegration-253.mount
  21ms rtkit-daemon.service
  21ms openvpn.service
  21ms rpc-statd.service
  20ms systemd-cryptsetup@nvme0n1p3_crypt.service
  20ms dev-hugepages.mount
  19ms var-snap-firefox-common-host\x2dhunspell.mount
  19ms dev-mqueue.mount
  17ms systemd-backlight@leds:platform::kbd_backlight.service
  17ms wpa_supplicant.service
  17ms systemd-binfmt.service
  17ms run-rpc_pipefs.mount
  17ms sys-kernel-debug.mount
  16ms sys-kernel-tracing.mount
  14ms alsa-restore.service
  13ms rpcbind.service
  13ms vboxweb-service.service
  13ms plymouth-read-write.service
  12ms docker.socket
  12ms user-runtime-dir@1000.service
  12ms systemd-user-sessions.service
  11ms nfsdcld.service
  11ms kmod-static-nodes.service
  11ms qemu-kvm.service
  10ms modprobe@configfs.service
   9ms proc-sys-fs-binfmt_misc.mount
   9ms systemd-backlight@backlight:intel_backlight.service
   9ms boot-efi.mount
   9ms falcon-sensor.service
   8ms modprobe@drm.service
   8ms systemd-update-utmp-runlevel.service
   8ms vboxballoonctrl-service.service
   8ms dev-mapper-vgubuntu\x2dswap_1.swap
   7ms systemd-random-seed.service
   7ms modprobe@fuse.service
   7ms systemd-update-utmp.service
   6ms boot.mount
   6ms systemd-tmpfiles-setup-dev.service
   5ms nfs-blkmap.service
   5ms run-qemu.mount
   4ms swapfile.swap
   4ms console-setup.service
   4ms rpc-statd-notify.service
   4ms ufw.service
   4ms vboxautostart-service.service
   4ms sys-kernel-config.mount
   3ms sys-fs-fuse-connections.mount
   3ms modprobe@efi_pstore.service
   3ms modprobe@loop.service
   2ms setvtrgb.service
   1ms postfix.service
   1ms modprobe@dm_mod.service
   1ms snapd.socket
  23us blk-availability.service

$ systemd-analyze plot > image.svg
$ inkscape image.svg
```

---
title: "Debian Nouveau Driver"
date: 2024-11-03
tags: ["Debian", "nouveau", "drivers", "troubleshooting"]
categories: ["linux", "software", "applications", "tools"]
description: "Debian Nouveau Driver"
draft: false
hero_images:
  - src: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Debian-OpenLogo.svg"
    alt: "debian"
    width: "82"
    height: "108"
---

**Problem**:

**Nouveau** driver not running in Debian:
```shell
althaser@Sirius:~ $ lspci |grep -i VGA
02:00.0 VGA compatible controller: NVIDIA Corporation GT216M [GeForce GT 330M] (rev a2)

althaser@Sirius:~ $ sudo less /var/log/syslog
2024-11-03T00:20:02.562878+00:00 Sirius kernel: nouveau 0000:02:00.0: firmware: failed to load nouveau/nva5_fuc084 (-2)
2024-11-03T00:20:02.562909+00:00 Sirius kernel: nouveau 0000:02:00.0: firmware: failed to load nouveau/nva5_fuc084 (-2)
2024-11-03T00:20:02.562913+00:00 Sirius kernel: nouveau 0000:02:00.0: Direct firmware load for nouveau/nva5_fuc084 failed with error -2
2024-11-03T00:20:02.562914+00:00 Sirius kernel: nouveau 0000:02:00.0: firmware: failed to load nouveau/nva5_fuc084d (-2)
2024-11-03T00:20:02.562916+00:00 Sirius kernel: nouveau 0000:02:00.0: firmware: failed to load nouveau/nva5_fuc084d (-2)
2024-11-03T00:20:02.562917+00:00 Sirius kernel: nouveau 0000:02:00.0: Direct firmware load for nouveau/nva5_fuc084d failed with error -2
2024-11-03T00:20:02.562918+00:00 Sirius kernel: nouveau 0000:02:00.0: msvld: unable to load firmware data
2024-11-03T00:20:02.562919+00:00 Sirius kernel: nouveau 0000:02:00.0: msvld: init failed, -19
```

This is an old graphical card (from around 2010) and it is not maintained anymore. Nvidia firmware is not shipped by any debian packages nowadays.

**Solution**:

**Nouveau website**: https://nouveau.freedesktop.org/VideoAcceleration.html

**Debian Nvidia**: https://wiki.debian.org/NvidiaGraphicsDrivers

**Debian bug report**: https://bugs-devel.debian.org/cgi-bin/bugreport.cgi?bug=990662#22

**Nvidia driver**: https://us.download.nvidia.com/XFree86/Linux-x86_64/340.108/NVIDIA-Linux-x86_64-340.108.run

```shell
% wget https://raw.githubusercontent.com/envytools/firmware/master/extract_firmware.py
% wget https://download.nvidia.com/XFree86/Linux-x86_64/340.108/NVIDIA-Linux-x86_64-340.108.run
% sh NVIDIA-Linux-x86_64-340.108.run --extract-only
% python3 extract_firmware.py
% sudo mkdir /lib/firmware/nouveau
% sudo cp nvd9_fuc084 /lib/firmware/nouveau
```

It didn't work! I had to install via `nvidia-driver` and after reboot manually load the driver `modprobe nouveau`.

**Status**:

**nouveau** module is loaded and running:

```shell
althaser@Sirius:~ $ lsmod |grep nouveau
nouveau              3153920  28
drm_gpuvm              45056  1 nouveau
mxm_wmi                12288  1 nouveau
drm_exec               12288  2 drm_gpuvm,nouveau
gpu_sched              65536  1 nouveau
drm_display_helper    270336  1 nouveau
drm_ttm_helper         16384  2 nouveau
ttm                   102400  2 drm_ttm_helper,nouveau
i2c_algo_bit           12288  1 nouveau
drm_kms_helper        249856  3 drm_display_helper,drm_ttm_helper,nouveau
button                 24576  1 nouveau
drm                   765952  19 gpu_sched,drm_kms_helper,drm_exec,drm_gpuvm,drm_display_helper,drm_ttm_helper,ttm,nouveau
video                  81920  2 samsung_laptop,nouveau
wmi                    32768  3 video,mxm_wmi,nouveau

althaser@Sirius:~ $ dpkg -l |grep nvidia
ii  firmware-nvidia-gsp                              535.183.06-2                              amd64        NVIDIA GSP firmware
ii  glx-alternative-nvidia                           1.2.2                                     amd64        allows the selection of NVIDIA as GLX provider
ii  libegl-nvidia0:amd64                             535.183.06-2                              amd64        NVIDIA binary EGL library
ii  libegl-nvidia0:i386                              535.183.06-2                              i386         NVIDIA binary EGL library
ii  libgl1-nvidia-glvnd-glx:amd64                    535.183.06-2                              amd64        NVIDIA binary OpenGL/GLX library (GLVND variant)
ii  libgl1-nvidia-glvnd-glx:i386                     535.183.06-2                              i386         NVIDIA binary OpenGL/GLX library (GLVND variant)
ii  libgles-nvidia1:amd64                            535.183.06-2                              amd64        NVIDIA binary OpenGL|ES 1.x library
ii  libgles-nvidia1:i386                             535.183.06-2                              i386         NVIDIA binary OpenGL|ES 1.x library
ii  libgles-nvidia2:amd64                            535.183.06-2                              amd64        NVIDIA binary OpenGL|ES 2.x library
ii  libgles-nvidia2:i386                             535.183.06-2                              i386         NVIDIA binary OpenGL|ES 2.x library
ii  libglx-nvidia0:amd64                             535.183.06-2                              amd64        NVIDIA binary GLX library
ii  libglx-nvidia0:i386                              535.183.06-2                              i386         NVIDIA binary GLX library
ii  libnvidia-allocator1:amd64                       535.183.06-2                              amd64        NVIDIA allocator runtime library
ii  libnvidia-allocator1:i386                        535.183.06-2                              i386         NVIDIA allocator runtime library
ii  libnvidia-cfg1:amd64                             535.183.06-2                              amd64        NVIDIA binary OpenGL/GLX configuration library
ii  libnvidia-egl-gbm1:amd64                         1.1.2-1                                   amd64        GBM EGL external platform library for NVIDIA
ii  libnvidia-egl-gbm1:i386                          1.1.2-1                                   i386         GBM EGL external platform library for NVIDIA
ii  libnvidia-egl-wayland1:amd64                     1:1.1.16-1                                amd64        Wayland EGL External Platform library -- shared library
ii  libnvidia-egl-wayland1:i386                      1:1.1.16-1                                i386         Wayland EGL External Platform library -- shared library
ii  libnvidia-eglcore:amd64                          535.183.06-2                              amd64        NVIDIA binary EGL core libraries
ii  libnvidia-eglcore:i386                           535.183.06-2                              i386         NVIDIA binary EGL core libraries
ii  libnvidia-encode1:amd64                          535.183.06-2                              amd64        NVENC Video Encoding runtime library
ii  libnvidia-encode1:i386                           535.183.06-2                              i386         NVENC Video Encoding runtime library
ii  libnvidia-glcore:amd64                           535.183.06-2                              amd64        NVIDIA binary OpenGL/GLX core libraries
ii  libnvidia-glcore:i386                            535.183.06-2                              i386         NVIDIA binary OpenGL/GLX core libraries
ii  libnvidia-glvkspirv:amd64                        535.183.06-2                              amd64        NVIDIA binary Vulkan Spir-V compiler library
ii  libnvidia-glvkspirv:i386                         535.183.06-2                              i386         NVIDIA binary Vulkan Spir-V compiler library
ii  libnvidia-ml1:amd64                              535.183.06-2                              amd64        NVIDIA Management Library (NVML) runtime library
ii  libnvidia-pkcs11-openssl3:amd64                  535.183.06-2                              amd64        NVIDIA PKCS #11 Library (OpenSSL 3)
ii  libnvidia-ptxjitcompiler1:amd64                  535.183.06-2                              amd64        NVIDIA PTX JIT Compiler library
ii  libnvidia-ptxjitcompiler1:i386                   535.183.06-2                              i386         NVIDIA PTX JIT Compiler library
ii  libnvidia-rtcore:amd64                           535.183.06-2                              amd64        NVIDIA binary Vulkan ray tracing (rtcore) library
ii  nvidia-alternative                               535.183.06-2                              amd64        allows the selection of NVIDIA as GLX provider
ii  nvidia-driver                                    535.183.06-2                              amd64        NVIDIA metapackage
ii  nvidia-driver-bin                                535.183.06-2                              amd64        NVIDIA driver support binaries
ii  nvidia-driver-libs:amd64                         535.183.06-2                              amd64        NVIDIA metapackage (OpenGL/GLX/EGL/GLES libraries)
ii  nvidia-driver-libs:i386                          535.183.06-2                              i386         NVIDIA metapackage (OpenGL/GLX/EGL/GLES libraries)
ii  nvidia-egl-common                                535.183.06-2                              amd64        NVIDIA binary EGL driver - common files
ii  nvidia-egl-icd:amd64                             535.183.06-2                              amd64        NVIDIA EGL installable client driver (ICD)
ii  nvidia-egl-icd:i386                              535.183.06-2                              i386         NVIDIA EGL installable client driver (ICD)
ii  nvidia-installer-cleanup                         20240109+1                                amd64        cleanup after driver installation with the nvidia-installer
ii  nvidia-kernel-common                             20240109+1                                amd64        NVIDIA binary kernel module support files
ii  nvidia-kernel-dkms                               535.183.06-2                              amd64        NVIDIA binary kernel module DKMS source
ii  nvidia-kernel-support                            535.183.06-2                              amd64        NVIDIA binary kernel module support files
ii  nvidia-legacy-check                              535.183.06-2                              amd64        check for NVIDIA GPUs requiring a legacy driver
ii  nvidia-modprobe                                  550.78-1                                  amd64        utility to load NVIDIA kernel modules and create device nodes
ii  nvidia-persistenced                              535.171.04-1                              amd64        daemon to maintain persistent software state in the NVIDIA driver
ii  nvidia-settings                                  535.171.04-1                              amd64        tool for configuring the NVIDIA graphics driver
ii  nvidia-smi                                       535.183.06-2                              amd64        NVIDIA System Management Interface
ii  nvidia-support                                   20240109+1                                amd64        NVIDIA binary graphics driver support files
ii  nvidia-suspend-common                            535.183.06-2                              amd64        NVIDIA driver - systemd power management scripts
ii  nvidia-vdpau-driver:amd64                        535.183.06-2                              amd64        Video Decode and Presentation API for Unix - NVIDIA driver
ii  nvidia-vulkan-common                             535.183.06-2                              amd64        NVIDIA Vulkan driver - common files
ii  nvidia-vulkan-icd:amd64                          535.183.06-2                              amd64        NVIDIA Vulkan installable client driver (ICD)
ii  nvidia-vulkan-icd:i386                           535.183.06-2                              i386         NVIDIA Vulkan installable client driver (ICD)
ii  xserver-xorg-video-nvidia                        535.183.06-2                              amd64        NVIDIA binary Xorg driver

althaser@Sirius:~ $ tree /lib/firmware/nvidia/
/lib/firmware/nvidia/
└── 535.183.06
    ├── gsp_ga10x.bin
    └── gsp_tu10x.bin
2 directories, 2 files
```

None of this is needed! because those complained firmware files are only needed for **video decoding**. Thus, let's revert all changes and use `lightdm` with `nouveau`.

```shell
althaser@Sirius:~ $ sudo apt purge *nvidia*

althaser@Sirius:~ $ rm /etc/X11/xorg.conf

althaser@Sirius:~ $ sudo apt install lightdm

althaser@Sirius:~ $ systemctl reboot

althaser@Sirius:~ $ tree /usr/lib/modprobe.d/
/usr/lib/modprobe.d/
├── aliases.conf
├── fbdev-blacklist.conf
└── systemd.conf

1 directory, 3 files
althaser@Sirius:~ $ tree /etc/modprobe.d/
/etc/modprobe.d/
├── dkms.conf
├── intel-microcode-blacklist.conf
└── mdadm.conf
1 directory, 3 files
```

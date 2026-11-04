---
title: "Webcam"
date: 2026-11-04
tags: ["webcam", "v4l2", "udev", "teams", "gamma", "cli"]
categories: ["linux", "software", "applications", "tools"]
description: "Webcam Too Dark"
draft: false
hero_images:
  - src: "https://static.gnome.org/catalog/app-icon/scalable/org.gnome.Snapshot.svg"
    alt: "webcam"
    width: "80"
    height: "80"
---

**Webcam too dark in Teams.** This mostly happens when the camera is pointing towards a window, or sits at 90º to a strong light source: the auto exposure adapts to the bright background and my face ends up in the dark. Brightness and exposure did not help much, the real deal was adjusting the **gamma** value with `v4l2-ctl`.

{{< toc >}}

## Adjust the gamma

Install `v4l-utils`, set the gamma on the webcam and confirm the new value:

```shell
$ sudo apt install v4l-utils

$ v4l2-ctl -d /dev/video0 -c gamma=160

$ v4l2-ctl -d /dev/video0 --get-ctrl=gamma
gamma: 160
```

`--list-ctrls` shows every control the camera supports, with its minimum, maximum and default values. On this webcam the gamma goes from 100 to 300 and the default is 100, so 160 brightens the dark areas without washing out the image:

```shell
$ v4l2-ctl -d /dev/video0 --list-ctrls
User Controls

                     brightness 0x00980900 (int)    : min=-64 max=64 step=1 default=0 value=0 flags=has-min-max
                       contrast 0x00980901 (int)    : min=0 max=95 step=1 default=0 value=0 flags=has-min-max
                     saturation 0x00980902 (int)    : min=0 max=100 step=1 default=64 value=64 flags=has-min-max
                            hue 0x00980903 (int)    : min=-2000 max=2000 step=1 default=0 value=0 flags=has-min-max
        white_balance_automatic 0x0098090c (bool)   : default=1 value=1
                          gamma 0x00980910 (int)    : min=100 max=300 step=1 default=100 value=160 flags=has-min-max
                           gain 0x00980913 (int)    : min=1 max=8 step=1 default=1 value=5 flags=has-min-max
           power_line_frequency 0x00980918 (menu)   : min=0 max=2 default=2 value=1 (50 Hz)
      white_balance_temperature 0x0098091a (int)    : min=2800 max=6500 step=10 default=4600 value=4690 flags=inactive, has-min-max
                      sharpness 0x0098091b (int)    : min=1 max=7 step=1 default=2 value=2 flags=has-min-max
         backlight_compensation 0x0098091c (int)    : min=0 max=3 step=1 default=3 value=3 flags=has-min-max
   region_of_interest_rectangle 0x00981ae1 (rect)   : value=(0,0)/1x1 flags=has-payload, has-min-max
  region_of_interest_auto_ctrls 0x00981ae2 (bitmask): max=0x00000001 default=0x00000001 value=0x00000000 flags=has-min-max

Camera Controls

                  auto_exposure 0x009a0901 (menu)   : min=0 max=3 default=3 value=3 (Aperture Priority Mode)
         exposure_time_absolute 0x009a0902 (int)    : min=10 max=700 step=1 default=156 value=156 flags=inactive, has-min-max
     exposure_dynamic_framerate 0x009a0903 (bool)   : default=0 value=1
                        privacy 0x009a0910 (bool)   : default=0 value=0 flags=read-only
```

## Make it permanent

The value is lost when the webcam is unplugged or the machine restarts. A **udev** rule applies it again every time the camera is added. `idVendor` and `idProduct` identify the webcam (`lsusb` shows them) and `ATTR{index}=="0"` matches only its main video node:

```shell
$ lsusb |grep -i webcam
Bus 003 Device 003: ID 0bda:5598 Realtek Semiconductor Corp. Integrated_Webcam_FHD

$ sudo tee /etc/udev/rules.d/99-webcam-gamma.rules << 'EOF'
ACTION=="add", SUBSYSTEM=="video4linux", ATTRS{idVendor}=="0bda", ATTRS{idProduct}=="5598", ATTR{index}=="0", RUN+="/usr/bin/v4l2-ctl -d $devnode -c gamma=160"
EOF

$ sudo udevadm control --reload-rules
```

This way it works after a restart.

## Test without restarting

Put the gamma back to the default value (100), trigger the udev `add` event and check that the rule set it to 160 again:

```shell
$ v4l2-ctl -d /dev/video0 -c gamma=100

$ sudo udevadm trigger --action=add --subsystem-match=video4linux

$ v4l2-ctl -d /dev/video0 --get-ctrl=gamma
gamma: 160
```

---
title: "Wireguard"
date: 2025-01-26
tags: ["security", "vpn", "wireguard", "networking"]
categories: ["linux", "software", "applications", "tools", "raspberrypi"]
description: "Wireguard"
draft: false
hero_images:
  - src: "https://www.wireguard.com/img/wireguard.svg"
    alt: "wireguard"
    width: "400"
    height: "71"
---

**WireGuard** is a simple, fast and modern VPN implementation. It is widely deployed and can be used cross-platform.

Step by step guide to set up a WireGuard VPN with a Raspberry Pi as the server: enabling IP forwarding, the UFW firewall, generating the server and client keys, the NAT configuration and running it as a systemd service. Then the client side on a Linux laptop, from connecting and checking the tunnel to importing it into GNOME NetworkManager.

{{< toc >}}

## Setup WireGuard

### Server - Raspberry Pi
{{< img src="https://www.raspberrypi.com/app/uploads/2020/06/raspberrry_pi_logo.png" alt="raspberypi" width="50" height="50" >}}

1. **Enable Port Fowarding** via **systctl.conf** setting up the following
```shell
root@raspberrypi:~# vim /etc/sysctl.conf
net.ipv4.ip_forward = 1
```

2. Reload **sysctl** configurations.
```shell
root@raspberrypi:~# sysctl -p
```

3. Install **ufw** firewall.
```shell
root@raspberrypi:~# apt install ufw
```

4. Allow **openssh** and enable **ufw**.
```shell
root@raspberrypi:~# ufw allow openssh

root@raspberrypi:~# ufw enable
Firewall is active and enabled on system startup

root@raspberrypi:~# ufw status
Status: active
To                         Action      From
--                         ------      ----
OpenSSH                    ALLOW       Anywhere
OpenSSH (v6)               ALLOW       Anywhere (v6)
```

5. Install **WireGuard**.
```shell
root@raspberrypi:~# apt install wireguard
```

6. Generate WireGuard Server keys (**privatekey** and **publickey**).
```shell
root@raspberrypi:~# cd /etc/wireguard/

root@raspberrypi:/etc/wireguard# umask 077; wg genkey | tee privatekey | wg pubkey > publickey

root@raspberrypi:/etc/wireguard# ls -lah /etc/wireguard/
total 24K
drwx------   2 root root 4.0K Jan 25 23:06 .
drwxr-xr-x 136 root root  12K Jan 25 23:06 ..
-rw-------   1 root root   45 Jan 25 22:56 privatekey
-rw-------   1 root root   45 Jan 25 22:56 publickey
```

7. Generate **WireGuard** Client keys.
```shell
root@raspberrypi:~# mkdir -p /etc/wireguard/clients/beja

root@raspberrypi:~# tree /etc/wireguard/
/etc/wireguard/
├── clients
│   └── beja
├── privatekey
└── publickey
3 directories, 2 files

root@raspberrypi:~# wg genkey | tee /etc/wireguard/clients/beja/beja.key
<client-private-key>

root@raspberrypi:~# cat /etc/wireguard/clients/beja/beja.key | wg pubkey | tee /etc/wireguard/clients/beja/beja.pub
<client-public-key>

root@raspberrypi:~# chmod 400 /etc/wireguard/{privatekey,publickey} /etc/wireguard/clients/beja/beja.{key,pub}
```

8. Check default **gateway** interface that is used to connect to the internet.
```shell
root@raspberrypi:/etc/wireguard# ip route list default
default via 192.168.1.1 dev wlan0 proto dhcp src 192.168.1.13 metric 600
```

9. Create **WireGuard** configuration `/etc/wireguard/wg-rasp.conf` and replace the interface in NAT configuration section from the previous step. `<wg-rasp>` and `<wlan0>`.
```shell
root@raspberrypi:~# vim /etc/wireguard/wg-rasp.conf
[Interface]
# Wireguard interface will be run at 10.20.0.1
Address = 10.20.0.1/24
# Ensure any changes will be saved to the WireGuard config file
SaveConfig = true
# Setting up NAT for Wireguard Interface
PostUp = ufw route allow in on <wg-rasp> out on <wlan0>
PostUp = iptables -t nat -I POSTROUTING -o <wlan0> -j MASQUERADE
PostUp = ip6tables -t nat -I POSTROUTING -o <wlan0> -j MASQUERADE
PreDown = ufw route delete allow in on <wg-rasp> out on <wlan0>
PreDown = iptables -t nat -D POSTROUTING -o <wlan0> -j MASQUERADE
PreDown = ip6tables -t nat -D POSTROUTING -o <wlan0> -j MASQUERADE
# Clients will connect to UDP port 51820
ListenPort = 51820
# WireGuard Server private key
PrivateKey = <server-private-key>

[Peer]
# WireGuard client public key - beja.pub
PublicKey = <client-public-key>

# clients VPN IP address you allow to connect
# Possible to specify subnet -> [10.20.0.0/24]
AllowedIPs = 10.20.0.2/32
```

10. Add `51820/udp` rule to **ufw** firewall.
```shell
root@raspberrypi:/etc/wireguard# ufw allow 51820/udp
Rule added
Rule added (v6)

root@raspberrypi:/etc/wireguard# ufw status
Status: active
To                         Action      From
--                         ------      ----
OpenSSH                    ALLOW       Anywhere
51820/udp                  ALLOW       Anywhere
OpenSSH (v6)               ALLOW       Anywhere (v6)
51820/udp (v6)             ALLOW       Anywhere (v6)
```

11. Managing **WireGuard** service.
```shell
root@raspberrypi:/etc/wireguard# systemctl start wg-quick@wg-rasp.service

root@raspberrypi:/etc/wireguard# systemctl enable wg-quick@wg-rasp.service
Created symlink /etc/systemd/system/multi-user.target.wants/wg-quick@wg-rasp.service → /lib/systemd/system/wg-quick@.service.

root@raspberrypi:/etc/wireguard# systemctl status wg-quick@wg-rasp.service
● wg-quick@wg-rasp.service - WireGuard via wg-quick(8) for wg-rasp
     Loaded: loaded (/lib/systemd/system/wg-quick@.service; enabled; preset: enabled)
     Active: active (exited) since Sat 2025-01-25 23:20:02 WET; 27s ago
       Docs: man:wg-quick(8)
             man:wg(8)
             https://www.wireguard.com/
             https://www.wireguard.com/quickstart/
             https://git.zx2c4.com/wireguard-tools/about/src/man/wg-quick.8
             https://git.zx2c4.com/wireguard-tools/about/src/man/wg.8
   Main PID: 4346 (code=exited, status=0/SUCCESS)
        CPU: 176ms
Jan 25 23:20:02 raspberrypi wg-quick[4346]: [#] wg setconf wg-rasp /dev/fd/63
Jan 25 23:20:02 raspberrypi wg-quick[4362]: Warning: AllowedIP has nonzero host part: 10.20.0>
Jan 25 23:20:02 raspberrypi wg-quick[4346]: [#] ip -4 address add 10.20.0.1/24 dev wg-rasp
Jan 25 23:20:02 raspberrypi wg-quick[4346]: [#] ip link set mtu 1420 up dev wg-rasp
Jan 25 23:20:02 raspberrypi wg-quick[4346]: [#] ufw route allow in on wg-rasp out on wlan0
Jan 25 23:20:02 raspberrypi wg-quick[4377]: Rule added
Jan 25 23:20:02 raspberrypi wg-quick[4377]: Rule added (v6)
Jan 25 23:20:02 raspberrypi wg-quick[4346]: [#] iptables -t nat -I POSTROUTING -o wlan0 -j MA>
Jan 25 23:20:02 raspberrypi wg-quick[4346]: [#] ip6tables -t nat -I POSTROUTING -o wlan0 -j M>
Jan 25 23:20:02 raspberrypi systemd[1]: Finished wg-quick@wg-rasp.service - WireGuard via wg-quic>

root@raspberrypi:/etc/wireguard# ip a show wg-rasp
5: wg-rasp: <POINTOPOINT,NOARP,UP,LOWER_UP> mtu 1420 qdisc noqueue state UNKNOWN group default qlen 1000
    link/none
    inet 10.20.0.1/24 scope global wg-rasp
       valid_lft forever preferred_lft forever

root@raspberrypi:/etc/wireguard# ip --color a show wg-rasp
5: wg-rasp: <POINTOPOINT,NOARP,UP,LOWER_UP> mtu 1420 qdisc noqueue state UNKNOWN group default qlen 1000
    link/none
    inet 10.20.0.1/24 scope global wg-rasp
       valid_lft forever preferred_lft forever
```

12. Manual managing **WireGuard** connections.
```shell
$ sudo wg-quick up /etc/wireguard/wg-rasp.conf
$ sudo wg-quick down /etc/wireguard/wg-rasp.conf
```

13. Check all configurations.
```shell
root@raspberrypi:~# sudo tree /etc/wireguard/
/etc/wireguard/
├── clients
│   └── beja
        └── beja.key
        └── beja.pub
├── privatekey
└── publickey
└── wg-rasp.conf
3 directories, 5 files
```

### Client - Laptop
{{< img src="https://static.thenounproject.com/png/1388614-200.png" alt="laptop" width="80" height="80" >}}

1. Install **WireGuard**.
```shell
root@laptop:~# apt install wireguard-tools
```

2. Create **WireGuard** configurations.
```shell
root@laptop:~# vim /etc/wireguard/wg-rasp-beja.conf
[Interface]
# Define the IP address for the client - must be matched with wg-rasp on the Wireguard Server
Address = 10.20.0.2/24

# specific DNS Server
DNS = 1.1.1.1

# Private key for the client - alice.key
PrivateKey = <client-private-key>

[Peer]
# Public key of the Wireguard server - server.pub
PublicKey = <server-public-key>

# Allow all traffic to be routed via Wireguard VPN
AllowedIPs = 0.0.0.0/0

# Public IP address of the Wireguard Server
Endpoint = 192.168.1.13:51820

# Sending Keepalive every 25 sec
PersistentKeepalive = 25
```

3. Start **WireGuard** connection.
```shell
root@laptop:~# wg-quick up wg-rasp-beja
[#] ip link add wg-rasp-beja type wireguard
[#] wg setconf wg-rasp-beja /dev/fd/63
[#] ip -4 address add 10.20.0.2/24 dev wg-rasp-beja
[#] ip link set mtu 1420 up dev wg-rasp-beja
[#] resolvconf -a wg-rasp-beja -m 0 -x
[#] wg set wg-rasp-beja fwmark 51820
[#] ip -4 rule add not fwmark 51820 table 51820
[#] ip -4 rule add table main suppress_prefixlength 0
[#] ip -4 route add 0.0.0.0/0 dev wg-rasp-beja table 51820
[#] sysctl -q net.ipv4.conf.all.src_valid_mark=1
[#] nft -f /dev/fd/63
```

4. Check connections
```shell
root@laptop:~# ip a show wg-rasp-beja
13: wg-rasp-beja: <POINTOPOINT,NOARP,UP,LOWER_UP> mtu 1420 qdisc noqueue state UNKNOWN group default qlen 1000
    link/none
    inet 10.20.0.2/24 scope global wg-rasp-beja
       valid_lft forever preferred_lft forever

root@laptop:~# ping -c3 10.20.0.1
PING 10.20.0.1 (10.20.0.1) 56(84) bytes of data.
64 bytes from 10.20.0.1: icmp_seq=1 ttl=64 time=4.02 ms
64 bytes from 10.20.0.1: icmp_seq=2 ttl=64 time=6.69 ms
64 bytes from 10.20.0.1: icmp_seq=3 ttl=64 time=7.01 ms
--- 10.20.0.1 ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2003ms
rtt min/avg/max/mdev = 4.017/5.905/7.009/1.341 ms

root@laptop:~# ping -c3 10.20.0.2
PING 10.20.0.2 (10.20.0.2) 56(84) bytes of data.
64 bytes from 10.20.0.2: icmp_seq=1 ttl=64 time=0.077 ms
64 bytes from 10.20.0.2: icmp_seq=2 ttl=64 time=0.062 ms
64 bytes from 10.20.0.2: icmp_seq=3 ttl=64 time=0.058 ms
--- 10.20.0.2 ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2035ms
rtt min/avg/max/mdev = 0.058/0.065/0.077/0.008 ms

root@laptop:~# ping -c3 1.1.1.1
PING 1.1.1.1 (1.1.1.1) 56(84) bytes of data.
64 bytes from 1.1.1.1: icmp_seq=1 ttl=58 time=26.0 ms
64 bytes from 1.1.1.1: icmp_seq=2 ttl=58 time=27.1 ms
64 bytes from 1.1.1.1: icmp_seq=3 ttl=58 time=28.5 ms
--- 1.1.1.1 ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2002ms
rtt min/avg/max/mdev = 26.007/27.202/28.545/1.041 ms

root@laptop:~# ping -c3 google.com
PING google.com (2a00:1450:4003:80d::200e) 56 data bytes
64 bytes from mad07s24-in-x0e.1e100.net (2a00:1450:4003:80d::200e): icmp_seq=1 ttl=118 time=29.2 ms
64 bytes from mad07s24-in-x0e.1e100.net (2a00:1450:4003:80d::200e): icmp_seq=2 ttl=118 time=29.7 ms
64 bytes from mad07s24-in-x0e.1e100.net (2a00:1450:4003:80d::200e): icmp_seq=3 ttl=118 time=24.3 ms
--- google.com ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2004ms
rtt min/avg/max/mdev = 24.318/27.749/29.713/2.434 ms

root@laptop:~# sudo wg show
interface: wg-rasp-beja
  public key: <client-public-key>
  private key: (hidden)
  listening port: 42869
  fwmark: 0xca6c

peer: <server-public-key>
  endpoint: 192.168.1.13:51820
  allowed ips: 0.0.0.0/0
  latest handshake: 1 minute, 12 seconds ago
  transfer: 1.89 MiB received, 1.75 MiB sent
  persistent keepalive: every 25 seconds
```

5. Manage connection
```shell
$ sudo wg-quick down wg-rasp-beja
```

6. Check configurations.
```shell
root@laptop:~# tree /etc/wireguard/
/etc/wireguard/
├── wg-rasp-beja.conf
└── wg-tank-beja.conf

1 directory, 2 files
```

7. Import to GNOME NetworkManager sessions:
```shell
pbeja@cspt0060:~ $ sudo nmcli connection import type wireguard file /etc/wireguard/wg-elara.conf
Connection 'wg-elara' (2f88f973-5bfb-46ee-a6c0-33d8dbf12de9) successfully added.

pbeja@cspt0060:~ $ nmcli connection modify wg-elara connection.autoconnect no
```

8. done :)

### Reference links
- https://wiki.debian.org/WireGuard
- https://www.howtoforge.com/guide-to-install-wireguard-vpn-on-debian-12/
- https://documentation.ubuntu.com/server/explanation/intro-to/wireguard-vpn
- https://docs.vultr.com/how-to-install-wireguard-vpn-on-ubuntu-24-04

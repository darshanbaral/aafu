---
title: "Raspberry Pi"
date: 2025-01-27
tags: ["security", "vpn", "monitoring", "docker", "raspberry-pi"]
categories: ["linux", "software", "applications", "tools", "raspberrypi"]
description: "Raspberry Pi"
draft: false
hero_images:
  - src: "https://www.raspberrypi.com/app/uploads/2020/06/raspberrry_pi_logo.png"
    alt: "raspberypi"
    width: "150px"
    height: "150px"
---

**Raspberry Pi** Micro Computing or single-board computer (SBC).

Setting up and maintaining a Raspberry Pi as a home server: locking the screen, keeping the firmware up to date, hardening the firewall with UFW, monitoring with Node Exporter, running services on Docker Swarm, blocking ads with Pi-hole, dynamic DNS with No-IP, SSH access only through the VPN, and some troubleshooting.

{{< toc >}}

## Lock Screen
1. Use command below:
```shell
althaser@raspberrypi:~ $ dm-tool lock
```



## Update Firmware and BIOS
1. Check Raspberry Pi firmware.

https://linuxconfig.org/how-to-check-firmware-version-on-raspberry-pi

```shell
althaser@raspberrypi:~ $ vcgencmd version
2024/09/23 14:02:56
Copyright (c) 2012 Broadcom
version 26826259 (release) (embedded)
```

2. Update Raspberry Pi firmware.
```shell
althaser@raspberrypi:~ $ sudo rpi-update
 *** Raspberry Pi firmware updater by Hexxeh, enhanced by AndrewS and Dom
 *** Performing self-update
 *** Relaunching after update
 *** Raspberry Pi firmware updater by Hexxeh, enhanced by AndrewS and Dom
FW_REV:9c6e044ee0de7c167f38fa3fae4ffa9b74b2a3f6
BOOTLOADER_REV:b67b21ddda8b6468090fcdc5034bb075344a8903
 *** We're running for the first time
 *** Backing up files (this will take a few minutes)
 *** Remove old firmware backup
 *** Backing up firmware
 *** Remove old modules backup
 *** Backing up modules 6.6.62+rpt-rpi-2712
WANT_32BIT:0 WANT_64BIT:1 WANT_PI4:1 WANT_PI5:1
##############################################################
WARNING: This update bumps to rpi-6.6.y linux tree
See: https://forums.raspberrypi.com/viewtopic.php?p=2191175
'rpi-update' should only be used if there is a specific
reason to do so - for example, a request by a Raspberry Pi
engineer or if you want to help the testing effort
and are comfortable with restoring if there are regressions.
DO NOT use 'rpi-update' as part of a regular update process.
##############################################################
Would you like to proceed? (y/N)


althaser@raspberrypi:~ $ sudo rpi-eeprom-update
*** UPDATE AVAILABLE ***
Run "sudo rpi-eeprom-update -a" to install this update now.
To configure the bootloader update policy run "sudo raspi-config"
BOOTLOADER: update available
   CURRENT: Mon 23 Sep 13:02:56 UTC 2024 (1727096576)
    LATEST: Wed 22 Jan 00:16:51 UTC 2025 (1737505011)
   RELEASE: default (/usr/lib/firmware/raspberrypi/bootloader-2712/default)
            Use raspi-config to change the release.


althaser@raspberrypi:~ $ sudo rpi-update
 *** Raspberry Pi firmware updater by Hexxeh, enhanced by AndrewS and Dom
 *** Performing self-update
 *** Relaunching after update
 *** Raspberry Pi firmware updater by Hexxeh, enhanced by AndrewS and Dom
FW_REV:9c6e044ee0de7c167f38fa3fae4ffa9b74b2a3f6
BOOTLOADER_REV:b67b21ddda8b6468090fcdc5034bb075344a8903
 *** Your firmware is already up to date (delete /boot/firmware/.firmware_revision and /boot/firmware/.bootloader_revision to force an update anyway)

althaser@raspberrypi:~ $ sudo rpi-eeprom-update
BOOTLOADER: up to date
   CURRENT: Wed 22 Jan 00:16:51 UTC 2025 (1737505011)
    LATEST: Wed 22 Jan 00:16:51 UTC 2025 (1737505011)
   RELEASE: latest (/usr/lib/firmware/raspberrypi/bootloader-2712/latest)
            Use raspi-config to change the release.


althaser@raspberrypi:~ $ vcgencmd version
2025/01/22 00:16:51
Copyright (c) 2012 Broadcom
version a7753063 (release) (embedded)
```



## Disable IPv6 via UFW
1. Check commands below:
```shell
althaser@raspberrypi:~ $ sudo ufw status
Status: active
To                         Action      From
--                         ------      ----
OpenSSH                    ALLOW       Anywhere
51820/udp                  ALLOW       Anywhere
OpenSSH (v6)               ALLOW       Anywhere (v6)
51820/udp (v6)             ALLOW       Anywhere (v6)
Anywhere on wlan0          ALLOW FWD   Anywhere on wg0
Anywhere on wlan0          ALLOW FWD   Anywhere on wg-rasp
Anywhere (v6) on wlan0     ALLOW FWD   Anywhere (v6) on wg0
Anywhere (v6) on wlan0     ALLOW FWD   Anywhere (v6) on wg-rasp


althaser@raspberrypi:~ $ sudo vim /etc/default/ufw
IPV6=no

althaser@raspberrypi:~ $ sudo ufw reload
Firewall reloaded

althaser@raspberrypi:~ $ sudo ufw status
Status: active
To                         Action      From
--                         ------      ----
OpenSSH                    ALLOW       Anywhere
51820/udp                  ALLOW       Anywhere
Anywhere on wlan0          ALLOW FWD   Anywhere on wg0
Anywhere on wlan0          ALLOW FWD   Anywhere on wg-rasp
```



## Systemd: Node Exporter
1. Download **Node Exporter**.
```shell
althaser@raspberrypi:~ $ wget https://github.com/prometheus/node_exporter/releases/download/v1.8.2/node_exporter-1.8.2.linux-arm64.tar.gz
```

2. Extract and Execute.
```shell
althaser@raspberrypi:~ $ tar xzvf node_exporter-1.8.2.linux-arm64.tar.gz
node_exporter-1.8.2.linux-arm64/
node_exporter-1.8.2.linux-arm64/NOTICE
node_exporter-1.8.2.linux-arm64/node_exporter
node_exporter-1.8.2.linux-arm64/LICENSE

althaser@raspberrypi:~ $ ls
node_exporter-1.8.2.linux-arm64  node_exporter-1.8.2.linux-arm64.tar.gz

althaser@raspberrypi:~ $ cd node_exporter-1.8.2.linux-arm64/

althaser@raspberrypi:~ $ ls
LICENSE  node_exporter  NOTICE

althaser@raspberrypi:~ $ ./node_exporter
....
ts=2025-01-26T15:41:06.769Z caller=node_exporter.go:118 level=info collector=watchdog
ts=2025-01-26T15:41:06.769Z caller=node_exporter.go:118 level=info collector=xfs
ts=2025-01-26T15:41:06.769Z caller=node_exporter.go:118 level=info collector=zfs
ts=2025-01-26T15:41:06.770Z caller=tls_config.go:313 level=info msg="Listening on" address=[::]:9100
ts=2025-01-26T15:41:06.770Z caller=tls_config.go:316 level=info msg="TLS is disabled." http2=false address=[::]:9100

althaser@raspberrypi:~ $ curl localhost:9100/metrics
...
process_virtual_memory_bytes 1.269219328e+09
# HELP process_virtual_memory_max_bytes Maximum amount of virtual memory available in bytes.
# TYPE process_virtual_memory_max_bytes gauge
process_virtual_memory_max_bytes 1.8446744073709552e+19
# HELP promhttp_metric_handler_errors_total Total number of internal errors encountered by the promhttp metric handler.
# TYPE promhttp_metric_handler_errors_total counter
promhttp_metric_handler_errors_total{cause="encoding"} 0
promhttp_metric_handler_errors_total{cause="gathering"} 0
# HELP promhttp_metric_handler_requests_in_flight Current number of scrapes being served.
# TYPE promhttp_metric_handler_requests_in_flight gauge
promhttp_metric_handler_requests_in_flight 1
# HELP promhttp_metric_handler_requests_total Total number of scrapes by HTTP status code.
# TYPE promhttp_metric_handler_requests_total counter
promhttp_metric_handler_requests_total{code="200"} 0
promhttp_metric_handler_requests_total{code="500"} 0
promhttp_metric_handler_requests_total{code="503"} 0

althaser@raspberrypi:~ $ sudo mkdir -p /usr/local/bin/node_exporter-1.8.2.linux-arm64
althaser@raspberrypi:~ $ mv node_exporter /usr/local/bin/node_exporter-1.8.2.linux-arm64/
althaser@raspberrypi:~ $ sudo chmod 644 /usr/local/bin/node_exporter-1.8.2.linux-arm64/node_exporter
```

3. Create **Systemd** Service.
```shell
althaser@raspberrypi:~ $ sudo vim /lib/systemd/system/node_exporter.service
[Unit]
Description=Node Exporter Service
After=multi-user.target

[Service]
Type=idle
ExecStart=/usr/local/bin/node_exporter-1.8.2.linux-arm64/node_exporter

[Install]
WantedBy=multi-user.target

althaser@raspberrypi: $ sudo systemctl daemon-reload

althaser@raspberrypi: $ sudo systemctl enable node_exporter
Created symlink /etc/systemd/system/multi-user.target.wants/node_exporter.service → /lib/systemd/system/node_exporter.service.

althaser@raspberrypi: $ sudo chmod +x /usr/local/bin/node_exporter-1.8.2.linux-arm64/node_exporter

althaser@raspberrypi: $ sudo systemctl start node_exporter

althaser@raspberrypi: $ sudo systemctl status node_exporter
● node_exporter.service - Node Exporter Service
     Loaded: loaded (/lib/systemd/system/node_exporter.service; enabled; preset: enabled)
     Active: active (running) since Sun 2025-01-26 15:51:35 WET; 1s ago
   Main PID: 3467 (node_exporter)
      Tasks: 5 (limit: 9559)
        CPU: 9ms
     CGroup: /system.slice/node_exporter.service
             └─3467 /usr/local/bin/node_exporter-1.8.2.linux-arm64/node_exporter
Jan 26 15:51:35 raspberrypi node_exporter[3467]: ts=2025-01-26T15:51:35.550Z caller=node_exporter.go:118 level=info collector=time
Jan 26 15:51:35 raspberrypi node_exporter[3467]: ts=2025-01-26T15:51:35.550Z caller=node_exporter.go:118 level=info collector=timex
Jan 26 15:51:35 raspberrypi node_exporter[3467]: ts=2025-01-26T15:51:35.550Z caller=node_exporter.go:118 level=info collector=udp_queues
Jan 26 15:51:35 raspberrypi node_exporter[3467]: ts=2025-01-26T15:51:35.550Z caller=node_exporter.go:118 level=info collector=uname
Jan 26 15:51:35 raspberrypi node_exporter[3467]: ts=2025-01-26T15:51:35.550Z caller=node_exporter.go:118 level=info collector=vmstat
Jan 26 15:51:35 raspberrypi node_exporter[3467]: ts=2025-01-26T15:51:35.550Z caller=node_exporter.go:118 level=info collector=watchdog
Jan 26 15:51:35 raspberrypi node_exporter[3467]: ts=2025-01-26T15:51:35.550Z caller=node_exporter.go:118 level=info collector=xfs
Jan 26 15:51:35 raspberrypi node_exporter[3467]: ts=2025-01-26T15:51:35.550Z caller=node_exporter.go:118 level=info collector=zfs
Jan 26 15:51:35 raspberrypi node_exporter[3467]: ts=2025-01-26T15:51:35.550Z caller=tls_config.go:313 level=info msg="Listening on" address=[::]:9100
Jan 26 15:51:35 raspberrypi node_exporter[3467]: ts=2025-01-26T15:51:35.550Z caller=tls_config.go:316 level=info msg="TLS is disabled." http2=false address=[::]:9100

althaser@raspberrypi:~ $ curl localhost:9100/metrics
...........
promhttp_metric_handler_errors_total{cause="encoding"} 0
promhttp_metric_handler_errors_total{cause="gathering"} 0
# HELP promhttp_metric_handler_requests_in_flight Current number of scrapes being served.
# TYPE promhttp_metric_handler_requests_in_flight gauge
promhttp_metric_handler_requests_in_flight 1
# HELP promhttp_metric_handler_requests_total Total number of scrapes by HTTP status code.
# TYPE promhttp_metric_handler_requests_total counter
promhttp_metric_handler_requests_total{code="200"} 0
promhttp_metric_handler_requests_total{code="500"} 0
promhttp_metric_handler_requests_total{code="503"} 0
```



## Docker Swarm
https://docs.docker.com/engine/swarm/swarm-tutorial/create-swarm/

1. Setup Docker Swarm Cluster
```shell
althaser@raspberrypi:~ $ docker swarm init --advertise-addr 192.168.1.6
Swarm initialized: current node (pltcacgj7aydgsi5tmkqp8nzb) is now a manager.

To add a worker to this swarm, run the following command:

    docker swarm join --token SWMTKN-1-OuDY9CYKHWSfySEYGZyf1EaGE6YtMbZA9NblHtWlpoe1O9eGTHmUaAYl0VzpEBad 192.168.1.6:2377

To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.

althaser@raspberrypi:~ $ docker node ls
ID                            HOSTNAME      STATUS    AVAILABILITY   MANAGER STATUS   ENGINE VERSION
pltcacgj7aydgsi5tmkqp8nzb *   raspberrypi   Ready     Active         Leader           27.5.1
```



## Deploy Docker Swarm Services
https://docs.docker.com/engine/swarm/swarm-tutorial/deploy-service/

1. There is a private gitlab repository https://gitlab.com/althaser/raspberry-pi-server with some stack files:
- Monitoring
- Noip
- Pihole
- Etc

### Deploy Monitoring
https://www.archy.net/building-a-monitoring-stack-on-docker-swarm-with-prometheus-grafana-and-influxdb/
https://medium.com/@adityar947/integrating-prometheus-and-grafana-with-docker-swarm-a-comprehensive-guide-42f2f6d94f78

```shell
althaser@raspberrypi:~ $ sudo docker stack deploy -c docker-swarm/monitoring/stack.yml monitoring
Since --detach=false was not specified, tasks will be created in the background.
In a future release, --detach=false will become the default.
Creating network monitoring_monitoring
Creating service monitoring_prometheus

althaser@raspberrypi:~ $ docker stack ls
NAME         SERVICES
monitoring   1

althaser@raspberrypi:~ $ docker network ls
NETWORK ID     NAME                    DRIVER    SCOPE
36e2168fca3e   bridge                  bridge    local
886b70c9cc7f   docker_gwbridge         bridge    local
2bec9cd84700   host                    host      local
z4c82jty2t9c   ingress                 overlay   swarm
k8qudczk5ec4   monitoring_monitoring   overlay   swarm
e79c66ad650c   none                    null      local

althaser@raspberrypi:~ $ docker service ls
ID             NAME                    MODE         REPLICAS   IMAGE                    PORTS
znmi30cxdq6r   monitoring_prometheus   replicated   1/1        prom/prometheus:v3.1.0   *:9090->9090/tcp

althaser@raspberrypi:~ $ docker service inspect monitoring_prometheus --pretty

althaser@raspberrypi:~ $ sudo ufw allow 9090
Rule added

althaser@raspberrypi:~ $ sudo ufw status
Status: active
To                         Action      From
--                         ------      ----
OpenSSH                    ALLOW       Anywhere
51820/udp                  ALLOW       Anywhere
9090                       ALLOW       Anywhere
Anywhere on wlan0          ALLOW FWD   Anywhere on wg0
Anywhere on wlan0          ALLOW FWD   Anywhere on wg-rasp

althaser@raspberrypi:~ $ curl -v http://localhost:9090
*   Trying 127.0.0.1:9090...
* Connected to localhost (127.0.0.1) port 9090 (#0)
> GET / HTTP/1.1
> Host: localhost:9090
> User-Agent: curl/7.88.1
> Accept: */*
>
< HTTP/1.1 302 Found
< Content-Type: text/html; charset=utf-8
< Location: /query
< Date: Sun, 26 Jan 2025 19:15:42 GMT
< Content-Length: 29
<
<a href="/query">Found</a>.
* Connection #0 to host localhost left intact

althaser@raspberrypi:~ $ curl -v http://192.168.1.13:9090
*   Trying 192.168.1.13:9090...
* Connected to 192.168.1.13 (192.168.1.13) port 9090 (#0)
> GET / HTTP/1.1
> Host: 192.168.1.13:9090
> User-Agent: curl/7.88.1
> Accept: */*
>
< HTTP/1.1 302 Found
< Content-Type: text/html; charset=utf-8
< Location: /query
< Date: Sun, 26 Jan 2025 19:16:12 GMT
< Content-Length: 29
<
<a href="/query">Found</a>.
* Connection #0 to host 192.168.1.13 left intact
```

Acccess Prometheus UI: http://192.168.1.13:9090/query

```shell
althaser@raspberrypi:~ $ curl -v http://192.168.1.13:9100/metrics
....
# HELP promhttp_metric_handler_errors_total Total number of internal errors encountered by the promhttp metric handler.
# TYPE promhttp_metric_handler_errors_total counter
promhttp_metric_handler_errors_total{cause="encoding"} 0
promhttp_metric_handler_errors_total{cause="gathering"} 0
# HELP promhttp_metric_handler_requests_in_flight Current number of scrapes being served.
# TYPE promhttp_metric_handler_requests_in_flight gauge
promhttp_metric_handler_requests_in_flight 1
# HELP promhttp_metric_handler_requests_total Total number of scrapes by HTTP status code.
# TYPE promhttp_metric_handler_requests_total counter
promhttp_metric_handler_requests_total{code="200"} 0
promhttp_metric_handler_requests_total{code="500"} 0
promhttp_metric_handler_requests_total{code="503"} 0
* Connection #0 to host 192.168.1.13 left intact

althaser@raspberrypi:~ $ docker service ls
ID             NAME                       MODE         REPLICAS   IMAGE                              PORTS
1e8mgz7465go   monitoring_cadvisor        global       1/1        gcr.io/cadvisor/cadvisor:v0.49.2   *:9338->8080/tcp
7xoklybl7zie   monitoring_grafana         replicated   1/1        grafana/grafana:11.4.0             *:3000->3000/tcp
y4mgapt6e3vq   monitoring_node_exporter   global       1/1        prom/node-exporter:v1.8.2          *:9100->9100/tcp
znmi30cxdq6r   monitoring_prometheus      replicated   1/1        prom/prometheus:v3.1.0             *:9090->9090/tcp

althaser@raspberrypi:~ $ curl -v http://192.168.1.13:9338/metrics
```

Access Grafana UI: http://192.168.1.13:3000



## Docker Prune
```shell
althaser@raspberrypi:~ $ docker system prune
WARNING! This will remove:
  - all stopped containers
  - all networks not used by at least one container
  - all dangling images
  - unused build cache

Are you sure you want to continue? [y/N] y
Deleted Containers:
f8f22df75f1a24a7f590de1f1f68414aa5b05bc73b1a8dd2e974c84b61aefabf
98c0bc9b5bc8bb1204e140c0a374ad1cefb4a9b59af88b3f4619403ab8d5d2dc
.......
```



## Pi-hole
https://github.com/pi-hole/pi-hole

https://github.com/pi-hole/docker-pi-hole

```shell
althaser@raspberrypi:~ $ sudo docker stack deploy -c docker-swarm/pihole/stack.yml pihole

althaser@raspberrypi:~ $ docker network create -d overlay ext-prometheus
nkpudvbrlmeur0p3cu4qilhmm

althaser@raspberrypi:~ $ curl http://192.168.1.13:9617/metrics
```

Access PI Hole UI: http://192.168.1.13/admin/



## NOIP
https://www.noip.com/download?page=linux



## SSH via VPN
### UFW: SSH
```shell
althaser@raspberrypi:~ $ ip -4 a show wg-rasp
4: wg-rasp: <POINTOPOINT,NOARP,UP,LOWER_UP> mtu 1420 qdisc noqueue state UNKNOWN group default qlen 1000
    inet 10.20.0.1/24 scope global wg-rasp
       valid_lft forever preferred_lft forever

althaser@raspberrypi:~ $ sudo ufw allow in on wg-rasp to any port 22
Rule added

althaser@raspberrypi:~ $ sudo ufw status
Status: active
To                         Action      From
--                         ------      ----
OpenSSH                    ALLOW       Anywhere
51820/udp                  ALLOW       Anywhere
9090                       ALLOW       Anywhere
9323                       ALLOW       Anywhere
5900                       ALLOW       Anywhere
22 on wg-rasp              ALLOW       Anywhere
Anywhere on wlan0          ALLOW FWD   Anywhere on wg-rasp

althaser@raspberrypi:~ $ sudo ufw deny in from any to any port 22
Rule added

althaser@raspberrypi:~ $ sudo ufw status
Status: active
To                         Action      From
--                         ------      ----
OpenSSH                    ALLOW       Anywhere
51820/udp                  ALLOW       Anywhere
9090                       ALLOW       Anywhere
9323                       ALLOW       Anywhere
5900                       ALLOW       Anywhere
22 on wg-rasp              ALLOW       Anywhere
22                         DENY        Anywhere
Anywhere on wlan0          ALLOW FWD   Anywhere on wg-rasp

althaser@raspberrypi:~ $ sudo ufw reload
Firewall reloaded

althaser@raspberrypi:~ $ sudo ufw status
Status: active
To                         Action      From
--                         ------      ----
OpenSSH                    ALLOW       Anywhere
51820/udp                  ALLOW       Anywhere
9090                       ALLOW       Anywhere
9323                       ALLOW       Anywhere
5900                       ALLOW       Anywhere
22 on wg-rasp              ALLOW       Anywhere
22                         DENY        Anywhere
Anywhere on wlan0          ALLOW FWD   Anywhere on wg-rasp

althaser@raspberrypi:~ $ sudo ufw status verbose
Status: active
Logging: on (low)
Default: deny (incoming), allow (outgoing), deny (routed)
New profiles: skip
To                         Action      From
--                         ------      ----
22/tcp (OpenSSH)           ALLOW IN    Anywhere
51820/udp                  ALLOW IN    Anywhere
9090                       ALLOW IN    Anywhere
9323                       ALLOW IN    Anywhere
5900                       ALLOW IN    Anywhere
22 on wg-rasp              ALLOW IN    Anywhere
22                         DENY IN     Anywhere
Anywhere on wlan0          ALLOW FWD   Anywhere on wg-rasp
```

### SSH
```shell
althaser@raspberrypi:~ $ sudo vim /etc/ssh/sshd_config
#ListenAddress 0.0.0.0
ListenAddress 10.20.0.1

althaser@raspberrypi:~ $ sudo systemctl restart ssh
```

VPN IP is 10.20.0.1



## Troubleshooting
- Prometheus Target for Docker instances

Make docker available: http://192.168.1.13:9090/targets

```shell
root@raspberrypi:~ # cat /etc/docker/daemon.json
{
  "metrics-addr" : "0.0.0.0:9323",
  "experimental" : true
}

root@raspberrypi:~ # curl http://localhost:9323/metrics

althaser@raspberrypi:~ $ docker exec -it --user=root monitoring_prometheus.1.8t29v9l9qhexqrqjzutbit58q nc -zv 192.168.1.13 9100
192.168.1.13 (192.168.1.13:9100) open

althaser@raspberrypi:~ $ sudo ufw allow 9323

althaser@raspberrypi:~ $ sudo ufw status
Status: active
To                         Action      From
--                         ------      ----
OpenSSH                    ALLOW       Anywhere
51820/udp                  ALLOW       Anywhere
9090                       ALLOW       Anywhere
9323                       ALLOW       Anywhere
Anywhere on wlan0          ALLOW FWD   Anywhere on wg-rasp

althaser@raspberrypi:~ $ docker exec -it --user=root monitoring_prometheus.1.v3ea9wyiygu7xyvk3a4nvip6a  nc -zv 192.168.1.13 9323
192.168.1.13 (192.168.1.13:9323) open
```

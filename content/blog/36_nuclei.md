---
title: "Nuclei"
date: 2025-01-05
tags: ["security", "scanner", "vulnerabilities", "python", "cli"]
categories: ["linux", "software", "applications", "tools"]
description: "Nuclei"
draft: false
hero_images:
  - src: "https://github.com/projectdiscovery/nuclei/raw/dev/static/nuclei-cover-image.png"
    alt: "nuclei"
    width: "800px"
    height: "600px"
---

**Nuclei** is a modern, high-performance vulnerability scanner that leverages simple YAML-based templates. It empowers you to design custom vulnerability detection scenarios that mimic real-world conditions, leading to zero false positives.

https://projectdiscovery.io/nuclei

https://github.com/projectdiscovery/nuclei

```shell
pbeja@Sirius:~/go $ bin/nuclei -u https://althaser.eu

                     __     _
   ____  __  _______/ /__  (_)
  / __ \/ / / / ___/ / _ \/ /
 / / / / /_/ / /__/ /  __/ /
/_/ /_/\__,_/\___/_/\___/_/   v3.3.7

		projectdiscovery.io

[INF] Current nuclei version: v3.3.7 (latest)
[INF] Current nuclei-templates version: v10.1.1 (latest)
[WRN] Scan results upload to cloud is disabled.
[INF] New templates added in latest release: 154
[INF] Templates loaded for current scan: 7607
[INF] Executing 7425 signed templates from projectdiscovery/nuclei-templates
[WRN] Loading 182 unsigned templates for scan. Use with caution.
[INF] Targets loaded for current scan: 1
[INF] Templates clustered: 1702 (Reduced 1602 Requests)
[INF] Using Interactsh Server: oast.online
[waf-detect:varnish] [http] [info] https://althaser.eu
[tls-version] [ssl] [info] althaser.eu:443 ["tls12"]
[tls-version] [ssl] [info] althaser.eu:443 ["tls13"]
[http-missing-security-headers:cross-origin-embedder-policy] [http] [info] https://althaser.eu
[http-missing-security-headers:permissions-policy] [http] [info] https://althaser.eu
[http-missing-security-headers:x-permitted-cross-domain-policies] [http] [info] https://althaser.eu
[http-missing-security-headers:referrer-policy] [http] [info] https://althaser.eu
[http-missing-security-headers:x-content-type-options] [http] [info] https://althaser.eu
[http-missing-security-headers:clear-site-data] [http] [info] https://althaser.eu
[http-missing-security-headers:cross-origin-opener-policy] [http] [info] https://althaser.eu
[http-missing-security-headers:cross-origin-resource-policy] [http] [info] https://althaser.eu
[http-missing-security-headers:strict-transport-security] [http] [info] https://althaser.eu
[http-missing-security-headers:content-security-policy] [http] [info] https://althaser.eu
[http-missing-security-headers:x-frame-options] [http] [info] https://althaser.eu
[caa-fingerprint] [dns] [info] althaser.eu
[nameserver-fingerprint] [dns] [info] althaser.eu ["ns71.domaincontrol.com.","ns72.domaincontrol.com."]
[ssl-issuer] [ssl] [info] althaser.eu:443 ["Let's Encrypt"]
[ssl-dns-names] [ssl] [info] althaser.eu:443 ["althaser.eu"]
```

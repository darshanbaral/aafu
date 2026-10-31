---
title: "Hugo - Deploy and Set Custom Domain on GitHub Pages"
date: 2024-02-21
tags: ["hugo", "domain", "static", "website", "github"]
categories: ["linux", "software", "applications", "tools"]
description: "Hugo - Deploy and Set Custom Domain on GitHub Pages"
draft: false
hero_images:
  - src: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
    alt: "GitHub"
    width: "70"
    height: "70"
  - src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmG0sTTujYLYv0fIIepY8CGiS6fY6rlvNlTA&s"
    alt: "Hugo"
    width: "140"
    height: "140"
---

#### GitHub Pages -> Custom Domain
https://github.com/althaser/website/settings/pages

> Custom domain: althaser.eu

![](https://github.githubassets.com/images/icons/emoji/unicode/2714.png?v8)
DNS check successful

#### baseURL in config.yaml
```
baseURL: "https://althaser.eu"
```

#### DNS Server Configurations
```
A	    @	    185.199.108.153	                1 hour
A	    @	    185.199.109.153	                1 hour
A	    @	    185.199.110.153	                1 hour
A	    @	    185.199.111.153	                1 hour
CNAME	www	    althaser.eu.	                1 hour
-------------------------------------------------------
CNAME	www	    althaser.github.io.             1 hour
-------------------------------------------------------
NS      @       ns07.domaincontrol.com.	        1 hour
NS      @       ns08.domaincontrol.com.	        1 hour
SOA     @       ns07.domaincontrol.com.	        1 hour
```

It might take some time until it propagates to all DNS Servers. Check for A entries in https://www.whatsmydns.net/

#### dig outputs
```shell
$ dig althaser.eu +short
185.199.111.153
185.199.110.153
185.199.109.153
185.199.108.153

$ dig althaser.eu +nostats +nocomments +nocmd
;althaser.eu. 	        IN	A
althaser.eu. 	3600	IN	A	185.199.111.153
althaser.eu.	3600	IN	A	185.199.110.153
althaser.eu.	3600	IN	A	185.199.109.153
althaser.eu.	3600	IN	A	185.199.108.153

$ dig www.althaser.eu +nostats +nocomments +nocmd
;www.althaser.eu.		        IN	A
www.althaser.eu.	    1244	IN	CNAME	althaser.eu.
althaser.eu.		    3600	IN	A	    185.199.110.153
althaser.eu.		    3600	IN	A	    185.199.109.153
althaser.eu.		    3600	IN	A	    185.199.108.153
althaser.eu.		    3600	IN	A	    185.199.111.153

$ dig althaser.github.io +nostats +nocomments +nocmd
;althaser.github.io.		    IN	A
althaser.github.io.	    3413	IN	A	185.199.110.153
althaser.github.io.	    3413	IN	A	185.199.111.153
althaser.github.io.	    3413	IN	A	185.199.109.153
althaser.github.io.	    3413	IN	A	185.199.108.153
```

GitHub supports **https** via Let's Encrypt. Enable **enforce ssl** via github UI -> github project -> Settings -> Pages:
Set your Custom domain and Save. Then enable **enforce HTTPS**.

This one can only be activated once it is propagated on most DNS Servers. Check https://www.whatsmydns.net/ as above.


#### Related links
https://gohugo.io/hosting-and-deployment/hosting-on-github/

https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages

https://medium.com/@isphinxs/using-a-custom-domain-name-with-github-pages-c9cdc2084d54

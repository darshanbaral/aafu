{{- $title := replaceRE `^\d+_` "" .File.ContentBaseName -}}
{{- $title = replace $title "_" " " | title -}}
---
title: "{{ $title }}"
date: {{ .Date | time.Format "2006-01-02" }}
tags: []
categories: []
description: "{{ $title }}"
draft: true
---

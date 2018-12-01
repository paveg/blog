---
title: "Hugo + Github Pages でブログを作る"
date: 2018-12-01T12:17:40+09:00
draft: false
categories: ["Go", "Hugo"]
tags: ["GitHub", "Hugo", "Go", "Netlify"]
---

このブログのような静的サイトジェネレータとホスティングサービスの組み合わせでブログが作成されていると思う。

今回は同僚のLT（ Lightning Talks ）を聞いて興味を持ち、今この真夜中に筆を取っている。

実験的なもので続くかはわからないが、何でもやってみるの精神で構築してみる。

例に倣って、 `Hugo` + `Github Pages` で作成する。

もしやる気が出れば [Netlify](https://www.netlify.com/) に手を出すかもしれない。


```bash
$ brew install hugo
$ hugo new site blog
$ cd blog
$ git init
$ cd themes
$ git clone git@github.com:appernetic/hugo-bootstrap-premium.git
$ hugo new posts/example.md
```

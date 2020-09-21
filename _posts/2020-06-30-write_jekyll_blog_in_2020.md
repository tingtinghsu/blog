---
title:  "重啟我的Jekyll blog寫作計畫"
preview: "Restart writing my Jekyll blog in 2020"
permalink: "/articles/2020-06-30-write_jekyll_blog_in_2020"
date:   2020-06-30 01:23:00
layout: post
tags: 
  - "jekyll"
  - "ruby"  
---

自上次更新本blog又過了超過一年啦！
（到底這一年在忙什麼呢？）

2020年因為疫情再度暫時回來台灣生活，也全心投入於研究成為專職的Ruby on Rails工程師，這時該是重新規律地更新技術blog的時候了。

<!-- more -->

版主自從2019決定定居日本大阪，6月開始重拾學習日文的道路（2019.7考過JLPT 日文檢定N3，2019.12考過N2），接著某天更新macOS catalina 10.15後因故重灌，在電腦裡的blog專案就消失了嗚嗚（還好有GitHub!），之後就一直遲遲沒有再寫新的技術文章(掩面)。  

Jekyll是由GitHub的聯合創始人Tom Preston-Werner使用Ruby撰寫的靜態網站生成器，身為未來閃亮的Ruby on Rails工程師的我，當然首選採用Jekyll。關於更多Jekyll blog安裝在GitHub介紹，可以參考我的[IT邦文章](https://ithelp.ithome.com.tw/articles/10198964)：）  

在此紀錄一下重新在自己筆電裡重啟Jekyll blog的步驟！

# 0. 把GitHub的檔案clone到本機

這一步就不用多說了吧！[到自己的原本專案](https://github.com/tingtinghsu/blog)裡clone資料夾。
有的時候我們也會去其他人的GitHub頁面下載專案來玩。

```
git clone git@github.com:tingtinghsu/blog.git
Cloning into 'blog'...
remote: Enumerating objects: 1409, done.
remote: Total 1409 (delta 0), reused 0 (delta 0), pack-reused 1409
Receiving objects: 100% (1409/1409), 807.01 KiB | 663.00 KiB/s, done.
Resolving deltas: 100% (782/782), done.
```

# 1. 把Jekyll裝回來

由於目前電腦只有安裝Ruby和Rails，很多套件都不見了。趕快來裝一下`gem install jekyll`

```
> gem install jekyll 

Installing ri documentation for jekyll-4.1.1
Done installing documentation for colorator, http_parser.rb, eventmachine, em-websocket, jekyll-sass-converter, jekyll-watch, rexml, kramdown, kramdown-parser-gfm, liquid, mercenary, forwardable-extended, pathutil, rouge, safe_yaml, unicode-display_width, terminal-table, jekyll after 24 seconds
18 gems installed

```

# 2. `bundle install`

進入blog資料夾啟動server的時候，發現之前寫blog的版本是`jekyll (3.8.5)`，因此需要`bundle install`

```
> cd Documents/projects/blog

> jekyll serve

Could not find proper version of jekyll (3.8.5) in any of the sources

> bundle install
Fetching gem metadata from https://rubygems.org/.........
Fetching public_suffix 3.0.3
Installing public_suffix 3.0.3
Fetching addressable 2.5.2
Installing addressable 2.5.2
Using bundler 1.17.3
Using colorator 1.1.0

```

# 4. 啟動 `Jekyll Serve`

```
 ~/Documents/projects/blog-gh-pages   master  jekyll serve  
 
Configuration file: /Users/tingtinghsu/Documents/projects/blog-gh-pages/_config.yml
            Source: /Users/tingtinghsu/Documents/projects/blog-gh-pages
       Destination: /Users/tingtinghsu/Documents/projects/blog-gh-pages/_site
 Incremental build: disabled. Enable with --incremental
      Generating... 
       Jekyll Feed: Generating feed for posts
                    done in 4.315 seconds.
 Auto-regeneration: enabled for '/Users/tingtinghsu/Documents/projects/blog-gh-pages'
    Server address: http://127.0.0.1:4000/blog/
  Server running... press ctrl-c to stop.
```

在網址列輸入Server address，就可以開始更新今年首發入blog的文章了！:)  

今年(2020年)下半年除了持續精進Ruby on Rails技能，   
也會開始鑽研JavaScript、以及有趣的前端框架(例如Vue.js)。  
請各位看倌多多指教～  
よろしくお願いします！m(_ _)m

![](https://i.imgur.com/euQxZ1R.png)

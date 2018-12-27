---
title:  "更換Jekyll版型記錄"
preview: "Change Jekyll Template"
permalink: "/articles/2018-12-26-change_them_for_jekyll_blog"
date:   2018-12-26 12:23:00 +1000
layout: post
tags: 
  - "jekyll"
---

一直以來對於jekyll預設版型不甚滿意。此篇文章紀錄從tingtinghsu.github.io換到[https://tingtinghsu.github.io/blog](https://tingtinghsu.github.io/blog) 的工程，修改版型[(*註1*)](#註1)遇到的問題。

<!-- more -->

# Jekyll資料夾結構

在倒數計時2018年的12月陸陸續續修改各處程式碼並加上自己想要的需求，現在對於資料夾內結構還算熟悉：

```bash

|-- index.html   #blog首頁 (render)
|-- _config.yml  #網站設定檔
|
|---/_includes  #網站結構資料夾
|    |--head.html      #標頭檔
|    |--sidebar.html   #側欄目錄檔
|    |--foot.html   #social links
|
|---/_layouts   #版型
|    |--default.html      #預設版型
|    |--page.html   #固定頁面版型，如作者簡介
|    |--post.html   #blog發表文章版型
|    |--tag.html   #以標籤進行分類
|
|---/_posts     #文章資料夾，放置文章之處
|
|---/_site     #render後所產生之檔案，皆位於此處
|    |--index.html
|    |--/articles      #permalink 文章永久連結
|    |--/page2      #pagenation Page2 post集合
|    |--/page3      #pagenation Page3 post集合
|    |--/page4      #pagenation Page4 post集合
|
|    |--/tag        #標籤分類資料夾
|       |--/heroku        #含heroku標籤 post集合
|       |--|-- index.html
|       |--/interview  #含interview標籤 post集合
|       |--|-- index.html
|
|    |--/public     #網路上公開可看到的檔案
|       |--/css     #css
|    |--404.html
|    |--about.html
|    |--atom.xml
|    |--LICENSE.md
|    |--README.md
|
|---/public      #公開檔 (render)
|    |--/css     #css
|-- 404.html     #路徑錯誤提示 (render)
|-- about.html   #作者簡介 (render)
|-- about.md     #作者簡介
|-- Atom.xml   #RSS (render)
|-- LICENSE.md #版權頁 (render)
|-- README.md  # (render)
```

# 我的舊版blog與新版blog差異

| 比較 | 舊版 | 新版|
|---|---|---|
|遠端|[https://tingtinghsu.github.io](https://tingtinghsu.github.io)| [https://tingtinghsu.github.io/blog](https://tingtinghsu.github.io/blog)|
| local | `/本機Github/tingtinghsu.github` | `/本機Github/blog`
啟動server| jekyll server  | jekyll server --port 4001
本機網址| http://127.0.0.1:4000/  |  http://127.0.0.1:4001/blog/ [(*註2*)](#註2)

經過了整個12月的改版工程，目前對於版型還挺滿意的！(27-Dec 2018)

**舊版型**: [minima](https://github.com/jekyll/minima)
  
![https://ithelp.ithome.com.tw/upload/images/20181227/20111177DkmAzqdvQ9.png](https://ithelp.ithome.com.tw/upload/images/20181227/20111177DkmAzqdvQ9.png)
  
**新版型**: [lanyon](https://github.com/poole/lanyon)
  
![https://ithelp.ithome.com.tw/upload/images/20181227/20111177sGo5iGHe4p.png](https://ithelp.ithome.com.tw/upload/images/20181227/20111177sGo5iGHe4p.png)

---

## 編按

### [註1]

版型修改途中遇到大量問題，例如`push`之後收到Github的警告訊息：

```bash

GitHub opened this alert 9 minutes ago

1 jekyll vulnerability found in Gemfile.lock 9 minutes ago

Remediation
Upgrade jekyll to version 3.8.4 or later. For example:
gem "jekyll", ">= 3.8.4"
Always verify the validity and compatibility of suggestions with your codebase.

Details
CVE-2018-17567

moderate severity

Vulnerable versions: >= 3.8.0, < 3.8.4
Patched version: 3.8.4
Jekyll through 3.6.2, 3.7.x through 3.7.3, and 3.8.x through 3.8.3 allows attackers to access arbitrary files by specifying a symlink in the "include" key in the "_config.yml" file.

```

其原因主要來自於[Jekyll官方支援的版型](https://pages.github.com/themes/)其Jekyll版本為3.8.4，與穩定的`blog版本3.8.5`不相容。

解法：在搬移內容的過程為了保留舊版本做對照(舊版僅供自己參考)，我將版型改為`Jekyll3.8.5`的[lanyon](http://lanyon.getpoole.com/)(by [@mdo](https://github.com/poole/lanyon/commits?author=mdo))，並按照[此教學影片: How to Install Jekyll Themes?](https://www.youtube.com/watch?v=bty7LHm14CA)**更改blog網址**。

### [註2]

如何在本機run多個 Jekyll server，我參考了[Jekyll官網](https://jekyllrb.com/docs/configuration/options/#serve-command-options)與[StackOverflow問題]((https://stackoverflow.com/questions/25650749/is-it-possible-to-serve-multiple-jekyll-sites-locally/25650755))，在不同的`port` run server。

```bash
jekyll serve –port 4001
```

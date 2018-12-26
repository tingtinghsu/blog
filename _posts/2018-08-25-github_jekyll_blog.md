---
title:  "在Github用Jekyll創建屬於你自己的blog"
preview: "Build your own blog by Jekyll"
permalink: "/articles/2018-08-25-github_jekyll_blog"
date:   2018-08-25 12:23:00
layout: post
tags: 
  - "jekyll"
---

前幾天IT邦有一篇熱門文章「哪個blog寫技術文章最好用？」  
昨天貓貓工程師在我們共同的[Slack](http://slack.com/)群組分享他的[blog](https://blog.bater.gq/)，他提到是使用[Jekyll](http://jekyllcn.com/docs/posts/)（一個簡單靜態blog網站生成器）架在[github](https://github.com/)上的。

於是好奇的我決定照著關鍵字來搜尋一下，如法炮製做一個出來。

<!-- more -->

這樣寫在IT邦的文章，也可以放一份到自己的Blog!
https://tingtinghsu.github.io/jekyll/update/2018/08/25/github_jekyll_blog.html

重點摘要:
* abstact
{:toc}

## A.在你自己的Github帳號建立新資料夾 github.io

*名稱必須是你的`username.github.io`*
![https://ithelp.ithome.com.tw/upload/images/20180824/20111177JLQCXuETDs.png](https://ithelp.ithome.com.tw/upload/images/20180824/20111177JLQCXuETDs.png)
建好後下載這個資料夾。

補充：Github是個放程式的地方，最多只能呈現特定的`靜態頁面`（適合放blog/履歷表之類的內容。）
無法放搭配`伺服器`與`資料庫`共同運作（例如會員登入、購物車等功能）的`動態網站`，！
如果想架動態網站，可以去[Heroku](https://www.heroku.com/)

## B. 在github.io資料夾內新增首頁

剛剛下載的資料夾，預設會儲存至本機端電腦的這個路徑（以我的Mac為例）：

```bash
/Users/tingtinghsu/Documents/GitHub/tingtinghsu.github.io
```

在本機裡的yourusername.github.io新增空白頁面`index.html`，使用html語法編輯。

![https://ithelp.ithome.com.tw/upload/images/20180824/201111770XolTRJGtw.png](https://ithelp.ithome.com.tw/upload/images/20180824/201111770XolTRJGtw.png)


來改一下簡單的Hello World Style程式碼：
```
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
  <head>
  </head>
  <body>
    <h1>Hello Ting Ting!</h1>
    <p>This is my GitHub Pages.</p>
  </body>
</html>
```

這時候貓貓工程師在我耳朵旁邊OS打廣告:[VS code](https://code.visualstudio.com/) 好用！

改好後，重點來了！先 `git commit` to Master（儲存修改到本機），再`git push`（上傳將你要發佈的網頁到Github的資料夾上）

給Git新新手的連結：
常用Git指令，網路上資源非常豐富，我參考[這裡]( https://blog.gogojimmy.net/2012/02/29/git-scenario/)部落格，

如果新手想先跳過git指令本機端的圖形介面編輯器，可以下載[Github桌面版](https://desktop.github.com/) 。

好囉！來網址列試試看自己的blog*陽春*首頁會不會出現?
> http://tingtinghsu.github.io/

![https://ithelp.ithome.com.tw/upload/images/20180824/20111177CSwxXlpA2v.png](https://ithelp.ithome.com.tw/upload/images/20180824/20111177CSwxXlpA2v.png)

成功！

## C.在本機上裝Jekyll

[Jekyll](http://jekyllcn.com/docs/posts/)是base on ruby開發的部落格網站生成器，需要的版本要ruby2.0以上。
在termimal輸入`ruby -v`確定一下版本：
![https://ithelp.ithome.com.tw/upload/images/20180825/20111177OspMdSGx4z.png](https://ithelp.ithome.com.tw/upload/images/20180825/20111177OspMdSGx4z.png)

Ruby版本沒問題，就可以輸入以下的Jekyll指令們。

### c.1 在本地安裝Jekyll

```bash
gem install jekyll
```

### c.2 建一個新資料夾寫Blog的指令

```bash
jekyll new myblog
cd myblog
```

### c.3 開啟Jekyll伺服器

```bash
jekyll serve
```

在網址列輸入http://localhost:4000/
應該會出現這樣的畫面：
![https://ithelp.ithome.com.tw/upload/images/20180825/20111177JpBt2TiYL7.png](https://ithelp.ithome.com.tw/upload/images/20180825/20111177JpBt2TiYL7.png)

接下我們就可以在本地端進行完修改網頁，再用git上傳。
到你的網誌連結：http://tingtinghsu.github.io/
![https://ithelp.ithome.com.tw/upload/images/20180825/20111177CyDdUoadop.png](https://ithelp.ithome.com.tw/upload/images/20180825/20111177CyDdUoadop.png)

就可以看到改好的頁面了～～

[後記：]
安裝Git這部分我卡住了一段時間，因為以前沒有相關的觀念。

感謝貓貓工程師教學：

1. 每次上傳前的好習慣是要輸入 `git status` ：先用git看看哪些資料夾還沒有merged

2. 如果出現了`Unmerged paths`，代表本地曾經新建過的新檔案，Github上還沒備份:

```bash
  (use "git add <file>..." to mark resolution)

        added by them:   _posts/2018-08-24-my_first_jekyll_page.markdown
        both modified:   _site/feed.xml
        both modified:   _site/jekyll/update/2018/08/24/my_first_jekyll_page.html
```

3. `git add .`:把所有更改過的所有網頁加入暫存變更

如果只要加入某個特定網頁，就在`git add`後加上網頁路徑

```bash
git add _site/jekyll/update/2018/08/24/my_first_jekyll_page.html
```

4. `git status`: 確定一下剛剛是否已經存入暫存變更

綠色的字就是已經存入：
![https://ithelp.ithome.com.tw/upload/images/20180825/2011117784pHVbSogs.png](https://ithelp.ithome.com.tw/upload/images/20180825/2011117784pHVbSogs.png)

5. `git log`：commit過的動作會進log做紀錄，`-m ""`加上自己的註解：commit過什麼事情
![https://ithelp.ithome.com.tw/upload/images/20180825/20111177KatlWjvZCF.png](https://ithelp.ithome.com.tw/upload/images/20180825/20111177KatlWjvZCF.png)

6. `git push`：記得要先commit後再push。

![https://ithelp.ithome.com.tw/upload/images/20180825/20111177xHVSTLH6hm.png](https://ithelp.ithome.com.tw/upload/images/20180825/20111177xHVSTLH6hm.png)

7. `git pull` ：如果和其他人協同作一個部落格/專案，有可能GitHub上的變更會比較新，此時要先Pull下來，再push上去，才會確保是最新版本喔！

看到持續新增的blog文章頁面，很有成就感呢！：）
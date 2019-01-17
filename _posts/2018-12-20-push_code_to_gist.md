---
layout: post
title:  "將程式碼用command line上傳至gist"
preview: "Push code to gist"
permalink: "/articles/2018-12-20-push_code_to_gist"
date:   2018-12-20 08:23:00

layout: post
tags: 
  - "git"
---

最近重新整理鐵人賽文章的程式碼時，我想將[Jekyll新版blog](https://tingtinghsu.github.io/blog)的文章插入gist程式碼片段(snippet)，研究了2小時後，發現並沒有我想像中的複雜，挺簡單的！
  
<!-- more -->

---

重點摘要:
* abstact
{:toc}

---
# 步驟

## Step 1. 在MacOS用`Homebrew`安裝`gist`

```bash
brew install gist
```

## Step 2. 移至欲上傳程式碼的資料夾，在command line輸入 `gist --login` 登入 gist

```bash
tingtinghsu$ gist --login
Obtaining OAuth2 access_token from github.

GitHub username: [使用者帳號]
GitHub password: [使用者密碼]
Success!

https://github.com/settings/tokens
```

## Step 3. `gist + 程式碼檔名`，指令即自動產生網址!

```bash
tingtinghsu$ gist D01Eg1-class_superclass.rb

https://gist.github.com/該程式碼的網址
```

# 實作成果

```html
<script src="https://gist.github.com/你的gist帳號/自懂產生的網址.js"></script>
```

結果顯示如下：

<script src="https://gist.github.com/tingtinghsu/f7b604327ac31896e4aff735675952ad.js">
</script>

## 編按

在command line設定gist過程中曾參考Github官網這篇[Create a personal access token for the command line](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/)，在`github.com/settings/tokens/new`建立新Token。

然而我後來在command line登入時，發現不需要設定token，只要登入github密碼即可。我猜想原因可能為：當初在本機設定github指令時已經是採用token方式設定。

Ref:

* [用 gist 指令快速建立程式碼剪貼簿（code snippets）](http://blog.lyhdev.com/2011/10/gist-code-snippets.html)
* [在 Medium 中嵌入 source code](https://medium.com/cubemail88/%E5%9C%A8-medium-%E4%B8%AD%E5%B5%8C%E5%85%A5-source-code-96984c5f41a6)
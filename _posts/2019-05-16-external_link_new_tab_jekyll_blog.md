---
title:  "將Jekyll blog文章的外部連結另開新分頁"
preview: "Open external link in a new tab in Jekyll blog"
permalink: "/articles/2019-05-15-external_link_new_tab_jekyll_blog"
date:   2019-05-16 09:23:00
layout: post
tags: 
  - "jekyll"
  - "javascript"  
---

最近為本blog實作了一個新的小功能：當使用者點擊blog內文附上外部超連結時，(例如首頁旁邊的社群連結)，外部超連結可以在新分頁開啟，而不會讓使用者離開本部落格。  

<!-- more -->
另開新分頁的功能在`HTML`很容易做到：

```html
<a href="連結網址" target="_blank">
```
  
  
然而Jekyll blog內使用靜態的`Markdown`語法產生文章。因此在`md`檔內無法使用`HTML`的語法。

我參考了這篇文章: [Jekyll 新分頁開啟超連結](https://note.pcwu.net/2017/02/05/jekyll-link-new-tab/)，並將自己修改的步驟記錄如下，供網友們參考：）

# 1.判斷連結是否為外部連結的`javascript`程式

路徑: `/asset/js/new-tabs.js`

```javascript
/* DOM抓取所有超連結 */
function handleExternalLinks () {
  var host = location.host
  var allLinks = document.querySelectorAll('a')

  forEach(allLinks, function (elem, index) {
    checkExternalLink(elem, host)
  })
}
/* 如果連結的hostname跟blog不同，target後接_blank */
function checkExternalLink (item, hostname) {
  var href = item.href
  var itemHost = href.replace(/https?:\/\/([^\/]+)(.*)/, '$1')
  if (itemHost !== '' && itemHost !== hostname) {
    item.target = '_blank'
  }
}

/* 設定 forEach 迴圈 method */
function forEach (array, callback, scope) {
  for (var i = 0; i < array.length; ++i) {
    callback.call(scope, array[i], i)
  }
}

handleExternalLinks ()
```

藉由解讀這段語法，我們可以順便複習一次[JavaScript的DOM筆記](https://tingtinghsu.github.io/blog/articles/2019-03-16-js_dom#4-queryselectorall)。

# 2. 更改default.html

路徑: `_layouts/default.html`

這個html檔預設好了render blog內的頁面架構，例如`head`標頭，`sidebar`側欄，以及每一篇的`content`內容。

我們在`body`標籤的最底部，引入剛剛製作的`javascript`語法並加上註解：

```html
...
<!-- a new tab for external URL  -->
    <script type="text/javascript" src="{{ site.baseurl }}/assets/js/new-tabs.js"></script>  
  </body>
</html>  
```

# 修改重點：

引入連結的source一定要是正確的路徑，而這個路徑在不同人的專案裡位置可能都不一樣。

如果你像我研究路徑bug研究了幾天，
你會發現`Jekyll server`一直出現`ERROR '/assets/js/new-tabs.js' not found.`的錯誤訊息

[Stackflow](https://stackoverflow.com/questions/27386169/change-site-url-to-localhost-during-jekyll-local-development/27400343#27400343)上有許多解釋site.baseurl的文章。我把最重要的說明引入如下：

```bash
`site.baseurl` This variable indicates the root folder of your Jekyll site. 

By default it is set to "" (empty string).  

That means that your Jekyll site is at the root of http://example.com.  

If your Jekyll site lives in http://example.com/blog,  
you have to set site.baseurl to /blog (note the slash).  
This will allow assets (css, js) to load correctly.  

```

(出處:[Stackflow](https://stackoverflow.com/questions/27386169/change-site-url-to-localhost-during-jekyll-local-development/27400343#27400343))

搞懂怎麼在jekyll引入javascript檔案之後，就可以為blog添加更多新功能囉！  （例如Google Analytics的js檔）

# Ref

[Jekyll 新分頁開啟超連結](https://note.pcwu.net/2017/02/05/jekyll-link-new-tab/)  


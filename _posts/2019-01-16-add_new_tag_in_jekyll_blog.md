---
title:  "在jekyll blog加入新tag"
preview: "Add new tag"
permalink: "/articles/2019-01-16-add_new_tag_in_jekyll_blog"
date:   2019-01-16 08:55:00 +1000
layout: post
tags: 
  - "jekyll"
comments: true
---

隨著blog內的文章越來越多，我們可能需要為文章加上新的分類(categories)或標籤(tags)。2019年後我們將開始從ruby深入研究至rials，在此以加入新標籤`rails`作為範例。

<!-- more -->
---

重點摘要:
* abstact
{:toc}

---

# Step 1: 在`config.yml`定義collections

以分類的個人習慣而言，我偏好`tags`這個名稱而非`categories`，因為一篇文章可能包含`多於一個tags`，無法硬性規定於某個唯一的分類`categories`。例如在`2018-08-25`的這篇文章[在Github用Jekyll創建屬於你自己的blog](./2018-08-25-github_jekyll_blog)，內容談到了Jekyll與基本的git用法，因此我在這篇文章的屬性裡同時加入了`jekyll`與`git`。為確保彈性，我們就以`tag`為名。

將`output`設定為`true`，目的是將`在各個獨立的tags下，列出所有的包含此tags的文章`的功能打開。

`路徑：/config.yml`

```ruby
collections:
  tag:
    output: true
```

# Step 2. 將篩選出tags的語法加入layout

## 1. 讓每個 tags 都成為一個連結

`路徑：/_layouts/post.html`:

我們可以把`page.tags | sort`是想成`SQL`語法的排序功能，並指定變數`sortedTags`。

` {% for tag in sortedTags %}`與` {% endfor %}`的for迴圈內，將此`tag`的blog md檔都放置於`{{ site.baseurl }}/tag/{{ tag }}`路徑下。

<script src="https://gist.github.com/tingtinghsu/74ebe141d99bd9d5df9811eff4a9cc0c.js"></script>

## 2. `related posts`: 列出與此文有關的相關文章

我們在瀏覽完某篇網路文章時，通常會看到底下有推薦`你可能也喜歡的其他文章`的連結。這個功能的邏輯是列出同一tag下，除了本篇文章以外的其他文章(功能寫在unless - endunless內)。
在此我們設定列出相關文章為4篇：當`relatedCount` == 4，跳出`if迴圈`

`路徑：/_layouts/post.html`:
<script src="https://gist.github.com/tingtinghsu/93d0087b1360774ade7b284a8bf5a8a1.js"></script>

# Step 3. 在各blog的`md`檔加入新tags

`layout`設定好了，接著我們去單篇文章的`front-matter`內，依照該文章的內容列出符合其敘述的tags屬性。例如剛剛舉例提到`2018-08-25`的這篇文章[在Github用Jekyll創建屬於你自己的blog](./2018-08-25-github_jekyll_blog)，我設定了兩個tags。

```ruby
title:  "在Github用Jekyll創建屬於你自己的blog"
preview: "Build your own blog by Jekyll"
permalink: "/articles/2018-08-25-github_jekyll_blog"
date:   2018-08-25 12:23:00
layout: post
tags: 
  - "jekyll"
  - "git"
```

# Step 4. 在各個獨立的tags下，列出所有的包含此tags的所有文章

在此我採用靜態設定的方式，在每個`{{tag}}`資料夾下都創建`index.html`檔。所以資料夾內容看起來可能是長這樣的：

```
|---/_site     #render後所產生之檔案，皆位於此處
|    |--index.html
|    |--/articles      #permalink 文章永久連結
|    |--/page2      #pagenation Page2 post集合
|    |--/page3      #pagenation Page3 post集合
|    |--/page4      #pagenation Page4 post集合
|
|    |--/tag        #標籤分類資料夾
|       |--/jekyll #含jekyll標籤下的post集合
|       |--|-- index.html
|       |--/git    #含git標籤下的post集合
|       |--|-- index.html
```

舉例而言，如果`{{tag}}`分類是jekyll，`title`設定為`jekyll`:

`路徑：/_site/tag/jekyll/index.html`

```html
layout: default
title: jekyll
```

在各個獨立的tags下，用for迴圈列出所有的包含此tags的所有文章:

<script src="https://gist.github.com/tingtinghsu/5be539f58f440f139ba5618eb3b5d10c.js"></script>


# Step 5. 在網站選單上加上每個tag的連結路徑

最後我們在放置選單的側邊欄sidebar加上各個連結路徑的集合。大功告成！

`路徑：/_site/index.html`

```html
<nav class="sidebar-nav">
    <a class="sidebar-nav-item" href="/blog/">Home</a>
    <a class="sidebar-nav-item" href="/blog/tag/interview/">。Interview: Ruby 精選面試題</a>
    <a class="sidebar-nav-item" href="/blog/tag/rails/">。Rails: 動態功能</a>
    <a class="sidebar-nav-item" href="/blog/tag/rubygem/">。RubyGem: 套件研究</a> 
    <a class="sidebar-nav-item" href="/blog/tag/jekyll">。Blog: Jekyll 靜態網誌</a>
    <a class="sidebar-nav-item" href="/blog/tag/heroku/">。Deployment: Heroku 發佈</a>
    <a class="sidebar-nav-item" href="/blog/tag/git/">。Git: 版本控制</a>  
...
</nav>
```

看到文章整整齊齊地被收納在不同tags下，寫blog文章的動力就更加旺盛了！XD

![https://ithelp.ithome.com.tw/upload/images/20190117/20111177EeHGTAREKx.png](https://ithelp.ithome.com.tw/upload/images/20190117/20111177EeHGTAREKx.png)

Ref:

* [在Github用Jekyll創建屬於你自己的blog](https://tingtinghsu.github.io/blog/articles/2018-08-25-github_jekyll_blog)
* [Creating Category Pages in Jekyll without Plugins](https://kylewbanks.com/blog/creating-category-pages-in-jekyll-without-plugins)

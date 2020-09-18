---
title:  "[2020] 第12屆鐵人賽Day 3 在Rails專案產生Vue app"
preview: ""
permalink: "/articles/2020-09-15"
date:   2020-09-15 09:56:00
layout: post
tags: 
  - "rail"
  - "vue"    
---

# 1. Rails專案起手式

在[昨天]()的鐵人賽中，我們對於Rails的MVC架構和Vue.js的MVVC設計架構做些了解，對未來專案的前端、後端的檔案位置及有個初步的概念。那麼今天就直接來開個新專案吧！  

先確定自己想要用在專案開發的ruby及rails版本：
```
master ▓▒░ ruby -v 
2.6.5p114 (2019-10-01 revision 67812) [x86_64-darwin19]

master ▓▒░ rails -v 
Rails 6.0.3.3
```

註：如果你是MacOS使用者，還沒有接觸過Ruby on Rails專案，不知道要怎麼安裝環境的話，可以參考我在[這篇文章寫的安裝～](https://ithelp.ithome.com.tw/articles/10198937)雖然是2018年的舊文但是流程應該是大同小異XD。


新建專案：
```
rails new vue_rails --database=postgresql
```

我把datebase從Rails預設的`SQLlite`改成`Postgresql`（為了因應未來如果專案完成、可以部署至heroku網站的需求，）。首先要進去專案內，把資料庫建立起來：

```
vue_rails  master ▓ rails db:create

Created database 'vue_rails_development'
Created database 'vue_rails_test'
```

接著跑`rails server`，可以看到rails專案新建成功的經典的歡呼畫面！

![](https://i.imgur.com/IlWzoK2.png)


# 等一下！Webpacker是什麼！？可以吃嗎?

在新建專案過程，如果你~~眼角的餘光有掃到console安裝紀錄~~，而且跟我一樣建的是rails 6版本的專案，應該會看到許多跟`webpacker`有關的下載、安裝訊息，例如：

```
Installing dev server for live reloading
         run  yarn add --dev webpack-dev-server from "."
yarn add v1.22.5
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
warning "webpack-dev-server > webpack-dev-middleware@3.7.2" has unmet peer dependency "webpack@^4.0.0".
warning " > webpack-dev-server@3.11.0" has unmet peer dependency "webpack@^4.0.0 || ^5.0.0".
[4/4] 🔨  Building fresh packages...
success Saved lockfile.
success Saved 102 new dependencies.
info Direct dependencies
...(略)
└─ webpack-dev-server@3.11.0
├─ webpack-dev-middleware@3.7.2
├─ webpack-dev-server@3.11.0
└─ ws@6.2.1
✨  Done in 4.51s.
Webpacker successfully installed 🎉 🍰
```

這是因為專案內預設的Gemfile就有多這行的緣故：
```
gem 'webpacker', '~> 4.0'
```

在[龍哥關於rails webpacker的文章有介紹](https://kaochenlong.com/2019/11/21/webpacker-with-rails-part-1/)，Webpacker是rails的gem，幫我們可以在rails專案也能利用webpack技術打包前端的`css`,`javascript`檔案。至於關於前端[javascript的webpack](https://webpack.js.org/)，他可以將專案內零散的JavaScript檔案用各式工具優化並打包起來，加快網頁的載入時間，到底是怎麼幫我們加快的速度，裡面有非常多的細節可以研究(這又是另一個故事了...)！
  
到目前我們只要非常清楚一件事：`webpacker`是可以讓我們在`rails`專案使用`webpack`打包工具的好用gem，而且更棒的是，在rails引入前端框架vue或是react，都可以用`webpacker`去幫我們完成安裝。

# 2. 利用webpacker安裝vue

這個指令可以在我們專案創出新的vue app：
```
rails webpacker:install:vue
```

```
// (略)
info Direct dependencies
├─ vue-loader@15.9.3
├─ vue-template-compiler@2.6.12
└─ vue@2.6.12
info All dependencies
├─ @vue/component-compiler-utils@3.2.0
├─ consolidate@0.15.1
├─ de-indent@1.0.2
├─ he@1.2.0
├─ merge-source-map@1.1.0
├─ prettier@1.19.1
├─ vue-hot-reload-api@2.3.4
├─ vue-loader@15.9.3
├─ vue-style-loader@4.1.2
├─ vue-template-compiler@2.6.12
├─ vue-template-es2015-compiler@1.9.1
└─ vue@2.6.12
✨  Done in 3.57s.
Webpacker now supports Vue.js 🎉
```
![](https://i.imgur.com/DwgEvpp.png)

產生出了好幾個跟Vue有關的檔案!  
不過，現在還不能在專案中看見Vue的效果。

# 3. vue-turbolinks

目前我打算在rails專案中還是用`turbolinks`這個javascript，把瀏覽器的跳轉交給`turbolinks`管裡，可以讓網頁切換時更快速。
所以，接著我們跟著`hello_vue.js`這份檔案註解中的提示，

```
// If the project is using turbolinks, install 'vue-turbolinks':
//
// yarn add vue-turbolinks
//
// Then uncomment the code block below:
// //
import TurbolinksAdapter from 'vue-turbolinks'
import Vue from 'vue/dist/vue.esm'

Vue.use(TurbolinksAdapter)

document.addEventListener('turbolinks:load', () => {
  new Vue({
    el: '#hello',
    data: () => {
      return {
        message: "第12屆鐵人賽專案，參賽確定！"
      }
    },
  })
})
```

接著在終端機：`yarn add vue-turbolinks`這個指令：

```
yarn add vue-turbolinks

success Saved lockfile.
success Saved 1 new dependency.
info Direct dependencies
└─ vue-turbolinks@2.1.0
info All dependencies
└─ vue-turbolinks@2.1.0
✨  Done in 4.03s.
```



# 4. 本次專案的檔案結構

我的rails app的架構這樣：
```
├── app
│   ├── assets
│   ├── channels
│   ├── (C)ontrollers
│   ├── frontend  => 放前端檔案最重要的地方
│   ├── helpers
│   ├── jobs
│   ├── mailers
│   ├── (M)odels
│   └── (V)iews
```

而我會在frontend裡面擺放前端所需的資料，包括`scripts`, `styles`，還有未來會介紹的vue `components`元件!

```
├── frontend
│   ├── channels
│   │   ├── consumer.js
│   │   └── index.js
│   ├── images
│   ├── packs
│   │   ├── application.js
│   │   ├── hello_vue.js
│   │   └── vue.js
│   ├── scripts
│   │   ├── application.js
│   │   └── index.js
│   ├── styles
│   │   ├── application.scss
│   │   └── index.js
│   └── vue
│       └── components
│           └── app.vue
```

# 5. 讓`hello_vue.js`的`message`顯示在Rails專案上

先來個起手式，確定專案內的vue檔案可以正確顯示出效果，
我把預設的`hello_vue.js`檔，message修改如下：

```
import TurbolinksAdapter from 'vue-turbolinks'
import Vue from 'vue/dist/vue.esm'

Vue.use(TurbolinksAdapter)

document.addEventListener('turbolinks:load', () => {
  new Vue({
    el: '#hello',
    data: () => {
      return {
        message: "第12屆鐵人賽專案，參賽確定！"
      }
    },
  })
})
```

接著去檢查views/layouts的`application.html.erb`，讓`stylesheet`和`javascript`等檔案可以被`webpacker`順利打包:

```
  <head>
    <title>Vue.js x Rails 鐵人賽專案</title>
    <%= csrf_meta_tags %>
    <%= csp_meta_tag %>

    <%= stylesheet_pack_tag 'application', media: 'all', 'data-turbolinks-track': 'reload' %>
    <%= javascript_pack_tag 'application', 'data-turbolinks-track': 'reload' %>
    <%= javascript_pack_tag 'hello_vue', 'data-turbolinks-track': 'reload' %>
  </head>
```

最後，為了產生一個預設首頁，修改routes和新增controller，創一個新的view

pages#home.html.erb
```
<div id="hello">Vue.js x Rails { {  message } } </div>
```

routes
```
  root 'pages#home'
```

controller
```
class PagesController < ApplicationController
end
```

用Vue在瀏覽器show出了message，表達鐵人般的強烈意志！  
  
![](https://i.imgur.com/7hMCTJN.png)



Ref: 

* [如何在 Rails 使用 Webpacker（上）](https://kaochenlong.com/2019/11/21/webpacker-with-rails-part-1/)  
* [如何在 Rails 使用 Webpacker（下）](https://kaochenlong.com/2019/11/21/webpacker-with-rails-part-1/)  
* [Webpack教學 (一) ：什麼是Webpack? 能吃嗎？](https://medium.com/i-am-mike/)
* [Rails Turbolinks™ 5 深度研究](https://www.writershelf.com/article/rails-turbolinks%E2%84%A2-5-%E6%B7%B1%E5%BA%A6%E7%A0%94%E7%A9%B6?locale=zh-TW)
* [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
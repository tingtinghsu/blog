---
title:  "[2020] 第12屆鐵人賽Day 5 v-bind, v-model, v-on"
preview: ""
permalink: "/articles/2020-09-18"
date:   2020-09-16 09:56:00
layout: post
tags: 
  - "rail"
  - "vue"    
---

# 單向資料綁定: v-bind 

昨天討論了單向資料流的鬍子語法，可以讓我們把Vue實例裡的資料流向html (View)。

但如果要將資料綁定HTML標籤屬性的時候，該怎麼辦呢？

舉例🌰而言，如果我們想把HTML的`placeholder`綁上vue instance的data屬性`yourname`，這個時候，我們可以使用`v-bind`。

html

```
  <p class="control">
    <input class="input" v-bind:placeholder="yourname">
  </p>
```

Vue instance
```
new Vue({
  el: "#app",
  data: {
  	yourname: "請輸入您的暱稱"
  },
  methods: {
  	greeting(){
    	return "這是鐵人賽第五天！"
    }
  }
})
```

範例：在這個輸入格的`placeholder`提示上綁`v-bind:placeholder="yourname"`，就會出現`請輸入您的暱稱`的提示字串了。
<iframe width="100%" height="300" src="//jsfiddle.net/tingtinghsu/wezs3xdg/6/embedded/js,html,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

# 雙向事件處理: v-model, v-on

<iframe width="100%" height="300" src="//jsfiddle.net/tingtinghsu/wezs3xdg/36/embedded/js,html,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

在上例表單的情況，

我想要讓使用者`輸入暱稱`時，使用`v-model`讓暱稱可以即時顯示。  
並且讓使用者按下`button`時，呼叫`thankyou`這個methods裡面的方法。  

而Vue的黑魔法，讓`this`拿到`inputname`裡的值，
所以我們可以透過`${this.inputname}`要到使用者的輸入資料，並在畫面上顯示，達成資料回流到`Vue instance`的效果。

# v-bind和v-on的簡寫

因為v-bind和v-on太有用啦，所以有他自己的語法糖衣`syntax sugar`！

```
資料綁定v-bind :
事件處理v-on @
```

Vue其實還有其他好用的設計像是`v-for`把陣列裡的資料印出來, `v-if`, `v-show` 流程控制。這個部分跟一般程式語言的邏輯還蠻相似的，各位可以參考vue官網範例，暫時不一一贅述。明天將會介紹`v-on`跟method結合，以及更多變化的`v-compute`。

Ref: 
* [Vue手冊：v-on事件處理](https://cn.vuejs.org/v2/guide/events.html) 
* [書籍：Vue.js 2 前端漸進式建構框架實戰應用](https://books.google.com.tw/books/about/Vue_js_2%E5%89%8D%E7%AB%AF%E6%BC%B8%E9%80%B2%E5%BC%8F%E5%BB%BA%E6%A7%8B%E6%A1%86%E6%9E%B6%E5%AF%A6.html?id=i66aDwAAQBAJ&redir_esc=y) 

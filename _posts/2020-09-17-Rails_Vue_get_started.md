---
title:  "[2020] 第12屆鐵人賽Day 4 - Rails專案: Vue的起手式"
preview: ""
permalink: "/articles/2020-09-17"
date:   2020-09-15 09:56:00
layout: post
tags: 
  - "rail"
  - "vue"    
---

昨天經過辛苦的環境安裝（擦汗），可以在Rails專案寫Vue了！先來個簡單的Vue起手式緩緩心情～

在第2天我們有提到，[Vue.js 官網](https://012.vuejs.org/guide/) 這張MVVM架構的示意圖：
`Model`是資料邏輯：
`View`是使用者介面；
`VM`代表的是`View Model`。


![](https://i.imgur.com/JcXXD6y.png)  

我們可以比較原生`javascript`綁定事件的方式：

<iframe width="100%" height="300" src="//jsfiddle.net/tingtinghsu/jLmkebzo/14/embedded/js,html,result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

以及`Vue.js`的差別：
<iframe width="100%" height="300" src="//jsfiddle.net/tingtinghsu/41mrcLkz/6/embedded/js,html,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

而在Vue.js裡，是採用Vue instance（實例）作為原本的使用者介面(UI)及`Javascript`的資料處理邏輯的中間層，而非直接讓js去操作UI介面的元素。

這整塊是new出一個`Vue instance`，其最特別之處，
是讓`Model`邏輯的變化會同步到`View`介面上。
而`View`的資料變化也會同步到`Model`資料邏輯中、

(Model)
```
new Vue({
	el: "#app",
  data: {
  	message: "Vue feat. Rails"
  },
  methods: {
  	start(){
    	alert("鐵人賽開始!")
    }
  }
})
```

html (View)
```html
<!-- 比起原生js，Vue.js的寫法，會在view介面上，外層需要多一層div -->
<div id="app">
  <p id="title">{ { message } } </p>
  <button v-on:click="start">按我</button>
</div>
```

以上應該就可以很好的解釋，昨天的程式碼為何Vue js可以大大方方地在我的Rails專案首頁出現囉！

還記得我們的前端model邏輯是這樣：

```
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

而html (View)是這樣：

```html

<div id="hello">Vue.js x Rails { { message } } </div>

```

是不是有覺得Vue很好上手呢?!(~~鐵人賽才第四天，話不要說的太早~~)

# `\{ \{ \} \} ` mustache: 鬍子語法

在昨天鐵人賽的`Vue instance`實例裡，我們有一個`data`屬性用來提供資料。
並且讓資料流向html (View)在標籤加上的`{{message}}`鬍子語法內。
這被稱為`One-Way Data Flow`的`data binding`。（中文: 單向資料流的資料綁定）
```
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

> Vue手冊：
The mustache tag will be replaced with the value of the message property on the corresponding data object. It will also be updated whenever the data object’s message property changes.  
無論何時，綁定的資料物件上 message property 發生了改變，插值處的內容都會更新。

有回傳值的運算式，也可以使用鬍子語法唷！

<iframe width="100%" height="300" src="//jsfiddle.net/tingtinghsu/2c0udyvj/5/embedded/js,html,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

# Vue Instance的物件屬性

從昨天鐵人賽改寫`hello_vue.js`的

Ref: 

* [Vue英文官網手冊: One-way Data Flow](https://vuejs.org/v2/guide/components-props.html#One-Way-Data-Flow)  
* [Vue中文官網手冊: 模板語法](https://cn.vuejs.org/v2/guide/syntax.html)  
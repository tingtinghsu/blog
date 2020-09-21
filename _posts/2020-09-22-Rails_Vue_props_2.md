---
title:  "[2020] 第12屆鐵人賽Day 9 Vue元件裡的props屬性(2)"
preview: ""
permalink: "/articles/2020-09-222"
date:   2020-09-20 09:58:00
layout: post
tags: 
  - "rail"
  - "vue"    
---

昨天提到`props`屬性可以將外層元件的資料，傳遞到內層元件。舉的例子是傳入`常數author`字串給`News`元件，但是一般來說的網頁使用情境，不太可能會把資料綁死在欄位上。比較常見的是讓`使用者`自己輸入，或是透過`後端資料庫`或`API`傳資料進來。


## 傳入子元件的資料是`變數`

在下列例子，`News`這個Vue元件會動態接收從Vue instance傳過去的姓名的值。
---
title:  "[2020] 第12屆鐵人賽Day 28 Rails專案開發 - 刪除ticket"
preview: ""
permalink: "/articles/2020-10-11"
date:   2020-10-09 10:00:00
layout: post
tags: 
  - "rail"
  - "vue"    
---

`CRUD`新增、刪除、修改、顯示功能是一個完整的線上系統不可或缺的功能。
前天我們完成了`更新 ticket`，以及介紹了`dispatch`讓Vue可以聯絡道Vuex的action，
今天就延續著介紹以Vue.js實作`CRUD`的編輯功能！

## 刪除icon

先加一個可愛的垃圾桶：
ticket.vue
```
<template>
  <div class="ticket">
    {{ ticket.name }}
    <div>
      <button class="edit-btn" @click="editTicket=true"><i class="fas fa-edit text-gray-400"></i></button>
      //垃圾桶
      <button class="delete-btn" @click="destroyTicket"><i class="fas fa-trash text-gray-400"></i></button>

      <div v-if="editTicket" class="edit-area">
        <i class="far fa-window-close edit-cancel" @click="cancelUpdate"></i> 
        <textarea type="text" class="edit-input" v-model="ticket.name"></textarea>
        <button class="update-ticket-btn" @click="updateTicket">更新</button>
      </div>

    </div>
  </div>
</template>
```

確定我們能夠抓到那筆即將被刪除資料：

```
<script>
  export default {              
    name: 'Ticket',
    props: ["ticket"],
    data: function () {
      return {
      }
    },    
    methods: {
      destroyTicket(evt){
        event.preventDefault();
        if (confirm(`確定刪除"${this.ticket.name}" 嗎?`)){
          console.log("remove: ") 
          console.log(this.ticket.id)
          console.log(this.ticket.name)
        }

      }
    }
  }
</script>
```

![](https://i.imgur.com/89YhG7q.gif)
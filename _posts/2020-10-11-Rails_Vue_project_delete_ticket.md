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

利用Vue.js實作`CRUD`新增、刪除、修改功能

## 刪除icon

ticket.vue
```
<template>
  <div class="ticket">
    {{ ticket.name }}
    <div>
      <button class="delete-btn" @click="destroyTicket"><i class="fas fa-trash text-gray-400"></i></button>
    </div>
  </div>
</template>
```

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
          console.log(this.ticket)
        }

      }
    }
  }
</script>
```
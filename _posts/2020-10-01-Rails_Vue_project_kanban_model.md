---
title:  "[2020] 第12屆鐵人賽Day 18 Rails專案開發"
preview: ""
permalink: "/articles/2020-10-01"
date:   2020-09-30 10:00:00
layout: post
tags: 
  - "rail"
  - "vue"    
---

在MVC架構裡，model是我們放商業邏輯的地方，所以第一步要決定這個網站的邏輯。
秉持著不要重複造輪子的精神，昨天已經用Rails的`devise gem`訊速打造一個User的model並完成註冊登入功能。

# 建立Model

- 使用者可以建立很多`Kanban`
- 使用者可以加入很多其他人的`Kanban`
- 看板`Kanban`可以讓使用者建立很多`Column`
- 每個`Column`可以開很多張票`Ticket`。

```

```

# 修改登入後的右上顯示為暱稱

對於`devise`預設欄位只有出email沒有很滿意，應該要show出暱稱才對

`20200924015914_add_name_to_users.rb`

```
~/Doc/p/pmaster_v/vue_rails

Running via Spring preloader in process 50517
      invoke  active_record
      create    db/migrate/20201001051642_add_name_to_users.rb
```

```
  def change
    add_column :users, :name, :string    
  end
```

# 讓devise可以接收客製的欄位參數


```
Rails.application.routes.draw do
  devise_for :users  
  root 'pages#home'

end
```

# `navbar` 製作

```

```


# 後端套件: `devise` 註冊登入系統

Devise為Rails最常使用的會員系統套件，為了讓我們專案能夠快速上線，就透過`Devise`完成網站基本的註冊登入功能。

```
gem 'devise', '~> 4.7', '>= 4.7.1'
/vue_rails  master !7 ?1 ▓▒░ rails g devise:install

# 產生user model
/vue_rails  master !8 ?4 ▓▒░ rails g devise User 

# 為了能夠客製化註冊登入頁面，編輯
/vue_rails  master !9 ?8 ▓▒░ rails g devise:views      
```

---
title:  "[2020] 第12屆鐵人賽Day 27 Rails專案開發 - Action Cable即時互動功能"
preview: ""
permalink: "/articles/2020-10-10"
date:   2020-10-06 10:00:00
layout: post
tags: 
  - "rail"
  - "vue"    
---


本日想實作功能：拖拉的時候，在另一個登入瀏覽器也會同步顯示結果

```
rails g channel column

Running via Spring preloader in process 70377
      invoke  rspec
      create    spec/channels/column_channel_spec.rb
      create  app/channels/column_channel.rb
```

# 訂閱頻道

```
  def subscribed
    stream_from "column_channel_#{params[:column_id]}"
  end
```

# server-side連線設定

## 身份驗證

在最一開始使用`devise`製作註冊登入系統，這款gem已經提供給我們適當的環境變數，把它透過`byebug`印出來看看
有值的話回傳，不然就拒絕連線
```
10:49:52 web.1       | (byebug) env["warden"]
10:49:52 web.1       | Warden::Proxy:70111027317460 @config={:default_scope=>:user, :scope_defaults=>{}, :default_strategies=>{:user=>[:rememberable, :database_authenticatable]}, :intercept_401=>false, :failure_app=>#<Devise::Delegator:0x00007f87fa2cc638>}

10:49:52 web.1       | (byebug) env["warden"].user
10:50:30 web.1       | #<User id: 1, email: "tingtinghsu[at]秘密", created_at: "2020-10-01 01:43:03", updated_at: "2020-10-01 07:12:27", name: "Ting">
```

channels/application_cable/connection.rb

如果有`env["warden"].user`，指定給`current_user`
```
module ApplicationCable
  class Connection < ActionCable::Connection::Base

    identified_by :current_user

    #這裡引入current_user

    def connect
      self.current_user = find_verified_user
    end

    private
      def find_verified_user
        if current_user = env["warden"].user
          current_user
        else
          reject_unauthorized_connection
        end
      end
  end
  end
end

```

# client-side連線設定

# 建立 column_channel.js

`ActionCable.server.broadcast("column", @column)`
`後面那一包`就是要廣播的資料

```
  def drag
    # byebug
    @column.insert_at(column_params[:position].to_i)
    # http://localhost:3335/kanbans/2/columns/2.json

    puts("----column------")    
    ActionCable.server.broadcast("column", @column)
    ActionCable.server.broadcast("column", "drag to new position")     
    ActionCable.server.broadcast("column", column_params[:position].to_i)  

    render 'show.json'
  end
```

![](https://i.imgur.com/BqI4Oys.gif)

## `$store`變成全域變數，在channel.js裡拿到

```
  window.$store = store;
```



* [Rails Guides: Action Cable](https://guides.rubyonrails.org/action_cable_overview.html)  

* [actioncable-vue](https://github.com/mclintprojects/actioncable-vue)  
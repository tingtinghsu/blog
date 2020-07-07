---
title:  "Rails的 MVC 架構: 淺談 model 和 controller"
preview: "Rails: MVC model view controller"
permalink: "/articles/2019-01-14-rails_MVC_model_view_controller"
date:   2019-01-14 09:55:00
layout: post
tags: 
  - "rails"
comments: true
---

進入rails，最重要的是了解MVC架構(Model-View-Controller)。限於篇幅的關係，今天先簡單講解Controler和Model.

<!-- more -->
---

重點摘要:
* abstact
{:toc}

---



# Controller

當Route解析網址後，會將任務轉給指定的Controller(如圖中的1)。Controller根據任務需求與View互動(如圖中的8.9)，或是透過Model取出database裡的資料(如圖中的4.7)。

![https://github.com/tingtinghsu/blog/blob/gh-pages/public/img/MVC.png?raw=true](https://github.com/tingtinghsu/blog/blob/gh-pages/public/img/MVC.png?raw=true)

[圖片來自龍哥的文章 : Model、View、Controller 三分天下](https://railsbook.tw/chapters/10-mvc.html)

## 新增Route 範例

Controller的命名與Route使用resources（複數）或resource（單數）有關。  

在以下餐廳範例的route檔案裡，我們看到`resources :restaurants`使用複數。
若沒有特別指定resources的controller參數，預設的對應controller就是`RestaurantsController`.

`Routes路徑：/config/routes.rb`

```ruby
Rails.application.routes.draw do
  resources :restaurants
  root 'restaurants#index'
  get 'pages/about'
  get "/contact_us", to "pages#contact"
end
```

在`  get "/contact_us", to "pages#contact"`中，若使用者輸入`餐廳網站/contact_us`時，Route路由會交給PagesController的contact方法處理這個請求。


## Controller 程式範例


Controller資料夾下的檔名以`複數`命名；  
class類別名稱`大寫`、`複數`。

`路徑：/app/controllers/clients_controller.rb`

```ruby
class ClientsController < ApplicationController

end
```

`路徑：/app/controllers/orders_controller.rb`

```ruby
class OrdersController < ApplicationController

end
```


# Model

Model是在資料表上的抽象類別，可以和實體的資料表溝通。(如圖中的5.6)

![https://github.com/tingtinghsu/blog/blob/gh-pages/public/img/MVC.png?raw=true](https://github.com/tingtinghsu/blog/blob/gh-pages/public/img/MVC.png?raw=true)

Model資料夾下的檔名以`單數`命名；eg. `client.rb`  
class類別名稱`大寫`、`單數`。eg. `class Client`

## Model 範例

在這裡，我們以兩個Model`Client`客戶和`Order`訂單舉例。  
一個`客戶`可能下了很多`(has_many)`的`訂單`；  
而每一筆`訂單`都屬於`(belong_to)`某一位`客戶`。

`路徑: /app/models/client.rb`

```ruby
class Client < ActiveRecord::Base
  has_many :orders
end
```

客戶:訂單 = 一對多的關聯。  

當加上`has_many :orders` 後，  
`User Model`會多了幾個好用的方法：

1. 多了`order`與`order=`可以取用及設定`Order`
2. 多了`build_order`與`create_order`來建立`Order`資料。

`/app/models/order.rb`

```ruby
class Order < ActiveRecord::Base
  belongs_to :client

end
```

## Model 及對應資料表

對應到資料表名稱而言，資料表命名通常預設是`小寫`、`複數`，並使用`底線`分隔。

Model 名稱 | Datasheet名稱
------------- | -------------
Client  | clients  
Order  | orders  
OrderItem  | order_item  

注意：當某個Model不一定對應到一個資料表，和資料表就沒有任何關係。

## 新增 Model : `rails g model`

*1. Rails產生Client Model*

```bash
$ rails g model Client name email phone
```

column 欄位 | 資料型態
------------- | -------------  
name  | string  
email  | string  
phone  | string


```bash
tingdeAir:demo2.5 tingtinghsu$ rails g model Client name email phone
Running via Spring preloader in process 85647
      invoke  active_record
      create    db/migrate/20190122023406_create_clients.rb
      create    app/models/client.rb
      invoke    test_unit
      create      test/models/client_test.rb
      create      test/fixtures/clients.yml
```

*2. Model名稱：Order*

*2. Rails產生Order Model*

```bash
$ rails g model Order price address orderdate shipdate client_id
```

column 欄位 | Data型態
------------- | -------------
price  | integer  
address  | string  
orderdate  | string  
shipdate  | string  
client_id  | string (Foreign Key)


## 產生資料表: `rake db:migrate` 

```bash
tingdeAir:demo2.5 tingtinghsu$ rake db:migrate
== 20190121090619 CreateUsers: migrating ======================================
-- create_table(:clients)
   -> 0.0017s
== 20190121090619 CreateUsers: migrated (0.0018s) =============================
```
## Model 操作: 透過ORM (Object Relational Mapping)

「物件關聯映射」是一種透過操作`物件`來操作`關聯資料庫`的方式。

### 打開console: `rails console` 

我們可以在rails環境裡打開console，我目前的環境是`Rails 5.2.2`:

```bash
tingdeAir:demo2.5 tingtinghsu$ rails console
Running via Spring preloader in process 83464
Loading development environment (Rails 5.2.2)
```

### 建立資料: Console裡輸入CRUD命令

`CRUD`代表的是`Create新增`, `Read讀取`，`Update更新`，`Delete刪除`

#### Create 新增

假設我們要在客戶資料表`clients`新增一筆`業務超市`的資料，並存入資料表，有兩種方法

1. `.new` + `.save`


`merchant = Client.new`:  
使用Client model new出新物件，並放入名為merchant的變數內。

```ruby
2.5.2 :008 > merchant = Client.new(name: "gyomusuper", email: "hi@gyomusuper.jp")  

=> #<Client id: nil, name: "gyomusuper", email: "hi@gyomusuper.jp", phone: nil, created_at: nil, updated_at: nil>
```

`Client.save`:  
存入clients資料表內。

```ruby
2.5.2 :009 > merchant.save
 
 (1.5ms)  begin transaction  
 
  Client Create (3.8ms)  INSERT INTO "clients" ("name", "email", "created_at", "updated_at") VALUES (?, ?, ?, ?)  [["name", "gyomusuper"], ["email", "hi@gyomusuper.jp"], ["created_at", "2019-01-25 09:13:54.365848"], ["updated_at", "2019-01-25 09:13:54.365848"]]

   (2.1ms)  commit transaction
```

2. 直接`.create`: 若我們輸入的資料欄位沒有太多資料需要填寫，直接存入的方法可節省步驟。。

```ruby
2.5.2 :018 > Client.create(name: "lawson", email: "hi@lawson.jp")

   (11.8ms)  begin transaction
  Client Create (7.0ms)  INSERT INTO "clients" ("name", "email", "created_at", "updated_at") VALUES (?, ?, ?, ?)  [["name", "lawson"], ["email", "hi@lawson.jp"], ["created_at", "2019-01-25 09:30:03.039573"], ["updated_at", "2019-01-25 09:30:03.039573"]]
   (2.0ms)  commit transaction

=> #<Client id: 3, name: "lawson", email: "hi@lawson.jp", phone: nil, created_at: "2019-01-25 09:30:03", updated_at: "2019-01-25 09:30:03">
```
#### Read 讀取: `.find()`

例如：我們現在在console裡輸入尋找clients資料表裡的第一筆資料，指令為`Client.find(1)`

```ruby
2.5.2 :021 > Client.find(1)

Client Load (10.7ms)  SELECT  "clients".* FROM "clients" WHERE "clients"."id" = ? LIMIT ?  [["id",1], ["LIMIT", 1]]

=> #<Client id: 1, name: "LIFE Supermarket", email: "hi@lifecorp.jp", phone: "03-3470-3484", created_at: "2019-01-22 08:26:58", updated_at: "2019-01-22 08:26:58">
```

當我們寫

```ruby
Client.find(1)
```

其SQL語法 =

```ruby
SELECT * FROM clients WHERE (client.id = 1) LIMIT 1
```

和SQL語法相比，是不是節省了相當多的程式碼呢？  


---

Ref:
* [為你自己學 Ruby on Rails(電子書)](https://books.google.com.au/books?id=AVE6DwAAQBAJ)
* [Active Record Query Interface](https://guides.rubyonrails.org/active_record_querying.html)
* [Move Find into Model](http://railscasts.com/episodes/4-move-find-into-model)

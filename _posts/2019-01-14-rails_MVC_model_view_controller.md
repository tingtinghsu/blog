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

進入rails，最重要的是了解MVC架構(Model-View-Controller)。限於篇幅的關係，今天先簡單講解model和View.

<!-- more -->
---

重點摘要:
* abstact
{:toc}

---

# Model

Model是在資料表上的抽象類別，可以和實體的資料表溝通。 

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

*1. Model名稱：Client*

Rails產生Client Model:  

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

Rails產生Order Model:  

```bash
$ g model Order price address orderdate shipdate client_id
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

## 打開console: `rails console` 

我們可以在rails環境裡打開console，我目前的環境是`Rails 5.2.2`:

```bash
tingdeAir:demo2.5 tingtinghsu$ rails console
Running via Spring preloader in process 83464
Loading development environment (Rails 5.2.2)
```

## 建立資料: Console裡輸入CRUD命令

`CRUD`代表的是`Create新增`, `Read讀取`，`Update更新`，`Delete刪除`

### Create 新增

當我們寫

```ruby
client = Client.find(1)
```

其SQL語法 =

```ruby
SELECT * FROM clients WHERE (client.id = 10) LIMIT 1
```


# Controller

當Route解析網址後，會將任務轉給指定的Controller。Controller根據任務需求與View互動，或是透過Model取出database裡的資料。

![./public/img/MVC.png](./public/img/MVC.png)

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
  def list
    @client = Client.find(param[:id])
    @orders = @client.orders.find_incomplete
    # for all the orders belongs to the client
  end
end
```


`路徑：/app/controllers/orders_controller.rb`

```ruby
class OrdersController < ApplicationController
  def index
    @orders = Order.find_incomplete
    ## self method (class method) FIND written inside Model
  end
end
```

---

Ref:
* [為你自己學 Ruby on Rails(電子書)](https://books.google.com.au/books?id=AVE6DwAAQBAJ)
* [Active Record Query Interface](https://guides.rubyonrails.org/active_record_querying.html)
* [Move Find into Model](http://railscasts.com/episodes/4-move-find-into-model)

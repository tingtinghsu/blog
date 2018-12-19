---
layout: post
title:  "[RubyGems] carrierwave (1) 在Rails實現圖片上傳功能"
date: 2018-09-04 10:31:00 +1000
categories: rubygems
---

[carrierwave](https://github.com/carrierwaveuploader/carrierwave)是一款經典的圖片上傳套件，本篇的目標是先在本地端(development)的rails專案試成功gem。

（中集會練習怎麼利用Amazone S3架設圖片上傳Host，
下集遠端(production)實作上傳。）

<!-- more -->

![https://ithelp.ithome.com.tw/upload/images/20180904/20111177jA3W9YiK5l.png](https://ithelp.ithome.com.tw/upload/images/20180904/20111177jA3W9YiK5l.png)

在閱讀任何Github上的README.md，有一點很重要的是知道因為環境設定的不同，必須漸漸了解哪些步驟可以跳過、哪些變數需要修改成符合自己專案性質的名稱，這點身為新手的我，將會靠練習活用各式各樣的gem來進步。：）

這次我們會更動的檔案/資料夾如下：
Rails的架構 | 說明
---|-----
Gemfile | 設定Rails應用程式使用了哪些Gems套件
app |放Controllers、Models和Views檔案

接下來就按造步驟來實作吧！

# A. 在`gemfile`加入套件，重啟rails server：

1.首先我們按照[carrierwave](https://github.com/carrierwaveuploader/carrierwave)在githhub上說明檔的指示，前往`/專案名稱/gemfile`，在`gemfile`加入套件，新增程式碼：

```ruby
gem 'carrierwave', '~> 1.0'
```

> README.md告訴我們CarrierWave的版本需求：Rails 4.0 or higher and Ruby 2.0，我的ruby 2.4.2 Rails 5.1.6，所以沒有問題～

2.每次新增任何新的Gem到Gemfile，就要在Terminal輸入`bundle install`處理相依性，然後`rails s`重啟伺服器。

```bash
tingdeMacBook-Air:yelpdemo tingtinghsu$ bundle install
tingdeMacBook-Air:yelpdemo tingtinghsu$ bundle info carrierwave
  * carrierwave (1.2.3)
    Summary: Ruby file upload library
    Homepage: https://github.com/carrierwaveuploader/carrierwave
    Path: /Users/tingtinghsu/.rvm/gems/ruby-2.4.2/gems/carrierwave-1.2.3
```

# B. `rails g`新增Image uploader功能

接下來就可以看到carrierwave的厲害之處了，在此我需要將自己的餐廳(restaurants)資料庫建立新的圖片(image)欄位，所以把carrier的指令客製化成自己的專案。
指令`rails g uploader Image`幫助我們在此路徑：`app/uploaders/image_uploader.rb`新增了檔案。
打開`image_uploader.rb`看看裡面的類別寫法：

```ruby
class ImageUploader < CarrierWave::Uploader::Base
  storage :file
  #storage :fog
  # Override the directory where uploaded files will be stored.
  # def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
end
```

> 這個部分指的是：
如果我把儲存檔案的地方放在本地端(localhost)，就要把storage :file前的#註解拿掉
相對的，想要把儲存檔案的地方放在遠端(Heroku)，把storage :fog前的#註解拿掉

在本篇裡，CarrierWave會把我上傳的圖片將會放在`/public/uploads/restaurant/image`。

# C. 建立資料庫上傳Image所需欄位

1.建立遷移檔(migration，修改資料庫結構)
`rails g migration add_image_to_restaurants image:string`
2.並在資料庫增加上傳圖片的欄位:
`rake db:migrate`
3.然後重啟伺服器：`rails s`

順利的在`db/migrate`跑出了`add_image_to_restaurants.rb`檔案。打開來瞧瞧：

```ruby
class AddImageToRestaurants < ActiveRecord::Migration[5.1]
  def change
    add_column :restaurants, :image, :string
  end
end
```

# D. 修改Models，讓資料庫準備好存取圖片的功能

接下來我們修改跟ActiveRecord有關的Models。mount Model裡面，這個名為uploader上傳功能小幫手，未來它會幫我們翻譯資料庫語言(SQL)跟資料庫要資料（餐廳圖片）。:

Models: `app/models/restaurant.rb`

```ruby
class User < ActiveRecord::Base
  mount_uploader :image, ImageUploader
end
```

在[rails官網](https://rails.ruby.tw/active_record_basics.html)提到：
> Active Record 是MVC的M（Model）表現商業邏輯與資料的層級，負責新增與操作需要持久存在資料庫裡的資料。Active Record本身是ORM（Object Relational Mapping，物件關聯映射）系統的描述。

# E. 修改Views

1. 資料庫的上傳功能已經準備好了，接下來到Views跟表單溝通，請讓表單能夠接受上傳的圖片。

首先到`app/views/restaurants/_form.html.erb`，修改成可以上傳照片的form type(表單型態)。

```ruby
<%= form_with(model: restaurant, local: true, :html => { multipart: true }) do |form| %>
```

我們來增加：「上傳圖片」欄位，讓使用者能在視覺上看得見新欄位，並修改上傳圖片的檔案(file)類型為`form.file_field`:

```html
  <div class="form-group">
    <%= form.label :image %>
    <%= form.file_field :image, id: :restaurant_image, class: "form-control" %>
  </div>
```

不同於其他純文字(text)欄位如地址、電話的`form.text_field`。

```html
  <div class="form-group">
    <%= form.label :name %>
    <%= form.text_field :name, id: :restaurant_name, class: "form-control" %>
  </div>
```

2.告訴rails何時取得image。我們來到`app/views/restaurants/show.html.erb`，在餐廳資料前面加上程式碼：

```html
<p id="notice"><%= notice %></p>
<%= image_tag @restaurant.image_url if @restaurant.image_url.present? %>
<p>
```

```html
<p>
  <strong>Name:</strong>
  <%= @restaurant.name %>
</p>
```

`image_tag`：Rails內建的Helper靜態輔助方法，可以讓我們建構HTML更為容易。[參考這裡](https://ihower.tw/rails/actionview-helpers.html)
`@restaurant.image_url`：顯示目前這筆餐廳資料的圖片位置。

> [新手常見Bug！]檢查圖片為nil寫法：`if @restaurant.image_url.present?`。可以防止當某位使用者新增一筆餐廳資料、但沒有附上圖片的時候，show.html.erb這頁網頁直接當掉給你看...

# F. 修改Controllers

最後，我們在Controllers: `app/controllers/restaurants.controller.rb`加上允許上傳至欄位的參數，告訴rails，新的image欄位是安全的。

```ruby
    def restaurant_params
      params.require(:restaurant).permit(:name, :address, :phone, :website, :image)
    end
```

**大功告成 **

觀看結果：
  
![https://ithelp.ithome.com.tw/upload/images/20180904/20111177bgD1sd8o0E.png](https://ithelp.ithome.com.tw/upload/images/20180904/20111177bgD1sd8o0E.png)  
  
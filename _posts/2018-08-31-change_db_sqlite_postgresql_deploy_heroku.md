---
layout: post
title:  "Deploy到Heroku前，將Rails專案從SQLite設定為PostgreSQL "
date: 2018-08-31 10:31:00
categories: heroku
---

Paas（平台及服務）公司Heroku是個可以把我們寫好的App部署到網際網路的好地方。而本篇是我從自己的[上一篇文章：將Ruby on Rails專案部署到Heroku](https://ithelp.ithome.com.tw/articles/10199014)遇到的問題，當時困擾了快兩小時，好在搜尋完解法搞定完後，就興奮地延伸為一篇文章了！

<!-- more -->

~~找到點子寫文章果然是遇到bug的最佳副產品~~

> Heroku的資料庫是使用[PostgreSQL](https://devcenter.heroku.com/articles/heroku-postgresql#local-setup)，而這篇文章有說明[為什麼不用SQLite在Heroku](https://devcenter.heroku.com/articles/sqlite3)。
但Rails框架在我們的電腦本機`rails new app`設定時，為了初學者快速理解學習，預設是SQLite。
所以如果沒有變更資料庫，直接把Rails push到Heroku上去，就會出現問題。

看完[這篇](https://www.digitalocean.com/community/tutorials/sqlite-vs-mysql-vs-postgresql-a-comparison-of-relational-database-management-systems)資料庫的文章比較，以一句話來大概解釋比較sqlite與PostgreSQL，sqlite缺乏額外優化性能的靈活性，且同一時間只允許一個寫入操作；可擴展的PostgreSQL提供了可靠性和數據完整性，因此是更好的選擇。

[問題]
我在本機的Ruby on Rails專案所用的資料庫是SQLite，當時還未想到之後會部署到Heroku。

因此，在[上篇文章](https://ithelp.ithome.com.tw/articles/10199014)做到`Step3 >> 步驟 B. 建立Heroku gem`：修改我的本地資料夾裡的gem file，當我新增一個gem叫做'pg'這個步驟時...

問題出現了！本機遇到的錯誤訊息： No connection pool for ActiveRecord::Base
<https://stackoverflow.com/questions/38176304/no-connection-pool-for-activerecordbase>
  
![https://ithelp.ithome.com.tw/upload/images/20180830/201111779bYfI1JbY4.png](https://ithelp.ithome.com.tw/upload/images/20180830/201111779bYfI1JbY4.png)

[解法]

# Step1. 修改`/config/Gemfile`

`Pg`套件，讓我們在Ruby上使用關聯式資料庫PostgreSQL的介面的好幫手。
（Pg套件詳細資料： <https://bitbucket.org/ged/ruby-pg/wiki/Home> ）

我們可以修改rails專案的`/config/Gemfile`，加上這幾行程式碼，
讓在Heroku上線時候跑的是PostgreSQL，而在本機的時候還是跑SQLite。

> **Rails 應用程式預設提供了三種不同的執行模式：**
development environment:開發模式，用在你的開發的時候
test environment: 測試模式，用在執行測試程式時
production environment: 正式上線模式，用在實際的上線運作環境

```ruby
group :production do
  gem 'pg'
end

group :development, :test do
  gem 'sqlite3'  
end  
```

或是寫成：

```ruby
gem 'sqlite3',             group: :development
gem 'pg',                  group: :production
```

> [注意]`gem 'pg'`後面要加逗號`,`啊！不然就會向我一樣出現Syntax error...
  
![https://ithelp.ithome.com.tw/upload/images/20180830/20111177KkGqGHfOwo.png](https://ithelp.ithome.com.tw/upload/images/20180830/20111177KkGqGHfOwo.png)

> 欣慰的是，用錯誤訊息搜尋關鍵字，發現在stackoverflow上也有人跟我犯過同樣的錯誤 XD
<https://stackoverflow.com/questions/18684527/gemfile22-syntax-error-unexpected-tidentifier-expecting-end-of-input>

# Step2. `bundle install`，再重啟rails server。

記得，每次在Gemfile修改套件資料，都要跑`bundle install`處理套件相依性問題。
（如果你在本機，想避免安裝任何在production環境下跑的gem，可輸入：`bundle install --without production` ）

而每次跑完bundle都要先用`control+ c`關掉Terminal頁面的伺服器，
再重啟伺服器`rails s`之後，如下圖：localhost資料庫的問題已解決了：
  
![https://ithelp.ithome.com.tw/upload/images/20180830/20111177a6CAZPI3la.png](https://ithelp.ithome.com.tw/upload/images/20180830/20111177a6CAZPI3la.png)

但你還是看不到首頁的資料：
  
  ![https://ithelp.ithome.com.tw/upload/images/20180830/20111177s3GYTJzv4H.png](https://ithelp.ithome.com.tw/upload/images/20180830/20111177s3GYTJzv4H.png)

# Step3. 部署到Heroku：`git push heroku master`

最後兩步：push!`git push heroku master`，
還要跑完`heroku rake db:migrate`指令才會生效喔！

（如果轉換資料庫之前有些bug，run指令的時候會提示哪些欄位可能出了問題。）
![https://ithelp.ithome.com.tw/upload/images/20180830/20111177DpBPmcKhGu.png](https://ithelp.ithome.com.tw/upload/images/20180830/20111177DpBPmcKhGu.png)

首頁成功顯示資料庫！
  
![https://ithelp.ithome.com.tw/upload/images/20180830/20111177wzI70OZUTI.png](https://ithelp.ithome.com.tw/upload/images/20180830/20111177wzI70OZUTI.png)

＝＝
後記：
遇到這個bug讓我提早了解跟ruby on rails相關的資料庫概念，是一個很有價值的坑(?)！

如果你想在本機建立rails app的當下，直接設定成PostgreSQL而非SQLite（節省之後deploy的麻煩～），可以參考這篇文章：
[Rails 使用 PostgreSQL](https://medium.com/@yengttt/rails-%E4%BD%BF%E7%94%A8-postgresql-bc3123216d2a)

Ref:
[第二十三天：認識資料庫](https://ithelp.ithome.com.tw/articles/10196781)

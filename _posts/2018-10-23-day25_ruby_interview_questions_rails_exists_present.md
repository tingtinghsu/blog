---
layout: post
title:  "Ruby面試精選30題 - Day25 初探 Rails: .present? 和 .exists?比較"
date:   2018-10-23 08:51:00
categories: interview
---

[昨天]的鐵人賽裡，我們提到了`.present?`方法，第一次把腳跨進`Rails`的領域，這是一種從`Ruby`幼幼班畢業的架勢！

今天再來研究另一個`Rails`方法:`.exists?`，從英文字面上來說這兩個方法名字挺像的(`.present?`現在?在場?；`.exists?`存在?生存?)，讓我們來繼續看下
<!-- more -->

---

# Ruby經典面試題目 #25

`Day25 .present? 和.exists?  比較? What is the difference between .present? and .exists?`

根據我們在這趟鐵人賽journey所養成的好習慣，當學到新的方法時，第一步就是去：翻手冊！

# `.present?()`

從`.present()`所在的API手冊網址：https://api.rubyonrails.org/classes/Object.html#method-i-present-3F
我們可以發現`.present?()`方法是屬於`Object`之下的方法。如果物件Object不是`blank`(nil, 空值, 或空白鍵)，就是代表`現在；在場`，回傳true。

> `.present?()`: An object is present if it's not blank.

`@return [true, false]`

```ruby
# File activesupport/lib/active_support/core_ext/object/blank.rb, line 26
def present?
  !blank?
end
```

# `.present`與`.presence`

present是動詞，presence是名詞，我們從[Rails API](https://api.rubyonrails.org/classes/Object.html#method-i-presence)發現
這兩者方法可以互相轉換，

```ruby
# File activesupport/lib/active_support/core_ext/object/blank.rb, line 46
def presence
  self if present?
end
```

`present?`可以和`presence`互相改寫：

```ruby
params[:something] if params[:something].present?
```

變成

```ruby
params[:something].presence
```

程式碼從兩行變成一行了呢～～

如果某物件`不在場(present)`，就回傳`nil`(returns `nil` if object is 'empty')

```ruby
params[:something] == ''

[].presence
# => nil
```

等同於

```ruby
object.present? ? object : nil
```

# `.exists?`

接著來看看`.exists()`所在的API手冊網址：
https://api.rubyonrails.org/v3.1/classes/ActiveResource/Base.html#method-c-exists-3F
可以發現`.exists()`方法是屬於`ActiveResource::Base`下的方法。

當我們架設一個包含多種功能的動態網站，為了防止效能變差，確保系統資源能被有效利用，我們會先檢查`資源是否存在`。

> `exists?(id, options = {})`Asserts the existence of a resource, returning true if the resource is found.

[這篇文章提到](https://semaphoreci.com/blog/2017/03/14/faster-rails-how-to-check-if-a-record-exists.html)`Existence checks in Rails`是非常重要的觀念！就好像出門前要先檢查`鑰匙`、`錢包`、`手機`是否隨身攜帶；出國去機場坐飛機前記得檢查是否攜帶`護照`，不然就要再回家拿、浪費大把時間與資源、又搞得自己很狼狽喔！

```ruby

IronmanDairy.create(:title => 'Day 24', :body => 'The importance of Existence checks')

IronmanDairy.exists?(1) # => true
IronmanDairy.exists(9527) # => false
```

來看看rails文件的`.exists`方法是怎麼被刻出來的：

```ruby
# File activeresource/lib/active_resource/base.rb, line 869
def exists?(id, options = {})
  if id
    prefix_options, query_options = split_options(options[:params])
    path = element_path(id, prefix_options, query_options)
    response = connection.head(path, headers)
    response.code.to_i == 200
  end
  # id && !find_single(id, options).nil? id存在且不為空
rescue ActiveResource::ResourceNotFound, ActiveResource::ResourceGone
  false
end
```

至於什麼是`ActiveResource::Base`呢?

> It is the main class for mapping `RESTful` resources as `models` in a Rails application.[出處](https://api.rubyonrails.org/v3.1/classes/ActiveResource/Base.html)

這邊的`RESTful`和`MVC框架`的`model`兩個博大精深的概念都可以另外再寫兩本書了，因此限於篇幅，這邊就先暫不提起。（想研究的新手同好可參考:[RESTful 與 MVC 的旅程 之 那些年我不懂的 Rails](https://medium.com/alpha-camp-%E5%8F%B0%E7%81%A3/restful%E8%88%87mvc%E7%9A%84%E6%97%85%E7%A8%8B-%E4%B9%8B-%E9%82%A3%E4%BA%9B%E5%B9%B4%E6%88%91%E4%B8%8D%E6%87%82%E7%9A%84rails-a4bbc12539e2)）等到小妹未來Ruby功力加深後，會續寫30篇Rails面試精選題深入研究的：）



# `.present?`與`.exists?`比較

由於`.present?`來自於`ActiveRecord`，`.exists`來自於`ActiveResource`，它們本質上的意義其實很不同：

`.present?`

```ruby
Ironmen.where(name: 'Ting Ting')

Ironmen Load (8.1ms) SELECT "ironmen".* FROM "ironmen" WHERE "ironmen"."name" = $1 ORDER BY users.id ASC  [["name", 'Ting Ting']]

You have initialized an object!
You have initialized an object!

```

我們看到了初始化`initialized an object`的提示。

`.exists?`

```ruby
Ironmen.exists?(name: 'Ting Ting')

Ironmen Exists (2.4ms)  SELECT 1 AS one FROM "ironmen" WHERE "ironmen"."name" = $1 ORDER BY users.id ASC LIMIT 1  [["name", 'Ting Ting']]

```

我們發現`.present?`與`.exists?`所代表的SQL語法也有所差異：

`.present?`

```ruby
Ironman.where(name: "Ting Ting").present?

# => SELECT COUNT(*) FROM ironman WHERE ironman.name = "Ting Ting";
```

`.exists?`

```ruby
Ironman.exists?(name: "Ting Ting")

# => SELECT 1 AS one from ironman WHERE name ="Ting Ting" limit 1;
```

之前鐵人賽文章曾提到的`Benchmark`標竿測試，我們常比較不同的method在不同數量級的資料下，哪一個效能較佳。相信你也可以像我一樣猜到`.exist?()`來自於確認請求網路資源是否存在的`ActiveResource::Base`，速度當然要飛快才行！[這篇文章的案例](https://www.ombulabs.com/blog/benchmark/performance/rails/present-vs-any-vs-exists.html)標竿測試`.present?`花了900ms(毫秒)，而`.exists?`僅花了1ms!!!

最後，不免俗地來個超級比一比：）

方法 | `.present?()` |`.exists?()`|
------------- | -------------|-------------|
路徑| active_support/core_ext/object/blank.rb | activeresource/lib/active_resource/base.rb|
用途 | 如果物件Object不為`blank`(nil, 空值, 或空白鍵)，回傳`true` |若資源存在，回傳`true` |
特點 | 利用ActiveRecord初始化物件，效能差 | ActiveResource下的方法，效能佳 |


Ref:

* [What is the difference between using .exists?, and .present? in Ruby?](https://stackoverflow.com/questions/13186722/what-is-the-difference-between-using-exists-and-present-in-ruby)
* [What is the point of object.presence?](https://stackoverflow.com/questions/19637499/what-is-the-point-of-object-presence/19637602)
* [Rails API:present?()](https://api.rubyonrails.org/classes/Object.html#method-i-present-3F)
* [Rails API:presence()](https://api.rubyonrails.org/classes/Object.html#method-i-presence)
* [Rails API:exists?(id, options = {})](https://api.rubyonrails.org/v3.1/classes/ActiveResource/Base.html#method-c-exists-3F)
* [Faster Rails: How to Check if a Record Exists](https://semaphoreci.com/blog/2017/03/14/faster-rails-how-to-check-if-a-record-exists.html)
* [Present? vs Any? vs Exists?](https://www.ombulabs.com/blog/benchmark/performance/rails/present-vs-any-vs-exists.html)
* [empty?, blank?, any?, exists? methods of Ruby on Rails ActiveRecord](https://www.ombulabs.com/blog/benchmark/performance/rails/present-vs-any-vs-exists.html)

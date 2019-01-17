---
title:  "Ruby面試精選30題 - Day07 Symbol符號與String字串比較"
preview: "Ruby interview question: What does self mean?"
permalink: "/articles/2018-09-15-day07_ruby_interview_questions_symbol_vs_string"
date:   2018-09-15 14:18:00
layout: post
tags: 
  - "interview"
---

在第六天我們透過程式碼練習`public`，`protected`和`private`method時，發現冒號在前面的參數，`:mydraft`，`:myspace`，這些就是符號`Symbol`。在今天我們就來解釋`Symbol`吧。

<!-- more -->

---

# Ruby經典面試題目 #07

`符號和字串有什麼不同? What’s difference between symbol and string?`

還記得我在之前IT邦文章在Ruby on Rails專案例子中研究ruby的gem套件時，我發現這兩者寫法的功能是一樣的:

```ruby
:image_directory => 'tingsimage'  
```

功能跟下者一樣:

```ruby
image_directory: 'tingsimage'
```

`:冒號在前面`，意思是符號

`冒號在後面:`，意思是給值

當時的發現，也是造就本篇文章想進一步探討~~跑來跑去的小淘氣~~冒號的原因。

我們來用程式碼實驗看看：

```ruby
tingsmessage = "This is my 7th article!"
```

`tingsmessage` 這個`變數`，指向 "This is my 7th article!" 這個`字串物件`，變數的用意，就是讓我的字串物件可以隨時做調整。（明天我的message跑馬燈就會換成第八天的招呼囉！）

如果我們把它變成:`:tingsmessage`的符號呢?

它就會變成`Symbol類別`下的`物件實體`，名字叫做`tingsmessage`。

比一比 | 符號 symbol | 字串 string
------------- | ------------- | -------------
意思  | 有名字的`符號物件`  | 指向`字串物件`的變數
可不可變  | 不可變 immutable  | 可變 mutable
修改陣列 | 不可使用`[]=`方法 | 可使用`[]=`方法修改字串
陣列方法 | 可使用[] 取得陣列內的字元 | 可使用[] 取得陣列內的字元
字元方法  | 可使用.length .upcase .downcase  | 可使用.l.length .upcase .downcase
符號與字串轉換  | 符號轉字串`.to_s` | 字串轉符號`.to_sym`

來用程式碼實作：

`:tingsmessage`這個符號的名字有12個字元，名字的第1個字母是t(陣列位置[0]代表第1個)，第2個字母是i...以此類推:

```ruby
p :tingsmessage.length #12
p :tingsmessage.upcase #TINGSMESSAGE
p :tingsmessage[0] #t
p :tingsmessage[1] #i
```

而`tingsmessage`這個每天都會變來變去的變數，所指向的字串，一共有23個字元:（不信你數數看!）

```ruby
tingsmessage = "This is my 7th article!"
p tingsmessage.length #23
p tingsmessage.upcase #THIS IS MY 7TH ARTICLE!
p tingsmessage[0] #t
p tingsmessage[1] #h
```

身為變數的好處就是可以任意修改。我們來試試改字母：

```ruby
tingsmessage[1] = "Z"
p tingsmessage[1] #Z
p tingsmessage #TZis is my 7th article!
```

然而符號呢？

```ruby
:tingsmessage[1]= "Z"
#undefined method `[]=' for :tingsmessage:Symbol (NoMethodError)
```

符號會找不到`[]=`方法修改字串。你可以想像，符號就如同我們在護照上的名字，是不能修改的。（因為已經被定義在國際間海關通用的資料庫了。）

符號的好處是專一，它被寫在程式裡固定的記憶體位置，所以提取效能較高。我們可以用`object_id`的方法來實驗：

```ruby
  3.times do
    p :tingsmessage.object_id
  end

```

印出結果：

```bash
1041308
1041308
1041308
```

而變來變去的變數每次都在記憶體裡面，搬家到不同位置:

```ruby
  3.times do
    p "tingsmessage".object_id
  end
```

印出結果：

```bash
46936214509440
46936214509260
46936214509180
```

在前述比較表，符號和字串之間可以互相轉換的。

```ruby
p :tingsmessage # :tingsmessage
p :tingsmessage.to_s # tingsmessage 前面的冒號已經不見了！

p tingsmessage # TZis is my 7th article!
p tingsmessage.to_sym # :TZis is my 7th article! 前面多一個冒號
```

# 何時使用符號Symbol

需要效能較高地傳遞參數時，例如在之前我們使用rails建立專案，餐廳名字、電話等...，這些資料庫欄位的名稱是固定不變的：

```ruby
    def restaurant_params
      params.require(:restaurant).permit(:name, :address, :phone, :website, :image)
    end
```

回到文初一開頭，我終於明白，

```ruby
{:image_directory => 'tingsimage'}
```

其實是符號Symbol用在Hash（外圍被大括弧`{}`包著）裡，是變數給值`=>`的意思。

今天超級比一比，就到這裏結束啦！

比一比 | 符號 symbol | 字串 string
------------- | ------------- | -------------
意思  | 有名字的`符號物件`  | 指向`字串物件`的變數
可不可變  | 不可變 immutable  | 可變 mutable
修改陣列 | 不可使用`[]=`方法 | 可使用`[]=`方法修改字串
陣列方法 | 可使用[] 取得陣列內的字元 | 可使用[] 取得陣列內的字元
字元方法  | 可使用.length .upcase .downcase  | 可使用.l.length .upcase .downcase
符號與字串轉換  | 符號轉字串`.to_s` | 字串轉符號`.to_sym`
常用時機  | 用於不需改變值的情況，如Hash的key與value | 需要使用字串才有的方法(如:修改功能)

===

Ref：

* [Top 10 Essential Ruby Interview Questions](https://blog.bater.gq/ruby/2018/02/02/top-10-essential-ruby-interview-questions.html)
* [Ruby on Rails Technical Interview Questions](https://github.com/timurcatakli/ruby-on-rails-interview-questions-answers)
* [數字、字串、陣列、範圍、雜湊、符號](https://railsbook.tw/chapters/06-ruby-basic-2.html#symbol_class)

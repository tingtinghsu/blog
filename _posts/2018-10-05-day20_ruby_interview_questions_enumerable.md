---
title:  "Ruby面試精選30題 - Day20 Ruby的Enumerable列舉"
preview: "Ruby interview question: Why Is Enumerable So Useful?"
permalink: "/articles/2018-10-05-day20_ruby_interview_questions_enumerable"
date:   2018-10-05 13:38:00
layout: post
tags: 
  - "interview"
comments: true
---

30天挑戰已經進入2/3的里程盃了。可喜可賀，恭喜老爺，賀喜夫人！
<!-- more -->

---

重點摘要:
* abstact
{:toc}

---

# Ruby經典面試題目 #20

`Day20 說明Ruby裡Enumerable的實用之處? Why Is Enumerable So Useful?`

列舉(Enumerables)實用之處在於，能夠幫我們方便地走過、搜尋、排序或轉換`集合`內的元素(traverse, , sort, search, and transform collections)。

而集合(Collection)~~跟斯斯一樣~~有三種：`陣列Array`，`雜湊Hash`，`範圍Range`，在前19天練習經典題目時，我都剛好有碰到、並透過舉例了解如何使用～今天就以陣列為例，來進一步深入了解`列舉`的各項技能！

# 1. 在陣列中移動(traverse)

## Array#each

[第14天]時我們曾經比較過`each`和 `map / collect`。延續昨天的舉例，我們來使用季節作為陣列元素：

```ruby
season = ["Spring",
"Summer",
"Autumn",
"Winter"]

p season.each
```

Output:

```ruby
#<Enumerator: ["Spring", "Summer", "Autumn", "Winter"]:each>
```

看到了`Enumerator`這個字眼！

# 2. 排序陣列中的元素(sort)

## Array#sort

`.sort` 會幫我們按造字母順序重新排序

```ruby
p season.sort #["Autumn", "Spring", "Summer", "Winter"]
p season #["Spring", "Summer", "Autumn", "Winter"]
```

`.sort!` 會幫我們按造字母順序重新排序。加了`!`驚嘆號的method通常是提醒我們要小心！注意！因為此方法會改寫原本物件裡的值。在這裡的陣列已經被新的排序改寫：

```ruby
p season.sort! #["Autumn", "Spring", "Summer", "Winter"]
p season #["Autumn", "Spring", "Summer", "Winter"]
```

(`.sort!`會造成氣候變遷～季節大亂啊...)

# 3. 在陣列中搜尋(search)

Ruby提供許多語法幫我們完成搜尋任務。現在就來一一介紹吧！

## 3.0 Array#find_index(object)

我們可以用`find_index`搜尋某個元素的index（索引值，從0開始）

```ruby
p season.find_index("Summer") # 印出index=1
```

## 3.1 Array#first

搜尋陣列中的第1個元素，可以用`.first`方法：

```ruby
p season.first #"Spring"
```

## 當不能確定元素內值的完整資訊時

> Question: 我們想要搜尋出季節陣列裡，開頭是`S`的元素。此題怎解？

## 3.2 Array#select 加上String Methods

在[第9天]時提過字串有許多的方法，這邊要介紹新的兩種: `.include?`與`match()`

### 3.2.1 `String#include?` + `字元符號`

Ans: 陣列方法`.select`可以幫忙做挑選；而在Block`{}`裡面，用`String#include?`做條件判斷，像個過濾網一樣，找出包含大寫`'S'`開頭的元素：

```ruby
p season.select {|s| s.include? 'S'}
# ["Spring", "Summer"]
p season.select {|s| s.include? 't'}
# ["Autumn", "Winter"]
```

### 3.2.2 `String#match()`代入正規表達式

正規表達式（Regular Expression，常簡寫為`RegExp`、`regex`或`RE`）是被用來匹配字串String中，字元組合的模式。

想像我們在用Google大神搜尋資料，最重要的就是輸入`關鍵字`了。有時候我們會在關鍵字加入`+`加號、`|` (OR)，或是用`-`減號剔除篩選字。正規表達具有類似的功能。

同樣的，如果我們想要在進階搜尋的話，就必須使用到正規表達式。

> Q2. 我們想要搜尋出季節陣列裡，第二個字母是`u`的元素。此題怎解？

```ruby
p season.select {|s| s.match(/^*u/)}
# ["Summer", "Autumn"]
```

`/正規表達符號/`放在一組斜線`/`裡面，以上的例子，我們需要將`^`開頭的第一個字元設定為任意字元`*`，第二個字元為`u`(正規表達規則請見[Ruby API說明](http://ruby-doc.org/core-2.4.2/Regexp.html))。

## 3.3 Array#select 搭配 String[/RegExp/]

我們也可以省略String Method，直接在在`block`內用元素s[`/加入正規表達/`]來篩選符合條件的元素

```ruby
p season.select{|s| s[/^*u/]}
# ["Summer", "Autumn"]
```

## 3.4 Array#grep(/RegExp/) :省略block

同樣解法，且程式碼更少的簡便寫法：

```ruby
p season.grep(/^sa/)
# []
```

更多的`.grep`用法看[這裡](http://ruby-doc.org/core-2.0.0/Enumerable.html#method-i-grep)

# 4. 將陣列中的元素作轉換(transform)

在實務上，我們常常將集合內的值做轉換，套用到需要的場景，[第14天]時學過的 `.map`可以在此時派上用場。

## 4.1 Array#map 不改寫陣列裡的值

北半球的天氣漸漸變冷，我來寫一個溫度陣列`temperature`，並用`.map`放入新的零下溫度陣列，但不影響到原本陣列裡的值 ：

```ruby
temperature = [0,1,2,3,4,5,6,7,8,9]
minus_temp = temperature.map{|i| -i}

p temperature.join(", ")   #=> "0, 1, 2, 3, 4, 5, 6, 7, 8, 9"
p minus_temp.join(", ") #=> "0, -1, -2, -3, -4, -5, -6, -7, -8, -9"
```

## 4.2 Array#map! 改寫陣列裡的值

加了`!`驚嘆號的方法又出現了～大家應該可以猜到`.map!`會改變陣列值：

```ruby
temperature = [0,1,2,3,4,5,6,7,8,9]
temperature.map!{|x| x -x}  #將"0, -1, -2, -3, -4, -5, -6, -7, -8, -9"與原陣列各個元素相加  
p temperature.join(',')
#=> => "0,0,0,0,0,0,0,0,0,0"
```

全部變0度啦！

# [番外篇] `enumerable`結合`yield`

[昨天]講過`yield`的功用多多，今天來把它和列舉變數結合，再產生一次新火花～：）

```ruby
class Winter #北半球冬天
  include Enumerable #包含Enumerable Module（否則會出現NomethodError）
  def initialize
    @month = %w[ December January Fabruary]  
  end
  def each # 定義each方法(否則Winter.new.map 會出現 NoMethodError)
    for month in @month do
      yield month
    end
  end
end
p Winter.new.map { |mth| mth.upcase }
# 將月份改成大寫
```

Output:

```ruby
["DECEMBER", "JANUARY", "FABRUARY"]
```

天氣轉涼了，大家要注意保暖唷：）

Ref:

* [ruby-doc.org : Enumerable](http://ruby-doc.org/core-2.4.2/Enumerable.html)
* [ruby-doc.org : Regexp](https://stackoverflow.com/questions/3937431/how-to-search-an-array-in-ruby)
* [Enumerables](http://ruby.bastardsbook.com/chapters/enumerables/)
* [The Enumerable module in Ruby: Part I](https://medium.com/@farsi_mehdi/the-enumerable-module-in-ruby-part-i-745d561cfebf)
* [The Enumerable module in Ruby: Part II](https://medium.com/@farsi_mehdi/the-enumerable-module-in-ruby-part-ii-41f69b36360)
* [How to search an array in Ruby?](https://stackoverflow.com/questions/3937431/how-to-search-an-array-in-ruby)
* [動動手來學 Regular Expression 正規表達式](https://5xruby.tw/posts/learn-regular-expression/)
* [Ruby: filter array by regex?](https://stackoverflow.com/questions/17354864/ruby-filter-array-by-regex)

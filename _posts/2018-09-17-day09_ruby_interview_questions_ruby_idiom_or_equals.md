---
layout: post
title:  "Ruby面試精選30題 - Day09 Ruby的 or-equals 是什麼意思呢? "
date:   2018-09-17 09:18:00 +1000
categories: interview
---

寫了這一系列下來，發現Ruby有許多特別的方法。前幾天講了關於String字串，在第八天我們了解串接(concatenate)與插入interpolation`#{}`方法，就連加號`+`也是方法之一呢。今天要來研究新的字串與數值比較的條件指定運算式(conditional assignment operator)囉！
<!-- more -->
---

# Ruby經典面試題目 #09

`請解釋 Explain this ruby idiom (or-equals) : a ||= b?`

如果a沒有被初始化，或是為空值`nil`或`false`，a等於b；
其他情況下，a值不變。

If a is not initialized (or if it is set to `nil` or `false`), set it with the value of b.

讓我們來看下列的運算式：
指定a的值為1，因此非`nil`或`false`。
a經過`||=`(or-equals)的方法判斷，值仍維持不變 `a=1`:

例子1

```ruby
a = false
b = nil
p a ||= b #a原本為false，印出a=nil
```

例子2

```ruby
a = nil
b = true
p a ||= b #a原本為nil，印出a=true
```

例子3

```ruby
a = 1
b = 2
puts a ||= b #a已指定值，印出a=1
```

看起來很簡單的題目，為什麼特地單獨挑一天說明呢？因為其實這個`or-equals`縮寫，背後大有玄機！

這邊想特別指出是，`a ||= b` 為 `a || a = b`的縮寫：

```ruby
a || a = b
---------------
a ? a : a = b #or eqauls
---------------
if a then a
    else a = b
end
```

如果a沒有被初始化，或是為空值`nil`或`false`，a等於b；
其他情況下，a值不變。

注意，`a ||= b` 並非 `a = a || b`的縮寫，讓我們來比較一下語法含義：

```ruby
a = a || b
---------------
a = a ? a : b
---------------
if a then
    a = a
    else
        a = b
end
```

在(if a then a = a)這個語法上，a已經被比較過兩次（it is evaluated twice），是不是就沒這麼簡潔與精確了呢?

因此，雖然這兩個縮寫印出來都會是 `a = 1`。但意思是很不一樣的。

```ruby
a = 1
b = 2

puts a ||= b  #a=1
puts a || b = b #a=1
puts a = a || b #a=1

```

（在c++程式裡 `a += b` 是 `a = a + b`的縮寫，但Ruby不是C++，詳見[Ruby Forum在2008年時這裡](https://groups.google.com/forum/#!topic/comp.lang.ruby/y1Maaqk_Q7c)的討論串）

如果以擬人化的方式解釋，我會說a是在「成為自己的過程」。
如果a的心裡沒有idea （夢想）尚未被初始化，或者什麼想法都沒有(`nil`)或是負面想法太多(`false`)，
a就會被b影響，變成為b。

我相信我們最終，都不想成為別人，只想成為自己。

> Be Yourself. Everyone Else is Already Taken.

就像Ruby之所以成為Ruby一樣的特別，因為它語法上的創新與簡潔，是其他程式無可取代的。

後記：
為了找這一篇題目的解答，發現google mail list上(10年前)最初關於這個問題的討論串，還蠻感動的！

這或許就是追求知識源頭、逼近真實的過程吧！：）

===

Ref：

* [Top 10 Essential Ruby Interview Questions](https://blog.bater.gq/ruby/2018/02/02/top-10-essential-ruby-interview-questions.html)
* [Ruby on Rails Technical Interview Questions](https://github.com/timurcatakli/ruby-on-rails-interview-questions-answers)
* [What does ||= (or-equals) mean in Ruby?](https://stackoverflow.com/questions/995593/what-does-or-equals-mean-in-ruby)
* [Please explain nuances of ||=](https://groups.google.com/forum/#!topic/comp.lang.ruby/y1Maaqk_Q7c)
* [A short-circuit (||=) edge case](http://davidablack.net/dablog.html#2008/3/25/a-short-circuit-edge-case)

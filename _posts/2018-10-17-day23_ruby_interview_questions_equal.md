---
layout: post
title:  "Ruby面試精選30題 - Day23 Ruby的'=='，'===' 'eql?' 'equal?'"
date:   2018-10-17 09:39:00 -0800
categories: interview
---

前幾天我們把焦點集中在`True or False`(判斷真假)，今天來研究幾個`比較是否相等`的方法！在程式世界裡，`真假`與`相等`都有更多元、更超乎想像的概念。如果是程式新手，可能會對這幾個看起來特別像的運算子：`==`, `===`, `eql?`, `equal?`充滿黑人問號...???

趕快來看看今天的題目！

<!-- more -->

# Ruby經典面試題目 #23

`Day23 解釋Ruby裡的 ==, ===, eql?, equal。 Explain each of the following operators  ==, ===, eql?, equal?`

有些方法比其他的方法更相等(Some are more equal than others)。這是怎麼回事？讓我們繼續看下去～

# 1. `==`

`==` 檢查兩個運算子的`值`是否相等 (check if the value of two operands are equal)

# 2. `eql?`

如果接收器和參數的`值`和`類型`都相等，則為`true`. ( checks if the `value` and `type of two operands` are the same )，

## eql?與 == 比較

來比較一下`==`和`.eql?`的用法：

```ruby
100 == 100.0 #=> true
100.eql?(100.0) #=> false
```

從以上例子看到`100`與`100.0`同樣皆為數值1，但`1`的類型為`Fixnum`，`1.0`的類型為`Float`浮點數（包含小數點）。

# 3. `===`

`===` 測試case語法中、when子句內的相等性 (test equality within the when clause of a case statement)

舉個生活化的例子來描述case語法：

下週我要出遠門旅行，因此我規劃去超市裡購物，在旅行大背包裡放一些食物補給品。我想要以[第7天]學到的符號Symbol將food歸類：

```ruby
 def type_of(food)
  case food
  when 'Apple'
    :fruit
  when 'Banana'
    :fruit
  when 'Chocolate'
    :sweet
  when 'Noodles'
    :meal
  when 'Chips'
    :junkfood
  else
    :unknown
  end
end

p type_of 'Chips' # => :junkfood
```

hmmm....被發現買洋芋片是`垃圾食物了`了！

## === 與 if else

`===`代表的是 `case equality`

以上的`case...when`，其實是從`if...else`加上`===`的語法改寫而來。

```ruby
def type_of(food)
  if 'apple' === food
    :fruit
  elsif 'Chocolate' === food
    :sweet
  elsif 'Noodles' === food
    :meal
  elsif 'Chips' === food
    :junkfood
  else
    :unknown
  end

p type_of 'Nuts' # => :unknown
```

旅行時買一些腰果核桃補充能量，比洋芋片建康一些。XD

補充一下：Ruby的`when`後面可以放多個參數，讓程式更簡潔，因此我來放更多的食物`Orange`和`Bread`進去旅行大背包：

```ruby
 def type_of(food)
  case food
  when 'Apple', 'Banana', 'Orange'
    :fruit
  when 'Chocolate'
    :sweet
  when 'Noodles', 'Bread'
    :meal
  when 'Chips'
    :junkfood
  else
    :unknown
  end
end

p type_of 'Orange' # => :fruit
```

## === 不是 ==

從以上大背包放食物的例子我們可以發現，`===`比的是`case equality in case statement`(更近一步來說，比的是上層的類別物件class object)，所以以下四條判斷式，會顯示為全部為真：

```ruby
p Class  === Class
p Object === Object

p Class  === Object
p Object === Class

# all true. 萬物皆為物件!
```

比較tricky的部分是`Fixnum`，我發現到了如果將`Fixnum`擺在`===(threequality)`的右邊，結果為假：

```ruby
p 1 === 1 # => true
p Fixnum === 1 # => true

p 1 === Fixnum # => false
p Fixnum === Fixnum # => false
#warning: constant ::Fixnum is deprecated
```

[Ruby Gotchas](https://docs.google.com/presentation/d/1cqdp89_kolr4q1YAQaB-6i5GXip8MHyve8MvQ_1r6_s/edit#slide=id.g2fa7c811_0_12)這份slide説明:

> A better name (IMHO, 以我的觀點來說) might be `.describes?`, or overload `.includes?`

這或許就是為什麼我們不能把`拿來比較`的參數放在左邊，而是`右邊`：）

## ===, == 與 Regular Expression

使用`===`的好處就是可以用`正規表示式`提取、比較更多符合我們需求的條件。從以上的結論我們發現要將正規表示式放左邊。參考[Ruby Doc 關於Regexp方法下的Public Instance Methods這頁說明](https://ruby-doc.org/core-2.5.1/Regexp.html#Public%20Instance%20Methods)，我們可以分別用 `===`和 `==` 了解各項舉例是否為真：

```ruby
p /banana/ === 'banana' # => true
p /banana/ === /banana/ # => false

p /banana/ == 'banana' # => false
p /banana/ == /banana/ # => true
```

為何在上述`banana`的例子裡，`/banana/ === 'banana'`為真，而
`/banana/ == 'banana'` 為假呢?

`Regexp#===`是用來`比對(match)`字串是否包含`/正規表示式/`裡的字符號 (tests whether or not the argument matches the regular expression.)。而在此例子裡，`'banana'`字串的確包含`banana`這些字符號。

但`/banana/`和`'banana'`本身並`不是同一個值`，所以`==`結果為假。

# 4. `equal?`

`equal?` : 如果接收器和參數的`物件id`(記憶體位置)相同，則為`true` (compares if both operands refer to the same object i.e. have the same object id)

## equal? 與 eql? 與 == 比較

最後我們來用Ruby is Awesome作為總結吧！

```ruby

ruby = "awesome"
rails = "awesome"

p ruby == rails   # => true #ruby和rails都很awesome!

p ruby.eql? rails # => true
# ruby和rails不但都很awesome, 而且兩者的類型都是字串(string)!

p ruby.equal? rails # => false
#ruby和rails分別存在不同的記憶體位置，它們不是同一個物件
p ruby.object_id #70263932897220
p rails.object_id #70263932897160

```

超級比一比：

== (等於) | === | eql? | equal?
------------- | -------------| -------------| -------------
檢查兩個運算子的值是否相等 | 測試case語法中的`when子句相等性` (object class) | 如果接收器和`參數的值`和`類型`都相等，則為`true` | 如果接收器和參數的`object id`相同，則為`true`

Ref:

* [Ruby Interview Questions - Quizbucket](http://quizbucket.org/explain-each-of-the-following-operators-and-how-and-when-they-should-be-used-eql-equal-4248)
* [Ruby Doc: rxp === str → true or false](https://ruby-doc.org/core-2.5.1/Regexp.html#Public%20Instance%20Methods)
* [Ruby算數運算符](http://www.runoob.com/ruby/ruby-operator.html)
* [Ruby Gotchas](https://docs.google.com/presentation/d/1cqdp89_kolr4q1YAQaB-6i5GXip8MHyve8MvQ_1r6_s/edit#slide=id.p)
* [=== vs. == in Ruby](https://stackoverflow.com/questions/3422223/vs-in-ruby)
* [What does the “===” operator do in Ruby?](https://stackoverflow.com/questions/4467538/what-does-the-operator-do-in-ruby/4467823#4467823)
* [How A Ruby Case Statement Works And What You Can Do With It](https://www.skorks.com/2009/08/how-a-ruby-case-statement-works-and-what-you-can-do-with-it/)
* [The Power of Ruby's Case Statement](http://blog.molawson.com/the-power-of-ruby-s-case-statement)
* [The Elements of Style in Ruby #7: The Case Against ===](http://batsov.com/articles/2013/07/10/the-elements-of-style-in-ruby-number-7-the-case-against-equals-equals-equals/)

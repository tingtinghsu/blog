---
layout: post
title:  "Ruby面試精選30題 - Day10 Ruby invoke method調用方法? "
date:   2018-09-19 10:57:00 +1000
categories: interview
---

不知不覺到了第10天囉！

<!-- more -->

鐵人賽進度1/3（挺胸！）接下來應該會進入學習的深水區，但是我會越戰越勇。路遙知馬力，日久見人心！🏃‍♀️

---

# Ruby經典面試題目 #10

`Ruby如何引入方法? Please explain how Ruby looks up a method to invoke?`

每當不知從何下筆時，我的起手式是開始回顧之前的文章，盤點我已經走了多遠、以及基礎觀念到底掌握了多少：

鐵人賽足跡 | 面試問題 | 我的總結
------------- | ------------- | -------------
Day 1 | class  | class建立物件實體，以method和資料互動
Day 2 | class與 module | class可繼承，module不可繼承
Day 3 | module  | module裡的method可被include和extend
Day 4 | instance method與class method | include用於instance method, extend用於class method
Day 5 | self物件與singleton method  | singleton method是singleton class的instence method
Day 6 | public, protected, private method| 在classs外無法取得protected或private method
Day 7 | symbol與string| `:符號` symbol class的物件實體，object_id相同 / `字串:` string變數指向字串物件，object_id不同
Day 8 | `concat` 與 `+=` method| 以`concat`串接， object_id相同 / `+=` object_id不同
Day 9 |  `||=` method| (or-equals)條件判斷 `a||=b`是 `a || a = b`縮寫，意思為條件運算式 `a ? a : a = b`

洋洋灑灑地條列出這麼多方法之後，我們好奇的問，Ruby到底是怎麼尋找這些方法的呢？

Ruby最先尋找的地方是物件的`eigenclass`（特徵類別，物件上層的隱藏類別)method會直接定義在裡面，如同[Day 5](https://tingtinghsu.github.io/ruby/rails/interview/junior/2018/09/14/day05_ruby_interview_questions_self_-singleton_method.htmln)提到的singleton method(類別方法)。

如果Ruby沒有辦法在物件的`eigenclass`找到，它會尋找此物件class所屬的上一層(ancestor)class、層層往上搜尋，深入到[Object](https://ruby-doc.org/core-2.5.1/Object.html)、到[Kernal](https://ruby-doc.org/core-2.5.1/Kernel.html)、最後去[BasicObject](https://ruby-doc.org/core-2.5.1/BasicObject.html)搜尋method是否在裡面。

![https://s3-ap-southeast-2.amazonaws.com/tingsrailsdemo/class.png](https://s3-ap-southeast-2.amazonaws.com/tingsrailsdemo/class.png) [圖片來源](https://ruby-china.org/topics/33308)

如果都找不到Method的話呢？

不用擔心，Ruby就像Google Map一樣給予提示，它會在內部搜尋另一個:`method_missing` method給這個物件的class，提供Ruby工程師解bug的線索：

```ruby
undefined method `某方法名稱' (NoMethodError)
```

這個線索我們並不陌生，因為我們已經有多次經驗了：

在[Day 6]，無法使用class裡的方法`.protected`及`private`

```ruby
day6.protected #=> undefined method `protected' (NoMethodError)
day6.private #=> undefined method `private' (NoMethodError)
```

在[Day 7]Symbol找不到方法`[]=`

```ruby
:tingsmessage[1]= "Z"
#undefined method `[]=' for :tingsmessage:Symbol (NoMethodError)
```

我從<https://ruby-doc.org/core-2.5.1/>列出我在前十篇文章所用到的實體方法(Public Instance Methods)，整理表格如下：

[Object](https://ruby-doc.org/core-2.5.1/Object.html)| [Kernal](https://ruby-doc.org/core-2.5.1/Kernel.html) | [BasicObject](https://ruby-doc.org/core-2.5.1/BasicObject.html)
------------- | ------------- | -------------
`class` →class | `puts`(obj, ...) → nil  | `object_id` →integer
`extend`(module) →obj  | `String(arg)` → string | `send`(symbol [, args...]) → obj
 `singleton_method`(sym) → method | `Hash(arg)` → hash  |  `new()`*這個是Public Class Methods！*

為了更清楚釐清自己的觀念，我決定用英文整理出這10天的學習紀錄：

觀念 | 解釋
------------- | -------------
 [class](https://ruby-doc.org/core-2.5.1/Class.html)  | Classes in Ruby are first-class objects.
 [module](https://ruby-doc.org/core-2.5.1/doc/syntax/modules_and_classes_rdoc.html) | Modules serve two purposes in Ruby, namespacing and mix-in functionality.
 [class method](https://ruby-doc.org/core-2.5.1/doc/syntax/modules_and_classes_rdoc.html#label-Methods) | Class methods (methods on a module) may be called directly.
[instance method](https://ruby-doc.org/core-2.5.1/doc/syntax/modules_and_classes_rdoc.html#label-Methods) | Instance methods defined in a module are only callable when included.
[include](https://ruby-doc.org/core-2.5.1/Module.html) |when the module is included, istance methods appear as methods in a class. (module methods do not.)
[extend](https://ruby-doc.com/core/Object.html#method-i-extend) | Adds to obj the instance methods from each module given as a parameter.
[self](https://ruby-doc.org/core-2.5.1/doc/syntax/modules_and_classes_rdoc.html#label-self)  | Self refers to the object that defines the current scope. (it will change when it a different method or a new module) .
[singleton class](https://ruby-doc.com/core/Object.html#method-i-singleton_method)  | If object is nil, true, or false, it returns NilClass, TrueClass, or FalseClass. (*可以直接存取，而不需要實體化此類別的物件。*)
[singleton method](https://ruby-doc.org/docs/ruby-doc-bundle/UsersGuide/rg/singletonmethods.html)  | The behavior of an instance is determined by its class.
[public method](https://ruby-doc.com/core/Module.html#method-i-public)| With no arguments, sets the default visibility for subsequently defined methods to public. With arguments, sets the named methods to have public visibility.
[projected method](https://ruby-doc.com/core/Module.html#method-i-protected) | If a method has protected visibility, it is callable only where self of the context is the same as the method.
[private method](https://ruby-doc.com/core/Module.html#method-i-private) | With no arguments, sets the default visibility for subsequently defined methods to private. With arguments, sets the named methods to have private visibility.
[symbol](https://ruby-doc.com/core/Symbol.html)| Symbol objects represent names and some strings inside the Ruby interpreter.
[string](https://ruby-doc.com/core/String.html)| A String object holds and manipulates an arbitrary sequence of bytes
[concat](https://ruby-doc.com/core/String.html#method-i-concat) (string method)| Concatenates the given object(s) to str. If an object is an Integer, it is converted to a character before concatenation.
[+](https://ruby-doc.com/core/String.html#method-i-2B) (string method)| Concatenation — Returns a new String containing
[true`|`](https://ruby-doc.com/core/String.html#method-i-2B) (TrueClass method)| Or—Returns true. As obj is an argument to a method call, it is always evaluated

感想：

為了做Ruby如何invoke method的表格，我竟然把Ruby API的[Object](https://ruby-doc.org/core-2.5.1/Object.html) ，[Kernal](https://ruby-doc.org/core-2.5.1/Kernel.html) ，[BasicObject](https://ruby-doc.org/core-2.5.1/BasicObject.html) 頁面翻閱了一遍，了解輸入的參數怎麼用、已經輸出的物件會是什麼形式。這是我過去從來沒想過自己可以做得到的事（感覺翻手冊是高手才看得懂的境界啊！）經過這10天成長收穫巨大！

明天來繼續研究更多method!!!! :)

===

Ref：

* [Top 10 Essential Ruby Interview Questions](https://blog.bater.gq/ruby/2018/02/02/top-10-essential-ruby-interview-questions.html)
* [Ruby on Rails Technical Interview Questions](https://github.com/timurcatakli/ruby-on-rails-interview-questions-answers)
* [Ruby-Core](https://ruby-doc.com/core/index.html)
* [Please explain nuances of ||=](https://groups.google.com/forum/#!topic/comp.lang.ruby/y1Maaqk_Q7c)
* [A short-circuit (||=) edge case](http://davidablack.net/dablog.html#2008/3/25/a-short-circuit-edge-case)

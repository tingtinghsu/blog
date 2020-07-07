---
title: "Ruby面試精選30題 - Day28 Ruby的 ** (double splat) operator"
preview: "Ruby interview question: What does double splat operator do?"
permalink: "/articles/2018-10-31-day28_ruby_interview_double_splat"
date: 2018-10-31 10:58:00
layout: post
tags: 
  - "interview"
comments: true
---

今天要了解無敵星星`single splat`和`double splat`的用法！
<!-- more -->

---

重點摘要:
* abstact
{:toc}

---

# Ruby經典面試題目 #28

Ruby的`**`運算子是啥米碗糕?  
What does ** double splat) operator do?`


# * single splat

要了解 `double splat`前，讓我們先來聊聊 `single splat`的用法。

## 1. 方法代入的參數：將list轉成array

自從IT鐵人賽開始後，我慢慢發現用Ruby程式碼寫日記還挺有趣的！現在建一個可以傳入參數(`*args`)`ironmandairy`方法，並在方法外設定鐵人賽日記的作者(:ting, `:symbol`)，文章數(30, `fixnum`)，主題(topic: :ruby, `hash`)。為了讓程式碼多樣化，特地想一些型態各自不同的參數，形成數組(`list`)：

```ruby
def ironmandairy(*args)
  p args
end

ironmandairy :ting, 30, topic: :ruby # => [:ting, 30, {:topic=>:ruby}]
```

我在2018年10月份最重要的`project`:鐵人賽日記被印出來啦！資訊包含我的名字、文章數和主題。

## 2. 方法代入的參數：用block輸出多個值

今天是10月的最後一天了。再過5天，我就要離開住了5年的澳洲，搬去另一個國家體驗另一階段的生活，因此最近密集地跟好友們聚餐。我想寫個method印出朋友的名字，紀念這些日子的陪伴：

```ruby
def say_goodbye(*friend)
  friend.each { |name| puts "Thanks #{name}! Hope our paths will cross in the future." }
end
 
say_goodbye("Claire", "Thomas", "Sarah", "Magrit","Mia","Soumen", "Ling")
```

Output:

```ruby
Thanks Claire! Hope our paths will cross in the future.
Thanks Thomas! Hope our paths will cross in the future.
Thanks Sarah! Hope our paths will cross in the future.
Thanks Magrit! Hope our paths will cross in the future.
Thanks Mia! Hope our paths will cross in the future.
...
...
...

```

要感謝的朋友太多了～

那就感謝天吧：）

## 3. 方法外使用`*`的時機: 將array反轉成list

`* single splat operator`可以將陣列轉為數組。5天之後我將會從雪梨前往大阪，所以我來寫一個`travel` method～期待期待:

```ruby
def travel(from, to)
  puts "Hello #{to.capitalize}. #{from.capitalize} see you another time!"
end

itinerary = %w(australia japan)
travel *itinerary
```

Output:

```ruby
Hello Japan. Australia see you another time!
```

## *single splat在array裡: 代表其他未被指定的值

以上三個例子橫跨了arry, list, hash和block. 現在來用簡單的例子看`*`的作用：

```ruby
a, b = [:a, :b]
p a # => :a
p b # => :b

# 只指定陣列中前兩個參數的值
a, b = [:a, :b, :x, :y, :z] # :x, :y, :z is missing
p a # => :a
p b # => :b

# 將陣列中沒用到的值給 * single splat operator
a, *others = [:a, :b, :x, :y, :z] 
p a # => :a
p others # =>[:b, :x, :y, :z]

# 除了第一個值其他不重要的話， *others還可以省略不寫
first ,= [:a, :b, :x, :y, :z]
p first # => :a
```

# *single splat 和 **double splat 比較

為了比較`*single splat`和 `**double splat的差異`，我們來寫一個可以代入三個參數的方法`splat`：(OS:你要0顆星、1顆星、還是2顆星??)

```ruby
def splat(a, *b, **c)
  [a, b, c]
end
```

接下來是超級~~大亂鬥~~比一比時間了，請各位客倌仔細瞧瞧！

```ruby

p splat 0
# => [0, [], {}]

p splat 0, 1
# => [0, [1], {}]
# 不出所料，single splat果然把1轉成Array[1]了

p splat 0, 1, 2
# => [0, [1, 2], {}]
# *single splat在array裡: 代表其他未被指定的值，所以把2也搶進來，變成array[1, 2]
# **double splat:顯示為{}，看來跟hash很有關聯

p splat 0, 1, 2, d: 3, e: 4
# => [0, [1, 2], {:d=>3, :e=>4}]
# **double splat:顯示為hash{:d=>3, :e=>4} 

p splat 0, d: 3, e: 4
# => [0, [],{:d=>3, :e=>4}]
# 0指定給a, 其餘並沒有留下任何數值給*single splat: 顯示為空陣列[]
```

最後的最後，來寫幾行**double splat的Ruby code，祝大家在鐵人賽旅程的尾聲，旅途愉快！

```ruby
def airport(city:, **iatacode)
  p city, iatacode
end

airport city: 'Osaka', code: :KIX
airport city: 'Sydney', code: :SYD
airport city: 'Cairns', code: :CNS
airport city: 'Taipei', code: :TPE
airport city: 'Love', code: :IOU
```

Output:

```ruby
"Osaka"
{:code=>:KIX}
"Sydney"
{:code=>:SYD}
"Cairns"
{:code=>:CNS}
"Taipei"
{:code=>:TPE}
"Love"
{:code=>:IOU}
```

`<3 <3 <3`

Ref:

* [What does a double * (splat) operator do](https://stackoverflow.com/questions/18289152/what-does-a-double-splat-operator-do)
* [Splat goes Ruby](https://dev.firmafon.dk/blog/splat-goes-ruby/)
* [Drat! - Ruby has a Double Splat](https://dev.firmafon.dk/blog/drat-ruby-has-a-double-splat/)
* [Naked asterisk parameters in Ruby](http://andrewberls.com/blog/post/naked-asterisk-parameters-in-ruby)
* [ruby – 什么是double *(splat)操作符](https://codeday.me/bug/20170531/18871.html)

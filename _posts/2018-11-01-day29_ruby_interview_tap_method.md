---
title:  "Ruby面試精選30題 - Day29 Ruby的tap method"
preview: "Ruby interview question: What is tap method in Ruby?"
permalink: "/articles/2018-11-01-day29_ruby_interview_tap_method"
date:   2018-11-01 13:58:00

layout: post
tags: 
  - "interview"
---

倒數第。二。篇！成功就在不遠處，可喜可賀！（翹腳捻鬍鬚～～）
話不多說，趕緊進入正文：
<!-- more -->

---

重點摘要:
* abstact
{:toc}

---

# Ruby經典面試題目 #29

`Day29 請解釋Ruby的tap method?  What is tap method in Ruby?`

Tap method可以幫助我們更容易取得`Block區塊`裡的`Object`物件，且更便於除錯。（do something with an object inside of a block, and always have that block return the object itself.）


# tap() public

來看看[Ruby API文件](https://apidock.com/ruby/Object/tap)的說明：

> Yields x to the block, and then returns x.

Ruby source code:

```ruby
VALUE
rb_obj_tap(VALUE obj)
{
    rb_yield(obj);
    return obj;
}
```
`Tap method`幫我們改進了在[第14天: Ruby 的 block, proc, lamdba方法比較](https://ithelp.ithome.com.tw/articles/10201297)中我們整理的block的特點：`不是物件`、`不是參數`、`沒有回傳值`。

讀完以下[Rails API文件](https://apidock.com/ruby/Object/tap)source code，讓我更明白能表達`tap method`的精髓：

```ruby
# File activesupport/lib/active_support/core_ext/object/misc.rb, line 53
  def tap
    yield self
    self
  end
```

真是簡單又好用！

# 例子1- traditional method: 類別與方法

從2018年10月4日，鐵人賽開賽[Day1](https://ithelp.ithome.com.tw/articles/10199897)到今天，我從Ruby新新手慢慢累積，每天累積一點點的觀念釐清，現在寫得出像這樣的架構：

```ruby
class Ironman
  attr_accessor :name

  #class method
  def self.create_ironman
    ironman = Ironman.new
    ironman.name = "Ting Ting"
    ironman #回傳值。若在tap method中，此行就可省略
  end
end

ironman = Ironman.create_ironman
puts ironman.inspect
#<Ironman:0x00007fb9df069d70 @name="Ting Ting">
```

# 例子2- Tap Method

`Tap method`其實是透過透過`yield`某個`object`物件進入`block`，再傳回此`object`。(讓我想到投籃得分時，籃球進框再回彈到手中的感覺！)


所以，我們可以把例子1的傳統方法改成`tap method`

```ruby
class Ironman
  attr_accessor :name

  def self.create_ironman
    Ironman.new.tap do |i|
      i.name = "Ting Ting"
    end
  end
end

ironman = Ironman.create_ironman
puts ironman.inspect
#<Ironman:0x00007f8496949c20 @name="Ting Ting">
```

# tap methhod的用途: 檢查method chain，便於除錯

有的時候我們寫出一個比較複雜的方法，方法裡還有其他方法（稱為method chain）。Tap method可以幫我們更容易檢測method chain裡的值。(例如在[第14天](https://ithelp.ithome.com.tw/articles/10202250)有舉過一個Hash#map結合 Array#map複雜方法的例子。)

> The primary purpose of this method is to “tap into” a method chain, in order to perform operations on intermediate results within the chain.

現在來看看以下案例。我們要從`1,2,3,4,5`數字中，像尋找犯人一樣層層找出需要的資訊：

* 1 列出陣列值 [1, 2, 3, 4, 5]
* 2 選出偶數的值 [2, 4]
* 3 將選出的偶數做完平方 [4, 16]

```ruby
(1..5).tap { |x| puts "element: #{x.inspect}" }.to_a
  # => element: 1..5
  .tap { |x| puts "array: #{x.inspect}" }
  # => array: [1, 2, 3, 4, 5]
  .select { |x| x%2 == 0 }
  .tap{ |x| puts "evens: #{x.inspect}" }
   # => evens: [2, 4]
  .map{ |x| x*x }
  .tap{ |x| puts "squares: #{x.inspect}" }
   # => squares: [4, 16]
```


> tap enables you to “tap into” a method chain and perform some tangential function.

感想：經過3小時的研究之後，發現Tap method用在`集合collection`真的說是非常方便！未來邁向成為資深工程師的道路，寫更複雜的method時，就可以流露出（就算程式碼有錯誤，我也能夠快速找到）的自信了！

Ref:

* [API dock: Ruby/Object/tap](https://apidock.com/ruby/Object/tap)
* [API dock: Rails/Object/tap](https://apidock.com/rails/v2.3.8/Object/tap)
* [Ruby: Tap that method](https://medium.com/aviabird/ruby-tap-that-method-90c8a801fd6a)
* [The Ruby 'Tap' Method for Objects](http://kronosapiens.github.io/blog/2014/02/16/the-ruby-tap-method-for-objects.html)
* [The Ruby Tap Method](https://www.youtube.com/watch?v=QAJMxBkYaUQ)

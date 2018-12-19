---
layout: post
title:  "Ruby面試精選30題 - Day27 Ruby裡的Hash預設值"
date:   2018-10-30 20:58:00 +1000
categories: interview
---

在[第14天](https://ithelp.ithome.com.tw/articles/10202250)的時候，我們曾經提到`Hash(雜湊)`是一對`key(鍵)`與`value(值)`的集合。今天的大哉問是，我們要如何設定預設值呢？
<!-- more -->

# Ruby經典面試題目 #27

`Day27 如何設定Ruby的Hash預設值? How to set default value in hash?`

首先，起手式就是來翻閱[Ruby API手冊](http://ruby-doc.org/core-2.4.2/Hash.html#method-c-new)看看裡面的例子，並依照我自己的喜好，改寫成容易被我記憶學習的變數。

# Hash 與 Array

記得我在[第14天](https://ithelp.ithome.com.tw/articles/10202250)使用過銀行帳戶的例子，在這裡繼續沿用類似的情境。假設我創建一個hash記錄我的銀行帳戶名稱和存款金額: 

```ruby
hbank = Hash.new("Bank Name")
hbank["CAN"] = 100
hbank["NAB"] = 200

p hbank.keys #=> 銀行名["CAN", "NAB"]
p hbank.values #=> 存款金額[100, 200]

p hbank["CAN"]  #=> 100
p hbank["NAB"] #=> 200
```

如果我要查閱某個並沒有在此Hash的銀行名稱呢？

```ruby
p hbank["WEST"]           #=> "Bank Name"
```

它會出現預設值`Bank Name。

如果你以為這題面試題這麼簡單，那就大錯特錯了！（~~不要來～污辱我的美~~）我們必須深入探討另一個常見實務場景：如何改動Hash裡的值呢？

你或許會想到：使用`method`!趕快搬出常見的字串方法使一使：

```ruby
p hbank["WEST"]           #=> "Bank Name"
p hbank["WEST"].upcase!   #=> "BANK NAME"
p hbank["WEST"]           #=> "BANK NAME"
```

[第14天](https://ithelp.ithome.com.tw/articles/10202250)講過：

> 加上!驚嘆號的方法，通常代表小心！注意！的意思。`Array#.map!`方法會讓原本的物件陣列值被改變！

因此這裡的 `string#.upcase!`就讓Hash裡的`Bank Name`硬生生地變成`BANK NAME`了。因此，我們了解到`陣列`是個`可變的`物件。（Array in Ruby is mutable object）

# Hash 與 Block

要預設Hash，我們還必須複習[第11天](https://ithelp.ithome.com.tw/articles/10201297)的`block(區塊)`，因為Hash和block有密不可分的關係！

```ruby
hbank_key = Hash.new { |hash,name| hash[name] = "Bank Name: #{name}" }

p hbank_key["ANZ"]           #=> "Bank Name: ANZ"
p hbank_key["ANZ"].upcase!   #=> "BANK NAME: ANZ"
p hbank_key["ANZ"]
#=> "BANK NAME: ANZ" 變大寫了
p hbank_key["CBA"]           #=> "Bank Name: CBA" 還是小寫
p hbank_key.keys           #=> ["ANZ", "CBA"]
```

`hbank_key`這個雜湊的例子比第一個版本`hbank`稍微進步，讓`hbank_key["CBA"]`的‘值並不會因為`hbank_key["ANZ"].upcase!`作怪，而受到影響。

[Stackovrflow 原文](https://stackoverflow.com/questions/2698460/strange-unexpected-behavior-disappearing-changing-values-when-using-hash-defa)這句話解釋的很清楚：

> It is the block’s responsibility to store the value in the hash if required.

# Hash `<<`與 `+=`結合比較

如果我們~~硬要唱反調~~，讓Hash設定default value時不使用block，看會發生什麼情況？

## 1. hash: 用 << 指定值

我們在[第17天](https://ithelp.ithome.com.tw/articles/10203332)已了解到：`<< 會改變常數`，因此`hsh_array[:z]`被指定了新值。

```ruby
hsh_array = Hash.new([])
p hsh_array # => {} 預設是空hash
hsh_array[:a] << 'This is symbol a'
hsh_array[:b] << 'This is symblo b'

p hsh_array[:z]
# => ["This is symbol a", "This is symblo b"]

p hsh_array # => {} hash不變，仍是空hash
```

## 2. hash, block 與 <<

例子1 在`Hash`內使用`<<`指定值時(the assignment way)，`hsh_array[:z]`原本預設為[]，卻受到[:a]與[:b]的改變而影響：那改成`<<`(the mutable way)呢？

```ruby
hsh_block = Hash.new { |h, k| h[k] = [] }

p hsh_block[:a] << 'This is symbol a'  #=> ["a"]
p hsh_block[:b] << 'This is symblo b'  #=> ["b"]

p hsh_block[:z] #[]
p hsh_block            #=> {:a=>["This is symbol a"], :b=>["This is symblo b"], :z=>[]}
```

## 3. hash: 用 += 改變值

關於串接字串，來複習一下[第8天](https://ithelp.ithome.com.tw/articles/10200836)的`+=`是`mutable`的方法，其`object_id`會隨著新串接上的字串，而改變記憶體位置。

```ruby
hsh_plus = Hash.new([])
p hsh_plus  # => {} 預設是空hash
p hsh_plus[:a] += ['This is symbol a']
p hsh_plus[:b] += ['This is symblo b']

p hsh_plus[:z]
# => [] 空array

p hsh_plus
# {:a=>["This is symbol a"], :b=>["This is symblo b"]}
# hash is mutable< 預設值已被改變
```

## 4. hash: 用 += 與 `freeze?` 固定值

最後，如果要讓hash的`+=`不透過block的作用也能變成`imutable`，我們就要來複習[Day17](https://ithelp.ithome.com.tw/articles/10203332)的`freeze?`方法：

```ruby
hsh_freeze = Hash.new([].freeze)
p hsh_freeze[:a] += ['This is symbol a']  #=> ["This is symbol a"]
p hsh_freeze[:b] += ['This is symbol b']   #=> ["This is symbol b"]
p hsh_freeze[:z]           #=> [] #=> hash值不受更動，仍為空
p hsh_freeze              #=> {:a=>["This is symbol a"], :b=>["This is symbol b"]}
```

結論：

看完幾篇文章，發現有寫工程師偏好不要變動預設變數、但也有些人偏好能夠更彈性的變動變數，端看個人開發習慣。不過寫完落落長的比較，這個結論你一定要熟記喔！

> We must store the default value in the `hash` from within the `block` if we wish to use `<<` instead of `<<=`

Ref:

* [10 Ruby tricks to improve your code](https://devblast.com/b/ruby-tricks-improve-code)
* [Ruby hash default value behavior](https://stackoverflow.com/questions/16159370/ruby-hash-default-value-behavior)
* [Strange, unexpected behavior (disappearing/changing values) when using Hash default value, e.g. Hash.new([])](https://stackoverflow.com/questions/2698460/strange-unexpected-behavior-disappearing-changing-values-when-using-hash-defa)
* [Ruby API: Hash.new](http://ruby-doc.org/core-2.4.2/Hash.html#method-c-new)

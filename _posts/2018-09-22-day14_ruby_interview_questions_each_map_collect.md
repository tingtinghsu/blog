---
layout: post
title:  "Ruby面試精選30題 - Day14 each, map 和 collect 比較 "
date:   2018-09-22 08:30:00 +1000
categories: interview
---

今天要講的是迭代器(iterator)。迭代器會一個一個地傳回集合裡的元素，讓我們可以利用迭代方法做重複的事。在Ruby裡的`collection`集合裡有`Array`陣列和`Hash`雜湊。今天要介紹三種用在集合的迭代器分別叫，`each`，`map`和`collect`，這也是常見的Ruby面試考題喔。
<!-- more -->

---

# Ruby經典面試題目 #14

`Day14 each, map 和 collect 比較? What's the difference between each, map and collect?`

我們來用這三種迭代器，在Array和Hash兩種集合裡面各舉例子：

# Array

## Array#each

最近我在進行旅行存錢計劃。我有三個銀行帳戶，NAB, CAN, 和WESTPAC，開戶金額分別為100,200,300。所以我寫一個陣列集合放入初始金額。

假設我打算開始從本週開始在每個帳戶存入50元，本週+50元。我們可以在陣列後加上`.each`方法：（注意：`puts`寫在`block`大括號裡）

```ruby
[100,200,300].each {|n| puts n+50}
```

結果列出各個帳戶的金額：

```ruby
150
250
350
```

經過`.each`方法作用之後，只會分別印出同一陣列中各個元素的值，不會產生新陣列。

## Array#collect

以上案例，換成`.collect`試試看：（注意！puts擺在前面）

```ruby
p [100,200,300].collect {|n| n+50}
```

`.collect`會幫我們把結果放入新的陣列。結果印出：

```ruby
[150, 250, 350]
```

## Array#map

同樣的，``.map``方法也會幫我們產生新的陣列。

```ruby
p [100,200,300].map {|n| n+50}
```

結果印出：

```ruby
[150, 250, 350]
```

那`.collect`與`.map`又有什麼不同？以及分別用在什麼情況呢？這時候就要翻查Ruby手冊裡，關於[.collect](http://ruby-doc.org/core-2.5.1/Array.html#method-i-collect)和[.map](http://ruby-doc.org/core-2.5.1/Enumerable.html#method-i-map)的介紹了:

>`collect { |item| block } → new_ary` Invokes the given block once for each element of self. Creates a new array containing the values returned by the block.

hmm...好像看不出有什麼差異呢！

> `map { |obj| block } → array` Returns a new array with the results of running block once for every element in enum.

近一步查詢[stackoverflow](https://stackoverflow.com/questions/9429034/what-is-the-difference-between-map-each-and-collect)map是collect的別名 (map is an alias for collect)，實務上，比較常使用`map`喔！

## 更多Array#map用法

我想把我的銀行帳戶陣列放進account變數，再用`.inspect`檢查陣列的值：

```ruby
account = [100, 200, 300]
account.map {|n| n+50}
p account.inspect
```

結果印出

```ruby
"[100, 200, 300]"
```

如果在`.map`後加上驚嘆號`.map!`呢?

```ruby
account.map! {|n| n+50}
p account.inspect
```

存進去原本的陣列了。錢錢變多了！開心～～（加上!的方法，代表原本的物件會被改變）

```ruby
"[150, 250, 350]"
```

# Hash

`Hash`雜湊是一對`key`與`value`的集合。在剛剛的銀行帳戶例子裡，我們可以把`銀行名稱`當作`索引`，`存款數目`當作`值`：

```ruby
account = {"NAB" => 100, "CAN" => 200, "WEST" => 300}
```

利用雜湊來展現，這樣就可讀性更加清楚了。

## Hash#each

現在我想要計算三個帳戶加總共有多少錢，以`.each`的方式可寫為：

```ruby
mymoney = 0
account.each {|bankname, saving| mymoney += saving} #把索引和值列出
print "My Money: $ " + mymoney.to_s
```

或是

```ruby
mymoney = 0 #設定初始值
account.each{|bank| mymoney += bank[1]} #依序加總bank集合裡第二個元素bank[1]
print "My Money: $ " + mymoney.to_s
```

結果都會印出：

```ruby
My Money: $ 600  
```

## Hash#map

在Hash裡，把`.each`換成`.map`或是`.collect`：

```ruby
mymoney = 0 #設定初始值
account.collect{|bank| mymoney += bank[1]} #依序加總bank集合裡第二個元素bank[1]
print "My Money: $ " + mymoney.to_s
```

結果都是一樣的：

```ruby
My Money: $ 600  
```

## Hash#map 結合 Array#each 與 Array#map

現在要進階到一個較為複雜的例子：`hash`裡包含`索引`和`值`兩部份，那我們可不可以把`陣列`當作值放在裡面呢？當然可以！

假設我的NAB銀行下有2個子帳戶，CAN銀行下有3個子帳戶，分別放入這些資產：

```ruby
hash = { "NAB" => ["Cash", "Gold"], "CAN" => ["Bitcoin", "Litecoin", "Ethereum"] }
```

利用`hash.map`會產生一個新的陣列：(進一步了解看[這裡](https://stackoverflow.com/questions/16281983/hash-map-method))

```ruby
p hash.map {|n| n}
```

結果顯示：

```ruby
[["NAB", ["Cash", "Gold"]], ["CAN", ["Bitcoin", "Litecoin", "Ethereum"]]] #我有好多帳戶!NAB下有2個，CAN下有3個
```

我想分別提取出`銀行:帳戶名稱`的這一對資訊，並且用逗號`.join(", ")`隔開。

為了程式可讀性，`hash`的`索引`命名為`bank`(銀行名)，`值`為`account_arry`(放了不同數目的子帳戶陣列)。在走`account_arry.each`展開陣列迭代器時，每在集合裡走完一個元素，就印出`#{bank}: #{sub_account}`

```ruby
p hash.map {
            |bank, account_arry| account_arry.each{
                |sub_account| "#{bank}: #{sub_account}"}
        }.join(", ")
```

結果僅印出：

```ruby
"Cash, Gold, Bitcoin, Litecoin, Ethereum"
```

奇怪，這不是我要的結果呀！我很希望帳戶前面能顯示出銀行名稱呢！

這是因為剛剛說過，`arry.each`會回傳**陣列本身**，在這個例子🌰裡，分別回傳的是`["Cash", "Gold"]`和`["Bitcoin", "Litecoin", "Ethereum"]`

改成`.map`試試看：

```ruby
p hash.map {
            |bank, account_arry| account_arry.map{
                |sub_account| "#{bank}: #{sub_account}"}
        }.join(", ")
```

結果顯示為：

```ruby
"NAB: Cash, NAB: Gold, CAN: Bitcoin, CAN: Litecoin, CAN: Ethereum"
```

這是因為`account_arry.map`自動幫我們產生新的陣列，放進`bank`與對應的`sub_account`並回傳。

最後放個小小的比較作為總結，祝福大家collect不同的資產，不管是有形的財富、還是無形的知識，最後都可以達成錢多多的心願喔！

each | map / collect
------------- | -------------
Array方法 | Enumerable(列舉)方法
回傳Array本身 | 產生新的Array並回傳

===

Ref：

* [21 Essential Ruby Interview Questions](https://www.toptal.com/ruby/interview-questions)
* [what's different between each and collect method in Ruby](https://stackoverflow.com/questions/5347949/whats-different-between-each-and-collect-method-in-ruby)
* [Array#each vs. Array#map](https://stackoverflow.com/questions/5254128/arrayeach-vs-arraymap)
* [Ruby-doc.org : collect](http://ruby-doc.org/core-2.5.1/Array.html#method-i-collect)
* [Ruby-doc.org : map](http://ruby-doc.org/core-2.5.1/Enumerable.html#method-i-map)
* [Ruby-doc.org : hash#each](http://ruby-doc.org/core-2.5.1/Hash.html#method-i-each)
* [Hash.map method](https://stackoverflow.com/questions/16281983/hash-map-method)

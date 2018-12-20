---
layout: post
title:  "Ruby面試精選30題 - Day22 and 和 or 比較"
date:   2018-10-16 07:51:00
categories: interview
---

`and` 和 `&&` 以及 `or` 和 `||` 的意思雖然一樣，但就像以前在數學課學過的`先乘除後加減`的概念一樣，程式中的運算子之間也具有優先順序之分。符號的`&&`, `||` 的優先權高於關鍵字`and`, `or`，請參考[Ruby API](https://ruby-doc.com/core/doc/keywords_rdoc.html)。

<!-- more -->

# Ruby經典面試題目 #22

`Day22 [and], [or] 和 [&&], [||] 比較? What is the difference between [and]`, `[or]` and `[&&]`, `[||]` ?`

<!-- more -->

基本上而言：

* `and` 就是 `&&`（且）
* `or` 就是`||` （或）

# short-circuit evaluation 最短路徑計算

事有輕重緩急，資源要放在要緊的地方。要比較哪個運算式先處理之前，在此我們介紹一個概念：`short-circuit evaluation`(又稱：短路計算、捷徑計算、最小化計算)。

當表達式的結果已經確定時，程式會節省資源，減少不必要的運算。不管是`&&`.`||`還是`and`.`or`，都會符合`最短路徑計算`原則。

舉個例子來說：

```ruby
a = 0
b = 1
if (a == 1 && b%2 == 1)
  p "true"  
else
  p "false"
end # => false
```

在以上的例子裡，`&&`代表括弧內的條件判斷必須`全部為真`才成立。一開始我們指定`a = 0`，因此，在`if (a==1)`這個敘述為`false`的情況，**我們不需要走完下一條判斷式`b%2 == 1 (b為奇數)`**，這就是「最短路徑計算」。

# 使用 `&&`, `||` ，不要使用 `and`, `or`

根據[RuboCop Headquarters](https://github.com/rubocop-hq/ruby-style-guide)的Ruby Style Guide：
> The `and` and `or` keywords are banned. The minimal added readability is just not worth the high probability of introducing subtle bugs. For boolean expressions, always use `&&` and `||` instead.

由於`優先權(precedence)`的問題，`and` and `or`是很容易出bug的：

>... `and` even has lower precedence than `=`. [出處](https://stackoverflow.com/questions/1426826/difference-between-and-and-in-ruby)

因此，再次強調，使用 `&&`, `||` ，不要使用 `and`, `or`。

# && 與 and : 有初始值的情況下

`&&` 與 `and` 都是`且`的意思。

我的鐵人賽日記`IronmanDairy` 來到第22天，且第22天是個偶數天，顯示為true.

```ruby
IronmanDairy = 22

p IronmanDairy == 22 && IronmanDairy % 2 == 0 #=>true
```

和

```ruby
IronmanDairy = 22

p IronmanDairy == 22 and IronmanDairy % 2 == 0 #=>true
```

結果相同。

以上例子，我們明白到 `&&`和 `and` 可以確認一串條件判斷式，其中是否有`false`或`nil`的部分，`全部為true`的情況，才會通過條件判斷。


# && 的優先權高於 `=`

談到優先權，開車的朋友可以聯想到路權，直行車的權利大於轉彎車。 `&&` 就像直行車一樣：

```ruby
p IronmanDairy = 22 && IronmanDairy % 2 == 0

#undefined method `%' for nil:NilClass (NoMethodError)
```

我們可以理解到，上列程式會出現NoMethodError的原因是`&&`有較高的優先權，對Ruby來說，意思是：

```ruby
p IronmanDairy = (22 && IronmanDairy) % 2 == 0
```

由於`IronmanDairy`尚未初始化(uninitialized)，而讓`22 && IronmanDairy` 為`NilClass`，然而NilClass 除以2是無意義的。

如果我們把同一條件判斷式，加上適當的括弧：

```ruby
p (IronmanDairy = 22) && (IronmanDairy % 2 == 0)

#=> true
```

就可以完成我們要達到的語義目的：

給定鐵人賽日記`IronmanDairy`這個值為22，且22是個偶數，顯示為true.

# `and` 的優先權低於 `=`

而在上述案例，若 `&&` 改成 `and` 的意思，就天差地遠了：

```ruby
p IronmanDairy = 22 and IronmanDairy % 2 == 0 #=> 22

p (IronmanDairy = 22) and (IronmanDairy % 2 == 0) #=> 22
```

不管括弧是否存在，結果已經變成印出了`IronmanDairy指定的數值22`，而不是出現我們想判斷的布林值`true`，因為

`IronmanDairy = 22`的 `=` 比 `and` 的優先權還高。為了防止誤會大了，產生的bug又難以偵錯，請不要用`and`或`or`喔！

# 番外篇：Control-flow modifiers

## and 和 or 的取代語法

### `and` 關鍵字與`if`

有的時候，我們點擊動態網站中的連結，會跳出`(showup)`意想不到的視窗`(suprise)`:

```ruby
suprise = suprise.showup and next
```

寫法等同於`if`(如果跳出視窗，就進行下一步`next`):

```ruby
next if suprise = suprise.showup
```

如同把 `I am hungry and I eat an apple`

改寫為

`I wanna eat an apple if I am hungry!`

把`and`改`if`，這樣是不是比較類似英文語法的邏輯呢？：）

### `or` 關鍵字與`unless`

而有的時候，我們點擊連結想連到某個頁面，會出現`錯誤訊息404:找不到此網頁`:

```ruby
read_article()? or raise "Could not find this article!"
```

我們可以寫成：

```ruby
raise "Could not find this article!" unless read_article()?
```

如同把 `Do exercise, or you won't be healthy!`

改寫為

`You won't be healthy unless you do exercise!`

不過，[Airbnb](https://github.com/airbnb/ruby)的Ruby Style Guide有提到，只有在簡單可寫成一行的情況再使用`if/unless`唷！

> Modifier if/unless usage is okay when the body is simple, the condition is simple, and the whole thing fits on one line. Otherwise, avoid modifier if/unless. [link](https://github.com/airbnb/ruby)

* [Difference between “and” and && in Ruby?](https://stackoverflow.com/questions/1426826/difference-between-and-and-in-ruby)

* [Using “and” and “or” in Ruby](http://www.virtuouscode.com/2010/08/02/using-and-and-or-in-ruby/)

* [Difference between “and” and && in Ruby?](https://stackoverflow.com/questions/1426826/difference-between-and-and-in-ruby)

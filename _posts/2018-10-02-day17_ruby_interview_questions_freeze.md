---
layout: post
title:  "Ruby面試精選30題 - Day17 Ruby裡的freeze和frozen? "
date:   2018-10-02 08:15:00 +1000
categories: interview
---

freeze照字面解釋就是凍結的意思。`.frozen?`可以傳回`true`或`false`，幫我們確認凍結是否為真。詳細怎麼使用呢？就讓我們繼續看下去！
<!-- more -->

---

# Ruby經典面試題目 #17

`Day17 解釋Ruby裡的freeze和?frozen。Explan when to use freeze and frozen in Ruby?`

在Ruby裡面有一件好玩的事，就是連大寫的常數`CONSTANT`也可以修改！來看看下面的例子：

```ruby
ROLE_CONSTANT = "Rubyist"
ROLE_CONSTANT << "Ironman"
puts ROLE_CONSTANT.inspect
```

`<<`幫我們改變了`ROLE_CONSTANT`常數：

```ruby
tingdeMacBook-Air:Ironman tingtinghsu$ ruby freeze.rb
"RubyistIronman"
```

大家對於常數應該要「恆常不變」的印象，竟然都會改變！更別說是一般的變數了：

```ruby
variable_array = %w( string integer array )
print variable_array
puts "-add something-"
variable_array << 'hash'
print variable_array
```

結果顯示：

```ruby
["string", "integer", "array"]-add something-
["string", "integer", "array", "hash"]
```

而freeze照字面解釋就是凍結的意思。如果我們要確保某個常數/變數不會被修改，就需要利用到`.freeze`方法。

# `.freeze` 用在常數

透過使用`.freeze`方法加在常數值之後，我們可以產生真正意義上的常數，讓常數永遠不變(immutable)。

```ruby
ROLE_CONSTANT = "Rubyist".freeze
ROLE_CONSTANT << "Bartender"
puts ROLE_CONSTANT.inspect # can't modify frozen String (RuntimeError)
```

如果硬要修改的話，就會產生`RuntimeError`錯誤。

# `.freeze` 用在變數

而變數也一樣，我們想把新值加入已經被freeze的陣列，也會出現`RuntimeError`。

```ruby
frozen_array = %w( ice water steam )
frozen_array.freeze
frozen_array << 'fire' #can't modify frozen Array (RuntimeError)
```

值得注意的是，雖然陣列不能被改變，但陣列裡的字串`string`仍然可以被改變！

```ruby
frozen_array = %w(ice water steam)
frozen_array.freeze

frozen_array[0][2] ="y"
p frozen_array #=> ["icy", "water", "steam"]
```


Array裡的第一個字串從`ice`變成`icy`了。為了避免這種~~狸貓換太子~~的事情發生，我們來介紹一個新的方法：`.each(&:freeze)`。

# `.each(&:freeze)`

除了用`.freeze`確保陣列無法被改變，也要加入`.each(&:freeze)`方法，做好雙重保障，讓陣列裡面的各個值不能被修改。

```ruby
frozen_array = %w(ice water steam)
frozen_array.freeze
frozen_array.each(&:freeze)
#frozen_array << 'fire'

frozen_array[0][2] ="y" #`[]=': can't modify frozen String (RuntimeError)
```

加入`.each(&:freeze)`之後，`[]=`方法是不是就無法被隨便使用了呢?：）

# `.frozen?`

`.frozen?`可以傳回`true`或`false`，幫我們確認凍結是否為真。

```ruby
frozen_array.freeze
p frozen_array.frozen? #=> true
```

# `.map(&:frozen?)`

如果要檢查集合裡(Array或Hash)的元素是否被freeze，可以使用`.map(&:frozen?)`。

```ruby
frozen_array.each(&:freeze)
p frozen_array.map(&:frozen?) # =>[true, true, true]
p frozen_array.each(&:frozen?) # doesn't work! print nothing.
```

注意：如果改成`.each(&:frozen?)`是無效的。因為我們曾在[第14天]的文章提到，`.map`方法會幫我們產生新陣列、放入新值，在以上的例子是放入布林值`[true, true, true]`。而`.each`不會產生新陣列。

# 使用freeze的效能

提到freeze具有不可變(immutable)的功能，就讓我想起自己在[鐵人賽第七天]文章提到的Symbol符號與String的字串比較。檢查是否可變的最好方式，就是檢查`object_id`：

```ruby
frozen_array = %w(ice water steam)
frozen_array.freeze
3.times do
  p frozen_array.object_id
end
```

陣列在記憶體位置裡不改變：

```ruby
70243150761140
70243150761140
70243150761140
```

而如果我們不使用`.each(&:freeze)`方法，凍結陣列中的各個元素的話，

```ruby
frozen_array = %w(ice water steam)
#frozen_array.each(&:freeze) 註解，暫時拿掉方法
5.times do
  p frozen_array[1].object_id
end
```

陣列內值的記憶體位置仍然會跑來跑去！

```ruby
70200015881620
70200015881420
70200015881320
70200015881140
70200015880960
```

[這篇文章](https://blog.honeybadger.io/when-to-use-freeze-and-frozen-in-ruby/)的Benchmark(標竿測試，讓程式設計者很方便的測量程式的執行時間)，幫我們比較`.freeze`和沒有freeze過的變數，結果發現freeze過的變數佔用的記憶體空間少，速度也更快！

舉例來說，使用在Rails的Route路由頁面，就可以大幅加快網路存取速度。[另外這篇文章](http://flats.github.io/blog/2016/01/03/frozen-strings/)也提醒我們，擁抱、並習慣這種以簡單的方式就能優化Ruby效能的寫法唷。：）

Ref:

* [When to use freeze and frozen? in Ruby](https://blog.honeybadger.io/when-to-use-freeze-and-frozen-in-ruby/)
* [Ruby Constants](http://rubylearning.com/satishtalim/ruby_constants.html)
* [Everything You Need to Know About Ruby Constants](http://www.rubyguides.com/2017/07/ruby-constants/)
* [Understanding Mutable Objects & Frozen Strings](http://www.rubyguides.com/2016/01/ruby-mutability/)
* [Frozen Strings, Symbols, and Garbage Collection in Ruby](http://flats.github.io/blog/2016/01/03/frozen-strings/)
* [What is the use or effect of freezing Symbols and Numbers in Ruby?](https://stackoverflow.com/questions/4235238/what-is-the-use-or-effect-of-freezing-symbols-and-numbers-in-ruby)

---
layout: post
title:  "Ruby面試精選30題 - Day11 Ruby 的 block, proc, lamdba方法比較"
date:   2018-09-20 11:57:00
categories: interview
---

第11天開始，要更深入Ruby的精髓。來聊聊Ruby的 block, proc 與 lamdba！
<!-- more -->

---

# Ruby經典面試題目 #11

`Ruby 的 block, proc, lamdba方法比較? What’s difference between blocks, procs and lambdas?`

## block 程式碼區塊

程式碼區塊是用 `do... end`圍起來，圍出特定一個區域、放程式碼的地方。
就好像跑馬拉松一樣，道路上會進行交通管制，把參賽者的跑道圍起來。

`do... end`的形式常常使用在`陣列`和`迴圈`裡，把`陣列`想成參賽者的列表，`迴圈`想成跑道，每個參賽者（陣列內的元素）都要一個一個進入跑道（迴圈），是不是就很好理解了呢?

### block: do...end

我們來用`do... end`圍出`block`。昨天提到ruby invoke method的階層有五層：

```ruby
find_method = ["Class","Module","Object","Kernel","BasicObject"]

find_method.each do |find_method|
  p find_method
end
```

結果顯示為：

```ruby
Class
Module
Object
Kernel
BasicObject
```

### block: {}

假如某個特定參賽者選手如我，每年都一次馬拉松，而2018年即將跑第3次啦！我可以用大括號`{}`印出如下：

```ruby
3.times {p "I love running 42K marathon!"}
```

因為很重要所以喊3次，這個大括號`{}`圍出的區塊，忠實地印出：

```ruby
"I love running 42K marathon!"
"I love running 42K marathon!"
"I love running 42K marathon!"
```

有沒有注意到，不管是`do... end`，還是`{}`，前面都跟著`method`呢?
`do... end`前有[.each](http://ruby-doc.org/core-2.5.1/Array.html#method-i-each)這個Array裡的方法；`{}`前有[.times](http://ruby-doc.org/core-2.5.1/Integer.html#method-i-times)這個屬於Integer的方法。

所以，重點出現：*block不是物件*！必須跟在其他的方法或物件之後。

```ruby
3.times {p "block is not Object!!!"} #很重要所以說3次
```

### block: yield

人生就像馬拉松一樣漫漫長路。有的時候跑步跑累了，我們需要喝點水、休息喘口氣。那該如何用`block`表示呢?我們使用`yield`方法呼叫：

```ruby
 def keep_running
  p "-start line-"
    yield #block
  p "-finish line-"  
 end

 keep_running {
  p "drink water"
}
```

結果顯示為：

```ruby
-start line-
drink water
-finish line-
```

在ruby on rails專案裡，我們也很常在`erb`檔名下，發現這種利用`yield`方法，調用程式碼區塊的頁面:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  </head>

  <body>
    <%= yield %>
  </body>
</html>
```

其中`<%= yield %>`就是在html頁面代入`ruby`程式碼的區塊。關於[更多yield](https://guides.rubyonrails.org/layouts_and_rendering.html#understanding-yield)說明，可以參考[Ruby on Rails Guide]((https://guides.rubyonrails.org/layouts_and_rendering.html#understanding-yield)).

## Proc 程序物件

Proc是程序物件，跟block一樣可放入程式區塊。

在Ruby API裡，說到：
>[Proc](http://ruby-doc.org/core-2.4.0/Proc.html) objects are blocks of code that have been bound to a set of local variables.

方剛我說明到block不是物件，因此如果我們遇到需要一次處理很多的block，或是多次使用一個block的情況時，與其重複寫code，不如把需要重複的部分寫成物件。

我現在想進一步利用Proc放入程式判斷，計算在馬拉松賽事、半馬和全馬分別跑過幾公里。

首先用`block`列出參賽紀錄:

```ruby
place = ["2012 太魯閣半馬","2012 玉山半馬","2013 萬金石半馬","2013 雙溪半馬","2013 台北市半馬","2014 黃金海岸半馬","2014 Perth半馬","2016 Sydney全馬","2017 Melbourne全馬","2018 大堡礁全馬"]

place.each do |place|
  puts place
end
```

`block`顯示出，凡跑過必留下痕跡！

```ruby
2012 太魯閣半馬
2012 玉山半馬
2013 萬金石半馬
2013 雙溪半馬
2013 台北市半馬
2014 黃金海岸半馬
2014 Perth半馬
2016 Sydney全馬
2017 Melbourne全馬
2018 大堡礁全馬
```

以上紀錄顯示，從2012-2018年，半馬(21KM)跑過7次，全馬(42K)跑3次。由於`block`無法代入參數，此時`Proc`就派上用場了！

### Proc 的類別方法

來寫我人生第一個使用Proc物件的跑步方法`proc_running`。
這個類別方法(class method)跟一般的method寫法一樣，方法內用`.new`產生新的程序物件。
我們方法外用`{}`大括弧圍出block，用`.call`方法呼叫程序物件`proc`本身：

```ruby
def proc_running
  Proc.new
end
proc = proc_running { "I love running!" }
p proc.call   #=> "I love running"
```

來看看`Proc`代入參數之後，可以做的事就變多囉，我現在想計算半馬(21KM)跑過7次，全馬(42K)跑3次，分別是幾公里：

```ruby
def count_km(km)
  return Proc.new {|n| n*km}
end

full_marathon = count_km(42) #126
half_marathon = count_km(21) #147

p "I've run #{half_marathon.call(7)} Km in Half Marathon and #{full_marathon.call(3)} Km in Marathon "
```

還記得`#{}`可以幫我們插入字串嗎？（此方法會先利用`to_s`將傳入的Integer成String格式）
所以計算答案揭曉：

```ruby
"I've run 147 Km in Half Marathon and 126 Km in Marathon "
```

### Proc 的實體方法

Proc可以new出新的程序物件實體`km_proc`：

```ruby
km_proc = Proc.new { |km, *n| n.collect { |n| n*km } }
p km_proc.call(42, 1, 3)   #=> [42, 126]
p km_proc.call(21, 1, 7)   #=> [21, 147]
```

這樣我就可以把計算的跑步公里數，美美地用[`.collect`](https://ruby-doc.org/core-2.2.0/Array.html#method-i-collect)這個陣列方法~~裱框~~印出來！

```ruby
[42, 126]
[21, 147]
```

觀察剛剛的類別方法，我們發現`Proc`可以代入參數，也可以用return回傳參數，那我想要仿造文章前頭這段`block`程式碼概念:

```ruby
 def keep_running
  p "-start line-"
    yield #block
  p "-finish line-"  
 end

 keep_running {
  p "drink water"
}
```

寫一個喝水`Proc`程式：

```ruby
def proc_keep_running
  p "-start line-"
    water_proc = Proc.new { return "drink water" }
    water_proc.call
  p "-finish line-"
end
  p proc_keep_running
    # Prints "-start line-" but not "-finish line-"
```

結果印出：

```ruby
-start line-
drink water

```

疑？怎麼喝完水就打住，不繼續跑向終點`-finish line-`呢?
我們發現了，在`proc`内使用`return`會立即返回，不再繼續執行後面程式。(所以，永遠不能在`Proc`內使用`return`，這樣跑馬拉松會無法抵達終點啊啊啊啊！)

## lambda 匿名函數

身為工程師，問題代表著機會；出現問題就代表會有解決方案的出現，在Proc中有一個特別的用法叫`lambda`。創建方法有兩種指令:`lambda` or `->()`

```ruby
lambda_running = lambda { puts "Run with lambda!" }
lambda_running = -> { puts "Run with lambda!" }
```

如果我們使用`puts`印出，會發現`lambda`是`Proc`的一種：

```ruby
p lambda_running
#<Proc:0x000056043ddfd1e8@main.rb:11 (lambda)>
```

剛剛說到Proc方法內不能放return，我們來用程式碼比較proc與lambda回傳值：

```ruby
def proc_run
  proc = Proc.new { return }
  proc.call
  p "Run with Proc!"
end
proc_run # 跑不出來"Run with Proc"結果!
```

但lambda可以：

```ruby
def lambda_run
  lam = -> { return }
  lam.call
  p "Run with lambda!"
end

lambda_run #=> "Run with lambda!"
```

從下文說明，我們可以了解`Proc`只會回傳目前階層的內容，而不會像一般的方法以及`lambda`匿名方法一樣，整個走完方法裡面的該回傳的值。

> The difference between procs and lambdas is how they react to a return statement. A lambda will return normally, like a regular method. But a proc will try to return from the current context.The reason is that you can’t return from the top-level context.[出處](http://www.rubyguides.com/2016/02/ruby-procs-and-lambdas/)

現在來用`lambda`的兩種調用寫法`lambda` or `->()`練習寫作程式碼，分別回傳半程馬拉松(hm)和全程馬拉松(fm)的公里數：

```ruby
half_proc = lambda {|hm,fm| hm}
full_proc = ->(hm,fm){fm}
p half_proc.call(21,42) #21
p full_proc.call(21,42) #42
```

結果`half_proc.call`會回傳21，`full_proc.call`會回傳42。

如果參數多放一個呢? ~~1.5個馬拉松~~

```ruby
p full_proc.call(21,42,63)
```

會出現錯誤訊息:

```bash
main.rb:17:in `block in <main>': wrong number of arguments (given 3, expected 2) (ArgumentError)
```

這個原因在於`lambda`是種方法，，所以它會檢查參數個數是否匹配。
來用程式舉例一下：

```ruby
lambda_argument = lambda {|x| x*2}
p "Lambda result: 21Km *2= #{lambda_argument.call(21)}Km"

proc_argument = Proc.new {|x,y| "I don't care about how many arguments inside Proc!" }
p "Proc result: #{proc_argument.call(21,42,63)}"
```

結果印出：

```ruby
"Lambda result: 21Km *2= 42Km"

"Proc result: I don't care about how many arguments inside Proc!"
```

超級比一比的表格又出現了：

block程式區塊 | [Proc](http://ruby-doc.org/core-2.4.0/Proc.html)程式區塊物件 | lambda 匿名方法
------------- | ------------- | -------------
不是物件  | 帶名字的區塊物件，可儲存變數  | 和Proc類似，但更加接近method方法
不是參數  | 可帶參數  | 嚴格檢查參數數目
N/A  | 在Proc裡`return`其他值，會離開此物件的方法  | 在lamba裡`return`其他值，會回來繼續執行完方法

最後的最後，我們用`lambda`來寫馬拉松喝水的方法吧！

```ruby
def lambda_keep_running
  p "-start line-"
    water_lambda = lambda { return "drink water" }
    p water_lambda.call
  p "-finish line-"
end
  lambda_keep_running
```

結果印出：

```ruby
-start line-
drink water
-finish line-
```

順利迎向終點finish line了！

也祝大家的IT邦鐵人賽，都能順利完賽！！！：）

===

Ref：

* [Top 10 Essential Ruby Interview Questions](https://blog.bater.gq/ruby/2018/02/02/top-10-essential-ruby-interview-questions.html)
* [Ruby on Rails Technical Interview Questions](https://github.com/timurcatakli/ruby-on-rails-interview-questions-answers)
* [方法與程式碼區塊（block)](https://railsbook.tw/chapters/07-ruby-basic-3.html)
* [The Ultimate Guide to Blocks, Procs & Lambdas](http://www.rubyguides.com/2016/02/ruby-procs-and-lambdas/)
* [Ruby中的Proc/lambda](https://my.oschina.net/jsk/blog/540371)
* [Ruby-Core](https://ruby-doc.com/core/index.html)
* [ruby-doc.org: Method](http://ruby-doc.org/core-2.5.1/doc/syntax/methods_rdoc.html)
* [ruby-doc.org: Object Method: do](http://ruby-doc.org/docs/keywords/1.9/Object.html#method-i-do)
* [Procs](http://ruby-doc.org/core-2.4.0/Proc.html)

---
layout: post
title:  "Ruby面試精選30題 - Day12 千變萬化的變數: class variable, class instance variable 與 instance variable"
date:   2018-09-20 18:57:00 -0800
categories: interview
---

第12天往細節探索去！昨天我們講到broc是有名字的區塊物件，可儲存變數；lambda是一種method方法，嚴格檢查參數數目，今天則要更深地討論變數。
<!-- more -->

---

# Ruby經典面試題目 #12

`Ruby 的 類別變數與類別實體變數，與實體變數有何不同? What is difference between class variable, class instance variable and instance variable?`

我們曾在[第四天]時討論過類別方法和實體方法。

還記得我下的這個結論：如果要將實體方法，運用在某個客製化的實體，就使用instance method；如果某個方法並不會和某個特定的實體變數綁在一起，就使用class method。

## 實體變數 instance variable

實體變數是一個比較好理解的概念，來舉個例子吧：
我想把每天跑步的好習慣`RunDaily`寫成class，為了維持好習慣，方法有兩個：早上跑`morning_run`或者晚上跑`evening_run`。今天是第12天`day12`了~如果想早上跑，會存實體變數5km，晚上跑則存10km。

```ruby
class RunDaily
  def morning_run(km)
    @mr = km
  end
  def evening_run(km)
    @er = km
  end  
end

day12 = RunDaily.new
p day12.morning_run(5)
p day12
p day12.evening_run(10)
p day12
```

可以看到實體變數(instance variable)以＠開頭，不需要先在class開頭宣告。
> Ruby的實體變數不是public，僅作用於於self指示的物件。除非明確提供其他方法，
否則無法從物件以外變更或查看。[原文](https://guides.ruby.tw/ruby/instancevars.html)

```ruby
5
#<RunDaily:0x000055e64755a770 @mr=5>
10
#<RunDaily:0x000055e64755a770 @mr=5, @er=10>
```

從輸出結果看到`day12`這個物件的方法是`Rundaily`，動態地加入了兩個實體變數`mr`和`er`。

## 實體變數與存取器 (Accessors)

物件的實體變數，就是物件的屬性(attribute)，同一個class的不同物件，其屬性也不同。

假如我在明天第13天`Day13`遇到休假日，所以早上一口氣跑了21km：

```ruby
day13 = RunDaily.new
p day13.morning_run(21)
p day13
```

結果顯示此物件存在於不同的記憶體位置，而且變數也不同：

```ruby
21
#<RunDaily:0x0000561a9376e1d0 @mr=21>
```

能夠讀取這些變數的屬性是非常重要的，讓我們可以更方便的讀取這些不同的物件（因為，凡走過必留下痕跡！就像翻開日記一樣，我想知道每個特定的日子分別跑了幾公里?或者是每天鐵人賽的文章內容?）

因為剛剛說過：
> Ruby的實體變數不是public，僅作用於於self指示的物件。除非明確提供其他方法。

所以，現在來`IronmanDairy`類別裡寫一個屬性存取器 (attribute accessors) 的公開方法，讓我們可以設定(`set_dairy`)、取得(`get_dairy`)昨天Day12的鐵人賽文章標題：

```ruby
class IronmanDairy
  def set_dairy(title) #write dairy
    @title = title
  end

  def get_dairy #read dairy
    @title
  end
end

day11 = IronmanDairy.new
p day11

day11.set_dairy("Explain the difference between block, proc, lamdba.")
day11.get_dairy

p day11

```

日記`day11`物件被我們讀取出來了：結果顯示出記憶體位置，及`@title`實體變數：

```ruby
#<IronmanDairy:0x000055d4f44e2748>
#<IronmanDairy:0x000055d4f44e2748 @title="Explain the difference between block, proc, lamdba.">
```

## [持續改良:version1]

`set_dairy`和`get_dairy`方法雖然讓我們易於了解屬性的寫入與讀取方式，但把細節拆解開來的程式碼卻顯得過於冗長。所以我們想看看有沒有更簡化的寫法（沒錯，只要仔細找一找手冊，Ruby裡通常都有的！）

如果我們要寫新文章`day12`，可以用較簡單的方法寫入`title=`以及取得`title`想查看的文章標題，取代原本的`set_dairy`和`get_dairy`：

```ruby
class IronmanDairy
  def title=(title) #write dairy
    @title = title
  end

  def title #read dairy
    @title
  end
end


day12 = IronmanDairy.new
day12.title = "class variable, class instance variable and instance variable"
p day12
p day12.title
```

結果印出：

```ruby
#<IronmanDairy:0x00005648020c0828>
#<IronmanDairy:0x00005648020c0828 @title="class variable, class instance variable and instance variable">
```

很好！程式碼少了一些了。

注意，這裡的`title=`也是一個實體方法，我們來用`.instance_methods`確認一下：

```ruby
p IronmanDairy.instance_methods(false) #=> [:title=, :title]
```

## [持續改良:version2]

有沒有發現上面的程式碼中，大量出現這個`@title`實體變數呢？那我們想要簡化一下，可以用`attr_accessor`方式改寫。假設我們要創一個Day13鐵人賽文章物件，直接把實體的屬性存取器`attr_accessor :title`，指定給symbol`:title`，加在類別的開頭即可：

```ruby
class IronmanDairy
  attr_accessor :title
end

day13 = IronmanDairy.new
p day13 #<IronmanDairy:0x00005579aee8bc00>

day13.title = "Still thinking..."
p day13 #<IronmanDairy:0x00005579aee8bc00 @title="Still thinking...">

p day13.title #"Still thinking..."

p IronmanDairy.instance_methods(false) #[:title=, :title]
```

從以上的三個舉例，是不是能夠對於實體變數有全方位的瞭解了呀？

## 類別變數 class variable

類別變數在類別開頭，用`@@`定義，它是個危險的東西，因為所有的子類別中對類別變數的改動，都會影響其他類別的變數。我們用「雞兔同籠」的例子，來算算不同的動物各有幾隻腳：

```ruby
class Animal
  @@legs = nil #先預設動物的腳為空值nil
  def self.legs
    @@legs
  end
end

p Animal.legs # => nil

class Chicken < Animal
  @@legs = 2
end
p Chicken.legs # => 2
p Animal.legs # => 2 變兩隻腳了！

class Rabbit < Animal
  @@legs = 4
end

p Rabbit.legs # => 4
p Animal.legs # => 4，又變四隻腳了！


class Snake < Animal #籠子裡加入一隻蛇
  @@legs = 0 #蛇沒有腳！
end

p Animal.legs # => 0
p Snake.legs # => 0
p Rabbit.legs # => 0 糟糕，為什麼這次兔子沒有腳！~~被蛇吃掉了~~
```

為了解決此問題，我們來研究Ruby的類別實體變數，看看是否有更好的做法。

## 類別實體變數 class instance variable

我們在[Day1]中開宗明義地解釋物件導向語言的精髓：物件可以具有類別和實體變數。既然類別也是一種物件，那「類別物件」當然可以有「類別的實體變數」。我們繼續「蛇兔同籠」的例子，舉例出三種變數~~大亂鬥~~：

```ruby
class Animal
  @@legs = nil #設定class variable
  def self.legs
    @@legs
  end
end

p Animal.class_variables # 印出類別變數: @@legs
p Animal.legs #類別變數:目前為空值 nil

p Animal.instance_variables # => [] 尚未設定實體變數，所以沒東西

class Animal
  attr_accessor :legs # 設定instance variables
  @legs = 0
end

p Animal.instance_variables # => 現在能印出實體變數: @legs
p Animal.legs #仍然是類別變數的空值 nil

class Animal
  class << self; attr_accessor :legs end
  @legs = 1 #class instance variables的設定法，先預設為1
end

p Animal.legs # => 1 #不是nil，不是0，而是1 (類別實體變數!)

class Rabbit < Animal
  @legs = 4
end

p Rabbit.legs # => 兔子4隻腳
p Animal.legs # => 回到類別實體變數預設值1


class Snake < Animal
  @legs = 0
end
p Snake.legs # => 蛇 0隻腳
p Rabbit.legs # => 兔子還是4隻腳! 太好了～沒有被吃掉
p Animal.legs # => 回到類別實體變數預設值1
```

以上的舉例實實在在地證明我在這本書[Effective Ruby中文版-寫出良好Ruby程式的48個具體做法](https://books.google.com.au/books?id=YcmUCgAAQBAJ)Page 56查到的觀點：寧願用類別實體變數，也不要用類別變數。類別實體變數除了會打破類別及其子類別的共用關係（如同我們舉的例子中，動物的腳數目隨意被改變），也提供更多的封裝，讓類別定義層級、或從類別方法裡，唯一可存取的是類別實體變數。

最後用比一比的表格來總結：）

類別變數class variable | 類別實體變數 class instance variable  | 實體變數 instance variable
------------- | ------------- | -------------
@@類別變數  | @類別實體變數 | @實體變數
在類別開頭設定  | 可用attr_accessor的方式改寫 | 可用attr_accessor的方式改寫
可用在類別方法或實體方法  | 用在類別方法，不可用在實體方法 | 用在實體方法

===

Ref：

* [Ruby on Rails Interview questions](https://coderwall.com/p/yycytw/ruby-on-rails-interview-questions)
* [Ruby 使用手冊 - 實例變數 Instance variables](https://guides.ruby.tw/ruby/instancevars.html)
* [Ruby 使用手冊 - 存取器 Accessors](https://guides.ruby.tw/ruby/accessors.html)
* [Effective Ruby中文版 - 寫出良好Ruby程式的48個具體做法(電子書)By Peter J. Jones](https://books.google.com.au/books?id=YcmUCgAAQBAJ)
* [Ruby 語法放大鏡之「attr_accessor 是幹嘛的?」](https://kaochenlong.com/2015/03/21/attr_accessor/)
* [Ruby女孩(21)：來聽聽類別變數與類別實體變數的自白(?)](https://ithelp.ithome.com.tw/articles/10160882)

---
layout: post
title:  "Ruby面試精選30題 - Day05 Ruby中的self物件與singleton method"
date:   2018-09-14 13:08:00
categories: interview
---

在第四天裡，我們用鐵人賽參賽者的例子解說實例方法與類別方法。

<!-- more -->

類別中的實體物件，想要玩弄方法時，可以有三種取用方式：（~~跟斯斯有三種一樣~~）

1. 該類別所定義的實體方法。

2. 模組中可取得的實體方法。（關於模組，記得第三天的include與extend比較嗎？）

3. 類別方法:類別物件的`singleton method`

> Class can use methods from three areas:
> 1) Instances of class can call methods that are defined as instance methods in their class.
> 2) Instances of Class have access to the instance methods defined in Module
> 3) Or instances can call a singleton method of a class object. [出處](https://medium.com/@lauren.kroner/ruby-class-vs-instance-methods-a5182ce7de49)

所以我們在今天要解說一下`Self`與`singleton method`囉！

---

# Ruby經典面試題目 #05

`self是什麼意思？ What does self mean?`

`self` 有豐富層次的含義。 ~~就跟我們的內心一樣~~ (🎵 🎵 來點播一首陳綺貞的[Self](https://www.youtube.com/watch?v=H1-kEjeO6SI)🎵🎵  ) 它雖然代表自己本身的`物件Object`，但還記得，我們在第一天說到，Ruby的世界幾乎都是物件嗎?

因此，`self`有兩種意思：

* Self在類別class裡，代表目前的類別。

* Self在實體instance裡，代表目前的實體。

簡單解釋：實體就是物體在記憶體的位置，就好像每個寶寶（實體）生下來，都是從某個媽媽的子宮（記憶體）裡出來的。我們必須經歷過實體化的過程才能成為一個活生生的人呢！

幸好，產生一個實體不用等"懷胎十月"這麼久，只要像我們在第一天一樣使用`@`宣告記憶體位置就可以產生實體變數了：

```ruby
class LoveSong
  def initialize
     @message = "I was born to love you!" #定義實體變數（instance variable）@message
  end
    def sing_a_song
    puts @message
  end
end

Ting = LoveSong.new
Ting.sing_a_song
 #=> I was born to love you!
```

用LoveSong類別另寫一段程式碼實作`self`:

```ruby
class LoveSong
  def
    self.one()
      "We are the champion!"
  end

  class << self
    def two()
      "We will rock you!"
    end
  end

  p self             # => LoveSong
  p self.class       # => Class  
  p self.singleton_methods # [:one, :two]

  p self.one() #=> "We are the champion!"
  p self.two() #=> "We will rock you"
end

```

在這裡的`self`代表目前的類別名稱`LoveSong`， 我們查詢`self.class`還是類別`class`， 而這裡的`self.singleton_method`出現了`:one`與`:two`這兩個能夠分別印出兩首歌的類別方法(class method)。

還記得我們在第一天文章曾經提到利用superclass查找父類別的方法嗎？

類別的父類別，是物件。 `class.superclass`是`object`。

但其實：每一個類別class上面都還有一層隱形的類別class(~~隱形的翅膀~~)，我們可以稱作metaclass，在Ruby叫eigenclass。[出處](https://blog.chh.tw/posts/ruby-metaclass-eigenclass/)]。

# Singleton Method

單例方法＝單例類別的實體方法。

（指的是某物件實體「的單例類別」的實體方法，而不是某個物件的實體方法，中間多夾了一層「單例類別」）

* singleton methods of an object are not instance methods of the class of the object;

* they are instance methods of the `singleton class` of the object.

當我們講到 `Singleton Method`，就會提到`Singleton Pattern`單例模式，這個在物件導向語言(如：Java)共同的觀念。

* 如果我們能保證某一個類別只產生一個物件實體，而且提供存取該物件的統一方法。這種設計模式就稱為單例模式。

* 我們可以直接存取，而不需要實體化此類別的物件。

## 使用`Singleton Method`的時機

當我們想控制實體數目，節省系統資源的時候。

再度把例子🌰搬出來：一間教室裡只有一台印表機，所有電腦都可以連線印表機，但印表機一次只能印出一台電腦上的文件。

還記得我們在第四天舉的例子是查找鐵人參賽者名單嗎？在這個例子中，一次只能查找一名參賽資料。

```ruby
class IronmanList
    def self.find(id)
    p "finding Ironman ID: #{id}"
    end
end
IronmanList.find(1)
```

使用規則：

1. 此類別只能有一個物件實體。(IronmanList 類別中，只有一個self)

2. 此類別必須自己建立自己的唯一實體：def self.find(id)

3. 此類別必須給其他物件提供這個實體。

使用場景：

1. 此物件是類別中唯一的物件。如同IronmanList鐵人賽的序列號唯一。（跟身份證號碼一樣）

2. 當創建此物件需要消耗較的資源過多時，可節省系統資源。（例如：連結資料庫、連結印表機）

當我們為實體定義了自已的singleton method，代表了這個方法只屬於該實體，儘管是相同的class的實體也無法使用別人的singleton method。（每個實體的單例類別是不同的。）

近一步說明類別方法、實體方法，與單例方法的關係。 中文翻譯的話，我們可以這樣記：

* 類別的eigenclass(特徵類別)方法 = 類別方法。

* 實體的eigenclass(特徵類別)方法 = 單例方法 = 單例類別的實體方法。

# 實體方法

實體已在類別裡定義好了。如果你需要將實體方法，運用在某個特定的實體，記得要在類別裡定義好這個實體。
> 舉例:"每個人(物件實體)都能贏得鐵人賽"的方法

# 類別方法

類別方法並不在類別裡定義，而是在類別裡的物件實體的一種單例方法。如果此方法並不會和某個特定的實體變數綁在一起，就使用類別方法！
> 舉例："查找鐵人賽名單"的方法

學程式的好處就是會查找許多原文資料（間接提升英文閱讀功力！）
進一步發現許多原則上的定義用英文表達會更為清楚。

所以，我們的第四天(實體方法與類別方法)與第五天的總結（單例方法的進一步說明）， 從這段英文就能看得更加清楚之間的關係了：)

* Instance methods are methods of a class (defined in the class's definition)

* Class methods are singleton methods on the Class instance of a class (not defined in the class's definition)

> they are defined on the singleton class of the object.

Ref：

* [Top 10 Essential Ruby Interview Questions](https://blog.bater.gq/ruby/2018/02/02/top-10-essential-ruby-interview-questions.html)
* [Ruby on Rails Technical Interview Questions](https://github.com/timurcatakli/ruby-on-rails-interview-questions-answers)
* [Understanding Ruby Singleton Classes](https://www.devalot.com/articles/2008/09/ruby-singleton)
* [What exactly is the singleton class in ruby?](https://stackoverflow.com/questions/212407/what-exactly-is-the-singleton-class-in-ruby)
* [Ruby 如何理解 singleton class](https://ruby-china.org/topics/13276)
* [單例模式 Singleton](http://www.runoob.com/design-pattern/singleton-pattern.html)
* [Ruby的Class與Eigenclass](https://medium.com/@zneuray/ruby%E7%9A%84class%E8%88%87eigenclass-f994aa2b988f)

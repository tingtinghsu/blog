---
layout: post
title:  "Ruby面試精選30題 - Day02 Module模組與Class類別比一比"
date:   2018-09-11 09:40:00 +1000
categories: interview
---

在第一天裡，小妹我很激昂地用Ruby的`類別`、`物件`、`方法`，寫了開賽宣言！

<!-- more -->

```ruby
class TingIsIronman
  def initialize
    @message = "I'm going to write 30 IT articles in 30 days!"
  end
  def method
    puts @message.gsub("write", "create")
  end
end

object = TingIsIronman.new
object.method
#=> I'm going to create 30 IT articles in 30 days!
```

然後我從探索類別的栗子🌰：查詢`class`的父類別時，發現一個鐵錚錚的事實：`tw.class.superclass.class.superclass`印出來的結果是`moudle`。`tw.class.superclass.class.superclass.superclass` 印出來的結果是`Object`。

>（白話翻譯吐司：
>「番薯島」的類別是「國家」，「國家的」父類別是「世界」；
>「世界」的類別，依舊是個「類別」；「類別」的「父類別」，是個「模組」喔喔喔喔！！！）

所以在第二天的文章裡，我們就來聊一聊模組(Module)吧！:)

---

# Ruby經典面試題目 #02

`類別與模組有什麼不同? What's the Difference Between a Class and a Module?`

從以上「番薯島」的例子裡，我們從`「類別」的「父類別」，是個「模組」` 這句話找到靈感，已經可以做出比較表格的第一列：

超級比一比 | 類別 Class | 模組 Module
------------- | ------------- | -------------
父類別 superclass  | 模組 Module  | 物件 Object

從[龍哥的Ruby教學裡關於海賊王魯夫的例子](https://railsbook.tw/chapters/08-ruby-basic-4.html)，我得到一個重要的觀念：

> 類別可以繼承，而模組不行。

我們在第一篇文章裡已經透過番薯島的例子利用類別過繼承，
現在來讓我們繼續練習繼承的概念，new更多「國家」物件，用Ruby語言，領略世界各國之美：

```ruby
class World
  def beautiful(scenery)
    p "#{scenery} is so beautiful!!"
  end
end

class Country < World
end

tw = Country.new
au = Country.new
jp = Country.new

tw.beautiful "Taroko Gorge"
au.beautiful "Ayers Rock"
jp.beautiful "Fujisan"

```

程式如我們所料，願我們都能透過繼承，看見世界上的每個國家，各自的美好：

```ruby
Taroko Gorge is so beautiful!!
Ayers Rock is so beautiful!!
Fujisan is so beautiful!!
```

說完類別了，來聊模組吧！

模組就是像是圖書館(library)。
你到了圖書館借了某本程式書籍，把書本裡的「知識」(在程式語言裡，我們叫它做方法method)，吸收、消化，然後，放入(include)到腦袋。

在父母生下我的年代裡，Ruby還沒有被創造出來（~~告訴我有哪一個小baby一生下來就會Coding的嘛？沒有嘛！~~），

因此，無論是學習Ruby、或是任何程式語言的知識，需要我們後天透過「網際網路」這個世界上最大的圖書館去學習。
所以，我們可以把模組(module)理解為後天的知識，無法被繼承(inheritance)，而是後天習得的。：）

來動手寫一個模組，描述上述的情境：

```ruby
module Library
#網路就像是個大型圖書館模組（要以常數，大字英文字母開頭，跟書名一樣）

  def IThelp #定義IT邦方法
    p "I'm learning from others' IT articles on IThelp Website!"
  end
end

class EveryoneLearnsRuby
  def initialize(name)
    @name = name
  end
  include Library
  #讓每個人學Ruby時都可以使用Library模組
end

Ting = EveryoneLearnsRuby.new("Ting")

# new一個新人物Ting (OS: 大家好我是Ruby新手村民，請多指教！XD)

Ting.IThelp

# I'm learning from others' IT articles on IThelp Website!

```

如果螢幕前面的你也想要學Ruby的話，當然也可以像我一樣，使用圖書館模組裡的IT邦方法喔！：）

```ruby
You = EveryoneLearnsRuby.new("You")
You.IThlep
```

「超級比一比」表格再擴充：

超級比一比 | 類別 Class | 模組 Module
------------- | ------------- | -------------
父類別 superclass  | 模組 Module  | 物件 Object
繼承 inheritance  | 可繼承  | 不可繼承
包含 inclusion  | 不可被包含  | 可被包含

接下來我們要繼續更多探索不同之處。拿 `The Difference Between a Class and a Module?`去請教Google大神，
你會發現出現的第一段文字回答是：

> The Difference Between a Class and a Module. Basically, a class can be instantiated but a module cannot. A module will never be anything other than a library of methods. A class can be so much more -- it can hold its state (by keeping track of instance variables) and be duplicated as many times as you want. [出處](https://www.vikingcodeschool.com/professional-development-with-ruby/classes-vs-modules)

這裡說明一個很重要的概念`instantiation`。實體變數（Instance Variables）是在類別class使用時才會被建立，如同我們剛在例子中所舉的：

```ruby
class EveryoneLearnsRuby
  def initialize(name)
    @name = name
  end
  include Library
  #讓每個人學Ruby時都可以使用Library模組
end
```

其中的`@name`就是實體變數。

超級比一比 | 類別 Class | 模組 Module
------------- | ------------- | -------------
父類別 superclass  | 模組 Module  | 物件 Object
繼承 inheritance  | 可繼承  | 不可繼承
包含 inclusion  | 不可被包含  | 可被包含
延伸 extension  | 不可延伸  | 可被延伸
實體化 instantiation  | 可被實體化(instantiated)  | 不可被實體化

今天先寫到這裡，~~因為網路要斷線了~~！預計明天文章會提到extension。
做這個表格時，我發現：跟別人比較，比得好累好辛苦～

還是跟昨天的自己比就好。
只要每天都有進步，都好！:)

Ref：

* [Top 10 Essential Ruby Interview Questions](https://blog.bater.gq/ruby/2018/02/02/top-10-essential-ruby-interview-questions.html)
* [Ruby on Rails Technical Interview Questions](https://github.com/timurcatakli/ruby-on-rails-interview-questions-answers)
* [類別（Class）與模組（Module)](https://railsbook.tw/chapters/08-ruby-basic-4.html)
* [物件初始化 Object initialization](https://guides.ruby.tw/ruby/objinitialization.html)

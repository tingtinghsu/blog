---
layout: post
title:  "Ruby面試精選30題 - Day04 玩弄Ruby的方法: instance method與class method"
date:   2018-09-13 14:59:00
categories: interview
---

在第三天裡，我們解說了如何在class裡用include與extend使用module的method。

<!-- more -->

> Include is for adding methods to an instance of a class.
> Extend is for adding class methods. [(出處)](http://www.railstips.org/blog/archives/2009/05/15/include-vs-extend-in-ruby/)
> ...Also, it is sometimes ok to use "include" to add both instance and class methods. # 這句話比較進階，之後再研究：）

並透過圖書館模組的程式碼明白這段話的含義：

`include`是把`類別`中的`物件實體`加上`方法`；

`extend`是用於`類別方法`。

```ruby
module Library
  def IThelp
    p "IThelp helps me!"
  end
end

class NewbieLearnsRuby
  include Library
end

class ExtendRuby
  extend Library
end

NewbieLearnsRuby.new.IThelp
# IThelp helps me!

ExtendRuby.IThelp
# IThelp helps me!
```

話不多說，進入今天的章節!

---

重點摘要:
* abstact
{:toc}

---

# Ruby經典面試題目 #04

`解釋實體方法與類別方法 Explain instance method and class method.`

# 類別方法class method

為了瞭解類別方法，我們今天要建立新的類別class:`鐵人賽名單IronmanList`，讓這個class利用`find方法`，以傳入的id值順利找到某位鐵人賽的參賽者：

```ruby
class IronmanList
  class << self
    def find(id)
    p "finding Ironman ID: #{id}"
    end
  end
end

IronmanList.find(1)
# finding Ironman ID: 1
```

當傳入`1`給`id`，會使`IronmanList`這個類別，印出`finding Ironman ID: 1`。

以上的程式代表，當接收者不是`物件object`，而是`類別class`本身，就是一個`類別方法class method`。

> 這邊的`<<`指的是`push`方法，用在`class method`，意思是將`self method` push到 `類別class`裡。

鐵人賽名單class也可寫為：

```ruby
class IronmanList
  #class << self
    def self.find(id) #在這裡的self is a class Method
    p "finding Ironman ID: #{id}"
    end
  #end
end

IronmanList.find(1)
```

我們把 `class << self ... end` 這部分都用註解消掉，直接使用self這個class method，讓 `self.find(id)`與之前呈現出一樣的結果！

## 使用class method的情況

當我們要寫class method時，如果此方法並不會和某個特定的實例變數綁在一起，就該使用類別方法！

# 實體方法（instance method)

把鐵人賽名單類別擴充一下，除了`find方法`，還有`ironmanwinner方法`：

```ruby
class IronmanList

  def self.find(id)
    p "finding Ironman ID: #{id}"
  end

  def ironmanwinner
    p "I've got a trophy!"
  end

end

IronmanList.find(1) #這是類別方法
IronmanList.new.ironmanwinner #這是實體方法
```

結果會印出：

```ruby
finding Ironman ID: 1
I've got a trophy!
```

## 使用instance method的情況

如果你需要將實體方法，運用在某個客製化的實體。

>This is often when the functionality concerns the identity of the instance such as calling properties on the object, or invoking behaviour.[出處](https://www.culttt.com/2015/06/10/understanding-class-methods-verses-instance-methods-in-ruby/)

如同鐵人賽的贏家不會只有一個名額，只要能自我挑戰成功，都能練成鐵人：）。
因此我們可以再new更多的物件，盡情使用這個`ironmanwinner`實例方法：

```ruby
class IronmanList

  def self.find(id)
  p "finding Ironman ID: #{id}"
  end


  def ironmanwinner
    p "I've got a trophy!"
  end

end
# IronmanList.find(1)

Ting = IronmanList.new
Ting.ironmanwinner

Bater = IronmanList.new
Bater.ironmanwinner
```

結果印出：

```ruby
"I've got a trophy!"
"I've got a trophy!"
```

---

同樣的，例子🌰不會只有一種，解釋方法更不會只有一種。我們除了用自己寫的程式碼理解概念，近一步拿關鍵字 `instance method class method ruby`去請教Google大神透過網路這座大圖書館，其他工程師們的部落格文章、透過各種文字說明與舉例加深我們的印象。看到排名第一的解釋寫著：

> Class can use methods from three areas:
> 1) Instances of class can call methods that are defined as instance methods in their class.
> 2) Instances of Class have access to the instance methods defined in Module
> 3) Or instances can call a singleton method of a class object. [出處](https://medium.com/@lauren.kroner/ruby-class-vs-instance-methods-a5182ce7de49)

這裡又發現一個新名詞了：`singleton method`，這可以成為我們下一篇的素材呢！

=欲知詳情，下回分解！=

Ref：

* [Top 10 Essential Ruby Interview Questions](https://blog.bater.gq/ruby/2018/02/02/top-10-essential-ruby-interview-questions.html)
* [Ruby on Rails Technical Interview Questions](https://github.com/timurcatakli/ruby-on-rails-interview-questions-answers)
* [Ruby: Class vs Instance Methods](https://medium.com/@lauren.kroner/ruby-class-vs-instance-methods-a5182ce7de49)
* [Understanding Class Methods verses Instance Methods in Ruby](https://www.culttt.com/2015/06/10/understanding-class-methods-verses-instance-methods-in-ruby/)

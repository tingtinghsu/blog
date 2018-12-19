---
layout: post
title:  "Ruby面試精選30題 - Day06 Ruby三種存取限制Public, Protected, Private"
date:   2018-09-15 14:50:00 -0800
categories: interview
---

在第五天的最後，我們提到了一句話"相同的class的實體也無法使用別人的singleton method"。

在今天，我們把焦點放在Ruby的method, 繼續了解存取限制:)

<!-- more -->

---

# Ruby經典面試題目 #06

`說明Ruby的三種存取限制。 3 levels of access control for Ruby methods.`

讓我們用程式碼分別描述三種存取：`Public`, `Protected`, `Private`:

```ruby
  class TingsIronmanProcess
    def publish
      p "Hi guys, this is my IT article for today!"
    end

    protected
    def mydraft
      p "Hi Mentor! Please read my draft."
    end

    private
    def myspace
      p "I'm writing secretly here!"
    end
  end

 day6 = TingsIronmanProcess.new
 day6.publish # => Hi guys, this is my IT article for today!
```

以我自己生產第六天IT邦鐵人賽文章為例，我通常在本機上編寫每天的主體，在這段時間要搜集素材、測試程式碼，這個過程可能會有很多生產上的秘密、需要刪除的錯誤等等之類的，過程艱辛不足為外人道矣，所以放在private的myspace孤芳自賞就好。

等到文章接近完成度高、可讀性佳的地步，就放在protected，開放一些權限給它人，請對Ruby前輩'饅頭貓'先行閱讀，提供修改建議。

所以如果在classs外想要取得protected或private方法，都會出現NoMethodError錯誤：

```ruby
day6.protected #=> undefined method `protected' (NoMethodError)
day6.private #=> undefined method `private' (NoMethodError)
```

當一切修改完畢，就可以放到public區，給大眾分享我的作品、品嚐甜美果實啦！

以上的類別寫法可以改成：

```ruby
  class TingsIronmanProcess
    def publish
      p "Hi guys, this is my IT article for today!"
    end

    def mydraft
      p "Hi Mentor! Please read my draft."
    end

    def myspace
      p "I'm writing secretly here!"
    end

  protected :mydraft
  private :myspace  
  end
```

這種寫法，我覺得蠻類似於在開發Ruby on Rails專案上時常看到， 哪些套件只能在開發環境development使用，哪些在測試環境test、哪些在production環境使用的分組。

```ruby
gem 'sqlite3',             group: :development
gem 'pg',                  group: :production
```

如果我想把第六天的草稿send給menter看，可以把mydraft當作參數，使用send()方法，結果如下：

```ruby
day6.send(:mydraft) #=> "Hi Mentor! Please read my draft."
```

甚至把文章連結先send給某個人看，也行：(要小心別把不能公開的東西亂放啊！)

```ruby
day6.send(:myspace) #=> "Hi guys, this is my IT article for today!
```

如果饅頭貓也想使用我的架構來撰寫自己的鐵人賽文章，可以繼承我的類別：

```ruby
  class TingsIronmanProcess
    protected
    def mydraft
      p "Hi Mentor!"
    end

    private
    def myspace
      p "I'm writing secretly here!"
    end  
  end

  class BaterProcess < TingsIronmanProcess
    def bater_draft
      mydraft
    end
    def bater_self_draft
      self.mydraft
    end
  end

BaterProcess.new.bater_draft # Hi Mentor!
BaterProcess.new.bater_self_draft #Hi Mentor!
```

在這裡，我們引入昨天self物件可以代替自身的類別的觀念，無論是self.mydraft或是mydraft，輸出結果都不會有問題。

但如果呼叫的是Private方法 myspace呢？

```ruby
  class BaterProcess < TingsIronmanProcess

    def bater_space
      myspace
    end
    def bater_self_space
      self.myspace
    end
  end
```

如果我們在這裡使用`.self`，就會出錯：

```ruby
BaterProcess.new.bater_space # => I'm writing secretly here!

BaterProcess.new.bater_self_space  # => private method `myspace' (NoMethodError)
```

[龍哥](https://railsbook.tw/chapters/08-ruby-basic-4.html)的文章說到，呼叫private 方法的時候，不能有明確的接收者。愛注意呀！

總結： 在寫鐵人賽的文章時，我都盡可能地把前幾篇的概念拿到後面來使用，增加自己觀念上的熟悉度，盡量做到具有教育意義地環環相扣。（~~顯示為八點檔連續劇製作人?~~）

在今天Day6這篇文章裡，我們把繼承和self的概念拿來測試`public`、`protect`和`private`存取方法，也發現了：

protected :mydraft
private :myspace  
`:mydraft`，`:myspace` 這些冒號在前面的參數。

這到底是什麼呢？

明天我們就來討論符號(Symbol)吧！

===

Ref：

* [Top 10 Essential Ruby Interview Questions](https://blog.bater.gq/ruby/2018/02/02/top-10-essential-ruby-interview-questions.html)
* [Ruby on Rails Technical Interview Questions](https://github.com/timurcatakli/ruby-on-rails-interview-questions-answers)
* [類別（Class）與模組（Module)](https://railsbook.tw/chapters/08-ruby-basic-4.html)
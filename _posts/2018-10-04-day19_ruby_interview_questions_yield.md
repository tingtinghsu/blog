---
title:  "Ruby面試精選30題 - Day19 Ruby裡的yield"
preview: "Ruby interview question: What is yield statement in Ruby?"
permalink: "/articles/2018-10-04-day19_ruby_interview_questions_yield"
date:   2018-10-04 10:58:00

layout: post
tags: 
  - "interview"
---

在[第11天]時，我們曾比較block, proc與lamdba方法，而`yield`的實用場景是在`method`裡讓路給`block`區塊執行程式的意思。
<!-- more -->

---

重點摘要:
* abstact
{:toc}

---

# Ruby經典面試題目 #19

`Day19 描述Ruby裡的yield用法? What is yield statement in Ruby?`

## `yield` + `block`

現在來寫一個`IronmanDairy`類別，用以產生新物件`day19`，接著利用`get_topic`方法透過`yield`傳遞參數`topic`給`block`：

```ruby
class IronmanDairy
  def initialize(topic)
       @topic = topic
  end

  def get_topic
      yield( @topic )
  end
end

day19 = IronmanDairy.new("Yield")

#invoking the method passing a block
day19.get_topic do |topic|
    puts "We are going to talk about #{topic} today!"
end
```

從[第12天]文章比較`實體變數`與`類別實體變數`的整理，我們可以了解這裡的`@topic`是`實體變數`。

Output:

```ruby
tingdeMacBook-Air:Ironman tingtinghsu$ ruby yield.rb
We are going to talk about Yield today!
```

今天的Opening出現啦!

## `yield` + `block`: 字串方法

Block裡面還可以玩許多有趣的`String`字串方法。例如，我們想要把大寫字母轉小寫、小寫字母轉大寫：

```ruby
topic_swapcase = "" #set an empty string
day19.get_topic do |topic|
  topic_swapcase = topic.swapcase
end

puts "We are going to talk about #{topic_swapcase} today!"
```

Output:

```ruby
tingdeMacBook-Air:Ironman tingtinghsu$ ruby yield_swapcase.rb
We are going to talk about yIELD today!
```

## `yield` + `block`: 陣列方法

在寫鐵人賽的我目前所在城市是Sydney，南半球的現在正是花朵盛開、氣候美妙的春天～我想用array表達曼妙愉快的心情：

```ruby
spring = ["September",
  "October",
  "November"]
```

我想要將春天的三個月份條列印出在螢幕上，可以寫成`print_list`方法:

```ruby
spring = ["September",
  "October",
  "November"]

def spring_month (array, start =1)
  counter = start
  array.each do |item|
    puts "#{counter} #{item}"
    counter=counter.next
  end
end

spring_month( spring ) { |mth| mth }
```

當我們呼叫`spring_month`方法時，可傳入試先設定好的`spring`陣列，再用`block`方式跑完每一個陣列裡的值。（記得`{}`和`do...end`都是`block`的語法唷！）

Output:

```ruby
1 September
2 October
3 November
```

現在，我想月份前面加上對應的阿拉伯數字，例如September是9，October是10...。該如何是好呢?

這時候`yield`就派上用場啦!

我們把`yield`放在計數器`counter`前，當作設定格式的一種方式

```ruby
puts "#{yield counter} #{item}"
```

`yield`會去呼叫以下的`block`：

```ruby
spring_month( spring, 9 ) do |mth|
  "#{mth}. "
end
```

為了要讓第一個`item`是`September`從9開始，我們呼叫`spring_month`方法時，也要代入參數`9`，讓`spring_month`方法幫助我們從9開始往上遞增。並且利用`"#{mth}. "`設定格式。

整體結構如下：

```ruby
spring = ["September",
  "October",
  "November"]

def spring_month (array, start = 1)
  counter = start
  array.each do |item|
    puts "#{yield counter} #{item}"
    counter=counter.next
  end
end

#list all the months in Spring
spring_month( spring, 9 ) do |mth|
  "#{mth}. "
end
```

output:

```ruby
9.  September
10.  October
11.  November
```

以上的例子顯示，方法裡面可以結合陣列，在`block`裡面透過`array#each`method對陣列裡的元素做出各種有趣的功能，再結合`yield`之後，是不是產生很大的威力呢？：）

Ref:

* [Blocks and yields in Ruby](https://stackoverflow.com/questions/3066703/blocks-and-yields-in-ruby)
* [Ruby Basics : The yield Keyword](https://rubyplus.com/articles/4801-Ruby-Basics-The-yield-Keyword)
* [The Yield Keyword in Ruby](https://medium.com/@farsi_mehdi/the-yield-keyword-603a850b8921)
* [I don't really understand what is this yield](https://www.codecademy.com/en/forum_questions/51c72e759c4e9d410501df42)
* [block handle the formatting](http://labs.codecademy.com/BJrB#:workspace)


---
title:  "Ruby面試精選30題 - Day08 Sting的concat串接"
preview: "Ruby interview question: What’s difference between concat and += ?"
permalink: "/articles/2018-09-16-day08_ruby_interview_questions_string_concat"
date:   2018-09-16 09:18:00
layout: post
tags: 
  - "interview"
---

在第七天我們透過比較`Symbol`和`String`，發現字串的方法比符號多了許多！為了活用更多字串的方法，今天我們接續前文，來探討一題跟字串有關的題目。

<!-- more -->

---

# Ruby經典面試題目 #08

`+=和concat有什麼不同? What’s difference between concat and += ?`

`concat`是英文`concatenate`的縮寫，意思是串接（link things together in a chain or series.）串接完之後，仍然會指向同一個物件嗎?(使用同一個記憶體位置)?

要解答此一問，必須再使用前一篇所使用的印出記憶體位置方法`.object_id`。

我們來創造一個屬於第八天的、指向`第八天的字串物件`的變數`tingsmessage`：

```ruby
tingsmessage = "This is my 8th article! "
p tingsmessage.object_id
```

記憶體位置在：

```ruby
47023721077820
```

第八天呢！鐵人賽新的一週開始值得歡呼一下：

```ruby
tingsmessage.concat "Yay! "
p tingsmessage
p tingsmessage.object_id
```

印出來的結果是，還是在第八天的位置歡呼呢：）

```ruby
This is my 8th article! Yay!
47023721077820
```

如果用`+=`方法呢?

```ruby
tingsmessage += "Plus One Everyday! "
p tingsmessage
p tingsmessage.object_id
```

加了`+=` `每天都加一篇`這段敘述，結果記憶體位置隨著`+`方法而改變了：

```ruby
This is my 8th article! Yay! Plus One Everyday!
47358398608700
```

按照第七天文章的結論，讀取相同記憶體位置不會變來變去，時間耗費短，因此concat方法較省時。[+ or .concat, what is faster for appending string in Ruby?](https://coderwall.com/p/ac5j9g/or-concat-what-is-faster-for-appending-string-in-ruby)這篇文章的作者已經在ruby幫我們做了一個串接string的benchmark實驗，非常有趣。

提到了`concatenation`串接，通常會和`interpolation`插入拿來一起談。

如果我們在明天、想要調整第9天的message呢？

換湯不換藥，其實大部分的訊息字串都是一樣的，只是天數改變，所以我們可以設一個整數變數`tingsironmanday`，將數字Number轉為字串String，利用剛剛學的`+`方法串再一起：

```ruby
tingsironmanday = 9
p "I've written " + tingsironmanday.to_s +  " articles!"
# => "I've written 9 articles!"
```

`interpolation`概念，就是`#{}`大括號包住數字變數，此方法自動會幫我們轉換數字為字串，讓程式碼更簡潔，可讀性更高。：）

```ruby
p "I've written #{tingsironmanday} articles!"
# => "I've written 9 articles!"
```

從今天舉的🌰例子們可以發現發現在ruby裡，一樣的功能總是有不同的寫法，讓我們可以根據情況選擇適合自己最佳的使用時機，這些設計是不是很聰明呢？

===

Ref：

* [Top 10 Essential Ruby Interview Questions](https://blog.bater.gq/ruby/2018/02/02/top-10-essential-ruby-interview-questions.html)
* [Ruby on Rails Technical Interview Questions](https://github.com/timurcatakli/ruby-on-rails-interview-questions-answers)
* [+ or .concat, what is faster for appending string in Ruby?](https://coderwall.com/p/ac5j9g/or-concat-what-is-faster-for-appending-string-in-ruby)
* [String concatenation vs. interpolation in Ruby](https://stackoverflow.com/questions/10076579/string-concatenation-vs-interpolation-in-ruby)

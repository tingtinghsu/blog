---
title:  "Ruby面試精選30題 - Day18 Ruby裡的多行字串"
preview: "Ruby interview question: How to write multiline string in Ruby?"
permalink: "/articles/2018-10-02-day18_ruby_interview_questions_multiline_string"
date:   2018-10-02 08:15:00
layout: post
tags: 
  - "interview"
comments: true
---

以Ruby表達多行字串是很容易的，現在立馬來試試看吧！
<!-- more -->

---

重點摘要:
* abstact
{:toc}

---

# Ruby經典面試題目 #18

`Day18 如何在Ruby寫下多行字串? How to write multiline string in Ruby?`

## `puts`多行字串

Ruby最常見的方法`puts`加上空行(Enter健)即可實現換行。來用換行功能吟詩作對一下：

```ruby
puts "
那  
達達的馬蹄聲
是個
美麗的錯誤"
```

Output:

```ruby
tingdeMacBook-Air:Ironman tingtinghsu$ ruby multiline.rb

那
達達的馬蹄聲
是個
美麗的錯誤
```

嗯嗯恩～好詩！好詩！

## `%{}`多行字串

百分比+大括號符號組合也有相同的多行/斷行功能，而且比單單純純的`puts`多了一個好處，就是可以代入變數：

```ruby
year = 1954

puts %{鄭愁予
  "錯誤"
寫於#{year}年}
```

Output:

```ruby
鄭愁予
  "錯誤"
寫於1954年
```

## `%Q{}`與`%q{}`多行字串

我們通常會在`%{}`中間加入一個大寫Q，變成`%Q{}`，作用和`%{}`是一樣的：

```ruby
year = 1954

puts %Q{鄭愁予
  "錯誤"
寫於#{year}年}
```

`%Q`和`%{}`都可以幫我們處理跳脫字元、特殊符號如#、單引號、雙引號的問題。

```ruby
puts %Q[ 大寫Q + 中括弧:
  鄭愁予
  "錯誤"
寫於#{year}年。It's a masterpiece!]
```

Output:

```ruby
 大寫Q + 中括弧:
  鄭愁予
  "錯誤"
寫於1954年。It's a masterpiece!
```

包夾符號其實也可以任意使用大括弧`{}`、中括弧`[]`，或小括弧`()`。（不過慣例上還是`{}`較常用呢！）

換成小寫的`%q`試試：

```ruby
puts %q(小寫q + 小括弧:
  鄭愁予
  '錯誤'
寫於#{year}年。It's a masterpiece!)
```

Output:

```ruby
小寫q+ 小括弧:
  鄭愁予
  '錯誤'
寫於#{year}年。It's a masterpiece!
```

使用`%q`時，代表年份的變數`#{year}`無法被識別。

## `<<EOF`多行字串

還記得我們在[昨天]的文章用`<<`將變數的值改變嗎?

如果要把這段詩句寫成一個`print_poet`方法，我們可以在`puts`後面加上 `<<EOF`以及`EOF`做結尾:

```ruby
def print_poet
puts <<EOF
  那  
    達達的馬蹄聲
  是個
    美麗的錯誤
EOF
end

print_poet
```

`EOF (End of File)`是`ruby`從`c語言`引進的概念，

> 第一個`<<EOF`：表示把內容當作標準輸入程式`stdin (Standard Input)`

> 第二個`EOF`：表示自己定義的"文字流"（stream）的終止。在以上的例子中，我的文字流是一首詩。

結果顯示:

```ruby
tingdeMacBook-Air:Ironman tingtinghsu$ ruby multiline.rb
  那
    達達的馬蹄聲
  是個
    美麗的錯誤
```

我們如果希望`def...end方法`內的程式碼也能符合縮排原則，那就來實驗看看將`puts <<EOF`前加上縮排，能不能執行：

```ruby
def print_poet
  puts <<EOF # syntax error, unexpected end-of-input
    那  
      達達的馬蹄聲
    是個
      美麗的錯誤
  EOF
end

print_poet #can't find string "EOF" anywhere before EOF
```

燈等！在程式的第二行出現了語法錯誤`unexpected end-of-input`。

## `<<-EOF`多行字串，提供縮排功能

解法很簡單，如果我們要考慮縮排情形的話，在`EOF`年多加上`-`減號就行了：

```ruby
def print_poet
  puts <<-EOF
    那  
      達達的馬蹄聲
    是個
      美麗的錯誤
  EOF
end
```

## `<<`後的字串當作變數

`<<`後面的大寫字串，也可以用比較好理解的變數名稱（不一定要用EOF）；

可以進一步用`*`做運算:

```ruby
puts <<TimesThree * 3
很重要所以說3次!
TimesThree
```

Ruby很有趣吧!

```ruby
很重要所以說3次!
很重要所以說3次!
很重要所以說3次!
```

或是用`+`串接：

```ruby
puts <<LineOne + <<LineTwo
那 達達的馬蹄聲
LineOne
是個 美麗的錯誤
LineTwo
```

結果把兩行詩加在一起了：

```ruby
那 達達的馬蹄聲
是個 美麗的錯誤
```

## `<<String`與Method合併使用

文章最後，我們來實現`多行字串`與`方法`的結合吧！而且這次要代入2個參數進去：

```ruby
def ironman_log (integer, string)
  puts "第#{integer}天主題: #{string}"
end

ironman_log 18, "multiline"
```

`ironman_log`方法幫我們hightlight今天這篇文章的重點。

Output:

```ruby
第18天主題: multiline
```

那，`string`變數可不可以代入`多行字串`呢?

當然可以～～
`多行字串`也是`字串`呀！

```ruby
ironman_log 18, <<POET

那
  達達的馬蹄聲
  是個
  美麗的錯誤
我
  不是詩人
  是個新手工程師
:)  
POET
```

我不是詩人，是個工程師：）

```ruby
tingdeMacBook-Air:Ironman tingtinghsu$ ruby multiline.rb
第18天主題:
那
  達達的馬蹄聲
  是個
  美麗的錯誤
我
  不是詩人
  是個新手工程師
:)
```

Ref:

* [Ruby Strings : multiline](https://www.javatpoint.com/ruby-strings)
* [Ruby Strings](http://ruby-doc.org/docs/ruby-doc-bundle/Manual/man-1.4/syntax.html#here_doc)
* [Ruby: Can I write multi-line string with no concatenation?](https://stackoverflow.com/questions/2337510/ruby-can-i-write-multi-line-string-with-no-concatenation)
* [Ruby教學 - 字串(String)](http://emn178.pixnet.net/blog/post/110782417-ruby%E6%95%99%E5%AD%B8---%E5%AD%97%E4%B8%B2%28string%29)
* [Ruby 多行字符串 heredoc](https://ruby-china.org/topics/25983)
* [使用cat命令和EOF標示輸出多行文件](http://www.linuxfly.org/post/146/)


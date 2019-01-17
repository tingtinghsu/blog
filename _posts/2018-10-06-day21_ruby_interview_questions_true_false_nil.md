---
title:  "Ruby面試精選30題 - Day21 Ruby的true，false和nil"
preview: "Ruby interview question: Explan True and False vs. Truthy and Falsey / Falsy in Ruby"
permalink: "/articles/2018-10-06-day21_ruby_interview_questions_true_false_nil"
date:   2018-10-06 13:39:00
layout: post
tags: 
  - "interview"
comments: true
---

話說這個世界上有許多真假難分的東西...

> 假作真時真亦假，無為有處有還無——曹雪芹《紅樓夢》。

如何用Ruby程式好好判斷呢？這就是今天的主題啦！
<!-- more -->

---

重點摘要:
* abstact
{:toc}

---

# Ruby經典面試題目 #21

`Day21 解釋Ruby裡的True, False與Nil? Explan True and False vs. "Truthy" and "Falsey / Falsy" in Ruby?`

老實說這題我拖了好久，因為相關的面試題目特別多，一直在構思怎麼整理、寫成文章會比較有架構，也希望自己的產出作品也可以讓其他Ruby新手同學們比較容易了解，所以...不知不覺就到了最後10天了～～（遮臉）

先講結論:

* (1) `true`物件，代表為`真`。True is truthy.
* (2) `false`物件，代表為`假`。False is falsey.
* (3) `nil`物件代表`沒有`的意思。 Nil is falsey. The object Nil represents “nothing”.

來列張表格：

超級比一比 | 意思 | 舉例 | Truthy / Falsey
------------- | ------------- | -------------| -------------
`true`物件  | `真`  | 0, 1, "",[]`陣列`, {}`區塊`, [1,2,3] | Truthy
`false`物件  | `假`  | 1+1==3 | Falsey
 `nil`物件  | `沒有`  | nil, () | Falsey

# True: truely

先用Ruby程式碼來看看 `0`:

```ruby
if 0
  puts "0 is truthy"
else
  puts "0 is falsey"
end
# Output: 0 is truthy
```

想起昨天的鐵人賽，最後我們在`enumerator`和`yield`的例子中用溫度來舉例，在冬天時溫度可能為零度，甚至零下(minus degree)。

大家可以把`0`想成真實世界中的氣溫攝氏0度，這是的確是一個確實存在的值，所以單然是`true`囉！

# False: falsey

再來，我們用Ruby驗證一下幼稚園學過的`1+1=2`

```ruby
if (1+1==3)
  puts "1+1==3 is truthy"
else
  puts "1+1==3 is falsey"
end
# Output: 1+1==3 is falsey

if (1+1!=2)
  puts "1+1!=2 is truthy"
else
  puts "1+1!=2 is falsey"
end
# Output: 1+1!=2 is falsey
```

果然，`1+1`只會等於`2`。

`1+1不等於2`，這句話是假的。（~~聽起來好像在研究哲學問題啊(?!)~~）因此我們可以得出結論`false is falsey`。

# Nil: falsey

關於`nil`，我把它比喻為`錢包裡沒有錢`～錢包沒有錢當然是假的～～！！！是假的！！！**當然要催眠自己的錢包裡很有錢(挺)**

```ruby
if nil
  puts "nil is truthy"
else
  puts "nil is falsey"
end
# Output: nil is falsey
```

# 真的假的? truthy_or_falsey

如果我們每次想要判斷一次`某物件是否為真`，都要寫一次`if...else end`，未免也太累了...。因此最好的方法，就是用`def`寫一個方法！（好像在繞口令）

```ruby
def truthy_or_falsey something
#此方法會傳入something參數(省略小括號)
  if something
    puts "#{something.inspect} is truthy"
  else
    puts "#{something.inspect} is falsey"
  end
end

[true, false, nil, Object, 0, 1, 1+1==3, "", ["", "", ""],(),[],{}].each do |x|
  truthy_or_falsey(x)
end
```

Output:

```ruby
true is truthy
false is falsey #
nil is falsey #
Object is truthy #物件為真
0 is truthy
1 is truthy
false is falsey #1+1==3，為假
"" is truthy #空字串仍是字串，為真
["", "", ""] is truthy #空陣列仍是陣列，為真
nil is falsey #():未代入任何參數的小括號為nil
[] is truthy #Array
{} is truthy #Block
```

# nil (空值) 與empty string (空字串)

`nil`空值可以用`.to_s`方法轉換成`empty string ""`空字串。

我們先設定`xfactor`為空值:

```ruby
xfactor = nil

print "xfactor : "
puts xfactor =="" # => false. a is nil
print "xfactor to string : "
puts xfactor.to_s =="" # => true. empty string
```

Output:

```ruby
xfactor : false
xfactor to string : true
```

`nil`轉成`字串`之後，就變成物件了，所以為真：）

# 真，假，結合布林值 `||` (or,或) `&&` (and, 且)與`if`

如果有兩條運算式，一條是真的，一條是假的，再用`|| or`連起來，結果仍為真（只需滿足`其中之一為真`的條件）

`真`或`假`共存，取其一為`真`=> 結果就可為`真`

```ruby
if (1+1==2) || (1+1!=2)
  puts "it is truthy"
else
  puts "it is falsey"
end #it is truthy! One of it is true.
```

反之，用`&& and`全部連起來，全部都假，才為假。

`假`且`假`=> 結果為`假`

```ruby
if (1+1==2) || (1+1!=2)
  puts "it is truthy"
else
  puts "it is falsey"
end #it is falsey! Both are false.
```

最後，來列兩個`或且`九宮格比較一下：

[`or` . `||` . `或`]
`||` | true | false
------------- | -------------|-------------|
true| true | true|
false| true | false

[`and` . `&&` . `且`]

`&&` | true | false
------------- | -------------|-------------|
true| true | false|
false| false | false

我相信實務上有更多複雜的真假判斷句子，不過不用擔心！只要我們在每一天都能穩健地做好基礎打底工作，未來就不怕以假亂真了！：Ｐ

Ref:

* [Ruby true, false, or nil](https://stackoverflow.com/questions/34594477/ruby-true-false-or-nil)

* [true and false vs. "truthy" and "falsey" (or "falsy") in Ruby, Python, and JavaScript](https://gist.github.com/jfarmer/2647362)

---
title:  "Ruby面試精選30題 - Day24 nil?, empty? 和, blank? present? 比較?"
preview: "Ruby interview question: What's the difference between nil?, empty?blank? and present?"
permalink: "/articles/2018-10-18-day24_ruby_interview_questions_nil_empty_blank"
date:   2018-10-18 09:51:00
layout: post
tags: 
  - "interview"
comments: true
---

這一系列`精選面試題`寫下來，我發現新手工程師對於相似、接近的method或概念都會比較困惑，也難怪熱門面試要考這些題目了！這樣才能鑑別出面試候選人真的有弄懂程式觀念。也希望我整理好的這30篇鐵人賽文章，未來能幫助到許多想學Ruby、進而想找相關工作的新手們！
<!-- more -->

---

重點摘要:
* abstact
{:toc}

---
# Ruby經典面試題目 #24

`Day24 nil?, empty? 和, blank? present? 比較。 What's the difference between nil?, empty?blank? and present? `

# 1. `nil?`

在[Day21]的文章時，我們有討論到`nil`這個`虛空`的概念。而`nil?`是Ruby裡的方法，可以使用在任何物件，用來判斷該物件`是否為nil`，若`nil`為真，則傳回`true`。

```ruby
nil.nil?   # => true
false.nil? # => false
true.nil?  # => false
"".nil?    # => false
" ".nil?   # => false
[].nil?    # => false
{}.nil?    # => false
```

以上7行例子，我們可以發現，只有`nil.nil?`才會回傳`true`

# 2. `empty?`

`empty?`也是Ruby的方法，用來檢查`集合Collection`是否為空。(It returns true when the object's length is zero.)

我們可以用`empty?`來測試包含：`字串String`、`陣列Array`、`雜湊Hash`和`Set數組`是否為空值。

```ruby
" ".empty?   # => false **字串內有'空白鍵'的值，非空**

"".empty?    # => true 空字串
[].empty?    # => true 空陣列
{}.empty?    # => true 空雜湊
```

另外的集合例子：`Set數組`，是我新學到的Ruby概念:)，指的是一組不重複的值是否為空值(a collection of unordered values with no duplicates)。(進一步說明請看[Ruby API 文件](https://ruby-doc.org/stdlib-2.5.3/libdoc/set/rdoc/Set.html))。

我們可以想像去餐廳裡點一個`Set套餐`，包含一主食、一甜點、一飲料，其中不會有任何重複的食物。在以下程式碼，記得要在第一行引入`require 'set'`，不然會出現`uninitialized constant Set (NameError)`：

```ruby
require 'set'

s1 = Set[0, 'c', :s] #設定一個數組，包含數值、字元、符號
# => #<Set: {1, "c", :s}>
p s1.empty?  # => false, 此數組非空值

s2 = Set.new
p s2 #<Set: {}>
p s2.empty?  # => true, 此數組空空如也！
```

`empty?`就不像前面一開始提到的`nil?`可以作用在任何物件了。舉例來說，`True`,`False`,`Nil`這三個`類別class`，都不具有`empty?`方法：

```ruby
p true.empty?  # => NoMethodError: undefined method `empty?' for true:TrueClass

p false.empty?  
 # => NoMethodError: undefined method `empty?' for true:TrueClass

p nil.empty?
# NoMethodError: undefined method `empty?' for nil:NilClass
```

此外，`.empty?`方法也不能使用在`Enumerable`列舉，原因是：我們無法確定傳入的參數迭代後，是否仍具有`非nil`的傳回值。 (Not every object which iterates and returns values knows if it has any value to return. [[原文](https://blog.arkency.com/2017/07/nil-empty-blank-ruby-rails-difference/)])。

好家在！我在[第20天]曾經有花點時間研究`Enumerable`列舉方法的各種可能，`當不能確定元素內值的完整資訊`的情況（例如：搜尋不到自己要的字元、字串等）其實還蠻常見的。[[再複習一下Ruby API : Enumerable](http://ruby-doc.org/core-2.4.2/Enumerable.html)]

由今天的例子，我明白到一個道理：使用一個工具(method)之前，要明白它的管轄範圍(隸屬於哪個class的method)，不然就好像`提油救火`一樣不合時宜唷！

# 3. `blank?`

既然`empty?`有這麼多使用限制，而可以使用在所有物件的的`nil?`又只能確認`nil`時為`true`，有沒有個各取兩者優勢的好方法呢？

將將將！終於來到我第一個研究Ruby on Rails的方法：`blank?`。我們都知道Rails是基於Ruby寫出的框架，所以想必Rails整合許多Ruby的功能，讓寫出網站的動態功能變成更簡潔的事情。

`blank?()`就是一個結合我們在前面提到的前兩組方法 `nil?`與  `empty?`（這也是我第一次認真點開Rails文件[Rails API: blank?()](https://api.rubyonrails.org/classes/Object.html#method-i-blank-3F)研究~~怎麼有點興奮的港結！！！）

來看看rails在[Github](https://github.com/rails/rails/blob/fc5dd0b85189811062c85520fd70de8389b55aeb/activesupport/lib/active_support/core_ext/object/blank.rb#L19)上的程式細節，了解它是怎麼改寫的：

```ruby
# File activesupport/lib/active_support/core_ext/object/blank.rb, line 19

def blank?
  respond_to?(:empty?) ? !!empty? : !self #是empty或者self是nil，回傳true
end
```

因此，`address.empty? || !address`

可以寫成：`address.blank?`

## blank?()為真的情形

[Rails API: blank?()](https://api.rubyonrails.org/classes/Object.html#method-i-blank-3F)裡面提到：

> An object is blank if it's false, empty, or a whitespace string.

* `nil`和`false`:是`falsy`
* `""`是空字串
* `" "`是空白鍵
* `[]`是空陣列
* `{}`是空雜湊

> They are all blank.

以Rails程式碼表達如下：

```ruby
[ nil, false,  "", " ", [], {} ].all?(&:blank?) # => true
```

我相信大家一定都能理解在製作動態功能網站時類似申請`使用者帳號密碼`的場景，密碼字元不能是`nil`或`empty`。或安插`空白鍵`。這在rails裡可以直接整合成`blank?()`功能喔（真是太方便了！）

# 4. `present?`

`present?`與`blank?`就像一對愛唱反調的兄弟一樣，做的剛好是完全相反的事情(An object is present if it's not blank. [[Rails API](https://api.rubyonrails.org/classes/Object.html#method-i-present-3F))]

```ruby
# File activesupport/lib/active_support/core_ext/object/blank.rb, line 26
def present?
  !blank?
end
```

`present?`從字面上的意思確認是否存在(非`nil`且非`空值`且非`空白鍵`)，`若存在，則回傳True`。present?也是專屬Rails的method。

> present? is also an ActiveSupport extension to Ruby Object and it is the negation of blank?. [原文](https://gist.github.com/pythonicrubyist/8114720)

以Rails程式碼表達如下：

```ruby
[ nil, false,  "", " ", [], {} ].any?(&:present?) # => false
```

我發現到自己在鐵人賽第10天之後，只要新學到任何Ruby工具(method)，下意識就會馬上去查Ruby Doc看它們屬於哪個類別、以及將Ruby Doc的例子改寫為自己的使用案例...這真是巨大的成長與蛻變！(給自己拍拍手～～)這或許是更有意識地去學習一套新東西的去強迫自己成長的附加價值吧！：）

最後，附上`超級比一比`統整表格：

nil? | empty?| blank?  | present?
------------- | -------------| -------------| -------------
Ruby | Ruby| Rails| Rails
若物件為`nil`，則回傳`true` | 若`集合`(String, Array...etc)的長度為0，則回傳`true` | 若`nil`或`empty`或`空白鍵`，則回傳`true` | 若此物件存在(非`nil`且非`empty`)，則回傳`true`



Ref:

* [nil?, empty?, blank? in Ruby on Rails - what's the difference actually?](https://blog.arkency.com/2017/07/nil-empty-blank-ruby-rails-difference/)
* [Difference between nil?, empty?, blank? and present? in Ruby and Ruby on Rasils.](https://gist.github.com/pythonicrubyist/8114720)
* [A concise explanation of nil v. empty v. blank in Ruby on Rails](https://stackoverflow.com/questions/885414/a-concise-explanation-of-nil-v-empty-v-blank-in-ruby-on-rails/888877#888877)
* [.nil? .empty? .blank? .present? 傻傻分不清楚？](https://mgleon08.github.io/blog/2015/12/16/ruby-on-rail-nil-empty-blank-present/)
* [Ruby的.nil? .empty? .blank? .present?差别](https://blog.csdn.net/u013435984/article/details/53608920)
* [Ruby API: Set](https://ruby-doc.org/stdlib-2.5.3/libdoc/set/rdoc/Set.html)
* [Rails API: blank?](https://api.rubyonrails.org/classes/Object.html#method-i-blank-3F)
* [Rails API: present?](https://api.rubyonrails.org/classes/Object.html#method-i-present-3F)
* [Github: rails/activesupport/lib/active_support/core_ext/object/blank.rb](https://github.com/rails/rails/blob/fc5dd0b85189811062c85520fd70de8389b55aeb/activesupport/lib/active_support/core_ext/object/blank.rb#L19)

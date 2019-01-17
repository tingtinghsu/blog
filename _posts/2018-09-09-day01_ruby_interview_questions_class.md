---
title:  "Ruby面試精選30題 - Day01 用Class類別寫個參賽宣言吧！"
preview: "Ruby interview question: What is a Class?"
permalink: "/articles/2018-09-09-day01_ruby_interview_questions_class"
date:   2018-09-09 13:40:00
layout: post
tags: 
  - "interview"
comments: true
---

30天修煉Ruby面試精選30題 (December 2018 Version)

距離2018年結束，倒數兩週！在閱讀了Mihaly Csikszentmihalyi的書籍`Flow: The Psychology of Optimal Experience`後，我決定按照書中的精神，建立在早晨工作時能快速進入心流狀態、屬於自己的Discipline，整個工作天能夠有效率地達成所設定的專案目標，這樣的話～每個日子都會變成積累成就感與幸福感的好日子。([有興趣的讀者，請參考`米哈里·契克森米哈賴的`TED Talk](https://www.ted.com/talks/mihaly_csikszentmihalyi_on_flow?language=zh-tw))

<!-- more -->

# My Writing Guideline

## A. 尋找靈感，決定文章目的

 1. 主題系列（eg:[30天修煉Ruby面試精選30題](./2018-12-19-ruby_interview_syllabus)）
 2. 偵錯系列 (eg:[修改版型筆記](./2018-12-26-change_them_for_jekyll_blog))
 3. 新功能系列（eg: [想為文章加入gist片段]）

## B. 設定工作環境

有可以實作測試程式碼的地方是很重要的。

* [Github帳號](https://github.com/tingtinghsu)
* [自己的技術筆記blog](https://tingtinghsu.github.io/blog/)
* [可Deploy動態功能的網站](http://tingsrailsdemo.herokuapp.com/)

## C. 固定技術寫作的時間與習慣

1.寫文章的生活規律化

  08:00AM - 12:30PM (4.5hr)
  14:00PM - 17:30PM (3.5hr)

2.熟練文章發布流程

VS code -> localhost預覽 -> git commit -> git push

3.立馬開始，堅持到底。

用行動證明一切：）我們來解題吧！

---

# Ruby經典面試題目 #01

`什麼是類別？What is a Class?`

> 類別(Class)能夠接收資料(data)，利用方法(method)和資料data互動，並且可以建立物件實體(Object instance)。

以上概念對於程式新手來說，應該會很模糊。我們要了解`類別(Class)`，就必須知道Ruby是一款`物件導向程式語言(Object-Oriented Programming, OOP)`。

而Ruby的世界裡，幾乎所有東西都是`物件(Object)`，包含了：

* `數值`(Numeric，整數與浮點數)
* `布林值`(True or False)
* `字串`(String)
* `符號`(Symbol，代表固定值)
* `陣列`(Array)
* `雜湊`(Hash)
* `範圍`(Range)
* `類別`(class)
* `模組`(Module)...etc

每個`物件`就像一台小型機器一樣，可以「接收資料」、「處理資料」，並「傳遞資料」給其他的物件。

而`物件導向`的程式語言，利用「可重複性」的概念來使軟體功能更易於維護。

例如，類別具有`繼承(inheritance)`的能力，讓`子類別`直接繼承`父類別`的特性。

寫個class的例子試試看，我想用`.superclass`查詢父類別，了解`繼承`關係：

<script src="https://gist.github.com/tingtinghsu/f7b604327ac31896e4aff735675952ad.js">
</script>

雖然程式碼好像繞口令，但如果以蓋大樓為例就會很直觀了：

* Object是頂樓
* Ｗorld是三樓
* Country是二樓
* tw是一樓

層層上推之後，到了頂樓`tw.class.superclass.superclass`，輸出了`Object`，
證明從`tw`(country類別的物件)，到`Country`(子類別)到`World`(父類別)，全部都是`物件`！

這就是Ruby的世界觀：）

把以上的程式碼用`irb`跑出結果：

```ruby
ironman2018 tingtinghsu$ ruby D01Eg1-class_superclass.rb

Country #tw的類別：顯示為Country
World   #Country的父類別：顯示為World
Object  #World的父類別：顯示為Object
```

就算到了頂樓層Object，我們還可以繼續下樓梯，用`.class`往回推實驗下去，了解Contry的類別：

```ruby
p tw.class.superclass.class #印出World的類別: Class
p tw.class.superclass.class.superclass #印出World的類別(Class)的父類別: Module
p "-----break-----"
p tw.class.superclass.class.superclass.class #印出Module的類別: Class
p tw.class.superclass.class.superclass.superclass #印出Module的父類別: Object
```

程式碼顯示出來的結果如下:

```ruby
Class
Module
"-----break-----"
Class
Object
```

這時我們可以知道，類別(class)與模組(Module)有深厚的關係。
(可進一步參考[龍哥的文章](https://railsbook.tw/chapters/08-ruby-basic-4.html))

回到「什麼是類別？」

> 類別(Class)能夠接收資料(data)，建立物件實體(Object instance)，利用方法(method)和資料data互動。

那我們就來用類別、物件、實體變數，和方法，寫一個開賽宣言吧！

<script src="https://gist.github.com/tingtinghsu/df5d3026b623216db64b978c653b08ac.js"></script>

第一天的練習就到這裡：）希望能繼續解題下去！

Ref：

* [Top 10 Essential Ruby Interview Questions](https://blog.bater.gq/ruby/2018/02/02/top-10-essential-ruby-interview-questions.html)
* [Ruby on Rails Technical Interview Questions](https://github.com/timurcatakli/ruby-on-rails-interview-questions-answers)
* [類別（Class）與模組（Module)](https://railsbook.tw/chapters/08-ruby-basic-4.html)
* [數字、字串、陣列、範圍、雜湊、符號](https://railsbook.tw/chapters/06-ruby-basic-2.html)

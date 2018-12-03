---
layout: post
title:  "30天修煉Ruby面試精選30題 - Day01 用Class類別寫個參賽宣言吧！"
date:   2018-09-10 09:40:00 +1000
categories: interview
---

30天修煉Ruby面試精選30題

# 參賽緣起：

這是我第一次決定參加IT邦鐵人賽！可喜可賀！能夠在鐵人賽第10屆的大日子參賽，就彷彿跟在雪梨馬拉松40週年時拿到42KM馬拉松獎牌一樣榮幸啊啊啊。

我在學的背景是資訊管理，自從某年開始決定搬去海外闖蕩之後，離開IT相關領域有好一段時間了（~~顯示為各種指令忘光光~~）。後來主要接觸的工作項目都是與客戶服務打交道關，例如零售業、飯店、餐廳、旅館等...。時光飛逝，不知不覺地就過了好幾年。

> 這段時間不但結交了國際上五湖四海的好友，為在海外生活增添許多自信，也學會了許多溝通、說服、激勵、銷售、領導的技巧，搜集不同的skill set，這是我的人生當中成長最快的一段日子，我也透過不同環境的磨練，學會更加認識自己、更了解到：其實不論你與我，每一個人的身上，都有蘊藏有無窮的潛力。只是看遇到什麼樣的情境，可以讓你主動激發自己的行動力和成長潛能！
>
>**（然後...英文很重要！英文很重要！英文很重要所以說三次！）**

最近考慮也許會在明年搬回亞洲發展（台灣或日本），考慮之下IT仍然是值得優先的發展選項。
然而我面臨的問題，如同世界上各個角落的人們一樣，科技變化如此迅速，如何深度工作，聚焦專注，快速掌握一門知識？

我決定從學習**Ruby on Rails**開始著手！而且用參與IT邦鐵人賽的機制，~~逼迫~~鼓勵自己在短期間內專心學習與產出知識。

## A. 首先：找尋方向，決定主題：

我想很多人的狀況都跟我一樣：想學新的東西、甚至是想轉進入新的行業，但又不知道該如何入門。

我以自身的情境為例，假設我從什麼都不懂的情況下出發，如何在一年後，成為能夠面試成功的Ruby Junior Developer?

後來我受到這篇[Top 10 Essential Ruby Interview Questions](https://blog.bater.gq/ruby/2018/02/02/top-10-essential-ruby-interview-questions.html)啟發，我決定從「最常被問到的面試題目」著手，我把學習新知識，和自己的旅行經驗做連結，如同在地球上探索未知的地方一樣，把題目當作地圖上的地標一般的擴展知識。

如果我能成功做到的話，相信能鼓勵更多台灣朋友勇於挑戰自己，勇於嘗試，接觸更多有趣好玩的資訊領域！

## B. 其次：分配技術寫作的時間

身為馬拉松跑者，我相信鐵人賽就好像跑馬拉松一樣，比賽的身體、心理調適，是從幾個月前就開始，做好充足的準備，才能大幅降低斷賽的機率。

### 1. 把寫文章的生活規律化

這是我從第一個Coach（生涯教練）身上學到的，要把時間Block下來，專心做好手頭上的事。我每天早上九點到下午三點到一個會令自己專心的地方技術文章寫作。（還要記得規律運動、還有適時地讓眼睛離開電腦休息一下喔！）

### 2. 熟悉IT邦的技術文章發布流程

我在8月到9月這段時間，先練習文章發布，包含使用Markdown語法、草稿與Tag、截圖功能上傳的功能熟悉。

如同去健身房鍛鍊肌肉一樣，一開始感到不習慣與不舒適（第一個不適應的是：我發的文章會出現輪播在網站首頁，也太害羞了吧！~~如果文章亂寫或寫錯的話會很羞恥的~~）之類的心理調適。

我也開始看Ruby on Rails專案的線上教學課程，並練習修改一些專案功能，練習適應有bug時的焦慮不耐煩（現在已經接受這是工程師的日常了～撥頭髮~~）以及練習自己找解答、找不出來也要練習提問與求助。

## C. 做好準備功夫，然後按照計劃，堅持下去！

工欲善其事，必先利其器。任何有自己的電腦的地方就是辦公桌，而在自己的網站的地方就是實驗場。

### 1. 架好環境：Github帳號, 自己blog和可以接受動態功能的網站：

有可以實作測試程式碼的地方是很重要的，才能了解自己到底懂不懂學到的新觀念與工具！

### 2. 立馬開始，堅持到底。

用行動證明一切：）我們來解題吧！

---

# Ruby經典面試題目 #01

`什麼是類別？What is a Class?`

> 類別(Class)能夠接收資料(data)，利用方法(method)和資料data互動，並且可以建立物件實體(Object instance)。

以上概念對於程式新手來說，應該會很模糊。我們要了解類別(Class)，就必須知道Ruby是一款物件導向程式語言（Object-Oriented Programming, OOP）。

而Ruby的世界裡，幾乎所有東西都是物件(Object)。包含數值(Numeric，整數與浮點數)，布林值(True or False)，字串(String)，符號(Symbol，代表固定值)，陣列(Array)，雜湊(Hash)，範圍(Range)到模組(Module)與類別(class)。

每個物件(Object)就像一台小型的機器一樣，可以「接收資料」、「處理資料」，並「傳遞資料」給其他的物件。

物件導向程式語言利用「可重複性」的概念來使軟體功能更易於維護。例如，類別(class)具有繼承(inheritance)的能力，讓子類別直接繼承父類別的特性。

舉個class的例子試試看，並用`.superclass`查詢父類別，了解繼承關係：

```ruby
class World #建立類別名稱「世界」
end

class Country < World #建立「國家」繼承了世界類別
end

tw = Country.new #建立一個新國家:灣灣

p tw.class # 印出tw的類別
p tw.class.superclass    # 印出tw的的類別(Country)的父類別
p tw.class.superclass.superclass    # 印出tw的的類別(Country)的父類別(World)的父類別
```

在當我們把以上的程式碼在`irb`跑出來，會出現：

```ruby
Country #tw的類別：顯示為Country
World   #Country的父類別：顯示為World
Object  #World的父類別：顯示為Object
```

雖然上面的程式碼好像繞口令，但如果以蓋大樓為例就會很直觀了：

tw是一樓，Country是二樓，Ｗorld是三樓，Object是頂樓。
層層上推之後，到了頂樓`tw.class.superclass.superclass`，輸出了`Object`，
證明從tw，到Country到World都是物件呢！

這就是Ruby的世界觀：）

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
近一步參考：[龍哥的文章](https://railsbook.tw/chapters/08-ruby-basic-4.html)

回到「什麼是類別？」

> 類別(Class)能夠接收資料(data)，建立物件實體(Object instance)，利用方法(method)和資料data互動。

那我們就來用類別、物件、實體變數，和方法，寫一個開賽宣言吧！

```ruby
class TingIsIronman
  def initialize
    @message = "I'm going to write 30 IT articles in 30 days." #定義實體變數（instance variable）@message
  end

  def method
    puts @message.gsub("write", "create") #gsub方法，可以取代字串
  end
end

object = TingIsIronman.new
object.method
#=> I'm going to create 30 IT articles in 30 days.
```

第一天的練習就到這裡：）希望能繼續解題下去！

Ref：

* [Top 10 Essential Ruby Interview Questions](https://blog.bater.gq/ruby/2018/02/02/top-10-essential-ruby-interview-questions.html)
* [Ruby on Rails Technical Interview Questions](https://github.com/timurcatakli/ruby-on-rails-interview-questions-answers)
* [類別（Class）與模組（Module)](https://railsbook.tw/chapters/08-ruby-basic-4.html)
* [數字、字串、陣列、範圍、雜湊、符號](https://railsbook.tw/chapters/06-ruby-basic-2.html)
---
layout: post
title:  "Ruby面試精選30題 - Day30 Ruby的duck type+完賽感言"
date:   2018-11-02 12:38:00
categories: interview
---

完賽這天終於到來！寫IT文章原來是這麼有趣的事呢！經過這30天內持續的努力，我的心態變得更強壯：）
<!-- more -->
---

重點摘要:
* abstact
{:toc}

---

# Ruby經典面試題目 #30

`Day30 請解釋Ruby的鴨子型別(duck type)?  What is duck type?`

# Duck Type 鴨子型別

> 如果你看到一隻鳥走起來像鴨子；游泳起來像鴨子；叫起來也像鴨子；那麼這隻鳥就可以被稱為鴨子。

參考發明Ruby的Yukihiro Matsumoto所寫的[松本行弘談程式世界的未來(電子書)](https://books.google.com.au/books?id=uYvpBgAAQBAJ&pg=PA109&lpg=PA109&dq=ruby+鴨子型別)：**如果只關心物件具備的方法，而不用考慮一個物件究竟是哪個類別的實體，就是鴨子型別。**

`Duck type`是一種用來譬喻`動態型別語言(Dynamically Typed Language)`的設計風格。這種主要根據`特徵`判斷的哲學，可以提供強大的靈活性，實現運行時的`多型(polymorphism)`。

![黃色小鴨游高雄](https://lh4.googleusercontent.com/1HfzXVrD9TYsd3WCtrcTX0g47T7rgYtQwMAi37v5M0rFdXbmtIQW5lgjVEgYg61LZQoIEKyy0KzR0ncdBtlclIO-ldapKUkhPNgBv9tnSnwMcT8XjYeczypMc236Gkhxgjm-slua)

> If it walks like a duck and quacks like a duck, it must be a duck.

# 什麼是型別 (Typing)

大家應該都同意在這個世界上，`資源有限，慾望無窮`，如何將電腦的資源(位元組)做有效的利用，是良好程式設計師的功課。指定型別（指定ㄧ種資料型態給一組有用的位元資料），就是一種規劃資源的概念，

回首過去30天來，我們在鐵人賽第一天Day1的參賽宣言，在Ruby世界裡，幾乎萬物都為物件(Object)。產生物件的過程，需要將某個`型別`(Type)`實體化`（instantize）。

記得我們當初將`實體化`的例子比喻為`生小孩`的過程！而像[Day11](https://ithelp.ithome.com.tw/articles/10201484) `Ruby 的 block, proc, lamdba方法比較`，其中`lambda`就是由`Proc`建立的實體。

# 動態型別 vs 靜態型別

寫了30天的Ruby經典面試題鐵人賽，用各種例子舉下來，我們都可以體會到Ruby就是一種靈活到不行的動態型別語言，`Python`也是另一種很popular的動態型別語言。動態型別語言要在運行時，才對型別做判斷（是不是合法的）。

相較之下，靜態型別語言(Statically Typed Language)如`c`, `c++`, `c##`, `Java`，在使用變數之前就必須宣告資料型別，因此類型結構較為嚴謹，方法方便調用，但缺點是可讀性沒有動態語言清晰明瞭。`靜態型別語言`在`編譯(compile)`階段，就會先進行型別判斷，如果想達到多型的效果，就需要使用`繼承`或`介面(interface)`這種`抽象型別(Abstract type)`。

超級比一比 | 靜態型別語言 | 動態型別語言
------------- | -------------| -------------
程式語言 |`c++`, `bjective-C`, `Java`... | `Ruby`, `Python`, `Javascript`...
何時宣告 |在使用變數之前就必須宣告資料型別，讓變數具有資料儲存型別。 | 不需事先宣告變數的資料型別，就可以直接指定值
型別檢查(type check) |在`編譯(compile)`階段，就會先進行型別判斷 | 執行時判斷，一行行地將程式碼動態地`直譯(interpret)`為機器碼執行，速度較慢。
多型(polymorphism) |`繼承`或`介面(interface)`的`抽象型別(Abstract type)`| 動態。

まつもとゆきひろ(Matz先生)認為，`型別資訊`與`程式執行的本質`無關。而且在某些情況下，先設定好的型別也會造成制約。

（以上圖例子來說，多了型別資訊的Java，不屬於演算法本身的程式碼占了行數更多呢！）

# 鴨子測試（Duck Test）

Ruby在意的不是物件的身份是什麼，而在於他能不能做什麼。
是不是鴨子，可以(是否滿足`is-a關係`)可以使用所謂的鴨子測試（Duck Test）進行判斷。

```ruby
class MarathonRunner
  def initialize
  end

  def run  #same method name
    puts "I love long-distance running!"
  end
end

class Ironman
  def initialize
  end

  def run #same method name
    puts "I love running!"
  end
  def swim
    puts "I love swimming!"
  end

  def ride
    puts "I love cycling!"
  end  
end
```

我們在Ruby程式碼宣告了`Marathon Runner`,`Ironman`兩個類別，`Marathon Runner`和`Ironman`都有`run`方法，（馬拉松選手和鐵人三項選手都要跑步），但這兩個類別並非繼承關係。

現在來建立第3個類別：`Winner`，並且創造一個`ITironman`方法，代入`name`參數，恭喜任何完成第30天IT邦鐵人賽挑戰選手們的成就！

```ruby
class Winner
  def initialize
  end
  
  def ITironman name
    name.run
  end
end

ting = MarathonRunner.new
bater = Ironman.new
winner = Winner.new

winner.ITironman(ting)
winner.ITironman(bater)
```

Output:

```ruby
vlan-2644-10-19-108-246:Ironman tingtinghsu$ ruby duck.rb
I love long-distance running!
I love running!
```

鐵人賽就像是一場對`自己承諾想要進步更多`的長跑，恭喜完賽的鐵人們！

# 完賽感言

第30篇的面試經典題目選擇`鴨子型別`還蠻有意義的！我們在學習一項新的技能（例如`學習新的程式語言`），就像挑選用具、出門旅行一樣，必須選擇適合自己任務的工具，並知道自己為什麼做出這樣的選擇(Know your `WHY`)。如果以解決問題的角度來說，選擇的工具是什麼材質做的，可能並不是最重要的。

整個10月份是我非常忙碌的月份（工作、完成國際講師課程認證、旅行、42Ｋ馬拉松完賽、潛水，參加英文演講比賽、去當其他英文演講比賽的評審），但我還是完成了IT鐵人賽！而且所寫的東西我以前完全不熟悉的`Ruby`。（鐵人賽前5天時有一種：`我常常看不懂自己在寫什麼`的感覺XDDD）

不過，再怎麼忙，每天都還是平均抽空3小時寫文章，而且為了應付忙碌的生活，我提前準備，事先計劃做的十分充足（甚至用spreadsheet和trello專案管理鐵人賽），總總投入心血，值得驕傲！

鐵人賽的完成並不是結束，而是個開始～。接下來我有三個計畫：

1. 把鐵人賽文章修飾完成，改成英文版，放在我的個人blog。

2. 所有Ruby程式碼整理後放到Github。

3. 在IT邦寫一個新的系列`Rails經典面試題目30題`

在寫完這篇的三天後，我也要搬到有Matz先生的國度`Japan`去，繼續讓Ruby on Rails豐富我下一段的旅程！

> 我相信，只要是真心想完成一個目標，沒有事情是可以阻攔的！

Ref:

* [松本行弘談程式世界的未來(電子書)](https://books.google.com.au/books?id=uYvpBgAAQBAJ&pg=PA109&lpg=PA109&dq=ruby+鴨子型別)
* [【演講稿】Understanding Typing. Understanding Ruby.](http://www.codedata.com.tw/social-coding/understanding-typing-understanding-ruby/)
* [Ruby語言的Duck Typing](http://reader.roodo.com/sholfen/archives/8667217.html)
* [強弱類型、動靜態類型語言嚴格定義](https://hk.saowen.com/a/68faaaa3a965bf21a6bd715fd4f6e41a14a9279d2c22e1854e4732b183909673)
* [程式語言的特性本質（一）－靜態語言與動態語言的信任抉擇](https://www.ithome.com.tw/node/73445)
* [思考物件導向(1)物件導向與封裝](https://www.ithome.com.tw/node/45903)
* [編譯語言 VS 直譯語言](https://medium.com/@totoroLiu/%E7%B7%A8%E8%AD%AF%E8%AA%9E%E8%A8%80-vs-%E7%9B%B4%E8%AD%AF%E8%AA%9E%E8%A8%80-5f34e6bae051)

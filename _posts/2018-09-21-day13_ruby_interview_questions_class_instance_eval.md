---
title:  "Ruby面試精選30題 - Day13 instance_eval 和 class_eval 的差別 "
preview: "Ruby interview question: What's the difference between instance_eval and class_eval?"
permalink: "/articles/2018-09-21-day13_ruby_interview_questions_class_instance_eval"
date:   2018-09-21 08:15:00
layout: post
tags: 
  - "interview"
comments: true
---

第13天! 昨天談到了class variable, class instance variable和instance variable，也發現在實務上，類別實體變數和實體變數才是主流。今天我們要多談兩個跟前一篇的變數有關的方法:`instance_eval`和`class_eval`。讓每天都主題都環環相扣。
<!-- more -->

---

重點摘要:
* abstact
{:toc}

---

# Ruby經典面試題目 #13

`instance_eval 和 class_eval 的差別 ? What's the difference between instance_eval and class_eval?`

由過去幾天的寫作經驗，我發現一篇文章的開頭最難下筆、也是最重要的，舉例🌰能讓自己懂（~~還有讓我的讀者、觀眾、加油群啦啦隊懂~~）更不是容易的事。此篇文章由實體變數開始會能夠循序漸進，所以就從`instance_eval`切入吧！

## instance_eval

昨天文章提到一個重要概念：能夠讀取變數的屬性是非常重要的，讓我們可以更方便的讀取名稱相同，但其實值不同的物件。

讓我們把昨天的`attr_accessor`概念引入，馬上來寫程式碼實驗`instance_eval`：

### instance_eval案例1 :attr_accessor

```ruby
class RunMarathon
 attr_accessor :km
end

hm = RunMarathon.new
hm.km = 21

fm = RunMarathon.new
fm.km = 42

p hm
p fm
p hm.km
p fm.km

p hm.instance_eval { @km } # 21 和hm.km的結果相同
p fm.instance_eval { @km } # 42 和fm.km的結果相同

p RunMarathon.instance_methods(false) #[:km=, :km]
```

我們創了`RunMarathon`類別，new出兩個物件`hm`半程馬拉松和`fm`全程馬拉松並各自指定對應的`km`公里數值。這裡用到兩個`instance_methods`實體方法`km=`(寫入值)和`km`(讀出值)。再用`.instance_eval`顯示值。結果印出：

```ruby
#<RunMarathon:0x000055f60ed4f0d0 @km=21>
#<RunMarathon:0x000055f60ed4f0a8 @km=42>
21
42
21
42
[:km=, :km]
```

很好！成功用`instance_eval`印出值了！

### instance_eval案例2: 只用initialize()方法

如果我們把程式碼改為在`RunMarathon`類別加入`initialize()`方法，讓我們在new出物件的同時傳入公里數，程式碼變成如下：

```ruby
class RunMarathon
  def initialize(km)
    @km = km
  end

  def km
    @km
  end  
end

hm = RunMarathon.new(21)
fm = RunMarathon.new(42)

p hm
p fm
p hm.km
p fm.km

p hm.instance_eval { @km } # 21 和hm.km的結果相同
p fm.instance_eval { @km } # 42 和fm.km的結果相同

p RunMarathon.instance_methods(false) #[:km]
```

我們可以從`.instance_methods`看到方法只剩下讀取`:km`，另一個實體方法`k=`已經不見了：

```ruby
#<RunMarathon:0x000055c2a0e3eac8 @km=21>
#<RunMarathon:0x000055c2a0e3eaa0 @km=42>
21
42
[:km]
```

以上觀念是把昨天+今天的一起整合複習。

### instance_eval案例3: 只用initialize()方法，但將`def km`方法刪除  

如果，我們把`RunMarathon`class的定義公里變數方法:

```ruby
def km
    @km
end  
```  

移除，會發生什麼事呢？

（我想你應該猜到了，跟`hm.km`和`hm.fm`有關：）

```ruby
class RunMarathon
  def initialize(km)
    @km = km
  end
end

hm = RunMarathon.new(21)
fm = RunMarathon.new(42)

p hm
p fm
#p hm.km #undefined method `km' (NoMethodError)
#p fm.km #undefined method `km' (NoMethodError)

p hm.instance_eval { @km }
p fm.instance_eval { @km }

p RunMarathon.instance_methods(false) #[]
```

沒有方法了。`hm.km`和`hm.fm`找不到方法(NoMethodError)。我們用註解`#`消去無用的這兩行。

然而`.instance_eval`如往常一樣堅守崗位幫我們印出值。
而`.instance_methods`的印出結果顯示出，此時我們並沒有用到任何的實體方法。

```ruby
#<RunMarathon:0x000055cb6e5142f0 @km=21>
#<RunMarathon:0x000055cb6e5142c8 @km=42>
21
42
[]
```

為了更近一步了解，我去[Ruby-doc.org](http://ruby-doc.org/core-2.5.1/Module.html#method-i-class_eval)查到這段話：

> `instance_eval` evaluates a string containing Ruby source code, or the given block, within the context of the receiver (obj). In order to set the context, the variable self is set to obj while the code is executing, giving the code access to obj's instance variables and private methods. [出處](http://ruby-doc.org/core-2.5.1/BasicObject.html#method-i-instance_eval)


我發現`instance_eval`用來定義於任何的object(包含class，因為類別也是一種物件)，還可以存取到私有方法`private method`！立馬來寫code研究一下。

話說在我心深處藏了一個人生願望：跑超級馬拉松(ultramarathon，公里數超過50以上的馬拉松)，因此我決定把這個內心秘密放在`private method`裡：

```ruby
class RunMarathon
  def initialize(km)
    @km = km
  end

  private
  def my_resolution
  "I'm going to run ultrathon #{@km} in the future!"
  end
end

um = RunMarathon.new(100)
p um
p um.instance_eval { @km }
p um.instance_eval { my_resolution }
```

結果顯示為：

```ruby
#<RunMarathon:0x0000564cf8966b58 @km=100>
100
"I'm going to run ultrathon 100 in the future!"
```

利用`.instance_eval{private method}`探尋內心深處，好熱血的人生宣言啊～

## class_eval

如果我們想要提取值很多次，又不想一直重複寫這樣的程式碼：

```ruby
p hm.instance_eval { @km } #告訴我半馬公里數！
p fm.instance_eval { @km } #告訴我全馬公里數！
p um.instance_eval { @km } #告訴我超馬公里數！

```

我們可以加入`class_eval`:

```ruby
class RunMarathon
  def initialize(km)
    @km = km
  end
end

RunMarathon.class_eval do #放RunMarathon類別的外面！定義新的類別方法
  def km
    @km #這個是類別實體變數唷！
  end
end

hm = RunMarathon.new(21)
fm = RunMarathon.new(42)

p hm
p fm
p hm.km #21 與hm.instance_eval {@km} 值相同
p fm.km #42 與fm.instance_eval {@km} 值相同


p RunMarathon.instance_methods(false) #[:km]
```

程式碼運行如下：

```ruby
#<RunMarathon:0x00005619eeb8ec88 @km=21>
#<RunMarathon:0x00005619eeb8ec60 @km=42>
21
42
[:km]
```

瞧！是不是跟[`instance_eval案例2: 只用initialize()方法`]這裡所舉的例子一。模。一。樣！

為什麼

```ruby
class RunMarathon
  def initialize(km)
    @km = km
  end
end

RunMarathon.class_eval do #放外面！定義類別方法
  def km
    @km #這個是類別實體變數唷！
  end
end

```

和

```ruby
class RunMarathon
  def initialize(km)
    @km = km
  end

  def km
    @km
  end  
end
```

會出現相同的結果呢？

我在[史丹佛大學CS142課程](http://web.stanford.edu/~ouster/cgi-bin/cs142-winter15/classEval.php)這篇教材找到解答:

> class_eval is equivalent to typing the code inside a class statement.

```ruby
MyClass.class_eval do
  def num
    @num
  end
end
```

等於

```ruby
class MyClass
  def num
    @num
  end
end
```

所以回到今天最一開頭的舉例 [instance_eval案例1:案例2:案例3]，透過移除部分的程式碼做實驗，從instance_eval，串到class_eval，再串回到instance_eval，好像又回到初衷、豁然開朗的感覺呢！

我也領悟到了，其實程式寫法都可以換來換去，重點是，你想實現的功能是什麼？不同的寫法之間又有什麼優缺點比較？像在[這篇](https://blog.hothero.org/2015/08/05/instance-eval-yu--class-eval-chai-yi-/)提到：class_eval概念，跟module_eval是類似的，拿來用作擴充rails gem 所定義的 class，這也許可以當我第20天候鐵人賽的文章素材idea!

最後，來複習一下昨天的變數比一比！剛好在今天的例子`class_eval`、`instance_eval`，類別實體變數和實體變數都有派上用場：）

類別實體變數 class instance variable  | 實體變數 instance variable
------------- | -------------
@類別實體變數 | @實體變數
可用attr_accessor的方式改寫 | 可用attr_accessor的方式改寫
用在類別方法，不可用在實體方法 | 用在實體方法

也許這就是一種「過去每天累積的努力，成就現在的自己」最佳的例子吧！

===

Ref：

* [Ruby on Rails Interview questions](https://coderwall.com/p/yycytw/ruby-on-rails-interview-questions)
* [instance_eval 與 class_eval 差異](https://blog.hothero.org/2015/08/05/instance-eval-yu--class-eval-chai-yi-/)
* [Understanding class_eval and instance_eval](http://web.stanford.edu/~ouster/cgi-bin/cs142-winter15/classEval.php)
* [Ruby-doc.org : class_eval (Module)](http://ruby-doc.org/core-2.5.1/Module.html#method-i-class_eval)
* [Ruby-doc.org : instance_eval (BasicObject)](http://ruby-doc.org/core-2.5.1/BasicObject.html#method-i-instance_eval)

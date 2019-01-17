---
title:  "使用實體變數instance variable增進rails效能"
preview: "Improve performance of the database in rails by using instance variable"
permalink: "/articles/2019-01-17-rails_instance_variable_performance"
date:   2019-01-17 12:55:00
layout: post
tags:
  - "rails"
comments: true
---

我們曾經在[Ruby面試精選30題 - Day12 千變萬化的變數: class variable, class instance variable 與 instance variable](https://tingtinghsu.github.io/blog/articles/2018-09-20-day12_ruby_interview_questions_class_instance_variable)討論過實體變數，可用在實體方法`instance method`，今天要探討instance variable在rails裡增進效能。

<!-- more -->

---
重點摘要:
* abstact
{:toc}

---

# A. 增進效能前，查詢的記憶體位置一直改變

我們在`application.rb`寫一個class method可查詢登入的目前user:

`application.rb`:

```ruby
class ApplicationController < ActionController
  def current_user
    User.find(session[:user_id])
  end
end
```

這個基本的類別方法想必大家都很熟悉，我也曾在[Ruby面試精選30題 - Day04 玩弄Ruby的方法:instance method與class method](https://tingtinghsu.github.io/blog/articles/2018-09-13-day04_ruby_interview_questions_instance_class_method#%E9%A1%9E%E5%88%A5%E6%96%B9%E6%B3%95class-method)這篇文章中舉例各自的差別。**類別方法的接收者就是類別本身**。（相較於類別方法，需要在類別外再new新物件的當變數接收者的是`實體方法`。）

這時候去`script/console`查詢Database中，User的id屬性為1的單筆資料 (`:user_id`:`symbol`符號)。儘管我們送出的程式碼都是`User.find`，但傳回的User記憶體位置不斷改變。

`script/console`

```bash
 >> User.find(1)
 => #<User:0x335c624 @attributes=("name" => "Ting", "id" => "1")>
 >> User.find(1)
 => #<User:0x335a900 @attributes=("name" => "Ting", "id" => "1")>
 >> User.find(1)
 => #<User:0x335b350 @attributes=("name" => "Ting", "id" => "1")>
```


而在`Development log`內，相同的指令查詢跑了3次，造成效能低落。

`Development log`

```bash
  Processing ProjectsController#index (for 127.0.0.1 at 2019-01-17)
    Session ID: eb5d28exxxxx
    Parameters: {"action"=> "index", "controller"=>"projects"}
    Project Load (0.000259) SELECT * FROM projects
  Rendering projects/index
  Completed in 0.00619 (161 reqs/sec) | Rendering: 0.00071 (11%) | DB: 0.00026 (4%) | 200 OK [http://localhost/projects/]

  SQL (0.000134) SET SQL_AUTO_IS_NULL=0
  User_Columns (0.001251) SHOW FIELDS FROM users
  User Load (0.000346) SELECT * FROM users WHERE (users.id = 1)
  User Load (0.000293) SELECT * FROM users WHERE (users.id = 1)
  User Load (0.000314) SELECT * FROM users WHERE (users.id = 1)
```

# B. 使用instance variable與or-equals指定運算式增進效能

還記得`a ||= b`嗎？ 如果a尚未初始化/或為空值nil/或為false，a等於b； 其他情況下，a值不變。(請參考：[Ruby面試精選30題 - Day09 Ruby的 or-equals 是什麼意思呢?](https://tingtinghsu.github.io/blog/articles/2018-09-17-day09_ruby_interview_questions_ruby_idiom_or_equals))

我們將  
`User.find(session[:user_id])`
改寫為  
`@current_user ||= User.find(session[:user_id])`

代表若`User.find(session[:user_id])`可以查詢到資料（非空值），則指定給`@current_user`實體變數，讓記憶體位置可以維持固定不變。

`application.rb`:

```ruby
class ApplicationController < ActionController
  def current_user
    @current_user ||= User.find(session[:user_id])
  end
end
```

```bash
>> @current_user ||= User.find(1) #@current_user第一次尚未初始化，因此在資料庫內查詢
=> #<User:0x335a890 @attributes=("name" => "Ting", "id" => "1")>
>> @current_user ||= User.find(1) #@current_user已非空值，傳回instance variable屬性，記憶體位置相同。
=> #<User:0x335a890 @attributes=("name" => "Ting", "id" => "1")>

```

`Development log`

```bash
  SQL (0.000134) SET SQL_AUTO_IS_NULL=0
  User_Columns (0.001251) SHOW FIELDS FROM users
  User Load (0.000346) SELECT * FROM users WHERE (users.id = 1)
  # 僅需查詢一次
```

總結

剛開始熟悉的rails的應用，就綜合了三篇在2018年寫的Ruby面試文章，真一次有趣的複習，也代表以前做過的努力，都不會白費呢！

Ref:

* [Ruby面試精選30題 - Day04 玩弄Ruby的方法:instance method與class method](https://tingtinghsu.github.io/blog/articles/2018-09-13-day04_ruby_interview_questions_instance_class_method#%E9%A1%9E%E5%88%A5%E6%96%B9%E6%B3%95class-method)

* [Ruby面試精選30題 - Day09 Ruby的 or-equals 是什麼意思呢?](https://tingtinghsu.github.io/blog/articles/2018-09-17-day09_ruby_interview_questions_ruby_idiom_or_equals)

* [Ruby面試精選30題 - Day12 千變萬化的變數: class variable, class instance variable 與 instance variable](https://tingtinghsu.github.io/blog/articles/2018-09-20-day12_ruby_interview_questions_class_instance_variable)

* [Caching with Instance Variables](http://railscasts.com/episodes/1-caching-with-instance-variables)


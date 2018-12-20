---
layout: post
title:  "Ruby面試精選30題 - Day26 Ruby的錯誤處理機制 Rescue"
date:   2018-10-25 12:58:00
categories: interview
---

有一句話說得好，「不怕一萬，只怕萬一」，如何檢查程式上的錯誤是一件重要的議題。好的工程師會懂得防範於未來。現在我們就來用Ruby練習一下錯誤與例外處理吧！
<!-- more -->

---

# Ruby經典面試題目 #26

`Day26 Ruby的錯誤處理機制 Rescue. Explain Error Handling in Ruby.`

Ruby能以區隔的 (compartmentalized) 方式處理錯誤及例外的程式碼區塊，基本架構：

* `begin`到`rescue`這段區間是程式可能會出錯的地方。

* `rescue`到`end`是我們對於錯誤真正發生時的反應措施。

```ruby
begin
  error #something happens!
rescue
  puts 'ERROR! Rescue me!' #=> ERROR! Rescue me!
end
```

# 舉例

我們從小學的時候就學過，0不能當分母(denominator)。身為工程師，我們預期會有User不小心（或是故意）輸入了0在分母，因此在`rescue`段落，將0用全域變數`$!`把**最新的錯誤訊息**傳進來，並提醒使用者再輸入一次分母：

```ruby
begin
    print "Enter numerator: "
    num = Integer(gets)
    print "Enter denominator: "
    den = Integer(gets)
    rate = num / den
    puts rate
  
rescue
    print $!
    puts
    print "Enter denominator other than 0:"
    den = Integer(gets)  
    rate = num / den
    puts rate
end  
```

程式運行過程如下：

```ruby
Enter numerator: 5
Enter denominator: 0
divided by 0
Enter denominator other than 0: 1
5
```

[第25天]在看rails文件的`.exists`方法是怎麼被刻出來的時候，發現了`rescue...end`：

```ruby
# File activeresource/lib/active_resource/base.rb, line 869
def exists?(id, options = {})
  if id
    prefix_options, query_options = split_options(options[:params])
    path = element_path(id, prefix_options, query_options)
    response = connection.head(path, headers)
    response.code.to_i == 200
  end
  # id && !find_single(id, options).nil? id存在且不為空
rescue ActiveResource::ResourceNotFound, ActiveResource::ResourceGone
  false
end
```

現在總算看得懂了！

Ref:

* [Ruby Interview Questions](https://gist.github.com/kjvarga/ae0d9b3365122b1c2c74b9dd6a7d5226)
* [Exception](http://ruby-doc.org/core-2.5.1/Exception.html)
* [Exceptions, Catch, and Throw](https://ruby-doc.com/docs/ProgrammingRuby/html/tut_exceptions.html)
* [Exception Handling](https://www.studytonight.com/ruby/exception-handling-in-ruby)
* [錯誤處理（ error handling ）](http://railsfun.tw/t/topic/59)
* [[Ruby] Error Handling（錯誤處理）](https://pjchender.github.io/2018/06/05/ruby-error-handling%EF%BC%88%E9%8C%AF%E8%AA%A4%E8%99%95%E7%90%86%EF%BC%89/)
* [Rails的錯誤處理機制begin、rescue和Exception](https://medium.com/@pk60905/rails%E7%9A%84%E9%8C%AF%E8%AA%A4%E8%99%95%E7%90%86%E6%A9%9F%E5%88%B6begin-rescue%E5%92%8Cexception-ab71156a24a2)
* [例外處理：救援 Exception processing: rescue](https://guides.ruby.tw/ruby/rescue.html)
* [Rails每周一題(十二)：ruby的異常機制](http://rails-weekly.group.iteye.com/group/wiki/1821-rails-questions-weekly-12-ruby-exception-mechanism)
* [Ruby 異常處理最佳實踐](https://ruby-china.org/topics/29104)
* [全域變數 Global variables](https://guides.ruby.tw/ruby/globalvars.html)

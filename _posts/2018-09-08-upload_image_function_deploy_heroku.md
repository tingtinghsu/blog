---
layout: post
title:  "[RubyGems] carrierwave (3) Deploy 圖片上傳功能到 Heroku網站"
preview: "Deploy image-uploading function on Heroku server"
permalink: "/articles/2018-09-08-upload_image_function_deploy_heroku"
date: 2018-09-08 10:31:00

layout: post
tags: 
  - "rubygem"
  - "heroku"
---

身為Ruby新手村民，創造穩定且持續的學習步調很重要，我用的方法就是一週寫三篇筆記，希望藉由寫筆記將遇到的bug記錄下來的過程，能幫助到未來想用Ruby on Rails架站的新手。：）

<!-- more -->

重點摘要:
* abstact
{:toc}

話說我在這一天[[Ting's筆記Day4] 將Ruby on Rails專案部署到Heroku](https://ithelp.ithome.com.tw/articles/10199014)架好了站，並在此篇[[Ting's筆記Day7] 活用套件carrierwave gem: (2) 利用Amazon S3架設圖片伺服器](https://ithelp.ithome.com.tw/articles/10199103/edit)完成我的餐廳資料庫網站的圖片上傳功能。接著就要把功能發佈到Heroku啦！

# 1. 修改`image_uploader.rb`

為了節省Amazon S3用量，（畢竟是免費功能，儲存空間一定的限制，能省則省！）
我想在本機專案上傳圖片時，照片存在本機端就好；
在Heroku（遠端production版本）上傳圖片的時候，再上傳至Amazon S3。

我可以去`app/uploaders/image_uploader.rb`修改一下程式碼從：

```ruby
storage :fog
```

改成

```ruby
  if Rails.env.production?
    storage :fog #Heroku, Use Amazon S3
  else
    storage :file
 end  
```

# 2. `figaro heroku:set -e production`

在[上篇文章](https://ithelp.ithome.com.tw/articles/10199103/edit)提到了Figaro幫我們隱藏`application.yml`檔，做好保護金鑰的功能，由於這個功能動到了config，~~這件事情的嚴重性(?)~~我們必須要讓Heroku知道！

跟隨著[Figaro的關於Deployment的說明檔](https://github.com/laserlemon/figaro#deployment)指示，把Figaro gem加入Heroku。在ternimal輸入`figaro heroku:set -e production`，程式就會把金鑰資訊傳給我在heroku的正式環境。

```bash
tingdeMacBook-Air:yelpdemo tingtinghsu$ figaro heroku:set -e production
Setting aws_access_key_id, aws_secret_access_key, fog_directory and restarting ⬢ tingsrailsdemo... done, v7
aws_access_key_id:     #秘密
aws_secret_access_key: #不告訴你
fog_directory:         #Amazon S3 bucket
```

# 3. `git push heroku master`

在[這篇文章](https://ithelp.ithome.com.tw/articles/10198964)裡我已經對於git使用的熟練熟練了：
    1.`git status`
    2.`git add .`
    3.`git commit -m "增加照片上傳功能"`
    4.`git push`
所以我們先把寫好的的功能加入github版控，要推上github，push上Heroku：，最後用`git push heroku master`完成最後一哩路！

```bash
tingdeMacBook-Air:yelpdemo tingtinghsu$ git push heroku master
Counting objects: 59, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (52/52), done.
Writing objects: 100% (59/59), 331.27 KiB | 0 bytes/s, done.
Total 59 (delta 33), reused 0 (delta 0)

remote: https://tingsrailsdemo.herokuapp.com/ deployed to Heroku
remote:
remote: Verifying deploy... done.
To https://git.heroku.com/tingsrailsdemo.git
   cb86240..05af5ff  master -> master
```

到Heroku後台查看，新功能已經部署成功~
  
![https://ithelp.ithome.com.tw/upload/images/20180908/20111177wWtUHRU8Sz.png](https://ithelp.ithome.com.tw/upload/images/20180908/20111177wWtUHRU8Sz.png)

# 4. `heroku run rake db:migrate`

我們當初改完上傳功能時，已經在本地端使用`rake db:migrate`讓資料庫順利運行，[詳見[Ting's筆記Day6] 活用套件carrierwave gem: (1)在Rails實現圖片上傳功能](https://ithelp.ithome.com.tw/articles/10199035)
但遠端的Heroku部分還沒呢！
因此記得把新更動過的的餐廳圖片資料庫欄位加入Heroku：`heroku run rake db:migrate` 更新Production版本的資料庫。
  
![https://ithelp.ithome.com.tw/upload/images/20180907/20111177VdzU63RJQw.png](https://ithelp.ithome.com.tw/upload/images/20180907/20111177VdzU63RJQw.png)  

這裡Heroku出現錯誤訊息`Etimeout: connect etimeout 50.19.103.36:5000`
[參考這裡的解法](https://github.com/heroku/heroku-repo/issues/51)，才發現我的wifi所在地的防火牆鎖port 5000。

我使用`run:detached`這個指令來解決此問題：`heroku run:detached rake db:migrate`

```bash
tingdeMacBook-Air:yelpdemo tingtinghsu$ heroku run:detached rake db:migrate
Running rake db:migrate on ⬢ tingsrailsdemo... done, run.2219 (Free)
Run heroku logs --app tingsrailsdemo --dyno run.2219 to view the output.
```

= 大功告成 =

試試網站上的上傳功能，圖片順利存進Amazon S3 :)
  
![https://ithelp.ithome.com.tw/upload/images/20180908/20111177zR1v7NGgyF.png](https://ithelp.ithome.com.tw/upload/images/20180908/20111177zR1v7NGgyF.png)

`carrierwave`全系列文章:  

[活用套件carrierwave gem: (1)在Rails實現圖片上傳功能](https://ithelp.ithome.com.tw/articles/10199035)  
[活用套件carrierwave gem: (2)利用Amazon S3架設圖片伺服器](https://ithelp.ithome.com.tw/articles/10199103)  
[將Ruby on Rails專案部署到Heroku](https://ithelp.ithome.com.tw/articles/10199014)  
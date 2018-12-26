---
title:  "[RubyGems] Carrierwave (4) 使用Imagemagick修改圖片大小"
preview: "Resize image by using imagemagick and minimagick"
permalink: "/articles/2018-09-09-crrierwave_gem_resize_image_imagemagick_and_minimagick"
date:   2018-09-09 09:34:00

layout: post
tags: 
  - "rubygem"
---

這幾天我都在實驗[Carrierwave](https://github.com/carrierwaveuploader)這套圖片上傳套件，也順利部署到Heroku架站正式環境了。：）

接下來我遇到了新的問題：要如何在上傳的時候，讓Carrierwave gem大型size圖片縮成固定大小，讓整體頁面看起來比較美觀呢？

<!-- more -->

解法很簡單！看了[Carrierwave]((https://github.com/carrierwaveuploader/carrierwave#adding-versions))關於`image resizing`的說明，只要安裝[imagemagick](http://cactuslab.com/imagemagick/)和
[minimagick](https://github.com/minimagick/minimagick)就行了。

> [注意!] 文中提到 You must have Imagemagick and MiniMagick installed to do image resizing. MiniMagick is a Ruby interface for Imagemagick which is a C program. This is why MiniMagick fails on 'bundle install' without Imagemagick installed.所以我們的順序是：先裝imagemagick，再裝MiniMagick。

重點摘要:
* abstact
{:toc}

# A. imagemagick

1. 首先去[imagemagick](http://cactuslab.com/imagemagick/)官網下載適合你作業系統的imagemagick版本。

在terminal輸入指令 `convert`可以幫我們確定是否有安裝成功，以及目前安裝版本。我的是`ImageMagick 6.9.1-0`

```bash
tingdeMacBook-Air:yelpdemo tingtinghsu$ convert
Version: ImageMagick 6.9.1-0 Q16 x86_64 2015-03-22 http://www.imagemagick.org
Copyright: Copyright (C) 1999-2015 ImageMagick Studio LLC
License: http://www.imagemagick.org/script/license.php
```

1. 安裝好之後，還要跑`brew install imagemagick`。

（不然就會像我一樣，測試上傳功能功能時出現錯誤訊息！）
  
![https://ithelp.ithome.com.tw/upload/images/20180909/20111177vNOiNwaitw.png](https://ithelp.ithome.com.tw/upload/images/20180909/20111177vNOiNwaitw.png)

[參考這篇stackoverflow解法](https://stackoverflow.com/questions/31193495/error-original-error-imagemagick-graphicsmagick-is-not-installed)~~果然身為新手的好處是我遇到的bug都還有人提問過~~

裡面說明，安裝`libmagickwand-dev`後才能跑`rmagick gem`的功能。

> 注意，在Mac環境，下brew指令前需要安裝Homebrew，更多說明可以參考[之前的文章](https://ithelp.ithome.com.tw/articles/10199014)

# B. minimagick gem

接下來到[minimagick](https://github.com/minimagick/minimagick)的Github頁面，

1.還記得我們的Gem三步驟：

Step1. 修改Gemfile加入新的gem；

```ruby
gem "mini_magick"
```

Step2. 跑`bundle install`；

```bash
tingdeMacBook-Air:yelpdemo tingtinghsu$ bundle install
```

Step3. 重啟伺服器`rails s`。

2.指令`bundle info`可幫我們確定版本。目前我的是mini_magick (4.8.0)

```bash
tingdeMacBook-Air:yelpdemo tingtinghsu$ bundle info mini_magick
  * mini_magick (4.8.0)
    Summary: Manipulate images with minimal use of memory via ImageMagick / GraphicsMagick
    Homepage: https://github.com/minimagick/minimagick
    Path: /Users/tingtinghsu/.rvm/gems/ruby-2.4.2/gems/mini_magick-4.8.0
```

# C. 修改`image_uploader.rb`

接下來就是讓Carrierwave下的MiniMagick開始工作了！
到`專案名/app/uploaders/image_uploader.rb`開始修改程式碼：

```ruby
class ImageUploader < CarrierWave::Uploader::Base
 include CarrierWave::MiniMagick #將註解消掉
 process resize_to_fit: [200, 300] #在這裡的`resize_to_fit`是Carrierwave的其中一個方法
end
```

[更多關於CarrieWave的Method列表](https://www.rubydoc.info/github/jnicklas/carrierwave/CarrierWave%2FMiniMagick:resize_to_fit)

在本機試一下功能是否成功：
![https://ithelp.ithome.com.tw/upload/images/20180909/20111177yC3uCRNnFa.png](https://ithelp.ithome.com.tw/upload/images/20180909/20111177yC3uCRNnFa.png)

圖片總算如我所願縮小了！最後一步就是：`git push heroku master`把新功能deploy至正式環境。

跟carrierwave套件相處了兩週～就先到這裡啦！接下來會繼續研究更多實用的套件。：）
-全系列完-

系列文章：
[將Ruby on Rails專案部署到Heroku](https://ithelp.ithome.com.tw/articles/10199014) |
[活用套件carrierwave gem: (1)在Rails實現圖片上傳功能](https://ithelp.ithome.com.tw/articles/10199035) |
[活用套件carrierwave gem: (2)利用Amazon S3架設圖片伺服器](https://ithelp.ithome.com.tw/articles/10199103) |
[活用套件carrierwave gem: (3)Deploy圖片上傳功能到Heroku網站](https://ithelp.ithome.com.tw/articles/10199035) |
[活用套件carrierwave gem: (4)使用Imagemagick修改圖片大小](https://ithelp.ithome.com.tw/articles/10199131)

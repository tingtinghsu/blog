---
title:  "[RubyGems] carrierwave (2) 利用Amazon S3 架設圖片伺服器"
preview: "Using carrierwave gem to upload images on Amazon S3"
permalink: "/articles/2018-09-05-carrierwave_gem_upload_image_amazon_s3_ruby_on_rails"
date: 2018-09-05 10:31:00

layout: post
tags: 
  - "rubygem"
---

在我的上一篇文章[Ruby套件carrierwave gem: (上) 在Rails實現圖片上傳功能](https://ithelp.ithome.com.tw/articles/10199035) ，上傳圖片功能已經完成啦！但是目前圖片僅能上傳在自己的本地資料夾內孤芳自賞。

如果我們要把網站完整的功能部署到正式環境，讓其他網路使用者也可以一起上傳圖片，勢必需要一個圖片伺服器。

<!-- more -->

重點摘要:
* abstact
{:toc}

目前最主流的Image Host之一算是AWS(Amazon Web Service)裡的S3（Simple Storage Service）了。  
  
![https://ithelp.ithome.com.tw/upload/images/20180906/20111177pIw3qpeKPn.png](https://ithelp.ithome.com.tw/upload/images/20180906/20111177pIw3qpeKPn.png)

在這邊我們略過申請帳號的過程（需要綁信用卡號，但只要在一年內不超過特定用量就可免費。）
![https://ithelp.ithome.com.tw/upload/images/20180906/20111177Bo9jdxXMMd.png](https://ithelp.ithome.com.tw/upload/images/20180906/20111177Bo9jdxXMMd.png)

# A. 安裝Fog-AWS Gem與Figaro Gem

為了串接carrierwave上傳到Amazon S3的功能，我們回到carrierwave gem在Github的頁面[Using Amazon S3這個段落](https://github.com/carrierwaveuploader/carrierwave#using-amazon-s3)好好研究。它要我們在Gemfile裡新增`gem “fog-aws”`，然後在`carriewave/intializers`下，新增一個檔名稱叫做`carrierwave.rb`，。
以它提供的範例程式上寫的上來看：

```ruby
CarrierWave.configure do |config|
  config.fog_provider = 'fog/aws' #required
  config.fog_credentials = {
    provider:              'AWS', #required
    aws_access_key_id:     'xxx',
    #required unless using use_iam_profile
    aws_secret_access_key: 'yyy',
    #required unless using use_iam_profile
    use_iam_profile:       true,  #optional, defaults to false
    region: 'eu-west-1', #optional, defaults to 'us-east-1'
    host: 's3.example.com', #optional, defaults to nil
    endpoint: 'https://s3.example.com:8080' #optional, defaults to nil
  }
  config.fog_directory  = 'name_of_bucket'  #required
  config.fog_public     = false  #optional, defaults to true
```

> 從研讀程式碼的過程中，我們很容易發現到了裡面出現一個使用任何雲端上傳服務都會有的金鑰及安全性的問題！如何避免之後程式碼備份到Github上，Access Key被全世界的人看光光?

[解決方案]
這時候我們除了fog-aws，還要裝一個gem叫做[Figaro](https://github.com/laserlemon/figaro)以解決上述問題。Figaro會幫我們修改Rail的configuration檔，用環境變數`ENV`代替金鑰，並產生一個簡單的YAML檔。

> YAML是一種寫法優雅，適合表達、編輯資料結構與各種設定檔的格式（注意：大小寫和TAB鍵敏感！）。  Ref: [Wiki](https://zh.wikipedia.org/wiki/YAML)/[簡書](https://www.jianshu.com/p/97222440cd08)

現在我們馬上來安裝gem:

```ruby
gem 'figaro'
gem "fog-aws" #用雙引號，因為裡面有特殊字元"-"
```

然後在terminal跑`bundle install`，
再重啟伺服器`rails s`(安裝gem的三大步驟要牢記！)

這樣我們一次就裝好了`figaro`和`fog-aws`兩支gem。

接著，按照Figaro主頁README.md檔的指示，到terminal輸入`bundle exec figaro install`：

```bash
tingdeMacBook-Air:yelpdemo tingtinghsu$ bundle exec figaro install
      create  config/application.yml
      append  .gitignore
```

這時候專案就會在config資料夾下產生了新的yml檔：`config/application.yml`。

之後`git push`專案到git版控伺服器如github，figaro這支gem會用`.gitignore`隱藏好`application.yml`，幫助我們的私密資料無法被它人觀看。

新手如我在修改程式碼的時候，常常看到一些新名詞，例如剛剛的`fog-aws`，這時候去google一下定義，對於程式架構的理解是很有幫助的。我很好奇為何要用`fog`(霧?️？)這個名詞。[ITHome的這篇文章有提到:](https://www.ithome.com.tw/news/114625)原來fog（霧運算）是相對於cloud（雲端運算）。

> 邊緣運算是就近運算的概念，將運算更靠近資料源所在的本地區網（Local Network）內運算，盡可能不用將資料回傳雲端，以減少資料往返雲端的等待時間及降低網路頻寬成本。邊緣運算通常是在本地端和雲端兩邊交界的附近做運算處理，也就是資料進出區網附近的位置，這麼做的目的，在於既可以將運算環境放在本地，同時又可以靠近雲端邊界附近，藉此跟雲銜接。畢竟並不是全部的資料都能放在本地端運算，還是會有些需要更進一步分析及判斷的資料，

# B. 在Amazon S3建立新的bucket

Amazon S3的bucket（儲存桶）是類似雲端資料夾（~~~霧端資料夾?~~）的概念。新手推薦
初期接觸Amazon S3服務的板友們，我很建議去[這個lab](https://amazon.qwiklabs.com/focuses/278?locale=en&parent=catalog)按照教學操作，內容設計互動上還挺有趣的～
  
![https://ithelp.ithome.com.tw/upload/images/20180906/20111177Ku8YFYXtxw.png](https://ithelp.ithome.com.tw/upload/images/20180906/20111177Ku8YFYXtxw.png)

## 1. 進入Amazon S3 console，按下的`create bucket`建立bucket。
  
![https://ithelp.ithome.com.tw/upload/images/20180906/20111177E8adzs1Dt1.png](https://ithelp.ithome.com.tw/upload/images/20180906/20111177E8adzs1Dt1.png)
  
輸入Bucket Name和Region(區域)。注意（bucket是個物件，你的bucket name必須是個unique name和世界上其他人的bucket name都不一樣）然指定一個區域(region)，不同區域的bucket對於使用者的上傳下載速率有顯著影響。（原來如此！難怪後文出現了卡bug。）我選了我目前所在的城市Sydney。
  
![https://ithelp.ithome.com.tw/upload/images/20180906/20111177w18xFMYIQx.png](https://ithelp.ithome.com.tw/upload/images/20180906/20111177w18xFMYIQx.png)

在設定bucket的Permission頁面時，一開始對於新手來說，將bucket設定為public是較爲容易的學習做法。（如果我們的資料是極為隱密的，就千萬不能這樣做！）
  
![https://ithelp.ithome.com.tw/upload/images/20180906/20111177Kx01k6pnVV.png](https://ithelp.ithome.com.tw/upload/images/20180906/20111177Kx01k6pnVV.png)

## 2. 在bucket內按upload上傳一張圖片（或任何檔案），記下所在的host和region。
  
![https://ithelp.ithome.com.tw/upload/images/20180906/20111177eHHnii3B6D.png](https://ithelp.ithome.com.tw/upload/images/20180906/20111177eHHnii3B6D.png)

點開檔案，可以看到每個檔案都會有屬於自己的獨特網址。

![https://ithelp.ithome.com.tw/upload/images/20180906/20111177lvkAxBeeP8.png](https://ithelp.ithome.com.tw/upload/images/20180906/20111177lvkAxBeeP8.png)
  
`s3-ap-southeast-2.amazonaws.com/tingsrailsdemo/Eiffel.jpg`
從這行網址，就可以確認主機`s3-ap-southeast-2.amazonaws.com`，區域是`ap-southeast-2`，這兩者是我們修改`carrierwave.rb`所需要的參數。

```ruby
    host:"s3-ap-southeast-2.amazonaws.com",
    region: "ap-southeast-2"
```

## 3. 在Sercurity Credentials新增Access Key

在右上方點擊我們的帳戶，選單上會出現`Sercurity Credential`（安全憑證）。按下之後，視窗會提醒你接下來的步驟要小心謹慎，按下`Continue to Sercurity Credential`後出現以下畫面：

![https://ithelp.ithome.com.tw/upload/images/20180906/20111177ie0RveFbcU.png](https://ithelp.ithome.com.tw/upload/images/20180906/20111177ie0RveFbcU.png)

點選 `Create New Access Key`，然後`Download Key File`可以下載新建好的Access Key。
  
![https://ithelp.ithome.com.tw/upload/images/20180906/20111177cl6vWaB6ow.png](https://ithelp.ithome.com.tw/upload/images/20180906/20111177cl6vWaB6ow.png)

# C.到專案修改application.yml

我們用記事本打開熱騰騰剛打好的鑰匙Access Key！在剛剛figaro幫我們製作的`application.yml`，放入金鑰id和access key。

```ruby
pusher_app_id: '放我的id'
pusher_key: '放我的鑰匙'
pusher_secret: '放我的秘密路徑'
```

我們使用的是Amazon S3，所以前面三個pusher修改為：

```ruby
aws_access_key_id: '放我的剛剛建好的id'
aws_secret_access_key: '放我剛剛建好的key'
fog_directory: '我的Amazon S3 bucket名稱'
```

以此類推，如果你使用Google Cloud，就要換成Google Cloud的變數和相對應的key。YAML對於任何多的空格space或tab都是敏感的，所以輸入資料時要特別小心。

# D.新增`carrierwave.rb`，代換參數，重啟server

在`config/initializers/`路徑下，新增`carrierwave.rb`，將carrierwave提供給我們程式碼貼過去修改，代換剛才提到figaro幫我們做好的`ENV[]`環境變數：

```ruby
CarrierWave.configure do |config|
  config.fog_provider = 'fog/aws'                        # required
  config.fog_credentials = {
    provider:              'AWS',                        # required
    aws_access_key_id:     ENV["aws_access_key_id"],
    aws_secret_access_key: ENV["aws_secret_access_key"],
    host:                  "s3-ap-southeast-2.amazonaws.com",
    region:                "ap-southeast-2"
  }
  config.fog_directory  = ENV["fog_directory"]           # required
# optional, defaults to {}
end
```

這邊我們更動到了`config`檔案，記得要重啟伺服器`rails s`。

[Bug注意！]

```ruby
    host:   "s3-ap-southeast-2.amazonaws.com",
    region:                "ap-southeast-2"
```

這兩行要代換成你所選擇的Amazon aws伺服器主機區域，不然會產生問題！

  ![https://ithelp.ithome.com.tw/upload/images/20180906/20111177RzHA23ADLx.png](https://ithelp.ithome.com.tw/upload/images/20180906/20111177RzHA23ADLx.png)

後來我用關鍵字`Excon::Errors::SocketError Broken pipe (Errno::EPIPE)`參考了[這篇網誌](http://www.whatibroke.com/2013/04/27/exconerrorssocketerror-broken-pipe-errnoepipe-ruby-on-rails/)終於搞定！

跟Amazon S3相關功能的熟悉和隨之而來的bug讓我卡了兩天!  
這篇文章的得來不易啊...。

# E. 修改carriewave的`uploader.rb`

去`app/uploaders/image_uploader.rb`，把`storage :file`加上註解，消去`storage :fog`的註解，讓carriewave知道，現在我們要把圖片要上傳到Amazon S3去。

```ruby
class ImageUploader < CarrierWave::Uploader::Base
  # Choose what kind of storage to use for this uploader:
  # storage :file
  storage :fog #Use Amazon S3
  end  
    def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end
```

=大功告成！=  
試著用本機功能的上傳按鈕傳圖片，再點開圖片網址確認。
這張照片已經放入Amazon S3的bucket囉！

![https://ithelp.ithome.com.tw/upload/images/20180906/20111177J82YqrpNra.png](https://ithelp.ithome.com.tw/upload/images/20180906/20111177J82YqrpNra.png)

我很開心地修改3家餐廳的資料，去Amazon S3的bucket確認，圖片已經安安穩穩地躺在路徑`/upload/restaurant/image/餐廳id`裡了。
  
![https://ithelp.ithome.com.tw/upload/images/20180906/20111177pj9sTL6bkv.png](https://ithelp.ithome.com.tw/upload/images/20180906/20111177pj9sTL6bkv.png)

下一篇要講把上傳Amazon S3的新功能Deploy部署到Heroku上！  

我的Rails專案系列文章整理：

[[Ting's筆記Day6] 活用套件carrierwave gem: (1)在Rails實現圖片上傳功能](https://ithelp.ithome.com.tw/articles/10199035)
  
[[Ting's筆記Day5] 在部署到Heroku之前，將Rails專案從SQLite設定為PostgreSQL](https://ithelp.ithome.com.tw/articles/10199016)
  
[[Ting's筆記Day4] 將Ruby on Rails專案部署到Heroku](https://ithelp.ithome.com.tw/articles/10199014)

Ref:

[AWS活用術｜善用容量無上限的S3儲存服務](https://www.ithome.com.tw/tech/88760)
  
[Amazon S3 簡易儲存服務介紹與教學(1/3)](http://streamer-forest.com/amazon-s3-tutorial-p1.html)
---
title:  "使用RVM安裝Ruby和Rails新版本"
preview: "install Ruby and Rail new version using RVM"
permalink: "/articles/2019-01-24-rails_ruby_version_RVM"
date:   2019-01-24 10:55:00
layout: post
tags:
  - "rails"
  - "rubygem"  
comments: true
---

2019年度計畫就是要將Rails摸熟！本週練習[MVC相關語法]()時，遇到`rails g model`指令出現錯誤。研讀錯誤訊息後推測為ruby和rails版本需要更新。此篇將更新過程記錄下來供貓貓及網友們參考。

<!-- more -->

---
重點摘要:
* abstact
{:toc}

---

在更新版本之前，我的ruby版本為`ruby 2.4.2`，Rails為`Rails 5.1.4`。

2017年11月

```ruby
tingdeAir:~ tingtinghsu$ ruby -v
ruby 2.4.2p198 (2017-09-14 revision 59899) [x86_64-darwin17]
tingdeAir:~ tingtinghsu$ gem -v
2.6.14
tingdeAir:~ tingtinghsu$ rails -v
Rails 5.1.4
```

更新完後的時間2019年1月(MacOS版本 Mojave10.14.2)

```ruby
tingdeAir:~ tingtinghsu$ ruby -v
ruby 2.5.2p104 (2018-10-18 revision 65133) [x86_64-darwin18]
tingdeAir:~ tingtinghsu$ gem -v
2.7.6
tingdeAir:~ tingtinghsu$ rails -v
Rails 5.2.2
```

至於為何決定要更新呢？主要出現以下兩個問題：

# 問題1: `rails g model`出現錯誤訊息

無法使用rails指令產生Model的原因，可能是跟`git_proxy.rb`這個檔案有關。

```ruby
1. /Users/.rvm/gems/ruby-2.4.2/gems/bundler-1.16.4/lib/bundler/source/git/git_proxy.rb:235:in `allowed_in_path': The git source git://github.com/rails/rails.git is not yet checked out. Please run `bundle install` before trying to start your application (Bundler::GitError)
```

於是決定根據提示，使用`bundle install`。

# 問題2: `bundle install`無法安裝套件

當我在專案內使用`bundle install`指令時，又出現錯誤訊息如下：

```bash
Fetching git://github.com/rails/rails.git
Fetching gem metadata from http://rubygems.org/.........
Resolving dependencies...
activesupport-6.0.0.beta1 requires ruby version >= 2.5.0, which is incompatible with the current version, ruby
2.4.2p198
```

ruby2.4.2為當時的最大版本，但我的gem的`activesupport-6.0.0.beta1`需要`ruby version >= 2.5.0`。於是在下一步將使用RVM更新ruby。

# 安裝Ruby

## Step1. 列出目前已有版本 `rvm list known`

RVM的全稱是[Ruby enVironment(Version) Manager](https://kaochenlong.com/2011/11/16/rvm/)，意為Ruby版本管理，讓我們在主機裡裝上各版本的ruby，因為不同的專案可能會使用不同版本的ruby。

```ruby
tingdeAir:demo tingtinghsu$ rvm list known
# MRI Rubies
[ruby-]1.8.6[-p420]
[ruby-]1.8.7[-head] # security released on head
[ruby-]1.9.1[-p431]
[ruby-]1.9.2[-p330]
[ruby-]1.9.3[-p551]
[ruby-]2.0.0[-p648]
[ruby-]2.1[.10]
[ruby-]2.2[.7]
[ruby-]2.3[.4]
[ruby-]2.4[.1]
ruby-head

# for forks use: rvm install ruby-head-<name> --url https://github.com/github/ruby.git --branch 2.2
```

除了`MRI Rubies`是Ruby創辦人`Matz' Ruby Implementation`，`rvm list known`還會列出我的MacBook其他的Ruby種類，像是`JRuby`(jruby-1.6[.8]),給# Mac OS X Snow Leopard或更新的作業系統使用的`MacRuby`(macruby-0.10)，Ruby的另一個虛擬機`Rubinius`等。

## Step2. RVM指令安裝 `rvm install ruby-2.5.2`

Homebrew是一個可以在MacOS環境下，用指令安裝軟體的套件管理系統(software package management system)。我按照提示，利用`sudo chown -R $(whoami) /usr/local/sbin`把檔案夾改成可寫入。
接著又出現Homebrew的錯誤訊息：

```ruby
Checking requirements for osx.
Updating Homebrew...
==> Auto-updated Homebrew!
Updated 3 taps (heroku/brew, homebrew/core and homebrew/services).

Error: Could not link:
/usr/local/share/man/man1/brew.1

Please delete these paths and run `brew update`.
Error: Could not link:
/usr/local/share/doc/homebrew

Please delete these paths and run `brew update`.
Error: The following directories are not writable by your user:
/usr/local/sbin

You should change the ownership of these directories to your user.
  sudo chown -R $(whoami) /usr/local/sbin
Requirements installation failed with status: 1.
```

Homebrew的錯誤訊息解除後，ruby2.5.0仍一直裝不成功，決定裝ruby2.5.2版本。

```ruby
- tingdeAir:demo tingtinghsu$ rvm install ruby-2.5.2
Warning, new version of rvm available '1.29.7-next', you are using older version '1.29.3'.
You can disable this warning with:    echo rvm_autoupdate_flag=0 >> ~/.rvmrc
You can enable  auto-update  with:    echo rvm_autoupdate_flag=2 >> ~/.rvmrc
Searching for binary rubies, this might take some time.
No binary rubies available for: osx/10.14/x86_64/ruby-2.5.2.
Continuing with compilation. Please read 'rvm help mount' to get more information on binary rubies.
Checking requirements for osx.
Updating Homebrew...
==> Upgrading 5 outdated packages:
automake 1.15.1 -> 1.16.1_1, coreutils 8.28_1 -> 8.30, libyaml 0.1.7 -> 0.2.1, openssl@1.1 1.1.0g -> 1.1.1a, readline7.0.3_1 -> 8.0.0
==> Upgrading openssl@1.1
...
...
...
- Installing Ruby from source to: /Users/tingtinghsu/.rvm/rubies/ruby-2.5.2, this may take a while depending on your cpu(s)...
ruby-2.5.2 - #downloading ruby-2.5.2, this may take a while depending on your connection...
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 12.9M  100 12.9M    0     0  1841k      0  0:00:07  0:00:07 --:--:-- 2484k
No checksum for downloaded archive, recording checksum in user configuration.
ruby-2.5.2 - #extracting ruby-2.5.2 to /Users/tingtinghsu/.rvm/src/ruby-2.5.2....
ruby-2.5.2 - #configuring...................................................................
ruby-2.5.2 - #post-configuration.
ruby-2.5.2 - #compiling........ 
```

Ruby 2.5.2終於成功安裝了！

## 用指令設定ruby預設/切換要使用的版本 `ruby --default use 2.5.2`

未來我們在進入不同的專案裡，可以用指令`ruby use x.x.x`設定ruby切換要使用的版本。如果打算將新版本預設作為一開機就使用的ruby版本號，加上`--default`。輸入`rvm info`可以查詢更多訊息。

```ruby
tingdeAir:~ tingtinghsu$ rvm use ruby-2.5.2
Using /Users/tingtinghsu/.rvm/gems/ruby-2.5.2

tingdeAir:~ tingtinghsu$ which ruby
/Users/tingtinghsu/.rvm/rubies/ruby-2.5.2/bin/ruby

tingdeAir:~ tingtinghsu$ rvm info
rvm:
    version:      "1.29.3 (latest)"
    path:         "/Users/tingtinghsu/.rvm"
  ruby:
    interpreter:  "ruby"
    version:      "2.5.2p104"
    date:         "2018-10-18"
    platform:     "x86_64-darwin18"
    patchlevel:   "2018-10-18 revision 65133"
    full_version: "ruby 2.5.2p104 (2018-10-18 revision 65133) [x86_64-darwin18]"

  homes:
    gem:          "/Users/tingtinghsu/.rvm/gems/ruby-2.5.2"   #指令rvm use的路徑ruby-2.5.2，正在使用中
    ruby:         "/Users/tingtinghsu/.rvm/rubies/ruby-2.5.2" #指令which ruby的路徑

  binaries:
    ruby:         "/Users/tingtinghsu/.rvm/rubies/ruby-2.5.2/bin/ruby"
    irb:          "/Users/tingtinghsu/.rvm/rubies/ruby-2.5.2/bin/irb"
    gem:          "/Users/tingtinghsu/.rvm/rubies/ruby-2.5.2/bin/gem"
    rake:         "/Users/tingtinghsu/.rvm/gems/ruby-2.5.2/bin/rake"

```

# 安裝Rails

由於我有多個版本的Ruby，在RVM的管理方式是讓不同ruby的gem分別獨立開來，現在新的`ruby-2.5.2`下目前尚未安裝rails。

## 列目前ruby版本下的套件 `gem list`

現在與我們最相關的是`rubygems-bundler (1.4.5)`
和`rvm (1.11.3.9)`，rails還沒有在裡面。

```ruby
$ gem list

*** LOCAL GEMS ***

bigdecimal (default: 1.3.4)
bundler-unload (1.0.2)
cmath (default: 1.0.0)
csv (default: 1.0.0)
date (default: 1.0.0)
dbm (default: 1.0.0)
did_you_mean (1.2.0)
etc (default: 1.0.0)
executable-hooks (1.6.0)
fcntl (default: 1.0.0)
fiddle (default: 1.0.0)
fileutils (default: 1.0.2)
gem-wrappers (1.3.2)
io-console (default: 0.4.6)
ipaddr (default: 1.2.0)
json (default: 2.1.0)
minitest (5.10.3)
net-telnet (0.1.1)
openssl (default: 2.1.2)
power_assert (1.1.1)
psych (default: 3.0.2)
rake (12.3.0)
rdoc (6.1.1, default: 6.0.1)
rubygems-bundler (1.4.5)
rvm (1.11.3.9)
scanf (default: 1.0.0)
sdbm (default: 1.0.0)
stringio (default: 0.0.1)
strscan (default: 1.0.0)
test-unit (3.2.7)
webrick (default: 1.4.2)
xmlrpc (0.3.0)
zlib (default: 1.0.0)
```

## 使用套件安裝rails: `gem install rails`

```ruby
tingdeAir:projects tingtinghsu$ gem install rails
Fetching: concurrent-ruby-1.1.4.gem (100%)
Successfully installed concurrent-ruby-1.1.4
Fetching: i18n-1.5.2.gem (100%)

HEADS UP! i18n 1.1 changed fallbacks to exclude default locale.
But that may break your application.

Please check your Rails app for 'config.i18n.fallbacks = true'.
If you're using I18n (>= 1.1.0) and Rails (< 5.2.2), this should be
'config.i18n.fallbacks = [I18n.default_locale]'.
If not, fallbacks will be broken in your app by I18n 1.1.x.

For more info see:
https://github.com/svenfuchs/i18n/releases/tag/v1.1.0
39 gems installed
...
```

總算安裝Rails完了！根據以上的提示訊息，確認一下Rails版本是否>=5.2.2

```ruby
> tingdeAir:projects tingtinghsu$ rails -v
Rails 5.2.2
```

## 移動到專案資料夾內產生model: `rails g model`

問題總算順利解決了！:)

```ruby
tingdeAir:projects tingtinghsu$ cd demo2.5/
tingdeAir:demo2.5 tingtinghsu$ rails g model User name email tel
Running via Spring preloader in process 82946
      invoke  active_record
      create    db/migrate/20190121090619_create_users.rb
      create    app/models/user.rb
      invoke    test_unit
      create      test/models/user_test.rb
      create      test/fixtures/users.yml
...
```


Ref:

* [RVM.io](https://rvm.io/)
* [Ruby on Rails練習 - MacOS安裝篇](https://tingtinghsu.github.io/blog/articles/2018-08-21-install_ruby_rails_on_MacOS)
* [在Mac上用rvm安裝ruby](https://zoneless.weebly.com/blog/install-ruby-on-mac-with-rvm)
* [RVM - Ruby enVironment(Version) Manager](https://kaochenlong.com/2011/11/16/rvm/)
* [How to update gems with Bundler](https://bundler.io/v1.17/guides/updating_gems.html)
* [Rails: Could not find railties](https://stackoverflow.com/questions/9212116/rails-could-not-find-railties)
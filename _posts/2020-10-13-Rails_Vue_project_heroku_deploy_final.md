---
title:  "[2020] 第12屆鐵人賽Day 30 Rails專案開發 - 網站部署 + 完賽感言"
preview: ""
permalink: "/articles/2020-10-13"
date:   2020-10-10 10:00:00
layout: post
tags: 
  - "rail"
  - "vue"    
---



# Step0.設定Redis環境變數

為了準備`production`環境來修改`config/cable.yml`（cable這個英文字是`纜線`的意思，命名取的真好）。

```
development:
  adapter: redis
  url: redis://localhost:6379/1

test:
  adapter: test

production:
  adapter: redis
  url: <%= ENV.fetch("REDIS_URL") { "redis://localhost:6379/1" } %>
  channel_prefix: vue_rails_production
```

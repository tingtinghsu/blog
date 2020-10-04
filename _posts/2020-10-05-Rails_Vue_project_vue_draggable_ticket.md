---
title:  "[2020] 第12屆鐵人賽Day 22 Rails專案開發 - Vue draggable套件拖拉ticket"
preview: ""
permalink: "/articles/2020-10-05"
date:   2020-10-03 10:00:00
layout: post
tags: 
  - "rail"
  - "vue"    
---


我的下一個需求：想奧把放在`backlog`欄位的`ticket`拖到`Sprint Backlog`，代表本週要完成的票！

# 拖拉Card(而且可以移動到不同的List)

## 1. 引入`draggable`套件並註冊元件

list.vue

```javascript
<script>
  import Rails from '@rails/ujs';
  import Card from 'components/card';
  // 引入`draggable`套件
  import draggable from 'vuedraggable';

  export default {              
    name: 'List',
    props: ["list"], 
    // 註冊draggable元件
    components: { Card, draggable },
    data: function(){
      return {
        content: '',
        cards: this.list.cards, 
        editing: false 
      }
    },
    methods: {
        //略       
      }
    }
  }
</script>

```

## 2. 在要拖拉的card加入`draggable components`並綁定v-model

list index.html.erb

```htmlmixed
    <div class="cardset">
      <draggable v-model="cards">
        <Card v-for="card in cards" :card="card" :key="card.id" ></Card>
      </draggable>
      <!--    略      -->
    </div>
  </div>
```

### 可以在`draggable`標籤加入`ghost-class`與css讓拖拉的效果更明顯

html
```
  <draggable v-model="cards" ghost-class="ghost" group="list">
    <Card v-for="card in cards" :card="card" :key="card.id" ></Card>
  </draggable>
```

### 參考`draggable`文件的`two list`source code，看card如何拖到其他的list

```
https://sortablejs.github.io/Vue.Draggable/#/two-lists

https://github.com/SortableJS/Vue.Draggable/blob/master/example/components/two-lists.vue
```
從這段文件發現，只要設為同一個`group`就可以拖拉過去！
```javascript
    <div class="col-3">
      <h3>Draggable 1</h3>
      <draggable class="list-group" :list="list1" group="people" @change="log">
        <div
          class="list-group-item"
          v-for="(element, index) in list1"
          :key="element.name"
        >
          {{ element.name }} {{ index }}
        </div>
      </draggable>
    </div>

    <div class="col-3">
      <h3>Draggable 2</h3>
      <draggable class="list-group" :list="list2" group="people" @change="log">
        <div
          class="list-group-item"
          v-for="(element, index) in list2"
          :key="element.name"
        >
          {{ element.name }} {{ index }}
        </div>
      </draggable>
    </div>
```

## 3. 監聽`@change`事件，寫一個callback function`cardMoved`紀錄card移動

先把這個`@change`觸發的`cardMoved`function的event印出來，看有什麼參數可以利用

```
  <draggable v-model="cards" ghost-class="ghost" group="list" @change="cardMoved">
    <Card v-for="card in cards" :card="card" :key="card.id" ></Card>
  </draggable>
  
  //略
  
  export default {              
    name: 'List',
    props: ["list"], // property
    components: { Card, draggable },
    data: function(){
      return {
        content: '',
        cards: this.list.cards, // cardset的`v-for`就可以改成cards
        editing: false // 預設輸入框不顯示
      }
    },
    methods: {
      cardMoved(event){
        console.log(event)
      },
     // 略
    }
  
```

移動了買咖啡的`card`從`TO DO`到`Doing`list
發現有`add`和`removed`事件可以使用
(但是如果只是移動在自己的list，只有`moved`事件)
![](https://i.imgur.com/GYiS1yL.jpg)


## 4. 移動完後，把API打到後端

```javascript
      cardMoved(event){
        // event.preventDefault();
        // console.log(event)
        let cardMovedEvent = event.added || event.moved;
        if (cardMovedEvent) {
          // 先透過element確定哪張卡片被移
          let cardElement = cardMovedEvent.element;
          // 把id存起來
          let card_id = cardElement.id;
          // 準備一包FormData
          let data = new FormData();
          // 找到card在哪個list (可能是新移動的list，或是原本的list)
          data.append("card[list_id]", this.list.id);
          // acts as list 的 position：從1開始算，移動到新的位置
          data.append("card[position]", cardMovedEvent.newIndex + 1);
        }
        Rails.ajax({
          // cards/2/move
          // 打到cards[編號為新移動完的序列]，那筆資料的id
          url: `/cards/${card_id}/move`,
          type: 'PUT',
          data,
          dataType: 'json',
          success: response => {
            console.log(response);
          },
          error: error => {
            console.log(error);
          }
        })
      },
```

## 5. controller新增action，routes新增路徑

routes
```
  resources :cards do
    member do
      put :move # /cards/2/move
    end
  end
```

cards_controller
```
  def move
    @card.update(card_params)
    render 'show.json'
  end
```

Ref: 

 * [GoRails: Rails & Vue.js Trello Clone](https://gorails.com/episodes/rails-vuejs-trello-clone-part-1)

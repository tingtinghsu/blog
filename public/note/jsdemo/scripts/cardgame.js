// 程式碼寫在這裡!

let yourDeck = [];
let dealerDeck = [];
let yourPoint = 0;
let dearlerPoint = 0;
let inGame = false;
let winner = 0; // 0: 未定, 1: 玩家贏 2: 莊家贏 3: 平手

$(document).ready(function(){
  initCards();
  initButtons();
});

// A. 初始化卡片: 把換牌面設計的功能獨立出來
function initCards(){
//  抓所有div為card  
    $('.dealerCard').html('㊎');
    $('.yourCard').html('㊖');
}

// B. 初始化按鈕: 按完按鈕，重啟新牌局
function initButtons() {
  $('#action-new-game').click( evt => newGame() );
  $ ('#action-hit').click( evt => {
    evt.preventDefault();
    yourDeck.push(deal()); //再從deal()移動一張牌推進去陣列
    renderGameTable(); //再畫一次       
  });
  $('#action-stand').click( evt => {
    evt.preventDefault();
    dealerDeck.push(deal()); //再從deal()移動一張牌推進去陣列
    //renderGameTable(); //再畫一次     
    dealerRound();
  });
}

// C. 啟動遊戲:
function newGame() {
  resetGame();
  //console.log(shuffle(buildDeck()));
  deck = shuffle(buildDeck());
  yourDeck.push(deal());
  dealerDeck.push(deal());
  yourDeck.push(deal());  

  //開始遊戲
  inGame = true;

  //把玩家和莊家的卡牌畫出來
  renderGameTable();
  //console.log('New Game!'); 
}


// D. 建立牌組: suit = 花色, number = 號碼
function buildDeck(){
  let deck = []; // 建立空陣列放牌

    for(let suit = 1; suit <= 4; suit++) {
      for(let number = 1; number <= 13; number++){
        let c = new Card(suit, number); //做出52種牌組
        deck.push(c); //塞進去盒子
    }
  }

  return deck;
}

// H. 在畫面看到發牌的樣子
function renderGameTable() {
  //用迴圈的方式把已經抽到的牌翻出來

  //莊家
  yourDeck.forEach((card, i) => {
    //把抓到的卡牌 0, 1, 2, 3, 4 用索引值[i]塞進去`.{i + 1}`
  let theCard = $(`#yourCard${i + 1}`); 
  //兩層$, 內層放索引值，外層代表jQuery的取值方式
    //theCard.html('A'); //測試
    theCard.html(card.cardShowNumber());
    theCard.prev().html(card.cardSuit());
  });

  //玩家
  dealerDeck.forEach((card, i) => {
    let theCard = $(`#dealerCard${i + 1}`); 
      theCard.html(card.cardShowNumber());
      theCard.prev().html(card.cardSuit());
  });

  //算點數
  yourPoint = calcPoint(yourDeck);
  dealerPoint = calcPoint(dealerDeck);

  //遊戲結束的條件
  if (yourPoint >= 21 || dearlerPoint >=21) { 
    inGame = false; //hit & stand按鈕關閉
  }

  checkWinner();
  showWinStamp();
  $('.your-cards h1').html(`你 (${yourPoint}點) `); 
  $('.dealer-cards h1').html(`莊家 (${dealerPoint}點) `);

  /*開始戰鬥*/
  //按鈕
  // if (inGame) {
  //   $('#action-hit').attr('disabled', false);
  //   $('#action-stand').attr('disabled', false);
  // }
  // // 遊戲結束 inGame = false
  // else {
  //   $('#action-hit').attr('disabled', true);
  //   $('#action-stand').attr('disabled', true);    
  // }
    $('#action-hit').attr('disabled', !inGame);
    $('#action-stand').attr('disabled', !inGame);  
}

function checkWinner() {
    //論輸贏
    switch(true){
      // 0. 比點數大小
      case dealerPoint > yourPoint:
        winner = 2;
        break;
  
      // 1. 如果玩家21點，玩家贏
      case yourPoint == 21:
        winner = 1;
        break;
  
      case dearlerPoint == 21:
        winner = 2;
        break;      
      
      // 2. 如果玩家點數爆
      case yourPoint > 21:
        winner = 2;
        break;
      
      // 3. 如果莊家點數爆
      case dealerPoint > 21:
        winner = 1;
        break;
      //平手
      case yourPoint == dealerPoint:
        winner = 3;
        break;
      // 4. 最後再用莊家的點來比點數
      case dealerPoint > yourPoint:
        winner = 2;
        break;   
  
      default:
        winner = 0;
        break;
    }
}

function showWinStamp() {
  switch(winner) {
    case 1:
      $('.your-cards').addClass('win');
      break;

    case 2:
      $('.dealer-cards').addClass('win');
      break; 
    
    case 3: //平手
      break;

    default:
      break;
  }
}
//I. 用迴圈算牌的分數
function calcPoint(deck) {
  let point = 0;

  deck.forEach(card => {
    point += card.cardPoint();
  })
  // M. 精算點數
  if (point > 21) {
    deck.forEach(card => {
      if (card.cardShowNumber() == 'A'){
        point -= 10; // A從11點變1點
      }
    })
  }
  return point;
}

function dealerRound() {
  //1. 發牌
  //2. 如果點數 >= 玩家，結束，莊家贏
  //3. 如果 < 玩家，重複1
  //4. >21點，結束，玩家
  while(true) { //whie: 不知道要做幾次, 無窮迴圈
    dealerPoint = calcPoint(dealerDeck);
    if (dealerPoint < yourDeck) {
      dealerDeck.push(deal());
    } else {
      break;
    } 
  }
  inGame = false; //跳出後，結束遊戲
  renderGameTable();
}

// J. 遊戲重置
function resetGame() {
  deck = [];
  yourDeck = [];
  dealerDeck = [];
  yourPoint = 0;
  dearlerPoint = 0;  
  winner = 0;
}

//用OOP做卡牌
class Card {
  constructor(suit, number){
    this.suit = suit;
    this.number = number;
  }

// H. 把卡牌號碼換成代表A, J, Q, K
// 牌面
  cardShowNumber() {
    switch(this.number) {
      case 1:
       return 'A';
      case 11:
       return 'J';
      case 12:
       return 'Q';
      case 13:
       return 'K';
      default:
       return this.number;  
    }
  }

  // F. 卡牌點數
  cardPoint() {
    switch(this.number) {
      case 1:
        return 11;
      case 11:
      case 12:
      case 13:
        return 10;
      default:
        return this.number;
    }
  }
  // F. 卡牌花色  
  cardSuit() {
    switch(this.suit) {
      case 1:
        return '♠';
      case 2:
        return '♥';
      case 3:
        return '♦';
      case 4:
        return '♣';
    }
  }
}
// F. 發牌:
function deal() {
  return deck.shift();
}

// E. 洗牌:
//https://gomakethings.com/how-to-shuffle-an-array-with-vanilla-js/
var shuffle = function (array) {

	var currentIndex = array.length;
	var temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
};





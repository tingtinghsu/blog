// 程式碼寫在這裡！
function bmi(height, weight) {
  // 取完值後轉為數值
  var w = parseInt(weight);
  var h = parseInt(height) / 100;
  var r = (w / ( h * h )).toFixed(2);
  return r;
}

function printHealth(height, weight) {
  if (bmi(height, weight) >= 24){
    return "有點胖喔！多起來走動走動";
  } else if(bmi(height, weight) < 18) {
    return "有點瘦喔！多吃一點";
  } else { return "正常" };
}

function calculateBMI() {
  //  按下去後取值
  var height = document.querySelector('#bodyHeight').value;
  var weight = document.querySelector('#bodyWeight').value;
  var result = document.querySelector('#resultText'); // 不用.value
  var health = document.querySelector('#healthText');
  if ((height != '') && ( height != 0) && (weight != '')){
    result.innerHTML = bmi(height, weight);
    health.innerHTML = printHealth(height, weight);
  } else {
    alert('請輸入正確數值!');
  }
  //console.log(bmi(height, weight));
}
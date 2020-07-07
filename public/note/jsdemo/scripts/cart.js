function selectAllSkills() {
  var skills = document.querySelectorAll('.skill');
  //skills為一個陣列
  for (var i = 0; i < skills.length; i++){
    var s = skills[i];
    //改變.checked屬性
    s.checked = true;
  }
}

function addProduct(amount) {
  var quantityField = document.querySelector('#item1Quantity');
  var priceField = document.querySelector('#item1Price');
  /* 量 */
  var quantity = parseInt(quantityField.innerHTML);
  //原始值0已抓取
  quantity += amount; //增減後的數值
  if (quantity < 0) { quantity = 0}
  quantityField.innerHTML = quantity; //將量餵回去
  /* 價 */
  var unitpriceField = document.querySelector('#unitPrice');
  var unitpriceInt = parseInt(unitpriceField.innerHTML);
  console.log(unitpriceInt);
  priceField.innerHTML = unitpriceInt * quantity; //單價*新量，餵回去總價
}
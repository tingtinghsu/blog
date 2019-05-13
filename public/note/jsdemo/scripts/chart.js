// 程式碼寫在這裡
//希望DOM元素載完再做其他的事情
$().ready(() => {
  getVegetable('香蕉');
  //getVegetable('九層塔');
});

function getVegetable(item) {
  fetch(`https://ubin.io/data/vegetables?item=${item}`)
  .then( response => { 
    // 解析轉成json格式
    return response.json()
    // 再回傳一個promise
  })
  .then(data => { renderChart(data); })
}

function renderChart(data) {

  let markets = data["prices"].map(p => p.market) 
  let prices = data["prices"].map(p => p.price)

  let title = `${data.item}價格`;
  var ctx = $('#myChart');  
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: markets,
        datasets: [{
            label: title,
            data: prices,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(155, 199, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'                
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
}
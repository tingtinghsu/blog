let chi = 0;

$(document).ready(() => {
  $('#hitButton').click( evt => {
    evt.preventDefault();
    chi += 1;
    $('#hitButton').text(`集氣 (${chi} 次) `);
  })
});

let 大絕招 = new Promise((resolve, reject) => {
  setTimeout(() => {
    if( chi >= 5 ) {
      resolve('元氣玉');
    } else {
      reject('元氣玉');
    }
  }, 3000)
  
大絕招.then(招式 => $('#result').html(`使用絕招：${招式}`)).catch(err => $('#result').html(`${err}無法使用！`))
})

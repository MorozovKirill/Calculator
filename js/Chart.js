function canvas_init() {

  canvas = document.getElementById("graph_001");
  ctx = canvas.getContext( '2d' );

}

function draw_chart(y1, y2, current_rate, overdraft_mounthly, validation) {

  if (overdraft_mounthly < 0) overdraft_mounthly = 0;
  if (current_rate < 0) current_rate = 0;

  ctx.clearRect(0, 0, canvas_width, canvas_height);

  if (y1 <= 0) y1 = -1;
  if (y2 <= 0) y2 = -1;

  ctx.fillStyle = "rgb(71, 148, 228)";
  ctx.fillRect (0, canvas_height - 40, canvas_width/2 - 5, -y1);

  ctx.fillStyle = "rgb(71, 148, 228)";
  ctx.fillRect (canvas_width/2 + 5,  canvas_height - 40, canvas_width, -y2);

  current_rate = Math.round(current_rate);
  overdraft_mounthly = Math.round(overdraft_mounthly);

  if (overdraft_mounthly == 0 & validation == 'not_valid') overdraft_mounthly = '—';

  current_rate = String(current_rate).replace(/(\d)(?=(\d{3})+(\D|$))/g, "$1 ") + ' руб.';
  overdraft_mounthly = String(overdraft_mounthly).replace(/(\d)(?=(\d{3})+(\D|$))/g, "$1 ") + ' руб.';

  ctx.font = "18px Merriweather";
  ctx.textAlign = "center";
  ctx.fillText(current_rate, canvas_width / 4 - 5, (canvas_height - 40) - y1 - 10);
  ctx.fillText(overdraft_mounthly, canvas_width / 4 * 3 + 5, (canvas_height - 40) - y2 - 10);

  ctx.font = "12px Merriweather";
  ctx.textAlign = "center";
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillText('Текущая', canvas_width / 4 - 5, canvas_height - 20);
  ctx.fillText('Переплата за кредит', canvas_width / 4 * 3 + 5, canvas_height - 20);
  ctx.fillText('арендная плата', canvas_width / 4 - 5, canvas_height - 5);
  ctx.fillText('ежемесячно', canvas_width / 4 * 3 + 5, canvas_height - 5);

}

function build_chart(newSumm1, newSumm2, validation) {

  // если в данный момент проигрывается анимация, убиваем ее и все последующие в очереди

  if (typeof animationFrameId !== 'undefined') {
    cancelAnimationFrame(animationFrameId);
  }

  var steps = 50;
  var max_height = 230;
  var y1, y2;

  // вычисляем насколько изменится высота баров на графике

  if (newSumm1 == 0 & newSumm2 > 0) { y1 = 1; y2 = max_height; }
  if (newSumm1 > 0 & newSumm2 == 0) { y1 = max_height; y2 = 1; }
  if (newSumm1 == 0 & newSumm2 == 0) { y1 = 1; y2 = 1; }

  if (newSumm1 > 0 & newSumm2 > 0 ) {

    var proportion = newSumm1 / newSumm2;

    if ( proportion > 1) {
      y1 = max_height;
      y2 = Math.round(y1 / proportion);
    } else {
      y2 = max_height;
      y1 = Math.round(y2 * proportion);
    }

  }

  var deltaY1 = y1 - y1Old;
  var deltaY2 = y2 - y2Old;

  var deltaSumm1 = newSumm1 - summ1Old;
  var deltaSumm2 = newSumm2 - summ2Old;

  var counter = 0;

  // рассчитываем массив шагов для высот графиков и сумм-подписей

  var arr_1 = [], arr_2 = [], arr_3 = [], arr_4 = [];

  for (i = 0; i < steps; i++) {

    if ( i == 0) {

      arr_1[i] = (deltaY1 / Math.pow(steps, 2));
      arr_2[i] = (deltaY2 / Math.pow(steps, 2));
      arr_3[i] = (deltaSumm1 / Math.pow(steps, 2));
      arr_4[i] = (deltaSumm2 / Math.pow(steps, 2));

    }

    if (i > 0) {

      arr_1[i] = (Math.pow((i+1), 2) * (deltaY1 / Math.pow(steps, 2))) - (Math.pow((i), 2) * (deltaY1 / Math.pow(steps, 2)));
      arr_2[i] = (Math.pow((i+1), 2) * (deltaY2 / Math.pow(steps, 2))) - (Math.pow((i), 2) * (deltaY2 / Math.pow(steps, 2)));
      arr_3[i] = (Math.pow((i+1), 2) * (deltaSumm1 / Math.pow(steps, 2))) - (Math.pow((i), 2) * (deltaSumm1 / Math.pow(steps, 2)));
      arr_4[i] = (Math.pow((i+1), 2) * (deltaSumm2 / Math.pow(steps, 2))) - (Math.pow((i), 2) * (deltaSumm2 / Math.pow(steps, 2)));

    }

  }

  // рисуем график с анимацией

  function animate() {

    if (counter < steps) {

      var
        y1 = y1Old + arr_1[counter],
        y2 = y2Old + arr_2[counter],
        summ1 = summ1Old + arr_3[counter],
        summ2 = summ2Old + arr_4[counter];

      counter++;

      draw_chart (Math.round(y1), Math.round(y2), summ1, summ2, validation);
      y1Old = y1;
      y2Old = y2;
      summ1Old = summ1;
      summ2Old = summ2;

      animationFrameId = requestAnimationFrame(animate);

    }

  }
  animationFrameId = requestAnimationFrame(animate);

}

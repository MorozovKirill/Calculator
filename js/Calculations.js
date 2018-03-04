function credit_calculation(e) {

  // убираем лишние пробелы, проверяем на '.' и ',' в первом символе строки и на пустую строку

  if (e) {
    if (e.target.name) {
      var a = e.target;
      var result = a.value.match(/\s/g);
      if (result != null && result.length > 0) {
        e.target.value = a.value.replace(/\s+/g, '');
      }
    }
  }

  // меняем ',' > '.' и убираем пробелы для вычислений

  function str_to_number(str) {
    str = str.replace(/,/, '.');
    return str.replace(/\s+/g, '');
  }

  // Выставляем слайдер

  if (e) {
    switch(e.target.name) {
      case 'credit_amount':
        form.range_credit_amount.value = parseInt(e.target.value / 100000);
        if (parseInt(e.target.value / 100000) <= 300) {
          var progress_div = document.getElementById('progress_credit_amount');
          progress_div.style.width = parseInt(e.target.value / 100000) * 2 + 'px';
        }
        else {
          var progress_div = document.getElementById('progress_credit_amount');
          progress_div.style.width = '600px';
        }
        break;
      case 'start_payment':
        form.range_start_payment.value = parseInt(e.target.value / 100000);
        if (parseInt(e.target.value / 100000) <= 300) {
          var progress_div = document.getElementById('progress_start_payment');
          progress_div.style.width = parseInt(e.target.value / 100000) * 2 + 'px';
        }
        else {
          var progress_div = document.getElementById('progress_start_payment');
          progress_div.style.width = '600px';
        }
        break;
      case 'credit_time':
        form.range_credit_time.value = parseInt(e.target.value / 1);
        if (parseInt(e.target.value / 1) <= 600) {
          var progress_div = document.getElementById('progress_credit_time');
          progress_div.style.width = parseInt(e.target.value / 1) + 'px';
        }
        else {
          var progress_div = document.getElementById('progress_credit_time');
          progress_div.style.width = '600px';
        }
        break;
      case 'credit_percent':
        form.range_credit_percent.value = parseInt(e.target.value / 1);
        if (parseInt(e.target.value / 1) <= 100) {
          var progress_div = document.getElementById('progress_credit_percent');
          progress_div.style.width = parseInt(e.target.value / 1 * 6) + 'px';
        }
        else {
          var progress_div = document.getElementById('progress_credit_percent');
          progress_div.style.width = '600px';
        }
        break;
      case 'current_rent':
        form.range_current_rent.value = parseInt(e.target.value / 1000);
        if (parseInt(e.target.value / 1000) <= 99) {
          var progress_div = document.getElementById('progress_current_rent');
          progress_div.style.width = parseInt(e.target.value / 1000 / 0.165) + 'px';
        }
        else {
          var progress_div = document.getElementById('progress_current_rent');
          progress_div.style.width = '600px';
        }
        break;
      default:
        break;
    }
  }

  // расчет

  var credit_amount = str_to_number(form.elements.credit_amount.value);
  var start_payment = str_to_number(form.elements.start_payment.value);
  var credit_time = str_to_number(form.elements.credit_time.value);
  var credit_percent = str_to_number(form.elements.credit_percent.value);
  var current_rent = str_to_number(form.elements.current_rent.value);

  // очищаем стили валидации  и подсвечиваем инпуты

  var classes = document.getElementsByName('credit_time')[0];
  classes.classList.remove('play_validation_summ', 'play_validation_alert', 'play_validation_alert_002', 'validation_summ_static');

  classes = document.getElementsByName('credit_percent')[0];
  classes.classList.remove('play_validation_summ', 'play_validation_alert', 'play_validation_alert_002', 'validation_summ_static');

  classes = document.getElementsByName('current_rent')[0];
  classes.classList.remove('play_validation_summ', 'play_validation_alert', 'play_validation_alert_002', 'validation_summ_static');

  classes = document.getElementsByName('credit_amount')[0];
  classes.classList.remove('play_validation_summ', 'play_validation_alert', 'play_validation_alert_002', 'validation_summ_static');

  classes = document.getElementsByName('start_payment')[0];
  classes.classList.remove('play_validation_summ', 'play_validation_alert', 'play_validation_alert_002', 'validation_summ_static');

  classes = document.getElementById('progress_credit_amount');
  classes.classList.remove('slider_track_progress_invalid');

  classes = document.getElementById('progress_start_payment');
  classes.classList.remove('slider_track_progress_invalid');


  if ((credit_time == '') || (credit_time == 0)) {

    classes = document.getElementsByName('credit_time')[0];
    classes.classList.add('play_validation_summ');

  }

  if (credit_percent == '') {

    classes = document.getElementsByName('credit_percent')[0];
    classes.classList.add('play_validation_summ');

  }

  if (current_rent == '') {

    classes = document.getElementsByName('current_rent')[0];
    classes.classList.add('play_validation_summ');

  }

  if ((credit_amount == '') || (credit_amount == 0)) {

    classes = document.getElementsByName('credit_amount')[0];
    classes.classList.add('play_validation_summ');

  }

  if (start_payment == '') {

    classes = document.getElementsByName('start_payment')[0];
    classes.classList.add('play_validation_summ');

  }

  if (+credit_amount < +start_payment) {

    classes = document.getElementsByName('credit_amount')[0];
    classes.classList.add('play_validation_summ');

    classes = document.getElementsByName('start_payment')[0];
    classes.classList.add('play_validation_summ');

    classes = document.getElementById('progress_credit_amount');
    classes.classList.add('slider_track_progress_invalid');

    classes = document.getElementById('progress_start_payment');
    classes.classList.add('slider_track_progress_invalid');

  }

  // основные расчеты

  if ((credit_amount != '') && (start_payment != '') && (+credit_amount > +start_payment) && (+credit_time > 0)) {

    // считаем

    var real_credit_amount = credit_amount - start_payment;

    if (credit_percent > 0) {

      var mounthly_percent = credit_percent / 12 / 100;
      var K = (mounthly_percent * Math.pow(1 + mounthly_percent, credit_time)) / (Math.pow(1 + mounthly_percent, credit_time) - 1);
      var mounthly_payment =  real_credit_amount * K;
      var overdraft = mounthly_payment * credit_time - real_credit_amount;
      var overdraft_mounthly = overdraft / credit_time;

    } else {

      var mounthly_payment =  real_credit_amount / credit_time;
      var overdraft = 0;
      var overdraft_mounthly = 0;

    }

    real_credit_amount = Math.round(real_credit_amount) + '';
    mounthly_payment = Math.round(mounthly_payment) + '';
    overdraft = Math.round(overdraft) + '';
    overdraft_mounthly = Math.round(overdraft_mounthly) + '';

    list_real_credit_amount.innerHTML = real_credit_amount.replace(/(\d)(?=(\d{3})+(\D|$))/g, "$1 ") + ' руб.';
    list_mounthly_payment.innerHTML = mounthly_payment.replace(/(\d)(?=(\d{3})+(\D|$))/g, "$1 ") + ' руб.';
    list_overdraft.innerHTML = overdraft.replace(/(\d)(?=(\d{3})+(\D|$))/g, "$1 ") + ' руб.';
    list_overdraft_mounthly.innerHTML = overdraft_mounthly.replace(/(\d)(?=(\d{3})+(\D|$))/g, "$1 ") + ' руб.';

    // рисуем график

    build_chart(current_rent, overdraft_mounthly, 'valid');

  }
  else {

    // присваиваем пустые значения в расчеты

    list_real_credit_amount.innerHTML = '— руб.';
    list_mounthly_payment.innerHTML = '— руб.';
    list_overdraft.innerHTML = '— руб.';
    list_overdraft_mounthly.innerHTML = '— руб.';

    // рисуем график

    build_chart(current_rent, 0, 'not_valid');

  }

  var fade = -1;

  if (+overdraft_mounthly < +current_rent) {

    var decision = '<p>Если вы готовы ежемесячно платить ' + mounthly_payment.replace(/(\d)(?=(\d{3})+(\D|$))/g, "$1 ") + ' руб., берите кредит.</p><p>Это выгоднее, чем платить аренду.</p>';
    fade = 1;

  }

  if (+overdraft_mounthly > +current_rent) {

    var decision = '<p>Вы будете ежемесячно переплачивать за кредит больше, чем ваша текущая аренда.</p><p>Лучше продолжайте снимать и откладывайте деньги на депозит.</p>';
    fade = 2;

  }

  if (+overdraft_mounthly == +current_rent) {

    var decision = '<p>Подкиньте моентку.</p><p>;)</p>';
    fade = 3;

  }

  if (!overdraft_mounthly) {

    var decision = '<p>Проверьте правильность исходных данных.</p><p>Что-то явно не так.</p>';
    fade = 4;

  }

  if ((fade == fade_flag) || (fade == 1)) {

    var conclusion = document.getElementById('conclusion');
    conclusion.innerHTML = decision;

  }

  if (fade != fade_flag) {

    var conclusion = document.getElementById('conclusion');
    conclusion.classList.remove('fadein');
    conclusion.innerHTML = decision;
    void conclusion.offsetWidth;
    conclusion.classList.add('fadein');
    fade_flag = fade;

  }

}
function input_animate_validation(e) {

  // подсветка инпута при неправильном вводе
  var classes = e.target.classList;

  void e.target.offsetWidth;

  // если уже сработала валидация на неправильную сумму, подсвечиваем только фон инпута
  if (classes.contains('play_validation_summ') || classes.contains('validation_summ_static')) {

    classes.add('validation_summ_static');

    classes.remove('play_validation_alert');
    classes.remove('play_validation_alert_002');
    classes.remove('play_validation_summ');

    void e.target.offsetWidth;
    classes.add('play_validation_alert_002');

  }

  // если нет, подсвечиваем и тень
  else {

    classes.remove('play_validation_alert');
    classes.remove('play_validation_alert_002');
    classes.remove('play_validation_summ');

    void e.target.offsetWidth;
    classes.add('play_validation_alert');

  }

}

function input_validate_number(e) {
  var chr = String.fromCharCode(e.which);

  if (!isNaN(parseFloat(chr)) && isFinite(chr)) {	return;
  } else {

    // проверка на ввод второй '.' или ','

    if ((chr == '.') && (e.target.name == 'credit_percent')) {

      var result = e.target.value.match(/[.,]/g);

      if (result != null && result.length > 0) {

        input_animate_validation(e);
        e.preventDefault();

      }

    } else {

      input_animate_validation(e);
      e.preventDefault();

    }
  }
}

function input_validate_paste_number(e) {

  var paste_str;

  // смотрим, что в буфере

  if ('clipboardData' in window) { // IE
    paste_str = window.clipboardData.getData('text').trim();
    window.clipboardData.setData('text', paste_str);
  }
  if ('clipboardData' in e) { // все, кроме IE
    paste_str = e.clipboardData.getData('text').trim();
  }

  // валидация ',' > '.'

  paste_str = paste_str.replace(/,/, '.');

  if (((!isNaN(parseFloat(paste_str)) && isFinite(paste_str)) || paste_str == '.') && e.target.name == 'credit_percent') {

    var result_input = e.target.value.match(/[.,]/g); // проверка на вставку дробного числа, если в инпуте уже дробное
    var result_source = paste_str.match(/\./g);

    if (result_input != null && result_input.length > 0 && result_source != null && result_source.length > 0) {
      input_animate_validation(e);
      e.preventDefault();
    }

    else {
      return;
    }
  }

  else if ((paste_str % 1 == 0) && (e.target.name != 'credit_percent')) {
    return;
  }

  else {
    input_animate_validation(e);
    e.preventDefault();
  }
}

function input_validate_drop_number(e) {

  var paste_str;

  // смотрим, что притащили

  paste_str = e.dataTransfer.getData('text').trim();

  // валидация ',' > '.'

  paste_str = paste_str.replace(/,/, '.');

  if (((!isNaN(parseFloat(paste_str)) && isFinite(paste_str)) || paste_str == '.') && e.target.name == 'credit_percent') {

    var result_input = e.target.value.match(/[.,]/g); // проверка на вставку дробного числа, если в инпуте уже дробное
    var result_source = paste_str.match(/\./g);

    if (result_input != null && result_input.length > 0 && result_source != null && result_source.length > 0) {
      input_animate_validation(e);
      e.preventDefault();
    }

    else {
      return;
    }
  }

  else if ((paste_str % 1 == 0) && (e.target.name != 'credit_percent')) {
    return;
  }

  else {
    input_animate_validation(e);
    e.preventDefault();
  }

}


function input_unformat (e) {

  // убираем все пробелы
  var a = e.target.value;
  var result = a.match(/\s/g);
  if (result != null && result.length > 0) {
    e.target.value = a.replace(/\s+/g, '');
  }
}

function input_format (e) {

  // сначала убираем все пробелы
  input_unformat(e);

  // потом рисуем новые
  var a = e.target.value;
  a = a.replace(/(\d)(?=(\d{3})+(\D|$))/g, "$1 ");
  e.target.value = a;
}

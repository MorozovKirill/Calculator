function slider(e) {

  var a;

  switch (e.target.name) {
    case 'range_credit_amount':
      a = e.target.value * 100000;
      form.credit_amount.value = a.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, "$1 ");
      var progress_div = document.getElementById('progress_credit_amount');
      progress_div.style.width = +e.target.value * 2 + 'px';
      break;
    case 'range_start_payment':
      a = e.target.value * 100000;
      form.start_payment.value = a.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, "$1 ");
      var progress_div = document.getElementById('progress_start_payment');
      progress_div.style.width = +e.target.value * 2 + 'px';
      break;
    case 'range_credit_time':
      a = e.target.value;
      form.credit_time.value = a.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, "$1 ");
      var progress_div = document.getElementById('progress_credit_time');
      progress_div.style.width = parseInt(+e.target.value) + 'px';
      break;
    case 'range_credit_percent':
      a = e.target.value;
      form.credit_percent.value = a.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, "$1 ");
      var progress_div = document.getElementById('progress_credit_percent');
      progress_div.style.width = parseInt(+e.target.value * 6) + 'px';
      break;
    case 'range_current_rent':
      a = e.target.value * 1000;
      form.current_rent.value = a.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, "$1 ");
      var progress_div = document.getElementById('progress_current_rent');
      progress_div.style.width = parseInt(+e.target.value / 0.165) + 'px';
      break;
    default:
      break;
  }

}
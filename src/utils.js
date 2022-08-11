function getDate() {

    let date = new Date()

    let today = {
        'year': date.getFullYear(),
        'month': (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1),
        'day': date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    }

    return today.year + '-' + today.month + '-' + today.day

}
function getDateBefore(days) {

    var date = new Date(new Date().getTime() - (days * 24 * 60 * 60 * 1000))

    var today = {
        'year': date.getFullYear(),
        'month': (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1),
        'day': date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    }

    return today.year + '-' + today.month + '-' + today.day

}
function formatDate(data) {

    return (data.substr(0, 10).split('-').reverse().join('/'))

}

/* eslint-disable */
function formatMoney(n, c, d, t) {

    var c = isNaN(c = Math.abs(c)) ? 2 : c,
      d = d === undefined ? "," : d,
      t = t === undefined ? "." : t,
      s = n < 0 ? "-" : "",
      i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
      j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
  }
  /* eslint-enable */

module.exports = {

    getDate,
    getDateBefore,
    formatDate,
    formatMoney

}
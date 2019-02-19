module.exports = {
  //gをkgに変換
  //50000(g) -> 50(kg)
  convert_weight_result: function (m) {
    return m / 1000
  },
  //Date型をstring型に変換
  //Date -> '2019-01-01'
  convert_date: function (date) {
    let ret = ''
    let y, m, d
    y = date.getFullYear()
    m = date.getMonth() + 1
    d = date.getDate()
    //月と日付は、一桁になったら0で桁を埋める
    ret += y + '-' + ((m < 10) ? ('0' + m) : m) + '-' + ((d < 10) ? ('0' + d) : d)
    return ret
  },
  //文字列型の日付表示を変換
  slice_date: function (str) {
    return str.substr(0, 10)
  },
  //タイムの結果(ms)を通常表記に変換
  //110500(ms) -> 1:50.5
  convert_time_result: function (result) {
    let m = Math.floor((result / 1000) / 60)
    let s = Math.floor((result / 1000)) % 60
    let ms = (result % 1000) / 100
    s = ('0' + s).slice(-2)
    return '' + m + ':' + s + '.' + ms
  },
  convert_result: function (result, type) {
    if (type === 'ms') {
      return this.convert_time_result(result)
    } else if (type === 'g') {
      return this.convert_weight_result(result)
    } else {
      return result
    }
  }
}

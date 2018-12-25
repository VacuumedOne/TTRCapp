module.exports = {
  ymdValidator: function(ymd) {
    var result = ymd.match("^[0-9]{4}-[0-9]{2}-[0-9]{2}$")
    return (result!=null)
  }
}
Page({
  onLoad: function () {
    let Dishes = new wx.BaaS.TableObject("dishes")
    Dishes.find().then(res => {
      console.log(res)
    }, err => {
      // err
    })


  }
})
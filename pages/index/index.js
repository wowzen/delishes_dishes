Page({
  onLoad: function () {
    let currentUser = wx.getStorageSync('user')
    this.setData({currentUser: currentUser})
    let Dishes = new wx.BaaS.TableObject("dishes")
    Dishes.find().then(res => {
      this.setData({dishes: res.data.objects})
    }, err => {
      // err
    })

  },

  goToDish: function (e) {
    
    console.log('goToDish', e)
    let id = e.currentTarget.dataset.dishid
    wx.navigateTo({
      url: `/pages/show/show?id=${id}`,
    })
  },
})
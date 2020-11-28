Page({
  onLoad: function () {
    let currentUser = wx.getStorageSync('user')
    this.setData({currentUser: currentUser})
  },

  onShow: function () {
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

  goToHomePage: function () {
    wx.navigateTo({
      url: '/pages/index/index',
    })

  },
  goToUserPage: function () {
    wx.navigateTo({
      url: '/pages/user/user',
    })
  }
})

// create a bindtap for "filterLocation"
//create a function called "filterLocation".
// => set currentTarget region to data
// define an empty query object
// add a compare object to the empty query object which is going to compare the currentTargetRegion 
// to the column in the dishes table to only return the dishes from that region.


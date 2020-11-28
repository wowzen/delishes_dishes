// pages/user/user.js
Page({
  
  data: {},

  goToDish: function (e) {
    let id = e.currentTarget.dataset.dishid
    wx.navigateTo({
      url: `/pages/show/show?id=${id}`,
    })
  },

  getLikes: function () {
    let currentUser = this.data.currentUser;
    let Likes = new wx.BaaS.TableObject("Likes");
    let query = new wx.BaaS.Query()
    
    query.compare('user_id', "=", currentUser.id)
    Likes.setQuery(query).expand(['dish_id']).find().then(res => {
      let dishes = [];
      res.data.objects.forEach((object) => {
        let dish = object.dish_id;
        dishes.push(dish);
      })
      this.setData({dishes: dishes});
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
  },

  login: function (e) {
    console.log(e)
    wx.BaaS.auth.loginWithWechat(e).then(res => {
      console.log(res)
      wx.setStorageSync('user', res)
      this.setData({currentUser: res})
      })
  },

  goToDishesIndex: function () {
    wx.navigateTo({
      url: `/pages/index/index`,
    })
  },

  onLoad: function (options) {
    let currentUser = wx.getStorageSync('user');
    this.setData({currentUser: currentUser})
    this.getLikes()
  },

})
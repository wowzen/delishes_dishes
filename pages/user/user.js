// pages/user/user.js
Page({
  

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let currentUser = wx.getStorageSync('user');
    console.log(currentUser)
    this.setData({currentUser: currentUser})

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

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})
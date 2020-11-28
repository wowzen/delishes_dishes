App({
  onLaunch: function() {
    wx.BaaS = requirePlugin('sdkPlugin');
    //让插件帮助完成登录、支付等功能
    wx.BaaS.wxExtend(wx.login, wx.getUserInfo)

    let clientID = 'de251845f76399303498'  // 应用名称: ZEN的第一个小程序;
    wx.BaaS.init(clientID);
    wx.BaaS.auth.loginWithWechat().then(user => {
      wx.setStorageSync('user', user);
    })
  }
})
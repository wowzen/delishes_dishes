// pages/show/show.js
Page({
  data: {
    
  },

  getDish: function (id) {
    let Dish = new wx.BaaS.TableObject("dishes")
    
    Dish.get(id).then(res => {
      this.setData({dish: res.data})
      this.getLikes();
    })
  },

  addLike: function (e) {
    let Like = new wx.BaaS.TableObject('Likes')
    let data = {
      user_id: this.data.currentUser.id,
      dish_id: this.data.dish.id
    }
  
    Like.create().set(data).save().then(res => {
      let likes = this.data.dish.likes
      
      likes = likes + 1
      
      let MyTableObject = new wx.BaaS.TableObject("dishes")
      let dish = MyTableObject.getWithoutData(this.data.dish.id)

      this.setData({'dish.likes': likes});
      this.getLikes();
      
      dish.set('likes', likes);
      dish.update().then(res => {
        console.log(res);
      })
    })
  },

  login: function (e) {
    wx.BaaS.auth.loginWithWechat(e).then(res => {
      wx.setStorageSync('user', res)
      this.setData({ currentUser: res })
    })
  },

  getLikes: function () {
    let query = new wx.BaaS.Query()
    let MyTableObject = new wx.BaaS.TableObject('Likes')
    query.compare('user_id', '=', this.data.currentUser.id)
    query.compare('dish_id', '=', this.data.dish.id)
    MyTableObject.setQuery(query).find().then(res => {
      let liked = res.data.objects.length !== 0
      this.setData({liked: liked})
    })
  },

  // Lifecycle Functions --- 

  onLoad: function (options) {
    const id = options.id;
    const currentUser = wx.getStorageSync('user');
    this.setData({ currentUser: currentUser });

    this.getDish(id);
  },
})
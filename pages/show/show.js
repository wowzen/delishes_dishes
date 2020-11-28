// pages/show/show.js
Page({
  data: {
    disabled: false
  },

  getDish: function (id) {
    let Dish = new wx.BaaS.TableObject("dishes")
      Dish.get(id).then(res => {
      this.setData({dish: res.data})
      this.getLikes();
    })
  },

  addLike: function (e) {
    this.setData({disabled: true})
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
      
      dish.set('likes', likes);
      dish.update().then(res => {
        this.getDish(this.data.dish.id);
        this.getLikes();
        this.setData({disabled: false});
      })
    })
  },

  removeLike: function (e) {
    this.setData({disabled: true})
    let dish = this.data.dish;
    let likeID = this.data.likeID;
    let Likes = new wx.BaaS.TableObject('Likes');

    Likes.delete(likeID).then(res => {
      let MyTableObject = new wx.BaaS.TableObject("dishes")
      let entry = MyTableObject.getWithoutData(this.data.dish.id);

      dish.likes = dish.likes - 1

      entry.set('likes', dish.likes);
      entry.update();
      
      this.getDish(dish.id);
      this.getLikes();
      this.setData({disabled: false})
    })
  },

  login: function (e) {
    wx.BaaS.auth.loginWithWechat(e).then(res => {
      wx.setStorageSync('user', res)
      this.setData({ currentUser: res })
    })
  },

//用来抓取like表中like entry 的ID，以及判断是否被当前用户like过
  getLikes: function () {
    let query = new wx.BaaS.Query()
    let MyTableObject = new wx.BaaS.TableObject('Likes')
    query.compare('user_id', '=', this.data.currentUser.id)
    query.compare('dish_id', '=', this.data.dish.id)
    MyTableObject.setQuery(query).find().then(res => {
      if (res.data.objects[0]) {
        let likeID = res.data.objects[0].id;
        this.setData({likeID: likeID});
      }
    
      let liked = res.data.objects.length !== 0;
      this.setData({liked: liked});
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
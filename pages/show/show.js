// pages/show/show.js
Page({
  data: {},

  getDish: function (id) {
    let Dish = new wx.BaaS.TableObject("dishes")
    
    Dish.get(id).then(res => {
      console.log(res)
      this.setData({dish: res.data}) 
    })
  },

  onLoad: function (options) {
    let id = options.id;
    this.getDish(id);
    }
  })

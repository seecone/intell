// pages/shop/shop.js
import { Config } from '../../utils/config.js'
import { Home } from './shop-model.js'
var home = new Home();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    data: [],
    check: false,
    TotalCost: 0,
    newData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '购物车'
    })
  },
  //去逛逛
  goAround(){
    wx.switchTab({
      url: '../index/index'
    })
  },
  //跳转详情
  goDeatil(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../detail/detail?id=${id}`
    })
  },
  //获取数据
  getgoods() {
    wx.getStorage({
      key: 'cart',
      success: (res) => {
        this.setData({
          data: res.data
        })
      }
    })
  },
  //当前选中的商品
  check(e){
    let index = e.currentTarget.dataset.index;
    let list = this.data.data;
    list[index].check = !list[index].check;
    this.filter(list)
    wx.getStorage({
      key: 'cart',
      success: function(res) {
        res.data[index].check = list[index].check;
        wx.setStorage({
          key: 'cart',
          data:res.data
        })
      }
    })

    this.setData({
      data: list
    })
  },
  // All全部选中
  All(e) {
    let index = e.currentTarget.dataset.index;
    let check = !this.data.check;
    let list = this.data.data;
    list.forEach(item => {
      item.check = check;
    })
    this.filter(list)
    wx.setStorage({
      key: 'cart',
      data: list
    })

    this.setData({
      data: list
    })
  },
  // 过滤的方法
  filter(list){
    let newdata = list.filter(item => {
      return item.check == true;
    })
    let TotalCost = 0;
    newdata.forEach(item => {
      TotalCost += item.shop_price * item.count
    })
    this.setData({
      TotalCost: TotalCost
    })
    if (list.length === newdata.length) {
      this.setData({
        check: true
      })
    }else{
      this.setData({
        check: false
      })
    }
  },
  //商品+1
  add(e){
    let index = e.currentTarget.dataset.index;
    let list = this.data.data;
    list[index].count++;
    this.setData({
      data: list
    })
    wx.getStorage({
      key: 'cart',
      success: (res) => {
        res.data[index].count = list[index].count
        wx.setStorage({
          key: 'cart',
          data: res.data
        })
      }
    })
  },
  //商品-1
  cutBack(e){
    let index = e.currentTarget.dataset.index;
    let list = this.data.data;
    list[index].count--;
    if (list[index].count < 1){
      list[index].count = 1;
    }
    this.setData({
      data: list
    })
    wx.getStorage({
      key: 'cart',
      success: (res) => {
        res.data[index].count = list[index].count
        wx.setStorage({
          key: 'cart',
          data: res.data
        })
      }
    })
  },
  // 删除当前商品
  remove(e){
    wx.showModal({
      title: '提示',
      content: "确定删除吗？",
      success: res => {
        if(res.confirm){
          console.log(res.confirm)
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 2000
          })
          //删除逻辑
          let index = e.currentTarget.dataset.index;
          let list = this.data.data;
          list.splice(index, 1);
          this.filter(list)
          this.setData({
            data: list
          })
          wx.setStorage({
            key: 'cart',
            data: list
          })
          if (list.length == 0) {
            this.setData({
              check: false
            })
          }
        }else if(res.cancel){
          console.log("取消")
        }
      }
    })
  },
  //去结算
  Settlement(e){
    this.setData({
      newData: []
    })
    this.data.data.forEach(item => {
      if(item.check == true){
        this.data.newData.push(item)
      }
    })
    this.setData({
      newData: this.data.newData
    })
    let TotalCost = this.data.TotalCost;
    let data = this.data.data;
    let list = {
      data,
      TotalCost
    }
    wx.navigateTo({
      url:'../order/order?index=1'
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow(){
    this.getgoods()
  }
})
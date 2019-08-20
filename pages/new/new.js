// pages/new/new.js
import { Config } from '../../utils/config.js'
import { Home } from './new-model.js'
var home = new Home();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList();
    wx.setNavigationBarTitle({
      title: '新品'
    })
    setTimeout(() => {
      this.setData({
        loading: false
      })
    }, 2000)
  },
  //获取数据
  getList(){
    let id = 1;
    var data = home.getGoods(id,res => {
      this.setData({
        list: res.data.guessgoods
      })
    })
  },
  //跳到详情
  goDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `../detail/detail?id=${id}`
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
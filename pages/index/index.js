// pages/home/home.js

import { Config } from '../../utils/config.js'
import { Home } from './index-model.js'
var home = new Home();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    imgUrl: [],
    guessgoods: [],
    ranking: [],
    recommend: [],
    setHeight: wx.getSystemInfoSync().windowHeight,//获取视口高度
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getgoods();
    setTimeout(() => {
      this.setData({
        loading: false
      })
    }, 4000)
  },
  //获取数据
  getgoods() {
    let id = 1;
    var data = home.getGoods(id, res => {
      this.setData({
        imgUrl: res.data.carousel,//轮播图
        guessgoods: res.data.guessgoods,//猜你喜欢
        ranking: res.data.ranking,//排行榜
        recommend: res.data.recommend//公共商品
      })
    })
  },
  //跳到详情
  goDetail(e) {
    let id = e.currentTarget.dataset.id
    this.data.ranking.forEach(item=>{
      item.count = 0
    })
    this.data.guessgoods.forEach(item => {
      item.count = 0
    })
    wx.navigateTo({
      url: `../detail/detail?id=${id}`
    })
  },
  //滚动事件
  scroll(e) {
    if (e.detail.scrollTop >= 300) {
      this.setData({
        setNav: "#278c58"
      })
    } else {
      this.setData({
        setNav: ""
      })
    }
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
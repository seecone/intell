// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: [],
    TotalCost: 0,
    show: false,
    name: '',
    radio: '1',
    list: [],
    count: 1
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.index=='1'){
      //购物车
      let lists = this.data.list;
      let _this = this;
      wx.getStorage({
        key: 'cart',
        success: function (res) {
          lists = res.data.filter(item => {
            return item.check
          })
          _this.setData({
            list: lists
          })
          _this.total();
        }
      })
    }else{
      //发起拼单
      let lists = this.data.list;
      let _this = this;
      wx.getStorage({
        key: 'shoplist',
        success: function (res) {
          lists = res.data
          _this.setData({
            list: lists
          })
          _this.total();
        }
      })

    }
    wx.setNavigationBarTitle({
      title: '确认订单'
    })
   
  },
  //计算总价
  total(){
    this.data.list.forEach( item => {
      this.data.TotalCost += item.shop_price * item.count
    })
    this.setData({
      TotalCost: this.data.TotalCost
    })
  },
  onChange(event) {
    this.setData({
      radio: event.detail
    });
  },
  onClick(event) {  
    const { name } = event.currentTarget.dataset;
    this.setData({
      radio: name
    });
  },
  //提交订单
  popup(){
    this.setData({
      show: !this.data.show
    })
  },
  // 模态框
  onClose() {
    this.setData({
      show: false
    })
  },
  // 获取用户信息
  onGotUserInfo: function (e) {
    // console.log(e.detail.errMsg)
    this.setData({
      name: e.detail.userInfo.nickName
    })
    // console.log(e.detail.rawData)
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
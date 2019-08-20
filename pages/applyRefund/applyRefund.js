// pages/applyRefund/applyRefund.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    causeMore: [
      {
        'value': '错拍/多拍/不想要',
        'isChecked': true
      },
      {
        'value': '协商一致退款',
        'isChecked': false
      },
      {
        'value': '未按约定时间发货',
        'isChecked': false
      },
      {
        'value': '其他',
        'isChecked': false
      }
    ]
  },
  goBack() {
    wx.navigateBack({
      delta: -1
    })
  },
  onLoad(){
    wx.setNavigationBarTitle({
      title: '申请退款'
    })
  },
  onClose() {
    /*关闭模态框 */
    console.log('close')
    this.setData({
      show: false
    });
  },
  choose() {
    /*选择退款原因 */
    this.setData({
      show: true
    })
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  /**
   * 
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ 'title': '申请退款' })
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
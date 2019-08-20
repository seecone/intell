// pages/detail/detail.js
import { Config } from '../../utils/config.js'
import { Home } from './detail-model.js'
var home = new Home();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:[],
    show: false,
    size: ["60*40cm","58*36cm"],
    color: ["白色","红色"],
    curSize: '',
    curColor: '',
    curIndex: '',
    dataList: [],
    count: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDetail(options.id);
    wx.setNavigationBarTitle({
      title: '详情页'
    })
  },
  selectSize(e){
    this.setData({
      curSize:e.currentTarget.dataset.size
    })
  },
  selectColor(e){
    this.setData({
      curColor: e.currentTarget.dataset.color
    })
  },
  //获取详情接口
  getDetail(id){
    var data = home.getGoods(id,res => {
      this.setData({
        detail: res.data.goods
      })
    })
  },
  //返回首页
  goBack(){
    wx.navigateBack({
      delta: 1
    })
  },
  //关闭模态框
  onClose() {
    this.setData({ show: false });
  },
  //弹出弹窗
  isShow(e) {
    this.setData({
      show: !this.data.show,
      curIndex: e.currentTarget.dataset.index,
      detail: this.data.detail
    })
    wx.setStorage({
      key: 'goods',
      data: {
        image: this.data.detail.goods_thumb,
        name: this.data.detail.goods_name,
        price: this.data.detail.market_price
      }
    })
  },
  //关闭弹窗
  goIsShow() {
    this.setData({
      show: !this.data.show
    })
  },
  //跳转购物车页
  goShop(e){
    //当前的尺寸
    let curs = this.data.size[this.data.curSize]
    //当前的颜色
    let curc = this.data.color[this.data.curColor]
    if(Number(this.data.curIndex)){
      //点击单独购买
      if(curs && curc){
        let goodsId = e.currentTarget.dataset.id;
        let goods = this.data.detail;
        goods.check = false;
        goods.count = this.data.count;
        let count = goods.count;
        //获取购物车里的缓存
        let arr = wx.getStorageSync('cart') || [];
        if(arr.length > 0){
          for(var i in arr){
            //判断id是否一致
            if(arr[i].goods_id == goodsId){
              arr[i].count = arr[i].count+this.data.count;
              try{
                wx.setStorageSync('cart',arr)
              }catch(err){
                console.log(err)
              }
              //添加购物车
              wx.showToast({
                title: '加入购物车成功',
                icon: 'success',
                duration: 3000
              });
              wx.switchTab({
                url: '../shop/shop?index=1'
              })
              return;
            }
          }
          arr.push(goods)
        }else{
          arr.push(goods)
        }
        try{
          wx.setStorageSync('cart',arr)
          wx.showToast({
            title: '加入购物车成功',
            icon: 'success',
            duration: 3000
          });
          wx.switchTab({
            url: '../shop/shop?index=1'
          })
          return;
        }catch(err){
          console.log(err)
        }
      }
    }else{
      this.setData({
        dataList: []
      })
      //点击发起拼单
      if (curs && curc) {
        let dataList = this.data.dataList;
        dataList.push(this.data.detail)
        dataList.forEach( item => {
          item.count = this.data.count
        })
        wx.setStorage({
          key: 'shoplist',
          data: dataList
        })
        wx.navigateTo({
          url: '../order/order?index=0'
        })
        console.log(dataList)
      }
    }
  },
  //商品+1
  add() {
    this.data.count++;
    this.setData({
      count: this.data.count
    })
  },
  //商品-1
  cutBack() {
    this.data.count--;
    if (this.data.count<=1){
      this.data.count = 1;
    }
    this.setData({
      count: this.data.count
    })
  }
})
import {Config} from './config.js'

class Base {
  constructor() {
    this.baseRestUrl = Config.restUrl
  }
  request(params){
    var url = this.baseRestUrl + params.url
    if(!params.type){
      params.type = 'get'
    }
    wx.request({
      url: url,
      data: params.data,
      header:{
        "content-type": "application/json"
      },
      success: res => {
        // if(params.scallBack){
        //   params.scallBack(res.data)
        // }
        params.scallBack && params.scallBack(res.data)
      },
      fail: err => {
        console.log(err)
      }
    })
  }
}

export {Base}

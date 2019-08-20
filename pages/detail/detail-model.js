import { Base } from '../../utils/base.js'

class Home extends Base {
  constructor() {
    super()
  }
  //goods
  getGoods(id, callback) {
    var params = {
      url: 'index.php?s=api/v1/detail/'+id,
      scallBack: res => {
        callback && callback(res)
      }
    }
    this.request(params)
  }
}

export { Home }
Page({
  data: {
    networkData:true,
    paymentDisabled: false,
    purchaseDisabled: false,
    confirmData:false,
    quantityData:1,
    detailsData:{}
  },
  payment:function(){
    this.setData({
      paymentDisabled: true
    });
    let orderPrice = this.data.detailsData.price * this.data.quantityData;
    let commodityID = this.data.detailsData.ID;
    let quantity = this.data.quantityData;
    let me = this;
    wx.request({
      url: 'https://www.ijilu.cn/api/koa/commodity/getCommodityPayment', //记录订单信息
      data: {
        userID: 100,
        orderPrice: orderPrice,
        commodityID: commodityID,
        quantity: quantity
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data && res.data.length) {
          wx.navigateTo({
            url: `../paymentSuccess/index?pickUpCode=${res.data[0].pickUpCode}`
          });
        } else {
          me.setData({
            networkData: false,
          });
        }
      },
      fail: function () {
        me.setData({
          networkData: false,
        });
      }
    });
  },
  purchase:function(){
    this.setData({
      purchaseDisabled: true,
      confirmData: true,
    });
  },
  close:function(){
    this.setData({
      purchaseDisabled: false,
      confirmData: false,
      paymentDisabled: false
    });
  },
  quantity:function(e){
    return this.data.quantityData;
  },
  add:function(){
    this.setData({
      quantityData: parseInt(this.data.quantityData)+1
    });
  },
  subtract: function () {
    let quantityData = this.data.quantityData;
    if (quantityData>2){
      quantityData--;
    }else{
      quantityData=1;
    }
    this.setData({
      quantityData: quantityData
    });
  },
  getCommodityDetails(id) {
    let me = this;
    wx.request({
      url: 'https://www.ijilu.cn/api/koa/commodity/getCommodityDetails', //获取商品列表
      data: {
        id: id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data && res.data.length) {
          me.setData({
            detailsData: res.data[0],
          });
        }else{
          me.setData({
            networkData: false,
          });
        }
      },
      fail: function () {
        me.setData({
          networkData: false,
        });
      }
    });
  },
  network: function (options){
    let arr = Object.keys(options);
    if (arr && arr.length) {
      this.getCommodityDetails(options.cid);
    } else {
      this.setData({
        networkData: false,
      });
    }
  },
  onLoad: function (options) {
    this.network(options);
  },
})
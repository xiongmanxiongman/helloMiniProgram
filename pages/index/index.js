Page({
  data: {
    toView: '',
    scrollTop: 0,
    menuActive:0,
    networkData: true
  },
  upper: function (e) {
    let menuActive = 0;
    this.setData({
      menuActive: menuActive,
    });
  },
  lower: function (e) {
    let classificationData = this.data.classificationData;
    let menuActive = classificationData.length-1;
    this.setData({
      menuActive: menuActive,
    });
  },
  scroll: function (e) {
    let myThis = this;
    let menuActive = '';
    wx.createSelectorQuery().selectAll('.x-title').boundingClientRect(function (rects) {
      rects.forEach(function (rect) {
        if (rect.top < e.detail.scrollTop){
          menuActive = rect.id.substring(5, 6);
        }
      });
      myThis.setData({
        menuActive: menuActive
      });
    }).exec();
  },
  menuTap: function (e) {
    let menuActive = e.currentTarget.dataset.index;
    let toView = 'title' + menuActive;
    this.setData({
      menuActive: menuActive,
      toView: toView,
    });
  },
  productTap: function (e) {
    wx.navigateTo({
      url: `../commodity/details/index?cid=${e.currentTarget.dataset.cid}`
    });
  },
  getCommodityList(){
    let me = this;
    wx.request({
      url: 'https://www.ijilu.cn/api/koa/commodity/getCommodityList', //获取商品列表
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data&&res.data.length){
          me.setData({
            classificationData: res.data,
          });
        } else {
          me.setData({
            networkData: false,
          });
        }
      },
      fail:function(){
        me.setData({
          networkData: false,
        });
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCommodityList();
  }
})
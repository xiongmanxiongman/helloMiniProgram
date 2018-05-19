Page({
  data: {
    pickUpCodeData:0
  },
  onLoad: function (options) {
    this.setData({
      pickUpCodeData: options.pickUpCode,
    });
  }
})
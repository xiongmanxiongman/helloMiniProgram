//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    count: 1,
    currentPage: 1,
    list: {},
    listFlag: false,
    addFlag: true,
    mail:'',
    company:''
  },
  onLoad: function () {
    let req = {
      act: 'list',
      pageNumber: '1'
    }
    this.getList(req);
  },
  getList: function (req) {
    let _this = this;
    wx.request({
      url: 'https://www.ijilu.cn/api/native/user',
      data: req,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        _this.setData({
          list: res.data.data,
          count: res.data.count
        })
      }
    });
  },
  showAdd: function () {
    this.setData({ listFlag: true, addFlag: false });
  },
  inputCompany:function(e){
    let _this = this;
    this.setData({
      company: e.detail.value
    });
  },
  inputMail: function (e) {
    this.setData({
      mail: e.detail.value
    });
  },
  add: function () {
    let req = {
      act: 'add',
      username: this.data.company,
      mail:this.data.mail
    }
    let _this = this;
    wx.request({
      url: 'https://www.ijilu.cn/api/native/user',
      data: req,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        let req2 = {
          act: 'list',
          pageNumber: '1'
        }
        _this.getList(req2);
      }
    });
    this.setData({ listFlag: false, addFlag: true });
  },
  previous: function () {
    this.data.currentPage--;
    if (this.data.currentPage<1){
      this.data.currentPage =1
    }else{
      let req = {
        act: 'list',
        pageNumber: this.data.currentPage
      }
      this.getList(req);
    }
  },
  next: function () {
    this.data.currentPage++;
    if (this.data.currentPage > this.data.count){
      this.data.currentPage = this.data.count;
    }else{
      let req = {
        act: 'list',
        pageNumber: this.data.currentPage
      }
      this.getList(req);
    }
  }
})
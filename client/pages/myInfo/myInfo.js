// pages/myMes/myMes.js
var util = require('../../utils/util.js')
var staff = require('../../utils/staff.js')
var net = require('../../utils/net.js')
var myInfo = null
var changeInfo = null

Page({
  /**
   * 页面的初始数据
   */
  data: {
    myInfo: null,
    changeWhat:[
      "更改姓名",
      "性别",
      "更改工号",
      "更改手机号",
    ],
    changeSex: null,
    sex:[
      "男",
      "女"
    ],
    changeFlag:true,
    index: null,
  },

  changeInfo:function(e){
    if (e.currentTarget.id == 0){
      this.setData({
        index: e.currentTarget.id,
        changeFlag: false,
        changeSex: false,
        changeCtx: myInfo.name,
      })
    } else if (e.currentTarget.id == 1){
      this.setData({
        index: e.currentTarget.id,
        changeFlag: false,
        changeSex: true,
        changeCtx: myInfo.sex,
      })
    } else if (e.currentTarget.id == 2) {
      this.setData({
        index: e.currentTarget.id,
        changeFlag: false,
        changeSex: false,
        changeCtx: myInfo.staffId,
      })
    } else if (e.currentTarget.id == 3) {
      this.setData({
        index: e.currentTarget.id,
        changeFlag: false,
        changeSex: false,
        changeCtx: myInfo.telNumber,
      })
    }
    
  },
  input: function(e){
    changeInfo = e.detail.value
  },
  changeSave: function(){
    var that = this
    var index = this.data.index
    if(index == 0){
      if(changeInfo == ""){
        util.showModel('提示', '姓名不能为空！')
      }else{
        myInfo.name = changeInfo
        staff.modifyUserInfo(myInfo,function(){
          getApp().globalData.myInfo = myInfo
          that.setData({
            myInfo: myInfo,
            changeFlag: true
          })
        })
      }
    } else if (index == 1){
      myInfo.sex = changeInfo 
      staff.modifyUserInfo(myInfo, function () {
        getApp().globalData.myInfo = myInfo
        that.setData({
          myInfo: myInfo,
          changeFlag: true
        })
      })
    } else if (index == 2){
      if (changeInfo.length != "8") {
        util.showModel('提示', '请输入8位工号！')
      } else {
        myInfo.staffId = changeInfo
        staff.modifyUserInfo(myInfo, function () {
          getApp().globalData.myInfo = myInfo
          that.setData({
            myInfo: myInfo,
            changeFlag: true
          })
        })
      }
    } else if (index == 3) {
      if (changeInfo.length != "11") {
        util.showModel('提示', '请输入11位手机号！')
      } else {
        myInfo.telNumber = changeInfo
        staff.modifyUserInfo(myInfo, function () {
          getApp().globalData.myInfo = myInfo
          that.setData({
            myInfo: myInfo,
            changeFlag: true
          })
        })
      }
    }
    console.log(myInfo)
  },
  changeAvatar:function(){
    var that = this
    net.uploadImg(function(res){
      myInfo.avatar = res
      staff.modifyUserInfo(myInfo, function () {
        getApp().globalData.myInfo = myInfo
        that.setData({
          myInfo: myInfo,
          changeFlag: true
        })
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      myInfo: getApp().globalData.myInfo
    })
    myInfo = getApp().globalData.myInfo
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
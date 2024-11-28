// index.js
const { todo } = require("../../utils/todothing")

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    motto: '',
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),    
    startX:0,
    startY:0,
  },

  onLoad(){
    console.log("index onLoad()")
    try{
      if(getApp().globalData.userInfo){
        console.log("index:用户自动登录")
        wx.showToast({
          title: '登陆中...',
        })
        wx.switchTab({
          url: '/pages/home/home',
        })
      }
    }catch(e){
      console.log("index:无本地登陆信，待用户选择头像和昵称后，通过滑动进入")
    }
  },


  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    const { nickName } = this.data.userInfo
    this.setData({
      "userInfo.avatarUrl": avatarUrl,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
    console.log("new avatarUrl:"+this.data.userInfo.avatarUrl)
  },
  onInputChange(e) {
    const nickName = e.detail.value
    const { avatarUrl } = this.data.userInfo
    this.setData({
      "userInfo.nickName": nickName,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
    console.log("new name:"+this.data.userInfo.nickName)
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },

  addOnTouchStart(e){
    this.setData({
      startX : e.touches[0].pageX,
      startY : e.touches[0].pageY
    })
  },
  addOnTouchMove(e){

  },
  addOnTouchEnd(e){
    let moveX = e.changedTouches[0].pageX
    let moveY = e.changedTouches[0].pageY
    let delatX = moveX - this.data.startX
    let delatY = moveY - this.data.startY
    if(Math.abs(delatX)>Math.abs(delatY)){
      if(delatX > 20){
        console.log("滑动开始新生活！")
        var app = getApp()
        app.globalData.userInfo = this.data.userInfo
        wx.switchTab({
          url: '/pages/home/home',
        })
        }
      }
    },


    // getStoragedMsg(){
    //   try{
    //     var app = getApp()
    //     app.globalData.allTodo = wx.getStorageSync('todos')
    //     if(app.globalData.allTodo){
    //       console.log("loading todos:")
    //       console.log(app.globalData.allTodo)
    //     }
    //   }catch(e){
    //     console.log("第一次登陆，无todos")
    //     app.globalData.allTodo = [
    //       new todo("欢迎来到Todod小程序"),
    //       new todo("右滑完成今日打卡"),
    //       new todo("左滑执行各种操作"),
    //       new todo("添加todo请在下方右滑"),
    //       new todo("程序中绿色代表完成，红色代表未完成"),
    //       new todo("希望玩的开心！")
    //     ]
    //   }
    // }
 
})

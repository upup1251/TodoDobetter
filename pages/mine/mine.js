// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    userInfo : {},
    lastStatus : [],
    everydayDone:[],
    days:0,
    months:0,
    lookupOn:false,

    todos:[],
    lookupday:-1,
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log("mine onShow()")
    const app = getApp();

    let today =   new Date();
    let year = today.getFullYear();
    let month = today.getMonth()+1;
    let nextMonth = new Date(year,month,1)
    let lastDayOfCurrentMonth = new Date(nextMonth-1)
    this.setData({
      months:month,
      days : lastDayOfCurrentMonth.getDate(),
      userInfo:app.globalData.userInfo,
      lastStatus:app.globalData.lastStatus,
      lastPercentage:app.globalData.lastPercentage,
    })
    console.log("!!!"+this.data.userInfo)


   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    var app = getApp()
    this.setData({
      todos:app.globalData.allTodo
    })
    var everyDayDone = []
    for(var i = 0;i<this.data.days;i=i+1){
      let notdone = 0
      for(var item of this.data.todos){
        if(item.done[i] == 1){
          notdone = notdone + 1
          break
        }
      }
      if(notdone == 0){
        everyDayDone[i] = 2
      }
      else{
        everyDayDone[i] = 1
      }
    }
    this.setData({
      everydayDone:everyDayDone
    })
  },

  lookup(e){
    var id = e.currentTarget.dataset.id
    console.log("查看当月第"+id+"天的TODO完成情况")
    if(this.data.lookupOn&&id==this.data.lookupday){
      this.setData({
        lookupOn:false
      })
      return
    }
    this.setData({
      lookupOn:true,
      lookupday:id
    })
  },
  closelookup(){
    this.setData({
      lookupOn:false
    })
  },

  changeAvatar(e){
    wx.chooseMedia({
      count:1,
      mediaType:"image",
      // 不同箭头函数，this的上下文会发生改变，无法获取data值！
      success:(res)=>{
        let avatarUrl1 = res.tempFiles[0].tempFilePath
        let userInfo1 = this.data.userInfo
        userInfo1.avatarUrl = avatarUrl1
        this.setData({
          userInfo:userInfo1
        })
        getApp().globalData.userInfo = userInfo1
        console.log("newAvatarUrl"+avatarUrl1)
      }
    })
  },
  changeName(e){
    wx.showModal({
      title: '修改昵称',
      editable: true,  // 开启输入框
      placeholderText: '在这里输入修改后的昵称',
      cancelText:'我再想想',
      confirmText:'就是它！',
      cancelColor:'#ff571a',
      confirmColor:'07c160',
      complete: (res) => {
        if (res.cancel) {
          
        }
    
        if (res.confirm) {
          if(res.content!=""){
            let userInfo1 = this.data.userInfo
            userInfo1.nickName = res.content
            this.setData({
              userInfo:userInfo1
            })
            getApp().globalData.userInfo = userInfo1
          }
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },




})
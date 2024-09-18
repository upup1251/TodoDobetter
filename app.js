const { todo } = require("./utils/todothing")
const { formatTime } = require("./utils/util")

// app.js
App({
  onLaunch() {

    const storedUserInfor = wx.getStorageSync('userInfo');
    if(!storedUserInfor){
      wx.showModal({
        title: '获取权限',
        content: '将访问你的头像和昵称用于个人信息展示',
        complete: (res) => {
          if (res.cancel) {
            
          }
      
          if (res.confirm) {
            this.getUserProfile()
          }
        }
      })

    }



    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)


   

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },

  onShow(){
    const currentDate = new Date().toDateString()
    const lastDay = wx.getStorageSync('lastDay')
    this.globalData.allTodo = wx.getStorageSync('todos')||[]

    console.log("-------load local Data-------")
    console.log(lastDay)
    console.log(this.globalData.allTodo)
    console.log("-------load finish-----------")

    console.log(currentDate)

    if(currentDate!=lastDay){
      console.log("new day")
      this.globalData.lastStatus=[0,0,0]
      for(var i=0;i<this.globalData.allTodo.length;i++){
        if(this.globalData.allTodo[i].status==0){
          this.globalData.lastStatus[0]++
        }
        else if(this.globalData.allTodo[i].status==1){
          this.globalData.lastStatus[1]++
        }
        else if(this.globalData.allTodo[i].status==2){
          this.globalData.lastStatus[2]++
          this.globalData.allTodo[i].status=1
        }
        console.log('delTodo unTodo okTodo:'+this.globalData.lastStatus[0]+" " +this.globalData.lastStatus[1]+" "+this.globalData.lastStatus[2])
        if(this.globalData.lastStatus[1]+this.globalData.lastStatus[2]==0){
          this.globalData.lastPercentage=100
        }
      }
    }
    else{
      console.log(lastDay)
    }
  },

  OnHide(){
    wx.setStorageSync('todos', this.globalData.allTodo)
    wx.setStorageSync('lastDay', new Date().toDateString())
  },



  globalData: {
    userInfo: null ,
    mainColor:"ff751a",
    allTodo :[
      // new todo("吃饭"),
      // new todo("睡觉")
    ],
    lastLoad:{},
    lastStatus:[],
    lastPercentage:0
  },



  getUserProfile() {
    wx.getUserProfile({
      desc: '用于展示用户头像和昵称',    // 说明获取用户信息的目的
      success:(res) => {
        console.log("成功获取用户信息",res.userInfo);
        // wx.setStorageSync(this.globalData.userInfo,res.userInfo);
        this.globalData.userInfo = res.userInfo;    //app中的globaldata不用使用函数setData()
      },
      fail:(res)=>{
        console.log("获取用户信息失败")
      }
    })
  }
})





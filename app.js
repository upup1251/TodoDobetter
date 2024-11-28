const { todo } = require("./utils/todothing")
const { formatTime } = require("./utils/util")

// app.js
App({
  onLaunch() {
    console.log("onLaunch()")
    try{
      console.log("================================================")
      console.log("app_onlaunch: try to load data from local...")
      var userInfo = wx.getStorageSync('userInfo')
      console.log(userInfo)
      if(userInfo){
        this.globalData.userInfo = userInfo
        this.globalData.allTodo = wx.getStorageSync('todos')
        console.log(this.globalData.userInfo)
        console.log(this.globalData.allTodo)
      }
      else{
        console.log("app_onLaunch: no local storage for userInfo or todos,add instructions todos automatically")
        this.globalData.userInfo = {
            avatarUrl : "../../images/avatar.png",
            nickName:"微信用户2020",
        }
        this.globalData.allTodo = [
          new todo("欢迎来到Todod小程序",0),
          new todo("右滑完成今日打卡",1),
          new todo("左滑执行各种操作",2),
          new todo("添加todo请在下方右滑",3),
          new todo("程序中绿色代表完成，红色代表未完成",4),
          new todo("希望玩的开心！",5)
        ]
      }
      console.log("================================================")
    }
    
    catch(e){
      console.error("app_onLaunch: ")

    } 
  },

  onShow(){
    console.log("app_onShow()")
    try{
      //每次onShow()时获取上一次登陆是否和现在是同一天，判断是否需要刷新完成情况
      const lastDay = wx.getStorageSync('lastDay')
      if(lastDay){
        const currentDate = new Date().toDateString()
        //如果不是同一个月
        if(new Date(lastDay).getMonth() != new Date().getMonth()){
          for(let item of this.globalData.allTodo){
            for(let i=0;i<31;i++){
              item.done[i] = 1
            }
          }
        }
        
        console.log("last login:"+lastDay)
        console.log("current time:"+currentDate)
        if(currentDate!=lastDay){
          console.log("newDay,clear yeaterday message(2->1)")
          for(var item of this.globalData.allTodo){
            if(item.status ==2){
              item.status=1
            }
          }
          console.log(this.globalData.allTodo)
        }
        else{
          console.log("still today")
        }
      }
    }catch(e){
      console.log("获取数据失败",e)
    }
  },

  onHide(){
    try{
      console.log("================================================")
      console.log("app_onHide(): automatically store this info：")
      console.log(this.globalData.allTodo)
      console.log(new Date().toDateString())
      console.log(this.globalData.userInfo)
      console.log("================================================")

      wx.setStorageSync('todos', this.globalData.allTodo)
      wx.setStorageSync('lastDay', new Date().toDateString())
      wx.setStorageSync('userInfo', this.globalData.userInfo)
    }catch(e){
      console.error("数据保存失败",e)
    }
  },



  globalData: {
    userInfo:null,
    mainColor:"ff751a",
    allTodo :[],
    lastLoad:null,
    lastStatus:null,
    lastPercentage:0
  },
})





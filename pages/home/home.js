const { todo } = require("../../utils/todothing");

// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    todos : [{}],
    inputNewTodoDisappear : true,
    app :{},
    startX:0,
    startY:0,

    scrollLeft:[],
    buttonDelDisplay:false,

  },

  onTouchStart(e){
    this.setData({
      startX:e.touches[0].pageX,
      startY:e.touches[0].pageY
    })

  },
  onTouchMove(e){
  },
  onTouchEnd(e){
    let moveX = e.changedTouches[0].pageX
    let moveY = e.changedTouches[0].pageY
    let delatX = moveX - this.data.startX
    let delatY = moveY - this.data.startY
    console.log(delatX)
    if(Math.abs(delatX)>Math.abs(delatY)){
      var id = e.currentTarget.dataset.id
      if(delatX>200){
        const app = getApp()
        var newTodos = this.data.todos
        for(var i=0;i<this.data.todos.length;i++){
          if(newTodos[i].id==id){
            newTodos[i].status=2
            break
          }
        }
        this.setData({
          todos:newTodos
        })
        app.globalData.allTodo = newTodos
        console.log(id+'complete')
        wx.showToast({
          title: this.data.todos[id].text +" 打卡成功",
        })

      }
      else if(delatX < -20){
        console.log('right')
        this.setData({
          buttonDelDisplay:true
        })
        var newScrollLeft = this.data.scrollLeft;
        newScrollLeft[id] = 1000;
        this.setData({
          scrollLeft:newScrollLeft
        })
        setTimeout((e)=>{
          newScrollLeft[id] = 0
          this.setData({
            scrollLeft:newScrollLeft,
          })
          setTimeout(() => {
            this.setData({
              buttonDelDisplay:false
            })
          }, 1000);
        },2000)

      }
    }
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
      if(delatX > 200){
          this.addNewTodo()
        }
      }
    },

//不稳定的回弹
  // onScroll(e) {
  //   const currentScrollLength = e.detail.scrollLeft;
  //   const target_id = e.currentTarget.dataset.id;
  //   var scrollLeft1 = this.data.scrollLeft;
  //   if(currentScrollLength!=0){
  //     scrollLeft1[target_id] = 200;
  //     this.setData({
  //       scrollLeft:scrollLeft1
  //     })
  //     setTimeout(()=>{
  //       scrollLeft1[target_id] = 0
  //       this.setData({
  //         scrollLeft :scrollLeft1
  //       })
  //     },2000)
  //   } 

  // },



  addNewTodo(){
    wx.showModal({
      title: '添加新的TODO事件',
      editable: true,  // 开启输入框
      placeholderText: '可以在这里输入您的内容噢',
      cancelText:'我再想想',
      confirmText:'添加它！',
      cancelColor:'#ff571a',
      confirmColor:'07c160',
      success:  (res)=> {
        if (res.confirm) {
          var currentTodos = this.data.todos
          if(res.content!=''){
            currentTodos.push(new todo(res.content))
          this.setData({
            todos:currentTodos
          })
          console.log('用户点击确定，输入的内容为：', res.content);
          }
          else{
            wx.showToast({
              icon:'error',
              title: 'TODO不能为空',
            })
          }
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    });
  },



  delTodo(e){
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '删除',
      content: '是否将此Todo事件流放',
      complete: (res) => {
        if (res.cancel) {
          return 
        }
        if (res.confirm) {
          const app = getApp()
          const newTodos = this.data.todos
          for(var i=0;i<newTodos.length;i++){
            if (newTodos[i].id == id){
              newTodos[i].status = 0
              this.setData({
                todos:newTodos,
              })
            app.globalData.allTodo = newTodos
            console.log('id为'+id+'的Todo已删除！')
            wx.showToast({
              title: this.data.todos[id].text+" 已删除",
            })
            break
          }
        }
        }
      }
    })
  },

  restoreTodo(e){
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '恢复',
      content: '是否将此事件恢复',
      complete: (res) => {
        if (res.cancel) {
          return
        }
        if (res.confirm) {
          const currentTods = this.data.todos
          for(var i=0;i<this.data.todos.length;i++){
            if(this.data.todos[i].id==id){
              currentTods[i].status=1
              break
            }
          }
          this.setData({
            todos:currentTods
          })
          wx.showToast({
            title: '恢复成功',
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const app1 = getApp();
    this.setData({        //加载页面的时候获得app实例和tosdoList
      app : app1,
      todos:app1.globalData.allTodo
    })
    for(var i=0;i<this.data.todos.length;i++){
      this.data.scrollLeft[i]=0;
    }
 


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

  }
})
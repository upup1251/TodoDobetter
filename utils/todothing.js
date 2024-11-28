class todo{
  //status==2:今日完成打卡
  //status==1:还需打卡
  //status==0:划去
  status = 1;
  scrollLeft = 0;
  constructor(text,id1){
      this.text = text;
      todo.count++;
      this.id = id1;
      this.done = new Array(31).fill(1)
      let today = new Date().getDate()-1
      for(let i=0;i<today;i++){
        this.done[i] = 0
      }
  }
  complete(){
    this.status = 0;
  }
}


module.exports = {
  todo
}
class todo{
  //status==2:今日完成打卡
  //status==1:还需打卡
  //status==0:划去
  static count = -1;
  status = 1;
  scrollLeft = 0;
  constructor(text){
      this.text = text;
      todo.count++;
      this.id = todo.count;
  }
  complete(){
    this.status = 0;
  }

}


module.exports = {
  todo
}
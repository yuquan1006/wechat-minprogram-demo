Page({
    data: {
      name: '张三'
    },
    buttonHandler(event) {
      const that = this;
      wx.showModal({
        title: "操作确认",
        content: "你确认要操作吗？",
        success(res){
            if (res.confirm) {
            that.setData({name:"李四"},
            function () {
                wx.showToast({
                  title: '操作完成',
                  duration: 700
                });
            })
            console.log('用户点击确定')
            } else if (res.cancel) {
            console.log('用户点击取消')
            }
      }
    });

    }
  });
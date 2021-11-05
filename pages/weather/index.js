// pages/weather/index.js

//获取应用实例
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
    
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        that.getLocation();
    },

    // 获取坐标
    getLocation:function () {
        var that=this
        wx.getLocation({
            type: "wgs84",
            success(res){
                const latitude = res.latitude
                const longitude = res.longitude
                console.log("经纬度" + latitude + ":" + longitude);
                that.getCity(latitude,longitude);
            }
          })
    },

    //  //将经纬度坐标转化为实际位置
    getCity:function (latitude, longitude) {
        var that = this
        var url = "https://api.map.baidu.com/reverse_geocoding/v3/"
        var struct = {
            location: latitude + "," +longitude ,
            ak: "rKE4zejHVtEM9hIxKZj9ETa9lgQuc7EL",
            output:"json"
        }
        wx.request({
          url: url,
          data: struct,
          success:function (res) {
            console.log(JSON.stringify(res));

            var city = res.data.result.addressComponent.city; //获取城市信息    
            that.setData({city: city})
            // 获取天气
            that.getWeather(city);
          }
        })
    },
        
    // 获取天气
    getWeather: function (city) {
        var that = this;
        var url = "https://api2.jirengu.com/getWeather.php"
        var struct = {city: city}
        wx.request({
         method: "get",
         header: {'Content-Type': 'application/x-www-form-urlencoded'},
        url: url,
        data: struct,
        success:function (res) {
            console.log(JSON.stringify(res));
            var tmp = res.data.result.now.temp
            var cond_txt = res.data.result.now.text
            var hum =  res.data.result.now.rh
            var daily_forecast = res.data.result.forecasts;//连续五天的天气情况数组
            that.setData({
                tmp: tmp,
                cond_txt: cond_txt,
                hum: hum,
                daily_forecast: daily_forecast
            })
        }


        })
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
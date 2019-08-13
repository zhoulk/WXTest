// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var Remote = require("Remote")

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    },

    start () {
        console.log("loading start")

        this.wxLogin(()=>{

           
        })

        window.wx.onShareAppMessage(() => {
            console.log("右上角转发")
            return {
              title: '转发标题',
              imageUrl: '' // 图片 URL
            }
          })

        window.wx.showShareMenu({
            withShareTicket: true
        })

        window.wx.onShow(function () {
            //分享后返回
            let curTime = new Date().getTime();
            console.log("onShow   " + curTime)
        })

        var launch = window.wx.getLaunchOptionsSync();
            var queryData = launch.query;
            var diyData = queryData.diy;
            if (diyData != null && diyData != "") {
                console.log("微信透传参数：" + diyData);
            }
            else {
                console.log("微信平台无透传参数");
            }
    },

    onShareClick: function(){

        let closeTime = new Date().getTime();
        console.log("onShareClick   " + closeTime)
        window.wx.shareAppMessage({
            title: "你是一个，一个一个一个",
            imageUrl: "Resources/CP0541007714.png", //可以是网络图片Url也可以本地路径
            query: "diy=" + "{\"a\" = \"helloworld\"}",
        })
    },

    onCameraClick: function(){
        var self = this
        var canvas = cc.game.canvas;
        var width  = cc.winSize.width;
        var height  = cc.winSize.height;
        canvas.toTempFilePath({
            x: 0,
            y: 0,
            width: width,
            height: height,
            destWidth: width,
            destHeight: height,
            success (res) {
                //.可以保存该截屏图片
                console.log(res)
            //     wx.previewImage({
            //         current: res.tempFilePath,
            //         urls: [res.tempFilePath]
            //    })
                // wx.shareAppMessage({
                //     imageUrl: res.tempFilePath
                // })
                self.saveImage(res.tempFilePath)
            }
        })
    },

    saveImage: function(filePath){ //保存图片到本地
        if(!(cc.sys.platform === cc.sys.WECHAT_GAME)) return;
        var self = this;
        var imgSrc = filePath
        wx.getSetting({
            success(res) {
                if (!res.authSetting['scope.writePhotosAlbum']) { //未授权
                    wx.authorize({
                        scope:'scope.writePhotosAlbum',
                        success() {
                            console.log('授权成功')
                            wx.saveImageToPhotosAlbum({
                                    filePath: imgSrc,
                                    success:function (data) {
                                        console.log(data);
                                        self.showTipsUI("题目图片保存成功");
                                    },
                                    fail:function (err) {
                                        console.log(err);
                                    }
                            });
                        },
                        fail() {
                            console.log("授权失败");
                            wx.showModal({
                                title: '提示',
                                content: '点击确定，保存图片到相册。',
                                success:function(res){
                                    if (res.confirm){
                                        wx.openSetting({
                                            success(res){
                                                console.log("重新获得保存图片授权状态");
                                                if (res.authSetting["scope.writePhotosAlbum"]){ //如果用户重新同意了授权登录
                                                        wx.saveImageToPhotosAlbum({
                                                            filePath: imgSrc,
                                                            success:function (data) {
                                                                console.log(data);
//                                                                 self.showTipsUI("题目图片保存成功");
                                                            },
                                                            fail:function (err) {
                                                                console.log(err);
                                                            }
                                                        });
                                                }
                                            },
                                            fail(){
                                                console.log("重新获得保存图片授权状态失败");
                                            }
                                        }) 
                                    }
                                }
                            })
                        }
                    });
                }else{ //已授权
                       wx.saveImageToPhotosAlbum({
                            filePath: imgSrc,
                            success:function (data) {
                                console.log(data);
//                                 self.showTipsUI("题目图片保存成功");
                            },
                            fail:function (err) {
                                console.log(err);
                            }
                       });
                }
            }
        });
    },

    wxLogin: function(cb){

        if(window.wx == undefined){
            if(cb){
                cb()
            }
            return
        }

        // window.wx.exitMiniProgram(()=>{

        // },()=>{

        // },()=>{
        //     console.log("logout complete")
        // })

        window.wx.login({
            success (res) {
              if (res.code) {
                console.log('登录成功！' + res.code )
                // //发起网络请求
                // wx.request({
                //   url: 'https://test.com/onLogin',
                //   data: {
                //     code: res.code
                //   }
                // })
                // Remote.login(res.code, "asas", ()=>{
                    
                // })
              } else {
                console.log('登录失败！' + res.errMsg)
              }
            }
          })


        let exportJson = {};
        let sysInfo = window.wx.getSystemInfoSync();
        //获取微信界面大小
        let width = sysInfo.screenWidth;
        let height = sysInfo.screenHeight;
        window.wx.getSetting({
            success (res) {
                console.log(res.authSetting);
                if (res.authSetting["scope.userInfo"]) {
                    console.log("用户已授权");
                    window.wx.getUserInfo({
                        success(res){
                            console.log(res);
                            exportJson.userInfo = res.userInfo;
                            //此时可进行登录操作
                            var headUrl = res.userInfo.avatarUrl
                            if(cb){
                                cb()
                            }
                        }
                    });
                }else {
                    console.log("用户未授权");
                    let button = window.wx.createUserInfoButton({
                        type: 'text',
                        text: '',
                        style: {
                            left: 0,
                            top: 0,
                            width: width,
                            height: height,
                            backgroundColor: '#00000000',//最后两位为透明度
                            color: '#ffffff',
                            fontSize: 20,
                            textAlign: "center",
                            lineHeight: height,
                        }
                    });
                    button.onTap((res) => {
                        if (res.userInfo) {
                            console.log("用户授权:", res);
                            exportJson.userInfo = res.userInfo;
                            var headUrl = res.userInfo.avatarUrl
                           
                            //此时可进行登录操作
                            button.destroy();
                        }else {
                            console.log("用户拒绝授权:", res);
                        }
                    });
                }
            }
         })
    }

    // update (dt) {},
});

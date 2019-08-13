window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  CusHttp: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "eb363W3e9FIu776l1JY1eHZ", "CusHttp");
    "use strict";
    cc.Class({
      ctor: function ctor() {
        this._http;
        this._callback;
      },
      Get: function Get(Url, cb) {
        console.info(Url);
        var http = cc.loader.getXMLHttpRequest();
        http.open("GET", Url, true);
        http.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        this._callback = cb;
        http.onreadystatechange = this._result.bind(this);
        http.timeout = 1e4;
        http.send();
        this._http = http;
      },
      Post: function Post(Url, data, cb) {
        console.info("post   url ===== > " + Url);
        data = JSON.stringify(data);
        console.log(data);
        var http = cc.loader.getXMLHttpRequest();
        http.open("POST", Url, true);
        http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        this._callback = cb;
        http.onreadystatechange = this._result.bind(this);
        http.timeout = 1e4;
        http.send(data);
        this._http = http;
      },
      _result: function _result() {
        if (4 == this._http.readyState && 500 != this._http.status) {
          console.log(this._http.responseText);
          var data = JSON.parse(this._http.responseText);
          console.info("httpCall->", data);
          this._callback && this._callback(data);
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  Loading: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "771b9iJTQVLnpJqRpAhzyma", "Loading");
    "use strict";
    var Remote = require("Remote");
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {},
      start: function start() {
        console.log("loading start");
        this.wxLogin(function() {});
        window.wx.onShareAppMessage(function() {
          console.log("\u53f3\u4e0a\u89d2\u8f6c\u53d1");
          return {
            title: "\u8f6c\u53d1\u6807\u9898",
            imageUrl: ""
          };
        });
        window.wx.showShareMenu({
          withShareTicket: true
        });
        window.wx.onShow(function() {
          var curTime = new Date().getTime();
          console.log("onShow   " + curTime);
        });
        var launch = window.wx.getLaunchOptionsSync();
        var queryData = launch.query;
        var diyData = queryData.diy;
        null != diyData && "" != diyData ? console.log("\u5fae\u4fe1\u900f\u4f20\u53c2\u6570\uff1a" + diyData) : console.log("\u5fae\u4fe1\u5e73\u53f0\u65e0\u900f\u4f20\u53c2\u6570");
      },
      onShareClick: function onShareClick() {
        var closeTime = new Date().getTime();
        console.log("onShareClick   " + closeTime);
        window.wx.shareAppMessage({
          title: "\u4f60\u662f\u4e00\u4e2a\uff0c\u4e00\u4e2a\u4e00\u4e2a\u4e00\u4e2a",
          imageUrl: "Resources/CP0541007714.png",
          query: 'diy={"a" = "helloworld"}'
        });
      },
      onCameraClick: function onCameraClick() {
        var self = this;
        var canvas = cc.game.canvas;
        var width = cc.winSize.width;
        var height = cc.winSize.height;
        canvas.toTempFilePath({
          x: 0,
          y: 0,
          width: width,
          height: height,
          destWidth: width,
          destHeight: height,
          success: function success(res) {
            console.log(res);
            self.saveImage(res.tempFilePath);
          }
        });
      },
      saveImage: function saveImage(filePath) {
        if (!(cc.sys.platform === cc.sys.WECHAT_GAME)) return;
        var self = this;
        var imgSrc = filePath;
        wx.getSetting({
          success: function success(res) {
            res.authSetting["scope.writePhotosAlbum"] ? wx.saveImageToPhotosAlbum({
              filePath: imgSrc,
              success: function success(data) {
                console.log(data);
              },
              fail: function fail(err) {
                console.log(err);
              }
            }) : wx.authorize({
              scope: "scope.writePhotosAlbum",
              success: function success() {
                console.log("\u6388\u6743\u6210\u529f");
                wx.saveImageToPhotosAlbum({
                  filePath: imgSrc,
                  success: function success(data) {
                    console.log(data);
                    self.showTipsUI("\u9898\u76ee\u56fe\u7247\u4fdd\u5b58\u6210\u529f");
                  },
                  fail: function fail(err) {
                    console.log(err);
                  }
                });
              },
              fail: function fail() {
                console.log("\u6388\u6743\u5931\u8d25");
                wx.showModal({
                  title: "\u63d0\u793a",
                  content: "\u70b9\u51fb\u786e\u5b9a\uff0c\u4fdd\u5b58\u56fe\u7247\u5230\u76f8\u518c\u3002",
                  success: function success(res) {
                    res.confirm && wx.openSetting({
                      success: function success(res) {
                        console.log("\u91cd\u65b0\u83b7\u5f97\u4fdd\u5b58\u56fe\u7247\u6388\u6743\u72b6\u6001");
                        res.authSetting["scope.writePhotosAlbum"] && wx.saveImageToPhotosAlbum({
                          filePath: imgSrc,
                          success: function success(data) {
                            console.log(data);
                          },
                          fail: function fail(err) {
                            console.log(err);
                          }
                        });
                      },
                      fail: function fail() {
                        console.log("\u91cd\u65b0\u83b7\u5f97\u4fdd\u5b58\u56fe\u7247\u6388\u6743\u72b6\u6001\u5931\u8d25");
                      }
                    });
                  }
                });
              }
            });
          }
        });
      },
      wxLogin: function wxLogin(cb) {
        if (void 0 == window.wx) {
          cb && cb();
          return;
        }
        window.wx.login({
          success: function success(res) {
            res.code ? console.log("\u767b\u5f55\u6210\u529f\uff01" + res.code) : console.log("\u767b\u5f55\u5931\u8d25\uff01" + res.errMsg);
          }
        });
        var exportJson = {};
        var sysInfo = window.wx.getSystemInfoSync();
        var width = sysInfo.screenWidth;
        var height = sysInfo.screenHeight;
        window.wx.getSetting({
          success: function success(res) {
            console.log(res.authSetting);
            if (res.authSetting["scope.userInfo"]) {
              console.log("\u7528\u6237\u5df2\u6388\u6743");
              window.wx.getUserInfo({
                success: function success(res) {
                  console.log(res);
                  exportJson.userInfo = res.userInfo;
                  var headUrl = res.userInfo.avatarUrl;
                  cb && cb();
                }
              });
            } else {
              console.log("\u7528\u6237\u672a\u6388\u6743");
              var button = window.wx.createUserInfoButton({
                type: "text",
                text: "",
                style: {
                  left: 0,
                  top: 0,
                  width: width,
                  height: height,
                  backgroundColor: "#00000000",
                  color: "#ffffff",
                  fontSize: 20,
                  textAlign: "center",
                  lineHeight: height
                }
              });
              button.onTap(function(res) {
                if (res.userInfo) {
                  console.log("\u7528\u6237\u6388\u6743:", res);
                  exportJson.userInfo = res.userInfo;
                  var headUrl = res.userInfo.avatarUrl;
                  button.destroy();
                } else console.log("\u7528\u6237\u62d2\u7edd\u6388\u6743:", res);
              });
            }
          }
        });
      }
    });
    cc._RF.pop();
  }, {
    Remote: "Remote"
  } ],
  Remote: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "27b48LnasBERo0a+t97u/ry", "Remote");
    "use strict";
    var CusHttp = require("CusHttp");
    var ServerIP = "http://127.0.0.1:12345";
    var http = new CusHttp();
    module.exports = {
      login: function login(code, name, cb) {
        http.Post(ServerIP + "/login", {
          code: code,
          name: name
        }, function(response) {
          cb && cb(response);
        });
      },
      logout: function logout(userId, cb) {
        http.Post(ServerIP + "/logout", {
          uid: userId
        }, function(response) {
          cb && cb(response);
        });
      },
      heart: function heart(userId, cb) {
        http.Post(ServerIP + "/heart", {
          uid: userId
        }, function(response) {
          cb && cb(response);
        });
      },
      userInfo: function userInfo(userId, params, cb) {
        null == params && (params = {});
        params.uid = userId;
        http.Post(ServerIP + "/userInfo", params, function(response) {
          cb && cb(response);
        });
      },
      getUserInfo: function getUserInfo(userId, cb) {
        http.Post(ServerIP + "/getUserInfo", {
          uid: userId
        }, function(response) {
          cb && cb(response);
        });
      },
      sign: function sign(userId, cb) {
        http.Post(ServerIP + "/sign", {
          uid: userId
        }, function(response) {
          cb && cb(response);
        });
      },
      getSign: function getSign(userId, cb) {
        http.Post(ServerIP + "/getSign", {
          uid: userId
        }, function(response) {
          cb && cb(response);
        });
      },
      cloth: function cloth(userId, params, cb) {
        var s = JSON.stringify(params);
        http.Post(ServerIP + "/cloth", {
          uid: userId,
          snap: s
        }, function(response) {
          cb && cb(response);
        });
      },
      getCloth: function getCloth(userId, cb) {
        http.Post(ServerIP + "/getCloth", {
          uid: userId
        }, function(response) {
          cb && cb(response);
        });
      },
      rank: function rank(userId, type, cb) {
        http.Post(ServerIP + "/rank", {
          uid: userId,
          Type: type
        }, function(response) {
          cb && cb(response);
        });
      }
    };
    cc._RF.pop();
  }, {
    CusHttp: "CusHttp"
  } ]
}, {}, [ "CusHttp", "Loading", "Remote" ]);
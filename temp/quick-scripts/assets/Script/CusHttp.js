(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/CusHttp.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'eb363W3e9FIu776l1JY1eHZ', 'CusHttp', __filename);
// Script/CusHttp.js

"use strict";

// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

/**
 * 新版接口
 * @example 使用 var Http = require('Http')
 * @example      new Http().Get(url, cb)//url链接 回调函数
 * @example      new Http().Post(url, param, cb)//url链接 param参数(json对象) 回调函数
 */
cc.Class({
    ctor: function ctor() {
        this._http;
        this._callback;
    },
    /**
     * Get 请求
     * @param {*} Url 
     * @param {*} cb 
     */
    Get: function Get(Url, cb) {
        console.info(Url);
        var http = cc.loader.getXMLHttpRequest();
        http.open("GET", Url, true);
        http.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        this._callback = cb;
        http.onreadystatechange = this._result.bind(this);
        http.timeout = 10000;
        http.send();
        this._http = http;
    },
    Post: function Post(Url, data, cb) {
        console.info("post   url ===== > " + Url);
        data = JSON.stringify(data); //以前不懂要怎么传，是缺少这一步
        console.log(data);
        var http = cc.loader.getXMLHttpRequest();
        http.open("POST", Url, true);
        http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        this._callback = cb;
        http.onreadystatechange = this._result.bind(this);
        http.timeout = 10000; //超时10秒
        http.send(data);
        this._http = http;
    },
    _result: function _result() {
        // console.log("this._http.readyState = " + this._http.readyState + "  this._http.status = " + this._http.status)
        if (this._http.readyState == 4 && this._http.status != 500) {
            console.log(this._http.responseText);
            var data = JSON.parse(this._http.responseText);
            console.info('httpCall->', data);
            if (this._callback) {
                //如果服务端有回执text字段，则显示飘字
                this._callback(data);
            }
        } else {
            // console.error('请求失败')
        }
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=CusHttp.js.map
        